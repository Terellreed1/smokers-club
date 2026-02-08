import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

// Convert lat/lng to 3D position on sphere
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

interface ZoneData {
  id: string;
  name: string;
  abbr: string;
  type: "delivery" | "shipping";
  description: string;
  hours: string;
  service: string;
  eta: string;
  center: { lat: number; lng: number };
  points: { lat: number; lng: number }[];
  color: string;
}

const zones: ZoneData[] = [
  {
    id: "dc",
    name: "Washington D.C.",
    abbr: "DC",
    type: "delivery",
    description: "All quadrants — NW, NE, SW, SE, and downtown corridors. Our fastest service zone.",
    hours: "Mon–Sat: 10am – 9pm · Sun: 11am – 7pm",
    service: "Express hand-delivery",
    eta: "Under 1 hour",
    center: { lat: 38.9, lng: -77.03 },
    points: [
      { lat: 39.0, lng: -77.12 }, { lat: 39.0, lng: -76.91 },
      { lat: 38.79, lng: -76.91 }, { lat: 38.79, lng: -77.12 },
    ],
    color: "#4ade80",
  },
  {
    id: "md",
    name: "Maryland",
    abbr: "MD",
    type: "delivery",
    description: "Baltimore, Annapolis, Silver Spring, Bethesda, Columbia, and surrounding areas.",
    hours: "Mon–Sat: 10am – 9pm · Sun: 11am – 7pm",
    service: "Same-day hand-delivery",
    eta: "1 – 3 hours",
    center: { lat: 39.15, lng: -76.7 },
    points: [
      { lat: 39.72, lng: -79.5 }, { lat: 39.72, lng: -75.05 },
      { lat: 38.02, lng: -75.05 }, { lat: 38.02, lng: -75.7 },
      { lat: 38.3, lng: -76.0 }, { lat: 38.45, lng: -76.4 },
      { lat: 38.8, lng: -77.2 }, { lat: 39.0, lng: -77.5 },
      { lat: 39.35, lng: -77.7 }, { lat: 39.6, lng: -77.8 },
      { lat: 39.72, lng: -78.0 }, { lat: 39.72, lng: -79.5 },
    ],
    color: "#22c55e",
  },
  {
    id: "va",
    name: "Virginia",
    abbr: "VA",
    type: "delivery",
    description: "Northern Virginia including Arlington, Alexandria, Fairfax, Loudoun, and Prince William County.",
    hours: "Mon–Sat: 10am – 9pm · Sun: 11am – 7pm",
    service: "Same-day hand-delivery",
    eta: "1 – 3 hours",
    center: { lat: 38.2, lng: -78.0 },
    points: [
      { lat: 39.35, lng: -77.7 }, { lat: 39.0, lng: -78.0 },
      { lat: 38.0, lng: -79.5 }, { lat: 36.54, lng: -83.67 },
      { lat: 36.54, lng: -75.5 }, { lat: 37.0, lng: -76.0 },
      { lat: 37.6, lng: -76.3 }, { lat: 38.02, lng: -76.5 },
      { lat: 38.45, lng: -77.0 }, { lat: 38.8, lng: -77.2 },
    ],
    color: "#16a34a",
  },
  {
    id: "ny",
    name: "New York",
    abbr: "NY",
    type: "shipping",
    description: "NYC metro, Long Island, Westchester, and upstate. Premium discreet packaging.",
    hours: "Orders placed by 2pm ship same day",
    service: "Priority shipping",
    eta: "1 – 2 business days",
    center: { lat: 41.0, lng: -74.5 },
    points: [
      { lat: 42.5, lng: -79.76 }, { lat: 42.5, lng: -73.0 },
      { lat: 40.5, lng: -72.0 }, { lat: 40.5, lng: -74.0 },
      { lat: 41.0, lng: -74.8 }, { lat: 42.0, lng: -79.76 },
    ],
    color: "#a78bfa",
  },
  {
    id: "nj",
    name: "New Jersey",
    abbr: "NJ",
    type: "shipping",
    description: "Full state coverage. Newark, Jersey City, Trenton, Atlantic City, and all counties.",
    hours: "Orders placed by 2pm ship same day",
    service: "Priority shipping",
    eta: "1 – 2 business days",
    center: { lat: 40.1, lng: -74.5 },
    points: [
      { lat: 41.36, lng: -74.7 }, { lat: 41.36, lng: -73.9 },
      { lat: 39.5, lng: -74.0 }, { lat: 38.93, lng: -74.9 },
      { lat: 39.5, lng: -75.56 }, { lat: 40.2, lng: -74.8 },
    ],
    color: "#8b5cf6",
  },
  {
    id: "pa",
    name: "Pennsylvania",
    abbr: "PA",
    type: "shipping",
    description: "Philadelphia, Pittsburgh, Harrisburg, and statewide. White-glove shipping standards.",
    hours: "Orders placed by 2pm ship same day",
    service: "Standard shipping",
    eta: "2 – 3 business days",
    center: { lat: 40.8, lng: -77.5 },
    points: [
      { lat: 42.27, lng: -80.52 }, { lat: 42.0, lng: -75.0 },
      { lat: 39.72, lng: -75.05 }, { lat: 39.72, lng: -76.0 },
      { lat: 39.9, lng: -76.5 }, { lat: 39.72, lng: -79.5 },
      { lat: 40.0, lng: -80.52 },
    ],
    color: "#7c3aed",
  },
];

