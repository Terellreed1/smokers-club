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
  { name: "Flower", image: flowerImg, color: "from-green-50 to-green-100", to: "/shop?category=Flower" },
  { name: "Vapes", image: vapeImg, color: "from-blue-50 to-blue-100", to: "/shop?category=Vape" },
  { name: "Pre-Rolls", image: prerollImg, color: "from-amber-50 to-amber-100", to: "/shop?category=Pre-Roll" },
  { name: "Concentrates", image: concentrateImg, color: "from-purple-50 to-purple-100", to: "/shop?category=Concentrate" },
  { name: "Edibles", image: edibleImg, color: "from-pink-50 to-pink-100", to: "/shop?category=Edible" },
];

const LiveInventory = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground">
          Shop by Category
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              to={cat.to}
              className="snap-start shrink-0 w-[200px] sm:w-[220px] block group"
            >
              <div className={`aspect-square rounded-2xl bg-gradient-to-b ${cat.color} overflow-hidden relative mb-3`}>
                <motion.img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-lg"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                {cat.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveInventory;
