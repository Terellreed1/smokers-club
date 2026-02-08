import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

const pillars = [
  {
    title: "Knowledge",
    description:
      "We serve our community by educating on the many intersections cannabis has in our everyday lives including your health, rights, and culture.",
    image: "https://images.unsplash.com/photo-1532187863486-abf4dbce2632?w=600&h=400&fit=crop",
  },
  {
    title: "Purpose",
    description:
      "We are rooted in community impact through charitable involvement and cannabis education that furthers generations to come.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=400&fit=crop",
  },
  {
    title: "The Spirit of Family",
    description:
      "We foster a sense of togetherness and human connection that ensures everyone feels comfortable exploring the vast world of cannabis.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
  },
];

const CorePillars = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Built on Principle
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          staggerDelay={0.15}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-background border border-border/50 overflow-hidden text-center transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 luxury-shadow"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-12">
                <h3 className="font-serif text-xl md:text-2xl mb-4 text-foreground">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CorePillars;
