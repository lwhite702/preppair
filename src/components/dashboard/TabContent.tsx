
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

  // Show appropriate content based on the selected tab
  switch (selectedTab) {
    case "guides":
      return (
        <GuideView 
          selectedGuide={selectedGuide}
          isLoading={isLoading}
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
