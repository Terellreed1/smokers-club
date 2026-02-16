import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const videoY = useTransform(scrollY, [0, 800], [0, 250]);
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.35, 0.7]);
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[90svh] overflow-hidden flex items-end"
    >
      {/* Video Background */}
      <motion.div
        className="absolute inset-[-10%] pointer-events-none"
        style={{ y: videoY, scale: videoScale }}
      >
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
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-12 sm:pb-16"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Massive headline */}
        <motion.h1
          className="font-serif font-bold uppercase text-white leading-[0.9] tracking-tight mb-6"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="block">Luxury</span>
          <span className="block">
            Smokers{" "}
            <span className="text-gold">Club</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-sans text-sm sm:text-base text-white/50 uppercase tracking-[0.15em] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Premium Cannabis · Delivered to Your Door
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link
            to="/shop"
            className="px-8 py-3.5 bg-primary text-primary-foreground font-sans text-xs font-semibold uppercase tracking-[0.15em] hover:bg-primary/90 transition-all duration-300 rounded-full"
          >
            Shop Now
          </Link>
          <Link
            to="/delivery"
            className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-sans text-xs font-semibold uppercase tracking-[0.15em] hover:bg-white/20 transition-all duration-300 rounded-full"
          >
            Delivery Info
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
