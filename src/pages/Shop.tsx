import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Clock, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import QuickView from "@/components/QuickView";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  qty: number;
  image_url: string | null;
  description: string;
  is_new: boolean;
  strain: string | null;
  product_type: string;
  active: boolean;
  sold_out: boolean;
  sort_order: number;
  created_at: string;
}

const STRAIN_OPTIONS = ["All", "Indica", "Sativa", "Hybrid"];
const COMING_SOON_CATS = ["Vapes", "Edibles", "Concentrates", "Pre-Rolls", "Accessories"];
const ALL_EXTRA_CATS = ["Vapes", "Edibles", "Concentrates", "Pre-Rolls", "Accessories"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];
const MIN_PRICE = 10;
const MAX_PRICE = 200;

const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, "")) || 0;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Read filters from URL
  const category = searchParams.get("category") || "All";
  const strain = searchParams.get("strain") || "All";
  const brand = searchParams.get("brand") || "All";
  const sort = searchParams.get("sort") || "featured";
  const priceMin = parseInt(searchParams.get("minPrice") || String(MIN_PRICE));
  const priceMax = parseInt(searchParams.get("maxPrice") || String(MAX_PRICE));
  const saleFilter = searchParams.get("sale") === "true";

  useEffect(() => {
    supabase.from("products").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      setAllProducts((data as Product[]) || []);
      setLoading(false);
    });
  }, []);

  const setFilter = useCallback((key: string, value: string, defaultVal: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === defaultVal) next.delete(key); else next.set(key, value);
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const clearAllFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Derived data
  const availableCategories = useMemo(() => {
    const types = new Set(allProducts.filter(p => !p.sold_out).map(p => p.product_type));
    const cats = ["All", "Flower"];
    ALL_EXTRA_CATS.forEach(c => { if (types.has(c)) cats.push(c); });
    return cats;
  }, [allProducts]);

  const isComingSoonCategory = COMING_SOON_CATS.includes(category) && !availableCategories.includes(category);

  const brandOptions = useMemo(() => {
    const brands = new Set(allProducts.filter(p => !p.sold_out).map(p => p.brand).filter(Boolean));
    return ["All", ...Array.from(brands).sort()];
  }, [allProducts]);

  const filtered = useMemo(() => {
    let result = allProducts.filter(p => {
      if (p.sold_out) return false;
      if (category !== "All" && p.product_type !== category) return false;
      if (brand !== "All" && p.brand !== brand) return false;
      const pn = parsePrice(p.price);
      if (pn < priceMin || pn > priceMax) return false;
      if (strain !== "All" && p.strain !== strain) return false;
      if (saleFilter && !p.is_new) return false;
      return true;
    });

    // Sort
    switch (sort) {
      case "price-asc": result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price)); break;
      case "price-desc": result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price)); break;
      case "newest": result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); break;
      default: result.sort((a, b) => a.sort_order - b.sort_order); break;
    }
    return result;
  }, [allProducts, category, brand, priceMin, priceMax, strain, saleFilter, sort]);

  const activeFilterCount = [
    category !== "All",
    strain !== "All",
    brand !== "All",
    priceMin > MIN_PRICE || priceMax < MAX_PRICE,
    saleFilter,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  // Count label
  const countLabel = useMemo(() => {
    const parts: string[] = [];
    if (strain !== "All") parts.push(strain);
    if (category !== "All") parts.push(category.toLowerCase());
    parts.push(filtered.length === 1 ? "product" : "products");
    return `Showing ${filtered.length} ${parts.join(" ")}`;
  }, [filtered.length, strain, category]);

  // Shared filter UI
  const FilterSidebar = ({ onDone }: { onDone?: () => void }) => (
    <div className="space-y-8">
      {/* Category */}
      <FilterGroup
        label="Category"
        options={[...availableCategories, ...COMING_SOON_CATS.filter(c => !availableCategories.includes(c))]}
        value={category}
        onChange={(v) => setFilter("category", v, "All")}
        disabledOptions={COMING_SOON_CATS.filter(c => !availableCategories.includes(c))}
      />

      {/* Strain */}
      <FilterGroup
        label="Strain"
        options={STRAIN_OPTIONS}
        value={strain}
        onChange={(v) => setFilter("strain", v, "All")}
        disabled={isComingSoonCategory}
      />

      {/* Brand */}
      <FilterGroup
        label="Brand"
        options={brandOptions}
        value={brand}
        onChange={(v) => setFilter("brand", v, "All")}
        disabled={isComingSoonCategory}
      />

      {/* Price Range */}
      <div className={cn(isComingSoonCategory && "opacity-40 pointer-events-none")}>
        <h4 className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Price Range</h4>
        <DualRangeSlider
          min={MIN_PRICE}
          max={MAX_PRICE}
          valueMin={priceMin}
          valueMax={priceMax}
          onChangeMin={(v) => setFilter("minPrice", String(v), String(MIN_PRICE))}
          onChangeMax={(v) => setFilter("maxPrice", String(v), String(MAX_PRICE))}
        />
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={() => { clearAllFilters(); onDone?.(); }}
          className="text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Clear All Filters
        </button>
      )}

      {onDone && (
        <motion.button
          onClick={onDone}
          whileTap={{ scale: 0.97 }}
          className="w-full h-12 bg-foreground text-background font-sans text-xs uppercase wide-spacing rounded-full hover:bg-foreground/90 transition-colors"
        >
          Apply Filters
        </motion.button>
      )}
    </div>
  );

  return (
    <PageLayout>
      <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Curated Selection</p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground">The Shop</h1>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <ScrollReveal delay={0.1} direction="left">
                <FilterSidebar />
              </ScrollReveal>
            </aside>

            {/* Main content */}
            <div>
              {/* Toolbar: count + sort */}
              {!isComingSoonCategory && (
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-sans text-muted-foreground">
                    {loading ? "Loading…" : countLabel}
                  </p>
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="flex items-center gap-1.5 text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {SORT_OPTIONS.find(s => s.value === sort)?.label || "Featured"}
                      <ChevronDown size={14} className={cn("transition-transform", sortOpen && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {sortOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="absolute right-0 top-full mt-2 bg-background border border-border shadow-lg rounded-md py-1 z-20 min-w-[180px]"
                        >
                          {SORT_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              onClick={() => { setFilter("sort", opt.value, "featured"); setSortOpen(false); }}
                              className={cn(
                                "w-full text-left px-4 py-2.5 text-xs font-sans transition-colors",
                                sort === opt.value ? "text-foreground bg-muted/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                              )}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Coming Soon state */}
              {isComingSoonCategory ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-20 sm:py-32"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img src={logo} alt="LCC" className="h-24 w-24 object-contain mb-6 opacity-70" />
                  <h2
                    className="text-5xl italic text-foreground mb-3"
                    style={{ fontFamily: "'Cormorant Garamond', 'Bodoni Moda', serif" }}
                  >
                    Coming Soon
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    We're curating the finest {category.toLowerCase()} for you. Check back soon.
                  </p>
                </motion.div>
              ) : loading ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-[3/4] bg-muted/20 animate-pulse rounded" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                /* Empty state */
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <img src={logo} alt="LCC" className="h-20 w-20 object-contain mb-5 opacity-60" />
                  <p className="font-serif text-2xl text-foreground mb-2">No products match your filters</p>
                  <p className="text-xs text-muted-foreground mb-6">Try adjusting your filters or clearing them.</p>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-sans uppercase editorial-spacing border border-foreground text-foreground px-6 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                    >
                      <ProductCard product={product} onQuickView={setQuickViewId} />
                    </motion.div>
                  ))}
                  {/* More Coming Soon card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="aspect-[3/4] border border-dashed border-border/50 rounded-lg flex flex-col items-center justify-center text-center p-6"
                  >
                    <Clock size={32} strokeWidth={1} className="text-muted-foreground/40 mb-3" />
                    <p className="font-serif text-lg text-foreground mb-1">More Coming Soon</p>
                    <p className="text-xs text-muted-foreground/60 max-w-[200px]">
                      New strains, vapes, edibles & more dropping soon.
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <motion.button
          onClick={() => setMobileFilterOpen(true)}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-2 px-6 py-3.5 bg-foreground text-background rounded-full shadow-xl text-xs font-sans uppercase wide-spacing"
        >
          <SlidersHorizontal size={16} />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#B8972E] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
              {activeFilterCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl max-h-[85vh] overflow-y-auto lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="sticky top-0 bg-background z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
                <h3 className="font-serif text-lg text-foreground">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>
              <div className="px-6 py-6">
                <FilterSidebar onDone={() => setMobileFilterOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuickView productId={quickViewId} onClose={() => setQuickViewId(null)} />
    </PageLayout>
  );
};

/* ── Filter Group ── */
const FilterGroup = ({
  label, options, value, onChange, disabled, disabledOptions = [],
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
  disabled?: boolean; disabledOptions?: string[];
}) => (
  <div className={cn(disabled && "opacity-40 pointer-events-none")}>
    <h4 className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3">{label}</h4>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isDisabled = disabledOptions.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => !isDisabled && onChange(opt)}
            disabled={isDisabled}
            className={cn(
              "text-xs font-sans px-3.5 py-2 border transition-all duration-300 rounded-sm",
              isDisabled
                ? "border-border/30 text-muted-foreground/30 cursor-not-allowed"
                : value === opt
                  ? "border-foreground text-foreground bg-foreground/5"
                  : "border-border/50 text-muted-foreground hover:border-foreground/30"
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

/* ── Dual Range Slider ── */
const DualRangeSlider = ({
  min, max, valueMin, valueMax, onChangeMin, onChangeMax,
}: {
  min: number; max: number; valueMin: number; valueMax: number;
  onChangeMin: (v: number) => void; onChangeMax: (v: number) => void;
}) => {
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-border" />
        {/* Active track */}
        <div
          className="absolute h-1.5 rounded-full"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%`, background: "#B8972E" }}
        />
        {/* Min handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={valueMin}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v <= valueMax - 5) onChangeMin(v);
          }}
          className="dual-range-input absolute inset-x-0"
          style={{ zIndex: valueMin > max - 20 ? 5 : 3 }}
        />
        {/* Max handle */}
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={valueMax}
          onChange={(e) => {
            const v = parseInt(e.target.value);
            if (v >= valueMin + 5) onChangeMax(v);
          }}
          className="dual-range-input absolute inset-x-0"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-foreground font-medium">${valueMin}</span>
        <span className="text-muted-foreground/50">—</span>
        <span className="text-foreground font-medium">${valueMax}</span>
      </div>
    </div>
  );
};

/* ── Product Card ── */
const ProductCard = ({ product, onQuickView }: { product: Product; onQuickView: (id: string) => void }) => (
  <TiltCard className="relative group">
    <Link to={`/shop/${product.id}`} className="block">
      <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-sm">
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "#FAF8F4" }}>
            <img src={logo} alt="LCC" className="w-16 h-16 object-contain opacity-40" />
          </div>
        )}
        {/* Strain badge */}
        {product.strain && (
          <span className="absolute top-2 left-2 text-[9px] font-sans uppercase tracking-wider bg-background/85 backdrop-blur-sm text-foreground px-2.5 py-1 rounded-full">
            {product.strain}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product.id); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-sans uppercase editorial-spacing bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-foreground hover:text-background shadow-sm"
        >
          <Eye size={12} /> Quick View
        </button>
      </div>
      <div className="text-center px-1">
        <h3 className="font-serif text-sm text-foreground leading-snug">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{product.price}</p>
      </div>
    </Link>
  </TiltCard>
);

export default Shop;
