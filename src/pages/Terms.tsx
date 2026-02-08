import PageLayout from "@/components/PageLayout";

const Terms = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Legal</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">Terms & Conditions</h1>
          </div>

          <div className="space-y-10 text-sm text-muted-foreground leading-relaxed font-sans">
            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Age Requirement</h2>
              <p>You must be at least 21 years of age to access and use this website and to purchase any products. By accessing this site, you confirm that you meet this age requirement.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Product Information</h2>
              <p>All products are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes and may differ from the actual product.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Orders & Delivery</h2>
              <p>All orders are subject to acceptance and availability. Delivery times are estimates and may vary. We reserve the right to refuse any order at our discretion.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Stay High shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">Governing Law</h2>
              <p>These terms are governed by the laws of the jurisdictions in which we operate (Maryland, Washington D.C., and Virginia).</p>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;
