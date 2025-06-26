import Image from 'next/image';
import { Lightbulb, Users, Lock, MessageSquareHeart } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Journaling',
    description: 'Our smart journal understands your mood patterns, helping you explore your thoughts and feelings in a safe, guided space. Get personalized insights to foster self-awareness.',
    icon: MessageSquareHeart,
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'journaling mobile app'
  },
  {
    name: 'Anonymous Peer Support',
    description: 'Join communities of students who understand what you\'re going through. Share your journey, offer support, and break the stigma together in a moderated, anonymous environment.',
    icon: Users,
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'community chat app'
  },
  {
    name: 'Personalized Recommendations',
    description: 'Based on your journal entries and mood data, Anvesna provides tailored recommendations, from mindfulness exercises to relevant articles, to support your mental wellbeing proactively.',
    icon: Lightbulb,
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'mobile app dashboard'
  },
  {
    name: 'Absolute Privacy',
    description: 'Your data is yours. We use end-to-end encryption and adhere to the strictest privacy standards. Your conversations, whether with our AI or in peer groups, are secure.',
    icon: Lock,
    image: 'https://placehold.co/500x500.png',
    dataAiHint: 'data security privacy'
  },
];

export function Features() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Tools Designed for Your Wellness
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore the features that make Anvesna a unique and powerful companion on your mental health journey.
          </p>
        </div>
        <div className="mt-16 space-y-16">
          {features.map((feature, index) => (
            <div key={feature.name} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={`flex justify-center ${index % 2 === 0 ? 'lg:order-last' : ''}`}>
                <Image
                  src={feature.image}
                  alt={`${feature.name} feature screenshot`}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={feature.dataAiHint}
                />
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold">{feature.name}</h3>
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
