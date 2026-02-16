import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandCarousel from "@/components/home/BrandCarousel";
import ProductsPreview from "@/components/home/ProductsPreview";
import SocialProof from "@/components/home/SocialProof";
import StoreInfo from "@/components/home/StoreInfo";
import JoinClubPopup from "@/components/JoinClubPopup";

const pageVariants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <CategoryGrid />
        <BrandCarousel />
        <ProductsPreview />
        <StoreInfo />
        <SocialProof />
      </main>
      <Footer />
      <JoinClubPopup />
    </motion.div>
  );
};

export default Index;
