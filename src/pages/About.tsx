import PageLayout from "@/components/PageLayout";

const About = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Our Story</p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground">About Us</h1>
          </div>

          {/* Story Sections */}
          <div className="space-y-24">
            <div>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6 italic">
                Born from the culture.
              </h2>
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-base text-muted-foreground leading-loose font-sans">
                Luxury Couriers was founded with a simple belief: cannabis is more than a product — it's a lifestyle, a community, and a movement. We emerged from the streets with a vision to elevate the experience, bringing together premium quality and authentic culture under one roof.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6 italic">
                Curated with intention.
              </h2>
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-base text-muted-foreground leading-loose font-sans">
                Every product in our collection is hand-selected from the most respected brands in the industry. We partner with cultivators and extractors who share our commitment to quality, potency, and purity. From seed to shelf, excellence is non-negotiable.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6 italic">
                For the community, always.
              </h2>
              <div className="w-12 h-px bg-gold mb-8" />
              <p className="text-base text-muted-foreground leading-loose font-sans">
                We believe in giving back. Through education, charitable involvement, and community-driven initiatives, we're building a future where cannabis is understood, respected, and accessible. Our doors are open to everyone — whether you're a connoisseur or just curious.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
