import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavCartIcon from "@/components/NavCartIcon";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const categories = [
  { label: "Flower", to: "/shop?category=Flower" },
  { label: "Vapes", to: "/shop?category=Vape" },
  { label: "Pre-Rolls", to: "/shop?category=Pre-Roll" },
  { label: "Concentrates", to: "/shop?category=Concentrate" },
  { label: "Edibles", to: "/shop?category=Edible" },
];

interface NavLinkType {
  label: string;
  to: string;
  external?: boolean;
}

const navLinks: NavLinkType[] = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Merch", to: "https://www.luxurycourier.club/", external: true },
  { label: "Delivery", to: "/delivery" },
  { label: "FAQ", to: "/faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const showSolid = scrolled || !isHomepage;

  return (
    <motion.nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        showSolid
          ? "bg-background/95 backdrop-blur-md border-b border-border/30"
          : "bg-transparent border-b border-transparent"
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <motion.img
            src={logo}
            alt="Luxury Smokers Club"
            className="h-14 w-14 object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-sans uppercase tracking-[0.2em] text-foreground/70 hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "text-[13px] font-sans uppercase tracking-[0.2em] transition-colors duration-300",
                  location.pathname === link.to
                    ? "text-gold"
                    : "text-foreground/70 hover:text-gold"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/cart"
            className="relative p-2 text-foreground/70 hover:text-gold transition-colors duration-300"
            aria-label="Shopping cart"
          >
            <NavCartIcon size={20} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Category bar — desktop, shown below main nav on scroll */}
      {showSolid && (
        <div className="hidden lg:block border-t border-border/20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-8 h-10">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="text-[11px] font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden bg-background border-t border-border/30 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-sans uppercase editorial-spacing text-muted-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "py-3 text-sm font-sans uppercase editorial-spacing transition-colors duration-300",
                      location.pathname === link.to ? "text-gold" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="h-px bg-border/30 my-2" />
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-gold/60 mb-1">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 text-xs font-sans uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
