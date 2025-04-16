
import { InterviewGuide } from "@/lib/types";
import GuideView from "@/components/dashboard/guide/GuideView";
import FeedbackManager from "@/components/dashboard/feedback/FeedbackManager";
import { useAuth } from "@/contexts/AuthContext";

export interface TabContentProps {
  selectedTab: string;
  guides: InterviewGuide[];
  isLoading: boolean;
  selectedGuide: InterviewGuide | null;
  onGuideSelect: (guide: InterviewGuide) => void;
  onRefresh: () => void;
}

const TabContent = ({
  selectedTab,
  guides,
  isLoading,
  selectedGuide,
  onGuideSelect,
  onRefresh
}: TabContentProps) => {
  const { user } = useAuth();

  // Helper functions to handle guide view actions
  const handleShowFeedbackForm = () => {
    // This would typically navigate to the feedback form or change state
    // Since we're in a tab content component, we'll just refresh for now
    if (onRefresh) onRefresh();
  };

  const handleReset = () => {
    // Reset the guide selection or create a new guide
    if (onRefresh) onRefresh();
  };

  // Show appropriate content based on the selected tab
  switch (selectedTab) {
    case "guides":
      return (
        <GuideView 
          selectedGuide={selectedGuide}
          markdownContent={selectedGuide?.content || ""}
          isLoading={isLoading}
          onShowFeedbackForm={handleShowFeedbackForm}
          onReset={handleReset}
          onGuideSelect={onGuideSelect}
        />
      );
    case "feedback":
      return (
        <FeedbackManager 
          selectedGuide={selectedGuide}
          isLoading={isLoading}
          onGuideSelect={onGuideSelect}
          onRefresh={onRefresh}
        />
      );
    default:
      return null;
  }
};

export default TabContent;
