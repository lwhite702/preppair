
import { InterviewFeedback } from "@/lib/types";

export const parseFeedback = (feedbackJson: unknown): InterviewFeedback | undefined => {
  if (!feedbackJson) return undefined;
  
  return {
    interviewerNames: Array.isArray(feedbackJson.interviewerNames) ? feedbackJson.interviewerNames : [],
    questions: feedbackJson.questions || '',
    answers: feedbackJson.answers || '',
    impressions: feedbackJson.impressions || '',
    nextSteps: feedbackJson.nextSteps || '',
    interviewDate: feedbackJson.interviewDate || '',
    ratings: {
      communicationSkills: feedbackJson.ratings?.communicationSkills || 0,
      technicalSkills: feedbackJson.ratings?.technicalSkills || 0,
      problemSolvingSkills: feedbackJson.ratings?.problemSolvingSkills || 0,
      culturalFit: feedbackJson.ratings?.culturalFit || 0,
      overall: feedbackJson.ratings?.overall || 0,
      technical: feedbackJson.ratings?.technical || 0,
      cultural: feedbackJson.ratings?.cultural || 0
    }
  };
};
