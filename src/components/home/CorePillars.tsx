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

        {/* Actual pyramid shape using clip-path */}
        <ScrollReveal delay={0.1}>
          <div className="relative max-w-3xl mx-auto">
            {/* Pyramid container with triangular clip */}
            <div
              className="relative w-full"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            >
              {/* Gradient background */}
              <div className="w-full bg-foreground" style={{ aspectRatio: "1.2 / 1" }}>
                {/* Content positioned within the triangle */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-[8%]">
                  {/* Top pillar */}
                  <div className="text-center px-4 mb-auto mt-[28%]">
                    <h3 className="font-serif text-sm md:text-lg text-background mb-1">
                      {pillars[0].title}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-background/50 leading-relaxed font-sans max-w-[140px] md:max-w-[180px] mx-auto">
                      {pillars[0].description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-24 md:w-32 h-px bg-background/15 my-3 md:my-5" />

                  {/* Middle pillar */}
                  <div className="text-center px-4">
                    <h3 className="font-serif text-sm md:text-lg text-background mb-1">
                      {pillars[1].title}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-background/50 leading-relaxed font-sans max-w-[200px] md:max-w-[280px] mx-auto">
                      {pillars[1].description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-40 md:w-56 h-px bg-background/15 my-3 md:my-5" />

                  {/* Bottom pillar - widest */}
                  <div className="text-center px-4">
                    <h3 className="font-serif text-sm md:text-lg text-background mb-1">
                      {pillars[2].title}
                    </h3>
                    <p className="text-[9px] md:text-[10px] text-background/50 leading-relaxed font-sans max-w-[280px] md:max-w-[400px] mx-auto">
                      {pillars[2].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle glow beneath pyramid */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-foreground/5 blur-3xl" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CorePillars;
