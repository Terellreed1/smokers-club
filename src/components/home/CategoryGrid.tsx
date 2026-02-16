import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, Wind, Cigarette, Gem, Candy, LayoutGrid } from "lucide-react";

const categories = [
  { name: "Flower", icon: Leaf, to: "/shop?category=Flower" },
  { name: "Vapes", icon: Wind, to: "/shop?category=Vape" },
  { name: "Pre-Rolls", icon: Cigarette, to: "/shop?category=Pre-Roll" },
  { name: "Concentrates", icon: Gem, to: "/shop?category=Concentrate" },
  { name: "Edibles", icon: Candy, to: "/shop?category=Edible" },
  { name: "All Products", icon: LayoutGrid, to: "/shop" },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-4xl text-foreground text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.name} to={cat.to} className="group">
              <motion.div
                className="flex flex-col items-center gap-3 p-4 sm:p-6 border border-border/50 hover:border-primary/40 transition-all duration-300 bg-background"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <cat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" strokeWidth={1.5} />
                <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors">
                  {cat.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
