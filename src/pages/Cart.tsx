import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const checkoutItems = items.map((item) => ({
        name: item.name,
        price: parseFloat(item.price.replace("$", "")),
        quantity: item.quantity,
      }));

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { items: checkoutItems },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      toast.error("Checkout failed", { description: err.message || "Please try again." });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Your Selection</p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground">Cart</h1>
            </div>
          </ScrollReveal>

          {items.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-20">
                <ShoppingBag size={48} className="mx-auto text-muted-foreground/20 mb-6" />
                <p className="font-serif text-2xl text-muted-foreground mb-6">Your cart is empty</p>
                <Link
                  to="/shop"
                  className="text-xs font-sans uppercase editorial-spacing text-gold hover:text-foreground transition-colors duration-300"
                >
                  Continue Shopping →
                </Link>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.1}>
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center gap-6 border-b border-border/30 pb-6"
                  >
                    {/* Image */}
                    <Link to={`/shop/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-1">
                        {item.brand}
                      </p>
                      <Link to={`/shop/${item.id}`}>
                        <h3 className="font-serif text-lg text-foreground hover:text-gold transition-colors duration-300 truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-sans text-gold mt-1">{item.price}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center border border-border/50">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-sans text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-muted-foreground/40 hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}

                {/* Summary */}
                <div className="pt-8 flex flex-col items-end gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-sans uppercase editorial-spacing text-muted-foreground">
                      Total ({totalItems} items)
                    </span>
                    <span className="font-serif text-3xl text-foreground">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={clearCart}
                      className="text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors duration-300 px-6 py-3 border border-border/50"
                    >
                      Clear Cart
                    </button>
                    <motion.button
                      className="text-xs font-sans uppercase editorial-spacing border border-foreground text-foreground px-10 py-3 hover:bg-foreground hover:text-background transition-all duration-500 flex items-center gap-2 disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut && <Loader2 size={14} className="animate-spin" />}
                      {isCheckingOut ? "Processing..." : "Checkout"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
