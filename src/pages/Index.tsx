
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
        <Hero 
          title="Your AI Interview Partner" 
          subtitle="Land Your Dream Job with Confidence"
          description="We pair you with a personal AI interview coach that provides custom prep guides, tailored feedback, and smart follow-up tools. Prep together. Succeed together."
          action={
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="px-8 py-6 text-lg font-medium transition-all hover:scale-105">
                {user 
                  ? "Go to Dashboard" 
                  : "Get Started For Free"} 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          }
          secondaryAction={
            !user ? (
              <Link to="/auth">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium border-white/30 text-white hover:bg-white/20 transition-all">
                  Sign In
                </Button>
              </Link>
            ) : undefined
          }
        />
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
      <Footer />
    </div>
  );
};

export default Index;
