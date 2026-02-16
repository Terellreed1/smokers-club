import { useRef } from "react";
import { Link } from "react-router-dom";
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/30" />

      {/* Top haze */}
      <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.img
          src={logo}
          alt="Luxury Smokers Club"
          className="h-36 sm:h-56 md:h-72 w-auto mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.p
          className="font-serif text-lg sm:text-xl md:text-3xl text-background/90 tracking-[0.15em] uppercase mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          Luxury Smokers Club
        </motion.p>

        <motion.p
          className="font-sans text-xs sm:text-sm text-background/50 tracking-wide mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Premium Cannabis · Delivered to Your Door
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Link
            to="/shop"
            className="px-8 py-3 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 min-w-[180px]"
          >
            Shop Now
          </Link>
          <Link
            to="/delivery"
            className="px-8 py-3 border border-background/30 text-background/80 font-sans text-xs uppercase tracking-[0.2em] hover:bg-background/10 transition-all duration-300 min-w-[180px]"
          >
            Delivery Info
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
