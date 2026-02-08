import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

const navLinks = [
  { label: "Shop", to: "/shop", submenu: shopSubmenu },
  { label: "About", to: "/about", submenu: aboutSubmenu },
  { label: "Merch", to: "/merch" },
  { label: "Delivery", to: "/delivery" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Track scroll for transparent → solid transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
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
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Luxury Couriers"
            className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={cn(
              "font-serif text-lg tracking-wider transition-colors duration-300",
              showSolid ? "text-gold" : "text-background"
            )}
          >
            LUXURY COURIERS
          </span>
        </Link>

        {/* Desktop Links with Mega Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.to}
              className="relative"
              onMouseEnter={() => link.submenu && handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={link.to}
                className={cn(
                  "flex items-center gap-1 text-xs font-sans uppercase editorial-spacing transition-colors duration-300 hover:text-gold py-6",
                  showSolid
                    ? location.pathname === link.to
                      ? "text-gold"
                      : "text-muted-foreground"
                    : location.pathname === link.to
                      ? "text-gold"
                      : "text-background/80 hover:text-gold"
                )}
              >
                {link.label}
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

              {/* Dropdown */}
              {link.submenu && hoveredMenu === link.label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[220px] animate-fade-in"
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-background/98 backdrop-blur-xl border border-border/50 shadow-lg overflow-hidden">
                    {/* Gold accent line at top */}
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

        {/* Login Button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className={cn(
              "uppercase text-xs editorial-spacing rounded-none px-6 py-2 transition-all duration-300",
              showSolid
                ? "border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                : "border-background/40 text-background hover:bg-background hover:text-foreground"
            )}
          >
            Login
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "md:hidden transition-colors duration-300",
            showSolid ? "text-foreground" : "text-background"
          )}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.to}>
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
                        location.pathname === link.to
                          ? "text-gold"
                          : "text-muted-foreground"
                      )}
                    >
                      {link.label}
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
                ) : (
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-sm font-sans uppercase editorial-spacing transition-colors duration-300 py-3",
                      location.pathname === link.to
                        ? "text-gold"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border/50 mt-2">
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-primary-foreground uppercase text-xs editorial-spacing rounded-none w-fit px-6"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
