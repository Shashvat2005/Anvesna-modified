'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Cta() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.div
          className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="font-headline mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Ready to Take the First Step?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80"
          >
            Join thousands of students who are prioritizing their mental health. Anvesna is here to support you, every step of the way.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link href="/signup">Start Your Wellness Journey</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
