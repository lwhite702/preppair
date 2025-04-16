
import { BriefcaseIcon, BuildingIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';

const Jobs = () => {
  const stats = [
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-white" />,
      title: "Jobs Supported",
      value: "1,000+",
      description: "From entry-level to executive"
    },
    {
      icon: <BuildingIcon className="h-8 w-8 text-white" />,
      title: "Companies",
      value: "500+",
      description: "Including Fortune 500"
    },
    {
      icon: <TrendingUpIcon className="h-8 w-8 text-white" />,
      title: "Success Rate",
      value: "85%",
      description: "Of users land their target role"
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-white" />,
      title: "Active Users",
      value: "10,000+",
      description: "Preparing for interviews"
    }
  ];

  const testimonials = [
    {
      quote: "PrepPair helped me land my dream job at Google. The personalized questions were exactly what I was asked in the actual interview!",
      author: "Sarah T., Software Engineer"
    },
    {
      quote: "The follow-up email templates were perfect. I sent one after my interview and received an offer the next day.",
      author: "Michael K., Marketing Director"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-3">
            Success Stories
          </span>
          <h2 className="heading-lg mb-4 text-white">Helping You Land Your Dream Job</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Our platform has helped thousands of job seekers prepare for and succeed in their interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="mb-4 bg-white/10 p-3 rounded-xl inline-block">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <h4 className="font-semibold mb-1 text-white/90">{stat.title}</h4>
              <p className="text-white/70 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-primary/20 font-serif">"</div>
                <p className="text-white/90 text-lg italic mb-6 relative z-10">{testimonial.quote}</p>
                <p className="text-white/70 font-medium">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
