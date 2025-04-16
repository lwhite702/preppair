
import { AIProviderFactory } from './ai/provider-factory';
import { AIResponse } from './ai/types';
import { UploadFormData } from './types';

// Get API key from environment variable
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateInterviewGuide = async (params: UploadFormData): Promise<AIResponse> => {
  try {
    const { candidateName, jobDescription, resumeText, jobTitle, company, additionalInfo, tone, interviewFormat } = params;

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

    // Create a more structured prompt template based on the specification
    const systemPrompt = `You are a career coach creating a personalized interview preparation guide.
    
Create a markdown-based, conversational interview prep guide using the candidate's resume and job description.

Keep the tone ${toneDescription || "friendly and motivational"}. Your guide should follow this structure:

# PrepPair Interview Guide

## ✨ Quick Intro
A friendly, personalized intro addressed directly to the candidate by name if provided, otherwise use "there". Mention the company name and build confidence.

## 💡 Interview Mindset
A section about aligning the candidate's experience with what the company is looking for.

## 🔥 Most Likely Questions
5-8 tailored interview questions based on the job description and resume.

## 🧠 Tailored Talking Points
Bullet points highlighting specific achievements that match job requirements.

## 🗣️ Stories to Have Ready
STAR format suggestions (Situation, Task, Action, Result) based on resume experience.

## ✅ Prep Notes & Tasks
A checklist of preparation tasks.

## ❓Smart Questions to Ask the Interviewer
3-5 thoughtful questions to ask.

## 📅 Day-Of Interview Tips
Practical tips for the ${interviewFormat || "interview"} format.

## 📬 Follow-Up Email Generator
A template for a thank-you email that can be personalized.

Use emojis as shown above for section headers. Be motivational and specific where possible.`;

    const userPrompt = `Create a comprehensive interview guide for a ${jobTitle} position at ${company}.
                   ${resumeText ? `Resume Context: ${resumeText}` : ''}
                   Job Description: ${jobDescription}
                   ${additionalInfo ? `Additional Context: ${additionalInfo}` : ''}
                   ${candidateName ? `Candidate Name: ${candidateName}` : ''}
                   ${interviewFormat ? `Interview Format: ${interviewFormat}` : ''}`;

    // Log the prompt for debugging purposes
    console.log('OpenAI Prompt:', { systemPrompt, userPrompt });

    const response = await provider.generateGuide({ 
      systemPrompt,
      userPrompt
    });
    
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
  
  const content = `# PrepPair Interview Guide

${candidateName ? `## ✨ Quick Intro\nHey ${candidateName}` : '## ✨ Quick Intro\nHey there'}, this guide is your personal hype-doc. Let's get you confidently prepped for your upcoming interview at ${company}!

## 💡 Interview Mindset
You've got the skills. Now let's align your stories and energy with what ${company} is looking for in a ${jobTitle}.

## 🔥 Most Likely Questions
1. Based on your background, how would you approach the challenges of this role?
2. Tell me about a time you had to solve a complex problem under pressure.
3. How do you prioritize tasks when everything seems urgent?
4. What interests you most about working at ${company}?
5. How do your skills align with our needs for this ${jobTitle} position?

## 🧠 Tailored Talking Points
- Highlight your success with relevant projects
- Connect your skills to the company's needs
- Emphasize your experience with similar responsibilities
- Show your enthusiasm for the industry

## 🗣️ Stories to Have Ready
Use STAR format:
- Situation: Define a relevant challenge
- Task: What needed to happen
- Action: Specific steps you took
- Result: Measurable impact of your work

## ✅ Prep Notes & Tasks
Checklist:
- [ ] Research ${company}'s recent news and achievements
- [ ] Prepare portfolio/examples of your work
- [ ] Review the job description again
- [ ] Practice answering questions out loud
- [ ] Prepare questions for the interviewer

## ❓Smart Questions to Ask the Interviewer
- How does your team measure success in this role?
- What are current priorities for this department?
- Can you describe the team I'd be working with?
- What opportunities for growth exist in this role?

## 📅 Day-Of Interview Tips
- Eat light and hydrate 🥤
- Log in early if virtual, test audio 🎧
- Bring extra copies of your resume if in-person 📄
- Remind yourself: they want to like you 🤝

## 📬 Follow-Up Email Generator
Hi [Interviewer's Name],

Thank you for taking the time to speak with me today about the ${jobTitle} position at ${company}. I enjoyed learning more about [specific topic discussed] and how the role contributes to ${company}'s goals.

Our conversation reinforced my enthusiasm for joining your team, and I'm confident that my background in [relevant skill] would allow me to make meaningful contributions.

I look forward to hearing from you about the next steps in the process. Please don't hesitate to contact me if you need any additional information.

Best regards,
${candidateName || "[Your Name]"}`;

  return { content };
};
