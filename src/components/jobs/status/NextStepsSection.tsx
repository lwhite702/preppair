
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, AlertCircle } from "lucide-react";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { JobStatus, HiringDecision } from "@/lib/types";

interface NextStepsSectionProps {
  status: JobStatus;
  interviewDate?: string | null;
  onScheduleInterview: () => void;
  onUpdateStatus: (status: JobStatus) => void;
  onUpdateHiringDecision: (decision: HiringDecision) => void;
  isUpdating: boolean;
}

const NextStepsSection = ({
  status,
  interviewDate,
  onScheduleInterview,
  onUpdateStatus,
  onUpdateHiringDecision,
  isUpdating
}: NextStepsSectionProps) => {
  const today = new Date();
  const isInterviewToday = interviewDate && (
    // Check if interview is today (same day)
    format(parseISO(interviewDate), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')
  );

  switch (status) {
    case "applied":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Next Steps</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've applied for this position. When is your interview scheduled?
          </p>
          <Button onClick={onScheduleInterview}>
            Schedule Interview
          </Button>
        </div>
      );
    
    case "interview_scheduled":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Interview Scheduled</h3>
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
            <span>
              {format(parseISO(interviewDate!), "EEEE, MMMM d, yyyy 'at' h:mm a")}
            </span>
          </div>
          
          {isInterviewToday && (
            <div className="bg-primary/10 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-1">Your interview is today!</h4>
              <p className="text-sm">
                Review your guide one last time and make sure you're prepared.
              </p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onScheduleInterview}
            >
              Change Date
            </Button>
            <Button
              onClick={() => onUpdateStatus("interview_completed")}
              disabled={!isInterviewToday || isUpdating}
            >
              Mark as Completed
            </Button>
          </div>
        </div>
      );
    
    case "interview_completed":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Interview Completed</h3>
          <p className="text-sm text-muted-foreground mb-4">
            How did your interview go? Add your feedback to generate a follow-up email.
          </p>
          <Button onClick={() => onUpdateStatus("feedback_provided")}>
            Add Interview Feedback
          </Button>
        </div>
      );
    
    case "feedback_provided":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Feedback Provided</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use your feedback to generate a personalized follow-up email.
          </p>
          <Button onClick={() => onUpdateStatus("follow_up_sent")}>
            Generate Follow-up Email
          </Button>
        </div>
      );
    
    case "follow_up_sent":
    case "pending_decision":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Awaiting Decision</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've done everything right! Now we wait for the company's decision.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline"
              className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
              onClick={() => onUpdateHiringDecision("offer_received")}
              disabled={isUpdating}
            >
              <Check className="h-4 w-4 mr-2" />
              Got an Offer!
            </Button>
            <Button 
              variant="destructive"
              onClick={() => onUpdateHiringDecision("rejected")}
              disabled={isUpdating}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Got Rejected
            </Button>
          </div>
        </div>
      );
    
    case "offer_received":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Congratulations!</h3>
          <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-4">
            <h4 className="font-medium text-green-800 mb-1">You received an offer!</h4>
            <p className="text-sm text-green-700">
              Take time to consider this opportunity and make the best decision for your career.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline"
              className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
              onClick={() => onUpdateStatus("accepted")}
              disabled={isUpdating}
            >
              Accept Offer
            </Button>
            <Button 
              variant="outline"
              onClick={() => onUpdateStatus("declined")}
              disabled={isUpdating}
            >
              Decline Offer
            </Button>
          </div>
        </div>
      );
    
    case "rejected":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Don't Give Up!</h3>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-4">
            <h4 className="font-medium text-amber-800 mb-1">This isn't the end</h4>
            <p className="text-sm text-amber-700">
              Every rejection brings you one step closer to the right opportunity. 
              Keep applying and preparing with our guides.
            </p>
          </div>
          <Button variant="outline">
            Create New Guide
          </Button>
        </div>
      );
    
    case "accepted":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Congratulations on Your New Job!</h3>
          <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-4">
            <h4 className="font-medium text-green-800 mb-1">You did it!</h4>
            <p className="text-sm text-green-700">
              We're thrilled to have been part of your successful job search journey.
              Best wishes in your new role!
            </p>
          </div>
        </div>
      );
    
    case "declined":
      return (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Continuing Your Search</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You've declined this offer to find a better fit. Keep searching!
          </p>
          <Button variant="outline">
            Create New Guide
          </Button>
        </div>
      );
  }
};

export default NextStepsSection;
