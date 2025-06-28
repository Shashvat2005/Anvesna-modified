'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({ value, hasPercent }: { value: number; hasPercent?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const transformed = useTransform(springValue, (latest) => {
    return `${Math.round(latest)}${hasPercent ? '%' : ''}`;
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  return <motion.span ref={ref}>{transformed}</motion.span>;
}


export function Stats() {
  const stats = [
    {
      value: "50%",
      label: "of students in India report symptoms of anxiety or depression",
    },
    {
      value: "35",
      label: "student suicides occur daily in India, a tragic reality we must change",
    },
    {
      value: "80%",
      label: "of students hesitate to seek help due to stigma and lack of access",
    },
  ];

  return (
    <motion.section
      className="bg-primary text-primary-foreground py-16 sm:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => {
            const hasPercent = stat.value.includes('%');
            const numericValue = parseInt(stat.value.replace('%', ''), 10);

            return (
              <div key={index} className="flex flex-col items-center">
                <p className="font-headline text-5xl font-bold tracking-tight text-white sm:text-6xl">
                  <AnimatedNumber value={numericValue} hasPercent={hasPercent} />
                </p>
                <p className="mt-4 max-w-xs text-base text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </motion.section>
  );
}
