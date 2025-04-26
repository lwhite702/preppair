
import { Zap, BrainCircuit, Users, MessageSquare, Calendar, Target, Star, Trophy, CheckCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Personalized Prep Guides",
      description: "Your experience + the job description = a custom-tailored prep plan. We highlight your strengths and suggest real responses."
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: "Behavioral & Technical Questions",
      description: "Based on industry-standard interview frameworks. Practice with purpose and stay sharp."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Your Interview Partner",
      description: "We pair you with AI guidance that feels like having a mentor in your corner. Never interview alone again."
    }
  ];

  const additionalFeatures = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Smart Follow-ups",
      description: "AI-powered follow-up email suggestions based on your interview feedback and outcomes."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Interview Tracker",
      description: "Keep track of all your interviews, their status, and upcoming dates in one place."
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Practice Sessions",
      description: "Interactive Q&A sessions to boost your confidence before the big day."
    },
    {
      icon: <Trophy className="h-6 w-6 text-primary" />,
      title: "Success Tracking",
      description: "Monitor your progress and celebrate your wins along the journey."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Instant Guide Generation",
      description: "Get your personalized interview prep guide instantly after uploading your information."
    },
    {
      icon: <CheckCheck className="h-6 w-6 text-primary" />,
      title: "Post-Interview Insights",
      description: "Capture what worked, what didn't, and get recommendations for improvement."
    }
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Features
          </span>
          <h2 className="heading-lg mb-4 gradient-text">Tools for Interview Success</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            PrepPair.Me gives you everything you need to prepare for your next interview with a partner by your side.
          </p>
        </div>
        
        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader className="pb-2">
                <div className="mb-4 bg-primary/10 p-4 rounded-xl inline-block transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="p-3 bg-primary/10 rounded-xl inline-block mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link to="/auth">
            <Button size="lg" className="px-8 py-6 text-lg font-medium transition-all hover:scale-105">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
