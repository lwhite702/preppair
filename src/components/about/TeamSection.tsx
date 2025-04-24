
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

const TeamMember = ({ name, role, bio }: TeamMemberProps) => {
  return (
    <div className="bg-card p-6 rounded-lg border">
      <h3 className="text-xl font-medium mb-1">{name}</h3>
      <p className="text-primary font-medium mb-3">{role}</p>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  );
};

const TeamSection = () => {
  return (
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
  );
};

export default TeamSection;
