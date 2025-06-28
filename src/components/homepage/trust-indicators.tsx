'use client';

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, School } from "lucide-react";

const indicators = [
  {
    icon: ShieldCheck,
    text: "Privacy Assured & HIPAA Compliant",
  },
  {
    icon: UserCheck,
    text: "Licensed & Verified Professionals",
  },
  {
    icon: School,
    text: "Trusted by University Partners",
  },
];

export function TrustIndicators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.section
      className="bg-background py-12 sm:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {indicators.map((indicator, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center gap-4"
              variants={itemVariants}
            >
              <indicator.icon
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <span className="text-base font-medium text-muted-foreground">
                {indicator.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
