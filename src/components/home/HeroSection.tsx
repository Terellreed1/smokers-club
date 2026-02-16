import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[85svh] overflow-hidden flex items-end"
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
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content — left aligned, bottom anchored */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 sm:pb-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-white/70 mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Luxury Smokers Club — Premium Cannabis
        </motion.p>

        <motion.h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] max-w-2xl mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          Elevating your
          <br />
          cannabis
          <br />
          experience.
        </motion.h1>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link
            to="/shop"
            className="px-8 py-3 bg-primary text-primary-foreground font-sans text-xs uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 rounded-full"
          >
            Shop Now
          </Link>
          <Link
            to="/delivery"
            className="px-8 py-3 border border-white/40 text-white/90 font-sans text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all duration-300 rounded-full"
          >
            Delivery Info
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
