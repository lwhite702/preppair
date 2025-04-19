
import React from 'react';
import { ArrowRight, MessageSquare, LucideIcon, Star, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link as RouterLink } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  action: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

const Hero = ({ title, subtitle, description, action, secondaryAction }: HeroProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-navy to-brand-purple relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-purple/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Logo and brand */}
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="/lovable-uploads/39c7204a-3071-4ad6-a1da-957a62a4903f.png" 
                alt="PrepPair Logo"
                className="h-16 md:h-24 animate-pulse-gentle rounded-full shadow-lg"
              />
              <div className="text-4xl md:text-5xl font-bold text-white">
                <span className="gradient-text">PrepPair</span>
              </div>
            </div>
            
            {/* Concept explanation */}
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white text-sm font-medium mb-6 flex items-center gap-2">
              <span>AI</span>
              <span>+</span>
              <span>Interview Prep</span>
              <span>=</span>
              <span className="bg-primary px-2 py-0.5 rounded-full">Your Success Partner</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in text-white tracking-tight">
              {title}
            </h1>
            
            <h2 className="text-2xl font-semibold mb-6 text-white/80 animate-fade-in">
              {subtitle}
            </h2>
            
            {description && (
              <p className="text-lg md:text-xl text-white/70 mb-8 animate-fade-in">
                {description}
              </p>
            )}
            
            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <FeatureBadge icon={Star}>Personalized</FeatureBadge>
              <FeatureBadge icon={MessageSquare}>AI Feedback</FeatureBadge>
              <FeatureBadge icon={Users}>Interview Partner</FeatureBadge>
              <FeatureBadge icon={CheckCircle}>Results Focused</FeatureBadge>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              {action}
              {secondaryAction}
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg
          className="relative block w-full h-12 md:h-16 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

interface FeatureBadgeProps {
  children: React.ReactNode;
  icon: LucideIcon;
}

const FeatureBadge = ({ children, icon: Icon }: FeatureBadgeProps) => {
  return (
    <div className="bg-white/20 backdrop-blur-md shadow-md border border-white/30 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-sm">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </div>
  );
};

export default Hero;
