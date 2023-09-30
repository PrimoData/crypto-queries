// pages/api/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prompt = req.body.inputText;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    // console.log('chatCompletion', chatCompletion);
    const response = chatCompletion.choices[0].message.content;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
}
