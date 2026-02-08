import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

import blueGuavaPops from "@/assets/products/blue-guava-pops.png";
import pineSolParadise from "@/assets/products/pine-sol-paradise.png";
import zPie from "@/assets/products/z-pie.png";
import tiramisu from "@/assets/products/tiramisu.png";

const products = [
  {
    id: 1,
    name: "Blue Guava Pops",
    brand: "La Dulceria",
    type: "Hybrid",
    price: "$55",
    image: blueGuavaPops,
  },
  {
    id: 2,
    name: "Pine-Sol Paradise",
    brand: "Fresh Vibez",
    type: "Sativa",
    price: "$45",
    image: pineSolParadise,
  },
  {
    id: 3,
    name: "Z-Pie",
    brand: "Fresh Vibez",
    type: "Indica",
    price: "$50",
    image: zPie,
  },
  {
    id: 4,
    name: "Tiramisu",
    brand: "Up The Hill",
    type: "Hybrid",
    price: "$65",
    image: tiramisu,
  },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 md:py-32 px-6">
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/4] bg-background border border-border/30 mb-4 overflow-hidden relative transition-all duration-500 group-hover:border-border/60">
        {/* Product image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Quick view text on hover */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center z-10"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-[10px] font-sans uppercase editorial-spacing text-background/90">
            Quick View
          </span>
        </motion.div>
      </div>

      <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">
        {product.brand}
      </p>
      <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/70 transition-colors duration-300">
        {product.name}
      </h3>
      <div className="flex items-center gap-3 mt-1">
        <p className="text-sm font-sans text-muted-foreground">{product.price}</p>
        <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground/60">
          {product.type}
        </span>
      </div>
    </Link>
  );
};

export default ProductsPreview;
