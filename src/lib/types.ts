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
}

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
