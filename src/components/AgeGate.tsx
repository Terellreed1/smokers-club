import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);

  // Birthday input state
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    setVerified(stored === "true");
  }, []);

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

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #1a1510 0%, #0a0908 100%)",
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
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

        {/* Static spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 320px 380px at 50% 40%, rgba(255,245,220,0.15) 0%, rgba(200,170,110,0.05) 40%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-md mx-auto">
          {/* Logo */}
          <div className="relative mx-auto mb-6 sm:mb-8 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]">
            <img
              src={logo}
              alt="Luxury Smokers Club"
              className="w-full h-full object-contain relative z-10"
              style={{
                filter: "drop-shadow(0 0 60px rgba(200,170,110,0.25))",
              }}
            />
          </div>

          <p
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-widest uppercase mb-4 sm:mb-6"
            style={{ color: "rgba(220,200,160,0.9)" }}
          >
            Luxury Smokers Club
          </p>

          {!denied ? (
            <div>
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
                <p className="text-xs mb-3" style={{ color: "rgba(220,120,120,0.9)" }}>
                  {error}
                </p>
              )}

              <button
                ref={submitRef}
                onClick={handleSubmit}
                className="px-12 py-3.5 text-xs font-sans uppercase tracking-[0.2em] transition-all duration-300 mt-4 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(180,155,100,0.9), rgba(140,120,70,0.9))",
                  color: "#0a0908",
                  border: "1px solid rgba(200,170,110,0.3)",
                }}
              >
                Enter
              </button>

              <p className="text-[10px] font-sans mt-8" style={{ color: "rgba(200,190,170,0.25)" }}>
                By entering, you confirm you meet the legal age requirement in your jurisdiction.
              </p>
            </div>
          ) : (
            <div>
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
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeGate;
