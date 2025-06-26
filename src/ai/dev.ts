import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-user-journal.ts';
import '@/ai/flows/generate-personalized-insights.ts';
import '@/ai/flows/respond-to-user-query.ts';
import '@/ai/flows/text-to-speech.ts';
