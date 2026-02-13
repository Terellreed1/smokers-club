import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxStory = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 px-6 overflow-hidden">
      {/* Background parallax layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold-light)) 0%, transparent 70%)" }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y2 }}
      >
        <div className="absolute top-1/4 right-[20%] w-px h-48 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-1/3 left-[25%] w-px h-32 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{ y: y3, opacity }}
      >
        <motion.p
          className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-8"
        >
          Our Philosophy
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8"
        >
          We don't sell weed.
          <br />
          <span className="gold-text-gradient">We curate experiences.</span>
        </motion.h2>

        <motion.p
          className="text-base md:text-lg font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Every strain is hand-selected. Every brand is vetted. Every delivery 
          is an event. Welcome to the future of luxury cannabis — where quality 
          isn't a tier, it's the standard.
        </motion.p>

        <motion.div className="flex items-center justify-center gap-12">
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground">42+</p>
            <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">Strains</p>
          </div>
          <div className="w-px h-12 bg-border/30" />
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground">11</p>
            <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">Brands</p>
          </div>
          <div className="w-px h-12 bg-border/30" />
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground">6</p>
            <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">States</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ParallaxStory;
