import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Zone {
  id: string;
  name: string;
  abbr: string;
  description: string;
  hours: string;
  delivery: string;
  path: string;
}

const zones: Zone[] = [
  {
    id: "md",
    name: "Maryland",
    abbr: "MD",
    description: "Full coverage across Baltimore, Annapolis, Silver Spring, Bethesda, and surrounding areas.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Same-day delivery available",
    path: "M 180 40 L 260 35 L 310 50 L 340 45 L 360 55 L 350 75 L 355 90 L 340 100 L 320 95 L 300 105 L 280 100 L 260 110 L 240 115 L 235 130 L 220 140 L 210 135 L 200 145 L 185 140 L 175 130 L 165 120 L 170 100 L 175 80 L 180 60 Z",
  },
  {
    id: "dc",
    name: "Washington D.C.",
    abbr: "DC",
    description: "Complete coverage across all quadrants — NW, NE, SW, SE, and downtown corridors.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Express 1-hour delivery",
    path: "M 200 145 L 210 135 L 220 140 L 225 150 L 218 160 L 205 158 Z",
  },
  {
    id: "va",
    name: "Virginia",
    abbr: "VA",
    description: "Northern Virginia coverage including Arlington, Alexandria, Fairfax, and Loudoun County.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Same-day delivery available",
    path: "M 80 120 L 120 90 L 165 120 L 175 130 L 185 140 L 200 145 L 205 158 L 218 160 L 225 150 L 235 155 L 250 170 L 260 200 L 240 220 L 200 240 L 160 250 L 120 240 L 100 220 L 80 200 L 70 170 L 75 140 Z",
  },
];

const DeliveryMap = () => {
  const [activeZone, setActiveZone] = useState<Zone | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Service Area
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Where We Deliver
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Map */}
            <div className="relative w-full lg:w-3/5 max-w-lg mx-auto lg:mx-0">
              <svg
                viewBox="40 10 360 260"
                className="w-full h-auto"
                style={{ filter: "drop-shadow(0 4px 20px hsl(var(--foreground) / 0.08))" }}
              >
                {/* Grid lines for depth */}
                {[60, 100, 140, 180, 220].map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="50" y1={y} x2="370" y2={y}
                    stroke="hsl(var(--border))"
                    strokeWidth="0.3"
                    strokeDasharray="2 4"
                    opacity="0.3"
                  />
                ))}
                {[100, 160, 220, 280, 340].map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={x} y1="20" x2={x} y2="260"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.3"
                    strokeDasharray="2 4"
                    opacity="0.3"
                  />
                ))}

                {/* State paths */}
                {zones.map((zone) => (
                  <g key={zone.id}>
                    <motion.path
                      d={zone.path}
                      fill={
                        activeZone?.id === zone.id
                          ? "hsl(var(--foreground) / 0.15)"
                          : hoveredZone === zone.id
                          ? "hsl(var(--foreground) / 0.08)"
                          : "hsl(var(--foreground) / 0.03)"
                      }
                      stroke={
                        activeZone?.id === zone.id
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--foreground) / 0.3)"
                      }
                      strokeWidth={activeZone?.id === zone.id ? "2" : "1"}
                      className="cursor-pointer transition-colors duration-300"
                      onClick={() => setActiveZone(activeZone?.id === zone.id ? null : zone)}
                      onMouseEnter={() => setHoveredZone(zone.id)}
                      onMouseLeave={() => setHoveredZone(null)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                    />
                  </g>
                ))}

                {/* State labels */}
                <text x="260" y="80" textAnchor="middle" className="fill-foreground/60 text-[11px] font-sans uppercase pointer-events-none" style={{ letterSpacing: "0.15em" }}>MD</text>
                <text x="212" y="152" textAnchor="middle" className="fill-foreground/80 text-[8px] font-sans uppercase pointer-events-none" style={{ letterSpacing: "0.1em" }}>DC</text>
                <text x="160" y="190" textAnchor="middle" className="fill-foreground/60 text-[11px] font-sans uppercase pointer-events-none" style={{ letterSpacing: "0.15em" }}>VA</text>

                {/* Delivery pulse dots */}
                {[
                  { cx: 212, cy: 148, label: "DC" },
                  { cx: 280, cy: 70, label: "Baltimore" },
                  { cx: 140, cy: 170, label: "Arlington" },
                ].map((dot, i) => (
                  <g key={i}>
                    <circle cx={dot.cx} cy={dot.cy} r="2.5" fill="hsl(var(--foreground))" />
                    <motion.circle
                      cx={dot.cx} cy={dot.cy} r="2.5"
                      fill="none"
                      stroke="hsl(var(--foreground))"
                      strokeWidth="0.8"
                      initial={{ r: 2.5, opacity: 0.6 }}
                      animate={{ r: 12, opacity: 0 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Info panel */}
            <div className="w-full lg:w-2/5 min-h-[200px]">
              <AnimatePresence mode="wait">
                {activeZone ? (
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3">
                      {activeZone.abbr} Zone
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                      {activeZone.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                      {activeZone.description}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                        <span className="text-xs font-sans text-foreground/70">{activeZone.hours}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                        <span className="text-xs font-sans text-foreground/70">{activeZone.delivery}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-foreground rounded-full" />
                        <span className="text-xs font-sans text-foreground/70">21+ valid ID required</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3">
                      Tap a region
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                      Select Your Zone
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      Click on Maryland, D.C., or Virginia to view delivery details, hours, and coverage for your area.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DeliveryMap;
