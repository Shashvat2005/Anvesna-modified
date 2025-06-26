import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bot, Users, Stethoscope } from "lucide-react";

export function Hero() {
  return (
    <section className="bg-warm-white py-12 sm:py-20 lg:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Get Instant AI Support, Join Safe Communities, Book Licensed
              Therapists
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
                <Link href="/dashboard/therapists">Browse Therapists</Link>
              </Button>
            </div>
            <div className="mt-10 space-y-3 text-center lg:text-left">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <Bot className="h-5 w-5 text-primary" />
                <p>
                  <strong className="text-foreground">AI Companion</strong> -
                  Instant support anytime
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <Users className="h-5 w-5 text-primary" />
                <p>
                  <strong className="text-foreground">Anonymous Groups</strong> -
                  Connect safely with peers
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start">
                <Stethoscope className="h-5 w-5 text-primary" />
                <p>
                  <strong className="text-foreground">
                    Licensed Therapists
                  </strong>{" "}
                  - Professional care when needed
                </p>
              </div>
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
