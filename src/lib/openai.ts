
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

    // Get OpenAI provider instance
    const provider = AIProviderFactory.getProvider('openai', {
      apiKey: 'your-api-key', // This should come from environment variables
      modelName: 'gpt-4o-mini'
    });

    // Create the prompt template
    const promptTemplate = {
      systemPrompt: `You are an expert interview preparation assistant. Generate content in a ${toneDescription} tone.`,
      userPrompt: `Create an interview guide for a ${jobTitle} position at ${company}.
      ${resumeText ? `Resume: ${resumeText}` : ''}
      Job Description: ${jobDescription}
      ${additionalInfo ? `Additional Context: ${additionalInfo}` : ''}`
    };

    return await provider.generateGuide(promptTemplate);
  } catch (error) {
    console.error("Error generating interview guide:", error);
    return {
      content: "",
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};
