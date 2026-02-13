import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal, { StaggerContainer } from "@/components/home/ScrollReveal";
import TiltCard from "@/components/TiltCard";

import blackLabel from "@/assets/products/black-label.png";
import bigBagBuds from "@/assets/products/big-bag-buds.png";
import elJefe from "@/assets/products/el-jefe.png";
import marshmallowMilk from "@/assets/products/marshmallow-milk.png";
import blueGuavaPops from "@/assets/products/blue-guava-pops.png";
import pineSolParadise from "@/assets/products/pine-sol-paradise.png";
import tiramisu from "@/assets/products/tiramisu.png";
import zPie from "@/assets/products/z-pie.png";
import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.jpg";
import teaTime from "@/assets/products/tea-time.jpg";
import dragonfruitCandy from "@/assets/products/dragonfruit-candy.jpg";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.jpg";
import eliteFrutaz from "@/assets/products/elite-frutaz.jpg";
import privateReserveFrutaz from "@/assets/products/private-reserve-frutaz.jpg";
import zopBoyZourzop from "@/assets/products/zop-boy-zourzop.jpg";

const allProducts = [
  { id: 1, name: "Black Label", brand: "The Republic", type: "Hybrid", category: "Flower", price: "$55", deal: false, image: blackLabel },
  { id: 2, name: "CombOz", brand: "Big Bag O' Buds", type: "Sativa", category: "Flower", price: "$45", deal: true, image: bigBagBuds },
  { id: 3, name: "El Jefe", brand: "LowKey", type: "Indica", category: "Pre-Roll", price: "$50", deal: false, image: elJefe },
  { id: 4, name: "Marshmallow Milk", brand: "VOLO", type: "Hybrid", category: "Vape", price: "$65", deal: false, image: marshmallowMilk },
  { id: 5, name: "Blue Guava Pops", brand: "Exotic Genetix", type: "Sativa", category: "Flower", price: "$60", deal: true, image: blueGuavaPops },
  { id: 6, name: "Pine Sol Paradise", brand: "Jungle Boys", type: "Hybrid", category: "Concentrate", price: "$75", deal: false, image: pineSolParadise },
  { id: 7, name: "Tiramisu", brand: "Connected", type: "Indica", category: "Edible", price: "$30", deal: false, image: tiramisu },
  { id: 8, name: "Z-Pie", brand: "Alien Labs", type: "Hybrid", category: "Flower", price: "$70", deal: true, image: zPie },
  { id: 9, name: "Dirty Fanta Slushie", brand: "Cream Team", type: "Hybrid", category: "Flower", price: "$60", deal: false, image: dirtyFantaSlushie },
  { id: 10, name: "Tea Time", brand: "Mamey's Bodega", type: "Sativa", category: "Flower", price: "$65", deal: false, image: teaTime },
  { id: 11, name: "Dragonfruit Candy", brand: "Exotic Genetix", type: "Indica", category: "Flower", price: "$60", deal: true, image: dragonfruitCandy },
  { id: 12, name: "Cotton Candy Clouds", brand: "Super Candy Bros", type: "Hybrid", category: "Flower", price: "$55", deal: false, image: cottonCandyClouds },
  { id: 13, name: "Elite Frutaz", brand: "Frutaz Organics", type: "Sativa", category: "Flower", price: "$65", deal: false, image: eliteFrutaz },
  { id: 14, name: "Private Reserve Frutaz", brand: "Frutaz Organics", type: "Indica", category: "Flower", price: "$60", deal: true, image: privateReserveFrutaz },
  { id: 15, name: "Zop Boy ZourZop", brand: "Zoptendo", type: "Hybrid", category: "Edible", price: "$50", deal: false, image: zopBoyZourzop },
];

const categories = ["All", "Flower", "Vape", "Pre-Roll", "Concentrate", "Edible"];
const strainTypes = ["All", "Indica", "Sativa", "Hybrid"];
const brands = ["All", ...Array.from(new Set(allProducts.map((p) => p.brand)))];

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [strain, setStrain] = useState("All");
  const [brand, setBrand] = useState("All");
  const [dealsOnly, setDealsOnly] = useState(false);

  const filtered = allProducts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (strain !== "All" && p.type !== strain) return false;
    if (brand !== "All" && p.brand !== brand) return false;
    if (dealsOnly && !p.deal) return false;
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
                <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
                <FilterGroup label="Strain" options={strainTypes} value={strain} onChange={setStrain} />
                <FilterGroup label="Brand" options={brands} value={brand} onChange={setBrand} />
                <div className="mb-8">
                  <motion.button
                    onClick={() => setDealsOnly(!dealsOnly)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-xs font-sans px-4 py-2 border transition-all duration-300 ${
                      dealsOnly ? "border-foreground text-foreground bg-foreground/5" : "border-border/50 text-muted-foreground hover:border-foreground/30"
                    }`}
                  >
                    Deals Only
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
  return (
    <TiltCard className="relative">
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="aspect-[3/4] mb-4 overflow-hidden relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="text-[10px] font-sans uppercase editorial-spacing text-foreground bg-background/90 px-3 py-1">{product.type}</span>
            {product.deal && (
              <span className="text-[10px] font-sans uppercase editorial-spacing text-background bg-foreground px-3 py-1">Deal</span>
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
