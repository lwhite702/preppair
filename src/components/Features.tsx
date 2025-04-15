
import { BookOpen, Target, BrainCircuit, Mail } from 'lucide-react';
import FeatureCard from './features/FeatureCard';
import FeatureHeader from './features/FeatureHeader';

const Features = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Personalized Prep Guides",
      description: "Your experience + the job description = a custom-tailored prep plan. We highlight your strengths and suggest real responses.",
      image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "Behavioral & Technical Questions",
      description: "Based on industry-standard interview frameworks. Practice with purpose and stay sharp.",
      image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Smart Follow-Ups",
      description: "Your interview, your voice. We'll help you write thank-you emails and reflection summaries that don't sound templated.",
      image: "/lovable-uploads/44b0c31d-e74b-4dd2-b3b3-35b68584b8a3.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white/5 to-background">
      <div className="container">
        <FeatureHeader 
          title="Tools for Interview Success"
          description="Our AI-powered platform gives you everything you need to prepare for your next interview and land that dream job."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
