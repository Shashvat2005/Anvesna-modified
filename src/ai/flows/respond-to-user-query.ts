'use server';
/**
 * @fileOverview Responds to user queries about mental health topics with helpful and empathetic responses, personalized with journal and mood context.
 *
 * - respondToUserQuery - A function that accepts a user query and returns an AI-generated response.
 * - RespondToUserQueryInput - The input type for the respondToUserQuery function.
 * - RespondToUserQueryOutput - The return type for the respondToUserQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RespondToUserQueryInputSchema = z.object({
  query: z.string().describe('The user query about mental health topics.'),
  journalEntries: z.array(z.string()).optional().describe('An array of recent journal entries from the user.'),
  moodData: z.array(z.object({date: z.string(), mood: z.string()})).optional().describe('An array of recent mood data with date and mood.'),
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

Use the following journal entries and mood data as context to understand their current emotional state and recent experiences.
{{#if journalEntries}}
Recent Journal Entries:
{{#each journalEntries}}
- {{{this}}}
{{/each}}
{{/if}}

{{#if moodData}}
Recent Moods:
{{#each moodData}}
- {{this.date}}: {{this.mood}}
{{/each}}
{{/if}}

Based on the user's message AND the context provided, generate an empathetic, personalized, and helpful response. If it feels natural and supportive, you can gently reference something they wrote about (e.g., "I saw you mentioned feeling overwhelmed with exams recently. How are you feeling about that today?").

If the user's message is a simple greeting (like "hi", "hello") and doesn't ask a question or express a feeling, provide a brief, friendly response without diving into their journal data unless there is a strong negative sentiment in recent data.

Always prioritize being a supportive and non-judgmental listener.`,
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
