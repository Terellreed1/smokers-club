import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

/** Slow-moving resin blob */
const ResinBlob = ({ color, x, y, size, duration, delay }: {
  color: string; x: number; y: number; size: number; duration: number; delay: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: color,
      filter: `blur(${size * 0.4}px)`,
      mixBlendMode: "screen",
    }}
    animate={{
      x: [0, 80, -60, 40, -30, 0],
      y: [0, -50, 70, -80, 30, 0],
      scale: [1, 1.4, 0.8, 1.3, 0.9, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  const blobs = useMemo(() => [
    { color: "radial-gradient(circle, rgba(180,155,100,0.35) 0%, transparent 70%)", x: 15, y: 20, size: 400, duration: 18, delay: 0 },
    { color: "radial-gradient(circle, rgba(60,50,40,0.5) 0%, transparent 70%)", x: 60, y: 50, size: 500, duration: 22, delay: 2 },
    { color: "radial-gradient(circle, rgba(200,170,110,0.25) 0%, transparent 70%)", x: 75, y: 15, size: 350, duration: 16, delay: 1 },
    { color: "radial-gradient(circle, rgba(30,25,20,0.6) 0%, transparent 70%)", x: 30, y: 70, size: 450, duration: 20, delay: 3 },
    { color: "radial-gradient(circle, rgba(150,130,80,0.2) 0%, transparent 70%)", x: 50, y: 35, size: 300, duration: 24, delay: 4 },
    { color: "radial-gradient(circle, rgba(100,80,50,0.3) 0%, transparent 70%)", x: 10, y: 55, size: 380, duration: 19, delay: 1.5 },
  ], []);

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
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: "#0a0908" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Deep base layer */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, #1a1510 0%, #0a0908 100%)",
          }}
        />

        {/* Epoxy resin blobs */}
        {blobs.map((b, i) => (
          <ResinBlob key={i} {...b} />
        ))}

        {/* Slow rotating marbled veins */}
        <motion.div
          className="absolute inset-[-50%] pointer-events-none opacity-[0.08]"
          style={{
            background: `
              conic-gradient(from 0deg at 40% 50%, transparent 0deg, rgba(180,155,100,0.4) 60deg, transparent 120deg, rgba(200,170,110,0.3) 200deg, transparent 280deg, rgba(150,130,80,0.2) 340deg, transparent 360deg)
            `,
            filter: "blur(40px)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />

        {/* Second counter-rotating layer */}
        <motion.div
          className="absolute inset-[-30%] pointer-events-none opacity-[0.05]"
          style={{
            background: `
              conic-gradient(from 180deg at 60% 50%, transparent 0deg, rgba(100,80,50,0.5) 90deg, transparent 180deg, rgba(180,155,100,0.3) 270deg, transparent 360deg)
            `,
            filter: "blur(60px)",
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />

        {/* Subtle golden shimmer streaks */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            background: `
              linear-gradient(135deg, transparent 30%, rgba(200,170,110,0.6) 50%, transparent 70%)
            `,
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase mb-4"
            style={{ color: "rgba(220,200,160,0.9)" }}
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
            style={{ filter: "drop-shadow(0 0 40px rgba(180,155,100,0.15))" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          {!denied ? (
            <>
              <h1 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: "rgba(240,230,210,0.95)" }}>
                Before We Proceed...
              </h1>
              <p className="text-sm font-sans leading-relaxed mb-2" style={{ color: "rgba(200,190,170,0.7)" }}>
                Are you 21 years of age or older?
              </p>
              <p className="text-xs font-sans italic mb-10" style={{ color: "rgba(200,190,170,0.4)" }}>
                We'd check your ID but the bouncer's on break.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                <motion.button
                  onClick={handleVerify}
                  className="px-10 py-3.5 text-xs font-sans uppercase editorial-spacing transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(180,155,100,0.9), rgba(140,120,70,0.9))",
                    color: "#0a0908",
                    border: "1px solid rgba(200,170,110,0.3)",
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(180,155,100,0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Yes, I'm 21+
                </motion.button>
                <motion.button
                  onClick={handleDeny}
                  className="px-10 py-3.5 text-xs font-sans uppercase editorial-spacing transition-all duration-300"
                  style={{
                    border: "1px solid rgba(200,190,170,0.2)",
                    color: "rgba(200,190,170,0.6)",
                    background: "transparent",
                  }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(200,190,170,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Not Yet
                </motion.button>
              </div>

              <p className="text-[10px] font-sans" style={{ color: "rgba(200,190,170,0.25)" }}>
                By entering, you confirm you meet the legal age requirement in your jurisdiction.
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: "rgba(240,230,210,0.95)" }}>
                No Worries 🫡
              </h1>
              <p className="text-sm font-sans leading-relaxed mb-3" style={{ color: "rgba(200,190,170,0.7)" }}>
                Come back when you've leveled up. We'll keep the good stuff warm for you.
              </p>
              <p className="text-xs font-sans italic mb-8" style={{ color: "rgba(200,190,170,0.4)" }}>
                In the meantime, maybe try some herbal tea?
              </p>
              <button
                onClick={() => setDenied(false)}
                className="text-xs font-sans underline underline-offset-4 transition-colors"
                style={{ color: "rgba(200,190,170,0.35)" }}
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
