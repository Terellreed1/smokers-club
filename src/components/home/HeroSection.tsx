import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 600], [0, -120]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.65, 0.95]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    let player: any;

    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player("yt-player", {
        videoId: "jfMmHXR0MRc",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          modestbranding: 1,
          playlist: "jfMmHXR0MRc",
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    };

    return () => {
      if (player?.destroy) player.destroy();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video Background with parallax */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: videoY }}>
        <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]" />
      </motion.div>

      {/* Dark Overlay — deepens on scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Animated smoke/haze overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      </div>

      {/* Hero Content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Logo watermark */}
        <div
          className="mx-auto mb-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <img
            src={logo}
            alt="LC"
            className="h-24 md:h-32 w-auto mx-auto opacity-60 drop-shadow-lg"
          />
        </div>

        <h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-background italic opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          stay high, my friend
        </h1>

        <p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 opacity-0 animate-fade-in-up mt-8"
          style={{ animationDelay: "0.6s" }}
        >
          Street-born · Brand-backed · Premium THC delivered
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
