import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Share2, Link2, Check, Gift } from "lucide-react";
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
      setTimeout(() => setCopiedField(null), 2000);
    } catch {}
  }, []);

  const handleShare = useCallback(async () => {
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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-background border border-border/40 rounded-3xl p-8 pointer-events-auto shadow-2xl"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                    <Gift size={18} className="text-background" />
                  </div>
                  <h2 className="font-serif text-2xl text-foreground">Share & Earn</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Invite a friend — you both get waived fees on your next qualifying drop.
                </p>
              </motion.div>

              {/* Referral Code */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="mb-5"
              >
                <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  Your Referral Code
                </label>
                <div className="border border-border/50 rounded-2xl p-4 flex flex-col items-center gap-2 bg-muted/20">
                  <span className="font-mono text-2xl font-bold tracking-[0.15em] text-foreground">{code}</span>
                  <CopyButton
                    onClick={() => handleCopy(code, "code")}
                    copied={copiedField === "code"}
                    label="Copy code"
                  />
                </div>
              </motion.div>

              {/* Shareable Link */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-5"
              >
                <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  Shareable Link
                </label>
                <div className="border border-border/50 rounded-2xl p-4 flex flex-col items-center gap-2 bg-muted/20">
                  <div className="flex items-center gap-2 text-sm text-foreground/80">
                    <Link2 size={14} className="text-muted-foreground shrink-0" />
                    <span className="font-mono text-xs truncate max-w-[260px]">{referralLink}</span>
                  </div>
                  <CopyButton
                    onClick={() => handleCopy(referralLink, "link")}
                    copied={copiedField === "link"}
                    label="Copy link"
                  />
                </div>
              </motion.div>

              {/* Share Message */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="mb-6"
              >
                <label className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  Share Referral
                </label>
                <div className="border border-border/50 rounded-2xl p-4 bg-muted/20">
                  <p className="text-xs font-semibold text-foreground mb-1">Message to send</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{shareMessage}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-foreground/85 transition-colors"
                    >
                      <Share2 size={13} />
                      Share
                    </button>
                    <CopyButton
                      onClick={() => handleCopy(shareMessage, "message")}
                      copied={copiedField === "message"}
                      label="Copy"
                      inline
                    />
                  </div>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[11px] text-center text-muted-foreground"
              >
                Copy the code or link and send it to someone you trust.
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* Small copy button */
const CopyButton = ({
  onClick,
  copied,
  label,
  inline,
}: {
  onClick: () => void;
  copied: boolean;
  label: string;
  inline?: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
      inline && "px-3 py-2 border border-border/50 rounded-full"
    )}
  >
    <AnimatePresence mode="wait">
      {copied ? (
        <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5 text-foreground">
          <Check size={13} /> Copied!
        </motion.span>
      ) : (
        <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
          <Copy size={13} /> {label}
        </motion.span>
      )}
    </AnimatePresence>
  </button>
);

export default ReferralDialog;
