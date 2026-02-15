import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const questions = [
  "What would happen if you hired two private investigators to follow each other?",
  "How many chickens would it take to kill an elephant?",
  "If you punch yourself and it hurts, are you strong or weak?",
  "Do fish ever get thirsty?",
  "If you're waiting for the waiter, aren't you the waiter?",
  "Why is it called a building if it's already built?",
  "If you enjoy wasting time, is it really wasted?",
  "Can you daydream at night?",
  "If nothing is impossible, is it possible for something to be impossible?",
  "Why do we park in driveways but drive on parkways?",
  "If two mind readers read each other's minds, whose mind are they reading?",
  "Is a hotdog a sandwich?",
  "If you're invisible and you close your eyes, can you see through your eyelids?",
  "Do stairs go up or down?",
  "If you drop soap on the floor, is the floor clean or is the soap dirty?",
  "If Cinderella's shoe fit perfectly, why did it fall off?",
  "Why is the word 'abbreviation' so long?",
  "If tomatoes are a fruit, is ketchup a smoothie?",
  "Can you cry underwater?",
  "If a word is misspelled in the dictionary, how would we ever know?",
  "Why do we say we 'slept like a baby' when babies wake up every two hours?",
  "If pro is the opposite of con, is progress the opposite of congress?",
  "When you buy something that's 'new and improved,' what was it before?",
  "If a turtle loses its shell, is it homeless or naked?",
  "Why does mineral water that has trickled through mountains for centuries have an expiration date?",
  "If a vampire bites a zombie, does the zombie become a vampire or does the vampire become a zombie?",
  "Why do we press harder on the remote control when we know the batteries are dead?",
  "If you're born at exactly midnight, what's your birthday?",
  "Can you stand backwards on a staircase?",
  "If money doesn't grow on trees, why do banks have branches?",
  "Why do they call it rush hour when nothing moves?",
  "If a deaf person goes to court, is it still called a hearing?",
  "If you got on a plane and everyone was going to the same destination, would you still need a pilot?",
  "Do dentists go to other dentists or do they do it themselves?",
  "If you clean a vacuum cleaner, does that make you the vacuum cleaner?",
  "Why is there a 'D' in 'fridge' but not in 'refrigerator'?",
  "If two vegans are arguing, is it still called a beef?",
  "Why is vanilla ice cream white when vanilla extract is brown?",
  "If you put a chameleon in a room full of mirrors, what color does it turn?",
  "If you're on a plane going the speed of light and you walk to the front, are you going faster than the speed of light?",
];

const HighQuestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const prevQuestion = () => {
    setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">
            Thoughts While High
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-16">
            High Questions
          </h2>
        </ScrollReveal>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              className="font-serif text-xl sm:text-2xl md:text-4xl text-foreground/90 leading-relaxed italic px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              "{questions[currentIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
          <button
            onClick={prevQuestion}
            className="text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors duration-300 px-4 sm:px-6 py-3 border border-border/50 hover:border-border min-h-[44px]"
          >
            ← Prev
          </button>
          <span className="text-xs font-sans text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
          <button
            onClick={nextQuestion}
            className="text-xs font-sans uppercase editorial-spacing text-muted-foreground hover:text-foreground transition-colors duration-300 px-4 sm:px-6 py-3 border border-border/50 hover:border-border min-h-[44px]"
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighQuestions;
