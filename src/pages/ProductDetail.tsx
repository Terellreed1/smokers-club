import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";
import { allProducts } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? allProducts.find((p) => p.id === Number(id)) : null;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const outOfStock = product ? product.qty <= 0 : false;

  if (!product) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-primary text-sm font-sans uppercase editorial-spacing">
            Back to Shop
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleAddToCart = () => {
    if (outOfStock) return;
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image || "/placeholder.svg",
      });
    }
    setTimeout(() => setIsAdding(false), 600);
    setQuantity(1);
  };

  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-sans uppercase editorial-spacing text-primary mb-12 hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="aspect-[3/4] overflow-hidden relative bg-white rounded-2xl">
                {product.image ? (
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-contain ${outOfStock ? "opacity-40 grayscale" : ""}`}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
                    <ImageOff size={64} strokeWidth={1} />
                    <span className="text-xs mt-3 uppercase tracking-wider">No Photo Yet</span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-2">{product.brand}</p>
                <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-2">{product.name}</h1>
                {product.isNew && (
                  <span className="text-xs font-sans uppercase editorial-spacing text-primary mb-4">New Drop</span>
                )}
                {outOfStock && (
                  <span className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Sold Out</span>
                )}
                {!outOfStock && !product.isNew && product.qty <= 5 && (
                  <span className="text-xs font-sans uppercase editorial-spacing text-foreground mb-4">Low Stock — {product.qty} left</span>
                )}
                <p className="font-serif text-3xl text-foreground mb-8">{product.price}</p>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-10">
                  {product.description}
                </p>

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-6 mb-12">
                  <div className="flex items-center border border-border/50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Decrease quantity"
                      disabled={outOfStock}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-5 text-sm font-sans text-foreground min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.qty, quantity + 1))}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Increase quantity"
                      disabled={outOfStock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-3 text-xs font-sans uppercase editorial-spacing border px-8 py-4 transition-all duration-500 ${
                      outOfStock
                        ? "border-border/50 text-muted-foreground cursor-not-allowed"
                        : "border-foreground text-foreground hover:bg-foreground hover:text-background"
                    }`}
                    whileHover={outOfStock ? {} : { scale: 1.03, letterSpacing: "0.3em" }}
                    whileTap={outOfStock ? {} : { scale: 0.97 }}
                    animate={isAdding ? { scale: [1, 1.05, 1], transition: { duration: 0.4 } } : {}}
                    disabled={outOfStock}
                  >
                    <motion.span
                      animate={isAdding ? { rotate: [0, -15, 15, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <ShoppingBag size={16} />
                    </motion.span>
                    {outOfStock ? "Sold Out" : isAdding ? "Added!" : "Add to Cart"}
                  </motion.button>
                </div>

                {/* Disclaimers */}
                <div className="border-t border-border/50 pt-8 space-y-4">
                  <p className="text-[10px] text-muted-foreground/60 font-sans leading-relaxed">
                    <strong className="text-muted-foreground/80">FDA Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 font-sans leading-relaxed">
                    <strong className="text-muted-foreground/80">Cannabis Warning:</strong> This product contains THC. For use only by adults 21 and older. Keep out of reach of children. Do not drive or operate machinery under the influence.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
