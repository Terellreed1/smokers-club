import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <section className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-10">
          Shop by Category
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={cat.to}
                className="text-xs sm:text-sm font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-transparent hover:border-foreground pb-0.5"
              >
                {cat.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
