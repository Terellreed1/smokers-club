import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/hero-logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top — Logo & tagline centered */}
        <div className="flex flex-col items-center text-center mb-14">
          <img src={logo} alt="Luxury Smokers Club" className="h-16 w-16 object-contain mb-4 opacity-90" />
          <p className="font-serif text-2xl sm:text-3xl text-foreground/90 mb-2">
            Luxury Courier Club
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            Premium flower delivered to your door.
          </p>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Shop</Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/delivery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Delivery</Link>
          <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          <a href="https://www.luxurycourier.club/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Merch</a>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Luxury Courier Club. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/luxurycourierclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:admin@luxurycouriers.club"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              admin@luxurycouriers.club
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
