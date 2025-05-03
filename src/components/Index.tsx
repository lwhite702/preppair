
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Jobs from "@/components/Jobs";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <main className="flex-grow"> {/* Remove padding-top, header takes care of spacing */}
        <Hero />
        <HowItWorks />
        <div id="features">
          <Features />
        </div>
        <div id="jobs">
          <Jobs />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="blog">
          <Blog />
        </div>
      </main>
    </div>
  );
};

export default Index;
