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
