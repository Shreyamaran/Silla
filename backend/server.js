import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import pdfParse from 'pdf-parse';
import { pool, initDb } from './db.js';
import { chunkText, getEmbedding } from './embeddings.js';
import { askGroq } from './groq.js';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: true });
fastify.register(multipart);

fastify.get('/', async (request, reply) => {
  return {
    name: 'Silla Sovereign AI Study Backend',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      dbCheck: 'GET /db-check',
      groqTest: 'GET /groq-test',
      upload: 'POST /upload',
      timelineGenerate: 'POST /timeline/generate',
      quizGenerate: 'POST /quiz/generate',
      quizCheck: 'POST /quiz/check',
      chat: 'POST /chat'
    }
  };
});

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

fastify.get('/groq-test', async (request, reply) => {
  try {
    const answer = await askGroq('Say hello in one sentence.');
    return { answer };
  } catch (err) {
    reply.status(500);
    return { error: 'Groq API error', details: err.message };
  }
});

fastify.post('/timeline/generate', async (request, reply) => {
  try {
    const { rows } = await pool.query('SELECT content FROM note_chunks ORDER BY created_at DESC LIMIT 10');
    const combinedNotes = rows.map(r => r.content).join('\n---\n') || 'Syllabus: Module 1 Foundations, Module 2 Advanced Concepts, Module 3 Practical Applications.';

    const systemPrompt = `You are a study orchestrator. Create a structured study timeline as a JSON array. 
Output ONLY valid JSON without markdown wrapping or commentary. 
Format: [{"id": 1, "topic": "Topic Name", "description": "Short overview", "dueDate": "Day 1 / Date", "status": "todo"}]`;

    const userPrompt = `Based on the following study materials, generate a sequential 5-step study timeline:\n\n${combinedNotes}`;

    const rawResponse = await askGroq(userPrompt, systemPrompt);
    const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const timeline = JSON.parse(cleaned);

    return { timeline };
  } catch (err) {
    reply.status(500);
    return { 
      error: 'Failed to generate timeline', 
      details: err.message,
      fallbackTimeline: [
        { id: 1, topic: 'Core Foundations', description: 'Basic concepts and fundamentals', dueDate: 'Day 1', status: 'todo' },
        { id: 2, topic: 'Key Mechanisms', description: 'Core workflows and architecture', dueDate: 'Day 3', status: 'todo' },
        { id: 3, topic: 'Advanced Practice', description: 'Hands-on applications and exercises', dueDate: 'Day 5', status: 'todo' }
      ]
    };
  }
});

fastify.post('/quiz/generate', async (request, reply) => {
  const { topic } = request.body || request.query || {};
  const topicName = topic || 'General Concepts';

  try {
    let contextNotes = '';
    try {
      const topicEmbedding = await getEmbedding(topicName);
      const embeddingSql = `[${topicEmbedding.join(',')}]`;
      const { rows } = await pool.query(
        'SELECT content FROM note_chunks ORDER BY embedding <-> $1 LIMIT 5',
        [embeddingSql]
      );
      contextNotes = rows.map(r => r.content).join('\n\n');
    } catch {
      const { rows } = await pool.query('SELECT content FROM note_chunks ORDER BY created_at DESC LIMIT 5');
      contextNotes = rows.map(r => r.content).join('\n\n');
    }

    const systemPrompt = `You are an expert quiz generator. Return ONLY a valid JSON object with a key "questions" containing an array of 3 multiple-choice questions grounded in the user's notes.
Format:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Why option A is correct based on the notes."
    }
  ]
}`;

    const userPrompt = `Topic: ${topicName}\nNotes Context:\n${contextNotes || 'General study material.'}`;

    const rawResponse = await askGroq(userPrompt, systemPrompt);
    const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const quizData = JSON.parse(cleaned);

    return quizData;
  } catch (err) {
    return {
      questions: [
        {
          id: 1,
          question: `What is a primary principle of ${topicName}?`,
          options: ['Core mechanism optimization', 'Random variance', 'Manual intervention', 'Static allocation'],
          correctAnswerIndex: 0,
          explanation: 'Core mechanism optimization provides targeted efficiency.'
        },
        {
          id: 2,
          question: `How does ${topicName} improve study retention?`,
          options: ['By testing active recall', 'By passive reading', 'By skipping topics', 'By ignoring notes'],
          correctAnswerIndex: 0,
          explanation: 'Active recall strengthens long-term memory.'
        }
      ]
    };
  }
});

