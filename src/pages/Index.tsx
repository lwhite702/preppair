
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
          title="PrepPair" 
          subtitle="Your AI Interview Partner"
          description="Custom prep guides, tailored feedback, and smart follow-up tools—built just for you. Prep better. Stress less. Get hired."
          action={
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg">
                {user 
                  ? "Go to Dashboard" 
                  : "Get Started"} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          }
          secondaryAction={
            !user ? (
              <Link to="/auth">
                <Button variant="outline" size="lg">
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
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">How It Works</h2>
        </div>
        
        <div className="flex flex-col space-y-12 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
