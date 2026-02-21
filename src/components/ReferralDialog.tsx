import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const generateCode = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LCC";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
};

const getOrCreateReferralCode = async (): Promise<string> => {
  const stored = localStorage.getItem("lcc_referral_code");
  if (stored) return stored;

  const code = generateCode();
  // Save to DB
  await supabase.from("referral_codes").insert({ code });
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
    if (open) {
      getOrCreateReferralCode().then(setCode);
    }
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
          <motion.div
            className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[340px] bg-background pointer-events-auto rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative px-5 pt-5 pb-4">
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm leading-none">✕</span>
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
                  className="font-serif text-xl text-foreground leading-tight"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Share the<br /><span className="italic">Club.</span>
                </motion.h2>
                <motion.p
                  className="text-xs text-muted-foreground mt-2 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                >
                  Both you and your friend receive waived fees on the next qualifying drop.
                </motion.p>
              </div>

              <div className="mx-5 h-px bg-border" />

              <motion.div className="px-5 py-3.5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-2">Your Code</p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg tracking-[0.2em] text-foreground">{code}</span>
                  <CopyPill onClick={() => handleCopy(code, "code")} copied={copiedField === "code"} />
                </div>
              </motion.div>

              <div className="mx-5 h-px bg-border" />

              <motion.div className="px-5 py-3.5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-2">Your Link</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-sans text-muted-foreground truncate">{referralLink}</span>
                  <CopyPill onClick={() => handleCopy(referralLink, "link")} copied={copiedField === "link"} />
                </div>
              </motion.div>

              <div className="mx-5 h-px bg-border" />

              <motion.div className="px-5 pt-3.5 pb-5" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <p className="text-[10px] font-sans uppercase wide-spacing text-muted-foreground mb-2">Quick Share</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 italic line-clamp-2">"{shareMessage}"</p>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleNativeShare}
                    className="flex-1 h-9 bg-foreground text-background font-sans text-[10px] uppercase wide-spacing rounded-full hover:bg-foreground/85 transition-colors"
                    whileTap={{ scale: 0.97 }}
                  >
                    Share Now
                  </motion.button>
                  <motion.button
                    onClick={() => handleCopy(shareMessage, "message")}
                    className={cn(
                      "h-9 px-4 border rounded-full font-sans text-[10px] uppercase wide-spacing transition-all duration-300",
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
