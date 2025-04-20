
import React from 'react';
import { Sparkle, Users, Code, Rocket, Leaf, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-white/5">
      <Header />
      <main className="flex-grow container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PrepPair.me</h1>
            <p className="text-xl text-muted-foreground">
              Your AI interview partner that turns resumes and job descriptions into personalized prep guides.
            </p>
          </div>

          {/* Our Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                PrepPair.me was born from a simple observation: interview preparation is too generic, 
                time-consuming, and often misses the mark. Our founders, after years in tech recruiting 
                and career coaching, saw candidates struggling to prepare effectively for interviews despite 
                having incredible skills and experience.
              </p>
              <p>
                We built PrepPair.me to solve this problem by creating personalized, 
                company-specific interview guides that feel like they're written by a mentor who knows 
                you personally. By combining the power of AI with expert interview knowledge, we're making 
                interview preparation more accessible, effective, and confidence-boosting for job seekers everywhere.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-16">
            <div className="bg-primary/5 rounded-lg p-8 border border-primary/10">
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-xl">
                To help job seekers present their best selves through personalized, 
                AI-powered interview guidance that feels human, mentor-like, and empowering.
              </p>
            </div>
          </section>

          {/* Our Values */}
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

          {/* How PrepPair Works */}
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

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              PrepPair.me was built by a team of former recruiters, career coaches, and engineers who understand 
              both sides of the interview process.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <TeamMember 
                name="Alex Rivera"
                role="Founder & CEO"
                bio="Former tech recruiter with 10+ years helping candidates land roles at top companies."
              />
              <TeamMember 
                name="Jordan Chen"
                role="Chief Product Officer"
                bio="Career coach and product leader focused on creating tools that empower job seekers."
              />
              <TeamMember 
                name="Taylor Kim"
                role="Head of AI"
                bio="NLP expert specializing in making AI systems that understand human context and nuance."
              />
            </div>
          </section>

          {/* Privacy & Ethics */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">Privacy & Ethics</h2>
            <div className="flex items-start gap-4 bg-muted p-6 rounded-lg">
              <Shield className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="mb-4">
                  At PrepPair.me, we take your data privacy seriously. Your resumes and job descriptions are 
                  used only to generate personalized guides and are never shared with third parties.
                </p>
                <p>
                  We're committed to ethical AI practices, ensuring our tools enhance human potential rather than 
                  replacing it. Our AI is designed to amplify your unique qualities, not standardize them.
                </p>
                <div className="mt-4">
                  <Link to="/legal">
                    <Button variant="outline" size="sm">
                      Read Our Privacy Policy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Ace Your Next Interview?</h2>
            <Link to="/create">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Create Your Free Guide
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper components
const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
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

const Step = ({ number, title, description }: { number: string, title: string, description: string }) => {
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

const TeamMember = ({ name, role, bio }: { name: string, role: string, bio: string }) => {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-medium mb-1">{name}</h3>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  );
};

export default About;
