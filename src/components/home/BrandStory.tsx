import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const storyPanels = [
  {
    tag: "Origins",
    headline: "Born in the Streets",
    body: "Luxury Couriers didn't start in a boardroom. It started on the block — where quality mattered, trust was everything, and the culture was already alive.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
  },
  {
    tag: "The Craft",
    headline: "Curated, Never Mass-Produced",
    body: "Every strain is hand-selected. Every product is vetted. We work directly with cultivators who share our obsession with purity, potency, and presentation.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=600&fit=crop",
  },
  {
    tag: "The Standard",
    headline: "Luxury Is a Language",
    body: "From first click to front door, every touchpoint whispers excellence. Discreet packaging, white-glove delivery, and a product that speaks for itself.",
    image: "https://images.unsplash.com/photo-1533750204176-3b0d38e9ac1e?w=800&h=600&fit=crop",
  },
  {
    tag: "The Movement",
    headline: "Elevating the Culture",
    body: "This isn't just a brand — it's a movement. We're rewriting what cannabis commerce looks like, one delivery at a time. Stay high, my friend.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
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
      {/* Progress bar */}
      <div className="sticky top-0 z-20 h-[2px] bg-foreground">
        <motion.div
          className="h-full bg-gold"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Section intro */}
      <div className="h-screen flex items-center justify-center px-6 sticky top-0">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-6">
              The Story
            </p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-background italic">
              How we got here
            </h2>
            <p className="text-sm font-sans text-background/50 mt-6 max-w-md mx-auto">
              Scroll to explore our journey
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Story panels */}
      {storyPanels.map((panel, index) => (
        <StoryPanel key={panel.tag} panel={panel} index={index} />
      ))}
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
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-24"
    >
      <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center w-full ${isEven ? "" : "md:direction-rtl"}`}>
        {/* Image */}
        <motion.div
          className={`relative aspect-[4/3] overflow-hidden ${isEven ? "" : "md:order-2"}`}
          style={{ opacity: imageOpacity }}
        >
          <motion.img
            src={panel.image}
            alt={panel.headline}
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
          {/* Overlay grain */}
          <div className="absolute inset-0 bg-foreground/20 mix-blend-multiply" />
        </motion.div>

        {/* Text */}
        <motion.div
          className={`${isEven ? "" : "md:order-1"}`}
          style={{ y: textY }}
        >
          <span className="text-xs font-sans uppercase editorial-spacing text-gold block mb-4">
            {String(index + 1).padStart(2, "0")} — {panel.tag}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-background italic mb-6 leading-tight">
            {panel.headline}
          </h3>
          <p className="text-sm md:text-base font-sans text-background/60 leading-relaxed max-w-lg">
            {panel.body}
          </p>
          {/* Decorative line */}
          <div className="w-16 h-[1px] bg-gold/40 mt-8" />
        </motion.div>
      </div>
    </div>
  );
};

export default BrandStory;
