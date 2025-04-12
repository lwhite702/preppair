
import { BookOpen, FilePlus, Calendar, Mail, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Personalized Interview Guides",
      description: "Get custom interview preparation based on your resume and the job description."
    },
    {
      icon: <FilePlus className="h-8 w-8 text-primary" />,
      title: "Tailored Questions & Answers",
      description: "Practice with behavioral, situational, and technical questions specific to the role."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Highlight Your Strengths",
      description: "Understand how to emphasize your experience and skills that best match the job requirements."
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Follow-up Templates",
      description: "Get professional email templates to send after your interview."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Interview Preparation",
      description: "Structured guidance for before, during, and after your interview."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Career Coaching Support",
      description: "Feel confident with coach-inspired guidance and motivation."
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
