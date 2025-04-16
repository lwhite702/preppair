
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useGuides } from "@/hooks/useGuides";
import { useCalendar } from "@/hooks/useCalendar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TabContent from "@/components/dashboard/TabContent";
import { JobStatusManager } from "@/components/jobs/JobStatusManager";

const Dashboard = () => {
  const { user } = useAuth();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("guides");
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  
  const { guides, isLoadingGuides, fetchGuides } = useGuides(user?.id);
  const { events, isLoading: isLoadingEvents } = useCalendar(user?.id);
  
  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    fetchGuides();
  };
  
  const handleViewGuide = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    if (guide) {
      setGeneratedGuide(guide.content);
      setSelectedGuideId(guideId);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <DashboardHeader />
          
          <div className="mt-8">
            <TabContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              guides={guides}
              isLoadingGuides={isLoadingGuides}
              events={events}
              isLoadingEvents={isLoadingEvents}
              selectedGuideId={selectedGuideId}
              setSelectedGuideId={setSelectedGuideId}
              generatedGuide={generatedGuide}
              setGeneratedGuide={setGeneratedGuide}
              fetchGuides={fetchGuides}
              handleGuideGenerated={handleGuideGenerated}
              handleViewGuide={handleViewGuide}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
