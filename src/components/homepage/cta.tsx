import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 text-center shadow-2xl rounded-2xl sm:px-16">
          <h2 className="font-headline mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Take the First Step?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Join thousands of students who are prioritizing their mental health. Anvesna is here to support you, every step of the way.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link href="/signup">Start Your Wellness Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
