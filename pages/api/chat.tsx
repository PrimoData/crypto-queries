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
  const messagesString = JSON.stringify(req.body.messages);
  const fullPrompt =
    `Prompt: ${prompt}, KYVE Streamr Data: ${messagesString}`.substring(
      0,
      16000 // Max prompt length
    );

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are being provided with KYVE data from Streamr. The data is streaming and in JSON format. The User is going to ask you a question about the data or ask you to do something with the data.',
        },
        {
          role: 'user',
          content: fullPrompt,
        },
      ],
      model: 'gpt-3.5-turbo-16k',
      temperature: 0,
    });

    // Full response
    // console.log('chatCompletion', chatCompletion);

    const response = chatCompletion.choices[0].message.content;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error processing request' });
  }
}
