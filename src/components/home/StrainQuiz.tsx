import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import cannabisLeaf from "@/assets/cannabis-leaf.png";

interface Question {
  question: string;
  options: { label: string; scores: { indica: number; sativa: number; hybrid: number } }[];
}

const questions: Question[] = [
  {
    question: "It's Friday night. What are you doing?",
    options: [
      { label: "Already horizontal. Don't text me.", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Going out. Energy is unlimited.", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Vibing with the homies, no agenda", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "Your fridge is empty. What's the move?",
    options: [
      { label: "Order delivery and never leave this couch", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Cook a 5-star meal from scratch at 2am", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Snack run with whoever's down", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "Pick a superpower:",
    options: [
      { label: "Ability to fall asleep in 3 seconds", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "Unlimited motivation (even on Mondays)", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "Making every hangout legendary", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
  {
    question: "Your spirit animal is:",
    options: [
      { label: "A sloth on a cloud", scores: { indica: 3, sativa: 0, hybrid: 1 } },
      { label: "A hummingbird on espresso", scores: { indica: 0, sativa: 3, hybrid: 1 } },
      { label: "A golden retriever at a BBQ", scores: { indica: 1, sativa: 1, hybrid: 3 } },
    ],
  },
];

const strainResults = {
  indica: {
    name: "Indica",
    tagline: "You're not lazy. You're on energy-saving mode.",
    description: "The couch chose you. Indica strains bring that full-body melt, the kind where your blanket becomes a permanent attachment. Perfect for when \"just one more episode\" turns into the whole season.",
    roast: "You've definitely fallen asleep mid-sentence before.",
  },
  sativa: {
    name: "Sativa",
    tagline: "Your brain has 47 tabs open. And they're all fire.",
    description: "You're the one reorganizing the kitchen at midnight or writing a business plan on a napkin. Sativa keeps your mind racing — in the best way — with energy, focus, and big ideas.",
    roast: "You've started at least 3 passion projects this month.",
  },
  hybrid: {
    name: "Hybrid",
    tagline: "Perfectly balanced. As all things should be.",
    description: "You're the friend everyone wants at the function — chill enough to relax, energized enough to keep the party going. Hybrids give you the best of both worlds without committing to either.",
    roast: "You answered 'it depends' to everything in school.",
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
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Left leaf */}
      <img
        src={cannabisLeaf}
        alt=""
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-48 md:w-72 lg:w-96 opacity-10 pointer-events-none select-none -rotate-12"
        aria-hidden="true"
      />
      {/* Right leaf — mirrored */}
      <img
        src={cannabisLeaf}
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-48 md:w-72 lg:w-96 opacity-10 pointer-events-none select-none rotate-12 scale-x-[-1]"
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
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
                  4 questions. Zero judgment. We'll tell you what you already know about yourself.
                </p>
                <motion.button
                  onClick={() => setStarted(true)}
                  className="font-sans text-xs uppercase editorial-spacing px-8 py-4 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                  whileHover={{ scale: 1.05, letterSpacing: "0.25em" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Go
                </motion.button>
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
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-6 py-4 border border-border/50 text-sm font-sans text-foreground hover:border-foreground hover:bg-foreground/5 transition-all duration-300 group"
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-muted-foreground/40 mr-3 group-hover:text-gold transition-colors">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option.label}
                    </motion.button>
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
                <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3">
                  Your Match
                </p>

                {/* Animated result reveal */}
                <motion.h3
                  className="font-serif text-4xl md:text-5xl text-foreground italic mb-3"
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {result.name}
                </motion.h3>

                <motion.p
                  className="font-serif text-lg text-gold italic mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  "{result.tagline}"
                </motion.p>

                <motion.p
                  className="text-sm font-sans text-muted-foreground leading-relaxed max-w-md mx-auto mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  {result.description}
                </motion.p>

                {/* Roast line */}
                <motion.p
                  className="text-xs font-sans text-muted-foreground/50 italic mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  ({result.roast})
                </motion.p>

                <motion.div
                  className="flex gap-4 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.a
                    href={`/shop?type=${result.name.toLowerCase()}`}
                    className="font-sans text-xs uppercase editorial-spacing px-6 sm:px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 min-h-[44px] flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop {result.name}
                  </motion.a>
                  <motion.button
                    onClick={reset}
                    className="font-sans text-xs uppercase editorial-spacing px-6 sm:px-8 py-4 border border-border text-muted-foreground hover:border-foreground hover:text-foreground transition-all duration-300 min-h-[44px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Retake
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default StrainQuiz;
