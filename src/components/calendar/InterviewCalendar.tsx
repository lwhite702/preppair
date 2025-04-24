
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { useCalendar } from "@/hooks/useCalendar";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InterviewCalendar = () => {
  const { user } = useAuth();
  const { 
    events, 
    isLoading, 
    isUpdating, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    markEventCompleted,
    getUpcomingEvents 
  } = useCalendar(user?.id);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(new Date(new Date().getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
    type: "reminder" as "interview" | "follow-up" | "reminder" | "other"
  });
  
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
  
  const handleAddEvent = async () => {
    await addEvent({
      title: newEvent.title,
      description: newEvent.description,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      type: newEvent.type
    });
    
    setNewEvent({
      title: "",
      description: "",
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endTime: format(new Date(new Date().getTime() + 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"),
      type: "reminder"
    });
    
    setIsAddEventOpen(false);
  };
  
  const handleMarkCompleted = async (id: string) => {
    await markEventCompleted(id, true);
  };
  
  const renderEventTime = (startTime: string) => {
    const date = parseISO(startTime);
    return isToday(date) 
      ? `Today at ${format(date, "h:mm a")}`
      : format(date, "MMM d, yyyy 'at' h:mm a");
  };
  
  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "interview":
        return "Interview";
      case "follow-up":
        return "Follow Up";
      case "reminder":
        return "Reminder";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  const getEventTypeBadgeClass = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-100 text-blue-800";
      case "follow-up":
        return "bg-violet-100 text-violet-800";
      case "reminder":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-indigo-100 text-indigo-800";
    }
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
        <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new calendar event for your job search.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Event title"
                  value={newEvent.title}
                  onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={newEvent.startTime}
                    onChange={e => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={newEvent.endTime}
                    onChange={e => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <select
                  id="eventType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newEvent.type}
                  onChange={e => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                >
                  <option value="reminder">Reminder</option>
                  <option value="interview">Interview</option>
                  <option value="follow_up">Follow-up</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddEvent} 
                disabled={!newEvent.title || !newEvent.startTime || !newEvent.endTime || isUpdating}
              >
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
                    <div className="space-y-3">
                      {eventsForSelectedDate.map(event => (
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
                                onClick={() => handleMarkCompleted(event.id)}
                                disabled={isUpdating}
                              >
                                Mark as Completed
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
                      <p>No events scheduled for this day</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setIsAddEventOpen(true)}
                      >
                        Add Event
                      </Button>
                    </div>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => markEventCompleted(event.id)}
                        disabled={isUpdating}
                      >
                        Mark as Completed
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-2" />
                  <p>No upcoming events scheduled</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setIsAddEventOpen(true)}
                  >
                    Add Event
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InterviewCalendar;
