
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { CalendarEvent } from "@/lib/types";

interface EventListProps {
  events: CalendarEvent[];
  onMarkCompleted: (id: string) => Promise<void>;
  isUpdating: boolean;
  getEventTypeBadgeClass: (type: string) => string;
  getEventTypeLabel: (type: string) => string;
}

const EventList = ({ 
  events, 
  onMarkCompleted, 
  isUpdating,
  getEventTypeBadgeClass,
  getEventTypeLabel 
}: EventListProps) => {
  return (
    <div className="space-y-3">
      {events.map(event => (
        <div 
          key={event.id}
          className={`p-3 rounded-lg border ${event.completed ? 'opacity-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{event.title}</h4>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {format(parseISO(event.startTime), "h:mm a")} - {format(parseISO(event.endTime), "h:mm a")}
              </div>
              {event.description && (
                <p className="mt-2 text-sm">{event.description}</p>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeBadgeClass(event.type)}`}>
              {getEventTypeLabel(event.type)}
            </span>
          </div>
          {!event.completed && (
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onMarkCompleted(event.id)}
                disabled={isUpdating}
              >
                Mark as Completed
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;

