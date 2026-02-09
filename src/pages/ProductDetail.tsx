import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";

import blackLabel from "@/assets/products/black-label.png";
import bigBagBuds from "@/assets/products/big-bag-buds.png";
import elJefe from "@/assets/products/el-jefe.png";
import marshmallowMilk from "@/assets/products/marshmallow-milk.png";
import blueGuavaPops from "@/assets/products/blue-guava-pops.png";
import pineSolParadise from "@/assets/products/pine-sol-paradise.png";
import tiramisu from "@/assets/products/tiramisu.png";
import zPie from "@/assets/products/z-pie.png";

const products: Record<string, { name: string; brand: string; type: string; price: string; description: string; image: string }> = {
  "1": { name: "Black Label", brand: "The Republic", type: "Hybrid", price: "$55", image: blackLabel, description: "Hand-selected, top-shelf indoor flower with a rich terpene profile. Dense nugs with a smooth, relaxing finish." },
  "2": { name: "CombOz", brand: "Big Bag O' Buds", type: "Sativa", price: "$45", image: bigBagBuds, description: "Clean, refined live resin extracted from fresh-frozen cannabis. Full-spectrum flavor with balanced effects." },
  "3": { name: "El Jefe", brand: "LowKey", type: "Indica", price: "$50", image: elJefe, description: "Premium pre-roll infused with liquid diamonds for an elevated experience. Uplifting and creative." },
  "4": { name: "Marshmallow Milk", brand: "VOLO", type: "Hybrid", price: "$65", image: marshmallowMilk, description: "Solventless, craft-grade rosin pressed from ice water hash. Pure, potent, and full of flavor." },
  "5": { name: "Blue Guava Pops", brand: "Exotic Genetix", type: "Sativa", price: "$60", image: blueGuavaPops, description: "Precisely dosed gummies crafted for a consistent, relaxing experience. Available in assorted flavors." },
  "6": { name: "Pine Sol Paradise", brand: "Jungle Boys", type: "Hybrid", price: "$75", image: pineSolParadise, description: "Solventless live rosin in a convenient cartridge. Clean, flavorful, and uplifting." },
  "7": { name: "Tiramisu", brand: "Connected", type: "Indica", price: "$30", image: tiramisu, description: "Small-batch indoor cultivation with exotic genetics. Visually stunning with complex terpene profiles." },
  "8": { name: "Z-Pie", brand: "Alien Labs", type: "Hybrid", price: "$70", image: zPie, description: "Slow-burning blunt infused with premium concentrate. Perfect for sharing or a solo session." },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? products[id] : null;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-gold text-sm font-sans uppercase editorial-spacing">
            Back to Shop
          </Link>
        </div>
      </PageLayout>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: Number(id),
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
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
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-sans uppercase editorial-spacing text-gold mb-12 hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Back to Shop
            </Link>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="aspect-[3/4] overflow-hidden relative">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </div>
            </ScrollReveal>

            {/* Details */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col justify-center">
                <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-2">{product.brand}</p>
                <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-2">{product.name}</h1>
                <span className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-6">{product.type}</span>
                <p className="font-serif text-3xl text-gold mb-8">{product.price}</p>
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
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-5 text-sm font-sans text-foreground min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <motion.button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-3 text-xs font-sans uppercase editorial-spacing border border-foreground text-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
                    whileTap={{ scale: 0.97 }}
                    animate={isAdding ? { scale: [1, 1.02, 1] } : {}}
                  >
                    <ShoppingBag size={16} />
                    Add to Cart
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
