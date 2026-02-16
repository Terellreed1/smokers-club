import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal, { StaggerContainer } from "@/components/home/ScrollReveal";
import TiltCard from "@/components/TiltCard";

import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.png";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.png";
import eliteFrutaz from "@/assets/products/elite-frutaz.png";

const allProducts = [
  { id: 6, name: "Dirty Fantasy Slushie", brand: "JoJo Exotics", price: "$65", qty: 27, image: dirtyFantaSlushie },
  { id: 1, name: "Verzaza", brand: "Frutaz", price: "$65", qty: 3, image: eliteFrutaz },
  { id: 8, name: "Cotton Candy Clouds", brand: "Always Faded", price: "$65", qty: 2, image: cottonCandyClouds },
];

const brandOptions = ["All", ...Array.from(new Set(allProducts.map((p) => p.brand)))];
const priceOptions = ["All", "$65"];

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
      <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
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
              className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
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
        <div className="aspect-[3/4] mb-4 overflow-hidden relative bg-background">
          <motion.img
            src={product.image}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-contain ${outOfStock ? "opacity-40 grayscale" : ""} ${product.name === "Dragonfruit Candy" ? "rotate-[-12deg]" : ""}`}
            whileHover={{ scale: 1.08, rotate: [0, -2, 2, -1, 1, 0] }}
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
        <h3 className="font-serif text-sm sm:text-lg text-foreground group-hover:text-foreground/70 transition-colors duration-300">{product.name}</h3>
        <p className="text-sm font-sans text-foreground/60 mt-1">{product.price}</p>
      </Link>
    </TiltCard>
  );
};

export default Shop;
