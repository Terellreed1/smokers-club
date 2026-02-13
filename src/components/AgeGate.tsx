import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    if (stored === "true") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem("age-verified", "true");
    setVerified(true);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  if (verified === null) return null;
  if (verified) return <>{children}</>;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--foreground)) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase text-foreground mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Luxury Smokers Club
          </motion.p>
          <motion.img
            src={logo}
            alt="Luxury Couriers"
            className="w-48 h-48 mx-auto mb-10 object-contain"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          {!denied ? (
            <>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                Before We Proceed...
              </h1>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-2">
                Are you 21 years of age or older?
              </p>
              <p className="text-xs text-muted-foreground/50 font-sans italic mb-10">
                We'd check your ID but the bouncer's on break.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <motion.button
                  onClick={handleVerify}
                  className="px-10 py-3.5 bg-foreground text-background text-xs font-sans uppercase editorial-spacing hover:bg-foreground/90 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yes, I'm 21+
                </motion.button>
                <motion.button
                  onClick={handleDeny}
                  className="px-10 py-3.5 border border-border text-muted-foreground text-xs font-sans uppercase editorial-spacing hover:border-foreground/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Not Yet
                </motion.button>
              </div>

              <p className="text-[10px] text-muted-foreground/40 font-sans">
                By entering, you confirm you meet the legal age requirement in your jurisdiction.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                No Worries 🫡
              </h1>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-3">
                Come back when you've leveled up. We'll keep the good stuff warm for you.
              </p>
              <p className="text-xs text-muted-foreground/40 font-sans italic mb-8">
                In the meantime, maybe try some herbal tea?
              </p>
              <button
                onClick={() => setDenied(false)}
                className="text-xs text-muted-foreground/40 font-sans underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                Wait, I made a mistake
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeGate;
