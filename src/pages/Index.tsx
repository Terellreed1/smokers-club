import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import StrainQuiz from "@/components/home/StrainQuiz";
import CorePillars from "@/components/home/CorePillars";
import ProductsPreview from "@/components/home/ProductsPreview";
import SocialProof from "@/components/home/SocialProof";
import DeliveryMap from "@/components/home/DeliveryMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BrandCarousel />
        <ProductsPreview />
        <StrainQuiz />
        <CorePillars />
        <DeliveryMap />
        <SocialProof />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
