import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const storyPanels = [
  {
    tag: "Origins",
    headline: "Born in the Streets",
    body: "Luxury Couriers didn't start in a boardroom. It started on the block — where quality mattered, trust was everything, and the culture was already alive.",
  },
  {
    tag: "The Craft",
    headline: "Curated, Never Mass-Produced",
    body: "Every strain is hand-selected. Every product is vetted. We work directly with cultivators who share our obsession with purity, potency, and presentation.",
  },
  {
    tag: "The Standard",
    headline: "Luxury Is a Language",
    body: "From first click to front door, every touchpoint whispers excellence. Discreet packaging, white-glove delivery, and a product that speaks for itself.",
  },
  {
    tag: "The Movement",
    headline: "Elevating the Culture",
    body: "This isn't just a brand — it's a movement. We're rewriting what cannabis commerce looks like, one delivery at a time. Stay high, my friend.",
  },
];

const BrandStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative bg-foreground">
      {/* Thin progress bar */}
      <div className="sticky top-0 z-20 h-[1px] bg-foreground">
        <motion.div
          className="h-full bg-background/30"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Section intro */}
      <div className="h-[70vh] flex items-center justify-center px-6">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-[10px] font-sans uppercase editorial-spacing text-background/40 mb-8">
              The Story
            </p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background italic leading-tight">
              How we got here
            </h2>
          </div>
        </ScrollReveal>
      </div>

      {/* Story panels — clean minimal text-only */}
      <div className="max-w-3xl mx-auto px-6 pb-32">
        {storyPanels.map((panel, index) => (
          <StoryPanel key={panel.tag} panel={panel} index={index} />
        ))}
      </div>
    </section>
  );
};

interface StoryPanelProps {
  panel: typeof storyPanels[number];
  index: number;
}

const StoryPanel = ({ panel, index }: StoryPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  return (
    <motion.div
      ref={ref}
      className="py-16 md:py-24 border-t border-background/10 first:border-t-0"
      style={{ opacity, y }}
    >
      <span className="text-[10px] font-sans uppercase editorial-spacing text-background/30 block mb-6">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="font-serif text-2xl md:text-4xl text-background italic mb-4 leading-tight">
        {panel.headline}
      </h3>
      <p className="text-sm md:text-base font-sans text-background/50 leading-relaxed max-w-xl">
        {panel.body}
      </p>
    </motion.div>
  );
};

export default BrandStory;
