import { motion } from "framer-motion";

const RunningCart = () => {
  return (
    <div className="relative w-full h-40 overflow-hidden my-8">
      <motion.div
        className="absolute bottom-6"
        animate={{ x: ["-200px", "calc(100vw + 200px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {/* Slight bounce on the cart body */}
        <motion.div
          animate={{ y: [0, -2, 0, -1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="120"
            height="100"
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground"
          >
            {/* Cart body */}
            <path
              d="M25 30 L35 30 L50 70 L95 70 L105 35 L40 35"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Cart basket */}
            <path
              d="M42 45 L100 45 L95 70 L50 70 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="hsl(var(--foreground) / 0.05)"
            />
            {/* Handle */}
            <path d="M25 30 L15 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="15" cy="14" r="3" fill="currentColor" opacity="0.6" />

            {/* Grid lines on basket */}
            <line x1="60" y1="45" x2="57" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="75" y1="45" x2="73" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="90" y1="45" x2="88" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <line x1="45" y1="55" x2="97" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3" />

            {/* Left wheel */}
            <g>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "58px 82px" }}
              >
                <circle cx="58" cy="82" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <line x1="58" y1="72" x2="58" y2="92" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="48" y1="82" x2="68" y2="82" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="51" y1="75" x2="65" y2="89" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="65" y1="75" x2="51" y2="89" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </motion.g>
              <circle cx="58" cy="82" r="2.5" fill="currentColor" />
            </g>

            {/* Right wheel */}
            <g>
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "90px 82px" }}
              >
                <circle cx="90" cy="82" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <line x1="90" y1="72" x2="90" y2="92" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="80" y1="82" x2="100" y2="82" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                <line x1="83" y1="75" x2="97" y2="89" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <line x1="97" y1="75" x2="83" y2="89" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              </motion.g>
              <circle cx="90" cy="82" r="2.5" fill="currentColor" />
            </g>
          </svg>
        </motion.div>

        {/* Speed lines trailing behind */}
        <motion.div
          className="absolute top-1/2 -left-10 flex flex-col gap-1.5"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 0.25, repeat: Infinity }}
        >
          <div className="w-8 h-px bg-muted-foreground/30" />
          <div className="w-5 h-px bg-muted-foreground/20 ml-2" />
          <div className="w-12 h-px bg-muted-foreground/25" />
          <div className="w-6 h-px bg-muted-foreground/15 ml-1" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RunningCart;
