import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top — Logo & tagline centered */}
        <div className="flex flex-col items-center text-center mb-14">
          <img src={logo} alt="Luxury Smokers Club" className="h-16 w-16 object-contain mb-4 opacity-90" />
          <p className="font-serif text-2xl sm:text-3xl text-background/90 mb-2">
            Luxury Smokers Club
          </p>
          <p className="text-sm text-background/40 max-w-md">
            Premium flower delivered to your door. Serving the DMV & East Coast.
          </p>
        </div>

        {/* Links row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
          <Link to="/shop" className="text-sm text-background/50 hover:text-background transition-colors">Shop</Link>
          <Link to="/about" className="text-sm text-background/50 hover:text-background transition-colors">About</Link>
          <Link to="/delivery" className="text-sm text-background/50 hover:text-background transition-colors">Delivery</Link>
          <Link to="/faq" className="text-sm text-background/50 hover:text-background transition-colors">FAQ</Link>
          <a href="https://www.luxurycourier.club/" target="_blank" rel="noopener noreferrer" className="text-sm text-background/50 hover:text-background transition-colors">Merch</a>
          <Link to="/privacy" className="text-sm text-background/50 hover:text-background transition-colors">Privacy</Link>
          <Link to="/terms" className="text-sm text-background/50 hover:text-background transition-colors">Terms</Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-background/10 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Luxury Smokers Club. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/luxurycourierclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/40 hover:text-background transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="mailto:admin@luxurycouriers.club"
              className="text-xs text-background/30 hover:text-background transition-colors"
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
