import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'gsk_placeholder' });

export async function askGroq(prompt, systemPrompt = null) {
  const messages = [];
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt });
  }
  messages.push({ role: 'user', content: prompt });

  const completion = await groq.chat.completions.create({
    messages,
    model: 'qwen/qwen3.8-27b'
  });
  return completion.choices[0].message.content;
}
