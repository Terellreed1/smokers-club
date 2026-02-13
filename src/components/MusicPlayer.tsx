import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// Singleton audio instance to prevent duplicates
let globalAudio: HTMLAudioElement | null = null;

const getAudio = () => {
  if (!globalAudio) {
    globalAudio = new Audio("/audio/jazz-bg.mp3");
    globalAudio.loop = true;
    globalAudio.volume = 0.3;
  }
  return globalAudio;
};

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    const audio = getAudio();

    // Sync state if already playing (e.g. remount)
    if (!audio.paused) {
      setPlaying(true);
      hasAutoPlayed.current = true;
      return;
    }

    const tryAutoPlay = () => {
      if (hasAutoPlayed.current) return;
      audio.play().then(() => {
        hasAutoPlayed.current = true;
        setPlaying(true);
        cleanup();
      }).catch(() => {});
    };

    const cleanup = () => {
      document.removeEventListener("click", tryAutoPlay, true);
      document.removeEventListener("scroll", tryAutoPlay, true);
      document.removeEventListener("touchstart", tryAutoPlay, true);
    };

    tryAutoPlay();

    document.addEventListener("click", tryAutoPlay, true);
    document.addEventListener("scroll", tryAutoPlay, true);
    document.addEventListener("touchstart", tryAutoPlay, true);

    return () => cleanup();
  }, []);

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
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
