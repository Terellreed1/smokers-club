import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";
import TiltCard from "@/components/TiltCard";

import dirtyFantaSlushie from "@/assets/products/dirty-fanta-slushie.png";
import eliteFrutaz from "@/assets/products/elite-frutaz.png";
import cottonCandyClouds from "@/assets/products/cotton-candy-clouds.png";
import zopBoyZourzop from "@/assets/products/zop-boy-zourzop.png";

const products = [
  {
    id: 6,
    name: "Dirty Fantasy Slushie",
    brand: "JoJo Exotics",
    type: "$65",
    price: "$65",
    image: dirtyFantaSlushie,
  },
  {
    id: 1,
    name: "Verzaza",
    brand: "Frutaz",
    type: "$65",
    price: "$65",
    image: eliteFrutaz,
  },
  {
    id: 8,
    name: "Cotton Candy Clouds",
    brand: "Always Faded",
    type: "$65",
    price: "$65",
    image: cottonCandyClouds,
  },
  {
    id: 3,
    name: "SqurtleZop",
    brand: "Zour Zop",
    type: "$65",
    price: "$65",
    image: zopBoyZourzop,
  },
];

const ProductsPreview = () => {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              Featured Products
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              to="/shop"
              className="hidden md:block text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors duration-300 pb-1"
            >
              View All
            </Link>
          </ScrollReveal>
        </div>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-10"
          staggerDelay={0.1}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className="md:hidden text-center mt-10">
            <Link
              to="/shop"
              className="text-xs font-sans uppercase editorial-spacing text-muted-foreground"
            >
              View All Products
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: typeof products[number];
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <TiltCard className="relative">
      <Link to={`/shop/${product.id}`} className="group block">
        <div className="aspect-[3/4] mb-3 sm:mb-5 overflow-hidden relative">
          <motion.img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08 }}
          />
        </div>

        <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">
          {product.brand}
        </p>
        <h3 className="font-serif text-sm sm:text-lg text-foreground group-hover:text-foreground/70 transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <p className="text-sm font-sans text-muted-foreground">{product.price}</p>
          <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground/60">
            {product.type}
          </span>
        </div>
      </Link>
    </TiltCard>
  );
};

export default ProductsPreview;
