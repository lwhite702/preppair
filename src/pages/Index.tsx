
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Jobs from "@/components/Jobs";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
import PremiumComparison from "@/components/dashboard/PremiumComparison";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpgradeClick = () => {
    if (user) {
      navigate('/pricing');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#141B40]">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <div id="features">
          <Features />
        </div>
        <div id="jobs">
          <Jobs />
        </div>
        <div id="pricing" className="bg-white py-16">
          <Pricing />
          <div className="container max-w-4xl mx-auto px-4 bg-white">
            <PremiumComparison onUpgradeClick={handleUpgradeClick} />
          </div>
        </div>
        <div id="blog">
          <Blog />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
