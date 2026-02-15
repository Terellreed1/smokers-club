import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const categories = ["Flower", "Edibles", "Pre-Rolls", "Concentrates"] as const;
type Category = typeof categories[number];

const menuItems: Record<Category, Array<{
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

const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transformOrigin: "center center",
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    transformOrigin: direction > 0 ? "left center" : "right center",
  }),
};

const MenuBoard = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const currentCategory = categories[pageIndex];

  // Page flip sound
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);
  const playFlipSound = useCallback(() => {
    if (!flipAudioRef.current) {
      flipAudioRef.current = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
    }
    // Use a short noise burst to simulate a page flip
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const duration = 0.15;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      // Quick noise burst with fast decay
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 3) * 0.3;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    // Bandpass filter for papery sound
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 3000;
    filter.Q.value = 0.7;
    source.connect(filter);
    filter.connect(ctx.destination);
    source.start();
  }, []);

  const goTo = (idx: number) => {
    if (idx === pageIndex) return;
    setDirection(idx > pageIndex ? 1 : -1);
    setPageIndex(idx);
    playFlipSound();
  };

  const nextPage = () => {
    if (pageIndex < categories.length - 1) goTo(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) goTo(pageIndex - 1);
  };

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          {/* Menu "book" */}
          <div className="relative" style={{ perspective: "1200px" }}>
            {/* Outer menu card */}
            <div className="relative border border-gold/30 p-1 bg-background shadow-[0_8px_60px_-12px_hsl(var(--gold)/0.08)]">
              {/* Inner border */}
              <div className="border border-gold/20 px-4 py-8 sm:px-6 sm:py-10 md:px-14 md:py-14 min-h-[400px] sm:min-h-[500px] flex flex-col">
                {/* Corner flourishes */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/40" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold/40" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold/40" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/40" />

                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">The Menu</h2>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="h-px w-12 bg-gold/30" />
                    <span className="text-gold text-xs">✦</span>
                    <div className="h-px w-12 bg-gold/30" />
                  </div>
                </div>

                {/* Flippable page content */}
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentCategory}
                      custom={direction}
                      variants={pageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Category title */}
                      <h3 className="text-center font-serif text-2xl text-foreground/80 italic mb-8">
                        {currentCategory}
                      </h3>

                      {/* Menu items */}
                      <div className="space-y-1">
                        {menuItems[currentCategory].map((item, i) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.06 + 0.2 }}
                            className="py-3"
                          >
                            {/* Name ........... Price */}
                            <div className="flex items-baseline gap-2">
                              <span className="font-serif text-sm sm:text-lg md:text-xl text-foreground">
                                {item.name}
                              </span>
                              <span className="flex-1 border-b border-dotted border-muted-foreground/20 min-w-[20px] translate-y-[-4px]" />
                              <span className="font-serif text-lg text-foreground whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                            {/* Details */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 pl-1">
                              <span className="text-[9px] sm:text-[10px] font-sans text-muted-foreground/50 uppercase editorial-spacing">
                                {item.strain}
                              </span>
                              <span className="text-muted-foreground/20 hidden sm:inline">·</span>
                              <span className="text-[9px] sm:text-[10px] font-sans text-muted-foreground/50">
                                THC {item.thc}
                              </span>
                              <span className="text-muted-foreground/20 hidden sm:inline">·</span>
                              <span className="text-[9px] sm:text-[10px] font-sans text-muted-foreground/50 italic">
                                {typeLabels[item.type]}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Page navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold/10">
                  <button
                    onClick={prevPage}
                    disabled={pageIndex === 0}
                    className="text-[11px] font-sans uppercase editorial-spacing text-muted-foreground/60 hover:text-gold transition-colors disabled:opacity-20 disabled:cursor-default"
                  >
                    ← Prev
                  </button>

                  {/* Page dots / category tabs */}
                  <div className="flex items-center gap-3">
                    {categories.map((cat, idx) => (
                      <button
                        key={cat}
                        onClick={() => goTo(idx)}
                        className={`text-[10px] sm:text-[11px] font-sans uppercase editorial-spacing transition-all duration-300 py-2 px-1 ${
                          idx === pageIndex
                            ? "text-gold"
                            : "text-muted-foreground/40 hover:text-muted-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={pageIndex === categories.length - 1}
                    className="text-[11px] font-sans uppercase editorial-spacing text-muted-foreground/60 hover:text-gold transition-colors disabled:opacity-20 disabled:cursor-default"
                  >
                    Next →
                  </button>
                </div>

                {/* Page number */}
                <p className="text-center text-[9px] font-sans text-muted-foreground/30 mt-4">
                  {pageIndex + 1} / {categories.length}
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
