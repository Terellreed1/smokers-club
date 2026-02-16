import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import ProductsPreview from "@/components/home/ProductsPreview";
import LiveInventory from "@/components/home/LiveInventory";
import SocialProof from "@/components/home/SocialProof";
import JoinClubPopup from "@/components/JoinClubPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <BrandCarousel />
        <LiveInventory />
        <ProductsPreview />
        <SocialProof />
      </main>
      <Footer />
      <JoinClubPopup />
    </div>
  );
};

export default Index;
