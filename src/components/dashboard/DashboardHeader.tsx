
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import SubscriptionStatus from "@/components/dashboard/SubscriptionStatus";

const DashboardHeader = () => {
  const { user } = useAuth();
  const {
    isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    isLoadingSubscription,
    handleCreateSubscription,
    handleManageSubscription
  } = useSubscription(user?.id);

  return (
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Your Interview Dashboard</h1>
        <p className="text-center text-muted-foreground">
          Create, manage, and review your personalized interview guides
        </p>
      </div>

      {user && (
        <SubscriptionStatus 
          isSubscribed={isSubscribed}
          subscriptionTier={subscriptionTier}
          subscriptionEnd={subscriptionEnd}
          isLoadingSubscription={isLoadingSubscription}
          onManageSubscription={handleManageSubscription}
          onCreateSubscription={handleCreateSubscription}
        />
      )}
    </>
  );
};

export default DashboardHeader;
