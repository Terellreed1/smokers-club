import PageLayout from "@/components/PageLayout";
import { Clock, MapPin, Truck } from "lucide-react";

const Delivery = () => {
  return (
    <PageLayout>
      <div className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-sans uppercase editorial-spacing text-gold mb-4">Service</p>
            <h1 className="font-serif text-4xl md:text-6xl text-foreground">Delivery & Shipping</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-secondary/50 border border-border/50 p-10 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-3">Delivery Zones</h3>
              <p className="text-sm text-muted-foreground font-sans">Maryland, Washington D.C., Virginia</p>
            </div>
            <div className="bg-secondary/50 border border-border/50 p-10 text-center">
              <Clock className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-3">Business Hours</h3>
              <p className="text-sm text-muted-foreground font-sans">Mon–Sat: 10am – 9pm</p>
              <p className="text-sm text-muted-foreground font-sans">Sunday: 11am – 7pm</p>
            </div>
            <div className="bg-secondary/50 border border-border/50 p-10 text-center">
              <Truck className="w-8 h-8 text-gold mx-auto mb-4" />
              <h3 className="font-serif text-xl mb-3">Shipping</h3>
              <p className="text-sm text-muted-foreground font-sans">Same-day delivery available for qualifying orders</p>
            </div>
          </div>

          {/* Delivery Guidelines */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">Delivery Guidelines</h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed font-sans">
              <p>All orders must be placed by a person aged 21 or older. A valid government-issued photo ID is required at the time of delivery.</p>
              <p>Delivery times may vary based on order volume and location. Most orders within our service area arrive within 1–3 hours during business hours.</p>
              <p>For orders placed after business hours, delivery will be scheduled for the next available delivery window.</p>
              <p>Minimum order requirements may apply depending on your delivery zone. Contact us for specific details regarding your area.</p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">Service Area</h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <div className="aspect-video bg-secondary/80 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-gold/30 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground font-sans">Interactive delivery map — MD, DC & VA</p>
                <p className="text-xs text-muted-foreground/60 font-sans mt-1">Coming in Phase 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Delivery;
