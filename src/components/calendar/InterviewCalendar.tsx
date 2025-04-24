
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarIcon } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { useCalendar } from "@/hooks/useCalendar";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import NoEvents from "./components/NoEvents";
import { getEventTypeBadgeClass, getEventTypeLabel } from "./utils/eventStyles";

const InterviewCalendar = () => {
  const { user } = useAuth();
  const { 
    events, 
    isLoading, 
    isUpdating, 
    addEvent, 
    markEventCompleted,
    getUpcomingEvents 
  } = useCalendar(user?.id);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  
  const upcomingEvents = getUpcomingEvents(14);
  
  const eventsForSelectedDate = events.filter(event => {
    const eventDate = parseISO(event.startTime);
    return eventDate.getDate() === selectedDate.getDate() &&
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) setSelectedDate(date);
  };
  
  const handleAddEvent = async (newEvent: any) => {
    await addEvent(newEvent);
    setIsAddEventOpen(false);
  };

  const renderEventTime = (startTime: string) => {
    const date = parseISO(startTime);
    return isToday(date) 
      ? `Today at ${format(date, "h:mm a")}`
      : format(date, "MMM d, yyyy 'at' h:mm a");
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">Interview Calendar</CardTitle>
          <CardDescription>
            Track your interviews, follow-ups, and reminders
          </CardDescription>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setIsAddEventOpen(true)}>
          <CalendarIcon className="h-4 w-4" />
          Add Event
        </Button>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-4">
                    Events for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : eventsForSelectedDate.length > 0 ? (
                    <EventList
                      events={eventsForSelectedDate}
                      onMarkCompleted={markEventCompleted}
                      isUpdating={isUpdating}
                      getEventTypeBadgeClass={getEventTypeBadgeClass}
                      getEventTypeLabel={getEventTypeLabel}
                    />
                  ) : (
                    <NoEvents onAddEvent={() => setIsAddEventOpen(true)} />
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div 
                    key={event.id}
                    className="p-4 rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          {renderEventTime(event.startTime)}
                        </div>
                        {event.description && (
                          <p className="mt-2 text-sm">{event.description}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeBadgeClass(event.type)}`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      {!event.completed && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markEventCompleted(event.id)}
                          disabled={isUpdating}
                        >
                          Mark as Completed
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <NoEvents 
                  onAddEvent={() => setIsAddEventOpen(true)} 
                  message="No upcoming events scheduled"
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <EventForm
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onSubmit={handleAddEvent}
        isUpdating={isUpdating}
      />
    </Card>
  );
};

export default InterviewCalendar;
