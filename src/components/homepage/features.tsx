'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
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
  const textVariants = (fromLeft: boolean) => ({
    hidden: { opacity: 0, x: fromLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  });

  const imageVariants = (fromLeft: boolean) => ({
    hidden: { opacity: 0, x: fromLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  });

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Tools Designed for Your Wellness
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore the features that make Anvesna a unique and powerful companion on your mental health journey.
          </p>
        </motion.div>
        <div className="mt-16 space-y-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className={`flex justify-center ${index % 2 === 0 ? 'lg:order-last' : ''}`}
                variants={imageVariants(index % 2 === 0)}
              >
                <Image
                  src={feature.image}
                  alt={`${feature.name} feature screenshot`}
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={feature.dataAiHint}
                />
              </motion.div>
              <motion.div
                className="text-center lg:text-left"
                variants={textVariants(index % 2 !== 0)}
              >
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold">{feature.name}</h3>
                </div>
                <p className="mt-4 text-lg text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
