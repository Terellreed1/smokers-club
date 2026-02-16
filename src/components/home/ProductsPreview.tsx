import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allProducts } from "@/data/products";

// Featured products by ID
const featuredIds = [6, 1, 8];
const products = allProducts.filter((p) => featuredIds.includes(p.id));

const ProductsPreview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-foreground">
          Popular Flower
        </h2>
        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="text-sm font-medium text-primary hover:underline"
          >
            View All
          </Link>
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
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ overscrollBehaviorX: 'contain' }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="snap-start shrink-0 w-[160px] sm:w-[220px] md:w-[260px] group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link to={`/shop/${product.id}`} className="block">
              <div className="aspect-square rounded-2xl bg-white overflow-hidden relative mb-3">
                {product.image && (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain p-5 drop-shadow-md"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">
                {product.brand}
              </p>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm font-bold text-primary">{product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPreview;
