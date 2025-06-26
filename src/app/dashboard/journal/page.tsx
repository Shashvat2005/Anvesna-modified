'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Book, PlusCircle, Sparkles, Loader2, Calendar } from 'lucide-react';
import { summarizeUserJournal } from '@/ai/flows/summarize-user-journal';
import { useToast } from "@/hooks/use-toast"

type JournalEntry = {
  id: number;
  date: string;
  content: string;
};

export default function JournalPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [newEntry, setNewEntry] = useState('');
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        // This is to avoid hydration mismatch
        const initialEntries: JournalEntry[] = [
            {
                id: 1,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                content: "Felt a bit overwhelmed with assignments today. Managed to finish the presentation slides, which is a relief. Tried a 5-minute meditation before bed."
            },
            {
                id: 2,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                content: "Had a really nice chat with a friend from home. It's good to know I have support. Feeling more positive and hopeful about the week ahead."
            }
        ];
        setEntries(initialEntries);
    }, []);

    const handleSaveEntry = () => {
        if (!newEntry.trim()) {
            toast({
                title: "Empty Entry",
                description: "You can't save an empty journal entry.",
                variant: "destructive",
            })
            return;
        }
        const entry: JournalEntry = {
            id: entries.length + 1,
            date: new Date().toLocaleDateString(),
            content: newEntry,
        };
        setEntries([entry, ...entries]);
        setNewEntry('');
        toast({
            title: "Entry Saved",
            description: "Your journal entry has been successfully saved.",
        })
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummary('');
        try {
            const allEntries = entries.map(e => `Date: ${e.date}\n${e.content}`).join('\n\n---\n\n');
            const result = await summarizeUserJournal({
                journalEntries: allEntries,
                period: 'recent entries'
            });
            setSummary(result.summary);
        } catch (error) {
            console.error("Error summarizing journal:", error);
            toast({
                title: "Summarization Failed",
                description: "Could not generate a summary. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSummarizing(false);
        }
    };

    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-4xl space-y-8">
                <div className="text-left">
                    <h1 className="font-headline text-3xl font-bold text-foreground">My Journal</h1>
                    <p className="text-muted-foreground mt-1">
                        Secure space for users to write journal entries and track emotional state.
                        <em className="block text-xs mt-2">
                            Your journal entries are securely sent to our AI companion for real-time sentiment analysis and personalized emotional support.
                        </em>
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-headline">
                            <PlusCircle className="text-primary"/>
                            New Entry
                        </CardTitle>
                        <CardDescription>What's on your mind today?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            value={newEntry}
                            onChange={(e) => setNewEntry(e.target.value)}
                            placeholder="Start writing..."
                            rows={6}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleSaveEntry}>Save Entry</Button>
                    </CardFooter>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                         <CardTitle className="flex items-center justify-between font-headline">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-primary"/>
                                AI-Powered Summary
                            </div>
                            <Button variant="outline" onClick={handleSummarize} disabled={isSummarizing}>
                                {isSummarizing ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-4 w-4" />
                                )}
                                Generate Summary
                            </Button>
                        </CardTitle>
                        <CardDescription>Get insights from your recent entries.</CardDescription>
                    </CardHeader>
                    { (isSummarizing || summary) && (
                         <CardContent>
                            {isSummarizing && (
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Generating your summary... this may take a moment.</span>
                                </div>
                            )}
                            {summary && <p className="text-sm text-foreground whitespace-pre-wrap">{summary}</p>}
                        </CardContent>
                    )}
                </Card>

                <div className="space-y-4">
                    <h2 className="font-headline text-2xl font-bold text-foreground">Past Entries</h2>
                    {entries.length > 0 ? entries.map(entry => (
                        <Card key={entry.id} className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-muted-foreground"/>
                                    Journal Entry
                                </CardTitle>
                                <CardDescription>{entry.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Loading entries...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
