import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavCartIcon from "@/components/NavCartIcon";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import logo from "@/assets/hero-logo.png";

const categories = [
  { label: "All Flower", to: "/shop" },
  { label: "Indica", to: "/shop?strain=Indica" },
  { label: "Sativa", to: "/shop?strain=Sativa" },
  { label: "Hybrid", to: "/shop?strain=Hybrid" },
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
  { label: "Wholesale", to: "/wholesale" },
  { label: "Delivery", to: "/delivery" },
  { label: "FAQ", to: "/faq" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Main Nav */}
      <nav
        className={cn(
          "sticky top-0 z-50 bg-background transition-shadow duration-300",
          scrolled && "shadow-md"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Luxury Courier Club" className="h-14 w-14 sm:h-20 sm:w-20 object-contain" />
            <span className="hidden sm:inline font-serif text-lg font-bold text-foreground">
              Luxury Courier Club
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <NavCartIcon size={22} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full"
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
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Category bar — desktop */}
        <div className="hidden lg:block border-t border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 h-11">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden bg-background border-t border-border overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-base font-medium text-muted-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "py-3 text-base font-medium transition-colors",
                        location.pathname === link.to
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="h-px bg-border my-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.to}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-sm text-muted-foreground"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
