'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

type AnimatedCounterProps = {
  from: number;
  to: number;
  suffix?: string;
};

function AnimatedCounter({ from, to, suffix = '' }: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView, suffix]);

  return <p ref={nodeRef} className="font-headline text-5xl font-bold tracking-tight text-white sm:text-6xl" />;
}


export function Stats() {
  const stats = [
    {
      value: 50,
      suffix: "%",
      label: "of students in India report symptoms of anxiety or depression",
    },
    {
      value: 35,
      suffix: "",
      label: "student suicides occur daily in India, a tragic reality we must change",
    },
    {
      value: 80,
      suffix: "%",
      label: "of students hesitate to seek help due to stigma and lack of access",
    },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.section
      className="bg-primary text-primary-foreground py-16 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
              <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
                <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
                <p className="mt-4 max-w-xs text-base text-primary-foreground/80">
                  {stat.label}
                </p>
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.section>
  );
}
