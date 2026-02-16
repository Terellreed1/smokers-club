import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.png";
import eliteFrutaz from "@/assets/products/elite-frutaz.png";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.png";
import bigBagBuds from "@/assets/products/big-bag-buds.png";
import blackLabel from "@/assets/products/black-label.png";
import elJefe from "@/assets/products/el-jefe.png";

const products = [
  { id: 6, name: "Dirty Fantasy Slushie", brand: "JoJo Exotics", weight: "3.5g", price: "$65", image: dirtyFantaSlushie, strain: "Hybrid" },
  { id: 1, name: "Verzaza", brand: "Frutaz", weight: "3.5g", price: "$65", image: eliteFrutaz, strain: "Sativa" },
  { id: 8, name: "Cotton Candy Clouds", brand: "Always Faded", weight: "3.5g", price: "$65", image: cottonCandyClouds, strain: "Indica" },
  { id: 3, name: "Big Bag Buds", brand: "Backpack Boyz", weight: "7g", price: "$50", image: bigBagBuds, strain: "Hybrid" },
  { id: 4, name: "Black Label", brand: "Kush Factory", weight: "3.5g", price: "$60", image: blackLabel, strain: "Indica" },
  { id: 5, name: "El Jefe", brand: "High Tolerance", weight: "3.5g", price: "$60", image: elJefe, strain: "Sativa" },
];

const ProductsPreview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold mb-3">Featured</p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground italic">
            Popular Flower
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/shop"
            className="text-xs font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors duration-300"
          >
            View All →
          </Link>
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
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-4"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="snap-start shrink-0 w-[240px] sm:w-[280px] md:w-[300px] group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link to={`/shop/${product.id}`} className="block">
              <div className="aspect-square bg-card border border-border/20 overflow-hidden relative mb-4">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-lg"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-[11px] font-sans uppercase tracking-[0.15em] text-muted-foreground mb-1">
                {product.brand}
              </p>
              <h3 className="font-serif text-base sm:text-lg text-foreground group-hover:text-gold transition-colors duration-300 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">{product.weight}</span>
                <span className="text-muted-foreground/30">|</span>
                <span className="text-sm font-sans font-medium text-gold">{product.price}</span>
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-sans uppercase tracking-wider border border-border/50 px-2.5 py-1 text-muted-foreground">
                  {product.strain}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPreview;
