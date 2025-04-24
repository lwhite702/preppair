import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Loader2, Check, AlertCircle, Clock, CalendarPlus } from "lucide-react";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useJobTracker } from "@/hooks/useJobTracker";
import { InterviewGuide, JobStatus, HiringDecision } from "@/lib/types";
import { toast } from "sonner";

interface JobStatusManagerProps {
  guide: InterviewGuide;
  onStatusUpdate?: () => void;
}

const JobStatusManager = ({ guide, onStatusUpdate }: JobStatusManagerProps) => {
  const { updateJobStatus, updateInterviewDate, updateHiringDecision, isUpdating } = useJobTracker(guide.userId);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [interviewDate, setInterviewDate] = useState(guide.interviewDate || format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  
  const getStatusLabel = () => {
    switch (guide.status) {
      case "applied":
        return "Applied";
      case "interview_scheduled":
        return "Interview Scheduled";
      case "interview_completed":
        return "Interview Completed";
      case "feedback_provided":
        return "Feedback Provided";
      case "follow_up_sent":
        return "Follow-up Sent";
      case "pending_decision":
        return "Awaiting Decision";
      case "offer_received":
        return "Offer Received";
      case "rejected":
        return "Rejected";
      case "accepted":
        return "Offer Accepted";
      case "declined":
        return "Offer Declined";
      default:
        return "Applied";
    }
  };
  
  const getStatusBadgeVariant = () => {
    switch (guide.status) {
      case "applied":
        return "default";
      case "interview_scheduled":
        return "outline";
      case "interview_completed":
        return "secondary";
      case "feedback_provided":
      case "follow_up_sent":
        return "outline";
      case "pending_decision":
        return "secondary";
      case "offer_received":
        return "outline";
      case "rejected":
        return "destructive";
      case "accepted":
        return "outline";
      case "declined":
        return "outline";
      default:
        return "default";
    }
  };
  
  const handleUpdateStatus = async (newStatus: JobStatus) => {
    await updateJobStatus(guide.id, newStatus);
    if (onStatusUpdate) onStatusUpdate();
    toast.success(`Status updated to ${getStatusLabel()}`);
  };
  
  const handleScheduleInterview = async () => {
    await updateInterviewDate(guide.id, interviewDate);
    setIsUpdateDialogOpen(false);
    if (onStatusUpdate) onStatusUpdate();
    toast.success("Interview scheduled successfully");
  };
  
  const handleUpdateHiringDecision = async (decision: HiringDecision) => {
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
  
  const renderNextStepsSection = () => {
    const today = new Date();
    const isInterviewToday = guide.interviewDate && 
      isBefore(parseISO(guide.interviewDate), new Date(today.setHours(23, 59, 59)));
    
    switch (guide.status) {
      case "applied":
        return (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Next Steps</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You've applied for this position. When is your interview scheduled?
            </p>
            <Button onClick={() => setIsUpdateDialogOpen(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
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
                {format(parseISO(guide.interviewDate!), "EEEE, MMMM d, yyyy 'at' h:mm a")}
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
                onClick={() => setIsUpdateDialogOpen(true)}
              >
                Change Date
              </Button>
              <Button
                onClick={() => handleUpdateStatus("interview_completed")}
                disabled={!isInterviewToday || isUpdating}
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
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
            <Button onClick={() => handleUpdateStatus("feedback_provided")}>
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
            <Button onClick={() => handleUpdateStatus("follow_up_sent")}>
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
                onClick={() => handleUpdateHiringDecision("offer_received")}
                disabled={isUpdating}
              >
                <Check className="h-4 w-4 mr-2" />
                Got an Offer!
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleUpdateHiringDecision("rejected")}
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
                onClick={() => handleUpdateStatus("accepted")}
                disabled={isUpdating}
              >
                Accept Offer
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleUpdateStatus("declined")}
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
      
      default:
        return null;
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
              <Badge variant={getStatusBadgeVariant() as any}>
                {getStatusLabel()}
              </Badge>
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
        
        {renderNextStepsSection()}
        
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Set the date and time for your interview with {guide.company}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="interviewDate">Interview Date and Time</Label>
                <Input
                  id="interviewDate"
                  type="datetime-local"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleScheduleInterview} 
                disabled={!interviewDate || isUpdating}
              >
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Schedule Interview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default JobStatusManager;
