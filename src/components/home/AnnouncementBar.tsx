import { useState } from "react";
import { X } from "lucide-react";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-foreground text-background text-center py-2.5 px-4 relative z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <p className="text-xs sm:text-sm font-sans tracking-wide">
          <span className="text-gold font-medium">Free Same-Day Delivery</span>
          <span className="mx-2 text-background/30">|</span>
          Serving the DMV &amp; East Coast
          <span className="mx-2 text-background/30">|</span>
          <span className="text-gold font-medium">Mon–Sat 8am–9:30pm</span>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-background/40 hover:text-background transition-colors"
          aria-label="Close announcement"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
