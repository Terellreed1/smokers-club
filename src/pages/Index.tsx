import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";

import BrandCarousel from "@/components/home/BrandCarousel";
import ProductsPreview from "@/components/home/ProductsPreview";
import LiveInventory from "@/components/home/LiveInventory";
import SocialProof from "@/components/home/SocialProof";
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
    </motion.div>
  );
};

export default Index;
