import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ y: videoY }}>
        <iframe
          src="https://www.youtube.com/embed/Y4FflVtzlE0?start=709&end=727&autoplay=1&mute=1&loop=1&playlist=Y4FflVtzlE0&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd1080"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] border-0"
          title="Hero background"
        />
      </motion.div>

      {/* Simple dark overlay */}
      <div className="absolute inset-0 bg-foreground/50" />

      {/* Top black haze to cover video stamp */}
      <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-black/80 via-black/40 to-transparent z-[5] pointer-events-none" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.img
          src={logo}
          alt="Luxury Smokers Club"
          className="h-48 sm:h-72 md:h-96 w-auto mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.p
          className="font-serif text-xl sm:text-2xl md:text-4xl text-background/90 tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Luxury Smokers Club
        </motion.p>

        <motion.p
          className="font-serif text-sm sm:text-base md:text-lg text-background/60 italic mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          "stay high, my friend"
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
