
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, CloudRain, LaptopMinimal, TrendingUp, MessagesSquare } from 'lucide-react';
import Link from 'next/link';

const communityGroups = [
    {
        title: 'Anxiety Support Group',
        description: 'A place to share and find support for anxiety.',
        icon: HeartPulse,
        href: '#'
    },
    {
        title: 'Depression & Low Mood',
        description: 'Connect with others who understand depression.',
        icon: CloudRain,
        href: '#'
    },
    {
        title: 'Addiction & Detox Support',
        description: 'Support for addiction recovery and digital detox.',
        icon: LaptopMinimal,
        href: '#'
    },
    {
        title: 'Self-Growth Journey',
        description: 'Share your journey of personal development.',
        icon: TrendingUp,
        href: '#'
    },
    {
        title: 'General Wellness Chat',
        description: 'A space for general wellness discussions.',
        icon: MessagesSquare,
        href: '#'
    }
];

export default function CommunitiesPage() {
    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="text-left mb-8">
                    <h1 className="font-headline text-3xl font-bold text-foreground">Community Support</h1>
                    <p className="text-muted-foreground mt-1">Join anonymous peer groups to share experiences and find solidarity.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {communityGroups.map((group) => (
                        <Card key={group.title} className="shadow-lg flex flex-col hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                     <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                                       <group.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-headline text-xl">{group.title}</CardTitle>
                                        <p className="text-muted-foreground text-sm mt-1">{group.description}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                {/* Content can be added here if needed in the future */}
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={group.href}>Enter Community</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                 <footer className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Remember to be kind and supportive. All posts are anonymous.</p>
                    <div className="mt-2 space-x-4">
                        <a href="#" className="underline">Community Guidelines</a>
                        <a href="#" className="underline">Moderation Policy</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
