import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  "Free Same-Day Delivery · Mon–Sat 8am–9:30pm",
  "Premium Cannabis · East Coast Exclusive",
  "Serving the DMV & Beyond",
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-foreground text-background relative z-[60] overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap py-2.5">
        {[...announcements, ...announcements, ...announcements].map((text, i) => (
          <span key={i} className="text-[11px] font-sans uppercase tracking-[0.15em] px-10 shrink-0 text-background/70">
            <span className="text-gold mx-2">✦</span>
            {text}
          </span>
        ))}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-background/40 hover:text-background transition-colors"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
