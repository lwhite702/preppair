
import { GenerateGuideRequest, OpenAIResponse } from "./types";

export async function generateInterviewGuide(data: GenerateGuideRequest): Promise<OpenAIResponse> {
  try {
    // This is a temporary function - in a real-world scenario, we'd call our backend API
    // which would securely use the OpenAI API key stored as a server-side secret
    
    // For demo purposes, we'll simulate the API response with a mock guide
    console.log("Generating guide with data:", data);
    
    // Mock a loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const resumeText = data.resumeText || "Resume not provided";
    const jobDescriptionText = data.jobDescription;
    const candidateName = data.candidateName || "Candidate";
    const jobTitle = data.jobTitle;
    const company = data.company;
    
    // Generate a simple mock guide
    const mockGuide = `# Interview Guide: ${jobTitle} at ${company}

## Candidate Information
- **Name:** ${candidateName}
- **Role:** ${jobTitle}
- **Company:** ${company}
- **Date:** ${new Date().toLocaleDateString()}

## Overview and Expectations

This personalized interview guide is designed to help you prepare for your upcoming interview for the ${jobTitle} position at ${company}. Based on your resume and the job description, we've identified key areas to focus on and prepared tailored responses to potential interview questions.

## Company & Role Insights

${company} is looking for a candidate who can demonstrate strong skills in problem-solving, communication, and technical expertise related to ${jobTitle}. The role requires someone who can collaborate effectively with cross-functional teams and drive results.

## Behavioral Questions

### Tell me about yourself and why you're interested in this role at ${company}.

**Recommended Response Structure:**
- Brief professional overview (2-3 sentences)
- Highlight relevant experience and skills for ${jobTitle}
- Express specific interest in ${company} (culture, products, innovation)
- Connect your career goals with this opportunity

### Describe a challenging project you worked on and how you overcame obstacles.

**Recommended Response Structure:**
- Briefly set the context of the project
- Clearly identify the specific challenges you faced
- Detail your approach to solving the problems
- Share the outcomes and what you learned
- Relate the experience to how it would help you in the ${jobTitle} role

## Technical Questions

Based on the ${jobTitle} job description, prepare for these potential technical questions:

1. **How would you approach [key responsibility from job description]?**
2. **What experience do you have with [specific technology/skill mentioned]?**
3. **How do you stay updated with the latest developments in your field?**

## Situational Questions

### How would you handle a disagreement with a team member about a project approach?

**Recommended Response Structure:**
- Express your openness to different perspectives
- Describe your approach to understanding their viewpoint
- Explain how you would find common ground
- Emphasize collaborative decision-making

## Your Strengths Based on Resume-Job Alignment

Based on your resume, these are your strongest alignment points with the job requirements:

1. **Relevant Experience**: Highlight specific experiences that directly relate to the ${jobTitle} position
2. **Technical Skills**: Emphasize your proficiency in the required technical areas
3. **Achievements**: Reference specific accomplishments that demonstrate your capability

## Post-Interview Reflection Prompts

After your interview, consider these reflection questions:
- What aspects of the role did you learn more about?
- Which of your answers resonated most with the interviewer?
- What follow-up questions would further demonstrate your interest?

## Follow-up Email Template

**Subject:** Thank You for the ${jobTitle} Interview

Dear [Interviewer's Name],

Thank you for taking the time to discuss the ${jobTitle} position at ${company}. I enjoyed learning more about [specific topic discussed] and how my experience with [relevant skill/experience] aligns with your team's needs.

I'm particularly excited about the opportunity to [specific aspect of role discussed]. As mentioned during our conversation, my background in [relevant experience] has prepared me well for the challenges of this position.

Please don't hesitate to contact me if you need any additional information. I look forward to hearing from you about the next steps in the process.

Best regards,
${candidateName}

## Final Thoughts

Remember to be authentic while showcasing your relevant skills and experiences. Prepare examples that demonstrate your capabilities and align with ${company}'s needs for the ${jobTitle} role. Good luck!`;

    return {
      content: mockGuide
    };
  } catch (error) {
    console.error("Error generating interview guide:", error);
    return {
      content: "",
      error: "Failed to generate interview guide. Please try again later."
    };
  }
}
