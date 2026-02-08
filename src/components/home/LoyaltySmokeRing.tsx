import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const tiers = [
  { name: "Spark", threshold: 0, icon: "✦" },
  { name: "Ember", threshold: 250, icon: "✦✦" },
  { name: "Blaze", threshold: 500, icon: "✦✦✦" },
  { name: "Inferno", threshold: 1000, icon: "✦✦✦✦" },
];

const LoyaltySmokeRing = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Demo: user is at 320 / 500 toward next tier
  const currentPoints = 320;
  const nextTier = tiers[2]; // Blaze
  const prevTier = tiers[1]; // Ember
  const progress = (currentPoints - prevTier.threshold) / (nextTier.threshold - prevTier.threshold);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <ScrollReveal className="mb-16">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Rewards Program
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            The Smoke Ring
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col items-center gap-10">
            {/* Smoke ring SVG */}
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full -rotate-90"
              >
                {/* Background ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                {/* Progress ring */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
                  transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                />
                {/* Smoke wisps along the ring */}
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="10"
                    r="4"
                    fill="hsl(var(--foreground) / 0.15)"
                    initial={{ opacity: 0 }}
                    animate={isInView ? {
                      opacity: [0, 0.4, 0],
                      r: [4, 12, 4],
                    } : {}}
                    transition={{
                      duration: 3,
                      delay: 1 + i * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </svg>

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <motion.span
                  className="font-serif text-4xl md:text-5xl text-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {currentPoints}
                </motion.span>
                <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">
                  Points
                </span>
              </div>
            </div>

            {/* Tier progress */}
            <div className="flex items-center gap-8 md:gap-12">
              {tiers.map((tier, i) => (
                <div key={i} className="text-center">
                  <p className={`text-xs font-sans uppercase editorial-spacing mb-1 ${
                    currentPoints >= tier.threshold ? "text-foreground" : "text-muted-foreground/40"
                  }`}>
                    {tier.icon}
                  </p>
                  <p className={`text-[10px] font-sans uppercase editorial-spacing ${
                    currentPoints >= tier.threshold ? "text-foreground" : "text-muted-foreground/40"
                  }`}>
                    {tier.name}
                  </p>
                  <p className="text-[9px] text-muted-foreground/40 mt-0.5">
                    {tier.threshold}pts
                  </p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground font-sans max-w-md">
              Every purchase earns points toward exclusive drops, early access, and premium rewards.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LoyaltySmokeRing;
