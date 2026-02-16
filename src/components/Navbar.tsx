import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavCartIcon from "@/components/NavCartIcon";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/logo.png";

const shopSubmenu = [
  { label: "All Products", to: "/shop" },
  { label: "Flower", to: "/shop?category=Flower" },
  { label: "Vapes", to: "/shop?category=Vape" },
  { label: "Pre-Rolls", to: "/shop?category=Pre-Roll" },
  { label: "Concentrates", to: "/shop?category=Concentrate" },
  { label: "Edibles", to: "/shop?category=Edible" },
  { label: "Deals", to: "/shop?deals=true" },
];

const aboutSubmenu = [
  { label: "Our Story", to: "/about" },
  { label: "FAQ", to: "/faq" },
];

interface NavLinkType {
  label: string;
  to: string;
  submenu?: { label: string; to: string }[];
  external?: boolean;
  disabled?: boolean;
}

const navLinks: NavLinkType[] = [
  { label: "Shop", to: "/shop", submenu: shopSubmenu, disabled: true },
  { label: "About", to: "/about", submenu: aboutSubmenu },
  { label: "Merch", to: "https://www.luxurycourier.club/", external: true },
  { label: "Delivery", to: "/delivery" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const showSolid = true;

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredMenu(null), 150);
  };

  const isActive = (link: NavLinkType) => {
    if (link.external) return false;
    return location.pathname === link.to || location.pathname.startsWith(link.to + "/");
  };

  const renderLabel = (link: NavLinkType) => {
    const active = isActive(link);
    return active ? `"${link.label}"` : link.label;
  };

  const linkClasses = (link: NavLinkType) =>
    cn(
      "flex items-center gap-1 text-xs font-sans uppercase editorial-spacing transition-colors duration-300 py-6",
      link.disabled
        ? "text-muted-foreground/30 cursor-not-allowed"
        : showSolid
          ? isActive(link) ? "text-gold" : "text-muted-foreground"
          : isActive(link) ? "text-gold" : "text-background/80 hover:text-gold"
    );

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-background border-b border-border/50 shadow-sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <motion.img
            src={logo}
            alt="Luxury Couriers"
            className="h-24 w-24 object-contain"
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              className="relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              onMouseEnter={() => link.submenu && !link.disabled && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              {link.external ? (
                <a
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses(link)}
                >
                  {renderLabel(link)}
                </a>
              ) : link.disabled ? (
                <span className={linkClasses(link)} title="Coming soon">
                  {link.label}
                  {link.submenu && <ChevronDown size={12} className="opacity-30" />}
                </span>
              ) : (
                <Link to={link.to} className={linkClasses(link)}>
                  {renderLabel(link)}
                  {link.submenu && (
                    <motion.span
                      animate={{ rotate: hoveredMenu === link.label ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                  )}
                </Link>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {link.submenu && hoveredMenu === link.label && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[220px]"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-background backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
                      <div className="py-3">
                        {link.submenu.map((sub, j) => (
                          <motion.div
                            key={sub.to}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.04 }}
                          >
                            <Link
                              to={sub.to}
                              className="block px-6 py-3 text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all duration-300"
                            >
                              {sub.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Cart */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Link
              to="/cart"
              className={cn(
                "relative p-2 transition-colors duration-300",
                showSolid ? "text-foreground hover:text-gold" : "text-background hover:text-gold"
              )}
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
          </motion.div>
        </div>

        {/* Mobile Toggle + Cart */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/cart"
            className={cn(
              "relative p-2 transition-colors duration-300",
              showSolid ? "text-foreground" : "text-background"
            )}
            aria-label="Shopping cart"
          >
            <NavCartIcon size={20} />
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "transition-colors duration-300",
              showSolid ? "text-foreground" : "text-background"
            )}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-background border-t border-border/50 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="px-6 py-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.disabled ? (
                    <span className="block text-sm font-sans uppercase editorial-spacing py-3 text-muted-foreground/30 cursor-not-allowed">
                      {link.label}
                    </span>
                  ) : link.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label
                          )
                        }
                        className={cn(
                          "w-full flex items-center justify-between text-sm font-sans uppercase editorial-spacing transition-colors duration-300 py-3",
                          isActive(link) ? "text-gold" : "text-muted-foreground"
                        )}
                      >
                        {renderLabel(link)}
                        <motion.span
                          animate={{ rotate: mobileExpanded === link.label ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={14} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            className="pl-4 border-l border-gold/20 ml-2 mb-3 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-gold transition-colors duration-300"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : link.external ? (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="block text-sm font-sans uppercase editorial-spacing transition-colors duration-300 py-3 text-muted-foreground"
                    >
                      {renderLabel(link)}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block text-sm font-sans uppercase editorial-spacing transition-colors duration-300 py-3",
                        isActive(link) ? "text-gold" : "text-muted-foreground"
                      )}
                    >
                      {renderLabel(link)}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
