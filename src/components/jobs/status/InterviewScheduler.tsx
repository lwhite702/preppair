
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface InterviewSchedulerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  interviewDate: string;
  onInterviewDateChange: (date: string) => void;
  onSchedule: () => void;
  isUpdating: boolean;
}

const InterviewScheduler = ({
  isOpen,
  onOpenChange,
  interviewDate,
  onInterviewDateChange,
  onSchedule,
  isUpdating
}: InterviewSchedulerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
          <DialogDescription>
            Set the date and time for your interview.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="interviewDate">Interview Date and Time</Label>
            <Input
              id="interviewDate"
              type="datetime-local"
              value={interviewDate}
              onChange={(e) => onInterviewDateChange(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={onSchedule} 
            disabled={!interviewDate || isUpdating}
          >
            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Schedule Interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InterviewScheduler;
