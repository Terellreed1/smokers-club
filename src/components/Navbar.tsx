import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Merch", to: "/merch" },
  { label: "FAQ", to: "/faq" },
  { label: "Delivery", to: "/delivery" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="font-serif text-2xl tracking-wider text-gold">
          STAY HIGH
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-xs font-sans uppercase editorial-spacing transition-colors duration-300 hover:text-gold",
                location.pathname === link.to ? "text-gold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-primary-foreground uppercase text-xs editorial-spacing rounded-none px-6 py-2 transition-all duration-300"
          >
            Login
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-fade-in">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-sans uppercase editorial-spacing transition-colors duration-300",
                  location.pathname === link.to ? "text-gold" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-primary-foreground uppercase text-xs editorial-spacing rounded-none w-fit px-6"
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
