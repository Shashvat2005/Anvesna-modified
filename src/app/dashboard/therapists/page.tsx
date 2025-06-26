import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Stethoscope } from "lucide-react";

const therapists = [
    {
        name: 'Dr. Anjali Sharma',
        avatar: 'AS',
        title: 'Clinical Psychologist',
        specialties: ['Anxiety', 'Depression', 'CBT'],
        bio: 'Dr. Sharma has over 10 years of experience working with students on stress management and emotional regulation.',
    },
    {
        name: 'Mr. Rohan Desai',
        avatar: 'RD',
        title: 'Licensed Counselor',
        specialties: ['Relationships', 'Family Issues', 'Grief'],
        bio: 'Rohan specializes in creating a safe and empathetic space for students to explore their interpersonal challenges.',
    },
    {
        name: 'Ms. Priya Kumar',
        avatar: 'PK',
        title: 'Mental Health Counselor',
        specialties: ['Mindfulness', 'Trauma', 'LGBTQ+'],
        bio: 'Priya uses a holistic, mindfulness-based approach to help students build resilience and self-compassion.',
    },
    {
        name: 'Dr. Sameer Khan',
        avatar: 'SK',
        title: 'Psychiatrist',
        specialties: ['Medication Management', 'ADHD', 'Mood Disorders'],
        bio: 'Dr. Khan provides expert consultation for students considering or currently using medication as part of their treatment.',
    }
];

export default function TherapistsPage() {
    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-6xl">
                <div className="text-left mb-8">
                    <h1 className="font-headline text-3xl font-bold text-foreground">Find a Therapist</h1>
                    <p className="text-muted-foreground mt-1">Connect with licensed professionals for confidential support.</p>
                </div>

                <Card className="mb-8 shadow-md">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div className="relative md:col-span-2">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search by name or specialty..." className="pl-10 h-11" />
                            </div>
                            <div>
                                <Select>
                                    <SelectTrigger className="h-11">
                                        <SelectValue placeholder="Specialty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="anxiety">Anxiety</SelectItem>
                                        <SelectItem value="depression">Depression</SelectItem>
                                        <SelectItem value="relationships">Relationships</SelectItem>
                                        <SelectItem value="trauma">Trauma</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button size="lg" className="h-11">Search Therapists</Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {therapists.map(therapist => (
                        <Card key={therapist.name} className="shadow-lg flex flex-col">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar className="h-16 w-16">
                                     <AvatarImage src={`https://placehold.co/64x64.png?text=${therapist.avatar}`} />
                                    <AvatarFallback className="text-xl">{therapist.avatar}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="font-headline text-xl">{therapist.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{therapist.title}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {therapist.specialties.map(spec => (
                                        <Badge key={spec} variant="secondary">{spec}</Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{therapist.bio}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <Stethoscope className="mr-2 h-4 w-4" />
                                    Book a Session
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
