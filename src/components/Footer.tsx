import { Link } from "react-router-dom";
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Luxury Smokers Club" className="h-10 w-10 object-contain opacity-80" />
              <span className="font-serif text-base font-bold text-background/90">LSC</span>
            </Link>
            <p className="text-sm text-background/50 leading-relaxed mb-4">
              Premium cannabis delivered to your door. Serving the DMV & East Coast.
            </p>
            <a
              href="https://instagram.com/luxurycourierclub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/50 hover:text-primary transition-colors"
            >
              <Instagram size={16} />
              @luxurycourierclub
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold text-background/80 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-background/50 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-background/80 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a href={link.to} target="_blank" rel="noopener noreferrer" className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-background/50 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-background/80 mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-background/50 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-background/10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} Luxury Smokers Club. All rights reserved.
          </p>
          <a
            href="mailto:admin@luxurycouriers.club"
            className="text-xs text-background/30 hover:text-primary transition-colors"
          >
            admin@luxurycouriers.club
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
