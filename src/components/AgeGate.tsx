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

  const selectClass =
    "h-12 px-3 text-sm font-mono rounded border bg-white text-[#1a1510] outline-none focus:ring-2 focus:ring-[#c8aa6e]/50 appearance-none cursor-pointer";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative w-[90vw] max-w-md rounded-xl p-8 sm:p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #f5e6c8 0%, #f0daa0 50%, #e8d48b 100%)",
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <img
            src={logo}
            alt="Luxury Smokers Club"
            className="mx-auto mb-4 w-24 h-24 sm:w-32 sm:h-32 object-contain"
          />

          {!denied ? (
            <>
              <h1
                className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider mb-2"
                style={{ color: "#1a1510" }}
              >
                Please Verify You're Over 21.
              </h1>
              <p className="text-sm mb-6 font-sans" style={{ color: "#3a3020" }}>
                Enter Your Date Of Birth Below.
              </p>

              {/* Dropdowns */}
              <div className="grid grid-cols-3 gap-3 mb-4 text-left">
                <div>
                  <label className="block text-xs font-sans font-bold uppercase mb-1" style={{ color: "#3a3020" }}>
                    Month
                  </label>
                  <select
                    value={month}
                    onChange={(e) => { setMonth(e.target.value); setError(""); }}
                    className={selectClass + " w-full"}
                  >
                    <option value="">MM</option>
                    {months.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold uppercase mb-1" style={{ color: "#3a3020" }}>
                    Day
                  </label>
                  <select
                    value={day}
                    onChange={(e) => { setDay(e.target.value); setError(""); }}
                    className={selectClass + " w-full"}
                  >
                    <option value="">DD</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-sans font-bold uppercase mb-1" style={{ color: "#3a3020" }}>
                    Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => { setYear(e.target.value); setError(""); }}
                    className={selectClass + " w-full"}
                  >
                    <option value="">YYYY</option>
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <p className="text-xs mb-3 text-red-700 font-sans">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                className="w-full max-w-[220px] mx-auto block py-3 text-sm font-sans font-bold uppercase tracking-widest rounded transition-all duration-200 active:scale-95"
                style={{
                  background: "#1a1510",
                  color: "#f5e6c8",
                }}
              >
                Submit
              </button>
            </>
          ) : (
            <>
              <h1 className="font-serif text-xl font-bold mb-2" style={{ color: "#1a1510" }}>
                No Worries 🫡
              </h1>
              <p className="text-sm font-sans mb-6" style={{ color: "#3a3020" }}>
                Come back when you've leveled up.
              </p>
              <button
                onClick={() => { setDenied(false); setMonth(""); setDay(""); setYear(""); setError(""); }}
                className="text-xs font-sans underline underline-offset-4"
                style={{ color: "#3a3020" }}
              >
                Wait, I made a mistake
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AgeGate;
