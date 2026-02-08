import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Premium Flower", brand: "Cookies", type: "Indica", price: "$55" },
  { id: 2, name: "Live Resin Cart", brand: "Raw Garden", type: "Hybrid", price: "$45" },
  { id: 3, name: "Diamond Infused Pre-Roll", brand: "Jeeter", type: "Sativa", price: "$25" },
  { id: 4, name: "Rosin Concentrate", brand: "710 Labs", type: "Hybrid", price: "$75" },
];

const ProductsPreview = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
              The Collection
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:block text-xs font-sans uppercase editorial-spacing text-gold hover:text-foreground transition-colors duration-300 border-b border-gold/30 pb-1"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="group block"
            >
              <div className="aspect-[3/4] bg-secondary/80 border border-border/50 mb-4 overflow-hidden relative transition-all duration-500 group-hover:border-gold/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-6xl text-muted-foreground/10 group-hover:text-gold/10 transition-colors duration-500">
                    ✦
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-sans uppercase editorial-spacing text-gold bg-background/90 px-3 py-1">
                    {product.type}
                  </span>
                </div>
              </div>
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">
                {product.brand}
              </p>
              <h3 className="font-serif text-lg text-foreground group-hover:text-gold transition-colors duration-300">
                {product.name}
              </h3>
              <p className="text-sm font-sans text-gold mt-1">{product.price}</p>
            </Link>
          ))}
        </div>

        <div className="md:hidden text-center mt-10">
          <Link
            to="/shop"
            className="text-xs font-sans uppercase editorial-spacing text-gold border-b border-gold/30 pb-1"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsPreview;
