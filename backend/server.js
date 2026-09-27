import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import pdfParse from 'pdf-parse';
import { pool, initDb } from './db.js';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: true });
fastify.register(multipart);

fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
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

  return { filename: data.filename, textLength: text.length, preview: text.slice(0, 200) };
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
