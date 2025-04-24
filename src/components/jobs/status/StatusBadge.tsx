
import { Badge } from "@/components/ui/badge";
import { JobStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: JobStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusLabel = () => {
    switch (status) {
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
    switch (status) {
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

  return (
    <Badge variant={getStatusBadgeVariant() as any}>
      {getStatusLabel()}
    </Badge>
  );
};

export default StatusBadge;
