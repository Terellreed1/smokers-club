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
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Built on Principle
          </h2>
        </ScrollReveal>

        {/* Pyramid layout */}
        <div className="flex flex-col items-center gap-6">
          {/* Top — single pillar */}
          <ScrollReveal delay={0.1}>
            <div className="w-full max-w-sm text-center px-8 py-10 border border-border/40 bg-secondary/30 transition-all duration-500 hover:border-border">
              <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground">
                {pillars[0].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {pillars[0].description}
              </p>
            </div>
          </ScrollReveal>

          {/* Bottom — two pillars side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
            <ScrollReveal delay={0.2}>
              <div className="text-center px-8 py-10 border border-border/40 bg-secondary/30 transition-all duration-500 hover:border-border">
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground">
                  {pillars[1].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {pillars[1].description}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="text-center px-8 py-10 border border-border/40 bg-secondary/30 transition-all duration-500 hover:border-border">
                <h3 className="font-serif text-xl md:text-2xl mb-3 text-foreground">
                  {pillars[2].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {pillars[2].description}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
