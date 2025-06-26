import { Hero } from "@/components/homepage/hero";
import { TrustIndicators } from "@/components/homepage/trust-indicators";
import { CircleOfCare } from "@/components/homepage/circle-of-care";
import { Stats } from "@/components/homepage/stats";
import { Features } from "@/components/homepage/features";
import { Testimonials } from "@/components/homepage/testimonials";
import { Cta } from "@/components/homepage/cta";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TrustIndicators />
      <CircleOfCare />
      <Stats />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
