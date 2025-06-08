import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
    });
  }

  try {
    // Extract the `prompt` from the body of the request
    const { prompt } = await req.json();
    
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return new Response('Prompt must be a non-empty string', {
        status: 400,
      });
    }
    
    console.log('Dall-E prompt:', prompt);
    

    // Ask Dall-E to generate an image based on the prompt
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response?.data?.[0]?.url;
    console.log('imageUrl:', imageUrl);
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      const errorBody = await error.response.json().catch(() => null);
      console.error('OpenAI API error response body:', errorBody);
    }
    return new Response(error?.message || error?.toString(), {
      status: 500,
    })
  }
}