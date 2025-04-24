
import React from 'react';
import { Sparkle, Users, Code, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const CompanyValues = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-8">Our Values</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <ValueCard 
          icon={<Sparkle className="h-8 w-8 text-primary" />} 
          title="Human-Centered"
          description="We design for humans first, creating warm, encouraging experiences that boost confidence."
        />
        <ValueCard 
          icon={<Users className="h-8 w-8 text-primary" />} 
          title="Inclusive"
          description="We help all job seekers, regardless of background, present their full potential."
        />
        <ValueCard 
          icon={<Code className="h-8 w-8 text-primary" />} 
          title="Smart & Simple"
          description="We build sophisticated AI that feels approachable and delivers clear, actionable advice."
        />
        <ValueCard 
          icon={<Rocket className="h-8 w-8 text-primary" />} 
          title="Impact-Driven"
          description="We measure success by how many people land jobs and feel confident in interviews."
        />
      </div>
    </section>
  );
};

export default CompanyValues;
