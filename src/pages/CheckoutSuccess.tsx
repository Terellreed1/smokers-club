import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useCart } from "@/contexts/CartContext";

const CheckoutSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <PageLayout>
      <div className="py-24 px-6 min-h-[60vh] flex items-center justify-center">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CheckCircle size={48} className="mx-auto text-gold mb-6" />
          <h1 className="font-serif text-4xl text-foreground mb-4">Order Confirmed</h1>
          <p className="text-sm font-sans text-muted-foreground mb-8">
            Thank you for your purchase. Your premium selection is on its way.
          </p>
          <Link
            to="/shop"
            className="text-xs font-sans uppercase editorial-spacing text-gold hover:text-foreground transition-colors duration-300"
          >
            Continue Shopping →
          </Link>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default CheckoutSuccess;
