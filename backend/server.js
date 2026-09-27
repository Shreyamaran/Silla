import Fastify from 'fastify';
import dotenv from 'dotenv';
import { pool, initDb } from './db.js';

dotenv.config();

const fastify = Fastify({ logger: true });

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

const start = async () => {
  try {
    await initDb();
    await fastify.listen({ port: 3001 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
