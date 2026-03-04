import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FALLBACK_IMAGE = "https://res.cloudinary.com/ddfe8uqth/image/upload/q_auto,f_auto/cannabis-hero-fallback_placeholder.jpg";

const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      window.__lccHeroEl = heroRef.current;
      window.dispatchEvent(new Event("lcc-hero-mounted"));
    }
    return () => { delete window.__lccHeroEl; };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-black min-h-[100svh] flex items-center">
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

      {/* Cinematic vignette — heavier on left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      {/* Warm gold tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(160deg, rgba(184,151,46,0.1) 0%, rgba(184,151,46,0.04) 50%, transparent 100%)",
        }}
      />
      {/* Top/bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Content — centered vertically */}
      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex items-center">
        <motion.div
          className="w-full max-w-2xl z-10 text-center lg:text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Gold rule */}
          <motion.div
            className="h-px w-20 mb-8 mx-auto lg:mx-0"
            style={{ background: "#C9A84C" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-5 sm:mb-6">
            Premium Flower,{" "}
            <span className="block">Delivered.</span>
          </h1>

          <p
            className="text-base sm:text-lg lg:text-xl text-white/60 font-sans font-light mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Curated luxury flower from top brands. Same-day delivery across the East Coast.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
            <Link
              to="/shop"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 min-h-[48px] text-xs font-sans font-semibold uppercase transition-all duration-300"
              style={{
                letterSpacing: "0.15em",
                background: "#C9A84C",
                color: "#0a0a0a",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#b8932e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C9A84C";
              }}
            >
              Shop Now
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/delivery"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] text-xs font-sans font-semibold uppercase transition-all duration-300"
              style={{
                letterSpacing: "0.15em",
                border: "1px solid rgba(201,168,76,0.5)",
                color: "#C9A84C",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(10,10,10,0.6)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
              }}
            >
              Delivery Info
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

declare global {
  interface Window {
    __lccHeroEl?: HTMLElement;
  }
}

export default HeroSection;
