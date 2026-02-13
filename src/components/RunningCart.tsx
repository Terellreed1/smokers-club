import { motion } from "framer-motion";

const RunningCart = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden my-8">
      <motion.div
        className="absolute bottom-4"
        animate={{
          x: ["100vw", "-200px"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Character running with cart */}
        <div className="flex items-end gap-0 select-none">
          {/* Person */}
          <div className="relative" style={{ fontSize: "3rem", lineHeight: 1 }}>
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              🏃
            </motion.div>
          </div>
          {/* Shopping cart */}
          <div className="relative -ml-2" style={{ fontSize: "3rem", lineHeight: 1 }}>
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 0.25, repeat: Infinity }}
            >
              🛒
            </motion.div>
          </div>
        </div>
        {/* Speed lines */}
        <motion.div
          className="absolute top-1/2 -left-12 flex flex-col gap-1"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <div className="w-8 h-px bg-muted-foreground/30" />
          <div className="w-6 h-px bg-muted-foreground/20 ml-1" />
          <div className="w-10 h-px bg-muted-foreground/25" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RunningCart;
