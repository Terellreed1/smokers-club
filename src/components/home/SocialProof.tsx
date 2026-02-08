import { Star } from "lucide-react";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

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

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const SocialProof = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GoogleLogo />
            <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground">
              Verified Reviews
            </p>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            What They Say
          </h2>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          staggerDelay={0.12}
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-background border border-border/50 p-10 text-center transition-all duration-500 hover:border-border"
            >
              {/* Google icon + stars */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <GoogleLogo />
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans italic mb-6">
                "{review.text}"
              </p>
              <p className="text-xs font-sans uppercase editorial-spacing text-foreground/70">
                {review.name}
              </p>
            </div>
          ))}
        </StaggerContainer>

        <ScrollReveal className="text-center">
          <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-6">
            Follow the Movement
          </p>
          <div className="flex justify-center gap-6">
            {["Instagram", "Facebook", "Twitter"].map((platform, i) => (
              <a
                key={i}
                href="#"
                className="w-12 h-12 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300"
                aria-label={platform}
              >
                <span className="text-xs font-sans uppercase">{platform.charAt(0)}</span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SocialProof;
