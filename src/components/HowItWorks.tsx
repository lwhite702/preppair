
import { ArrowRight, Upload, Sparkles, Send, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Upload Your Resume",
      description: "Share your resume and target job description"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Get Your Guide",
      description: "Receive a personalized interview preparation guide"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Ace Your Interview",
      description: "Feel confident and prepared for your interview"
    }
  ];

  const features = [
    {
      icon: <Send className="h-6 w-6 text-primary" />,
      title: "Smart Follow-ups",
      description: "AI-powered follow-up email suggestions based on your interview"
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Interview Tracker",
      description: "Keep track of all your interviews and their status"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Practice Sessions",
      description: "Interactive Q&A sessions to boost your confidence"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            How It Works
          </span>
          <h2 className="heading-lg mb-4">Start Preparing in Minutes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple process gets you from sign-up to interview-ready quickly and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-8 flex flex-col items-center text-center group">
              <div className="mb-4 p-4 bg-primary/10 rounded-full transform group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-primary/30" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-8">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mb-4 p-2 bg-primary/10 rounded-lg inline-block">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
