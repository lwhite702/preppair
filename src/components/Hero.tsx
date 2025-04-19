
import React from 'react';
import { ArrowRight, Star, MessageSquare, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-white via-[#FEF7CD] to-[#FDE1D3] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/d6e0d578-e565-4328-9674-dc490a7d6dec.png')] opacity-5 bg-cover bg-center" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#403E43] text-sm mb-8">
            <span className="text-[#F97316]">✨</span>
            A Product by Wrelik Brands LLC
          </div>
          
          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#221F26] leading-tight">
            Your AI Interview Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-[#403E43] mb-8 max-w-2xl mx-auto">
            Get personalized interview guides, smart feedback, and coaching from your AI mentor. Land your dream job with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <RouterLink to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white px-8 py-6 text-lg shadow-lg">
                {user ? "Go to Dashboard" : "Get Started Free"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </RouterLink>
            {!user && (
              <RouterLink to="/auth">
                <Button variant="outline" size="lg" className="border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10 px-8 py-6 text-lg">
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
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#403E43]">
      <Icon className="h-4 w-4 text-[#F97316]" />
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Hero;
