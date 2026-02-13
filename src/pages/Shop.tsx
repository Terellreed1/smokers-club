import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal, { StaggerContainer } from "@/components/home/ScrollReveal";
import TiltCard from "@/components/TiltCard";

import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.jpg";
import teaTime from "@/assets/products/tea-time.jpg";
import dragonfruitCandy from "@/assets/products/dragonfruit-candy.jpg";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.jpg";
import eliteFrutaz from "@/assets/products/elite-frutaz.jpg";
import privateReserveFrutaz from "@/assets/products/private-reserve-frutaz.jpg";
import zopBoyZourzop from "@/assets/products/zop-boy-zourzop.jpg";

const placeholder = "/placeholder.svg";

const allProducts = [
  // $65 tier
  { id: 1, name: "Verzaza", brand: "Frutaz", price: "$65", qty: 3, image: eliteFrutaz },
  { id: 2, name: "Super Bubble Gum", brand: "Frutaz", price: "$65", qty: 3, image: privateReserveFrutaz },
  { id: 3, name: "SqurtleZop", brand: "Zour Zop", price: "$65", qty: 4, image: zopBoyZourzop },
  { id: 4, name: "ZopMander", brand: "Zour Zop", price: "$65", qty: 4, image: placeholder },
  { id: 5, name: "Tea Time", brand: "Mammey's Bodega", price: "$65", qty: 0, image: teaTime },
  { id: 6, name: "Dirty Fantasy Slushie", brand: "JoJo Exotics", price: "$65", qty: 27, image: dirtyFantaSlushie },
  { id: 7, name: "Return of Silver Surfer", brand: "Fumi x WSC", price: "$65", qty: 23, image: placeholder },
  { id: 8, name: "Cotton Candy Clouds", brand: "Always Faded", price: "$65", qty: 2, image: cottonCandyClouds },
  { id: 9, name: "Strawberry Kiwi Candy", brand: "Always Faded", price: "$65", qty: 0, image: placeholder },
  { id: 10, name: "Cherry Bomb", brand: "Always Faded", price: "$65", qty: 0, image: placeholder },
  { id: 11, name: "Cherry Pixie Stiks", brand: "Always Faded", price: "$65", qty: 0, image: placeholder },
  { id: 12, name: "Tropical Gummy Bears", brand: "Always Faded", price: "$65", qty: 8, image: placeholder },
  { id: 13, name: "Kamikaze Candy", brand: "Always Faded", price: "$65", qty: 2, image: placeholder },
  { id: 14, name: "Dragonfruit Candy", brand: "Always Faded", price: "$65", qty: 3, image: dragonfruitCandy },
  { id: 15, name: "Empire State", brand: "Super Candy Bros", price: "$65", qty: 52, image: placeholder },
  { id: 16, name: "Lost Angels", brand: "Super Candy Bros", price: "$65", qty: 50, image: placeholder },
  { id: 17, name: "Screwston", brand: "Super Candy Bros", price: "$65", qty: 49, image: placeholder },
  { id: 18, name: "Skyami", brand: "Super Candy Bros", price: "$65", qty: 46, image: placeholder },
  { id: 19, name: "Super Cherry Bubble Gum", brand: "Kandy Depo", price: "$65", qty: 17, image: placeholder },
  { id: 20, name: "Blk Cherry Lemonhead", brand: "Kandy Depo", price: "$65", qty: 21, image: placeholder },
  { id: 21, name: "Frozen Mochi Berry Bitez", brand: "Kandy Depo", price: "$65", qty: 28, image: placeholder },
  { id: 22, name: "Blue Lemon Shock Z", brand: "Kandy Depo", price: "$65", qty: 23, image: placeholder },
  // $60 tier
  { id: 23, name: "Magic Dope", brand: "ESPN", price: "$60", qty: 13, image: placeholder },
  { id: 24, name: "Mojos Candy", brand: "JoJo Exotics", price: "$60", qty: 33, image: placeholder },
  { id: 25, name: "Buttercup Biscotti", brand: "JoJo Exotics", price: "$60", qty: 62, image: placeholder },
  { id: 26, name: "Flying Cherry Kicks", brand: "Super Candy Bros", price: "$60", qty: 6, image: placeholder },
  { id: 27, name: "Rainin Thunder", brand: "Super Candy Bros", price: "$60", qty: 9, image: placeholder },
  { id: 28, name: "Sub Z", brand: "Super Candy Bros", price: "$60", qty: 4, image: placeholder },
  { id: 29, name: "Hellfire Ringz", brand: "Super Candy Bros", price: "$60", qty: 9, image: placeholder },
  { id: 30, name: "Twisted Berry Bitez", brand: "Super Candy Bros", price: "$60", qty: 11, image: placeholder },
  { id: 31, name: "Hollywood Stunt Double", brand: "Super Candy Bros", price: "$60", qty: 10, image: placeholder },
  { id: 32, name: "Super Sweet Blades", brand: "Super Candy Bros", price: "$60", qty: 13, image: placeholder },
  { id: 33, name: "Zorro", brand: "Super Candy Bros", price: "$60", qty: 10, image: placeholder },
  { id: 34, name: "Atomic Kandy Bomb", brand: "Kandy Depo", price: "$60", qty: 11, image: placeholder },
  { id: 35, name: "Pink Kandy Blasterz", brand: "Kandy Depo", price: "$60", qty: 5, image: placeholder },
  { id: 36, name: "Zabreakers", brand: "Kandy Depo", price: "$60", qty: 7, image: placeholder },
  { id: 37, name: "Toxic Slime", brand: "Kandy Depo", price: "$60", qty: 11, image: placeholder },
  // $50 tier
  { id: 38, name: "Terp Quencher", brand: "Breakfast Club LA", price: "$50", qty: 11, image: placeholder },
  { id: 39, name: "Fusion Cherry Blast", brand: "Kandy Depo", price: "$50", qty: 4, image: placeholder },
  { id: 40, name: "Invader Z", brand: "Kandy Depo", price: "$50", qty: 1, image: placeholder },
  { id: 41, name: "Vibranium Rock Candy", brand: "Kandy Depo", price: "$50", qty: 4, image: placeholder },
  { id: 42, name: "Gamma Bertz", brand: "Kandy Depo", price: "$50", qty: 8, image: placeholder },
];

