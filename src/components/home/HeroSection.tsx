import { useEffect, useRef } from "react";

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

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-foreground/70" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-background italic opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          stay high, my friend
        </h1>

        {/* Gold Divider */}
        <div
          className="w-24 h-px bg-gold mx-auto my-8 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        />

        <p
          className="text-xs md:text-sm font-sans uppercase wide-spacing text-background/80 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.9s" }}
        >
          Street-born. Brand-backed. Dropping premium THC
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
