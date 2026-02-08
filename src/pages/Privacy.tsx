import PageLayout from "@/components/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Legal</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">Privacy Policy</h1>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-sans">
            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Information We Collect</h2>
              <p>We collect information you provide directly to us, including your name, email address, phone number, delivery address, and payment information when you create an account or place an order.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to process orders, communicate with you, improve our services, and comply with legal obligations. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us through our website or reach out to our customer service team.</p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
