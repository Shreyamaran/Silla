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
    model: 'llama-3.1-8b-instant'
  });
  return completion.choices[0].message.content;
}
