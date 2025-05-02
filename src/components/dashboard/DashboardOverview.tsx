
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InterviewGuide } from "@/lib/types";
import RecentGuides from "./RecentGuides";
import SubscriptionStatus from "./SubscriptionStatus";
import PremiumComparison from "./PremiumComparison";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useScreenSize } from "@/hooks/use-mobile";

export interface DashboardOverviewProps {
  guides: InterviewGuide[];
  isLoading: boolean;
  onGuideSelect: (guide: InterviewGuide) => void;
}

const DashboardOverview = ({ guides, isLoading, onGuideSelect }: DashboardOverviewProps) => {
  const { profile } = useAuth();
  const { isMobile } = useScreenSize();
  
  const { 
    isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    isLoadingSubscription,
    handleCreateSubscription,
    handleManageSubscription
  } = useSubscription(profile?.id);

  const upcomingInterviews = guides.filter(guide => guide.status === "interview_scheduled");
  const pendingFeedback = guides.filter(guide => guide.status === "interview_completed" && !guide.feedback);
  
  return (
    <div className="space-y-6 md:space-y-8">
      <Card className="shadow-sm">
        <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
          <CardTitle className={isMobile ? 'text-lg' : ''}>Recent Guides</CardTitle>
          <CardDescription className={isMobile ? 'text-xs' : ''}>
            Your most recently created interview guides
          </CardDescription>
        </CardHeader>
        <RecentGuides 
          guides={guides.slice(0, 5)} 
          isLoading={isLoading} 
          onViewGuide={onGuideSelect} 
        />
      </Card>
      
      <div className="space-y-6">
        <SubscriptionStatus 
          isSubscribed={isSubscribed}
          subscriptionTier={subscriptionTier}
          subscriptionEnd={subscriptionEnd}
          isLoadingSubscription={isLoadingSubscription}
          onManageSubscription={handleManageSubscription}
          onCreateSubscription={handleCreateSubscription}
        />
        
        <Card className="shadow-sm">
          <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
            <CardTitle className={isMobile ? 'text-lg' : ''}>Quick Stats</CardTitle>
            <CardDescription className={isMobile ? 'text-xs' : ''}>
              Your interview preparation at a glance
            </CardDescription>
          </CardHeader>
          <CardContent className={`${isMobile ? 'p-3' : 'p-6'} grid grid-cols-2 gap-2 md:gap-4`}>
            <StatCard 
              label="Guides Created" 
              value={guides.length.toString()} 
              isMobile={isMobile} 
            />
            <StatCard 
              label="Upcoming Interviews" 
              value={upcomingInterviews.length.toString()} 
              isMobile={isMobile} 
            />
            <StatCard 
              label="Pending Feedback" 
              value={pendingFeedback.length.toString()} 
              isMobile={isMobile} 
            />
            <StatCard 
              label="Account Age" 
              value={profile?.createdAt ? 
                `${Math.floor((new Date().getTime() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                "-"} 
              isMobile={isMobile} 
            />
          </CardContent>
        </Card>
      </div>
      
      {!isSubscribed && (
        <PremiumComparison onUpgradeClick={handleCreateSubscription} />
      )}
    </div>
  );
};

// Extract stat card into its own component for cleaner code
const StatCard = ({ label, value, isMobile }: { label: string; value: string; isMobile: boolean }) => (
  <div className={`text-center p-2 md:p-4 bg-background rounded-lg border ${isMobile ? 'shadow-none' : 'shadow-sm'}`}>
    <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-muted-foreground mb-1`}>{label}</p>
    <p className={`${isMobile ? 'text-xl md:text-2xl' : 'text-3xl'} font-bold`}>{value}</p>
  </div>
);

export default DashboardOverview;
