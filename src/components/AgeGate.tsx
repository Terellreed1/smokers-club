import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const SmokeParticle = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: "-10%",
      background: `radial-gradient(circle, hsl(var(--foreground) / 0.06) 0%, transparent 70%)`,
      filter: "blur(30px)",
    }}
    animate={{
      y: [0, -window.innerHeight * 1.3],
      x: [0, Math.sin(delay) * 120, Math.cos(delay) * -80, Math.sin(delay * 2) * 60],
      opacity: [0, 0.8, 0.6, 0],
      scale: [0.5, 1.5, 2.5, 3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const FloatingOrb = ({ index }: { index: number }) => {
  const x = 15 + (index * 23) % 70;
  const y = 10 + (index * 31) % 80;
  const size = 200 + (index * 47) % 300;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, hsl(var(--foreground) / 0.03) 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      animate={{
        x: [0, 40, -30, 20, 0],
        y: [0, -30, 20, -40, 0],
        scale: [1, 1.3, 0.9, 1.1, 1],
        opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
      }}
      transition={{
        duration: 12 + index * 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  const smokeParticles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 1.8,
        x: 10 + Math.random() * 80,
        size: 100 + Math.random() * 200,
        duration: 8 + Math.random() * 6,
      })),
    []
  );

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    setVerified(stored === "true");
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
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Slow drifting gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--foreground) / 0.04) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 80% 60%, hsl(var(--foreground) / 0.06) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(var(--foreground) / 0.04) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 20% 40%, hsl(var(--foreground) / 0.04) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating orbs */}
        {[0, 1, 2, 3].map((i) => (
          <FloatingOrb key={i} index={i} />
        ))}

        {/* Rising smoke particles */}
        {smokeParticles.map((p) => (
          <SmokeParticle key={p.id} delay={p.delay} x={p.x} size={p.size} duration={p.duration} />
        ))}

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Content */}
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
