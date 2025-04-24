
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useJobFetcher } from "./jobs/useJobFetcher";
import { useJobMutations } from "./jobs/useJobMutations";
import { CalendarEvent, InterviewGuide } from "@/lib/types";

export const useJobTracker = (userId: string | undefined, guideId?: string) => {
  const { jobs, isLoading, fetchJobs, fetchSingleGuide } = useJobFetcher(userId, guideId);
  const { isUpdating, updateJobStatus, updateInterviewDate, updateHiringDecision, markFollowUpSent } = useJobMutations(userId);
  
  const addCalendarEvent = async (event: Omit<CalendarEvent, "id" | "userId" | "completed">) => {
    if (!userId) return null;
    
    try {
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
      
      return data?.id || null;
    } catch (error) {
      console.error("Error adding calendar event:", error);
      toast.error("Failed to add event to calendar");
      return null;
    }
  };

  return {
    jobs,
    isLoading,
    isUpdating,
    updateJobStatus,
    updateInterviewDate,
    updateHiringDecision,
    markFollowUpSent,
    addCalendarEvent,
    refreshJobs: fetchJobs
  };
};
