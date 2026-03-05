import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import heroLogo from "@/assets/hero-logo.png";

interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  strain: string | null;
  image_url: string | null;
  qty: number;
}

const ProductsPreview = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, brand, price, strain, image_url, qty")
      .eq("active", true)
      .order("sort_order")
      .limit(8)
      .then(({ data }) => setProducts(data || []));
  }, []);

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
      style={{ background: "#0D110E" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header — minimal */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-3"
              style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
            >
              Menu
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                color: "#F0EBE0",
                lineHeight: 1.1,
              }}
            >
              Popular Flower
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:block text-[10px] uppercase tracking-[0.2em] pb-1 transition-colors duration-200"
            style={{
              color: "rgba(201,168,76,0.5)",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              borderBottom: "1px solid rgba(201,168,76,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C9A84C";
              e.currentTarget.style.borderBottomColor = "#C9A84C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(201,168,76,0.5)";
              e.currentTarget.style.borderBottomColor = "rgba(201,168,76,0.2)";
            }}
          >
            View All
          </Link>
        </div>

        {/* Thin divider */}
        <div className="h-px w-full mb-10 sm:mb-14" style={{ background: "rgba(201,168,76,0.1)" }} />

        {/* Product grid — clean, no containers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:gap-x-8 lg:gap-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link to={`/shop/${product.id}`} className="block">
                {/* Image — no border, no container, clean */}
                <div className="relative aspect-square overflow-hidden mb-4 bg-[#131810]">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img src={heroLogo} alt="" className="w-12 h-12 opacity-10" />
                    </div>
                  )}

                  {/* Strain — minimal pill */}
                  {product.strain && (
                    <span
                      className="absolute top-3 left-3 text-[8px] uppercase tracking-[0.15em] px-2 py-0.5"
                      style={{
                        color: "rgba(201,168,76,0.7)",
                        background: "rgba(13,17,14,0.85)",
                        backdropFilter: "blur(8px)",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {product.strain}
                    </span>
                  )}

                  {/* Add to cart overlay — appears on hover */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          id: parseInt(product.id) || Date.now(),
                          name: product.name,
                          brand: product.brand,
                          price: product.price,
                          image: product.image_url || "",
                        });
                      }}
                      className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.15em] px-4 py-2 transition-all duration-200"
                      style={{
                        background: "rgba(201,168,76,0.95)",
                        color: "#0D110E",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      <ShoppingBag size={11} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Text — clean typography, no containers */}
                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.15em] mb-1"
                    style={{
                      color: "rgba(160,144,112,0.4)",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {product.brand}
                  </p>
                  <h3
                    className="text-sm sm:text-base mb-1.5"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      color: "#F0EBE0",
                      lineHeight: 1.3,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{
                      color: "#C9A84C",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {product.price}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Browse full menu — minimal */}
        <div className="flex justify-center mt-16 sm:mt-20">
          <Link
            to="/shop"
            className="text-[10px] uppercase tracking-[0.2em] px-10 py-4 transition-all duration-300"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              border: "1px solid rgba(201,168,76,0.3)",
              color: "#C9A84C",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A84C";
              e.currentTarget.style.color = "#0D110E";
              e.currentTarget.style.borderColor = "#C9A84C";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A84C";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)";
            }}
          >
            Browse Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
