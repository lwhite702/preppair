
import React from 'react';
import { ArrowRight, Star, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-brand-navy via-brand-purple/20 to-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/d6e0d578-e565-4328-9674-dc490a7d6dec.png')] opacity-5 bg-cover bg-center" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm mb-8">
            <span className="text-[#F97316]">✨</span>
            A Product by Wrelik Brands LLC
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-to-r from-white to-white/80 leading-tight">
            Your AI Interview Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get personalized interview guides, smart feedback, and coaching from your AI mentor. Land your dream job with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <RouterLink to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white px-8 py-6 text-lg">
                {user ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </RouterLink>
            {!user && (
              <RouterLink to="/auth">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Sign In
                </Button>
              </RouterLink>
            )}
          </div>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            <FeatureBadge icon={Star}>AI-Powered</FeatureBadge>
            <FeatureBadge icon={MessageSquare}>Smart Feedback</FeatureBadge>
            <FeatureBadge icon={Users}>Personal Coach</FeatureBadge>
            <FeatureBadge icon={CheckCircle}>Proven Results</FeatureBadge>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureBadgeProps {
  children: React.ReactNode;
  icon: React.ElementType;
}

const FeatureBadge = ({ children, icon: Icon }: FeatureBadgeProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white/90">
      <Icon className="h-4 w-4 text-[#F97316]" />
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Hero;
