
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out PrepPair",
      features: [
        "1 Interview Guide",
        "Basic Question Bank",
        "Email Support",
        "24-hour Access"
      ]
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "3 months",
      monthlyPrice: "$24.99",
      description: "For serious job seekers",
      features: [
        "Unlimited Interview Guides",
        "Advanced Question Bank",
        "Priority Support",
        "Smart Follow-ups",
        "Interview Tracking",
        "Custom Templates",
        "Team Dashboard",
        "Analytics & Reporting",
        "API Access",
        "Custom Branding"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-background to-white/5">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-3">
            Pricing
          </span>
          <h2 className="heading-lg mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include core interview preparation features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border border-white/10 bg-white shadow-lg hover:shadow-xl transition-all ${
              index === 1 ? 'transform hover:-translate-y-2' : 'hover:-translate-y-1'
            }`}>
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-primary">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground">per month when paid for {plan.period}</span>
                    )}
                    {plan.monthlyPrice && (
                      <span className="text-sm text-muted-foreground">or {plan.monthlyPrice}/month paid monthly</span>
                    )}
                  </div>
                </CardDescription>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-primary hover:bg-primary/90">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
