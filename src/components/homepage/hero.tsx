import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-warm-white py-12 sm:py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Complete Mental Health Support Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get 24/7 support from your personal AI companion, connect
              anonymously with others facing similar challenges, and book
              sessions with licensed therapists—all in one platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
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
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground lg:text-left">
              Trusted by{" "}
              <strong className="text-foreground">10,000+ users</strong> seeking
              mental wellness.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://pplx-res.cloudinary.com/image/upload/v1750949129/gpt4o_images/nywrvddvn9tkpefryogj.png"
              alt="A person meditating peacefully, representing mental wellness."
              width={500}
              height={500}
              className="rounded-full object-cover shadow-2xl"
              data-ai-hint="peaceful meditation illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
