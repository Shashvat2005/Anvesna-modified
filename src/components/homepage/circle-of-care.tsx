'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Users, Stethoscope } from 'lucide-react';

const carePillars = [
  {
    icon: Bot,
    title: 'AI Companion',
    description:
      'Get 24/7 emotional support and personalized insights through our NLP-powered journaling and mood tracking tool.',
  },
  {
    icon: Users,
    title: 'Peer Communities',
    description:
      'Connect with fellow students in anonymous, moderated support groups. Share experiences and find strength in community.',
  },
  {
    icon: Stethoscope,
    title: 'Professional Care',
    description:
      'Access licensed therapists and mental health professionals for expert guidance and confidential sessions when you need it.',
  },
];

export function CircleOfCare() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      className="bg-warm-white py-16 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center" variants={sectionVariants}>
          <motion.h2
            className="font-headline text-3xl font-bold tracking-tight sm:text-4xl"
            variants={textVariants}
          >
            A Complete <span className="text-primary">Circle of Care</span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
            variants={textVariants}
          >
            We believe in a holistic approach to mental wellness, combining
            technology, community, and professional expertise.
          </motion.p>
        </motion.div>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={sectionVariants}
        >
          {carePillars.map((pillar) => (
            <motion.div key={pillar.title} variants={cardVariants}>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <pillar.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4 font-headline text-2xl">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
