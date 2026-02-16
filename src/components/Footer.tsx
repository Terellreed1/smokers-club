import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const shopLinks = [
  { label: "All Products", to: "/shop" },
  { label: "Flower", to: "/shop?category=Flower" },
  { label: "Vapes", to: "/shop?category=Vape" },
  { label: "Pre-Rolls", to: "/shop?category=Pre-Roll" },
  { label: "Edibles", to: "/shop?category=Edible" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Delivery", to: "/delivery" },
  { label: "FAQ", to: "/faq" },
  { label: "Merch", to: "https://www.luxurycourier.club/", external: true },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <img src={logo} alt="Luxury Smokers Club" className="h-12 w-12 object-contain opacity-80" />
            </Link>
            <p className="text-sm text-background/40 leading-relaxed font-sans mb-5">
              Premium cannabis delivered to your door. Serving the DMV & East Coast.
            </p>
            <a
              href="https://instagram.com/luxurycourierclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-background/40 hover:text-gold transition-colors duration-300"
            >
              <Instagram size={16} />
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold/70 mb-5">Shop</h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-background/40 hover:text-gold transition-colors duration-300 font-sans">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold/70 mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-sm text-background/40 hover:text-gold transition-colors duration-300 font-sans">
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-background/40 hover:text-gold transition-colors duration-300 font-sans">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold/70 mb-5">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-background/40 hover:text-gold transition-colors duration-300 font-sans">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-background/10 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/30 font-sans">
            © {new Date().getFullYear()} Luxury Smokers Club. All rights reserved.
          </p>
          <a
            href="mailto:admin@luxurycouriers.club"
            className="text-xs text-background/30 hover:text-gold transition-colors duration-300 font-sans"
          >
            admin@luxurycouriers.club
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
