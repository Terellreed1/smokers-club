import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import flowerImg from "@/assets/products/big-bag-buds.png";
import vapeImg from "@/assets/products/blue-guava-pops.png";
import prerollImg from "@/assets/products/el-jefe.png";
import concentrateImg from "@/assets/products/black-label.png";
import edibleImg from "@/assets/products/marshmallow-milk.png";

const categories = [
  { name: "Flower", image: flowerImg, to: "/shop?category=Flower" },
  { name: "Vapes", image: vapeImg, to: "/shop?category=Vape" },
  { name: "Pre-Rolls", image: prerollImg, to: "/shop?category=Pre-Roll" },
  { name: "Concentrates", image: concentrateImg, to: "/shop?category=Concentrate" },
  { name: "Edibles", image: edibleImg, to: "/shop?category=Edible" },
];

const LiveInventory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold mb-3">Curated Selection</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground italic">
            Shop by Category
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 border border-border/40 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 border border-border/40 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link
              to={cat.to}
              className="snap-start shrink-0 w-[220px] md:w-[260px] block group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border/20 mb-3">
                <span className="absolute top-5 left-5 text-[11px] font-sans uppercase tracking-[0.2em] text-muted-foreground z-10">
                  {cat.name}
                </span>
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-contain p-8 pt-14 drop-shadow-2xl"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/60 to-transparent" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveInventory;
