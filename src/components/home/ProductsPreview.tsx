import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { allProducts } from "@/data/products";

// 4 Featured products by ID
const featuredIds = [6, 1, 8, 15];
const products = allProducts.filter((p) => featuredIds.includes(p.id));

const ProductsPreview = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-foreground">
          Popular Flower
        </h2>
        <Link
          to="/shop"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link to={`/shop/${product.id}`} className="block">
              {product.image && (
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-contain mb-3"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              <p className="text-xs font-medium text-muted-foreground mb-0.5">
                {product.brand}
              </p>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm font-bold text-primary">{product.price}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPreview;
