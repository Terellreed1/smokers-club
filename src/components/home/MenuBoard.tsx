import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const categories = ["Flower", "Edibles", "Pre-Rolls", "Concentrates"] as const;

const menuItems: Record<typeof categories[number], Array<{
  name: string;
  strain: string;
  thc: string;
  type: "Indica" | "Sativa" | "Hybrid";
  price: string;
}>> = {
  Flower: [
    { name: "Dirty Fantasy Slushie", strain: "JoJo Exotics", thc: "32%", type: "Hybrid", price: "$65" },
    { name: "Verzaza", strain: "Frutaz", thc: "29%", type: "Sativa", price: "$65" },
    { name: "Cotton Candy Clouds", strain: "Always Faded", thc: "31%", type: "Indica", price: "$65" },
    { name: "Dragonfruit Candy", strain: "Always Faded", thc: "28%", type: "Hybrid", price: "$65" },
    { name: "Empire State", strain: "Super Candy Bros", thc: "30%", type: "Sativa", price: "$65" },
    { name: "Super Cherry Bubble Gum", strain: "Kandy Depo", thc: "27%", type: "Indica", price: "$65" },
  ],
  Edibles: [
    { name: "Cosmic Gummies", strain: "LSC House", thc: "100mg", type: "Hybrid", price: "$35" },
    { name: "Midnight Chews", strain: "LSC House", thc: "200mg", type: "Indica", price: "$45" },
    { name: "Solar Drops", strain: "LSC House", thc: "150mg", type: "Sativa", price: "$40" },
  ],
  "Pre-Rolls": [
    { name: "Gold Standard", strain: "LSC Premium", thc: "34%", type: "Hybrid", price: "$25" },
    { name: "The Chairman", strain: "LSC Premium", thc: "31%", type: "Indica", price: "$25" },
    { name: "Morning Glory", strain: "LSC Premium", thc: "29%", type: "Sativa", price: "$20" },
  ],
  Concentrates: [
    { name: "Diamond Reserve", strain: "LSC Extracts", thc: "89%", type: "Hybrid", price: "$80" },
    { name: "Live Resin Gold", strain: "LSC Extracts", thc: "92%", type: "Indica", price: "$85" },
    { name: "Terp Sauce", strain: "LSC Extracts", thc: "87%", type: "Sativa", price: "$75" },
  ],
};

const typeColors: Record<string, string> = {
  Indica: "text-purple-400",
  Sativa: "text-emerald-400",
  Hybrid: "text-amber-400",
};

const MenuBoard = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("Flower");

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
              Today's Selection
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">The Menu</h2>
          </div>
        </ScrollReveal>

        {/* Category Tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-sans uppercase editorial-spacing px-6 py-3 border transition-all duration-300 ${
                  activeCategory === cat
                    ? "border-foreground text-foreground bg-foreground/5"
                    : "border-border/50 text-muted-foreground hover:border-foreground/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Menu Table */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 pb-4 border-b border-border/30 mb-2">
              <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">Strain</span>
              <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">Brand</span>
              <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground text-center">THC</span>
              <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground text-center">Type</span>
              <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground text-right">Price</span>
            </div>

            {/* Rows */}
            {menuItems[activeCategory].map((item, i) => (
              <motion.div
                key={item.name}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 py-4 border-b border-border/10 hover:bg-foreground/[0.02] transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <span className="font-serif text-lg text-foreground">{item.name}</span>
                <span className="text-xs font-sans text-muted-foreground self-center">{item.strain}</span>
                <span className="text-sm font-sans text-foreground/80 text-center self-center">{item.thc}</span>
                <span className={`text-xs font-sans uppercase text-center self-center ${typeColors[item.type]}`}>
                  {item.type}
                </span>
                <span className="text-sm font-sans text-foreground/80 text-right self-center">{item.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MenuBoard;
