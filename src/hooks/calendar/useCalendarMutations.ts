
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CalendarEvent } from "@/lib/types";

export const useCalendarMutations = (userId: string | undefined) => {
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

  return {
    isUpdating,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
