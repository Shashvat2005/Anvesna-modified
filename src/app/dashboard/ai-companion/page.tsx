'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { respondToUserQuery } from '@/ai/flows/respond-to-user-query';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI companion. How are you feeling today? Feel free to share what's on your mind.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await respondToUserQuery({ query: input });
      const assistantMessage: Message = { role: 'assistant', content: response.response };
      setMessages((prev) => [...prev, assistantMessage]);
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
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <div className="bg-muted/40 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-3xl">
            <Card className="h-[calc(100vh-8rem)] flex flex-col shadow-lg">
                <CardHeader className="border-b">
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot />
                            </AvatarFallback>
                        </Avatar>
                        AI Companion
                    </CardTitle>
                    <CardDescription>
                        Conversational AI provides empathetic, personalized support based on your journal and mood history.
                        <em className="block text-xs mt-2">
                            All insights and prompts are drawn from your secure journaling entries to give you the most relevant emotional support.
                        </em>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
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
                    </ScrollArea>
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
    </div>
  );
}
