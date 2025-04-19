
import { ArrowRight, Upload, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Upload Your Resume",
      description: "Share your resume and target job description to get started"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Get Your Guide",
      description: "Receive a personalized interview preparation guide in seconds"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Ace Your Interview",
      description: "Feel confident and prepared for your interview"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            How It Works
          </span>
          <h2 className="heading-lg mb-4">Three Simple Steps</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple process gets you from sign-up to interview-ready in minutes.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="glass-card bg-white p-8 flex flex-col items-center text-center group">
                <div className="mb-6 p-4 bg-primary/10 rounded-full transform group-hover:scale-110 transition-transform relative">
                  {step.icon}
                  <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-primary -translate-x-1/2 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-3">Ready to start your journey?</h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of job seekers who have successfully prepared for their interviews with PrepPair.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="default" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white">
              Sign Up Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
