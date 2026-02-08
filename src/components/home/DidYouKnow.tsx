import ScrollReveal from "./ScrollReveal";

const DidYouKnow = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-8">
            Did You Know
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground/90">
            The cannabis plant has been cultivated for over{" "}
            <span className="italic text-gold">12,000 years</span>, making it one
            of humanity's oldest agricultural crops — revered across civilizations
            for its medicinal, spiritual, and industrial value.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DidYouKnow;
