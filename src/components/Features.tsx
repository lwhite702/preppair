
import { BookOpen, FilePlus, Calendar, Mail, Users, Target, RefreshCcw, Zap, BrainCircuit, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Personalized Prep Guides",
      description: "Your experience + the job description = a custom-tailored prep plan. We highlight your strengths and suggest real responses."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "Behavioral, Technical & Situational Prompts",
      description: "Based on industry-standard interview frameworks. Practice with purpose and stay sharp."
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Smart Follow-Ups",
      description: "Your interview, your voice. We'll help you write thank-you emails and reflection summaries that don't sound templated."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Interview Tracker",
      description: "Log dates, people, questions, results. Keep your prep organized and your career on track."
    },
    {
      icon: <Smile className="h-8 w-8 text-primary" />,
      title: "Tone Personalization",
      description: "Casual? Professional? Confident? We adjust every guide to match your natural voice and communication style."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Quick Start Mode",
      description: "No fluff. No fuss. Drop your resume + job post, and we'll auto-generate everything in seconds."
    }
  ];

  return (
    <section id="features" className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">Features Designed for Interview Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform gives you everything you need to prepare for your next interview and land that dream job.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
