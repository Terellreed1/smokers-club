import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import DidYouKnow from "@/components/home/DidYouKnow";
import CorePillars from "@/components/home/CorePillars";
import ProductsPreview from "@/components/home/ProductsPreview";
import SocialProof from "@/components/home/SocialProof";
import BrandStory from "@/components/home/BrandStory";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BrandCarousel />
        <ProductsPreview />
        <DidYouKnow />
        <CorePillars />
        <BrandStory />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
