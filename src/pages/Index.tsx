
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link as RouterLink } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get your personalized interview guide in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload</h3>
                <p className="text-muted-foreground">
                  Upload your resume and paste the job description
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Generate</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes both documents to create a tailored guide
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Prepare</h3>
                <p className="text-muted-foreground">
                  Study your guide and ace your interview with confidence
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials/Pricing Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">Ready to Ace Your Interview?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start creating your personalized interview guide today
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="bg-card border rounded-lg p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <div className="text-3xl font-bold mb-2">$0</div>
                  <p className="text-muted-foreground">No credit card required</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Create 1 interview guide</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Resume and job description analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Basic question preparation</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full">
                  <RouterLink to="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </RouterLink>
                </Button>
              </div>
              
              {/* Premium Tier */}
              <div className="bg-card border border-primary rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-primary text-white text-xs py-1 px-2 rounded-full">
                  POPULAR
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Premium</h3>
                  <div className="text-3xl font-bold mb-2">$9.99</div>
                  <p className="text-muted-foreground">Monthly subscription</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited interview guides</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Advanced AI-powered analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Technical question preparation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Follow-up email templates</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <span>Interview calendar</span>
                  </li>
                </ul>
                
                <Button variant="default" asChild className="w-full">
                  <RouterLink to="/dashboard">
                    Try Premium <ArrowRight className="ml-2 h-4 w-4" />
                  </RouterLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Award className="h-16 w-16" />
              </div>
              <h2 className="heading-lg mb-4">Land Your Dream Job</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of job seekers who have successfully prepared for interviews with our AI-powered guides.
              </p>
              <Button 
                variant="secondary"
                size="lg"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <RouterLink to="/dashboard">
                  Create Your Guide <ArrowRight className="ml-2 h-4 w-4" />
                </RouterLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
