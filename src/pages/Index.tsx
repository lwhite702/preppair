
import React from 'react';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import Jobs from "@/components/Jobs";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";
import PremiumComparison from "@/components/dashboard/PremiumComparison";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
        <div id="pricing">
          <Pricing />
          <PremiumComparison onUpgradeClick={() => {}} />
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
