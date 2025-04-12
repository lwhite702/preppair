
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
          title="Ace Your Next Interview with AI-Powered Guidance" 
          subtitle="Upload your resume and job description. Get a personalized interview guide with targeted questions, answers, and strategies."
          action={
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg">
                {user 
                  ? "Go to Dashboard" 
                  : "Get Started Free"} 
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
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
