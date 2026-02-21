import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image_url: string | null;
}

const ProductsPreview = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, brand, price, image_url")
      .eq("active", true)
      .order("sort_order")
      .limit(2)
      .then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <section className="py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl text-foreground">Popular Flower</h2>
        <Link to="/shop" className="text-sm font-medium text-primary hover:underline">View All</Link>
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
              {product.image_url ? (
                <motion.img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full aspect-square object-contain mb-3"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <div className="w-full aspect-square mb-3 flex flex-col items-center justify-center text-muted-foreground/30">
                  <ImageOff size={32} strokeWidth={1} />
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsPreview;
