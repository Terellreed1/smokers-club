import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

import kushFactory from "@/assets/brands/kush-factory.png";
import backpackboyz from "@/assets/brands/backpackboyz.png";
import friday from "@/assets/brands/friday.png";
import superCandyBros from "@/assets/brands/super-candy-bros.png";
import highTolerance from "@/assets/brands/high-tolerance.png";
import caliCloudsClub from "@/assets/brands/cali-clouds-club.png";

const brands = [
  { name: "Kush Factory", slug: "kush-factory", logo: kushFactory },
  { name: "Backpackboyz", slug: "backpackboyz", logo: backpackboyz },
  { name: "Friday", slug: "friday", logo: friday },
  { name: "Super Candy Bros", slug: "super-candy-bros", logo: superCandyBros },
  { name: "High Tolerance", slug: "high-tolerance", logo: highTolerance },
  { name: "Cali Clouds Club", slug: "cali-clouds-club", logo: caliCloudsClub },
];

const BrandCarousel = () => {
  return (
    <ScrollReveal>
      <section className="py-6 sm:py-8 overflow-hidden">
        {/* Thin separator line */}
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <div className="h-px bg-border/40" />
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll items-center">
            {[...brands, ...brands].map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                to={`/shop?brand=${brand.slug}`}
                className="flex-shrink-0 px-8 sm:px-12 md:px-16 flex items-center justify-center group"
              >
                <motion.img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 sm:h-14 md:h-16 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Thin separator line */}
        <div className="max-w-5xl mx-auto px-6 mt-6">
          <div className="h-px bg-border/40" />
        </div>
      </section>
    </ScrollReveal>
  );
};

export default BrandCarousel;
