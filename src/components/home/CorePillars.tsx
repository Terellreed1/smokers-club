import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Pyramid widths — narrow at top, wide at bottom
  const widths = ["max-w-xs", "max-w-sm", "max-w-lg"];
  // Slide directions — alternating left/right
  const directions = [-120, 120, -120];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Our Foundation
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Built on Principle
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className={`w-full ${widths[i]} text-center px-8 py-8 bg-foreground transition-all duration-500`}
              initial={{ opacity: 0, x: directions[i] }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.25,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <h3 className="font-serif text-lg md:text-xl mb-2 text-background">
                {pillar.title}
              </h3>
              <p className="text-xs text-background/60 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
