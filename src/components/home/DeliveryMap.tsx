import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
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

// Approximate region boundaries as point arrays
const regions = {
  md: {
    name: "Maryland",
    abbr: "MD",
    center: { lat: 39.05, lng: -76.7 },
    description: "Full coverage across Baltimore, Annapolis, Silver Spring, Bethesda, and surrounding areas.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Same-day delivery available",
    color: "#ffffff",
    points: [
      { lat: 39.72, lng: -75.79 }, { lat: 39.72, lng: -76.2 }, { lat: 39.72, lng: -76.8 },
      { lat: 39.6, lng: -77.5 }, { lat: 39.35, lng: -77.7 }, { lat: 39.0, lng: -77.5 },
      { lat: 38.8, lng: -77.2 }, { lat: 38.45, lng: -76.4 }, { lat: 38.3, lng: -76.0 },
      { lat: 38.02, lng: -75.7 }, { lat: 38.45, lng: -75.05 }, { lat: 39.3, lng: -75.6 },
    ],
  },
  dc: {
    name: "Washington D.C.",
    abbr: "DC",
    center: { lat: 38.9, lng: -77.03 },
    description: "Complete coverage across all quadrants — NW, NE, SW, SE, and downtown corridors.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Express 1-hour delivery",
    color: "#ffffff",
    points: [
      { lat: 38.995, lng: -77.04 }, { lat: 38.93, lng: -76.91 },
      { lat: 38.79, lng: -77.04 }, { lat: 38.93, lng: -77.12 },
    ],
  },
  va: {
    name: "Virginia",
    abbr: "VA",
    center: { lat: 38.5, lng: -77.5 },
    description: "Northern Virginia coverage including Arlington, Alexandria, Fairfax, and Loudoun County.",
    hours: "Mon–Sat: 10am – 9pm",
    delivery: "Same-day delivery available",
    color: "#ffffff",
    points: [
      { lat: 39.35, lng: -77.7 }, { lat: 39.0, lng: -78.0 }, { lat: 38.5, lng: -78.5 },
      { lat: 37.5, lng: -79.0 }, { lat: 36.54, lng: -79.0 }, { lat: 36.54, lng: -76.0 },
      { lat: 37.0, lng: -76.2 }, { lat: 37.6, lng: -76.3 }, { lat: 38.02, lng: -76.5 },
      { lat: 38.45, lng: -77.0 }, { lat: 38.8, lng: -77.2 },
    ],
  },
};

// Glow ring around the globe
function GlobeGlow() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.02, 2.15, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Wireframe grid sphere
function GlobeWireframe() {
  return (
    <Sphere args={[2.005, 36, 36]}>
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.04} />
    </Sphere>
  );
}

// Main globe surface
function GlobeSurface() {
  return (
    <Sphere args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#1a1a1a"
        roughness={0.9}
        metalness={0.1}
      />
    </Sphere>
  );
}

// Graticule lines (lat/lng grid)
function Graticule() {
  const lines = useMemo(() => {
    const geoms: THREE.BufferGeometry[] = [];
    const r = 2.01;

    // Latitude lines every 15°
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts: THREE.Vector3[] = [];
      for (let lng = -180; lng <= 180; lng += 3) {
        pts.push(latLngToVector3(lat, lng, r));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      geoms.push(geom);
    }

    // Longitude lines every 15°
    for (let lng = -180; lng < 180; lng += 15) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        pts.push(latLngToVector3(lat, lng, r));
      }
      const geom = new THREE.BufferGeometry().setFromPoints(pts);
      geoms.push(geom);
    }

    return geoms;
  }, []);

  return (
    <>
      {lines.map((geom, i) => (
        <primitive key={i} object={new THREE.Line(geom, new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.06 }))} />
      ))}
    </>
  );
}

