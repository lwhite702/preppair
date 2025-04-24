
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CalendarEvent } from "@/lib/types";

export const useCalendarEvents = (userId: string | undefined) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const addEvent = async (event: Omit<CalendarEvent, "id" | "userId" | "completed">) => {
    if (!userId) return null;
    
    try {
      setIsUpdating(true);
      const dbType = event.type === "follow-up" ? "follow_up" : event.type;
      
      const { data, error } = await supabase
        .from("calendar_events")
        .insert({
          user_id: userId,
          title: event.title,
          description: event.description,
          start_time: event.startTime,
          end_time: event.endTime,
          guide_id: event.guideId,
          type: dbType,
          completed: false
        })
        .select("id")
        .single();
      
      if (error) throw error;
      
      toast.success("Event added to calendar");
      return data?.id || null;
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to create calendar event");
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    isUpdating,
    addEvent
  };
};
