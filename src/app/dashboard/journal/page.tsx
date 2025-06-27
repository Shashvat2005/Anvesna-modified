'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Book, PlusCircle, Sparkles, Loader2, Calendar } from 'lucide-react';
import { summarizeUserJournal } from '@/ai/flows/summarize-user-journal';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth-context';
import { db, isFirebaseConfigured } from '@/lib/firebase/client';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

type JournalEntry = {
  id: string;
  content: string;
  createdAt: {
    toDate: () => Date;
  } | null;
};

export default function JournalPage() {
    const { user } = useAuth();
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [newEntry, setNewEntry] = useState('');
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isLoadingEntries, setIsLoadingEntries] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (!user || !isFirebaseConfigured || !db) {
            setEntries([]);
            setIsLoadingEntries(false);
            return;
        }

        setIsLoadingEntries(true);
        const q = query(
            collection(db, 'journalEntries'), 
            where('userId', '==', user.uid), 
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const userEntries: JournalEntry[] = [];
            querySnapshot.forEach((doc) => {
                userEntries.push({ id: doc.id, ...doc.data() } as JournalEntry);
            });
            setEntries(userEntries);
            setIsLoadingEntries(false);
        }, (error) => {
            console.error("Error fetching journal entries:", error);
            toast({
                title: "Error",
                description: "Could not fetch journal entries.",
                variant: "destructive",
            });
            setIsLoadingEntries(false);
        });

        return () => unsubscribe();
    }, [user, toast]);

    const handleSaveEntry = async () => {
        if (!newEntry.trim()) {
            toast({
                title: "Empty Entry",
                description: "You can't save an empty journal entry.",
                variant: "destructive",
            })
            return;
        }
         if (!user || !isFirebaseConfigured || !db) {
            toast({
                title: "Not Authenticated or Firebase not configured",
                description: "You must be logged in and Firebase must be configured to save an entry.",
                variant: "destructive",
            })
            return;
        }

        try {
            await addDoc(collection(db, 'journalEntries'), {
                userId: user.uid,
                content: newEntry,
                createdAt: serverTimestamp(),
            });

            setNewEntry('');
            toast({
                title: "Entry Saved",
                description: "Your journal entry has been successfully saved.",
            })
        } catch (error) {
             console.error("Error saving entry:", error);
            toast({
                title: "Save Failed",
                description: "Could not save your journal entry. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummary('');
         if (entries.length === 0) {
            toast({
                title: "No Entries",
                description: "You need at least one journal entry to generate a summary.",
                variant: "destructive",
            });
            setIsSummarizing(false);
            return;
        }
        try {
            const allEntries = entries.map(e => `Date: ${e.createdAt?.toDate().toLocaleDateString() || 'N/A'}\n${e.content}`).join('\n\n---\n\n');
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
                            <Button variant="outline" onClick={handleSummarize} disabled={isSummarizing || entries.length === 0}>
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
                    {isLoadingEntries ? (
                         <div className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                          <p className="text-muted-foreground mt-2">Loading entries...</p>
                        </div>
                    ) : entries.length > 0 ? entries.map(entry => (
                        <Card key={entry.id} className="shadow-md">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-muted-foreground"/>
                                    Journal Entry
                                </CardTitle>
                                <CardDescription>{entry.createdAt ? entry.createdAt.toDate().toLocaleDateString() : 'Just now'}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{entry.content}</p>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="text-center py-8">
                           <Book className="mx-auto h-12 w-12 text-muted-foreground" />
                          <p className="mt-4 text-muted-foreground">You haven't written any journal entries yet.</p>
                          <p className="text-sm text-muted-foreground">Start by writing a new entry above.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