// Region highlight on the globe
function RegionHighlight({ region }: { region: typeof regions.md }) {
  const mesh = useMemo(() => {
    const r = 2.015;
    const points = region.points.map(p => latLngToVector3(p.lat, p.lng, r));
    const shape = new THREE.Shape();

    // Project to 2D for shape creation, then we'll position in 3D
    // Instead, create a simple polygon mesh
    const geometry = new THREE.BufferGeometry();
    const center = latLngToVector3(region.center.lat, region.center.lng, r);

    const vertices: number[] = [];
    const indices: number[] = [];

    // Fan triangulation from center
    vertices.push(center.x, center.y, center.z);
    points.forEach(p => vertices.push(p.x, p.y, p.z));

    for (let i = 1; i <= points.length; i++) {
      const next = i === points.length ? 1 : i + 1;
      indices.push(0, i, next);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [region]);

  return (
    <mesh geometry={mesh}>
      <meshBasicMaterial
        color={region.color}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Pulsing dot at a location
function LocationDot({ lat, lng, delay = 0 }: { lat: number; lng: number; delay?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLngToVector3(lat, lng, 2.03), [lat, lng]);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() + delay) % 2;
      const scale = 1 + Math.sin(t * Math.PI) * 0.5;
      ref.current.scale.setScalar(scale);
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.8 - t * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
}

// Rotating globe with auto-rotation
function Globe() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <GlobeSurface />
      <GlobeWireframe />
      <Graticule />
      <GlobeGlow />

      {/* Region highlights */}
      {Object.values(regions).map((region) => (
        <RegionHighlight key={region.abbr} region={region} />
      ))}

      {/* City dots */}
      <LocationDot lat={38.9} lng={-77.03} delay={0} />     {/* DC */}
      <LocationDot lat={39.29} lng={-76.61} delay={0.6} />   {/* Baltimore */}
      <LocationDot lat={38.88} lng={-77.17} delay={1.2} />   {/* Arlington */}
      <LocationDot lat={38.97} lng={-76.49} delay={1.8} />   {/* Annapolis */}
      <LocationDot lat={37.54} lng={-77.43} delay={0.9} />   {/* Richmond */}
    </group>
  );
}

interface ZoneInfo {
  name: string;
  abbr: string;
  description: string;
  hours: string;
  delivery: string;
}

const DeliveryMap = () => {
  const [activeZone, setActiveZone] = useState<ZoneInfo | null>(null);

  const zoneList = Object.values(regions);

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
            <div className="relative w-full lg:w-3/5 aspect-square max-w-lg mx-auto lg:mx-0">
              <Canvas
                camera={{ position: [0, 1, 4.5], fov: 45 }}
                style={{ background: "transparent" }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 3, 5]} intensity={0.8} />
                <pointLight position={[-5, -3, -5]} intensity={0.2} />
                <Globe />
                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minDistance={3}
                  maxDistance={8}
                  autoRotate
                  autoRotateSpeed={0.5}
                  dampingFactor={0.05}
                  enableDamping
                />
              </Canvas>

              {/* Subtle ambient glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-foreground/[0.03] blur-3xl" />
              </div>
            </div>

            {/* Info panel */}
            <div className="w-full lg:w-2/5 min-h-[260px]">
              {/* Zone selector */}
              <div className="flex gap-3 mb-8">
                {zoneList.map((zone) => (
                  <button
                    key={zone.abbr}
                    onClick={() => setActiveZone(activeZone?.abbr === zone.abbr ? null : zone)}
                    className={`px-4 py-2 text-xs font-sans uppercase editorial-spacing border transition-all duration-300 ${
                      activeZone?.abbr === zone.abbr
                        ? "border-foreground bg-foreground text-background"
                        : "border-border/50 text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {zone.abbr}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeZone ? (
                  <motion.div
                    key={activeZone.abbr}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  >
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                      Select Your Zone
                    </h3>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-4">
                      Drag the globe to explore. Tap a zone above to view delivery details, hours, and coverage for your area.
                    </p>
                    <p className="text-xs text-muted-foreground/60 font-sans">
                      Maryland · Washington D.C. · Virginia
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
