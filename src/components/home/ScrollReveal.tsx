import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  once?: boolean;
}

const directionMap: Record<string, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const offset = directionMap[direction];
  const actualDistance = distance ?? (direction === "up" || direction === "down" ? 60 : 60);

  const hidden: Variant = {
    opacity: 0,
    ...(offset.x !== undefined && { x: offset.x > 0 ? actualDistance : -actualDistance }),
    ...(offset.y !== undefined && { y: offset.y > 0 ? actualDistance : -actualDistance }),
    filter: "blur(4px)",
  };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? visible : hidden}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.12,
  direction = "up",
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: {
                  opacity: 0,
                  ...(offset.y !== undefined && { y: 50 }),
                  ...(offset.x !== undefined && { x: 50 }),
                  filter: "blur(3px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
};

export default ScrollReveal;
