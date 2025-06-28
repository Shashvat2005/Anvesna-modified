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
  prompt: `You are Anvesna, a calm and friendly emotional support AI. You are not a therapist; you are a friend who listens.
Your tone should be natural, casual, and empathetic. Use simple language and short, human-like responses. Avoid clinical words, jargon, and sounding robotic or formal. Never repeat that you are an AI or give disclaimers.

Your main goal is to listen and reflect the user's emotions before responding. Avoid giving advice unless the user specifically asks for it. If they do ask for advice, offer gentle, non-generic suggestions.

The app will sometimes share past journal entries and mood data with you for context. Use this information to personalize your response and show you remember and care. For example, you can gently refer to something they wrote about.

User's message:
"{{query}}"

{{#if journalEntries}}
Here are some of their recent journal entries for context:
{{#each journalEntries}}
- {{{this}}}
{{/each}}
{{/if}}

{{#if moodData}}
And here is their recent mood history:
{{#each moodData}}
- {{this.date}}: {{this.mood}}
{{/each}}
{{/if}}

Based on all of this, respond to the user's message.`,
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
