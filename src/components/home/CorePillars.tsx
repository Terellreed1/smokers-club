import { BookOpen, Heart, Users } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "Knowledge",
    description:
      "We serve our community by educating on the many intersections cannabis has in our everyday lives including your health, rights, and culture.",
  },
  {
    icon: Heart,
    title: "Purpose",
    description:
      "We are rooted in community impact through charitable involvement and cannabis education that furthers generations to come.",
  },
  {
    icon: Users,
    title: "The Spirit of Family",
    description:
      "We foster a sense of togetherness and human connection that ensures everyone feels comfortable exploring the vast world of cannabis.",
  },
];

const CorePillars = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Built on Principle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-background border border-border/50 p-10 md:p-12 text-center transition-all duration-500 hover:border-gold/30 hover:-translate-y-1 luxury-shadow"
            >
              <pillar.icon className="w-8 h-8 text-gold mx-auto mb-6 transition-transform duration-500 group-hover:scale-110" />
              <h3 className="font-serif text-xl md:text-2xl mb-4 text-foreground">
                {pillar.title}
              </h3>
              <div className="w-10 h-px bg-gold mx-auto mb-6" />
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
