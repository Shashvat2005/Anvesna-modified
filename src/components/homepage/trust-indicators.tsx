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
  return (
    <section
      className="bg-background py-12 sm:py-16"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-4"
            >
              <indicator.icon
                className="h-8 w-8 text-primary"
                aria-hidden="true"
              />
              <span className="text-base font-medium text-muted-foreground">
                {indicator.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
