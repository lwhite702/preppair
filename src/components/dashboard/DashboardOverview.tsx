import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewGuide } from "@/lib/types";
import RecentGuides from "./RecentGuides";
import SubscriptionStatus from "./SubscriptionStatus";
import PremiumComparison from "./PremiumComparison";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";

export interface DashboardOverviewProps {
  guides: InterviewGuide[];
  isLoading: boolean;
  onGuideSelect: (guide: InterviewGuide) => void;
}

const DashboardOverview = ({ guides, isLoading, onGuideSelect }: DashboardOverviewProps) => {
  const { profile } = useAuth();
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Recent Guides</CardTitle>
          <CardDescription>Your most recently created interview guides</CardDescription>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your interview preparation at a glance</CardDescription>
          </CardHeader>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Guides Created</p>
              <p className="text-3xl font-bold">{guides.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Upcoming Interviews</p>
              <p className="text-3xl font-bold">{upcomingInterviews.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Pending Feedback</p>
              <p className="text-3xl font-bold">{pendingFeedback.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Account Age</p>
              <p className="text-3xl font-bold">
                {profile?.createdAt ? 
                  `${Math.floor((new Date().getTime() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                  "-"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      {!isSubscribed && (
        <PremiumComparison onUpgradeClick={handleCreateSubscription} />
      )}
    </div>
  );
};

export default DashboardOverview;