// Textured Earth sphere
function Earth() {
  const texture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");
  const bumpMap = useLoader(THREE.TextureLoader, "/textures/earth-bump.png");

  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial
        map={texture}
        bumpMap={bumpMap}
        bumpScale={0.03}
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  );
}

// Green cannabis-themed atmosphere glow
function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <>
      {/* Inner glow */}
      <Sphere args={[2.04, 64, 64]} ref={meshRef}>
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Outer glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#4ade80"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
      {/* Haze ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.02, 2.3, 64]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.02} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

// Clickable region polygon on globe surface
function ZoneRegion({
  zone,
  isActive,
  isHovered,
  onClick,
  onHover,
  onUnhover,
}: {
  zone: ZoneData;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const mesh = useMemo(() => {
    const r = 2.02;
    const points = zone.points.map((p) => latLngToVector3(p.lat, p.lng, r));
    const center = latLngToVector3(zone.center.lat, zone.center.lng, r);

    const vertices: number[] = [];
    const indices: number[] = [];

    vertices.push(center.x, center.y, center.z);
    points.forEach((p) => vertices.push(p.x, p.y, p.z));

    for (let i = 1; i <= points.length; i++) {
      const next = i === points.length ? 1 : i + 1;
      indices.push(0, i, next);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [zone]);

  const opacity = isActive ? 0.4 : isHovered ? 0.25 : 0.12;

  return (
    <mesh
      geometry={mesh}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onUnhover();
        document.body.style.cursor = "auto";
      }}
    >
      <meshBasicMaterial
        color={zone.color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Zone label floating on globe
function ZoneLabel({ zone, isActive }: { zone: ZoneData; isActive: boolean }) {
  const pos = useMemo(
    () => latLngToVector3(zone.center.lat, zone.center.lng, 2.08),
    [zone]
  );

  return (
    <Html position={pos} center style={{ pointerEvents: "none" }}>
      <div
        className={`text-center transition-all duration-300 ${
          isActive ? "scale-110" : ""
        }`}
      >
        <span
          className="text-[10px] font-sans font-bold uppercase tracking-wider px-1.5 py-0.5"
          style={{
            color: zone.color,
            textShadow: "0 0 6px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          {zone.abbr}
        </span>
        <div
          className="text-[7px] font-sans uppercase tracking-wider mt-0.5"
          style={{
            color: zone.type === "delivery" ? "#4ade80" : "#a78bfa",
            textShadow: "0 0 4px rgba(0,0,0,0.9)",
          }}
        >
          {zone.type === "delivery" ? "● delivery" : "○ shipping"}
        </div>
      </div>
    </Html>
  );
}

// Pulsing city dot
function CityDot({ lat, lng, delay = 0, label }: { lat: number; lng: number; delay?: number; label: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLngToVector3(lat, lng, 2.025), [lat, lng]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() + delay) % 3;
      const scale = 1 + Math.sin(t * Math.PI * 0.66) * 0.3;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={pos}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshBasicMaterial color="#4ade80" transparent opacity={0.9} />
      </mesh>
      <Html position={latLngToVector3(lat, lng, 2.06)} center style={{ pointerEvents: "none" }}>
        <span
          className="text-[6px] font-sans text-white/50 whitespace-nowrap"
          style={{ textShadow: "0 0 4px rgba(0,0,0,0.9)" }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}

// Full globe scene
function GlobeScene({
  activeZone,
  hoveredZone,
  onZoneClick,
  onZoneHover,
  onZoneUnhover,
}: {
  activeZone: string | null;
  hoveredZone: string | null;
  onZoneClick: (id: string) => void;
  onZoneHover: (id: string) => void;
  onZoneUnhover: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <pointLight position={[-3, -2, 4]} intensity={0.3} color="#4ade80" />

      <Earth />
      <Atmosphere />

      {/* Clickable zone regions */}
      {zones.map((zone) => (
        <ZoneRegion
          key={zone.id}
          zone={zone}
          isActive={activeZone === zone.id}
          isHovered={hoveredZone === zone.id}
          onClick={() => onZoneClick(zone.id)}
          onHover={() => onZoneHover(zone.id)}
          onUnhover={onZoneUnhover}
        />
      ))}

      {/* Zone labels */}
      {zones.map((zone) => (
        <ZoneLabel key={`label-${zone.id}`} zone={zone} isActive={activeZone === zone.id} />
      ))}

      {/* City markers */}
      <CityDot lat={38.9} lng={-77.03} delay={0} label="Washington" />
      <CityDot lat={39.29} lng={-76.61} delay={0.7} label="Baltimore" />
      <CityDot lat={38.88} lng={-77.17} delay={1.4} label="Arlington" />
      <CityDot lat={40.71} lng={-74.01} delay={0.3} label="New York" />
      <CityDot lat={39.95} lng={-75.17} delay={1.0} label="Philadelphia" />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3.5}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.3}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

