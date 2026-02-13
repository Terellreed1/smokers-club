import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/jazz-bg.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Auto-play on first user interaction
    const autoPlay = () => {
      if (!audioRef.current) return;
      audioRef.current.play().then(() => {
        setPlaying(true);
        setStarted(true);
      }).catch(() => {});
      document.removeEventListener("click", autoPlay);
      document.removeEventListener("scroll", autoPlay);
      document.removeEventListener("touchstart", autoPlay);
    };

    document.addEventListener("click", autoPlay, { once: true });
    document.addEventListener("scroll", autoPlay, { once: true });
    document.addEventListener("touchstart", autoPlay, { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", autoPlay);
      document.removeEventListener("scroll", autoPlay);
      document.removeEventListener("touchstart", autoPlay);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
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
