import ScrollReveal from "./ScrollReveal";

const pillars = [
  {
    title: "Knowledge",
    description:
      "Educating our community on the intersections of cannabis with health, rights, and culture.",
  },
  {
    title: "Purpose",
    description:
      "Rooted in community impact through charitable involvement and cannabis education.",
  },
  {
    title: "The Spirit of Family",
    description:
      "Fostering togetherness and human connection in the vast world of cannabis.",
  },
];

const CorePillars = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Built on Principle
          </h2>
        </ScrollReveal>

        {/* Pyramid — triangle shape with progressively wider rows */}
        <div className="flex flex-col items-center gap-0">
          {pillars.map((pillar, i) => {
            // Each row gets progressively wider
            const widths = ["max-w-xs", "max-w-md", "max-w-2xl"];
            const delays = [0.1, 0.2, 0.3];
            // Darker shade for top, lighter toward bottom
            const bgOpacity = ["bg-foreground/95", "bg-foreground/85", "bg-foreground/75"];

            return (
              <ScrollReveal key={i} delay={delays[i]} className="w-full flex justify-center">
                <div
                  className={`w-full ${widths[i]} text-center px-8 py-8 ${bgOpacity[i]} transition-all duration-500`}
                >
                  <h3 className="font-serif text-lg md:text-xl mb-2 text-background">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-background/60 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
