import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const brands = [
  { name: "STIIIZY", slug: "stiiizy" },
  { name: "RAW GARDEN", slug: "raw-garden" },
  { name: "COOKIES", slug: "cookies" },
  { name: "ALIEN LABS", slug: "alien-labs" },
  { name: "CONNECTED", slug: "connected" },
  { name: "JEETER", slug: "jeeter" },
  { name: "HEAVY HITTERS", slug: "heavy-hitters" },
  { name: "710 LABS", slug: "710-labs" },
];

const BrandCarousel = () => {
  return (
    <ScrollReveal>
      <section className="py-16 bg-background border-y border-border/50 overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll">
            {[...brands, ...brands].map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                to={`/shop?brand=${brand.slug}`}
                className="flex-shrink-0 px-12 md:px-16 flex items-center justify-center group"
              >
                <span className="font-serif text-lg md:text-xl tracking-wider text-muted-foreground/40 group-hover:text-gold transition-colors duration-500 whitespace-nowrap">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default BrandCarousel;
