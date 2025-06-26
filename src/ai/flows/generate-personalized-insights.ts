// use server'

/**
 * @fileOverview Generates personalized insights and recommendations based on user journal entries and mood data.
 *
 * - generatePersonalizedInsights - A function that handles the generation of personalized insights.
 * - GeneratePersonalizedInsightsInput - The input type for the generatePersonalizedInsights function.
 * - GeneratePersonalizedInsightsOutput - The return type for the generatePersonalizedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedInsightsInputSchema = z.object({
  journalEntries: z.array(z.string()).describe('An array of journal entries from the user.'),
  moodData: z
    .array(z.object({date: z.string(), mood: z.string()}))
    .describe('An array of mood data with date and mood.'),
});
export type GeneratePersonalizedInsightsInput = z.infer<
  typeof GeneratePersonalizedInsightsInputSchema
>;

const GeneratePersonalizedInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights based on journal entries and mood data.'),
  recommendations:
    z.string().describe('Recommendations for improving mental wellbeing based on the insights.'),
});
export type GeneratePersonalizedInsightsOutput = z.infer<
  typeof GeneratePersonalizedInsightsOutputSchema
>;

export async function generatePersonalizedInsights(
  input: GeneratePersonalizedInsightsInput
): Promise<GeneratePersonalizedInsightsOutput> {
  return generatePersonalizedInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedInsightsPrompt',
  input: {schema: GeneratePersonalizedInsightsInputSchema},
  output: {schema: GeneratePersonalizedInsightsOutputSchema},
  prompt: `You are an AI companion designed to provide personalized insights and recommendations for university students, to improve their mental wellbeing. Analyze the following journal entries and mood data to identify patterns and suggest coping strategies.

Journal Entries:
{{#each journalEntries}}{{{this}}}
{{/each}}

Mood Data:
{{#each moodData}}Date: {{{this.date}}}, Mood: {{{this.mood}}}
{{/each}}

Based on this information, provide personalized insights into the user's emotional patterns and offer specific, actionable recommendations for improving their mental wellbeing.

Ensure the insights and recommendations are easy to understand, encouraging, and tailored to the student's specific situation and the cultural context of an Indian university student.

Output the insights and recommendations in a structured JSON format according to the schema.
`,
});

const generatePersonalizedInsightsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedInsightsFlow',
    inputSchema: GeneratePersonalizedInsightsInputSchema,
    outputSchema: GeneratePersonalizedInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
