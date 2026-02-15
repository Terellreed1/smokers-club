import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Plus, Minus, ShoppingBag } from "lucide-react";

import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.png";
import teaTime from "@/assets/products/tea-time.png";
import dragonfruitCandy from "@/assets/products/dragonfruit-candy.png";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.png";
import eliteFrutaz from "@/assets/products/elite-frutaz.png";
import privateReserveFrutaz from "@/assets/products/private-reserve-frutaz.png";
import zopBoyZourzop from "@/assets/products/zop-boy-zourzop.png";

const placeholder = "/placeholder.svg";

const products: Record<string, { name: string; brand: string; price: string; qty: number; image: string; description: string }> = {
  "1": { name: "Verzaza", brand: "Frutaz", price: "$65", qty: 3, image: eliteFrutaz, description: "Premium exotic flower with a complex terpene profile. Dense, frosty nugs delivering smooth, euphoric effects." },
  "2": { name: "Super Bubble Gum", brand: "Frutaz", price: "$65", qty: 3, image: privateReserveFrutaz, description: "Sweet and fruity private reserve strain. Candy-like aroma with a relaxing, uplifting high." },
  "3": { name: "SqurtleZop", brand: "Zour Zop", price: "$65", qty: 4, image: zopBoyZourzop, description: "Sour and tangy exotic strain with vibrant colors. Energizing effects perfect for daytime use." },
  "4": { name: "ZopMander", brand: "Zour Zop", price: "$65", qty: 4, image: placeholder, description: "Bold and fiery exotic flower with a unique terpene blend. Balanced hybrid effects." },
  "5": { name: "Tea Time", brand: "Mammey's Bodega", price: "$65", qty: 0, image: teaTime, description: "Smooth, calming strain with herbal undertones. Perfect for unwinding after a long day." },
  "6": { name: "Dirty Fantasy Slushie", brand: "JoJo Exotics", price: "$65", qty: 27, image: dirtyFantaSlushie, description: "Refreshing and fruity exotic strain. Icy smooth smoke with a creative, euphoric buzz." },
  "7": { name: "Return of Silver Surfer", brand: "Fumi x WSC", price: "$65", qty: 23, image: placeholder, description: "Legendary collaboration strain with cosmic effects. Silvery trichomes and out-of-this-world flavor." },
  "8": { name: "Cotton Candy Clouds", brand: "Always Faded", price: "$65", qty: 2, image: cottonCandyClouds, description: "Sweet, fluffy clouds of candy-flavored smoke. Light and dreamy effects for a mellow vibe." },
  "9": { name: "Strawberry Kiwi Candy", brand: "Always Faded", price: "$65", qty: 0, image: placeholder, description: "Fruity fusion of strawberry and kiwi flavors. Uplifting and social strain." },
  "10": { name: "Cherry Bomb", brand: "Always Faded", price: "$65", qty: 0, image: placeholder, description: "Explosive cherry flavor with a powerful punch. Intense relaxation and full-body effects." },
  "11": { name: "Cherry Pixie Stiks", brand: "Always Faded", price: "$65", qty: 0, image: placeholder, description: "Nostalgic candy-inspired strain with sweet cherry notes. Fun and playful effects." },
  "12": { name: "Tropical Gummy Bears", brand: "Always Faded", price: "$65", qty: 8, image: placeholder, description: "Tropical fruit medley with gummy candy sweetness. Balanced and enjoyable effects." },
  "13": { name: "Kamikaze Candy", brand: "Always Faded", price: "$65", qty: 2, image: placeholder, description: "Bold and intense candy strain. Hard-hitting effects with an explosive flavor profile." },
  "14": { name: "Dragonfruit Candy", brand: "Always Faded", price: "$65", qty: 3, image: dragonfruitCandy, description: "Exotic dragonfruit flavors with candy sweetness. Smooth smoke with creative, uplifting effects." },
  "15": { name: "Empire State", brand: "Super Candy Bros", price: "$65", qty: 52, image: placeholder, description: "Towering potency with a sophisticated flavor profile. Premium quality from Super Candy Bros." },
  "16": { name: "Lost Angels", brand: "Super Candy Bros", price: "$65", qty: 50, image: placeholder, description: "West coast vibes in every puff. Smooth, relaxing strain with a citrus finish." },
  "17": { name: "Screwston", brand: "Super Candy Bros", price: "$65", qty: 49, image: placeholder, description: "Houston-inspired strain with heavy-hitting effects. Slow and syrupy smooth." },
  "18": { name: "Skyami", brand: "Super Candy Bros", price: "$65", qty: 46, image: placeholder, description: "Miami heat meets sky-high potency. Tropical flavors with an energizing buzz." },
  "19": { name: "Super Cherry Bubble Gum", brand: "Kandy Depo", price: "$65", qty: 17, image: placeholder, description: "Classic bubble gum flavor with a cherry twist. Sweet and nostalgic smoke." },
  "20": { name: "Blk Cherry Lemonhead", brand: "Kandy Depo", price: "$65", qty: 21, image: placeholder, description: "Tart lemon meets dark cherry. Sour candy flavor with balanced effects." },
  "21": { name: "Frozen Mochi Berry Bitez", brand: "Kandy Depo", price: "$65", qty: 28, image: placeholder, description: "Frozen berry goodness with mochi sweetness. Cool and refreshing smoke." },
  "22": { name: "Blue Lemon Shock Z", brand: "Kandy Depo", price: "$65", qty: 23, image: placeholder, description: "Electric blue lemon flavor with a shocking punch. Energizing and tart." },
  "23": { name: "Magic Dope", brand: "ESPN", price: "$60", qty: 13, image: placeholder, description: "Enchanting effects with a magical flavor profile. Mystical and potent." },
  "24": { name: "Mojos Candy", brand: "JoJo Exotics", price: "$60", qty: 33, image: placeholder, description: "Sweet and tangy candy strain from JoJo Exotics. Fun, flavorful, and uplifting." },
  "25": { name: "Buttercup Biscotti", brand: "JoJo Exotics", price: "$60", qty: 62, image: placeholder, description: "Rich biscotti flavor with buttery smoothness. Dessert-like strain for relaxation." },
  "26": { name: "Flying Cherry Kicks", brand: "Super Candy Bros", price: "$60", qty: 6, image: placeholder, description: "Cherry-flavored with a kick of energy. Soaring effects and fruity finish." },
  "27": { name: "Rainin Thunder", brand: "Super Candy Bros", price: "$60", qty: 9, image: placeholder, description: "Thunderous potency with a stormy flavor. Heavy-hitting indica-leaning effects." },
  "28": { name: "Sub Z", brand: "Super Candy Bros", price: "$60", qty: 4, image: placeholder, description: "Sub-zero cool with icy menthol undertones. Refreshing and invigorating." },
  "29": { name: "Hellfire Ringz", brand: "Super Candy Bros", price: "$60", qty: 9, image: placeholder, description: "Fiery hot cinnamon candy flavor. Intense effects with a spicy kick." },
  "30": { name: "Twisted Berry Bitez", brand: "Super Candy Bros", price: "$60", qty: 11, image: placeholder, description: "Twisted mix of berry flavors. Sweet and tangy with balanced effects." },
  "31": { name: "Hollywood Stunt Double", brand: "Super Candy Bros", price: "$60", qty: 10, image: placeholder, description: "Star-quality strain with blockbuster effects. Premium and show-stopping." },
  "32": { name: "Super Sweet Blades", brand: "Super Candy Bros", price: "$60", qty: 13, image: placeholder, description: "Sweet and sharp flavor profile. Clean cut effects with sugary finish." },
  "33": { name: "Zorro", brand: "Super Candy Bros", price: "$60", qty: 10, image: placeholder, description: "Mysterious and bold strain. Swift effects with a masked complexity." },
  "34": { name: "Atomic Kandy Bomb", brand: "Kandy Depo", price: "$60", qty: 11, image: placeholder, description: "Explosive candy flavor with atomic potency. Powerful and sweet." },
  "35": { name: "Pink Kandy Blasterz", brand: "Kandy Depo", price: "$60", qty: 5, image: placeholder, description: "Pink candy sweetness with a blasting effect. Fun and flavorful." },
  "36": { name: "Zabreakers", brand: "Kandy Depo", price: "$60", qty: 7, image: placeholder, description: "Jawbreaker-inspired strain with layered flavors. Long-lasting and colorful effects." },
  "37": { name: "Toxic Slime", brand: "Kandy Depo", price: "$60", qty: 11, image: placeholder, description: "Neon green goodness with a sour punch. Potent and gooey effects." },
  "38": { name: "Terp Quencher", brand: "Breakfast Club LA", price: "$50", qty: 11, image: placeholder, description: "Thirst-quenching terpene profile. Refreshing and satisfying smoke." },
  "39": { name: "Fusion Cherry Blast", brand: "Kandy Depo", price: "$50", qty: 4, image: placeholder, description: "Cherry fusion with a blasting finish. Sweet and potent combination." },
  "40": { name: "Invader Z", brand: "Kandy Depo", price: "$50", qty: 1, image: placeholder, description: "Alien-inspired strain with otherworldly effects. Unique and invasive flavor." },
  "41": { name: "Vibranium Rock Candy", brand: "Kandy Depo", price: "$50", qty: 4, image: placeholder, description: "Indestructible flavor with rock-solid effects. Rare and powerful." },
  "42": { name: "Gamma Bertz", brand: "Kandy Depo", price: "$50", qty: 8, image: placeholder, description: "Gamma-level berry flavor with radiating effects. Fruity and energizing." },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? products[id] : null;
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const outOfStock = product ? product.qty <= 0 : false;

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
    if (outOfStock) return;
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
                  className={`absolute inset-0 w-full h-full object-contain ${outOfStock ? "opacity-40 grayscale" : ""}`}
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
                {outOfStock && (
                  <span className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Sold Out</span>
                )}
                {!outOfStock && product.qty <= 5 && (
                  <span className="text-xs font-sans uppercase editorial-spacing text-foreground mb-4">Low Stock — {product.qty} left</span>
                )}
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
