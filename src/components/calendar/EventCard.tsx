
import { format } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, FileText, Mail, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  event: CalendarEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Get event type icon
  const getEventIcon = () => {
    switch (event.type) {
      case "interview":
        return <Calendar className="h-4 w-4 text-primary" />;
      case "follow-up":
        return <Mail className="h-4 w-4 text-primary" />;
      case "reminder":
        return <AlertCircle className="h-4 w-4 text-primary" />;
      default:
        return <Calendar className="h-4 w-4 text-primary" />;
    }
  };

  // Get event type label
  const getEventTypeLabel = () => {
    switch (event.type) {
      case "interview":
        return "Interview";
      case "follow-up":
        return "Follow-up";
      case "reminder":
        return "Reminder";
      default:
        return "Event";
    }
  };

  // Format time
  const formatEventTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  return (
    <Card className="bg-white dark:bg-[#1D2448]">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{event.title}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {formatEventTime(event.startTime)}
              {event.endTime && <span> - {formatEventTime(event.endTime)}</span>}
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getEventIcon()}
            {getEventTypeLabel()}
          </Badge>
        </div>
        
        {event.description && (
          <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
            {event.description}
          </p>
        )}
        
        {event.guideId && (
          <div className="mt-3 flex items-center text-xs text-primary">
            <FileText className="h-3 w-3 mr-1" />
            <span>View associated guide</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
