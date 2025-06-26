
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Search, Star, Stethoscope } from "lucide-react";

type Therapist = {
  name: string;
  credentials: string;
  avatar: string;
  image: string;
  specialties: string[];
  rating: number;
  fees: string;
  availability: string[];
  dataAiHint: string;
};

const therapists: Therapist[] = [
    {
        name: 'Dr. Neha Verma',
        credentials: 'PhD (Clinical Psychology)',
        avatar: 'NV',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'female therapist portrait',
        specialties: ['Anxiety', 'Academic Stress', 'Sleep Issues'],
        rating: 4.5,
        fees: 'Rs. 1,000 – Rs. 1,800',
        availability: ['June 28 (Sat) 4 PM', 'June 30 (Mon) 11 AM', 'July 2 (Wed) 6 PM'],
    },
    {
        name: 'Mr. Rajesh Singh',
        credentials: 'MHP',
        avatar: 'RS',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'male therapist portrait',
        specialties: ['Depression', 'Relationship Conflict'],
        rating: 3.8,
        fees: 'Rs. 700 – Rs. 1,200',
        availability: ['June 29 (Sun) 2 PM', 'July 1 (Tue) 10 AM', 'July 3 (Thu) 3 PM'],
    },
    {
        name: 'Dr. Aisha Patel',
        credentials: 'PsyD',
        avatar: 'AP',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'female therapist professional',
        specialties: ['Exam Anxiety', 'Time Management', 'CBT'],
        rating: 4.3,
        fees: 'Rs. 900 – Rs. 1,600',
        availability: ['June 27 (Fri) 5 PM', 'June 29 (Sun) 9 AM', 'July 1 (Tue) 4 PM'],
    },
    {
        name: 'Ms. Sunita Rao',
        credentials: 'Licensed Counselor',
        avatar: 'SR',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'female counselor portrait',
        specialties: ['Mindfulness', 'Stress Management', 'Grief'],
        rating: 4.8,
        fees: 'Rs. 850 – Rs. 1,400',
        availability: ['June 28 (Sat) 10 AM', 'July 1 (Tue) 1 PM', 'July 4 (Fri) 11 AM'],
    },
    {
        name: 'Dr. Vikram Menon',
        credentials: 'Psychiatrist',
        avatar: 'VM',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'male psychiatrist portrait',
        specialties: ['Mood Disorders', 'ADHD', 'Medication Management'],
        rating: 4.6,
        fees: 'Rs. 1,200 – Rs. 2,000',
        availability: ['June 30 (Mon) 3 PM', 'July 2 (Wed) 9 AM', 'July 5 (Sat) 12 PM'],
    },
    {
        name: 'Mrs. Fatima Khan',
        credentials: 'MA, Counseling Psychology',
        avatar: 'FK',
        image: 'https://placehold.co/300x400.png',
        dataAiHint: 'female therapist headshot',
        specialties: ['Family Issues', 'Self-Esteem', 'Trauma'],
        rating: 4.4,
        fees: 'Rs. 750 – Rs. 1,300',
        availability: ['June 29 (Sun) 5 PM', 'July 3 (Thu) 6 PM', 'July 6 (Sun) 10 AM'],
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center gap-1">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
            {/* Note: lucide-react doesn't have a half-star, so we'll just use filled/empty for now */}
            {[...Array(emptyStars + (halfStar ? 1 : 0))].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />)}
            <span className="text-xs text-muted-foreground ml-1">({rating.toFixed(1)})</span>
        </div>
    );
};

export default function TherapistsPage() {
    const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const handleBookNow = (therapist: Therapist) => {
        setSelectedTherapist(therapist);
        setIsModalOpen(true);
    }
    
    return (
        <div className="bg-muted/40 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="text-left mb-8">
                    <h1 className="font-headline text-3xl font-bold text-foreground">Book a Therapist</h1>
                    <p className="text-muted-foreground mt-1">Connect with licensed professionals for personalized care—sliding-scale fees available.</p>
                    <p className="text-sm text-muted-foreground mt-2 max-w-3xl">
                        Find the right therapist for you by browsing our directory. All sessions are confidential and secured with end-to-end encryption. You can filter by specialty, rating, or fee to match your needs.
                    </p>
                </div>

                <Card className="mb-8 shadow-md">
                    <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                            <div className="relative lg:col-span-2">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="Search therapist by name or specialty..." className="pl-10 h-11" />
                            </div>
                            <Select>
                                <SelectTrigger className="h-11"><SelectValue placeholder="Specialty" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="anxiety">Anxiety</SelectItem>
                                    <SelectItem value="depression">Depression</SelectItem>
                                    <SelectItem value="relationships">Relationships</SelectItem>
                                    <SelectItem value="stress">Academic Stress</SelectItem>
                                </SelectContent>
                            </Select>
                             <Select>
                                <SelectTrigger className="h-11"><SelectValue placeholder="Rating" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="4+">4 Stars & Up</SelectItem>
                                    <SelectItem value="3+">3 Stars & Up</SelectItem>
                                    <SelectItem value="any">Any</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="h-11"><SelectValue placeholder="Fee Range" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<1000">Under Rs. 1000</SelectItem>
                                    <SelectItem value="1000-1500">Rs. 1000 - Rs. 1500</SelectItem>
                                    <SelectItem value=">1500">Over Rs. 1500</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {therapists.map(therapist => (
                            <Card key={therapist.name} className="shadow-lg flex flex-col hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-4">
                                        <Image src={therapist.image} alt={therapist.name} width={80} height={100} className="rounded-lg object-cover" data-ai-hint={therapist.dataAiHint} />
                                        <div className="w-full">
                                            <CardTitle className="font-headline text-xl">{therapist.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{therapist.credentials}</p>
                                            <StarRating rating={therapist.rating} />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-3">
                                    <p className="text-sm font-semibold text-primary">{therapist.specialties.join(' - ')}</p>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-muted-foreground">Fees</p>
                                        <p className="text-sm">{therapist.fees} per session</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-muted-foreground">Next Available</p>
                                        <ul className="text-sm list-disc pl-5 mt-1">
                                            {therapist.availability.slice(0, 3).map(slot => <li key={slot}>{slot}</li>)}
                                        </ul>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => handleBookNow(therapist)}>Book Now</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    {selectedTherapist && (
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="font-headline flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={selectedTherapist.image} alt={selectedTherapist.name} data-ai-hint={selectedTherapist.dataAiHint} />
                                        <AvatarFallback>{selectedTherapist.avatar}</AvatarFallback>
                                    </Avatar>
                                    Book a session with {selectedTherapist.name}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                               <p className="text-sm text-muted-foreground mb-4">Select a date and time that works for you. All times are in your local timezone.</p>
                                <div className="flex justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="rounded-md border"
                                    />
                                </div>
                                <div className="mt-4">
                                    <p className="font-semibold">Fee Summary</p>
                                    <p className="text-sm text-muted-foreground">Session with {selectedTherapist.name}: <span className="font-medium text-foreground">{selectedTherapist.fees} (sliding scale)</span></p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button>Confirm Booking</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>

                <footer className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Need help? Email <a href="mailto:support@anvesna.app" className="underline text-primary">support@anvesna.app</a></p>
                    <div className="mt-2 space-x-4">
                        <a href="#" className="underline">Privacy Policy</a>
                        <a href="#" className="underline">Terms of Service</a>
                    </div>
                </footer>
            </div>
        </div>
    );
}
