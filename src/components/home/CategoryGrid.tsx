import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Flower", icon: "🌿", to: "/shop?category=Flower" },
  { name: "Vapes", icon: "💨", to: "/shop?category=Vape" },
  { name: "Pre-Rolls", icon: "🚬", to: "/shop?category=Pre-Roll" },
  { name: "Concentrates", icon: "💎", to: "/shop?category=Concentrate" },
  { name: "Edibles", icon: "🍬", to: "/shop?category=Edible" },
  { name: "All Products", icon: "✦", to: "/shop" },
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
                <span className="text-2xl sm:text-3xl">{cat.icon}</span>
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
