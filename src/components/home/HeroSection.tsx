import { useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import logo from "@/assets/logo.png";
import HighTyping from "./HighTyping";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.65, 0.95]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // Cursor-reactive parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const logoX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const logoY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);
  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [-6, 6]);
  const smokeX = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30]);
  const smokeY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // YouTube video loop
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    let player: any;
    let loopInterval: ReturnType<typeof setInterval>;

    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player("yt-player", {
        videoId: "jfMmHXR0MRc",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 0,
          modestbranding: 1,
          playsinline: 1,
          start: 409,
          end: 429,
        },
        events: {
          onReady: (event: any) => {
            event.target.seekTo(409);
            event.target.playVideo();
            loopInterval = setInterval(() => {
              const currentTime = event.target.getCurrentTime?.();
              if (currentTime >= 428.5 || event.target.getPlayerState?.() === 0) {
                event.target.seekTo(409);
                event.target.playVideo();
              }
            }, 500);
          },
        },
      });
    };

    return () => {
      clearInterval(loopInterval);
      if (player?.destroy) player.destroy();
    };
  }, []);

  // Smoke particle positions
  const smokeParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 80 + Math.random() * 200,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
  }));

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[120vh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: videoY }}>
        <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]" />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Ambient smoke haze — cursor reactive */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ x: smokeX, y: smokeY }}
      >
        <div
          className="absolute -inset-[50%] opacity-[0.07]"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 20% 50%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 500px 350px at 70% 30%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 400px 500px at 50% 80%, hsl(var(--background)), transparent)
            `,
            animation: "smokedrift 20s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -inset-[50%] opacity-[0.05]"
          style={{
            background: `
              radial-gradient(ellipse 700px 300px at 80% 60%, hsl(var(--background)), transparent),
              radial-gradient(ellipse 300px 600px at 30% 70%, hsl(var(--background)), transparent)
            `,
            animation: "smokedrift2 25s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl -mt-16 md:-mt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo */}
        <motion.div
          className="mx-auto -mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          style={{ x: logoX, y: logoY }}
        >
          <img
            src={logo}
            alt="LC"
            className="h-64 md:h-96 w-auto mx-auto drop-shadow-lg"
          />
        </motion.div>

        {/* Smoke reveal headline */}
        <div className="relative">
          <motion.p
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-background/90 tracking-widest uppercase mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
          >
            Luxury Smokers Club
          </motion.p>
          <motion.h1
            className="font-serif text-xl md:text-3xl lg:text-4xl text-background italic relative whitespace-nowrap"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
          >
            "stay high, my friend" — LSC
          </motion.h1>
        </div>

        <motion.p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
        >
          Street-born · Brand-backed · Premium THC delivered
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
