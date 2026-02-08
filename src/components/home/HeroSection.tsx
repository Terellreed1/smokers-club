import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import logo from "@/assets/logo.png";

const HERO_TEXT = "stay high, my friend";
const TYPING_SPEED = 160;
const START_DELAY = 1200;

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

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

  // Deeper parallax for logo, lighter for text
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

  // Typing animation
  useEffect(() => {
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      timeout = setTimeout(function typeNext() {
        charIndex++;
        setDisplayedText(HERO_TEXT.slice(0, charIndex));
        if (charIndex < HERO_TEXT.length) {
          timeout = setTimeout(typeNext, TYPING_SPEED);
        } else {
          setTimeout(() => setShowCursor(false), 1200);
        }
      }, TYPING_SPEED);
    };

    const delayTimeout = setTimeout(startTyping, START_DELAY);
    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeout);
    };
  }, []);

  // YouTube video: loop 6:49 (409s) to 7:09 (429s)
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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: videoY }}>
        <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]" />
      </motion.div>

      {/* Dark Overlay — deepens on scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Animated smoke/haze overlay — reacts to cursor */}
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

      {/* Hero Content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo watermark — deeper mouse parallax */}
        <motion.div
          className="mx-auto mb-8 opacity-0 animate-fade-in-up"
          style={{ x: logoX, y: logoY, animationDelay: "0.1s" }}
        >
          <img
            src={logo}
            alt="LC"
            className="h-24 md:h-32 w-auto mx-auto opacity-60 drop-shadow-lg"
          />
        </motion.div>

        {/* Headline — lighter mouse parallax */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-background italic"
          style={{ x: textX, y: textY }}
        >
          {displayedText}
          {showCursor && (
            <span className="inline-block w-[3px] h-[0.8em] bg-background/70 ml-1 align-baseline animate-pulse" />
          )}
        </motion.h1>

        <motion.p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 opacity-0 animate-fade-in-up mt-8"
          style={{ x: textX, animationDelay: "0.6s" }}
        >
          Street-born · Brand-backed · Premium THC delivered
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
