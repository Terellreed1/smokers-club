import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const categories = [
  { name: "Flower", to: "/shop?category=Flower" },
  { name: "Vapes", to: "/shop?category=Vape" },
  { name: "Pre-Rolls", to: "/shop?category=Pre-Roll" },
  { name: "Concentrates", to: "/shop?category=Concentrate" },
  { name: "Edibles", to: "/shop?category=Edible" },
  { name: "All Products", to: "/shop" },
];

const CategoryGrid = () => {
  return (
    <section className="pt-12 sm:pt-16 pb-4 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-x-2 sm:gap-x-3">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={cat.to}
                  className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.18em] text-muted-foreground/70 hover:text-foreground px-3 sm:px-4 py-2 transition-all duration-300 hover:bg-foreground/[0.03] rounded-sm"
                >
                  {cat.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CategoryGrid;
