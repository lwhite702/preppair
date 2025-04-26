
import { AIProvider, AIModelConfig, AIPromptTemplate, AIResponse } from './types';

export class OpenAIProvider implements AIProvider {
  private config: AIModelConfig = {
    apiKey: '',
    modelName: 'gpt-4o-mini',
    temperature: 0.7
  };

  setConfig(config: AIModelConfig): void {
    this.config = { ...this.config, ...config };
  }

  async generateGuide(prompt: AIPromptTemplate): Promise<AIResponse> {
    try {
      if (!this.config.apiKey) {
        console.warn("No OpenAI API key provided, using mock response instead");
        return this.generateMockResponse(prompt);
      }

      console.log("Attempting to call OpenAI API with prompt:", {
        systemPromptLength: prompt.systemPrompt.length,
        userPromptLength: prompt.userPrompt.length
      });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.modelName,
          messages: [
            { role: 'system', content: prompt.systemPrompt },
            { role: 'user', content: prompt.userPrompt }
          ],
          temperature: this.config.temperature,
          max_tokens: 2000,  // Ensuring enough length for comprehensive guides
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `OpenAI API request failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('OpenAI response received successfully');
      
      return {
        content: data.choices[0].message.content,
      };
    } catch (error) {
      console.error("Error in OpenAI provider:", error);
      
      // Generate a mock response if the API call fails
      if (this.config.apiKey) {
        return {
          content: "",
          error: error instanceof Error ? error.message : "An unknown error occurred"
        };
      } else {
        // If no API key, use mock response without showing an error
        return this.generateMockResponse(prompt);
      }
    }
  }

  private generateMockResponse(prompt: AIPromptTemplate): AIResponse {
    // Extract job information from the user prompt to create a relevant mock response
    const jobTitleMatch = prompt.userPrompt.match(/Job Title: ([^\n]+)/);
    const companyMatch = prompt.userPrompt.match(/Company: ([^\n]+)/);
    
    const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : "Software Developer";
    const company = companyMatch ? companyMatch[1].trim() : "Tech Company";
    
    console.log("Generating mock response for:", { jobTitle, company });
    
    return {
      content: `# PrepPair Interview Guide

## 👋 Quick Intro
Hey there! I'm your AI interview prep partner for your upcoming ${jobTitle} interview at ${company}. This guide is tailored to help you shine during your interview process.

## 🧠 Interview Mindset
${company} values problem-solving, teamwork, and innovation. They're looking for candidates who can demonstrate technical expertise while collaborating effectively with diverse teams.

## 📝 Top 6 Questions (and How to Nail Them)

### 1. Tell me about your experience in ${jobTitle} roles.
**Why they ask:** They want to understand your relevant background.  
**How to answer:** Highlight your most relevant experiences, focusing on achievements and lessons learned.  
**Example approach:** "In my last role at X Company, I was responsible for Y, which resulted in Z improvement..."

### 2. How do you approach problem-solving in your work?
**Why they ask:** They want to see your thought process.  
**How to answer:** Use the STAR method with a specific example.  
**Example approach:** "When facing a complex challenge, I first break it down into manageable components..."

### 3. What interests you about working at ${company}?
**Why they ask:** They want to gauge your genuine interest and cultural fit.  
**How to answer:** Research their values and recent news, connecting it to your career goals.  
**Example approach:** "I'm impressed by ${company}'s work on X, and I believe my skills in Y would contribute well to those initiatives..."

### 4. Can you describe a challenging project you've worked on?
**Why they ask:** They want to assess your resilience and technical skills.  
**How to answer:** Pick a relevant project, explain the challenges, your actions, and the results.  
**Example approach:** "On Project X, we faced significant time constraints and technical hurdles..."

### 5. How do you stay updated with the latest trends in your field?
**Why they ask:** They want to see your commitment to growth.  
**How to answer:** Mention specific resources, communities, or practices you use.  
**Example approach:** "I regularly follow industry blogs like X, participate in Y communities, and attend Z conferences..."

### 6. Where do you see yourself professionally in 3-5 years?
**Why they ask:** They want to understand your ambitions and if they align with their growth plans.  
**How to answer:** Be honest but strategic, showing how the role fits your career path.  
**Example approach:** "I aim to develop deep expertise in X while growing my leadership skills..."

## 🎯 Bonus: Tailored Talking Points
* Your experience with relevant technologies
* Your ability to collaborate effectively in team settings
* Your adaptability in fast-paced environments
* Your problem-solving approach
* Your continuous learning mindset

## 🤩 Stories To Have Ready
* A time you overcame a significant technical challenge
* A successful collaboration experience
* A situation where you demonstrated leadership
* A moment of innovation or creative problem-solving
* A recovery from a professional setback or mistake

## 🧠 Prep Notes
- [ ] Research ${company}'s recent news and achievements
- [ ] Review the job description thoroughly
- [ ] Practice answering questions out loud
- [ ] Prepare your own questions to ask
- [ ] Test your technology if it's a virtual interview
- [ ] Plan your interview outfit and logistics

## 🙋‍♀️ Smart Questions to Ask
1. "What are the biggest challenges facing your team right now?"
2. "How does success look like for this role in the first 6 months?"
3. "Can you describe the team I'd be working with?"
4. "What learning opportunities are available to employees?"
5. "How would you describe the company culture?"
6. "What are the next steps in the interview process?"

## 💬 Interview Day Tips
* Arrive early (or log in early for virtual interviews)
* Bring extra copies of your resume
* Have a notepad and pen ready
* Take a moment to gather your thoughts before answering
* Show enthusiasm and positive energy
* Thank the interviewer(s) for their time

Remember, interviews are two-way streets. You're also evaluating if ${company} is the right fit for you. Be authentic while putting your best foot forward!`,
    };
  }
}
