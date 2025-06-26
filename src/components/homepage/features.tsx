import Image from 'next/image';
import { Lightbulb, Users, Lock, Stethoscope } from 'lucide-react';

const features = [
  {
    name: 'Verified & Affordable Therapists',
    description: 'Connect instantly with licensed professionals, pre-vetted for quality and trust, offering transparent and budget-friendly rates.',
    icon: Stethoscope,
    image: 'https://pplx-res.cloudinary.com/image/upload/v1750951790/gpt4o_images/heekjgtcitzbz9gylc6q.png',
    dataAiHint: 'therapist consultation online'
  },
  {
    name: 'Anonymous Peer Support',
    description: 'Join communities of people who understand what you\'re going through. Share your journey, offer support, and break the stigma together in a moderated, anonymous environment.',
    icon: Users,
    image: 'https://pplx-res.cloudinary.com/image/upload/v1750950234/gpt4o_images/qmlzwsvjdlniuzxeziti.png',
    dataAiHint: 'community chat illustration'
  },
  {
    name: 'Personalized AI companion support',
    description: 'Receive AI-driven recommendations and emotional support tailored to your mood history and journal entries. Anvesna helps you navigate your feelings with proactive suggestions and insights.',
    icon: Lightbulb,
    image: 'https://pplx-res.cloudinary.com/image/upload/v1750952023/gpt4o_images/fhjt9zyadbpdweoxtnhm.png',
    dataAiHint: 'wellness dashboard illustration'
  },
  {
    name: 'Absolute Privacy',
    description: 'Your data is yours. We use end-to-end encryption and adhere to the strictest privacy standards. Your conversations, whether with our AI or in peer groups, are secure.',
    icon: Lock,
    image: 'https://pplx-res.cloudinary.com/image/upload/v1750952364/gpt4o_images/aikeohhznvzsjlwblrek.png',
    dataAiHint: 'data privacy illustration'
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
