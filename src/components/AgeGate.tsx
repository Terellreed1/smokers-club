import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const AgeGate = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("age-verified");
    setVerified(stored === "true");
  }, []);

  const handleYes = () => {
    sessionStorage.setItem("age-verified", "true");
    setVerified(true);
  };

  if (verified === null) return null;
  if (verified) return <>{children}</>;

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
          <div className="w-[92vw] max-w-sm text-center px-4 sm:px-6">
            <img
              src={logo}
              alt="Luxury Courier Club"
              className="mx-auto -mt-8 sm:-mt-16 mb-0 w-52 h-52 sm:w-80 sm:h-80 object-contain"
            />

            <h1
              className="font-serif text-lg sm:text-xl font-semibold uppercase tracking-wide mb-1"
              style={{ color: "#1a1510" }}
            >
              Are you 21 or older?
            </h1>
            <p className="text-xs font-sans mb-8" style={{ color: "#888" }}>
              You must be 21+ to enter this site.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleYes}
                className="w-32 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] rounded-md transition-all duration-200 active:scale-95"
                style={{ background: "#1a1510", color: "#fff" }}
              >
                Yes
              </button>
              <button
                onClick={() => window.location.href = "https://google.com"}
                className="w-32 py-3 text-xs font-sans font-semibold uppercase tracking-[0.15em] rounded-md border transition-all duration-200 active:scale-95"
                style={{ borderColor: "#1a1510", color: "#1a1510" }}
              >
                No
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AgeGate;
