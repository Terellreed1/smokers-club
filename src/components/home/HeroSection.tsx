import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.65, 0.95]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const smokeX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const smokeY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[120vh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: videoY }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Top black haze to cover video stamp */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-black via-black/60 to-transparent z-[5] pointer-events-none" />

      {/* Ambient smoke haze */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ x: smokeX, y: smokeY }}
      >
        <div
          className="absolute -inset-[50%] opacity-[0.07]"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 20% 50%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 500px 350px at 70% 30%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 400px 500px at 50% 80%, hsl(var(--background)), transparent)
            `,
            animation: "smokedrift 20s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -inset-[50%] opacity-[0.05]"
          style={{
            background: `
              radial-gradient(ellipse 700px 300px at 80% 60%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 300px 600px at 30% 70%, hsl(var(--background)), transparent)
            `,
            animation: "smokedrift2 25s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl -mt-16 md:-mt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <motion.div
          className="mx-auto -mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        >
          <img
            src={logo}
            alt="LC"
            className="h-64 md:h-96 w-auto mx-auto drop-shadow-lg"
          />
        </motion.div>

        {/* Headline */}
        <div className="relative">
          <motion.p
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-background/90 tracking-widest uppercase mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          >
            Luxury Smokers Club
          </motion.p>
          <motion.h1
            className="font-serif text-xl md:text-3xl lg:text-4xl text-background italic relative whitespace-nowrap"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            "stay high, my friend" — LSC
          </motion.h1>
        </div>

        <motion.p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
        >
          Street-born · Brand-backed · Premium THC delivered
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
