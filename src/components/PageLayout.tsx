import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background noise-texture warm-wash">
      <Navbar />
      <PageTransition>
        <main className="pt-20">{children}</main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default PageLayout;
