import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import cannabisLeaf from "@/assets/cannabis-leaf.png";

type FilterMode = "simple" | "smart";

const simpleMoods = [
  {
    id: "chill",
    label: "Chill",
    emoji: "🌙",
    description: "Wind down, relax, melt into the couch",
    color: "from-indigo-500/10 to-purple-500/10",
    strainTypes: ["Indica"],
  },
  {
    id: "creative",
    label: "Creative",
    emoji: "🎨",
    description: "Spark ideas, flow state, artistic energy",
    color: "from-amber-500/10 to-orange-500/10",
    strainTypes: ["Sativa"],
  },
  {
    id: "social",
    label: "Social",
    emoji: "🔥",
    description: "Good vibes, laughs, and great conversation",
    color: "from-pink-500/10 to-red-500/10",
    strainTypes: ["Hybrid", "Sativa"],
  },
  {
    id: "sleep",
    label: "Sleep",
    emoji: "😴",
    description: "Deep rest, recovery, total shutdown",
    color: "from-blue-500/10 to-slate-500/10",
    strainTypes: ["Indica"],
  },
];

const smartFilters = [
  {
    id: "indica",
    label: "Indica",
    description: "Body high, relaxation, pain relief",
    icon: "🌙",
  },
  {
    id: "sativa",
    label: "Sativa",
    description: "Head high, energy, creativity",
    icon: "⚡",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    description: "Balanced effects, best of both",
    icon: "🔥",
  },
];

interface MoodFilterProps {
  mode?: FilterMode;
  showToggle?: boolean;
  onMoodSelect?: (mood: string) => void;
  onStrainSelect?: (strain: string) => void;
}

const MoodFilter = ({
  mode: initialMode = "simple",
  showToggle = true,
  onMoodSelect,
  onStrainSelect,
}: MoodFilterProps) => {
  const [mode, setMode] = useState<FilterMode>(initialMode);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedStrain, setSelectedStrain] = useState<string | null>(null);

  const handleMoodClick = (moodId: string) => {
    const newValue = selectedMood === moodId ? null : moodId;
    setSelectedMood(newValue);
    onMoodSelect?.(newValue ?? "");
  };

  const handleStrainClick = (strainId: string) => {
    const newValue = selectedStrain === strainId ? null : strainId;
    setSelectedStrain(newValue);
    onStrainSelect?.(newValue ?? "");
  };

  return (
    <div>
      {/* Mode toggle */}
      {showToggle && (
        <div className="flex items-center justify-center gap-1 mb-8">
          <button
            onClick={() => {
              setMode("simple");
              setSelectedStrain(null);
            }}
            className={`px-4 py-2 text-[10px] font-sans uppercase editorial-spacing border transition-all duration-300 ${
              mode === "simple"
                ? "border-foreground bg-foreground text-background"
                : "border-border/30 text-muted-foreground hover:border-foreground/30"
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => {
              setMode("smart");
              setSelectedMood(null);
            }}
            className={`px-4 py-2 text-[10px] font-sans uppercase editorial-spacing border transition-all duration-300 ${
              mode === "smart"
                ? "border-foreground bg-foreground text-background"
                : "border-border/30 text-muted-foreground hover:border-foreground/30"
            }`}
          >
            Smart
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {mode === "simple" ? (
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {simpleMoods.map((mood) => (
              <motion.button
                key={mood.id}
                onClick={() => handleMoodClick(mood.id)}
                className={`relative text-center p-6 border transition-all duration-500 overflow-hidden group ${
                  selectedMood === mood.id
                    ? "border-foreground/40 bg-foreground/5"
                    : "border-border/30 hover:border-foreground/20"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Mood gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} transition-opacity duration-500 ${
                    selectedMood === mood.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  }`}
                />
                <div className="relative z-10">
                  <span className="text-3xl block mb-3">{mood.emoji}</span>
                  <h4 className="font-serif text-base text-foreground mb-1">{mood.label}</h4>
                  <p className="text-[9px] font-sans text-muted-foreground/60 leading-relaxed">
                    {mood.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="smart"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-3"
          >
            {smartFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => handleStrainClick(filter.id)}
                className={`text-center p-6 border transition-all duration-500 ${
                  selectedStrain === filter.id
                    ? "border-foreground/40 bg-foreground/5"
                    : "border-border/30 hover:border-foreground/20"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-3xl block mb-3">{filter.icon}</span>
                <h4 className="font-serif text-base text-foreground mb-1">{filter.label}</h4>
                <p className="text-[9px] font-sans text-muted-foreground/60 leading-relaxed">
                  {filter.description}
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Homepage version — Simple mode only with leaves
const StrainQuiz = () => {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Left leaf */}
      <img
        src={cannabisLeaf}
        alt=""
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-48 md:w-72 lg:w-96 opacity-10 pointer-events-none select-none -rotate-12"
        aria-hidden="true"
      />
      {/* Right leaf */}
      <img
        src={cannabisLeaf}
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-48 md:w-72 lg:w-96 opacity-10 pointer-events-none select-none rotate-12 scale-x-[-1]"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
              Find Your Strain
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground italic">
              What's your vibe?
            </h2>
            <p className="text-sm font-sans text-muted-foreground mt-4 max-w-md mx-auto">
              Pick a mood and we'll match you with the perfect strain.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MoodFilter mode="simple" showToggle={false} />

          <div className="text-center mt-8">
            <a
              href="/shop"
              className="inline-block text-xs font-sans uppercase editorial-spacing text-muted-foreground/50 border-b border-border/30 pb-1 hover:text-foreground hover:border-foreground transition-all duration-300"
            >
              Explore full catalog →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export { MoodFilter };
export default StrainQuiz;
