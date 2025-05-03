
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useCalendarEvents } from "@/hooks/calendar/useCalendarEvents";
import { useAuth } from "@/contexts/AuthContext";
import EventCard from "./EventCard";

const InterviewCalendar = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { events, isLoading, fetchEvents } = useCalendarEvents(user?.id);

  // Get events for the selected date
  const selectedDateEvents = events.filter(event => {
    if (!date) return false;
    const eventDate = new Date(event.startTime);
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    );
  });
  
  // Function to get dates that have events
  const getDatesWithEvents = () => {
    const dates = events.map(event => {
      const date = new Date(event.startTime);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    });
    return dates;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
          highlightedDates={getDatesWithEvents()}
        />
      </div>
      <div className="lg:w-1/2">
        <div className="bg-gray-50 dark:bg-[#1A1F2C] p-4 rounded-lg h-full min-h-[300px]">
          <h2 className="font-medium text-lg mb-4">
            {date ? format(date, "MMMM d, yyyy") : "Select a date"}
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No events scheduled for this day
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewCalendar;
