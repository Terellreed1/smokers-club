import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

// Generate smoke particles
function useSmokeParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 80 + Math.random() * 200,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 4,
        opacity: 0.03 + Math.random() * 0.06,
      })),
    [count]
  );
}

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);
  const [exiting, setExiting] = useState(false);
  const smokeParticles = useSmokeParticles(15);

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    if (stored === "true") {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }, []);

  const handleVerify = () => {
    setExiting(true);
    sessionStorage.setItem("age-verified", "true");
    // Cinematic exit — smoke clears, then reveal
    setTimeout(() => setVerified(true), 1200);
  };

  const handleDeny = () => {
    setDenied(true);
  };

  if (verified === null) return null;
  if (verified) return <>{children}</>;

  return (
    <AnimatePresence>
      {!verified && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Animated smoke background */}
          <div className="absolute inset-0">
            {smokeParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `radial-gradient(circle, hsl(var(--foreground) / ${p.opacity}) 0%, transparent 70%)`,
                }}
                animate={
                  exiting
                    ? {
                        scale: [1, 3],
                        opacity: [p.opacity, 0],
                        y: [0, -200],
                      }
                    : {
                        x: [0, 30, -20, 0],
                        y: [0, -40, 20, 0],
                        scale: [1, 1.3, 0.9, 1],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.5, p.opacity],
                      }
                }
                transition={
                  exiting
                    ? { duration: 1.2, ease: "easeOut" }
                    : {
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              />
            ))}
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)",
            }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 text-center px-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={
              exiting
                ? { opacity: 0, y: -40, filter: "blur(8px)" }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{ duration: exiting ? 0.8 : 1, delay: exiting ? 0 : 0.3 }}
          >
            {/* Logo with glow */}
            <motion.div className="relative mb-12">
              <motion.img
                src={logo}
                alt="Luxury Couriers"
                className="w-28 h-28 mx-auto object-contain relative z-10"
                initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
              />
              {/* Logo glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-foreground/[0.03] rounded-full blur-2xl" />
            </motion.div>

            <AnimatePresence mode="wait">
              {!denied ? (
                <motion.div
                  key="gate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.h1
                    className="font-serif text-3xl md:text-4xl text-foreground mb-3 italic"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    The Ritual Begins
                  </motion.h1>

                  <motion.p
                    className="text-sm text-muted-foreground font-sans leading-relaxed mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    Before we open the vault — are you 21 or older?
                  </motion.p>

                  <motion.p
                    className="text-xs text-muted-foreground/40 font-sans italic mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    We'd check your ID but the bouncer called in sick.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <motion.button
                      onClick={handleVerify}
                      className="px-10 py-3.5 bg-foreground text-background text-xs font-sans uppercase editorial-spacing hover:bg-foreground/90 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      I'm of age — let me in
                    </motion.button>
                    <motion.button
                      onClick={handleDeny}
                      className="px-10 py-3.5 border border-border/50 text-muted-foreground/60 text-xs font-sans uppercase editorial-spacing hover:border-foreground/30 hover:text-muted-foreground transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Not quite
                    </motion.button>
                  </motion.div>

                  <motion.p
                    className="text-[10px] text-muted-foreground/30 font-sans"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                  >
                    By entering you confirm you meet the legal age requirement.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4 italic">
                    Patience, Young One 🫡
                  </h1>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-2">
                    The vault stays sealed for now. Come back when you've leveled up.
                  </p>
                  <p className="text-xs text-muted-foreground/40 font-sans italic mb-8">
                    In the meantime, we hear herbal tea is nice.
                  </p>
                  <button
                    onClick={() => setDenied(false)}
                    className="text-xs text-muted-foreground/40 font-sans underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    Wait — I miscounted my birthdays
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