// Main component
const DeliveryMap = () => {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  const activeZone = zones.find((z) => z.id === activeZoneId) ?? null;

  const handleZoneClick = useCallback((id: string) => {
    setActiveZoneId((prev) => (prev === id ? null : id));
  }, []);

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
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* 3D Globe */}
            <div className="relative w-full lg:w-3/5 aspect-square max-w-[520px] mx-auto lg:mx-0">
              <Canvas
                camera={{ position: [-2, 1.5, 4], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
              >
                <GlobeScene
                  activeZone={activeZoneId}
                  hoveredZone={hoveredZoneId}
                  onZoneClick={handleZoneClick}
                  onZoneHover={setHoveredZoneId}
                  onZoneUnhover={() => setHoveredZoneId(null)}
                />
              </Canvas>

              {/* Ambient backdrop glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-green-500/[0.04] blur-[60px]" />
              </div>
            </div>

            {/* Info panel */}
            <div className="w-full lg:w-2/5 min-h-[300px]">
              {/* Legend */}
              <div className="flex gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                    Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                  <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                    Shipping
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeZone ? (
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Zone type badge */}
                    <span
                      className={`inline-block text-[10px] font-sans uppercase editorial-spacing px-3 py-1 mb-4 ${
                        activeZone.type === "delivery"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-violet-500/10 text-violet-400"
                      }`}
                    >
                      {activeZone.type === "delivery" ? "● Same-Day Delivery" : "○ Priority Shipping"}
                    </span>

                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
                      {activeZone.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                      {activeZone.description}
                    </p>

                    <div className="space-y-3 border-t border-border/30 pt-5">
                      <div className="flex justify-between">
                        <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                          Service
                        </span>
                        <span className="text-xs font-sans text-foreground/80">{activeZone.service}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                          ETA
                        </span>
                        <span className="text-xs font-sans text-foreground/80">{activeZone.eta}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                          Hours
                        </span>
                        <span className="text-xs font-sans text-foreground/80">{activeZone.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px] font-sans uppercase editorial-spacing text-muted-foreground">
                          ID Required
                        </span>
                        <span className="text-xs font-sans text-foreground/80">21+ Government ID</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                      Select a Zone
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6">
                      Drag the globe to explore. Click on a highlighted zone to view service type, delivery hours, and estimated arrival times.
                    </p>
                    <div className="space-y-2">
                      {zones.map((z) => (
                        <button
                          key={z.id}
                          onClick={() => setActiveZoneId(z.id)}
                          className="w-full flex items-center justify-between py-2.5 px-3 text-left border border-border/30 hover:border-foreground/30 transition-all duration-300 group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: z.color }}
                            />
                            <span className="text-xs font-sans text-foreground/70 group-hover:text-foreground transition-colors">
                              {z.name}
                            </span>
                          </div>
                          <span
                            className={`text-[9px] font-sans uppercase editorial-spacing ${
                              z.type === "delivery" ? "text-green-500/70" : "text-violet-400/70"
                            }`}
                          >
                            {z.type}
                          </span>
                        </button>
                      ))}
                    </div>
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
