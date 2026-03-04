import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png";

const FALLBACK_IMAGE = "https://res.cloudinary.com/ddfe8uqth/image/upload/q_auto,f_auto/cannabis-hero-fallback_placeholder.jpg";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Expose hero ref for navbar IntersectionObserver
  useEffect(() => {
    if (heroRef.current) {
      window.__lccHeroEl = heroRef.current;
      window.dispatchEvent(new Event("lcc-hero-mounted"));
    }
    return () => { delete window.__lccHeroEl; };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-black min-h-[85svh] sm:min-h-[80svh] flex items-center">
      {/* Static fallback image */}
      <img
        src={FALLBACK_IMAGE}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-0' : 'opacity-50'}`}
      />
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        onCanPlayThrough={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-50' : 'opacity-0'}`}
      >
        <source src="https://res.cloudinary.com/ddfe8uqth/video/upload/medium-vecteezy_camera-moves-along-medical-cannabis-plants-grown-under_7386213_medium_tgvc7r.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 py-12 sm:py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
        {/* Left content */}
        <motion.div
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-4 sm:mb-6">
            Premium Flower,{" "}
            <span className="block">Delivered.</span>
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-sans mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            Curated luxury flower from top brands. Same-day delivery across the East Coast.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] bg-white text-foreground font-semibold text-sm rounded-full hover:bg-white/90 transition-all shadow-lg"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/delivery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] bg-white/15 text-white font-semibold text-sm rounded-full hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              Delivery Info
            </Link>
          </div>
        </motion.div>

        {/* Right — Logo */}
        <motion.div
          className="flex-1 relative hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={heroLogo} alt="Luxury Smokers Club" className="w-[28rem] h-[28rem] xl:w-[36rem] xl:h-[36rem] object-contain opacity-80 drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

// Extend window for hero element reference
declare global {
  interface Window {
    __lccHeroEl?: HTMLElement;
  }
}

export default HeroSection;
