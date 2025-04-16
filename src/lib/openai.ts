
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
      // For development, provide a mock response if API key is missing
      console.warn("OpenAI API key is missing. Using mock response for development.");
      return mockInterviewGuide(params);
    }

    // Get OpenAI provider instance with optimal parameters for interview guide generation
    const provider = AIProviderFactory.getProvider('openai', {
      apiKey: OPENAI_API_KEY,
      modelName: 'gpt-4o-mini',  // Using the fast and efficient model
      temperature: 0.8  // Slightly higher temperature for more creative responses
    });

    // Create a more structured prompt template
    const promptTemplate = {
      systemPrompt: `You are an expert interview preparation assistant and partner. Generate content in a ${toneDescription} tone. 
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

// Mock response for development when API key is not available
const mockInterviewGuide = (params: UploadFormData): AIResponse => {
  const { jobTitle, company, candidateName } = params;
  
  const content = `# Interview Guide: ${jobTitle} at ${company}
  
${candidateName ? `## Prepared for ${candidateName}` : '## Personalized Interview Guide'}

### 1. Brief Job Analysis

This position at ${company} requires a mix of technical skills and soft skills. Based on the job description, the company is looking for someone who can contribute immediately while also growing with the organization.

### 2. Key Technical Requirements

- Technical requirement 1
- Technical requirement 2
- Technical requirement 3

### 3. Behavioral Interview Prep

**Question 1: Tell me about a time when you faced a difficult challenge at work.**

*Suggested answer structure:*
- Situation: Briefly describe the context
- Task: Explain your responsibility in that situation
- Action: Detail the steps you took to address the challenge
- Result: Share the positive outcome and what you learned

### 4. Technical Interview Questions

1. **Technical question related to ${jobTitle}**
   - Approach: Start by clarifying the problem
   - Key points to include in your answer
   - Potential follow-up questions

2. **Another relevant technical question**
   - How to demonstrate your knowledge effectively
   - Code example or process explanation

### 5. Questions to Ask the Interviewer

1. "What would success look like in this role after 3 months?"
2. "Can you tell me about the team I'd be working with?"
3. "What are the biggest challenges the team is currently facing?"

### 6. Interview Success Tips

- Research ${company}'s recent projects and news before the interview
- Prepare specific examples that highlight your relevant experience
- Follow up with a thank-you note within 24 hours
- Practice explaining complex concepts simply

Good luck with your interview! Remember to be authentic, prepared, and curious.`;

  return { content };
};
