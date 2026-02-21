import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LCC";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const getReferralCode = () => {
  const stored = localStorage.getItem("lcc_referral_code");
  if (stored) return stored;
  const code = generateCode();
  localStorage.setItem("lcc_referral_code", code);
  return code;
};

interface ReferralDialogProps {
  open: boolean;
  onClose: () => void;
}

const ReferralDialog = ({ open, onClose }: ReferralDialogProps) => {
  const [code, setCode] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (open) setCode(getReferralCode());
  }, [open]);

  const referralLink = `https://luxurycourier.club/r/${code.toLowerCase()}`;
  const shareMessage = `Join the Luxury Courier Club and get a free 8th on me 🌿 ${referralLink}`;

  const handleCopy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {}
  }, []);

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Luxury Courier Club", text: shareMessage });
      } catch {}
    } else {
      handleCopy(shareMessage, "message");
    }
  }, [shareMessage, handleCopy]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Cinematic backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[420px] bg-background pointer-events-auto rounded-t-3xl sm:rounded-3xl overflow-hidden"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "60%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              {/* Header band */}
              <div className="relative px-8 pt-8 pb-6">
                <motion.button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-lg leading-none">✕</span>
                </motion.button>

                <motion.p
                  className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Referral Program
                </motion.p>
                <motion.h2
                  className="font-serif text-3xl text-foreground leading-tight"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Share the
                  <br />
                  <span className="italic">Club.</span>
                </motion.h2>
                <motion.p
                  className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-[300px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                >
                  Both you and your friend receive waived fees on the next qualifying drop.
                </motion.p>
              </div>

              {/* Divider */}
              <div className="mx-8 h-px bg-border" />

              {/* Code section */}
              <motion.div
                className="px-8 py-5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-3">
                  Your Code
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl tracking-[0.2em] text-foreground">{code}</span>
                  <CopyPill
                    onClick={() => handleCopy(code, "code")}
                    copied={copiedField === "code"}
                  />
                </div>
              </motion.div>

              <div className="mx-8 h-px bg-border" />

              {/* Link section */}
              <motion.div
                className="px-8 py-5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-3">
                  Your Link
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-sans text-muted-foreground truncate">{referralLink}</span>
                  <CopyPill
                    onClick={() => handleCopy(referralLink, "link")}
                    copied={copiedField === "link"}
                  />
                </div>
              </motion.div>

              <div className="mx-8 h-px bg-border" />

              {/* Share section */}
              <motion.div
                className="px-8 pt-5 pb-8"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-3">
                  Quick Share
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 italic">
                  "{shareMessage}"
                </p>
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleNativeShare}
                    className="flex-1 h-12 bg-foreground text-background font-sans text-xs uppercase wide-spacing rounded-full hover:bg-foreground/85 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    Share Now
                  </motion.button>
                  <motion.button
                    onClick={() => handleCopy(shareMessage, "message")}
                    className={cn(
                      "h-12 px-5 border rounded-full font-sans text-xs uppercase wide-spacing transition-all duration-300",
                      copiedField === "message"
                        ? "border-foreground text-foreground bg-foreground/5"
                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    )}
                    whileTap={{ scale: 0.97 }}
                  >
                    {copiedField === "message" ? "Copied" : "Copy"}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* Minimal copy pill */
const CopyPill = ({ onClick, copied }: { onClick: () => void; copied: boolean }) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "shrink-0 h-8 px-4 rounded-full font-sans text-[11px] uppercase editorial-spacing transition-all duration-300 border",
      copied
        ? "border-foreground text-foreground bg-foreground/5"
        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
    )}
    whileTap={{ scale: 0.93 }}
  >
    {copied ? "Copied" : "Copy"}
  </motion.button>
);

export default ReferralDialog;
