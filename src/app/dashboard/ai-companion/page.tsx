'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Loader2, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { respondToUserQuery, RespondToUserQueryInput } from '@/ai/flows/respond-to-user-query';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const JOURNAL_STORAGE_KEY = 'anvesna-journal-entries';
const MOOD_STORAGE_KEY = 'anvesna-mood-history';

export default function AiCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI companion. How are you feeling today? Feel free to share what's on your mind.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Get latest journal and mood data from localStorage
      const aiContext: RespondToUserQueryInput = { query: currentInput };

      try {
        const savedEntriesJSON = localStorage.getItem(JOURNAL_STORAGE_KEY);
        if (savedEntriesJSON) {
          aiContext.journalEntries = JSON.parse(savedEntriesJSON).map((entry: { content: string }) => entry.content);
        }

        const savedMoodsJSON = localStorage.getItem(MOOD_STORAGE_KEY);
        if (savedMoodsJSON) {
          aiContext.moodData = JSON.parse(savedMoodsJSON).map((entry: {date: string, mood: string}) => ({
            date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            mood: entry.mood
          }));
        }
      } catch (error) {
          console.error("Failed to load context from localStorage for AI", error);
          // Continue without context if localStorage fails
      }

      const response = await respondToUserQuery(aiContext);

      const assistantMessage: Message = { role: 'assistant', content: response.response };
      setMessages((prev) => [...prev, assistantMessage]);

      if (isTtsEnabled) {
          setIsTtsLoading(true);
          try {
              const ttsResponse = await textToSpeech({ text: response.response });
              if (audioRef.current) {
                  audioRef.current.src = ttsResponse.audioDataUri;
                  audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
              }
          } catch (ttsError) {
              console.error("Error with TTS generation:", ttsError);
          } finally {
              setIsTtsLoading(false);
          }
      }

    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error with AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  return (
    <div className="bg-muted/40 h-full p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-3xl h-full flex flex-col">
            <Card className="flex-1 flex flex-col shadow-lg">
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="font-headline text-2xl flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    <Bot />
                                </AvatarFallback>
                            </Avatar>
                            AI Companion
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                           {isTtsLoading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                           <Switch id="tts-mode" checked={isTtsEnabled} onCheckedChange={setIsTtsEnabled} aria-label="Toggle Text-to-Speech" />
                           <Label htmlFor="tts-mode" className="cursor-pointer">
                               {isTtsEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 text-muted-foreground" />}
                           </Label>
                        </div>
                    </div>
                    <CardDescription>
                        Your AI support is personalized using insights from your journaling and mood history.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4" ref={scrollContainerRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 ${
                                    message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                {message.role === 'assistant' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/20">
                                            <Bot className="text-primary h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`max-w-md rounded-lg p-3 ${
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            <User className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-start gap-3 justify-start">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-primary/20">
                                        <Bot className="text-primary h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="max-w-sm rounded-lg p-3 bg-muted flex items-center space-x-2">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground">Thinking...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
                <div className="border-t p-4 bg-background">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            disabled={isLoading}
                            className="flex-1"
                        />
                        <Button type="submit" disabled={isLoading || !input.trim()}>
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
        <audio ref={audioRef} hidden />
    </div>
  );
}
