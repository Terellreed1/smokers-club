import { Star, Instagram, Facebook, Twitter } from "lucide-react";

const reviews = [
  {
    name: "Marcus T.",
    text: "Best premium selection in the DMV. The service is unmatched — they truly treat you like family.",
    rating: 5,
  },
  {
    name: "Jade W.",
    text: "From packaging to product quality, everything screams luxury. My go-to for top-shelf flower.",
    rating: 5,
  },
  {
    name: "Devon R.",
    text: "Fast delivery, incredible strains. Luxury Couriers understands the culture and the craft.",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            What They Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-background border border-border/50 p-10 text-center transition-all duration-500 hover:border-gold/30"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans italic mb-6">
                "{review.text}"
              </p>
              <p className="text-xs font-sans uppercase editorial-spacing text-gold">
                {review.name}
              </p>
            </div>
          ))}
        </div>

        {/* Social Icons */}
        <div className="text-center">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-6">
            Follow the Movement
          </p>
          <div className="flex justify-center gap-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold transition-all duration-300"
                aria-label="Social link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
