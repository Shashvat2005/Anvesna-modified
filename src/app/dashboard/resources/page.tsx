
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Library, Lightbulb, Video, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

type Resource = {
  type: 'Article' | 'Tip' | 'Video';
  title: string;
  author: string;
  credentials?: string;
  avatarText: string;
  date: string;
  thumbnail: string;
  dataAiHint: string;
};

const resources: Resource[] = [
  {
    type: 'Article',
    title: 'Coping with Exam Stress',
    author: 'Dr. Meera Rao',
    credentials: 'Clinical Psychologist',
    avatarText: 'MR',
    date: 'June 15, 2024',
    thumbnail: 'https://placehold.co/600x400.png',
    dataAiHint: 'student studying stress',
  },
  {
    type: 'Tip',
    title: '5 Mindfulness Exercises for Anxiety',
    author: 'Prof. Rajat Sharma',
    credentials: 'Mental Health Researcher',
    avatarText: 'RS',
    date: 'June 12, 2024',
    thumbnail: 'https://placehold.co/600x400.png',
    dataAiHint: 'person meditating calmly',
  },
  {
    type: 'Video',
    title: 'A Guide to Progressive Muscle Relaxation',
    author: 'Dr. Anita Desai',
    credentials: 'Psychiatrist',
    avatarText: 'AD',
    date: 'June 10, 2024',
    thumbnail: 'https://placehold.co/600x400.png',
    dataAiHint: 'yoga relaxation video',
  },
  {
    type: 'Article',
    title: 'Understanding Cognitive Behavioral Therapy (CBT)',
    author: 'Dr. Vikram Menon',
    credentials: 'Psychiatrist',
    avatarText: 'VM',
    date: 'June 8, 2024',
    thumbnail: 'https://placehold.co/600x400.png',
    dataAiHint: 'therapy session illustration',
  },
  {
      type: 'Tip',
      title: 'Building a Healthy Sleep Routine',
      author: 'Ms. Sunita Rao',
      credentials: 'Licensed Counselor',
      avatarText: 'SR',
      date: 'June 5, 2024',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'peaceful bedroom sleep',
  },
  {
      type: 'Video',
      title: 'Communicating Effectively in Relationships',
      author: 'Mr. Rajesh Singh',
      credentials: 'MHP',
      avatarText: 'RS',
      date: 'June 2, 2024',
      thumbnail: 'https://placehold.co/600x400.png',
      dataAiHint: 'couple talking communication',
  }
];

const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="shadow-lg flex flex-col hover:shadow-xl transition-shadow">
        <CardHeader className="p-0">
            <Image src={resource.thumbnail} alt={resource.title} width={600} height={400} className="rounded-t-lg object-cover" data-ai-hint={resource.dataAiHint} />
        </CardHeader>
        <CardContent className="flex-grow pt-4">
             <CardTitle className="font-headline text-lg leading-snug">{resource.title}</CardTitle>
             <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${resource.avatarText}`} />
                    <AvatarFallback>{resource.avatarText}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">{resource.author}</p>
                    <p className="text-xs">{resource.credentials}</p>
                </div>
            </div>
             <p className="text-xs text-muted-foreground mt-2">{resource.date}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button variant="link" className="p-0 h-auto">Read More</Button>
            <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                </Button>
            </div>
        </CardFooter>
    </Card>
);

export default function ResourcesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = resources.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const articles = filteredResources.filter(r => r.type === 'Article');
    const tips = filteredResources.filter(r => r.type === 'Tip');
    const videos = filteredResources.filter(r => r.type === 'Video');

    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="text-left mb-8">
                    <h1 className="font-headline text-3xl font-bold text-foreground">Resources Library</h1>
                    <p className="text-muted-foreground mt-1">
                        Explore our curated collection of articles, tips, and videos to support your mental wellness journey.
                    </p>
                </div>

                 <Card className="mb-8 shadow-md">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                            <div className="relative lg:col-span-2">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Search by title or author..." 
                                    className="pl-10 h-11" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="h-11"><SelectValue placeholder="Filter by Topic" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="anxiety">Anxiety</SelectItem>
                                    <SelectItem value="stress">Stress</SelectItem>
                                    <SelectItem value="depression">Depression</SelectItem>
                                    <SelectItem value="sleep">Sleep</SelectItem>
                                </SelectContent>
                            </Select>
                             <Select>
                                <SelectTrigger className="h-11"><SelectValue placeholder="Filter by Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="tip">Tip</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="articles">Articles</TabsTrigger>
                        <TabsTrigger value="tips">Tips</TabsTrigger>
                        <TabsTrigger value="videos">Videos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredResources.map((resource, i) => <ResourceCard key={i} resource={resource} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="articles">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((resource, i) => <ResourceCard key={i} resource={resource} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="tips">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tips.map((resource, i) => <ResourceCard key={i} resource={resource} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="videos">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {videos.map((resource, i) => <ResourceCard key={i} resource={resource} />)}
                        </div>
                    </TabsContent>
                </Tabs>

                <footer className="mt-12 text-center">
                     <Button size="lg">View All Resources</Button>
                </footer>
            </div>
        </div>
    );
}
