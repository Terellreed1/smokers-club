import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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

function TypewriterLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    setDisplayed("");
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {displayed.length < text.length && displayed.length > 0 && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-gold ml-0.5 align-middle"
        />
      )}
    </span>
  );
}

const CorePillars = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const widths = ["max-w-xs", "max-w-sm", "max-w-lg"];
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
            <TypewriterLine text="Built on Principle" delay={0} />
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className={`w-full ${widths[i]} text-center px-8`}
              initial={{ opacity: 0, x: directions[i] }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.2 + i * 0.25,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <h3 className="font-serif text-lg md:text-xl mb-2 text-foreground">
                <TypewriterLine text={pillar.title} delay={800 + i * 600} />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                <TypewriterLine text={pillar.description} delay={1000 + i * 600} />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CorePillars;
