import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

const products = [
  {
    id: 1,
    name: "Premium Flower",
    brand: "Cookies",
    type: "Indica",
    price: "$55",
    image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=500&h=650&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=500&h=650&fit=crop",
  },
  {
    id: 2,
    name: "Live Resin Cart",
    brand: "Raw Garden",
    type: "Hybrid",
    price: "$45",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=650&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=500&h=650&fit=crop",
  },
  {
    id: 3,
    name: "Diamond Infused Pre-Roll",
    brand: "Jeeter",
    type: "Sativa",
    price: "$25",
    image: "https://images.unsplash.com/photo-1533750204176-3b0d38e9ac1e?w=500&h=650&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=650&fit=crop",
  },
  {
    id: 4,
    name: "Rosin Concentrate",
    brand: "710 Labs",
    type: "Hybrid",
    price: "$75",
    image: "https://images.unsplash.com/photo-1532187863486-abf4dbce2632?w=500&h=650&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&h=650&fit=crop",
  },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <ScrollReveal>
            <div>
              <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
                The Collection
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                Featured Products
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Link
              to="/shop"
              className="hidden md:block text-xs font-sans uppercase editorial-spacing text-gold hover:text-foreground transition-colors duration-300 border-b border-gold/30 pb-1"
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
              className="text-xs font-sans uppercase editorial-spacing text-gold border-b border-gold/30 pb-1"
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
      <div className="aspect-[3/4] bg-secondary/80 border border-border/50 mb-4 overflow-hidden relative transition-all duration-500 group-hover:border-gold/30">
        {/* Primary image */}
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: isHovered ? 1.08 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Secondary "reveal" image on hover */}
        <motion.img
          src={product.hoverImage}
          alt={`${product.name} detail`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 1.15,
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Hover overlay shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Type badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-[10px] font-sans uppercase editorial-spacing text-gold bg-background/90 px-3 py-1">
            {product.type}
          </span>
        </div>

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
      <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors duration-300">
        {product.name}
      </h3>
      <p className="text-sm font-sans text-gold mt-1">{product.price}</p>
    </Link>
  );
};

export default ProductsPreview;
