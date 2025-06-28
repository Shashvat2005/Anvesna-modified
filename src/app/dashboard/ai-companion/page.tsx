'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Loader2, Volume2, VolumeX, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { respondToUserQuery, RespondToUserQueryInput } from '@/ai/flows/respond-to-user-query';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const JOURNAL_STORAGE_KEY = 'anvesna-journal-entries';
const MOOD_STORAGE_KEY = 'anvesna-mood-history';

// Extend window type for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function AiCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This effect runs once on mount to set a personalized initial greeting.
    const getInitialGreeting = async () => {
        setIsInitialLoading(true);
        const defaultGreeting = { role: 'assistant', content: "Hello! I'm Anvesna, your companion. How are you feeling today? Feel free to share what's on your mind." };
        
        try {
            const savedEntriesJSON = localStorage.getItem(JOURNAL_STORAGE_KEY);
            const savedMoodsJSON = localStorage.getItem(MOOD_STORAGE_KEY);

            if (savedEntriesJSON || savedMoodsJSON) {
                const aiContext: RespondToUserQueryInput = { query: '__INITIAL_GREETING__' };
                
                if (savedEntriesJSON) {
                    aiContext.journalEntries = JSON.parse(savedEntriesJSON).map((entry: { content: string }) => entry.content);
                }
                if (savedMoodsJSON) {
                    aiContext.moodData = JSON.parse(savedMoodsJSON).map((entry: {date: string, mood: string}) => ({
                        date: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                        mood: entry.mood
                    }));
                }
                
                // Only call AI if there's actually context
                if (aiContext.journalEntries?.length || aiContext.moodData?.length) {
                    const response = await respondToUserQuery(aiContext);
                    setMessages([{ role: 'assistant', content: response.response }]);
                } else {
                   setMessages([defaultGreeting]);
                }
            } else {
                setMessages([defaultGreeting]);
            }
        } catch (error) {
            console.error("Could not generate or load initial greeting.", error);
            setMessages([defaultGreeting]);
        } finally {
            setIsInitialLoading(false);
        }
    };
    
    getInitialGreeting();
  }, []); // Empty dependency array ensures this runs once on mount.

  useEffect(() => {
    // This effect handles setting up the Web Speech API for voice-to-text.
    // It's client-side only.
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = 'An unknown error occurred during speech recognition.';
        if (event.error === 'no-speech') {
            errorMessage = "No speech was detected. Please try again.";
        } else if (event.error === 'audio-capture') {
            errorMessage = "There was a problem with your microphone.";
        } else if (event.error === 'not-allowed') {
            errorMessage = "Microphone access was denied. Please enable it in your browser settings.";
        }
        toast({
          title: "Speech Recognition Error",
          description: errorMessage,
          variant: "destructive",
        });
        setIsListening(false);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput((prev) => prev.trim() ? `${prev.trim()} ${transcript}` : transcript);
      };

      recognitionRef.current = recognition;
    } else {
        console.warn("Speech recognition not supported in this browser.");
    }
  }, [toast]);

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
          if (ttsResponse.error) {
            toast({
              title: "Text-to-Speech Failed",
              description: ttsResponse.error,
              variant: "destructive",
            });
          } else if (audioRef.current && ttsResponse.audioDataUri) {
            audioRef.current.src = ttsResponse.audioDataUri;
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
          }
        } catch (error) {
          console.error("Error calling TTS service:", error);
          toast({
            title: "Text-to-Speech Error",
            description: "An unexpected error occurred while trying to generate audio.",
            variant: "destructive",
          });
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

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
        toast({
            title: "Not Supported",
            description: "Voice input is not supported in your browser.",
            variant: "destructive"
        })
        return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, isInitialLoading]);


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
                        {isInitialLoading && (
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
                        {!isInitialLoading && messages.map((message, index) => (
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
                            placeholder="Type your message or use the microphone..."
                            disabled={isLoading || isInitialLoading}
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={handleVoiceInput}
                            disabled={isLoading || isInitialLoading}
                            className={isListening ? 'text-primary ring-2 ring-primary animate-pulse' : ''}
                        >
                            <Mic className="h-5 w-5" />
                            <span className="sr-only">{isListening ? 'Stop listening' : 'Use microphone'}</span>
                        </Button>
                        <Button type="submit" disabled={isLoading || isInitialLoading || !input.trim()}>
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
