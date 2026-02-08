import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What products do you carry?",
    answer: "We carry a curated selection of premium cannabis products including flower, vapes, pre-rolls, concentrates, and edibles from top-tier brands like Cookies, Raw Garden, Jeeter, 710 Labs, STIIIZY, and more.",
  },
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver to Maryland (MD), Washington D.C., and Virginia (VA). Check our Delivery page for specific zone details and business hours.",
  },
  {
    question: "Do I need to be 21 to purchase?",
    answer: "Yes, all customers must be 21 years of age or older with a valid government-issued ID to purchase cannabis products.",
  },
  {
    question: "How long does delivery take?",
    answer: "Most deliveries within our service area are completed within 1–3 hours during business hours. Same-day delivery is available for orders placed before 6 PM.",
  },
  {
    question: "Do you offer any deals or promotions?",
    answer: "Yes! We regularly feature deals on select products. Check the 'Deals' filter in our Shop to see current promotions. Sign up for an account to receive exclusive member offers.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash on delivery as well as select digital payment methods. Specific payment options will be presented at checkout.",
  },
  {
    question: "Can I return a product?",
    answer: "Due to the nature of cannabis products, all sales are final. However, if you receive a defective product, please contact us within 24 hours and we'll make it right.",
  },
];

const FAQ = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Support</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">FAQ</h1>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/50 px-8 data-[state=open]:border-gold/30 transition-colors duration-300"
              >
                <AccordionTrigger className="font-serif text-lg text-foreground hover:text-gold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-sans pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
