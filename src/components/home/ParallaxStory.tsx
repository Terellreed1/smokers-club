import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TypewriterText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {displayed.length < text.length && isInView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-gold ml-1 align-middle"
        />
      )}
    </span>
  );
}

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
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y1 }}>
        <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold-light)) 0%, transparent 70%)" }} />
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2 }}>
        <div className="absolute top-1/4 right-[20%] w-32 h-32 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold)) 0%, transparent 70%)" }} />
        <div className="absolute bottom-1/3 left-[25%] w-24 h-24 rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, hsl(var(--gold-light)) 0%, transparent 70%)" }} />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{ y: y3, opacity }}
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-8 sm:mb-12">
          <TypewriterText text="Welcome to " />
          <TypewriterText text="Luxury Cannabis." className="gold-text-gradient" />
        </h2>

        <motion.div className="flex items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground">
              <AnimatedCounter target={42} suffix="+" />
            </p>
            <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">Strains</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-3xl md:text-4xl text-foreground">
              <AnimatedCounter target={11} />
            </p>
            <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mt-1">Brands</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ParallaxStory;
