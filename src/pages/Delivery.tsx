import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import DeliveryMap from "@/components/home/DeliveryMap";
import ScrollReveal from "@/components/home/ScrollReveal";
import { toast } from "sonner";

const Delivery = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    toast.success("Message sent! We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="pt-16 md:pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">
              Service & Contact
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground">
              Delivery & Contact
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Interactive Earth Map */}
      <DeliveryMap />

      {/* Contact Form — minimal, no containers */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4 text-center">
              Reach Out
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground text-center mb-16">
              Send Us a Message
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <label className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3 block">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                  className="w-full bg-transparent border-b border-border/50 focus:border-gold py-3 text-foreground font-sans text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3 block">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                  className="w-full bg-transparent border-b border-border/50 focus:border-gold py-3 text-foreground font-sans text-sm outline-none transition-colors duration-500 placeholder:text-muted-foreground/40"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-3 block">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  maxLength={1000}
                  rows={4}
                  className="w-full bg-transparent border-b border-border/50 focus:border-gold py-3 text-foreground font-sans text-sm outline-none transition-colors duration-500 resize-none placeholder:text-muted-foreground/40"
                  placeholder="How can we help?"
                />
              </div>
              <div className="text-center pt-4">
                <motion.button
                  type="submit"
                  className="text-xs font-sans uppercase editorial-spacing border border-foreground text-foreground px-12 py-4 hover:bg-foreground hover:text-background transition-all duration-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </ScrollReveal>

          {/* Email */}
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-20">
              <p className="text-xs font-sans uppercase editorial-spacing text-muted-foreground mb-2">
                Or email us directly
              </p>
              <a
                href="mailto:info@luxurycouriers.com"
                className="font-serif text-xl text-gold hover:text-gold/80 transition-colors duration-300"
              >
                info@luxurycouriers.com
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Delivery;
