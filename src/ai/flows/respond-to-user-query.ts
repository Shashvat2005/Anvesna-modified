'use server';
/**
 * @fileOverview Responds to user queries about mental health topics with helpful and empathetic responses.
 *
 * - respondToUserQuery - A function that accepts a user query and returns an AI-generated response.
 * - RespondToUserQueryInput - The input type for the respondToUserQuery function.
 * - RespondToUserQueryOutput - The return type for the respondToUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RespondToUserQueryInputSchema = z.object({
  query: z.string().describe('The user query about mental health topics.'),
});
export type RespondToUserQueryInput = z.infer<typeof RespondToUserQueryInputSchema>;

const RespondToUserQueryOutputSchema = z.object({
  response: z.string().describe('The AI-generated response to the user query.'),
});
export type RespondToUserQueryOutput = z.infer<typeof RespondToUserQueryOutputSchema>;

export async function respondToUserQuery(input: RespondToUserQueryInput): Promise<RespondToUserQueryOutput> {
  return respondToUserQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'respondToUserQueryPrompt',
  input: {schema: RespondToUserQueryInputSchema},
  output: {schema: RespondToUserQueryOutputSchema},
  prompt: `You are a compassionate and knowledgeable AI companion specializing in mental health support for university students.

A student has sent the following message:
"{{query}}"

First, analyze the user's message.
If the message is a simple greeting (like "hi", "hello", "hey", etc.) and does not contain any signs of distress or a specific question, provide a brief, friendly response. For example: "Hi there! How can I help you today?".

If the message contains a question, expresses a feeling (sad, anxious, happy, etc.), or describes a problem, then provide a helpful, informative, and empathetic response. Focus on providing immediate support and information related to their query.

Based on your analysis, generate the appropriate response.`,
});

const respondToUserQueryFlow = ai.defineFlow(
  {
    name: 'respondToUserQueryFlow',
    inputSchema: RespondToUserQueryInputSchema,
    outputSchema: RespondToUserQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
