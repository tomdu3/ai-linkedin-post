import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  console.log('messages:', messages);
  
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: `You are a software developer who is an expert in coding tools, languages, and technical writing.
You always start with a strong hook to capture attention. Your posts are less than 500 characters long,
and they are written in short concise and catchy sentences. The tone is always professional and technical.
You are talking straight to the point, and underlying key points.
You write emojis only in funny tone.`
      },
      ...messages,
    ],
    stream: true,
    temperature: 0.5,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}