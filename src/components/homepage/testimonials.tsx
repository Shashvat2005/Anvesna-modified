'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Anvesna felt like a safe space I desperately needed. The AI companion helped me untangle my thoughts without any judgment. It’s been a game-changer for my anxiety.",
    name: "Priya S.",
    title: "Engineering Student",
    avatar: "PS",
  },
  {
    quote: "Connecting with other students anonymously made me realize I wasn't alone. The peer support groups are incredible for those days when you just need someone to listen.",
    name: "Rahul K.",
    title: "Arts & Humanities Student",
    avatar: "RK",
  },
  {
    quote: "I was hesitant about therapy, but Anvesna made it so accessible. Finding a therapist who understood my cultural background was so important. I'm grateful for this platform.",
    name: "Aisha M.",
    title: "Medical Student",
    avatar: "AM",
  },
];

export function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
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
            Words from Our Community
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See how Anvesna is making a difference in the lives of students across India.
          </p>
        </motion.div>
        <motion.div
          className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="flex flex-col justify-between shadow-lg h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-muted-foreground italic">
                    “{testimonial.quote}”
                  </blockquote>
                </CardContent>
                <div className="mt-4 flex items-center gap-4 px-6 pb-6">
                  <Avatar>
                    <AvatarImage src={`https://placehold.co/40x40.png?text=${testimonial.avatar}`} data-ai-hint="person portrait" />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
