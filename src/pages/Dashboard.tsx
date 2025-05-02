
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
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { profile } = useAuth();
  const { guides, isLoadingGuides, fetchGuides } = useGuides(profile?.id);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(null);
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSelectedGuide(null);
  };

  const handleGuideSelect = (guide: InterviewGuide) => {
    setSelectedGuide(guide);
  };

  return (
    <ProtectedRoute>
      <div className="container py-4 px-3 md:py-6 md:px-6 max-w-7xl">
        {profile && <DashboardHeader 
          profile={profile} 
          guidesCount={guides.length} 
        />}
        
        <Separator className="my-4 md:my-6" />
        
        <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className={`grid ${isMobile ? "grid-cols-2 mb-4" : "grid-cols-4 mb-8"}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            {isMobile ? null : <TabsTrigger value="calendar">Calendar</TabsTrigger>}
            {isMobile ? null : <TabsTrigger value="feedback">Feedback</TabsTrigger>}
          </TabsList>
          
          {isMobile && (
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>
          )}
          
          <div className="space-y-4 md:space-y-8">
            {selectedTab === "overview" && (
              <DashboardOverview 
                guides={guides}
                isLoading={isLoadingGuides}
                onGuideSelect={handleGuideSelect}
              />
            )}
            
            {selectedTab !== "overview" && (
              <TabContent
                selectedTab={selectedTab}
                guides={guides}
                isLoading={isLoadingGuides}
                selectedGuide={selectedGuide}
                onGuideSelect={handleGuideSelect}
                onRefresh={fetchGuides}
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
