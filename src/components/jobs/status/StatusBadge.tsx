
import { JobStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar, 
  MessageSquare, 
  Mail, 
  Award, 
  X, 
  HelpCircle,
} from "lucide-react";

interface StatusBadgeProps {
  status?: JobStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "applied":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
          <Clock className="h-3 w-3 mr-1" /> Applied
        </Badge>
      );
    case "interview_scheduled":
      return (
        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
          <Calendar className="h-3 w-3 mr-1" /> Interview Scheduled
        </Badge>
      );
    case "interview_completed":
      return (
        <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-800">
          <MessageSquare className="h-3 w-3 mr-1" /> Interview Completed
        </Badge>
      );
    case "feedback_provided":
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800">
          <MessageSquare className="h-3 w-3 mr-1" /> Feedback Added
        </Badge>
      );
    case "follow_up_sent":
      return (
        <Badge variant="outline" className="bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/20 dark:text-sky-400 dark:border-sky-800">
          <Mail className="h-3 w-3 mr-1" /> Follow-up Sent
        </Badge>
      );
    case "offer_received":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
          <Award className="h-3 w-3 mr-1" /> Offer Received
        </Badge>
      );
    case "rejected":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          <X className="h-3 w-3 mr-1" /> Rejected
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800">
          <HelpCircle className="h-3 w-3 mr-1" /> Unknown
        </Badge>
      );
  }
};

export default StatusBadge;
