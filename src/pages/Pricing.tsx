import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription, isSubscribed, subscriptionTier, isLoading: isLoadingSubscription } = useSubscription(user?.id);

  const handleSubscribe = async () => {
    try {
      if (!user) {
        toast.info("Please sign in to subscribe");
        navigate("/auth");
        return;
      }

      toast.loading("Preparing checkout...");
      
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          returnUrl: window.location.origin + "/dashboard",
          priceId: "premium-monthly"
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error starting checkout:", error);
      toast.error("Failed to start checkout. Please try again.");
    }
  };

  const handleManageSubscription = async () => {
    try {
      if (!user) {
        toast.error("You must be logged in to manage your subscription");
        return;
      }

      toast.loading("Loading customer portal...");
      
      const { data, error } = await supabase.functions.invoke("customer-portal", {
        body: { returnUrl: window.location.origin + "/dashboard" }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No portal URL returned");
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("Failed to open subscription management. Please try again.");
    }
  };

  // Check if user has an active subscription
  const isPremium = (subscription?.status === "active" && subscription?.tier === "premium") || 
                   (isSubscribed && subscriptionTier === "premium");

  const PricingFeature = ({ included, name }: { included: boolean; name: string }) => (
    <div className="flex items-center gap-3">
      {included ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={!included ? "text-gray-500" : ""}>{name}</span>
    </div>
  );

  return (
    <div className="container max-w-5xl py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get the interview preparation help you need with our simple pricing options
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <Card className="relative border-2">
          <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-lg text-sm font-medium">
            Free
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Basic</CardTitle>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold tracking-tight">$0</span>
              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </div>
            <CardDescription>
              Get started with essential interview prep
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="space-y-4">
              <PricingFeature included={true} name="Basic interview guide" />
              <PricingFeature included={true} name="First 2 sections only" />
              <PricingFeature included={true} name="Job description analysis" />
              <PricingFeature included={true} name="Resume parsing" />
              <PricingFeature included={false} name="STAR Story Builder" />
              <PricingFeature included={false} name="Follow-up email generator" />
              <PricingFeature included={false} name="Smart questions generator" />
              <PricingFeature included={false} name="Tone customization" />
              <PricingFeature included={false} name="Full interview guide" />
              <PricingFeature included={false} name="Post-interview workflow" />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Continue With Free
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-2 border-primary">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-lg text-sm font-medium">
            Recommended
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Premium</CardTitle>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold tracking-tight">$24.99</span>
              <span className="text-sm font-medium text-muted-foreground">/month</span>
            </div>
            <CardDescription>
              Complete interview coaching experience
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <div className="space-y-4">
              <PricingFeature included={true} name="Complete, tailored interview guide" />
              <PricingFeature included={true} name="All guide sections unlocked" />
              <PricingFeature included={true} name="Enhanced job description analysis" />
              <PricingFeature included={true} name="Advanced resume parsing" />
              <PricingFeature included={true} name="STAR Story Builder" />
              <PricingFeature included={true} name="Follow-up email generator" />
              <PricingFeature included={true} name="Smart questions generator" />
              <PricingFeature included={true} name="Tone customization" />
              <PricingFeature included={true} name="Post-interview reflection tools" />
              <PricingFeature included={true} name="Interview calendar & reminders" />
            </div>
          </CardContent>
          <CardFooter>
            {isPremium ? (
              <Button 
                className="w-full"
                variant="default"
                onClick={handleManageSubscription}
              >
                Manage Subscription
              </Button>
            ) : (
              <Button 
                className="w-full"
                variant="default"
                onClick={handleSubscribe}
              >
                {isSubscribed ? "Upgrade Plan" : "Get Premium"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-left">
          <div>
            <h3 className="font-medium mb-2">What's included in the Premium plan?</h3>
            <p className="text-muted-foreground">
              The Premium plan gives you access to the full interview guide with all sections, STAR story templates, follow-up email generator, and post-interview workflow tools.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. You'll continue to have access to Premium features until the end of your billing period.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-2">How does the interview guide help me?</h3>
            <p className="text-muted-foreground">
              Our AI-powered interview guide analyzes your resume and the job description to create personalized interview questions, talking points, and STAR story templates that will help you showcase your skills and experience effectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
