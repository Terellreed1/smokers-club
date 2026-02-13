import { useState, useEffect, useMemo, useRef } from "react";
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

/** Dust particle floating through spotlight */
const DustParticle = ({ delay, x, y, duration, size }: {
  delay: number; x: number; y: number; duration: number; size: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: "rgba(255,245,220,0.6)",
      boxShadow: "0 0 4px rgba(255,245,220,0.3)",
    }}
    initial={{ opacity: 0, y: 0, x: 0 }}
    animate={{
      opacity: [0, 0.8, 0.6, 0.9, 0],
      y: [-20, -60, -100, -140, -180],
      x: [0, 15, -10, 20, -5],
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
  const [spotlightOn, setSpotlightOn] = useState(false);
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [flickerDone, setFlickerDone] = useState(false);

  // Birthday input state
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  // Unsteady spotlight wobble values
  const [wobble, setWobble] = useState({ x: 0, y: 0 });

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

  // Spotlight turns on after 1s, logo reveals after 1.8s
  useEffect(() => {
    if (verified === false) {
      const t1 = setTimeout(() => setSpotlightOn(true), 1000);
      const t2 = setTimeout(() => setLogoRevealed(true), 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [verified]);

  // Unsteady wobble effect for the spotlight
  useEffect(() => {
    if (!spotlightOn) return;
    let frame: number;
    const wobbleLoop = () => {
      const t = Date.now() / 1000;
      setWobble({
        x: Math.sin(t * 1.3) * 12 + Math.sin(t * 3.7) * 5 + Math.cos(t * 0.7) * 8,
        y: Math.cos(t * 1.1) * 10 + Math.sin(t * 2.9) * 4 + Math.cos(t * 0.5) * 6,
      });
      frame = requestAnimationFrame(wobbleLoop);
    };
    frame = requestAnimationFrame(wobbleLoop);
    return () => cancelAnimationFrame(frame);
  }, [spotlightOn]);

  const handleMonthChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setMonth(clean);
    setError("");
    if (clean.length === 2) dayRef.current?.focus();
  };

  const handleDayChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 2);
    setDay(clean);
    setError("");
    if (clean.length === 2) yearRef.current?.focus();
  };

  const handleYearChange = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 4);
    setYear(clean);
    setError("");
    if (clean.length === 4) submitRef.current?.focus();
  };

  const handleSubmit = () => {
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    if (!m || !d || !y || month.length < 1 || day.length < 1 || year.length !== 4) {
      setError("Please enter a valid date.");
      return;
    }
    if (m < 1 || m > 12 || d < 1 || d > 31) {
      setError("Please enter a valid date.");
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 21) {
      sessionStorage.setItem("age-verified", "true");
      setVerified(true);
    } else {
      setDenied(true);
    }
  };

  if (verified === null) return null;
  if (verified) return <>{children}</>;

  const spotlightX = 50 + wobble.x;
  const spotlightY = 40 + wobble.y;

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
            background: `conic-gradient(from 0deg at 40% 50%, transparent 0deg, rgba(180,155,100,0.4) 60deg, transparent 120deg, rgba(200,170,110,0.3) 200deg, transparent 280deg, rgba(150,130,80,0.2) 340deg, transparent 360deg)`,
            filter: "blur(40px)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />

        {/* Counter-rotating layer */}
        <motion.div
          className="absolute inset-[-30%] pointer-events-none opacity-[0.05]"
          style={{
            background: `conic-gradient(from 180deg at 60% 50%, transparent 0deg, rgba(100,80,50,0.5) 90deg, transparent 180deg, rgba(180,155,100,0.3) 270deg, transparent 360deg)`,
            filter: "blur(60px)",
          }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
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

        {/* SPOTLIGHT EFFECT */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: spotlightOn ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeIn" }}
          style={{
            background: `radial-gradient(ellipse 320px 380px at ${spotlightX}% ${spotlightY}%, rgba(255,245,220,0.18) 0%, rgba(200,170,110,0.06) 40%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Logo with spotlight reveal */}
          <motion.div
            className="relative mx-auto mb-8"
            style={{ width: 280, height: 280 }}
          >
            {/* Spotlight cone hitting the logo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: spotlightOn ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: "easeIn" }}
              style={{
                background: `radial-gradient(circle, rgba(255,245,220,0.15) 0%, rgba(200,170,110,0.08) 50%, transparent 70%)`,
                transform: `translate(${wobble.x * 0.3}px, ${wobble.y * 0.3}px)`,
              }}
            />
            <motion.img
              src={logo}
              alt="Luxury Smokers Club"
              className="w-full h-full object-contain relative z-10"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: logoRevealed ? 1 : 0,
                scale: logoRevealed ? 1 : 0.7,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                filter: spotlightOn
                  ? `drop-shadow(0 0 60px rgba(200,170,110,0.25)) drop-shadow(${wobble.x * 0.2}px ${wobble.y * 0.2}px 30px rgba(255,245,220,0.1))`
                  : "none",
              }}
            />
          </motion.div>

          <motion.p
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase mb-6"
            style={{ color: "rgba(220,200,160,0.9)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: logoRevealed ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Luxury Smokers Club
          </motion.p>

          {!denied ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: logoRevealed ? 1 : 0, y: logoRevealed ? 0 : 15 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h1 className="font-serif text-xl md:text-2xl mb-2" style={{ color: "rgba(240,230,210,0.95)" }}>
                Enter Your Date of Birth
              </h1>
              <p className="text-xs font-sans italic mb-8" style={{ color: "rgba(200,190,170,0.4)" }}>
                We'd check your ID but the bouncer's on break.
              </p>

              {/* Birthday input slots */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className="w-16 h-14 text-center text-lg font-mono rounded-md border bg-transparent outline-none focus:ring-1 transition-all"
                  style={{
                    color: "rgba(240,230,210,0.9)",
                    borderColor: "rgba(200,170,110,0.3)",
                    caretColor: "rgba(200,170,110,0.8)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.3)")}
                />
                <span className="text-xl font-serif" style={{ color: "rgba(200,190,170,0.4)" }}>/</span>
                <input
                  ref={dayRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="DD"
                  value={day}
                  onChange={(e) => handleDayChange(e.target.value)}
                  className="w-16 h-14 text-center text-lg font-mono rounded-md border bg-transparent outline-none focus:ring-1 transition-all"
                  style={{
                    color: "rgba(240,230,210,0.9)",
                    borderColor: "rgba(200,170,110,0.3)",
                    caretColor: "rgba(200,170,110,0.8)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.3)")}
                />
                <span className="text-xl font-serif" style={{ color: "rgba(200,190,170,0.4)" }}>/</span>
                <input
                  ref={yearRef}
                  type="text"
                  inputMode="numeric"
                  placeholder="YYYY"
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="w-20 h-14 text-center text-lg font-mono rounded-md border bg-transparent outline-none focus:ring-1 transition-all"
                  style={{
                    color: "rgba(240,230,210,0.9)",
                    borderColor: "rgba(200,170,110,0.3)",
                    caretColor: "rgba(200,170,110,0.8)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.6)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(200,170,110,0.3)")}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                />
              </div>

              {error && (
                <motion.p
                  className="text-xs mb-3"
                  style={{ color: "rgba(220,120,120,0.9)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                ref={submitRef}
                onClick={handleSubmit}
                className="px-12 py-3.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 mt-4"
                style={{
                  background: "linear-gradient(135deg, rgba(180,155,100,0.9), rgba(140,120,70,0.9))",
                  color: "#0a0908",
                  border: "1px solid rgba(200,170,110,0.3)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(180,155,100,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Enter
              </motion.button>

              <p className="text-[10px] font-sans mt-8" style={{ color: "rgba(200,190,170,0.25)" }}>
                By entering, you confirm you meet the legal age requirement in your jurisdiction.
              </p>
            </motion.div>
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
                onClick={() => { setDenied(false); setMonth(""); setDay(""); setYear(""); setError(""); }}
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
