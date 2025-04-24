
import React from 'react';

interface StepProps {
  number: string;
  title: string;
  description: string;
}

const Step = ({ number, title, description }: StepProps) => {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center text-primary font-semibold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-8">How PrepPair Works</h2>
      <div className="space-y-8">
        <Step 
          number="01" 
          title="Upload & Analyze"
          description="Upload your resume and job description, and our AI analyzes both to identify key skills and experience that match the role."
        />
        <Step 
          number="02" 
          title="Personalize"
          description="Select your preferred tone and interview format to create a tailored guide that matches your style."
        />
        <Step 
          number="03" 
          title="Generate Guide"
          description="Receive a comprehensive interview guide with questions, talking points, and strategies specific to your background and the role."
        />
        <Step 
          number="04" 
          title="Track & Improve"
          description="Record interview feedback, generate follow-up emails, and track your progress with our dashboard."
        />
      </div>
    </section>
  );
};

export default HowItWorks;
