
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

interface NoEventsProps {
  onAddEvent: () => void;
  message?: string;
}

const NoEvents = ({ onAddEvent, message = "No events scheduled for this day" }: NoEventsProps) => {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
      <p>{message}</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onAddEvent}
      >
        Add Event
      </Button>
    </div>
  );
};

export default NoEvents;

