import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [denied, setDenied] = useState(false);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    setVerified(stored === "true");
  }, []);

  const handleSubmit = () => {
    if (!month || !day || !year) {
      setError("Please select your full date of birth.");
      return;
    }
    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const md = today.getMonth() - birthDate.getMonth();
    if (md < 0 || (md === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age >= 21) {
      sessionStorage.setItem("age-verified", "true");
      setVerified(true);
    } else {
      setDenied(true);
    }
  };

  if (verified === null) return null;
  if (verified) return <>{children}</>;

  const selectClass =
    "h-11 px-3 text-sm font-sans rounded-md border border-black/15 bg-white text-black/80 outline-none focus:ring-2 focus:ring-black/10 appearance-none cursor-pointer w-full";

  return (
    <>
      {children}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-[90vw] max-w-sm text-center px-6">
            <img
              src={logo}
              alt="Luxury Smokers Club"
              className="mx-auto mt-4 mb-4 w-40 h-40 sm:w-52 sm:h-52 object-contain"
            />

            {!denied ? (
              <>
                <h1
                  className="font-serif text-lg sm:text-xl font-semibold uppercase tracking-wide mb-1"
                  style={{ color: "#1a1510" }}
                >
                  Verify Your Age
                </h1>
                <p className="text-xs font-sans mb-8" style={{ color: "#888" }}>
                  You must be 21 or older to enter.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5 text-left">
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider mb-1.5" style={{ color: "#999" }}>
                      Month
                    </label>
                    <select value={month} onChange={(e) => { setMonth(e.target.value); setError(""); }} className={selectClass}>
                      <option value="">MM</option>
                      {months.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider mb-1.5" style={{ color: "#999" }}>
                      Day
                    </label>
                    <select value={day} onChange={(e) => { setDay(e.target.value); setError(""); }} className={selectClass}>
                      <option value="">DD</option>
                      {days.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans uppercase tracking-wider mb-1.5" style={{ color: "#999" }}>
                      Year
                    </label>
                    <select value={year} onChange={(e) => { setYear(e.target.value); setError(""); }} className={selectClass}>
                      <option value="">YYYY</option>
                      {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                {error && <p className="text-xs mb-3 font-sans" style={{ color: "#c44" }}>{error}</p>}

                <button
                  onClick={handleSubmit}
                  className="w-full max-w-[200px] mx-auto block py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] rounded-md transition-all duration-200 active:scale-95"
                  style={{ background: "#1a1510", color: "#fff" }}
                >
                  Submit
                </button>
              </>
            ) : (
              <>
                <h1 className="font-serif text-xl font-semibold mb-2" style={{ color: "#1a1510" }}>
                  No Worries 🫡
                </h1>
                <p className="text-sm font-sans mb-6" style={{ color: "#888" }}>
                  Come back when you've leveled up.
                </p>
                <button
                  onClick={() => { setDenied(false); setMonth(""); setDay(""); setYear(""); setError(""); }}
                  className="text-xs font-sans underline underline-offset-4"
                  style={{ color: "#999" }}
                >
                  Wait, I made a mistake
                </button>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AgeGate;
