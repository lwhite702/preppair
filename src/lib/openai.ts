
export type UploadFormData = {
  candidateName?: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  resumeText?: string;
  additionalInfo?: string;
  tone?: string;
};

export const generateInterviewGuide = async (params: UploadFormData): Promise<{content: string; error?: string}> => {
  try {
    // Simulate API response delay for demo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
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
    
    // For demo purposes, let's create a mock interview guide with the selected tone
    const candidateGreeting = candidateName ? `Hello ${candidateName}` : "Hello";
    
    let toneIntro = "";
    if (toneDescription) {
      toneIntro = `\nThis guide is written in a ${toneDescription} tone, as you requested.`;
    }
    
    const content = `# Your PrepPair Interview Guide for ${jobTitle} at ${company}

${candidateGreeting},${toneIntro}

## Job Insights
For the ${jobTitle} position at ${company}, they're looking for someone who can bring strong technical skills and collaborative spirit to their team. This guide will help you showcase both.

## Behavioral Questions

### 1. Tell me about a time you had to learn a new technology quickly.
**Suggested approach:**
* Briefly describe the situation that required quick learning
* Explain your learning process and any resources you used
* Share the outcome and what you accomplished
* Reflect on what this experience taught you about adapting to new tools

### 2. Describe a challenging project you worked on and how you overcame obstacles.
**Suggested approach:**
* Choose a relevant project that showcases your problem-solving abilities
* Outline the specific challenges you faced
* Detail your approach to finding solutions
* Emphasize collaboration if applicable
* Share the successful outcome and lessons learned

## Technical Questions

### 1. How would you approach ${jobTitle}-specific problem X?
**Suggested approach:**
* Consider breaking down the problem into components
* Discuss multiple potential approaches
* Explain trade-offs between different solutions
* Demonstrate your thought process rather than just the solution

### 2. What methodologies do you use for ${jobTitle}-related task Y?
**Suggested approach:**
* Share your experience with relevant methodologies
* Explain why you prefer certain approaches
* Give examples of how you've implemented these in the past
* Acknowledge newer approaches you're exploring

## Your Strengths

Based on your background, here are key strengths to emphasize:
* Your experience aligns well with their need for someone who can [relevant skills]
* Your approach to problem-solving demonstrates the analytical thinking they value
* Your communication style will help you integrate well with their team culture

## Post-Interview Reflection

After the interview, consider:
* Which questions felt most challenging and why?
* What points did you communicate effectively?
* What would you emphasize more in a follow-up?
* Did you learn anything new about the role or company?

## Follow-up Email Template

Subject: Thank you for the ${jobTitle} interview

Dear [Interviewer Name],

Thank you for taking the time to discuss the ${jobTitle} position at ${company} today. I appreciated learning more about [specific aspect of the role or company mentioned during the interview].

Our conversation about [specific topic from interview] reinforced my enthusiasm for this opportunity. My experience in [relevant skill/experience] would allow me to [specific value you would bring].

I look forward to potentially joining the team and contributing to [company goal or project mentioned].

Best regards,
[Your Name]

## Final Thoughts

Remember to be authentic while showcasing your relevant skills. You're not just answering questions – you're having a conversation to determine mutual fit.

Good luck! You've got this.
`;

    // In a real application, this would send the data to the OpenAI API
    return { content };
  } catch (error) {
    console.error("Error generating interview guide:", error);
    return { 
      content: "", 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
};
