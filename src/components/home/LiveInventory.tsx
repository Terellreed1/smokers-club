import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

import flowerImg from "@/assets/products/big-bag-buds.png";
import vapeImg from "@/assets/products/blue-guava-pops.png";
import prerollImg from "@/assets/products/el-jefe.png";
import concentrateImg from "@/assets/products/black-label.png";
import edibleImg from "@/assets/products/marshmallow-milk.png";

const categories = [
  { name: "Flower", image: flowerImg, bg: "from-amber-900/40 to-amber-800/20" },
  { name: "Vapes", image: vapeImg, bg: "from-emerald-900/40 to-emerald-800/20" },
  { name: "Pre-Rolls", image: prerollImg, bg: "from-violet-900/40 to-violet-800/20" },
  { name: "Concentrates", image: concentrateImg, bg: "from-rose-900/40 to-rose-800/20" },
  { name: "Edibles", image: edibleImg, bg: "from-sky-900/40 to-sky-800/20" },
];

const LiveInventory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
      <ScrollReveal>
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground">
            Shop Our Inventory
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-border/50 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors duration-300"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-border/50 text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-2 px-2"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            className="snap-start shrink-0 w-[260px] md:w-[280px] group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-b ${cat.bg} border border-border/20`}>
              <span className="absolute top-5 left-5 text-sm font-sans uppercase tracking-[0.2em] text-foreground/90 z-10">
                {cat.name}
              </span>
              <motion.img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-contain p-8 pt-14 drop-shadow-2xl"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveInventory;
