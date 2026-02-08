import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const allProducts = [
  { id: 1, name: "Premium Flower", brand: "Cookies", type: "Indica", category: "Flower", price: "$55", deal: false },
  { id: 2, name: "Live Resin Cart", brand: "Raw Garden", type: "Hybrid", category: "Vape", price: "$45", deal: true },
  { id: 3, name: "Diamond Infused Pre-Roll", brand: "Jeeter", type: "Sativa", category: "Pre-Roll", price: "$25", deal: false },
  { id: 4, name: "Rosin Concentrate", brand: "710 Labs", type: "Hybrid", category: "Concentrate", price: "$75", deal: false },
  { id: 5, name: "THC Gummies", brand: "STIIIZY", type: "Indica", category: "Edible", price: "$30", deal: true },
  { id: 6, name: "Live Rosin Cart", brand: "Connected", type: "Sativa", category: "Vape", price: "$50", deal: false },
  { id: 7, name: "Indoor Flower", brand: "Alien Labs", type: "Hybrid", category: "Flower", price: "$65", deal: false },
  { id: 8, name: "Infused Blunt", brand: "Heavy Hitters", type: "Indica", category: "Pre-Roll", price: "$20", deal: true },
];

const categories = ["All", "Flower", "Vape", "Pre-Roll", "Concentrate", "Edible"];
const strainTypes = ["All", "Indica", "Sativa", "Hybrid"];
const brands = ["All", "Cookies", "Raw Garden", "Jeeter", "710 Labs", "STIIIZY", "Connected", "Alien Labs", "Heavy Hitters"];

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
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-xs font-sans px-4 py-2 border transition-all duration-300 ${
              value === opt
                ? "border-foreground text-foreground bg-foreground/5"
                : "border-border/50 text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Curated Selection</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">The Shop</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            {/* Filters */}
            <aside>
              <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterGroup label="Strain" options={strainTypes} value={strain} onChange={setStrain} />
              <FilterGroup label="Brand" options={brands} value={brand} onChange={setBrand} />
              <div className="mb-8">
                <button
                  onClick={() => setDealsOnly(!dealsOnly)}
                  className={`text-xs font-sans px-4 py-2 border transition-all duration-300 ${
                    dealsOnly ? "border-foreground text-foreground bg-foreground/5" : "border-border/50 text-muted-foreground hover:border-foreground/30"
                  }`}
                >
                  Deals Only
                </button>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link key={product.id} to={`/shop/${product.id}`} className="group block">
                  <div className="aspect-[3/4] bg-secondary/80 border border-border/50 mb-4 overflow-hidden relative transition-all duration-500 group-hover:border-foreground/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-6xl text-muted-foreground/10 group-hover:text-foreground/10 transition-colors duration-500">✦</span>
                    </div>
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
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="font-serif text-2xl text-muted-foreground">No products match your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
