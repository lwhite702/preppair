
import { InterviewFeedback } from "@/lib/types";

export const parseFeedback = (feedbackJson: unknown): InterviewFeedback | undefined => {
  if (!feedbackJson) return undefined;
  
  // Type guard to check if feedbackJson is an object
  if (typeof feedbackJson !== 'object' || feedbackJson === null) {
    return undefined;
  }
  
  // Safe type assertion after type guard
  const feedback = feedbackJson as Record<string, any>;
  
  return {
    interviewerNames: Array.isArray(feedback.interviewerNames) ? feedback.interviewerNames : [],
    questions: typeof feedback.questions === 'string' ? feedback.questions : '',
    answers: typeof feedback.answers === 'string' ? feedback.answers : '',
    impressions: typeof feedback.impressions === 'string' ? feedback.impressions : '',
    nextSteps: typeof feedback.nextSteps === 'string' ? feedback.nextSteps : '',
    interviewDate: typeof feedback.interviewDate === 'string' ? feedback.interviewDate : '',
    ratings: {
      communicationSkills: typeof feedback.ratings?.communicationSkills === 'number' ? feedback.ratings.communicationSkills : 0,
      technicalSkills: typeof feedback.ratings?.technicalSkills === 'number' ? feedback.ratings.technicalSkills : 0,
      problemSolvingSkills: typeof feedback.ratings?.problemSolvingSkills === 'number' ? feedback.ratings.problemSolvingSkills : 0,
      culturalFit: typeof feedback.ratings?.culturalFit === 'number' ? feedback.ratings.culturalFit : 0,
      overall: typeof feedback.ratings?.overall === 'number' ? feedback.ratings.overall : 0,
      technical: typeof feedback.ratings?.technical === 'number' ? feedback.ratings.technical : 0,
      cultural: typeof feedback.ratings?.cultural === 'number' ? feedback.ratings.cultural : 0
    }
  };
};
