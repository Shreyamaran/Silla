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
    name: 'Silla Sovereign AI Study Backend (Chat Scoped)',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      dbCheck: 'GET /db-check',
      groqTest: 'GET /groq-test',
      upload: 'POST /upload?chatId=...',
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
  const { chatId, topic } = request.body || {};
  const chatTopic = topic || 'Study Topic';
  const cId = chatId || 'default';

  try {
    let combinedNotes = '';
    try {
      const { rows } = await pool.query('SELECT content FROM note_chunks WHERE chat_id = $1 ORDER BY created_at DESC LIMIT 10', [cId]);
      combinedNotes = rows.map(r => r.content).join('\n---\n');
    } catch (dbErr) {
      console.warn('Note fetch warning:', dbErr.message);
    }

    if (!combinedNotes) {
      combinedNotes = `Syllabus for ${chatTopic}: Phase 1 Foundations & Architecture, Phase 2 Core Mechanisms & Implementation, Phase 3 Advanced Applications & Evaluation.`;
    }

    const systemPrompt = `You are a study orchestrator for the topic "${chatTopic}". Create a structured study timeline as a JSON array of sequential learning phases.
Output ONLY valid JSON without markdown wrapping or commentary.
Format: [{"id": 1, "phase": "Phase 1: Foundations", "topic": "Core Fundamentals", "description": "Key concepts to cover", "suggestedContent": "Detailed breakdown of key concepts and material", "dueDate": "Day 1-2", "status": "current"}]`;

    const userPrompt = `Topic: ${chatTopic}\nBased on the following uploaded study materials for this chat, generate a 4-step learning timeline:\n\n${combinedNotes}`;

    const rawResponse = await askGroq(userPrompt, systemPrompt);
    const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const timeline = JSON.parse(cleaned);

    return { timeline };
  } catch (err) {
    return { 
      timeline: [
        { id: 1, phase: 'Phase 1: Foundations', topic: `${chatTopic} Core Concepts`, description: 'Basic architecture, terminology, and principles', suggestedContent: 'Review foundational material and initial specifications.', dueDate: 'Day 1-2', status: 'current' },
        { id: 2, phase: 'Phase 2: Deep Dive', topic: `${chatTopic} Mechanisms`, description: 'Internal algorithms and state management', suggestedContent: 'Study internal workflows and logic.', dueDate: 'Day 3-4', status: 'todo' },
        { id: 3, phase: 'Phase 3: Practical Mastery', topic: `${chatTopic} Applications`, description: 'Hands-on practice and edge cases', suggestedContent: 'Solve problem sets and analyze edge cases.', dueDate: 'Day 5-6', status: 'todo' }
      ]
    };
  }
});

fastify.post('/quiz/generate', async (request, reply) => {
  const { topic, phaseName, phaseContent, chatId } = request.body || {};
  const topicName = phaseName || topic || 'General Concepts';
  const cId = chatId || 'default';

  try {
    let contextNotes = phaseContent || '';
    if (!contextNotes && cId) {
      try {
        const topicEmbedding = await getEmbedding(topicName);
        const embeddingSql = `[${topicEmbedding.join(',')}]`;
        const { rows } = await pool.query(
          'SELECT content FROM note_chunks WHERE chat_id = $1 ORDER BY embedding <-> $2 LIMIT 5',
          [cId, embeddingSql]
        );
        contextNotes = rows.map(r => r.content).join('\n\n');
      } catch {
        const { rows } = await pool.query('SELECT content FROM note_chunks WHERE chat_id = $1 ORDER BY created_at DESC LIMIT 5', [cId]);
        contextNotes = rows.map(r => r.content).join('\n\n');
      }
    }

    const systemPrompt = `You are an expert quiz generator for "${topicName}". Return ONLY a valid JSON object with a key "questions" containing an array of 3 multiple-choice questions grounded in the provided notes.
Format:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "explanation": "Why option A is correct based on the material."
    }
  ]
}`;

    const userPrompt = `Phase/Topic: ${topicName}\nNotes Context:\n${contextNotes || 'General study material.'}`;

    const rawResponse = await askGroq(userPrompt, systemPrompt);
    const cleaned = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const quizData = JSON.parse(cleaned);

    return quizData;
  } catch (err) {
    return {
      questions: [
        {
          id: 1,
          question: `What is a core concept of ${topicName}?`,
          options: ['Primary architecture optimization', 'Random variance', 'Manual override', 'Static allocation'],
          correctAnswerIndex: 0,
          explanation: 'Primary architecture optimization ensures efficient performance.'
        },
        {
          id: 2,
          question: `How does active recall test your understanding of ${topicName}?`,
          options: ['By testing memory retrieval', 'By passive reading', 'By skipping topics', 'By ignoring notes'],
          correctAnswerIndex: 0,
          explanation: 'Active recall strengthens retention.'
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
    feedback: isCorrect ? 'Spot on! Correct answer.' : 'Not quite. Review the phase material and try again!'
  };
});

fastify.post('/chat', async (request, reply) => {
  const { message, history, chatId, topic } = request.body || {};
  const userMsg = message || 'Hello Silla';
  const cId = chatId || 'default';
  const chatTopic = topic || 'Study Assistant';

  let retrievedChunks = [];
  try {
    const msgEmbedding = await getEmbedding(userMsg);
    const embeddingSql = `[${msgEmbedding.join(',')}]`;
    const { rows } = await pool.query(
      'SELECT source_file, content FROM note_chunks WHERE chat_id = $1 ORDER BY embedding <-> $2 LIMIT 4',
      [cId, embeddingSql]
    );
    retrievedChunks = rows;
  } catch (vectorErr) {
    try {
      const { rows } = await pool.query('SELECT source_file, content FROM note_chunks WHERE chat_id = $1 ORDER BY created_at DESC LIMIT 4', [cId]);
      retrievedChunks = rows;
    } catch (dbErr) {
      console.warn('Database note query notice:', dbErr.message);
      retrievedChunks = [];
    }
  }

  try {
    const contextText = retrievedChunks.length > 0
      ? retrievedChunks.map((c, i) => `[Source ${i + 1} - ${c.source_file}]:\n${c.content}`).join('\n\n')
      : 'No uploaded notes for this topic yet.';

    const systemPrompt = `You are Silla, a sovereign AI tutor for the topic "${chatTopic}".
Your job is to help the user master "${chatTopic}", answer questions accurately using their uploaded notes for this topic, and quiz them conversationally when requested.

Context from uploaded study materials for ${chatTopic}:
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
      reply: `Silla: I'm ready to assist you with ${chatTopic}! What question do you have about it?`,
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
  
  const chatId = data.fields?.chatId?.value || request.query?.chatId || 'default';
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
        'INSERT INTO note_chunks (chat_id, source_file, content, embedding) VALUES ($1, $2, $3, $4)',
        [chatId, data.filename, chunk, embeddingSql]
      );
      savedChunksCount++;
    } catch (err) {
      console.error('Chunk insert notice:', err.message);
    }
  }

  return {
    chatId,
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
