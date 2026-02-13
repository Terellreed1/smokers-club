import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
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

interface NavLink {
  label: string;
  to: string;
  submenu?: { label: string; to: string }[];
  external?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Shop", to: "/shop", submenu: shopSubmenu },
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

  const isHomepage = location.pathname === "/";
  const showSolid = scrolled || !isHomepage || mobileOpen;

  const handleMouseEnter = (label: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredMenu(null), 150);
  };

  const handleLogin = () => {
    toast("Coming soon", { description: "Login functionality is on the way." });
  };

  const isActive = (link: NavLink) => {
    if (link.external) return false;
    return location.pathname === link.to || location.pathname.startsWith(link.to + "/");
  };

  const renderLabel = (link: NavLink) => {
    const active = isActive(link);
    return active ? `"${link.label}"` : link.label;
  };

  const linkClasses = (link: NavLink) =>
    cn(
      "flex items-center gap-1 text-xs font-sans uppercase editorial-spacing transition-colors duration-300 hover:text-gold py-6",
      showSolid
        ? isActive(link) ? "text-gold" : "text-muted-foreground"
        : isActive(link) ? "text-gold" : "text-background/80 hover:text-gold"
    );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        showSolid
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Luxury Couriers"
            className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.submenu && handleMouseEnter(link.label)}
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
              ) : (
                <Link to={link.to} className={linkClasses(link)}>
                  {renderLabel(link)}
                  {link.submenu && (
                    <ChevronDown
                      size={12}
                      className={cn(
                        "transition-transform duration-300",
                        hoveredMenu === link.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>
              )}

              {/* Dropdown */}
              {link.submenu && hoveredMenu === link.label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[220px] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-background backdrop-blur-xl border border-border/50 shadow-xl overflow-hidden">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="py-3">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block px-6 py-3 text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all duration-300"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cart */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/cart"
            className={cn(
              "relative p-2 transition-colors duration-300",
              showSolid ? "text-foreground hover:text-gold" : "text-background hover:text-gold"
            )}
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
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
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-primary-foreground text-[10px] font-sans flex items-center justify-center rounded-full">
                {totalItems}
              </span>
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
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.submenu ? (
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
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-300",
                          mobileExpanded === link.label && "rotate-180"
                        )}
                      />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="pl-4 border-l border-gold/20 ml-2 mb-3 animate-fade-in">
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
                      </div>
                    )}
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
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
