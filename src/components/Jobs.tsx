
import { BriefcaseIcon, BuildingIcon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Jobs = () => {
  const stats = [
    {
      icon: <BriefcaseIcon className="h-8 w-8 text-primary" />,
      title: "Jobs Supported",
      value: "1,000+",
      description: "From entry-level to executive"
    },
    {
      icon: <BuildingIcon className="h-8 w-8 text-primary" />,
      title: "Companies",
      value: "500+",
      description: "Including Fortune 500"
    },
    {
      icon: <TrendingUpIcon className="h-8 w-8 text-primary" />,
      title: "Success Rate",
      value: "85%",
      description: "Of users land their target role"
    },
    {
      icon: <UsersIcon className="h-8 w-8 text-primary" />,
      title: "Active Users",
      value: "10,000+",
      description: "Preparing for interviews"
    }
  ];

  return (
    <section className="py-20 bg-brand-navy/90">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Success Stories
          </span>
          <h2 className="heading-lg mb-4">Helping You Land Your Dream Job</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform has helped thousands of job seekers prepare for and succeed in their interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="mb-2 bg-primary/10 p-2 rounded-lg inline-block">{stat.icon}</div>
                <CardTitle className="text-3xl font-bold gradient-text">{stat.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-1">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
