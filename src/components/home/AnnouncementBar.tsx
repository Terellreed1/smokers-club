import { useState } from "react";
import { X } from "lucide-react";

const announcements = [
  "Free Same-Day Delivery · Mon–Sat 8am–9:30pm",
  "Save on premium flower — Shop Now",
  "Serving the DMV & East Coast",
];

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-primary text-primary-foreground relative z-[60] overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap py-2.5">
        {[...announcements, ...announcements, ...announcements].map((text, i) => (
          <span key={i} className="text-xs sm:text-sm font-medium px-8 shrink-0">
            {text}
          </span>
        ))}
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
