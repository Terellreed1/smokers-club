import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Instagram } from "lucide-react";
import { useRef } from "react";
import logo from "@/assets/logo.png";

const links = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Merch", to: "https://www.luxurycourier.club/", external: true },
  { label: "FAQ", to: "/faq" },
  { label: "Delivery", to: "/delivery" },
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
];

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.footer
      ref={ref}
      className="bg-foreground text-background"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14 sm:py-20">
        {/* Top: Logo + Nav inline */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
          <Link to="/" className="flex-shrink-0">
            <motion.img
              src={logo}
              alt="Luxury Couriers"
              className="h-14 w-14 object-contain opacity-80"
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </Link>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans uppercase tracking-[0.15em] text-background/50 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="text-xs font-sans uppercase tracking-[0.15em] text-background/50 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <p className="text-xs text-background/30 font-sans">
              © {new Date().getFullYear()} Luxury Smokers Club
            </p>
            <a
              href="mailto:admin@luxurycouriers.club"
              className="text-xs text-background/40 hover:text-gold transition-colors duration-300 font-sans"
            >
              admin@luxurycouriers.club
            </a>
          </div>

          <motion.a
            href="https://instagram.com/luxurycourierclub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/40 hover:text-gold transition-colors duration-300"
            aria-label="Instagram"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={16} />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
