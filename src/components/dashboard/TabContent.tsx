import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InterviewGuide } from "@/lib/types";
import DashboardContent from "@/components/dashboard/DashboardContent";
import RecentGuides from "@/components/dashboard/RecentGuides";
import InterviewCalendar from "@/components/calendar/InterviewCalendar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { CalendarEvent } from "@/lib/types";
import JobStatusManager from "@/components/jobs/JobStatusManager";

interface TabContentProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  guides: InterviewGuide[];
  isLoadingGuides: boolean;
  events: CalendarEvent[];
  isLoadingEvents: boolean;
  selectedGuideId: string | null;
  setSelectedGuideId: (id: string | null) => void;
  generatedGuide: string | null;
  setGeneratedGuide: (content: string | null) => void;
  fetchGuides: () => void;
  handleGuideGenerated: (markdownContent: string) => void;
  handleViewGuide: (guideId: string) => void;
}

const TabContent = ({
  activeTab,
  setActiveTab,
  guides,
  isLoadingGuides,
  events,
  isLoadingEvents,
  selectedGuideId,
  setSelectedGuideId,
  generatedGuide,
  setGeneratedGuide,
  fetchGuides,
  handleGuideGenerated,
  handleViewGuide
}: TabContentProps) => {
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "guides") {
      setGeneratedGuide(null);
      setSelectedGuideId(null);
    }
  };

  const getSelectedGuide = () => {
    if (!selectedGuideId) return null;
    return guides.find(g => g.id === selectedGuideId);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="mb-8">
        <TabsTrigger value="guides">Guides</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>
      
      <TabsContent value="guides">
        {guides.length > 0 && !generatedGuide && !selectedGuideId && (
          <RecentGuides 
            guides={guides}
            isLoading={isLoadingGuides}
            onViewGuide={(guide) => {
              handleViewGuide(guide.id);
            }}
          />
        )}
        
        {generatedGuide && selectedGuideId ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <DashboardContent 
                guides={[getSelectedGuide()!]}
                onGuideGenerated={handleGuideGenerated}
                refetchGuides={fetchGuides}
                selectedGuideId={selectedGuideId}
              />
            </div>
            <div className="md:col-span-1">
              {getSelectedGuide() && (
                <JobStatusManager 
                  guide={getSelectedGuide()!} 
                  onStatusUpdate={fetchGuides}  
                />
              )}
            </div>
          </div>
        ) : (
          <DashboardContent 
            guides={guides}
            onGuideGenerated={handleGuideGenerated}
            refetchGuides={fetchGuides}
          />
        )}
      </TabsContent>
      
      <TabsContent value="calendar">
        <InterviewCalendar />
      </TabsContent>
      
      <TabsContent value="overview">
        <DashboardOverview 
          guides={guides} 
          events={events}
          isLoadingEvents={isLoadingEvents}
          isLoadingGuides={isLoadingGuides}
          onViewGuide={handleViewGuide}
          onSetActiveTab={setActiveTab}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabContent;
