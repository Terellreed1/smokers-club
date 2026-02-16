import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <section className="py-8 overflow-hidden border-y border-border bg-secondary/30">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-secondary/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-secondary/30 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll items-center">
          {[...brands, ...brands].map((brand, i) => (
            <Link
              key={`${brand.slug}-${i}`}
              to={`/shop?brand=${brand.slug}`}
              className="flex-shrink-0 px-5 sm:px-8 md:px-14 flex items-center justify-center group"
            >
              <motion.img
                src={brand.logo}
                alt={brand.name}
                className="h-10 sm:h-14 md:h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
