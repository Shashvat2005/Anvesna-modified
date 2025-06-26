
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';

const groups = [
    { name: 'Academic Burnout', icon: '📚', members: '1,254 members', description: 'Coping with the pressures of university life and coursework.' },
    { name: 'Anxiety & Stress', icon: '😰', members: '2,487 members', description: 'A safe space to discuss anxiety triggers and coping mechanisms.' },
    { name: 'Relationship Issues', icon: '❤️', members: '1,032 members', description: 'Navigating personal relationships with support from your peers.' },
    { name: 'Sleep & Mindfulness', icon: '🛌', members: '1,780 members', description: 'Tips and tricks for better sleep and a calmer mind.' },
    { name: 'LGBTQ+ Support', icon: '🌈', members: '617 members', description: 'A supportive community for LGBTQ+ students and allies.' },
    { name: 'Career Pressure', icon: '💼', members: '903 members', description: 'Discussing future career anxieties and planning.' },
    { name: 'Family Expectations', icon: '🏠', members: '1,415 members', description: 'Handling pressure and expectations from family.' },
    { name: 'Self-Esteem & Confidence', icon: '💪', members: '1,121 members', description: 'Building self-worth and confidence together.' },
];

const postsData = {
    'Anxiety & Stress': [
        {
            id: 1, author: 'AnonymousUser123', time: '2h ago',
            content: 'Feeling overwhelmed before my exams tomorrow. Any tips on calming nerves?',
            reactions: { '🙏': 45, '👍': 30, '❤️': 60 },
        },
        {
            id: 2, author: 'SilentSupporter', time: '5h ago',
            content: 'I’ve been having panic attacks in crowded places. Does anyone else experience this?',
            reactions: { '😢': 25, '🤝': 40, '🌟': 10 },
        },
        {
            id: 3, author: 'CalmSeeker', time: '1d ago',
            content: 'Started morning meditation three days ago, it’s helping a bit. Would love more guided resources.',
            reactions: { '🌅': 50, '👍': 20, '💬': 15 },
        }
    ],
    // Add mock posts for other groups if needed
};

const trendingTopics = ['#ExamStress', '#CopingStrategies', '#Mindfulness', '#Relationships', '#SelfCare'];
const activeMembers = ['BraveBadger', 'HelpfulHippo', 'WiseWombat'];

export default function CommunitiesPage() {
    const [selectedGroup, setSelectedGroup] = useState(groups[1]); // Default to Anxiety & Stress
    const [isJoined, setIsJoined] = useState(true);

    const feedPosts = postsData[selectedGroup.name] || [];

    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="text-left mb-8">
                    <h1 className="font-headline text-3xl font-bold text-foreground">Community Support</h1>
                    <p className="text-muted-foreground mt-1">Join anonymous peer groups to share experiences and find solidarity.</p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-3xl">Select a topic to view discussions or start a new conversation in your own words. All interactions are anonymous to protect your privacy.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Column: Group List */}
                    <div className="lg:col-span-1 space-y-4">
                       <Card className="shadow-md">
                           <CardHeader>
                               <CardTitle className="font-headline text-xl">All Groups</CardTitle>
                           </CardHeader>
                           <CardContent className="space-y-2">
                               {groups.map(group => (
                                   <button key={group.name} onClick={() => setSelectedGroup(group)} className={cn(
                                       "w-full text-left p-3 rounded-lg flex items-center gap-4 transition-colors",
                                       selectedGroup.name === group.name ? "bg-primary/10 text-primary font-semibold" : "hover:bg-accent"
                                   )}>
                                       <span className="text-2xl">{group.icon}</span>
                                       <div>
                                           <p>{group.name}</p>
                                           <p className="text-xs text-muted-foreground">{group.members}</p>
                                       </div>
                                   </button>
                               ))}
                           </CardContent>
                       </Card>
                       <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">Group Insights</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Trending Topics</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingTopics.map(topic => (
                                            <span key={topic} className="text-xs bg-primary/10 text-primary p-1 rounded">{topic}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-2">Most Active Members</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                        {activeMembers.map(member => <li key={member}>- {member}</li>)}
                                    </ul>
                                </div>
                            </CardContent>
                       </Card>
                    </div>

                    {/* Right Column: Group Feed */}
                    <div className="lg:col-span-3 space-y-6">
                        <Card className="shadow-md">
                            <CardHeader className="flex flex-row justify-between items-start">
                                <div>
                                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                                        <span className="text-3xl">{selectedGroup.icon}</span>
                                        {selectedGroup.name}
                                    </CardTitle>
                                    <CardDescription className="mt-1">{selectedGroup.description}</CardDescription>
                                </div>
                                <Button variant={isJoined ? 'outline' : 'default'} onClick={() => setIsJoined(!isJoined)}>
                                    {isJoined ? 'Leave Group' : 'Join Group'}
                                </Button>
                            </CardHeader>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">New Post</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <Textarea placeholder="Share something with your peers..." rows={4}/>
                            </CardContent>
                            <CardFooter className="justify-between">
                                {/* Future: Mood-tag emoji picker */}
                                <div></div> 
                                <Button>Post</Button>
                            </CardFooter>
                        </Card>

                        <div className="space-y-4">
                            {feedPosts.length > 0 ? feedPosts.map(post => (
                                <Card key={post.id} className="shadow-sm">
                                    <CardHeader>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback>{post.author.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-semibold text-foreground">{post.author}</span>
                                            <span>·</span>
                                            <span>{post.time}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{post.content}</p>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {Object.entries(post.reactions).map(([emoji, count]) => (
                                                <div key={emoji} className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-accent text-sm cursor-pointer hover:bg-primary/20">
                                                    <span>{emoji}</span>
                                                    <span className="font-medium text-muted-foreground">{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button variant="ghost">Reply</Button>
                                    </CardFooter>
                                </Card>
                            )) : (
                                <Card className="text-center py-12">
                                    <p className="text-muted-foreground">No posts in this group yet. Be the first to share!</p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                 <footer className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Remember to be kind and supportive. All posts are anonymous.</p>
                    <div className="mt-2 space-x-4">
                        <a href="#" className="underline">Community Guidelines</a>
                        <a href="#" className="underline">Moderation Policy</a>
                        <a href="#" className="underline">Report a Post</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
