import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    const audio = new Audio("/audio/jazz-bg.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Try to autoplay immediately (works after user already interacted with age gate)
    const tryAutoPlay = () => {
      if (hasAutoPlayed.current || !audioRef.current) return;
      audioRef.current.play().then(() => {
        hasAutoPlayed.current = true;
        setPlaying(true);
        cleanup();
      }).catch(() => {
        // Browser blocked it, will retry on next interaction
      });
    };

    const cleanup = () => {
      document.removeEventListener("click", tryAutoPlay, true);
      document.removeEventListener("scroll", tryAutoPlay, true);
      document.removeEventListener("touchstart", tryAutoPlay, true);
      document.removeEventListener("keydown", tryAutoPlay, true);
    };

    // Attempt immediately
    tryAutoPlay();

    // Also listen for any interaction as fallback
    document.addEventListener("click", tryAutoPlay, true);
    document.addEventListener("scroll", tryAutoPlay, true);
    document.addEventListener("touchstart", tryAutoPlay, true);
    document.addEventListener("keydown", tryAutoPlay, true);

    return () => {
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center",
        "bg-foreground/90 text-background backdrop-blur-md border border-gold/30",
        "shadow-lg hover:scale-110 transition-all duration-300",
        playing && "ring-2 ring-gold/40 ring-offset-2 ring-offset-background"
      )}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
};

export default MusicPlayer;
