import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost/cue_dev'
});

export async function initDb() {
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS vector;');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS note_chunks (
        id SERIAL PRIMARY KEY,
        chat_id TEXT,
        source_file TEXT NOT NULL,
        content TEXT NOT NULL,
        embedding vector(384),
        created_at TIMESTAMP DEFAULT now()
      );
      ALTER TABLE note_chunks ADD COLUMN IF NOT EXISTS chat_id TEXT;
    `);
    console.log('Database & note_chunks table initialized.');
  } catch (err) {
    console.warn('Database auto-init notice:', err.message);
  }
}
