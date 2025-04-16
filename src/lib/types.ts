
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  guidesCreated: number;
}

export interface InterviewGuide {
  id: string;
  userId?: string;
  title: string;
  candidateName?: string;
  jobTitle: string;
  company: string;
  createdAt: Date;
  content: string;
  resumeFileName?: string;
  jobDescriptionText?: string;
  feedback?: InterviewFeedback;
  status?: JobStatus;
  interviewDate?: string;
  reminderSent?: boolean;
  followUpSent?: boolean;
  hiringDecision?: HiringDecision;
}

export type JobStatus = 
  | "applied" 
  | "interview_scheduled" 
  | "interview_completed" 
  | "feedback_provided" 
  | "follow_up_sent" 
  | "pending_decision" 
  | "offer_received" 
  | "rejected" 
  | "accepted" 
  | "declined";

export type HiringDecision = 
  | "pending" 
  | "offer" 
  | "rejection" 
  | "no_response";

export interface InterviewFeedback {
  interviewerNames: string[];
  questions: string;
  answers: string;
  impressions: string;
  nextSteps: string;
  interviewDate: string;
  ratings?: Record<string, number>;
}

export type UploadFormData = {
  candidateName?: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  resumeText?: string;
  additionalInfo?: string;
  tone?: string;
};

export interface GenerateGuideRequest {
  resumeText?: string;
  jobDescription: string;
  candidateName?: string;
  jobTitle: string;
  company: string;
  additionalInfo?: string;
}

export interface OpenAIResponse {
  content: string;
  error?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
  tier: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

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
