import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Question {
  question: string;
  options: { label: string; scores: { indica: number; sativa: number; hybrid: number } }[];
}

const questions: Question[] = [
  {
    question: "What vibe are you chasing?",
    options: [
      { label: "Deep relaxation & sleep", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Energy & creativity", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "A balanced, mellow flow", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "When do you usually light up?",
    options: [
      { label: "Nighttime wind-down", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Daytime adventures", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Whenever the mood hits", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "Pick your ideal setting:",
    options: [
      { label: "Couch, blanket, movie", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Studio, hike, or party", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Kickback with friends", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "What matters most to you?",
    options: [
      { label: "Pain relief & deep calm", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Focus & uplifted mood", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Best of both worlds", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
];

const strainResults = {
  indica: {
    name: "Indica",
    tagline: "Sink into the couch. You've earned it.",
    description: "You're wired for deep relaxation. Indica strains deliver full-body calm, perfect for unwinding after a long day or drifting into a restful sleep.",
    emoji: "🌙",
  },
  sativa: {
    name: "Sativa",
    tagline: "Light up and level up.",
    description: "You thrive on energy and inspiration. Sativa strains fuel creativity, social vibes, and keep your mind sharp throughout the day.",
    emoji: "⚡",
  },
  hybrid: {
    name: "Hybrid",
    tagline: "Why choose? Get the best of everything.",
    description: "You're versatile and open-minded. Hybrid strains blend the best of indica and sativa, giving you a balanced experience tailored to any moment.",
    emoji: "🔥",
  },
};

const StrainQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ indica: 0, sativa: 0, hybrid: 0 });
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);

  const handleAnswer = (option: Question["options"][number]) => {
    const newScores = {
      indica: scores.indica + option.scores.indica,
      sativa: scores.sativa + option.scores.sativa,
      hybrid: scores.hybrid + option.scores.hybrid,
    };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const max = Math.max(scores.indica, scores.sativa, scores.hybrid);
    if (scores.indica === max) return strainResults.indica;
    if (scores.sativa === max) return strainResults.sativa;
    return strainResults.hybrid;
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScores({ indica: 0, sativa: 0, hybrid: 0 });
    setShowResult(false);
    setStarted(false);
  };

  const result = getResult();
  const progress = started ? ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100 : 0;

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
              Find Your Strain
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground italic">
              What's your vibe?
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            {!started && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-sm font-sans text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  Answer 4 quick questions and we'll match you with the perfect strain type — Indica, Sativa, or Hybrid.
                </p>
                <button
                  onClick={() => setStarted(true)}
                  className="font-sans text-xs uppercase editorial-spacing px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Take the Quiz
                </button>
              </motion.div>
            )}

            {started && !showResult && (
              <motion.div
                key={`q-${currentQuestion}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              >
                {/* Progress bar */}
                <div className="h-[2px] bg-border/50 mb-10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-2">
                  {currentQuestion + 1} of {questions.length}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-6 py-4 border border-border/50 text-sm font-sans text-foreground hover:border-foreground hover:bg-foreground/5 transition-all duration-300 group"
                    >
                      <span className="text-muted-foreground/40 mr-3 group-hover:text-foreground transition-colors">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {showResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="text-center"
              >
                <div className="text-6xl mb-6">{result.emoji}</div>
                <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-3">
                  Your Match
                </p>
                <h3 className="font-serif text-4xl md:text-5xl text-foreground italic mb-3">
                  {result.name}
                </h3>
                <p className="font-serif text-lg text-foreground/70 italic mb-6">
                  "{result.tagline}"
                </p>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-md mx-auto mb-10">
                  {result.description}
                </p>
                <div className="flex gap-4 justify-center">
                  <a
                    href={`/shop?type=${result.name.toLowerCase()}`}
                    className="font-sans text-xs uppercase editorial-spacing px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
                  >
                    Shop {result.name}
                  </a>
                  <button
                    onClick={reset}
                    className="font-sans text-xs uppercase editorial-spacing px-8 py-4 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300"
                  >
                    Retake
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StrainQuiz;
