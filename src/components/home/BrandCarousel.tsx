import { Link } from "react-router-dom";
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
      <section className="py-10 bg-background overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll items-center">
            {[...brands, ...brands].map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                to={`/shop?brand=${brand.slug}`}
                className="flex-shrink-0 px-10 md:px-14 flex items-center justify-center group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-20 md:h-28 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default BrandCarousel;
