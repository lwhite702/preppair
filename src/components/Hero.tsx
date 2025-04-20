
import React from 'react';
import { Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Complex gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141B40] via-[#1A237E] to-[#283593] opacity-90" />
      
      {/* Animated floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-[#4FC3F7] to-[#00B0FF] rounded-full blur-xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-[#7C4DFF] to-[#651FFF] rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-[#448AFF] to-[#2979FF] rounded-full blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo above title */}
          <div className="mb-8 flex justify-center">
            <img
              src="/lovable-uploads/39c7204a-3071-4ad6-a1da-957a62a4903f.png"
              alt="PrepPair Logo"
              className="h-24 w-24 animate-fade-in"
            />
          </div>
          
          {/* Main Title with glow effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight [text-shadow:_0_0_40px_rgba(33,150,243,0.3)] animate-fade-in">
            Your AI Interview Partner
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Get personalized interview guides, smart feedback, and coaching from your AI mentor.
          </p>
          
          {/* CTA Buttons with improved styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:400ms]">
            <RouterLink to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="bg-gradient-to-r from-[#F97316] to-[#FF8C42] hover:opacity-90 text-white px-8 py-6 text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                {user ? "Go to Dashboard" : "Get Started Free"}
                <Sparkle className="ml-2 h-5 w-5" />
              </Button>
            </RouterLink>
            {!user && (
              <RouterLink to="/auth">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg">
                  Sign In
                </Button>
              </RouterLink>
            )}
          </div>
          
          {/* Feature Badges with glass effect */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:600ms]">
            <FeatureBadge>AI-Powered</FeatureBadge>
            <FeatureBadge>Smart Feedback</FeatureBadge>
            <FeatureBadge>Personal Coach</FeatureBadge>
            <FeatureBadge>Proven Results</FeatureBadge>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureBadge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white hover:bg-white/15 transition-colors">
      <Sparkle className="h-4 w-4 text-[#F97316]" />
      <span className="text-sm font-medium">{children}</span>
    </div>
  );
};

export default Hero;
