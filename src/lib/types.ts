export interface InterviewGuide {
  id: string;
  userId: string;
  title: string;
  candidateName: string;
  jobTitle: string;
  company: string;
  createdAt: Date;
  content: string;
  resumeFileName?: string;
  jobDescriptionText?: string;
  feedback?: InterviewFeedback;
  status?: JobStatus;
  interviewDate?: string;
}

export interface InterviewFeedback {
  interviewerNames: string[];
  questions: string;
  answers: string;
  impressions: string;
  nextSteps: string;
  interviewDate: string;
  ratings: {
    communicationSkills: number;
    technicalSkills: number;
    problemSolvingSkills: number;
    culturalFit: number;
  };
}

export type JobStatus =
  | "applied"
  | "interview_scheduled"
  | "interview_completed"
  | "feedback_provided"
  | "follow_up_sent"
  | "offer_received"
  | "rejected";

export interface UploadFormData {
  candidateName: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  additionalInfo?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime?: string;
  guideId?: string;
  completed?: boolean;
  type: 'interview' | 'follow-up' | 'other';
}
