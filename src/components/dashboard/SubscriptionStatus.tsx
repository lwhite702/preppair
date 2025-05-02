
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { useScreenSize } from "@/hooks/use-mobile";

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
  const { isMobile } = useScreenSize();
  
  return (
    <div className="mb-6 md:mb-12 mx-auto">
      <Card className={`${isSubscribed ? 'border-primary/30 bg-primary/5' : 'border-gray-200'} shadow-sm`}>
        <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-1 md:pb-2 ${isMobile ? 'px-3 pt-3' : ''}`}>
          <div>
            <CardTitle className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}>
              Subscription Status
            </CardTitle>
            <CardDescription className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>
              {isSubscribed 
                ? `You have a ${subscriptionTier || 'premium'} subscription`
                : "Upgrade for unlimited guides"}
            </CardDescription>
          </div>
          {isSubscribed && (
            <div className="bg-primary/10 text-primary py-1 px-3 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="h-3 w-3 md:h-3.5 md:w-3.5" />
              <span>Active</span>
            </div>
          )}
        </CardHeader>
        <CardContent className={isMobile ? 'p-3' : ''}>
          <div className="space-y-3 md:space-y-4">
            {isLoadingSubscription ? (
              <div className="flex items-center space-x-2 text-muted-foreground py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className={isMobile ? 'text-sm' : ''}>Checking subscription status...</span>
              </div>
            ) : isSubscribed ? (
              <div className="space-y-3 md:space-y-4">
                <div className={`flex items-center gap-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <Clock className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-muted-foreground`} />
                  <span>
                    Your subscription renews on {subscriptionEnd ? format(subscriptionEnd, "MMMM d, yyyy") : "N/A"}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={onManageSubscription} 
                  className="w-full sm:w-auto"
                  size={isMobile ? "sm" : "default"}
                >
                  Manage Subscription
                </Button>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                  Upgrade to create unlimited interview guides, access advanced features, and more.
                </div>
                <Button 
                  onClick={onCreateSubscription} 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                  size={isMobile ? "sm" : "default"}
                >
                  Upgrade Now <ArrowRight className="ml-1 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
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
