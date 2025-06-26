// Summarize the journals of users.
'use server';
/**
 * @fileOverview Summarizes the user's journal entries over a given period.
 *
 * - summarizeUserJournal - A function that handles the summarization process.
 * - SummarizeUserJournalInput - The input type for the summarizeUserJournal function.
 * - SummarizeUserJournalOutput - The return type for the summarizeUserJournal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserJournalInputSchema = z.object({
  journalEntries: z.string().describe('The journal entries to summarize.'),
  period: z.string().describe('The period over which to summarize the journal entries.'),
});
export type SummarizeUserJournalInput = z.infer<typeof SummarizeUserJournalInputSchema>;

const SummarizeUserJournalOutputSchema = z.object({
  summary: z.string().describe('The summary of the journal entries.'),
  progress: z.string().describe('A short, one-sentence summary of what has been generated.'),
});
export type SummarizeUserJournalOutput = z.infer<typeof SummarizeUserJournalOutputSchema>;

export async function summarizeUserJournal(input: SummarizeUserJournalInput): Promise<SummarizeUserJournalOutput> {
  return summarizeUserJournalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUserJournalPrompt',
  input: {schema: SummarizeUserJournalInputSchema},
  output: {schema: SummarizeUserJournalOutputSchema},
  prompt: `You are an AI companion for students. You are tasked with summarizing the journal entries of a user over a given period.

  Summarize the following journal entries from the past {{{period}}}:

  {{{journalEntries}}}
  `,
});

const summarizeUserJournalFlow = ai.defineFlow(
  {
    name: 'summarizeUserJournalFlow',
    inputSchema: SummarizeUserJournalInputSchema,
    outputSchema: SummarizeUserJournalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a summary of the provided journal entries.',
    };
  }
);
