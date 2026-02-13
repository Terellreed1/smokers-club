import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import BrandCarousel from "@/components/home/BrandCarousel";
import StrainQuiz from "@/components/home/StrainQuiz";
import CorePillars from "@/components/home/CorePillars";
import ProductsPreview from "@/components/home/ProductsPreview";
import SocialProof from "@/components/home/SocialProof";
import DeliveryMap from "@/components/home/DeliveryMap";
import MenuBoard from "@/components/home/MenuBoard";
import DropAlert from "@/components/home/DropAlert";
import ParallaxStory from "@/components/home/ParallaxStory";
import HighQuestions from "@/components/home/HighQuestions";

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
      className="min-h-screen bg-background noise-texture"
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Navbar />
      <main>
        <HeroSection />
        <div className="smoke-divider">
          <BrandCarousel />
        </div>
        <ParallaxStory />
        <div className="warm-wash">
          <ProductsPreview />
          <MenuBoard />
        </div>
        <HighQuestions />
        <div className="warm-wash">
          <StrainQuiz />
        </div>
        <CorePillars />
        <DeliveryMap />
        <SocialProof />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
