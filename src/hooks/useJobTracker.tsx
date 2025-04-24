
import { useJobFetcher } from "./jobs/useJobFetcher";
import { useJobMutations } from "./jobs/useJobMutations";
import { useCalendarEvents } from "./calendar/useCalendarEvents";
import { InterviewGuide } from "@/lib/types";

export const useJobTracker = (userId: string | undefined, guideId?: string) => {
  const { jobs, isLoading, fetchJobs, fetchSingleGuide } = useJobFetcher(userId, guideId);
  const { isUpdating, updateJobStatus, updateInterviewDate, updateHiringDecision, markFollowUpSent } = useJobMutations(userId);
  const { addEvent } = useCalendarEvents(userId);
  
  return {
    jobs,
    isLoading,
    isUpdating,
    updateJobStatus,
    updateInterviewDate,
    updateHiringDecision,
    markFollowUpSent,
    addCalendarEvent: addEvent,
    refreshJobs: fetchJobs
  };
};
