
'use client';

import Link from "next/link";
import { ArrowLeft, MessageSquarePlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type Reaction = { [emoji: string]: number };

type Post = {
    id: number;
    author: string;
    authorInitials: string;
    timestamp: string;
    content: string;
    reactions: Reaction;
};

type CommunityData = {
    title: string;
    description: string;
    members: number;
    posts: Post[];
    trendingTopics: string[];
};

const communitiesData: Record<string, CommunityData> = {
    'anxiety-support': {
        title: 'Anxiety Support Group',
        description: 'A safe space to share experiences, coping strategies, and find support for anxiety.',
        members: 1254,
        posts: [
            { id: 1, author: 'BraveHeart22', authorInitials: 'BH', timestamp: '2h ago', content: 'Feeling really overwhelmed with my final exams coming up. My anxiety is through the roof. Any tips on how to stay calm and focused?', reactions: { '🙏': 45, '👍': 30, '❤️': 60 } },
            { id: 2, author: 'QuietObserver', authorInitials: 'QO', timestamp: '8h ago', content: 'Does anyone else get really bad social anxiety at university events? I want to make friends but it feels impossible.', reactions: { '🤝': 55, '❤️': 20, '😢': 12 } },
            { id: 3, author: 'HopefulSoul', authorInitials: 'HS', timestamp: '1d ago', content: 'Small win today! I used the 5-4-3-2-1 grounding technique during a moment of panic and it actually helped. Sharing in case it helps someone else.', reactions: { '🎉': 102, '👍': 80, '❤️': 45 } },
        ],
        trendingTopics: ['#ExamStress', '#SocialAnxiety', '#CopingMechanisms', '#Grounding', '#PanicAttacks'],
    },
    'depression-low-mood': {
        title: 'Depression & Low Mood',
        description: 'Connect with others who understand the challenges of depression and low mood.',
        members: 978,
        posts: [
            { id: 1, author: 'DayByDay', authorInitials: 'DD', timestamp: '5h ago', content: "Some days it's just hard to get out of bed. It feels like a heavy blanket. Sending strength to anyone feeling the same.", reactions: { '❤️': 78, '🤝': 65 } },
            { id: 2, author: 'StrivingSparrow', authorInitials: 'SS', timestamp: '1d ago', content: "My therapist suggested I try to find one small thing to look forward to each day. Today it was a cup of tea. It's not a cure, but it's something.", reactions: { '👍': 95, '❤️': 50 } },
            { id: 3, author: 'Listener', authorInitials: 'L', timestamp: '2d ago', content: "What do you all do when you feel the emptiness creeping in? Looking for some new ideas to try.", reactions: { '🤔': 40, '💬': 25 } },
        ],
        trendingTopics: ['#Motivation', '#SelfCare', '#SmallWins', '#Therapy', '#Support'],
    },
    'addiction-detox-support': {
        title: 'Addiction & Detox Support',
        description: 'A community for recovery, digital detox, and breaking harmful habits.',
        members: 452,
        posts: [
             { id: 1, author: 'CleanSlate24', authorInitials: 'CS', timestamp: '1h ago', content: "Day 7 of my digital detox. It's been tough, but my mind feels so much clearer. The urge to scroll is real though.", reactions: { '💪': 50, '👍': 32 } },
             { id: 2, author: 'OneStepAtATime', authorInitials: 'OS', timestamp: '12h ago', content: "Finding healthier ways to cope with stress instead of turning to old habits. Any recommendations for good books or podcasts?", reactions: { '📚': 22, '💬': 18 } },
        ],
        trendingTopics: ['#DigitalDetox', '#Recovery', '#NewHabits', '#Coping', '#Support'],
    },
    'self-growth-journey': {
        title: 'Self-Growth Journey',
        description: 'Share your personal development journey, from learning new skills to building confidence.',
        members: 1121,
        posts: [
            { id: 1, author: 'GrowthSeeker', authorInitials: 'GS', timestamp: '3h ago', content: "I finally finished the book 'Atomic Habits' and it's full of amazing insights. Has anyone else read it? What was your biggest takeaway?", reactions: { '💡': 60, '👍': 45 } },
        ],
        trendingTopics: ['#PersonalDevelopment', '#Habits', '#Confidence', '#Learning', '#Motivation'],
    },
    'general-wellness-chat': {
        title: 'General Wellness Chat',
        description: 'A space for general wellness discussions, from nutrition to exercise to mindfulness.',
        members: 2043,
        posts: [
            { id: 1, author: 'WellnessWarrior', authorInitials: 'WW', timestamp: '6h ago', content: "What's everyone's favorite healthy and easy meal to make during a busy week?", reactions: { '🥗': 35, '💬': 28 } },
        ],
        trendingTopics: ['#Wellness', '#Nutrition', '#Exercise', '#Mindfulness', '#HealthyHabits'],
    },
};

const PostCard = ({ post }: { post: Post }) => (
    <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar>
                <AvatarFallback>{post.authorInitials}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm text-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{post.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
             <div className="flex gap-2 flex-wrap">
                {Object.entries(post.reactions).map(([emoji, count]) => (
                    <Button key={emoji} variant="outline" size="sm" className="flex gap-2">
                        <span>{emoji}</span>
                        <span className="text-xs text-muted-foreground">{count}</span>
                    </Button>
                ))}
            </div>
            <Button variant="ghost">Reply</Button>
        </CardFooter>
    </Card>
)

export default function CommunityPage({ params }: { params: { slug: string } }) {
    const community = communitiesData[params.slug] || {
        title: 'Community Not Found',
        description: 'Please select a valid community.',
        members: 0,
        posts: [],
        trendingTopics: [],
    };

    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto max-w-4xl py-8 px-4">
                <div className="mb-6">
                    <Button asChild variant="ghost" className="mb-4 -ml-4">
                        <Link href="/dashboard/communities">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to All Communities
                        </Link>
                    </Button>
                    <h1 className="font-headline text-3xl font-bold text-foreground">{community.title}</h1>
                    <p className="text-muted-foreground mt-1">{community.description}</p>
                    <p className="text-sm text-primary font-semibold mt-2">{community.members.toLocaleString()} members</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                                    <MessageSquarePlus />
                                    Create a New Post
                                </CardTitle>
                                <CardDescription>Share your thoughts with the community. All posts are anonymous.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Textarea placeholder="What's on your mind?" rows={4} />
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button>
                                    <Send className="mr-2 h-4 w-4" />
                                    Post Anonymously
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="space-y-4">
                            <h2 className="font-headline text-2xl font-bold text-foreground">Recent Posts</h2>
                             {community.posts.length > 0 ? (
                                community.posts.map(post => <PostCard key={post.id} post={post} />)
                             ) : (
                                <p className="text-muted-foreground text-center py-8">No posts yet. Be the first to share!</p>
                             )}
                        </div>

                    </div>
                    <div className="lg:col-span-1 space-y-6 sticky top-8">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline text-lg">Trending Topics</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-wrap gap-2">
                                {community.trendingTopics.map(topic => (
                                    <Badge key={topic} variant="secondary">{topic}</Badge>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline text-lg">Community Guidelines</CardTitle>
                            </CardHeader>
                            <CardContent className="text-xs text-muted-foreground space-y-2">
                                <p><strong>1. Be Kind and Courteous:</strong> We're all in this together to create a welcoming environment.</p>
                                <p><strong>2. No Hate Speech or Bullying:</strong> Make sure everyone feels safe. Bullying of any kind isn't allowed.</p>
                                <p><strong>3. Respect Everyone's Privacy:</strong> What's shared in the group should stay in the group.</p>
                                <p><strong>4. No Promotions or Spam:</strong> This is a space for support, not advertising.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
