import { useEffect, useRef } from "react";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    let player: any;

    (window as any).onYouTubeIframeAPIReady = () => {
      player = new (window as any).YT.Player("yt-player", {
        videoId: "Ptgjuqrs_6Y",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          loop: 1,
          modestbranding: 1,
          start: 301,
          end: 372,
          playlist: "Ptgjuqrs_6Y",
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.ENDED) {
              event.target.seekTo(301);
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
      {/* Video Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div id="yt-player" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh]" />
      </div>

      {/* Dark Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
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
          luxury couriers
        </h1>

        {/* Gold Divider */}
        <div
          className="w-24 h-px gold-gradient mx-auto my-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        />

        <p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.9s" }}
        >
          Street-born · Brand-backed · Premium THC delivered
        </p>

        {/* CTA */}
        <div
          className="mt-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <a
            href="/shop"
            className="inline-block border border-gold/60 text-gold text-xs font-sans uppercase editorial-spacing px-10 py-4 hover:bg-gold hover:text-foreground transition-all duration-500"
          >
            Explore the Collection
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent mx-auto mb-2" />
        <p className="text-[10px] font-sans uppercase editorial-spacing text-background/40">Scroll</p>
      </div>
    </section>
  );
};

export default HeroSection;
