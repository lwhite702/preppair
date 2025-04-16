
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useGuides } from "@/hooks/useGuides";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import TabContent from "@/components/dashboard/TabContent";
import ProtectedRoute from "@/components/ProtectedRoute";
import { InterviewGuide } from "@/lib/types";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import JobStatusManager from "@/components/jobs/JobStatusManager"; // Fixed import

const Dashboard = () => {
  const { profile } = useAuth();
  const { guides, isLoading: guidesLoading, refreshGuides } = useGuides();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(null);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSelectedGuide(null);
  };

  const handleGuideSelect = (guide: InterviewGuide) => {
    setSelectedGuide(guide);
  };

  return (
    <ProtectedRoute>
      <div className="container py-6 max-w-7xl">
        <DashboardHeader profile={profile} guidesCount={guides.length} />
        
        <Separator className="my-6" />
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guides">Your Guides</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="feedback">Interview Feedback</TabsTrigger>
          </TabsList>
          
          <div className="space-y-8">
            {selectedTab === "overview" && (
              <DashboardOverview 
                guides={guides}
                isLoading={guidesLoading}
                onGuideSelect={handleGuideSelect}
              />
            )}
            
            {selectedTab !== "overview" && (
              <TabContent
                tab={selectedTab}
                guides={guides}
                isLoading={guidesLoading}
                selectedGuide={selectedGuide}
                onGuideSelect={handleGuideSelect}
                onRefresh={refreshGuides}
              />
            )}
            
            {selectedTab === "calendar" && !selectedGuide && (
              <InterviewCalendar />
            )}
          </div>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
