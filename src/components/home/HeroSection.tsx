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
      className="relative w-full h-[80svh] overflow-hidden flex items-center justify-center"
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
          <source src="https://res.cloudinary.com/ddfe8uqth/video/upload/small-vecteezy_camera-moves-along-medical-cannabis-plants-grown-under_7386213_small_pndozl.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-foreground/20" />

      {/* Top haze */}
      <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/60 to-transparent z-[5] pointer-events-none hidden" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none hidden" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="font-serif text-2xl sm:text-3xl md:text-5xl text-background/95 tracking-[0.15em] uppercase mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Luxury Smokers Club
        </motion.p>

        <motion.p
          className="font-sans text-xs sm:text-sm text-background/80 tracking-widest mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          Premium Cannabis · Delivered to Your Door
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/shop"
            className="px-10 py-3.5 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
