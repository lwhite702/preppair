
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
import { useScreenSize } from "@/hooks/use-mobile";

const InterviewCalendar = () => {
  const { user } = useAuth();
  const { isMobile } = useScreenSize();
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
    <Card className="w-full shadow-sm">
      <CardHeader className={`flex flex-row items-center justify-between ${isMobile ? 'px-3 py-3' : 'pb-2'}`}>
        <div>
          <CardTitle className={isMobile ? 'text-lg' : 'text-2xl font-bold'}>Interview Calendar</CardTitle>
          <CardDescription className={isMobile ? 'text-xs' : ''}>
            Track your interviews and follow-ups
          </CardDescription>
        </div>
        <Button 
          size={isMobile ? "sm" : "default"} 
          className="gap-1 md:gap-2" 
          onClick={() => setIsAddEventOpen(true)}
        >
          <CalendarIcon className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
          {isMobile ? "Add" : "Add Event"}
        </Button>
      </CardHeader>
      
      <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar" className={isMobile ? 'text-xs' : ''}>Calendar</TabsTrigger>
            <TabsTrigger value="upcoming" className={isMobile ? 'text-xs' : ''}>
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              <div className="md:col-span-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="rounded-md border p-2 md:p-4">
                  <h3 className={`font-medium mb-2 md:mb-4 ${isMobile ? 'text-sm' : ''}`}>
                    Events for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32 md:h-40">
                      <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-primary" />
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
            <div className="space-y-2 md:space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-32 md:h-40">
                  <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-primary" />
                </div>
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <div 
                    key={event.id}
                    className="p-2 md:p-4 rounded-lg border hover:border-primary/50 transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{event.title}</h4>
                        <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground mt-1`}>
                          {renderEventTime(event.startTime)}
                        </div>
                        {event.description && (
                          <p className={`mt-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>{event.description}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${getEventTypeBadgeClass(event.type)}`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                    </div>
                    <div className="mt-2 md:mt-3 flex justify-end gap-2">
                      {!event.completed && (
                        <Button 
                          variant="outline" 
                          size={isMobile ? "sm" : "default"}
                          className={isMobile ? "text-xs h-7 px-2" : ""}
                          onClick={() => markEventCompleted(event.id)}
                          disabled={isUpdating}
                        >
                          Mark Completed
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
