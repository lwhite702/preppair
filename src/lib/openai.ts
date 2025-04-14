
import { AIProviderFactory } from './ai/provider-factory';
import { AIResponse } from './ai/types';

export type UploadFormData = {
  candidateName?: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  resumeText?: string;
  additionalInfo?: string;
  tone?: string;
};

// Get API key from environment variable
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateInterviewGuide = async (params: UploadFormData): Promise<AIResponse> => {
  try {
    const { candidateName, jobDescription, resumeText, jobTitle, company, additionalInfo, tone } = params;

    let toneDescription = "";
    switch (tone) {
      case "friendly":
        toneDescription = "friendly and casual";
        break;
      case "professional":
        toneDescription = "professional and polished";
        break;
      case "confident":
        toneDescription = "confident and direct";
        break;
      case "quick":
        toneDescription = "";
        break;
      default:
        toneDescription = "professional";
    }

    // Validate API key
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured. Please set VITE_OPENAI_API_KEY.");
    }

    // Get OpenAI provider instance with optimal parameters for interview guide generation
    const provider = AIProviderFactory.getProvider('openai', {
      apiKey: OPENAI_API_KEY,
      modelName: 'gpt-4o-mini',  // Using the fast and efficient model
      temperature: 0.8  // Slightly higher temperature for more creative responses
    });

    // Create a more structured prompt template
    const promptTemplate = {
      systemPrompt: `You are an expert interview preparation assistant. Generate content in a ${toneDescription} tone. 
                     Focus on providing actionable advice and specific examples tailored to the candidate's background.
                     Structure the guide with these sections:
                     1. Brief Job Analysis
                     2. Key Technical Requirements
                     3. Behavioral Interview Prep
                     4. Technical Interview Questions
                     5. Questions to Ask the Interviewer
                     6. Interview Success Tips`,
      userPrompt: `Create a comprehensive interview guide for a ${jobTitle} position at ${company}.
                   ${resumeText ? `Resume Context: ${resumeText}` : ''}
                   Job Description: ${jobDescription}
                   ${additionalInfo ? `Additional Context: ${additionalInfo}` : ''}
                   ${candidateName ? `Candidate Name: ${candidateName}` : ''}`
    };

    // Log the prompt for debugging purposes
    console.log('OpenAI Prompt:', promptTemplate);

    const response = await provider.generateGuide(promptTemplate);
    
    // Log successful generation
    if (!response.error) {
      console.log('Successfully generated interview guide');
    }

    return response;
  } catch (error) {
    // More detailed error logging
    console.error("Error generating interview guide:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      params: JSON.stringify(params),
    });

    return {
      content: "",
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};

