import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import logo from "@/assets/hero-logo.png";

const Footer = () => {
  return (
    <footer className="bg-muted text-foreground">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* Top — Logo & tagline centered */}
        <div className="flex flex-col items-center text-center mb-14">
          <img src={logo} alt="Luxury Courier Club" className="h-32 w-32 object-contain mb-4 opacity-90" />
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
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
        </div>

        {/* Legal Disclaimers */}
        <div className="text-[10px] leading-relaxed text-muted-foreground space-y-4 mb-8">
          <p>
            <span className="font-bold text-foreground/80">WARNING:</span> CANCER AND REPRODUCTIVE HARM.{" "}
            <a href="https://www.p65warnings.ca.gov" target="_blank" rel="noopener noreferrer" className="underline">www.p65warnings.ca.gov</a>
          </p>
          <p>
            <span className="font-bold text-foreground/80">Legal Disclaimer:</span> This product contains less than 0.3% Δ9 THC and is compliant with the Industrial Hemp Farming Act Bill H.R. 525/S 359. This product is not available for shipment to the following states: Alaska, Arkansas, California, Colorado, Hawaii, Idaho, Kansas, Louisiana, Michigan, Montana, New Mexico, Oklahoma, Oregon, Puerto Rico, Rhode Island, Texas, Utah, Vermont and Washington. Products with total THC content above 0.3% must not be shipped to these states.
          </p>
          <p>
            <span className="font-bold text-foreground/80">FDA Disclaimer:</span> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease. Must be 21 years or older to purchase from this website. This product is not intended for children, or pregnant or lactating women. Consult with a physician before use if you have a serious medical condition or use prescription medications. A Doctor's advice should be sought before using this and any dietary supplement product. All trademarks and copyrights are property of their respective owners and are not affiliated with nor do they endorse this product. By using this site, you agree to follow the Privacy Policy and all Terms &amp; Conditions printed on this site. Void Where Prohibited by Law. Products on this site contain less than 0.3% Δ9-THC. We do not ship/sell to states where Delta 8 is illegal.
          </p>
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
