import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

const JoinClubPopup = () => {
  const [open, setOpen] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Capture ref param from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("lcc_referral_ref", ref.toUpperCase());
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      const refCode = localStorage.getItem("lcc_referral_ref");
      
      if (refCode) {
        // Look up the referral code
        const { data: codeRow } = await supabase
          .from("referral_codes")
          .select("id")
          .eq("code", refCode)
          .single();

        if (codeRow) {
          // Record the signup
          await supabase.from("referral_signups").insert({
            referral_code_id: codeRow.id,
            referred_name: firstName || null,
            referred_email: email,
          });

          // Increment the counter
          await supabase.rpc("increment_referral_count" as never, { code_id: codeRow.id } as never);
        }
        
        localStorage.removeItem("lcc_referral_ref");
      }

      setSuccess(true);
      setTimeout(handleClose, 1500);
    } catch {
      // Still close on error
      handleClose();
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
          >
            <div className="relative bg-background w-full max-w-md shadow-2xl rounded-2xl mx-4">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <div className="px-5 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
                <img src={logo} alt="Luxury Courier Club" className="h-40 w-40 object-contain mx-auto mb-6" />
                <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-4 uppercase tracking-wide">
                  Join the Club
                </h2>
                <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8 uppercase tracking-wide">
                  Sign up to receive 15% off your first order,
                  <br />
                  plus exclusive drops &amp; members-only deals.
                </p>

                {success ? (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-foreground font-serif text-lg py-8"
                  >
                    Welcome to the Club ✓
                  </motion.p>
                ) : (
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
                      disabled={submitting}
                      className="w-full bg-foreground text-background py-3.5 text-xs font-sans uppercase tracking-[0.2em] hover:bg-foreground/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Joining…" : "Continue"}
                    </button>
                  </form>
                )}

                <p className="text-[10px] text-muted-foreground/50 font-sans mt-4">
                  By signing up, you agree to receive marketing emails from Luxury Courier Club.
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
