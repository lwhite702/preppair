
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface SubscriptionStatusProps {
  isSubscribed: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: Date | null;
  isLoadingSubscription: boolean;
  onManageSubscription: () => void;
  onCreateSubscription: () => void;
}

const SubscriptionStatus = ({
  isSubscribed,
  subscriptionTier,
  subscriptionEnd,
  isLoadingSubscription,
  onManageSubscription,
  onCreateSubscription
}: SubscriptionStatusProps) => {
  return (
    <div className="mb-12 max-w-3xl mx-auto">
      <Card className={`${isSubscribed ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>
              {isSubscribed 
                ? `You have a ${subscriptionTier || 'premium'} subscription`
                : "Upgrade for unlimited guides and features"}
            </CardDescription>
          </div>
          {isSubscribed && (
            <div className="bg-primary/10 text-primary py-1 px-3 rounded-full text-xs font-medium">
              Active
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoadingSubscription ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Checking subscription status...</span>
              </div>
            ) : isSubscribed ? (
              <div className="space-y-2">
                <div className="text-sm">
                  Your subscription renews on {subscriptionEnd ? format(subscriptionEnd, "MMMM d, yyyy") : "N/A"}
                </div>
                <Button variant="outline" onClick={onManageSubscription}>
                  Manage Subscription
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Upgrade to create unlimited interview guides, access advanced features, and more.
                </div>
                <Button onClick={onCreateSubscription}>
                  Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStatus;
