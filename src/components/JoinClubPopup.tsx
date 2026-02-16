import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const JoinClubPopup = () => {
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("lsc-popup-dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("lsc-popup-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just close — backend can be added later
    handleClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="relative bg-background w-full max-w-md shadow-2xl rounded-2xl mx-4">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="px-5 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
                {/* Logo */}
                <img
                  src={logo}
                  alt="Luxury Smokers Club"
                  className="h-40 w-40 object-contain mx-auto mb-6"
                />

                {/* Heading */}
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 uppercase tracking-wide">
                  Join the Club
                </h2>

                {/* Subtext */}
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8 uppercase tracking-wide">
                  Sign up to receive 15% off your first order,
                  <br />
                  plus exclusive drops &amp; members-only deals.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 uppercase tracking-wider focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="FIRST NAME (OPTIONAL)"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 uppercase tracking-wider focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/50 uppercase tracking-wider focus:outline-none focus:border-foreground transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-foreground text-background py-3.5 text-xs font-sans uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors"
                  >
                    Continue
                  </button>
                </form>

                <p className="text-[10px] text-muted-foreground/50 font-sans mt-4">
                  By signing up, you agree to receive marketing emails from Luxury Smokers Club.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JoinClubPopup;
