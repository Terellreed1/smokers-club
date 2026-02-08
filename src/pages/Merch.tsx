import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const merchItems = [
  { id: 1, name: "Stay High Hoodie", price: "$85", category: "Apparel" },
  { id: 2, name: "Gold Logo Tee", price: "$45", category: "Apparel" },
  { id: 3, name: "Luxury Rolling Tray", price: "$35", category: "Accessories" },
  { id: 4, name: "Stay High Snapback", price: "$40", category: "Headwear" },
  { id: 5, name: "Premium Grinder", price: "$55", category: "Accessories" },
  { id: 6, name: "Members Joggers", price: "$75", category: "Apparel" },
];

const Merch = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Lifestyle</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">Merch</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchItems.map((item) => (
              <div key={item.id} className="group block">
                <div className="aspect-square bg-secondary/80 border border-border/50 mb-4 overflow-hidden relative transition-all duration-500 group-hover:border-gold/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-6xl text-muted-foreground/10 group-hover:text-gold/10 transition-colors duration-500">✦</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-sans uppercase editorial-spacing text-gold bg-background/90 px-3 py-1">{item.category}</span>
                  </div>
                </div>
                <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors duration-300">{item.name}</h3>
                <p className="text-sm font-sans text-gold mt-1">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Merch;
