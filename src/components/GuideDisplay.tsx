
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { SubscriptionTier } from "@/lib/types";
import { PremiumBadge } from "./guide/PremiumBadge";
import { UpgradeButton } from "./guide/UpgradeButton";
import { GuideActions } from "./guide/GuideActions";
import { GuideContent } from "./guide/GuideContent";
import { transformContentWithPremiumLimits } from "@/utils/premiumContent";

interface GuideDisplayProps {
  markdownContent: string;
  title?: string;
  company?: string;
  jobTitle?: string;
  candidateName?: string;
}

const GuideDisplay = ({ 
  markdownContent, 
  title,
  company,
  jobTitle,
  candidateName
}: GuideDisplayProps) => {
  const { user } = useAuth();
  const { 
    isSubscribed, 
    subscriptionTier, 
    subscription 
  } = useSubscription(user?.id);
  
  // Determine if user has premium access - support both old and new return formats
  const isPremium = (subscription?.tier === "premium" && subscription?.status === "active") || 
                    (isSubscribed && subscriptionTier === "premium");
  
  // Generate a default title if none is provided
  const displayTitle = title || (company && jobTitle ? `${jobTitle} at ${company}` : "Your Interview Guide");

  const handleUpgrade = () => {
    // Replace this with your actual upgrade flow
    window.location.href = "/pricing";
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CardTitle>{displayTitle}</CardTitle>
            {isPremium && <PremiumBadge />}
          </div>
          {candidateName && (
            <div className="text-sm text-muted-foreground">
              Candidate: {candidateName}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          {!isPremium && <UpgradeButton onClick={handleUpgrade} />}
          <GuideActions 
            markdownContent={markdownContent}
            displayTitle={displayTitle}
            candidateName={candidateName}
            isPremium={isPremium}
            transformForPrint={(content, isPrintVersion) => 
              transformContentWithPremiumLimits(content, isPremium, isPrintVersion)
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <GuideContent 
          markdownContent={markdownContent} 
          isPremium={isPremium}
          onUpgrade={handleUpgrade}
        />
      </CardContent>
    </Card>
  );
};

export default GuideDisplay;
