import ScrollReveal from "./ScrollReveal";
import nycSkyline from "@/assets/nyc-skyline.jpg";

const BrandStory = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* NYC background */}
      <div className="absolute inset-0">
        <img
          src={nycSkyline}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
        <ScrollReveal>
          <p className="text-[10px] font-sans uppercase editorial-spacing text-background/40 mb-6">
            Our Story
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-background italic mb-8">
            How We Got Here
          </h2>
          <p className="text-sm md:text-base font-sans text-background/60 leading-[1.9] max-w-2xl mx-auto">
            Luxury Couriers didn't start in a boardroom — it started on the block, where quality
            mattered, trust was everything, and the culture was already alive. Every strain is
            hand-selected, every product vetted. We work directly with cultivators who share our
            obsession with purity, potency, and presentation. From first click to front door,
            every touchpoint whispers excellence — discreet packaging, white-glove delivery, and a
            product that speaks for itself. This isn't just a brand. It's a movement, rewriting
            what cannabis commerce looks like, one delivery at a time.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default BrandStory;
