
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
  reminderSent?: boolean;
  followUpSent?: boolean;
  hiringDecision?: HiringDecision;
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
    overall?: number;
    technical?: number;
    cultural?: number;
  };
}

export type JobStatus =
  | "applied"
  | "interview_scheduled"
  | "interview_completed"
  | "feedback_provided"
  | "follow_up_sent"
  | "offer_received"
  | "rejected"
  | "pending_decision"
  | "accepted"
  | "declined";

export interface UploadFormData {
  candidateName: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  additionalInfo?: string;
  resumeText?: string;
  tone?: string;
  interviewFormat?: string;
}

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  startTime: string;
  endTime?: string;
  guideId?: string;
  completed?: boolean;
  type: 'interview' | 'follow-up' | 'reminder' | 'other';
  description?: string;
}

export type SubscriptionTier = 'free' | 'basic' | 'premium';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  guidesCreated?: number;
}

export type HiringDecision = 'pending' | 'offer_received' | 'rejected';
