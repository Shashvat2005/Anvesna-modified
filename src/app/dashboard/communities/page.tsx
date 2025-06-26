import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Search, Users, Heart, MessageCircle } from "lucide-react";

const communities = [
    { name: 'Academic Stress', members: 128, description: 'Share tips and support for handling coursework, exams, and pressure.' },
    { name: 'Anxiety Support', members: 256, description: 'A safe space to discuss anxiety triggers and coping mechanisms.' },
    { name: 'Relationship Advice', members: 98, description: 'Navigate personal relationships with support from your peers.' },
    { name: 'General Chat', members: 512, description: 'A place to unwind and talk about anything on your mind.' },
];

const posts = [
    {
        id: 1,
        author: 'Anonymous Lion',
        avatar: 'AL',
        community: 'Academic Stress',
        content: 'Finals are coming up and I am feeling so overwhelmed. How does everyone else cope with the pressure?',
        likes: 15,
        comments: 4,
    },
    {
        id: 2,
        author: 'Quiet Turtle',
        avatar: 'QT',
        community: 'Anxiety Support',
        content: 'My social anxiety has been really bad lately. Just thinking about going to class makes my heart race. Any advice?',
        likes: 22,
        comments: 8,
    },
    {
        id: 3,
        author: 'Brave Eagle',
        avatar: 'BE',
        community: 'General Chat',
        content: 'Just wanted to share a small win! I finally went to the gym today after putting it off for weeks. Feeling proud!',
        likes: 45,
        comments: 12,
    }
]

export default function CommunitiesPage() {
  return (
    <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto max-w-7xl">
            <div className="text-left mb-8">
                <h1 className="font-headline text-3xl font-bold text-foreground">Peer Communities</h1>
                <p className="text-muted-foreground mt-1">Connect with peers, share experiences, and find support anonymously.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Tabs defaultValue="feed">
                        <div className="flex justify-between items-center mb-4">
                            <TabsList>
                                <TabsTrigger value="feed">Your Feed</TabsTrigger>
                                <TabsTrigger value="discover">Discover</TabsTrigger>
                            </TabsList>
                             <Button>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Post
                            </Button>
                        </div>
                        <TabsContent value="feed" className="space-y-6">
                            {posts.map(post => (
                                <Card key={post.id} className="shadow-md">
                                    <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                                        <Avatar>
                                            <AvatarImage src={`https://placehold.co/40x40.png?text=${post.avatar}`} />
                                            <AvatarFallback>{post.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{post.author}</p>
                                            <p className="text-sm text-muted-foreground">posted in <span className="font-medium text-primary">{post.community}</span></p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-foreground">{post.content}</p>
                                    </CardContent>
                                    <CardFooter className="flex gap-4">
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                                            <Heart className="h-4 w-4"/>
                                            <span>{post.likes}</span>
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                                            <MessageCircle className="h-4 w-4"/>
                                            <span>{post.comments}</span>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </TabsContent>
                        <TabsContent value="discover">
                            <p className="text-muted-foreground text-center py-8">Discovery feed coming soon!</p>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Find a Community</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search communities..." className="pl-8" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Popular Groups</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {communities.map(community => (
                                <div key={community.name} className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-lg">
                                        <Users className="h-5 w-5 text-primary"/>
                                    </div>
                                    <div>
                                        <p className="font-semibold">{community.name}</p>
                                        <p className="text-sm text-muted-foreground">{community.members} members</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="ml-auto">Join</Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
