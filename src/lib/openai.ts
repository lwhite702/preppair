import { AIProviderFactory } from './ai/provider-factory';
import { AIResponse } from './ai/types';
import { UploadFormData } from './types';

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

    if (!OPENAI_API_KEY) {
      console.warn("OpenAI API key is missing. Using mock response for development.");
      return mockInterviewGuide(params);
    }

    const provider = AIProviderFactory.getProvider('openai', {
      apiKey: OPENAI_API_KEY,
      modelName: 'gpt-4o-mini',
      temperature: 0.8
    });

    const systemPrompt = `You are creating a tailored interview preparation guide. Format the response in markdown with these sections:

## 👋 Quick Intro
A personalized greeting using the candidate's name, mentioning the company and role. Keep it encouraging and mentor-like.

## 🧠 Interview Mindset
What this company values and how the candidate's experience aligns.

## 📝 Top 6 Questions (and How to Nail Them)
List 6 likely questions with:
- Why they ask it
- How to answer
- Example framework or approach

## 🎯 Bonus: Tailored Talking Points
5-6 bullet points highlighting candidate strengths that match the role.

## 🤩 Stories To Have Ready
A list of 3-5 specific examples from their experience to prepare.

## 🧠 Prep Notes
A checklist of preparation tasks.

## 🙋‍♀️ Smart Questions to Ask
5-7 thoughtful questions they can ask the interviewer.

## 💬 Interview Day Tips
Practical advice for the ${interviewFormat} format.

Use emojis as shown above for section headers. Be encouraging and specific.`;

    const userPrompt = `Create a comprehensive interview guide for a ${jobTitle} position at ${company}.
                   ${resumeText ? `Resume Context: ${resumeText}` : ''}
                   Job Description: ${jobDescription}
                   ${additionalInfo ? `Additional Context: ${additionalInfo}` : ''}
                   ${candidateName ? `Candidate Name: ${candidateName}` : ''}
                   Interview Format: ${interviewFormat}
                   Tone: ${toneDescription}`;

    console.log('OpenAI Prompt:', { systemPrompt, userPrompt });

    const response = await provider.generateGuide({ 
      systemPrompt,
      userPrompt
    });
    
    if (!response.error) {
      console.log('Successfully generated interview guide');
    }

    return response;
  } catch (error) {
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
