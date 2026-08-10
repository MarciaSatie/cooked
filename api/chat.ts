import { createGroq } from '@ai-sdk/groq'; // 1. Change groq to createGroq
import { generateText, Output } from 'ai';
import { z } from 'zod';
import { streamText } from 'ai';

// Reference https://ai-sdk.dev/providers/ai-sdk-providers/groq

const RecipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
  }),
});

type RecipeOutput = z.infer<typeof RecipeSchema>;

// 2. Initialize your custom provider instance with your Vite environment variable
const customGroqProvider = createGroq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export async function generateRecipe(prompt: string = 'Generate a simple pasta recipe.'): Promise<RecipeOutput> {
    const result = await generateText({
      // Swap to an official Groq model that supports JSON schemas
      model: customGroqProvider('openai/gpt-oss-20b'), 
      output: Output.object({
        schema: RecipeSchema,
      }),
      prompt: prompt,
    });
  
    return result.output;
  }


 
// Reference: https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text
/**
 * Sends a user message to ChefBot and streams the AI reply back.
 * 
 * @async
 * @param {string} userMessage - The message from the user.
 * @returns {Promise<Response>} An HTTP response containing the text stream. When you call const response = await handleChat(userText).
 * 
 * The response variable is a standard JavaScript fetch Response, you would just see [object Response]. 
 * 
 * This is why your next steps in your previous code are required:
 * 
 * 1- response.body is a ReadableStream<Uint8Array> (a stream of raw binary numbers).
 * 
 * 2- reader.read() pulls out those individual binary chunks one at a time.
 * 
 * 3- TextDecoder finally converts those binary chunks into the strings that you append to your chat UI.
*/
export async function handleChat(userMessage: string) {
  // We use streamText instead of generateText + Output.object
  const result = await streamText({
    model: customGroqProvider('llama-3.3-70b-versatile'),
    system: 'You are a helpful Chef named ChefBot. You can chat normally or provide cooking advice in short and organized way .',
    prompt: userMessage,
  });

  // Returns a stream context: Instead of reading a whole file or response into memory at once,
  // a stream context manages the data bit-by-bit while holding the configuration details for that connection.
  return result.toTextStreamResponse();
}

export async function streamDecoder (userMessage: string ) {
    // Fetch the text response stream context from your backend file
    const response = await handleChat(userMessage);
    if (!response.body) throw new Error("No response stream");

    // Decode the chunks token-by-token
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let fullContent = '';

    while (!done) {
        const { value, done: chunkDone } = await reader.read();
        done = chunkDone;
        const chunk = decoder.decode(value || new Uint8Array(), { stream: !done });
        fullContent += chunk;
    }

    return fullContent;
}