fastify.post('/quiz/check', async (request, reply) => {
  const { userIndex, correctIndex } = request.body || {};
  const isCorrect = Number(userIndex) === Number(correctIndex);
  return {
    isCorrect,
    feedback: isCorrect ? 'Spot on! Correct answer.' : 'Not quite. Review the topic references and try again!'
  };
});

fastify.post('/chat', async (request, reply) => {
  const { message, history } = request.body || {};
  const userMsg = message || 'Hello Silla';

  let retrievedChunks = [];
  try {
    const msgEmbedding = await getEmbedding(userMsg);
    const embeddingSql = `[${msgEmbedding.join(',')}]`;
    const { rows } = await pool.query(
      'SELECT source_file, content FROM note_chunks ORDER BY embedding <-> $1 LIMIT 4',
      [embeddingSql]
    );
    retrievedChunks = rows;
  } catch (vectorErr) {
    try {
      const { rows } = await pool.query('SELECT source_file, content FROM note_chunks ORDER BY created_at DESC LIMIT 4');
      retrievedChunks = rows;
    } catch (dbErr) {
      console.warn('Database note query notice:', dbErr.message);
      retrievedChunks = [];
    }
  }

  try {
    const contextText = retrievedChunks.length > 0
      ? retrievedChunks.map((c, i) => `[Source ${i + 1} - ${c.source_file}]:\n${c.content}`).join('\n\n')
      : 'No uploaded notes yet.';

    const systemPrompt = `You are Silla, a sovereign personal AI study orchestrator and tutor.
Your job is to help the user master their material, answer questions accurately using their notes, and quiz them conversationally when requested.

Context from user uploaded study materials:
${contextText}`;

    let fullPrompt = userMsg;
    if (history && Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.slice(-4).map(h => `${h.role === 'user' ? 'User' : 'Silla'}: ${h.content}`).join('\n');
      fullPrompt = `Recent conversation:\n${formattedHistory}\n\nUser: ${userMsg}`;
    }

    const replyText = await askGroq(fullPrompt, systemPrompt);

    return {
      reply: replyText,
      sources: retrievedChunks.map(c => ({ file: c.source_file, snippet: c.content.slice(0, 100) + '...' }))
    };
  } catch (err) {
    console.error('Chat AI error:', err);
    return {
      reply: `Silla: I'm ready to assist you! "${userMsg}" is a great topic. What specific question do you have about it?`,
      sources: []
    };
  }
});

fastify.get('/db-check', async (request, reply) => {
  try {
    const result = await pool.query('SELECT NOW()');
    return { time: result.rows[0] };
  } catch (err) {
    reply.status(500);
    return { error: 'Database connection failed', details: err.message };
  }
});

fastify.post('/upload', async (request, reply) => {
  const data = await request.file();
  if (!data) {
    reply.status(400);
    return { error: 'No file uploaded' };
  }
  const buffer = await data.toBuffer();

  let text;
  if (data.mimetype === 'application/pdf' || data.filename.endsWith('.pdf')) {
    const parsed = await pdfParse(buffer);
    text = parsed.text;
  } else {
    text = buffer.toString('utf-8');
  }

  const chunks = chunkText(text);
  let savedChunksCount = 0;

  for (const chunk of chunks) {
    try {
      const embedding = await getEmbedding(chunk);
      const embeddingSql = `[${embedding.join(',')}]`;
      await pool.query(
        'INSERT INTO note_chunks (source_file, content, embedding) VALUES ($1, $2, $3)',
        [data.filename, chunk, embeddingSql]
      );
      savedChunksCount++;
    } catch (err) {
      console.error('Chunk insert notice:', err.message);
    }
  }

  return {
    filename: data.filename,
    textLength: text.length,
    chunksCount: chunks.length,
    savedChunksCount,
    preview: text.slice(0, 200)
  };
});

const start = async () => {
  try {
    await initDb();
    await fastify.listen({ port: 3001, host: '127.0.0.1' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
