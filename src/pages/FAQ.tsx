import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import ScrollReveal from "@/components/home/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What do you carry?",
    answer: "Premium flower, vapes, pre-rolls, concentrates, and edibles — all hand-picked from top-tier brands. If it's not exotic, it's not on our menu.",
  },
  {
    question: "Where do you deliver?",
    answer: "We deliver to Maryland (MD), Washington D.C., and Virginia (VA). We also ship to New York, New Jersey, and Pennsylvania. Check our Delivery page for zone details and hours.",
  },
  {
    question: "How old do I need to be?",
    answer: "21+. Valid government-issued ID required. No exceptions.",
  },
  {
    question: "How fast is delivery?",
    answer: "Most deliveries land within 1–3 hours during business hours. Orders placed before 6 PM qualify for same-day delivery.",
  },
  {
    question: "What are your hours?",
    answer: "Monday – Saturday: 8:00 AM – 9:30 PM. Sunday: 10:00 AM – 8:00 PM.",
  },
  {
    question: "Do you have deals?",
    answer: "Always. We rotate deals on select products weekly. Hit the 'Deals' filter in our Shop or follow us on Instagram to stay in the loop.",
  },
  {
    question: "How do I pay?",
    answer: "Cash on delivery and select digital payment methods. Payment options are shown at checkout.",
  },
  {
    question: "Can I return something?",
    answer: "All sales are final — it's the nature of the product. But if something arrives defective, hit us up within 24 hours and we'll make it right.",
  },
  {
    question: "How do I earn points?",
    answer: "Every purchase earns you loyalty points. Stack them up and redeem for discounts on future orders. Check the Points page for the full breakdown.",
  },
  {
    question: "Is my order discreet?",
    answer: "100%. Unmarked packaging, no branding on the outside. Your business is your business.",
  },
];

const FAQ = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-4">Support</p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground">FAQ</h1>
            </div>
          </ScrollReveal>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border border-border/50 px-8 data-[state=open]:border-border transition-colors duration-300"
                >
                  <AccordionTrigger className="font-serif text-lg text-foreground hover:text-muted-foreground hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-sans pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
