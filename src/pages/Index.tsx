import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import ProductsPreview from "@/components/home/ProductsPreview";

import SocialProof from "@/components/home/SocialProof";
import JoinClubPopup from "@/components/JoinClubPopup";
import MusicPlayer from "@/components/MusicPlayer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        
        <ProductsPreview />
        <BrandCarousel />
        <SocialProof />
      </main>
      <Footer />
      <JoinClubPopup />
      <MusicPlayer />
    </div>
  );
};

export default Index;
