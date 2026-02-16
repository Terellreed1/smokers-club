import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-10">
        {/* Left content */}
        <motion.div
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
            Premium Cannabis,{" "}
            <span className="block">Delivered.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 font-sans mb-8 max-w-lg mx-auto lg:mx-0">
            Curated luxury flower, vapes, and edibles. Same-day delivery across the East Coast.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] bg-white text-primary font-semibold text-sm rounded-full hover:bg-white/90 transition-all shadow-lg"
            >
              Shop Now
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/delivery"
              className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] bg-white/15 text-white font-semibold text-sm rounded-full hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              Delivery Info
            </Link>
          </div>
        </motion.div>

        {/* Right decorative area */}
        <motion.div
          className="flex-1 relative hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <div className="w-64 h-64 xl:w-80 xl:h-80 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-48 h-48 xl:w-64 xl:h-64 rounded-full bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
