
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowRight, CalendarClock, CheckCircle2 } from "lucide-react";
import { InterviewGuide, JobStatus } from "@/lib/types";
import { format, parseISO, isToday, isFuture } from "date-fns";
import { CalendarEvent } from "@/lib/types";

interface DashboardOverviewProps {
  guides: InterviewGuide[];
  events: CalendarEvent[];
  isLoadingEvents: boolean;
  isLoadingGuides: boolean;
  onViewGuide: (guideId: string) => void;
  onSetActiveTab: (tab: string) => void;
}

const DashboardOverview = ({
  guides,
  events,
  isLoadingEvents,
  isLoadingGuides,
  onViewGuide,
  onSetActiveTab
}: DashboardOverviewProps) => {
  const getUpcomingInterviews = () => {
    return events.filter(event => 
      event.type === "interview" && 
      !event.completed && 
      (isToday(parseISO(event.startTime)) || isFuture(parseISO(event.startTime)))
    ).slice(0, 3);
  };
  
  const getJobsNeedingAction = () => {
    return guides.filter(guide => {
      // Jobs that need feedback after interview
      if (guide.status === "interview_completed") return true;
      
      // Jobs with scheduled interviews today
      if (guide.status === "interview_scheduled" && guide.interviewDate && 
          isToday(parseISO(guide.interviewDate))) {
        return true;
      }
      
      // Jobs with follow-up needed
      if (guide.status === "feedback_provided") return true;
      
      return false;
    }).slice(0, 3);
  };
  
  const getStatusActionLabel = (status?: JobStatus) => {
    switch (status) {
      case "interview_completed":
        return "Add Feedback";
      case "interview_scheduled":
        return "Prepare";
      case "feedback_provided":
        return "Send Follow-up";
      default:
        return "View";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Today's Activity Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-primary" />
          Today's Activity
        </h2>
        
        {isLoadingEvents || isLoadingGuides ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Upcoming Interviews
            </h3>
            
            <div className="space-y-3 mb-6">
              {getUpcomingInterviews().length > 0 ? (
                getUpcomingInterviews().map(interview => (
                  <div key={interview.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium">{interview.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {format(parseISO(interview.startTime), "h:mm a")}
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          if (interview.guideId) {
                            onViewGuide(interview.guideId);
                            onSetActiveTab("guides");
                          }
                        }}
                      >
                        Review Guide
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No interviews scheduled for today
                </div>
              )}
            </div>
          
            <Separator className="my-4" />
            
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Jobs Needing Action
            </h3>
            
            <div className="space-y-3">
              {getJobsNeedingAction().length > 0 ? (
                getJobsNeedingAction().map(job => (
                  <div key={job.id} className="p-3 bg-amber-50 rounded-lg">
                    <div className="font-medium">{job.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Status: {job.status?.replace('_', ' ')}
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          onViewGuide(job.id);
                          onSetActiveTab("guides");
                        }}
                      >
                        {getStatusActionLabel(job.status)}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No jobs need immediate action
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Job Application Summary */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
          Job Application Summary
        </h2>
        
        {isLoadingGuides ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-700">
                  {guides.length}
                </div>
                <div className="text-sm text-blue-600 mt-1">
                  Total Applications
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">
                  {guides.filter(g => g.status === "interview_scheduled" || g.status === "interview_completed").length}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  Interviews
                </div>
              </div>
            </div>
            
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Application Status
            </h3>
            
            <div className="space-y-2">
              {[
                { status: "applied", label: "Applied", color: "bg-gray-200" },
                { status: "interview_scheduled", label: "Interview Scheduled", color: "bg-blue-200" },
                { status: "interview_completed", label: "Interview Completed", color: "bg-indigo-200" },
                { status: "feedback_provided", label: "Feedback Provided", color: "bg-violet-200" },
                { status: "follow_up_sent", label: "Follow Up Sent", color: "bg-purple-200" },
                { status: "offer_received", label: "Offer Received", color: "bg-green-200" },
                { status: "rejected", label: "Rejected", color: "bg-red-200" }
              ].map(item => {
                const count = guides.filter(g => g.status === item.status).length;
                const percentage = guides.length > 0 ? (count / guides.length) * 100 : 0;
                
                return (
                  <div key={item.status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <Separator className="my-6" />
            
            <div className="text-center">
              <Button 
                onClick={() => {
                  onSetActiveTab("guides");
                }}
              >
                Create New Application
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
