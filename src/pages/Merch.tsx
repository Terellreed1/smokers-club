import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";

import hatImg from "@/assets/merch/hat.png";
import socksImg from "@/assets/merch/socks.png";
import blanketHandsImg from "@/assets/merch/blanket-hands.png";
import teeCreamImg from "@/assets/merch/tee-cream.png";
import teeWhiteImg from "@/assets/merch/tee-white.png";
import teeAngelImg from "@/assets/merch/tee-angel.png";
import blanketLscImg from "@/assets/merch/blanket-lsc.jpg";
import teeWreathImg from "@/assets/merch/tee-wreath.png";
import mugImg from "@/assets/merch/mug.png";

const merchItems = [
  { name: "LSC Trucker Hat", image: hatImg, category: "Headwear" },
  { name: "LSC Logo Socks", image: socksImg, category: "Accessories" },
  { name: "Creation Blanket", image: blanketHandsImg, category: "Home" },
  { name: "Vintage Club Tee", image: teeCreamImg, category: "Apparel" },
  { name: "Classic Logo Tee", image: teeWhiteImg, category: "Apparel" },
  { name: "Higher Standard Tee", image: teeAngelImg, category: "Apparel" },
  { name: "LSC Crest Blanket", image: blanketLscImg, category: "Home" },
  { name: "Wreath Logo Tee", image: teeWreathImg, category: "Apparel" },
  { name: "LSC Coffee Mug", image: mugImg, category: "Accessories" },
];

const Merch = () => {
  return (
    <PageLayout>
      <div className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p
              className="text-xs font-sans uppercase mb-4"
              style={{ letterSpacing: "0.3em", color: "#C9A84C" }}
            >
              Lifestyle
            </p>
            <h1
              className="text-4xl md:text-6xl mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#F0EBE0" }}
            >
              Official Merch
            </h1>
            <div className="mx-auto h-px w-16 mb-8" style={{ background: "#C9A84C" }} />
            <p
              className="text-sm md:text-base font-light max-w-md mx-auto leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(160,144,112,0.7)" }}
            >
              Premium apparel and accessories for the elevated lifestyle.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 mb-16">
            {merchItems.map((item, i) => (
              <motion.div
                key={item.name}
                className="group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <a
                  href="https://www.luxurysmokersclub.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Image container with blending background */}
                  <div
                    className="relative aspect-square overflow-hidden mb-3 sm:mb-4 rounded-sm"
                    style={{
                      background: "radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.06) 40%, rgba(201,168,76,0.02) 70%, transparent 100%)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "contrast(1.02)",
                      }}
                    />
                    {/* Dark overlay for blend */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,13,9,0.3) 100%)",
                      }}
                    />
                  </div>

                  {/* Product info */}
                  <p
                    className="text-[9px] uppercase mb-1"
                    style={{
                      letterSpacing: "0.12em",
                      color: "rgba(160,144,112,0.4)",
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {item.category}
                  </p>
                  <h3
                    className="text-sm sm:text-[15px] group-hover:text-gold transition-colors"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 500,
                      color: "#F0EBE0",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </h3>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Shop button */}
          <div className="text-center">
            <a
              href="https://www.luxurysmokersclub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase px-10 py-3.5 font-sans font-medium transition-all duration-300"
              style={{
                letterSpacing: "0.2em",
                border: "1px solid rgba(201,168,76,0.3)",
                color: "#C9A84C",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A84C";
                e.currentTarget.style.color = "#0A0D09";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C9A84C";
              }}
            >
              Shop Full Collection <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Merch;
