
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  guideId?: string;
  type: "interview" | "follow_up" | "reminder";
  completed: boolean;
}

export const useCalendar = (userId: string | undefined) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const fetchEvents = async () => {
    if (!userId) {
      setEvents([]);
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("calendar_events")
        .select("*")
        .eq("user_id", userId)
        .order("start_time", { ascending: true });
      
      if (error) throw error;
      
      if (data) {
        const mappedEvents: CalendarEvent[] = data.map((event: any) => ({
          id: event.id,
          userId: event.user_id,
          title: event.title,
          description: event.description,
          startTime: event.start_time,
          endTime: event.end_time,
          guideId: event.guide_id,
          type: event.type,
          completed: event.completed
        }));
        
        setEvents(mappedEvents);
      }
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      toast.error("Failed to load your calendar");
    } finally {
      setIsLoading(false);
    }
  };
  
  const addEvent = async (event: Omit<CalendarEvent, "id" | "userId" | "completed">) => {
    if (!userId) return null;
    
    try {
      setIsUpdating(true);
      
      const { data, error } = await supabase
        .from("calendar_events")
        .insert({
          user_id: userId,
          title: event.title,
          description: event.description,
          start_time: event.startTime,
          end_time: event.endTime,
          guide_id: event.guideId,
          type: event.type,
          completed: false
        })
        .select("*")
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newEvent: CalendarEvent = {
          id: data.id,
          userId: data.user_id,
          title: data.title,
          description: data.description,
          startTime: data.start_time,
          endTime: data.end_time,
          guideId: data.guide_id,
          type: data.type,
          completed: data.completed
        };
        
        setEvents(prev => [...prev, newEvent]);
        toast.success("Event added to calendar");
        
        return newEvent.id;
      }
      
      return null;
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create calendar event");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };
  
  const updateEvent = async (id: string, updates: Partial<Omit<CalendarEvent, "id" | "userId">>) => {
    if (!userId) return false;
    
    try {
      setIsUpdating(true);
      
      const updateObj: any = {};
      if (updates.title) updateObj.title = updates.title;
      if (updates.description !== undefined) updateObj.description = updates.description;
      if (updates.startTime) updateObj.start_time = updates.startTime;
      if (updates.endTime) updateObj.end_time = updates.endTime;
      if (updates.type) updateObj.type = updates.type;
      if (updates.completed !== undefined) updateObj.completed = updates.completed;
      
      const { error } = await supabase
        .from("calendar_events")
        .update(updateObj)
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, ...updates } : event
      ));
      
      toast.success("Calendar event updated");
      return true;
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update calendar event");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  const deleteEvent = async (id: string) => {
    if (!userId) return false;
    
    try {
      setIsUpdating(true);
      
      const { error } = await supabase
        .from("calendar_events")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
      
      if (error) throw error;
      
      setEvents(prev => prev.filter(event => event.id !== id));
      toast.success("Calendar event removed");
      
      return true;
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete calendar event");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  const markEventCompleted = async (id: string, completed = true) => {
    return updateEvent(id, { completed });
  };
  
  const getUpcomingEvents = (days: number = 7) => {
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(now.getDate() + days);
    
    return events.filter(event => {
      const eventDate = parseISO(event.startTime);
      return eventDate >= now && eventDate <= cutoff && !event.completed;
    });
  };
  
  // Format events for display in a calendar
  const getFormattedEvents = () => {
    return events.map(event => ({
      id: event.id,
      title: event.title,
      start: format(parseISO(event.startTime), "yyyy-MM-dd'T'HH:mm:ss"),
      end: format(parseISO(event.endTime), "yyyy-MM-dd'T'HH:mm:ss"),
      description: event.description || "",
      className: event.completed ? "opacity-50" : "",
      backgroundColor: getEventColor(event.type),
      textColor: "#ffffff",
      borderColor: getEventColor(event.type),
      extendedProps: {
        type: event.type,
        completed: event.completed,
        guideId: event.guideId
      }
    }));
  };
  
  const getEventColor = (type: string) => {
    switch (type) {
      case "interview":
        return "#3b82f6"; // blue
      case "follow_up":
        return "#8b5cf6"; // violet
      case "reminder":
        return "#f59e0b"; // amber
      default:
        return "#6366f1"; // indigo
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);
  
  return {
    events,
    formattedEvents: getFormattedEvents(),
    isLoading,
    isUpdating,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    markEventCompleted,
    getUpcomingEvents
  };
};
