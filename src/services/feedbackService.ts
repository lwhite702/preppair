
import { supabase } from "@/integrations/supabase/client";
import { InterviewFeedback } from "@/lib/types";

export const saveFeedbackToDatabase = async (guideId: string, feedback: InterviewFeedback) => {
  try {
    const feedbackJson = {
      interviewerNames: feedback.interviewerNames,
      questions: feedback.questions,
      answers: feedback.answers,
      impressions: feedback.impressions,
      nextSteps: feedback.nextSteps,
      interviewDate: feedback.interviewDate,
      ratings: feedback.ratings
    };
    
    const { error } = await supabase
      .from("interview_guides")
      .update({ feedback: feedbackJson })
      .eq("id", guideId);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw error;
  }
};
