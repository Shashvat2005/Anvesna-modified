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
    <section className="bg-primary text-primary-foreground py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="font-headline text-5xl font-bold tracking-tight text-white sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-4 max-w-xs text-base text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
