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

 

export async function handleChat(userMessage: string) {
  // We use streamText instead of generateText + Output.object
  const result = await streamText({
    model: customGroqProvider('llama-3.3-70b-versatile'),
    system: 'You are a helpful Chef named ChefBot. You can chat normally or provide cooking advice.',
    prompt: userMessage,
  });

  // Returns a stream context
  return result.toTextStreamResponse();
}

