
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero 
          title="Your AI Interview Partner" 
          subtitle="Land Your Dream Job with Confidence"
          description="Custom prep guides, tailored feedback, and smart follow-up tools—built just for you. Prep better. Stress less. Get hired."
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
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg font-medium border-primary/30 hover:bg-primary/20 transition-all">
                  Sign In
                </Button>
              </Link>
            ) : undefined
          }
        />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Upload your resume & job posting",
      description: "We'll scan both and understand the role you're aiming for."
    },
    {
      number: 2,
      title: "Get a personalized interview guide",
      description: "AI-generated questions, answers, and insights—customized to your experience and the job."
    },
    {
      number: 3,
      title: "Track interviews and outcomes",
      description: "Stay organized with built-in status tracking, notes, and follow-up reminders."
    },
    {
      number: 4,
      title: "Reflect and follow up like a pro",
      description: "Guided post-interview self-assessment and auto-generated thank-you emails that sound like you."
    },
    {
      number: 5,
      title: "Quick Start Mode",
      description: "In a rush? Skip the extras. Just upload, click, and go."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-background/50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            How It Works
          </span>
          <h2 className="heading-lg mb-4 text-brand-navy dark:text-white">Simple Steps to Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow these steps to prepare for your next interview like a professional
          </p>
        </div>
        
        <div className="flex flex-col space-y-16 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } md:items-center gap-8`}
            >
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white relative z-10">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-primary/30 -translate-x-1/2 h-24 hidden md:block"></div>
                )}
              </div>
              
              <div className={`flex-1 ${
                index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'
              }`}>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg transition-all">
                  <h3 className="text-xl font-semibold mb-3 text-brand-navy dark:text-white flex items-center">
                    {step.title}
                    {step.number === 5 && <Sparkles className="ml-2 h-5 w-5 text-primary" />}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
