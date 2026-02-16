import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const infoItems = [
  { title: "Free Delivery", description: "Same-day throughout the DMV. Order by 7pm." },
  { title: "Store Hours", description: "Mon–Sat 8am–9:30pm · Sun 10am–8pm" },
  { title: "Service Area", description: "DC · Maryland · Virginia · NY · NJ · PA" },
  { title: "Lab Tested", description: "Third-party tested for quality and purity." },
];

const StoreInfo = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-4xl text-foreground text-center mb-4">
          Why Choose Us
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-14 font-sans max-w-lg mx-auto">
          Premium cannabis, delivered with care. Licensed, lab-tested, and trusted by thousands.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 mb-12">
          {infoItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <h3 className="font-serif text-sm sm:text-base text-foreground mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/delivery"
            className="inline-block text-xs font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-0.5"
          >
            View Full Delivery Map →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreInfo;
