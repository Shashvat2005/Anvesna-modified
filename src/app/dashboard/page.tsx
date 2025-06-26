
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, BookOpen, Users, Stethoscope, Smile, Meh, Frown, Laugh, Angry, TrendingUp, BarChart as BarChartIcon, Sun } from 'lucide-react';
import Link from 'next/link';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const moodOptions = [
  { name: 'Happy', icon: Laugh },
  { name: 'Good', icon: Smile },
  { name: 'Okay', icon: Meh },
  { name: 'Sad', icon: Frown },
  { name: 'Angry', icon: Angry },
];

const quickLinks = [
  {
    title: 'AI Companion',
    description: 'Chat with your AI-powered guide anytime.',
    icon: Bot,
    href: '/dashboard/ai-companion',
    color: 'bg-blue-100 dark:bg-blue-900/50',
    textColor: 'text-blue-600 dark:text-blue-300',
  },
  {
    title: 'Journal',
    description: 'Reflect on your thoughts and feelings.',
    icon: BookOpen,
    href: '/dashboard/journal',
    color: 'bg-green-100 dark:bg-green-900/50',
    textColor: 'text-green-600 dark:text-green-300',
  },
  {
    title: 'Community Support',
    description: 'Connect with peers anonymously.',
    icon: Users,
    href: '/dashboard/communities',
    color: 'bg-purple-100 dark:bg-purple-900/50',
    textColor: 'text-purple-600 dark:text-purple-300',
  },
  {
    title: 'Book a Therapist',
    description: 'Book a session with a professional.',
    icon: Stethoscope,
    href: '/dashboard/therapists',
    color: 'bg-pink-100 dark:bg-pink-900/50',
    textColor: 'text-pink-600 dark:text-pink-300',
  },
];

const moodData = [
    { date: 'Mon', mood: 4 },
    { date: 'Tue', mood: 3 },
    { date: 'Wed', mood: 5 },
    { date: 'Thu', mood: 4 },
    { date: 'Fri', mood: 2 },
    { date: 'Sat', mood: 5 },
    { date: 'Sun', mood: 4 },
];

export default function DashboardPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [affirmation, setAffirmation] = useState('');

  useEffect(() => {
    const affirmations = [
      "You are capable of amazing things.",
      "Your presence is a gift to the world.",
      "You are strong, resilient, and brave.",
      "You are making a difference, one day at a time.",
      "Believe in yourself and all that you are."
    ];
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
  }, []);

  return (
    <div className="bg-muted/40 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold text-foreground">Welcome back, Student!</h1>
          <p className="text-muted-foreground mt-1 h-6">{affirmation || 'Loading your daily affirmation...'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Sun className="text-primary"/>
                  How are you feeling today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around items-center flex-wrap gap-4">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.name}
                      variant={selectedMood === mood.name ? 'default' : 'outline'}
                      className={`flex flex-col h-24 w-24 rounded-lg items-center justify-center gap-2 transition-all ${selectedMood === mood.name ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      onClick={() => setSelectedMood(mood.name)}
                    >
                      <mood.icon className="h-8 w-8" />
                      <span className="text-sm">{mood.name}</span>
                    </Button>
                  ))}
                </div>
                 {selectedMood && (
                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground">Thank you for sharing. Remember to be kind to yourself today.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickLinks.map((link) => (
                <Link href={link.href} key={link.title} className="group">
                    <Card className="shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium font-headline">{link.title}</CardTitle>
                        <div className={`p-2 rounded-lg ${link.color}`}>
                            <link.icon className={`h-6 w-6 ${link.textColor}`} />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <TrendingUp className="text-primary"/>
                    Wellness Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center gap-4">
                <div className="text-5xl font-bold text-primary">7</div>
                <div className="text-muted-foreground">consecutive days of check-ins. Keep it up!</div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <BarChartIcon className="text-primary"/>
                    Your Week in Moods
                </CardTitle>
                <CardDescription>A look at your mood patterns from this week.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={moodData}>
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} hide={true}/>
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)",
                        }}
                    />
                    <Bar dataKey="mood" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
