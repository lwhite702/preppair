import { GraduationCap, UserCheck, Handshake, RocketIcon } from 'lucide-react';

const Jobs = () => {
  const stats = [
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      title: "Success Rate",
      value: "85%",
      description: "Interview success rate with PrepPair.Me"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-white" />,
      title: "Career Transitions",
      value: "10,000+",
      description: "Successful career moves supported"
    },
    {
      icon: <Handshake className="h-8 w-8 text-white" />,
      title: "Top Companies",
      value: "500+",
      description: "Including Fortune 500 companies"
    },
    {
      icon: <RocketIcon className="h-8 w-8 text-white" />,
      title: "Salary Increases",
      value: "40%",
      description: "Average salary increase achieved"
    }
  ];

  const testimonials = [
    {
      quote: "PrepPair.Me's personalized interview guides were exactly what I needed. The AI-generated questions matched my actual interview perfectly!",
      author: "Sarah T., Software Engineer at Google"
    },
    {
      quote: "The follow-up email templates and post-interview analysis helped me stand out. I received multiple offers after using PrepPair.Me's strategies.",
      author: "Michael K., Marketing Director at Meta"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-3">
            Success Stories
          </span>
          <h2 className="text-4xl font-bold mb-4">Transforming Interview Preparation</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of professionals who've achieved their career goals with PrepPair.Me's AI-powered interview guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} 
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
            >
              <div className="mb-4 bg-white/10 p-3 rounded-xl inline-block">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <h4 className="font-semibold mb-1 text-white/90">{stat.title}</h4>
              <p className="text-white/70 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative hover:bg-white/10 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
              <p className="text-white/90 text-lg italic mb-6 relative z-10">{testimonial.quote}</p>
              <p className="text-white/70 font-medium">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
