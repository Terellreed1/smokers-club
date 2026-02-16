import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Merch", to: "https://www.luxurycourier.club/", external: true },
  { label: "FAQ", to: "/faq" },
  { label: "Delivery", to: "/delivery" },
];

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.footer
      ref={ref}
      className="bg-foreground text-background"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4">
              <motion.img
                src={logo}
                alt="Luxury Couriers"
                className="h-20 w-20 object-contain opacity-80"
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </div>
            <p className="text-sm text-background/60 leading-relaxed font-sans mb-4">
              Street-born. Brand-backed. Premium THC delivered to your door.
            </p>
            <motion.a
              href="mailto:admin@luxurycouriers.club"
              className="text-sm text-gold hover:text-gold/80 transition-colors duration-300 font-sans"
              whileHover={{ x: 3 }}
            >
              admin@luxurycouriers.club
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs uppercase editorial-spacing text-gold mb-6 font-sans">Navigate</h4>
            <ul className="space-y-3">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {item.external ? (
                    <a
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-background/60 hover:text-gold transition-colors duration-300 font-sans"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="text-sm text-background/60 hover:text-gold transition-colors duration-300 font-sans"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs uppercase editorial-spacing text-gold mb-6 font-sans">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-background/60 hover:text-gold transition-colors duration-300 font-sans">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-background/60 hover:text-gold transition-colors duration-300 font-sans">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Hours & Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xs uppercase editorial-spacing text-gold mb-6 font-sans">Hours & Delivery</h4>
            <div className="space-y-2 text-sm text-background/60 font-sans">
              <p>Mon – Sat: 8am – 9:30pm</p>
              <p>Sunday: 10am – 8pm</p>
              <div className="pt-3 border-t border-background/10 mt-3">
                <p>Delivering to DMV</p>
                <Link
                  to="/delivery"
                  className="text-gold hover:text-gold/80 transition-colors duration-300 inline-block mt-1"
                >
                  View Delivery Map →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-xs text-background/40 font-sans">
            © {new Date().getFullYear()} Luxury Couriers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="https://instagram.com/luxurycourierclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/40 hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={18} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
