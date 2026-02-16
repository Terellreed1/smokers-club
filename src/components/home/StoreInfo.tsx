import { Link } from "react-router-dom";
import { Clock, MapPin, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";

const infoCards = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Same-day delivery throughout the DMV area. Order by 7pm for same-day service.",
  },
  {
    icon: Clock,
    title: "Store Hours",
    description: "Mon–Sat: 8am – 9:30pm\nSunday: 10am – 8pm",
  },
  {
    icon: MapPin,
    title: "Service Area",
    description: "DC · Maryland · Virginia. Shipping available to NY, NJ & PA.",
  },
  {
    icon: Shield,
    title: "Lab Tested",
    description: "Every product is third-party lab tested for quality and purity.",
  },
];

const StoreInfo = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-2xl md:text-4xl text-foreground text-center mb-4">
          Why Choose Us
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-12 font-sans max-w-lg mx-auto">
          Premium cannabis, delivered with care. Licensed, lab-tested, and trusted by thousands.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="text-center p-6 sm:p-8 border border-border/50 bg-background"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <card.icon className="w-6 h-6 mx-auto mb-4 text-primary" strokeWidth={1.5} />
              <h3 className="font-serif text-sm sm:text-base text-foreground mb-2">{card.title}</h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed whitespace-pre-line">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/delivery"
            className="inline-block text-xs font-sans uppercase tracking-[0.15em] text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5"
          >
            View Full Delivery Map →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreInfo;
