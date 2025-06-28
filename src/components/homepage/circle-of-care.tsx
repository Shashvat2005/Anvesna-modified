'use client';

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, Stethoscope } from "lucide-react";

const carePillars = [
  {
    icon: Bot,
    title: "AI Companion",
    description:
      "Get 24/7 emotional support and personalized insights through our NLP-powered journaling and mood tracking tool.",
  },
  {
    icon: Users,
    title: "Peer Communities",
    description:
      "Connect with fellow students in anonymous, moderated support groups. Share experiences and find strength in community.",
  },
  {
    icon: Stethoscope,
    title: "Professional Care",
    description:
      "Access licensed therapists and mental health professionals for expert guidance and confidential sessions when you need it.",
  },
];

export function CircleOfCare() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-warm-white py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            A Complete <span className="text-primary">Circle of Care</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We believe in a holistic approach to mental wellness, combining technology, community, and professional expertise.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {carePillars.map((pillar) => (
            <motion.div key={pillar.title} variants={itemVariants}>
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
    </section>
  );
}
