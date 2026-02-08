import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Luxury Couriers" className="h-10 w-10 object-contain opacity-80" />
              <h3 className="font-serif text-xl tracking-wider text-gold">LUXURY COURIERS</h3>
            </div>
            <p className="text-sm text-background/60 leading-relaxed font-sans">
              Street-born. Brand-backed. Premium THC delivered to your door.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase editorial-spacing text-gold mb-6 font-sans">Navigate</h4>
            <ul className="space-y-3">
              {["Shop", "About", "Merch", "FAQ", "Delivery"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase()}`}
                    className="text-sm text-background/60 hover:text-gold transition-colors duration-300 font-sans"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
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
          </div>

          {/* Hours & Delivery */}
          <div>
            <h4 className="text-xs uppercase editorial-spacing text-gold mb-6 font-sans">Hours & Delivery</h4>
            <div className="space-y-2 text-sm text-background/60 font-sans">
              <p>Mon – Sat: 10am – 9pm</p>
              <p>Sunday: 11am – 7pm</p>
              <div className="pt-3 border-t border-background/10 mt-3">
                <p>Delivering to MD, DC & VA</p>
                <Link
                  to="/delivery"
                  className="text-gold hover:text-gold/80 transition-colors duration-300 inline-block mt-1"
                >
                  View Delivery Map →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-background/40 font-sans">
            © {new Date().getFullYear()} Luxury Couriers. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/40 hover:text-gold transition-colors duration-300" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" className="text-background/40 hover:text-gold transition-colors duration-300" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-background/40 hover:text-gold transition-colors duration-300" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
