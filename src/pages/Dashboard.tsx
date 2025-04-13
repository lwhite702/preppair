
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import SubscriptionStatus from "@/components/dashboard/SubscriptionStatus";
import RecentGuides from "@/components/dashboard/RecentGuides";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useSubscription } from "@/hooks/useSubscription";
import { useGuides } from "@/hooks/useGuides";

const Dashboard = () => {
  const { user } = useAuth();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  
  const {
    isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    isLoadingSubscription,
    handleCreateSubscription,
    handleManageSubscription
  } = useSubscription(user?.id);
  
  const { guides, isLoadingGuides, fetchGuides } = useGuides(user?.id);
  
  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    fetchGuides();
  };
  
  const handleViewGuide = () => {
    setGeneratedGuide(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
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

          {user && guides.length > 0 && !generatedGuide && (
            <RecentGuides 
              guides={guides}
              isLoading={isLoadingGuides}
              onViewGuide={(guide) => {
                setGeneratedGuide(guide.content);
              }}
            />
          )}

          <DashboardContent 
            guides={guides}
            onGuideGenerated={handleGuideGenerated}
            refetchGuides={fetchGuides}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
