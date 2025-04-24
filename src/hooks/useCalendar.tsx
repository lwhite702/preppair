
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { parseISO } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { useCalendarMutations } from "./calendar/useCalendarMutations";
import { formatCalendarEvents } from "./calendar/utils";
import { UseCalendarReturn } from "./calendar/types";

export const useCalendar = (userId: string | undefined): UseCalendarReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isUpdating, addEvent, updateEvent, deleteEvent } = useCalendarMutations(userId);
  
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
        setEvents(data.map(event => ({
          id: event.id,
          userId: event.user_id,
          title: event.title,
          description: event.description || "",
          startTime: event.start_time,
          endTime: event.end_time,
          guideId: event.guide_id,
          type: event.type === "follow_up" ? "follow-up" : event.type,
          completed: event.completed || false
        })));
      }
    } catch (error) {
      console.error("Error fetching calendar events:", error);
      toast.error("Failed to load your calendar");
    } finally {
      setIsLoading(false);
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
  
  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);
  
  return {
    events,
    formattedEvents: formatCalendarEvents(events),
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
