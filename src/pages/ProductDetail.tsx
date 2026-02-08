import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { ArrowLeft } from "lucide-react";

const products: Record<string, { name: string; brand: string; type: string; price: string; description: string }> = {
  "1": { name: "Premium Flower", brand: "Cookies", type: "Indica", price: "$55", description: "Hand-selected, top-shelf indoor flower with a rich terpene profile. Dense nugs with a smooth, relaxing finish." },
  "2": { name: "Live Resin Cart", brand: "Raw Garden", type: "Hybrid", price: "$45", description: "Clean, refined live resin extracted from fresh-frozen cannabis. Full-spectrum flavor with balanced effects." },
  "3": { name: "Diamond Infused Pre-Roll", brand: "Jeeter", type: "Sativa", price: "$25", description: "Premium pre-roll infused with liquid diamonds for an elevated experience. Uplifting and creative." },
  "4": { name: "Rosin Concentrate", brand: "710 Labs", type: "Hybrid", price: "$75", description: "Solventless, craft-grade rosin pressed from ice water hash. Pure, potent, and full of flavor." },
  "5": { name: "THC Gummies", brand: "STIIIZY", type: "Indica", price: "$30", description: "Precisely dosed gummies crafted for a consistent, relaxing experience. Available in assorted flavors." },
  "6": { name: "Live Rosin Cart", brand: "Connected", type: "Sativa", price: "$50", description: "Solventless live rosin in a convenient cartridge. Clean, flavorful, and uplifting." },
  "7": { name: "Indoor Flower", brand: "Alien Labs", type: "Hybrid", price: "$65", description: "Small-batch indoor cultivation with exotic genetics. Visually stunning with complex terpene profiles." },
  "8": { name: "Infused Blunt", brand: "Heavy Hitters", type: "Indica", price: "$20", description: "Slow-burning blunt infused with premium concentrate. Perfect for sharing or a solo session." },
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = id ? products[id] : null;

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

  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-sans uppercase editorial-spacing text-gold mb-12 hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <div className="aspect-[3/4] bg-secondary/80 border border-border/50 flex items-center justify-center">
              <span className="font-serif text-8xl text-muted-foreground/10">✦</span>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-2">{product.brand}</p>
              <h1 className="font-serif text-3xl md:text-5xl text-foreground mb-2">{product.name}</h1>
              <span className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-6">{product.type}</span>
              <p className="font-serif text-3xl text-gold mb-8">{product.price}</p>
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-12">
                {product.description}
              </p>

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
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
