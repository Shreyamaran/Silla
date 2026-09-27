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
