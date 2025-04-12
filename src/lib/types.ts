
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
}

export interface UploadFormData {
  resume?: File;
  jobDescription: string;
  candidateName?: string;
  jobTitle: string;
  company: string;
  additionalInfo?: string;
}

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
