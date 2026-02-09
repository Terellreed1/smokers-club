import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Simulates someone typing while high — messing up twice, nailing it on the 3rd try
const attempts = [
  '"stayyy hihg, my freind"',   // attempt 1 — sloppy
  '"stay hgih, my frend"',      // attempt 2 — still off
  '"stay high, my friend"',     // attempt 3 — nailed it
];

const HighTyping = () => {
  const [displayText, setDisplayText] = useState("");
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting" | "done">("typing");
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    if (phase === "done") {
      const timeout = setTimeout(() => setShowCursor(false), 2000);
      return () => clearTimeout(timeout);
    }
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    const current = attempts[attemptIndex];

    if (phase === "typing") {
      if (charIndex < current.length) {
        // Irregular typing speed — someone who's high types unevenly
        const delay = 60 + Math.random() * 120;
        const timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing this attempt
        if (attemptIndex < attempts.length - 1) {
          setPhase("pause");
        } else {
          setPhase("done");
        }
      }
    }

    if (phase === "pause") {
      // Pause, then realize the mistake and delete
      const timeout = setTimeout(() => setPhase("deleting"), 800);
      return () => clearTimeout(timeout);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        const delay = 25 + Math.random() * 35;
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        // Move to next attempt
        setAttemptIndex(attemptIndex + 1);
        setCharIndex(0);
        setPhase("typing");
      }
    }
  }, [phase, charIndex, attemptIndex, displayText]);

  return (
    <motion.h1
      className="font-serif text-5xl md:text-7xl lg:text-8xl text-background italic relative inline-block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      {displayText}
      <span
        className="inline-block w-[3px] h-[0.8em] bg-background/80 ml-1 align-baseline"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </motion.h1>
  );
};

export default HighTyping;