const brandOptions = ["All", ...Array.from(new Set(allProducts.map((p) => p.brand)))];
const priceOptions = ["All", "$65", "$60", "$50"];

const Shop = () => {
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = allProducts.filter((p) => {
    if (brand !== "All" && p.brand !== brand) return false;
    if (price !== "All" && p.price !== price) return false;
    if (inStockOnly && p.qty <= 0) return false;
    return true;
  });

  const FilterGroup = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="mb-8">
      <h4 className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <motion.button
            key={opt}
            onClick={() => onChange(opt)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`text-xs font-sans px-4 py-2 border transition-all duration-300 ${
              value === opt
                ? "border-foreground text-foreground bg-foreground/5"
                : "border-border/50 text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {opt}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Curated Selection</p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground">The Shop</h1>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Filters */}
            <ScrollReveal delay={0.1} direction="left">
              <aside>
                <FilterGroup label="Brand" options={brandOptions} value={brand} onChange={setBrand} />
                <FilterGroup label="Price" options={priceOptions} value={price} onChange={setPrice} />
                <div className="mb-8">
                  <motion.button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-xs font-sans px-4 py-2 border transition-all duration-300 ${
                      inStockOnly ? "border-foreground text-foreground bg-foreground/5" : "border-border/50 text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    In Stock Only
                  </motion.button>
                </div>
              </aside>
            </ScrollReveal>

            {/* Product Grid */}
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              staggerDelay={0.08}
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="font-serif text-2xl text-muted-foreground">No products match your filters</p>
                </div>
              )}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

interface ProductCardProps {
  product: typeof allProducts[number];
}

const ProductCard = ({ product }: ProductCardProps) => {
  const outOfStock = product.qty <= 0;

  return (
    <TiltCard className="relative">
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="aspect-[3/4] mb-4 overflow-hidden relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-contain ${outOfStock ? "opacity-40 grayscale" : ""}`}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {outOfStock && (
              <span className="text-[10px] font-sans uppercase editorial-spacing text-background bg-muted-foreground px-3 py-1">Sold Out</span>
            )}
            {product.qty > 0 && product.qty <= 5 && (
              <span className="text-[10px] font-sans uppercase editorial-spacing text-background bg-foreground px-3 py-1">Low Stock</span>
            )}
          </div>
        </div>
        <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/70 transition-colors duration-300">{product.name}</h3>
        <p className="text-sm font-sans text-foreground/60 mt-1">{product.price}</p>
      </Link>
    </TiltCard>
  );
};

export default Shop;
