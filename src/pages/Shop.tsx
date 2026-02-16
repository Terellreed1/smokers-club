import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal, { StaggerContainer } from "@/components/home/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import { allProducts, brandOptions, priceOptions, type Product } from "@/data/products";

const comingSoonCategories = ["vapes", "edibles", "concentrates", "pre-rolls", "accessories"];

const categoryLabels: Record<string, string> = {
  vapes: "Vapes",
  edibles: "Edibles",
  concentrates: "Concentrates",
  "pre-rolls": "Pre-Rolls",
  accessories: "Accessories",
};

const strainOptions = ["All", "Indica", "Sativa", "Hybrid"];
const categoryOptions = ["All", "Flower", "Vapes", "Edibles", "Concentrates", "Pre-Rolls", "Accessories"];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStrain = searchParams.get("strain");
  const saleFilter = searchParams.get("sale") === "true";
  const urlCategory = searchParams.get("category");
  const isComingSoon = urlCategory && comingSoonCategories.includes(urlCategory);

  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState("All");
  const [strain, setStrain] = useState(urlStrain || "All");
  const [category, setCategory] = useState(
    urlCategory ? categoryLabels[urlCategory] || "All" : "All"
  );

  const handleStrainChange = (v: string) => {
    setStrain(v);
    if (v === "All") {
      searchParams.delete("strain");
    } else {
      searchParams.set("strain", v);
    }
    searchParams.delete("category");
    searchParams.delete("sale");
    setSearchParams(searchParams);
  };

  const handleCategoryChange = (v: string) => {
    setCategory(v);
    const key = v.toLowerCase().replace("-", "-");
    if (v === "All" || v === "Flower") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", key === "pre-rolls" ? "pre-rolls" : key);
    }
    searchParams.delete("strain");
    searchParams.delete("sale");
    setSearchParams(searchParams);
  };

  const filtered = allProducts.filter((p) => {
    if (brand !== "All" && p.brand !== brand) return false;
    if (price !== "All" && p.price !== price) return false;
    if (strain !== "All" && p.strain !== strain) return false;
    if (saleFilter && !p.onSale) return false;
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

          {isComingSoon ? (
            <motion.div
              className="text-center py-24 sm:py-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Coming Soon</p>
              <h2 className="font-serif text-3xl sm:text-5xl text-foreground mb-4">
                {urlCategory ? (categoryLabels[urlCategory] || urlCategory) : ""}
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                We're curating the finest selection for you. Stay tuned — something special is on the way.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background font-semibold text-sm rounded-full hover:opacity-90 transition-opacity"
              >
                Browse Flower
              </Link>
            </motion.div>
          ) : (

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Filters */}
            <ScrollReveal delay={0.1} direction="left">
              <aside>
                <FilterGroup label="Category" options={categoryOptions} value={category} onChange={handleCategoryChange} />
                <FilterGroup label="Strain" options={strainOptions} value={strain} onChange={handleStrainChange} />
                <FilterGroup label="Brand" options={brandOptions} value={brand} onChange={setBrand} />
                <FilterGroup label="Price" options={priceOptions} value={price} onChange={setPrice} />
              </aside>
            </ScrollReveal>

            {/* Product Grid */}
            <StaggerContainer
              className="grid grid-cols-2 gap-4 sm:gap-6"
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
          )}
        </div>
      </div>
    </PageLayout>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const outOfStock = false; // stock badges removed
  return (
    <TiltCard className="relative">
      <Link to={`/shop/${product.id}`} className="group block">
        {product.image ? (
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[3/4] object-contain mb-4"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="aspect-[3/4] mb-4 flex flex-col items-center justify-center text-muted-foreground/40">
            <ImageOff size={40} strokeWidth={1} />
            <span className="text-[10px] mt-2 uppercase tracking-wider">No Photo</span>
          </div>
        )}
        <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">{product.brand}</p>
        <h3 className="font-serif text-sm sm:text-lg text-foreground group-hover:text-foreground/70 transition-colors duration-300">{product.name}</h3>
        <p className="text-sm font-sans text-foreground/60 mt-1">{product.price}</p>
      </Link>
    </TiltCard>
  );
};

export default Shop;
