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

const typeLabels: Record<string, string> = {
  Indica: "indica",
  Sativa: "sativa",
  Hybrid: "hybrid",
};

const MenuBoard = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("Flower");

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Outer menu card */}
        <ScrollReveal>
          <div className="relative border border-gold/30 p-1">
            {/* Inner border */}
            <div className="border border-gold/20 px-8 py-12 md:px-14 md:py-16">
              {/* Corner flourishes */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/40" />

              {/* Header */}
              <div className="text-center mb-10">
                <p className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground mb-3">
                  ✦ Today's Selection ✦
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">The Menu</h2>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="h-px w-12 bg-gold/30" />
                  <span className="text-gold text-xs">✦</span>
                  <div className="h-px w-12 bg-gold/30" />
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex justify-center flex-wrap gap-2 md:gap-6 mb-12">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] font-sans uppercase editorial-spacing transition-all duration-300 pb-1 ${
                      activeCategory === cat
                        ? "text-gold border-b border-gold"
                        : "text-muted-foreground/60 hover:text-muted-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-1"
                >
                  {menuItems[activeCategory].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="py-3"
                    >
                      {/* Name ........... Price */}
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-lg md:text-xl text-foreground whitespace-nowrap">
                          {item.name}
                        </span>
                        <span className="flex-1 border-b border-dotted border-muted-foreground/20 min-w-[20px] translate-y-[-4px]" />
                        <span className="font-serif text-lg text-foreground whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      {/* Details line */}
                      <div className="flex items-center gap-3 mt-1 pl-1">
                        <span className="text-[10px] font-sans text-muted-foreground/50 uppercase editorial-spacing">
                          {item.strain}
                        </span>
                        <span className="text-muted-foreground/20">·</span>
                        <span className="text-[10px] font-sans text-muted-foreground/50">
                          THC {item.thc}
                        </span>
                        <span className="text-muted-foreground/20">·</span>
                        <span className="text-[10px] font-sans text-muted-foreground/50 italic">
                          {typeLabels[item.type]}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Footer ornament */}
              <div className="text-center mt-10">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gold/30" />
                  <span className="text-gold text-xs">✦</span>
                  <div className="h-px w-12 bg-gold/30" />
                </div>
                <p className="text-[9px] font-sans uppercase editorial-spacing text-muted-foreground/40 mt-4">
                  Prices subject to availability
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MenuBoard;
