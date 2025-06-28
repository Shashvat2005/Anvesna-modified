'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-warm-white py-12 sm:py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="font-headline text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Get Instant AI Support, Join Safe Communities, Book Licensed
              Therapists
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground"
              variants={itemVariants}
            >
              Get 24/7 support from your personal AI companion, connect
              anonymously with others facing similar challenges, and book
              sessions with licensed therapists—all in one platform.
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
              variants={itemVariants}
            >
              <Button asChild size="lg">
                <Link href="/signup">Try AI Companion Free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/5 hover:text-primary"
              >
                <Link href="/dashboard/therapists">Find My Therapist</Link>
              </Button>
            </motion.div>
            <motion.p
              className="mt-6 text-center text-sm text-muted-foreground lg:text-left"
              variants={itemVariants}
            >
              Trusted by{' '}
              <strong className="text-foreground">10,000+ users</strong> seeking
              mental wellness.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="https://pplx-res.cloudinary.com/image/upload/v1750949129/gpt4o_images/nywrvddvn9tkpefryogj.png"
              alt="A person meditating peacefully, representing mental wellness."
              width={500}
              height={500}
              className="rounded-full object-cover shadow-2xl"
              data-ai-hint="peaceful meditation illustration"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
