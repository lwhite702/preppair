
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useJobTracker } from "@/hooks/useJobTracker";
import { InterviewGuide } from "@/lib/types";
import { toast } from "sonner";
import StatusBadge from "./status/StatusBadge";
import InterviewScheduler from "./status/InterviewScheduler";
import NextStepsSection from "./status/NextStepsSection";

interface JobStatusManagerProps {
  guide: InterviewGuide;
  onStatusUpdate?: () => void;
}

const JobStatusManager = ({ guide, onStatusUpdate }: JobStatusManagerProps) => {
  const { updateJobStatus, updateInterviewDate, updateHiringDecision, isUpdating } = useJobTracker(guide.userId);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState(guide.interviewDate || format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  
  const handleUpdateStatus = async (newStatus: typeof guide.status) => {
    await updateJobStatus(guide.id, newStatus);
    if (onStatusUpdate) onStatusUpdate();
    toast.success(`Status updated successfully`);
  };
  
  const handleScheduleInterview = async () => {
    await updateInterviewDate(guide.id, interviewDate);
    setIsUpdateDialogOpen(false);
    if (onStatusUpdate) onStatusUpdate();
  };
  
  const handleUpdateHiringDecision = async (decision: typeof guide.hiringDecision) => {
    await updateHiringDecision(guide.id, decision);
    if (onStatusUpdate) onStatusUpdate();
    
    if (decision === "offer_received") {
      toast.success("Congratulations on receiving an offer!");
    } else if (decision === "rejected") {
      toast.error("We're sorry about the rejection. Don't give up!");
    } else {
      toast.info("Hiring decision updated");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Application Status</CardTitle>
        <CardDescription>
          Track and update your job application progress
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-muted-foreground">Current Status</span>
            <div className="mt-1">
              <StatusBadge status={guide.status} />
            </div>
          </div>
          
          {guide.interviewDate && (
            <div className="text-right">
              <span className="text-sm text-muted-foreground">Interview Date</span>
              <div className="flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span className="text-sm">
                  {format(parseISO(guide.interviewDate), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <NextStepsSection
          status={guide.status}
          interviewDate={guide.interviewDate}
          onScheduleInterview={() => setIsUpdateDialogOpen(true)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateHiringDecision={handleUpdateHiringDecision}
          isUpdating={isUpdating}
        />
        
        <InterviewScheduler
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          interviewDate={interviewDate}
          onInterviewDateChange={setInterviewDate}
          onSchedule={handleScheduleInterview}
          isUpdating={isUpdating}
        />
      </CardContent>
    </Card>
  );
};

export default JobStatusManager;
