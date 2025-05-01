
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface UploadFormProps {
  onGuideGenerated: (markdownContent: string, error?: string) => void;
  onGenerationStart: () => void;
}

interface FormValues {
  resume: string;
  jobDescription: string;
  candidateName: string;
  company: string;
  jobTitle: string;
}

const UploadForm: React.FC<UploadFormProps> = ({ onGuideGenerated, onGenerationStart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      resume: '',
      jobDescription: '',
      candidateName: '',
      company: '',
      jobTitle: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    onGenerationStart();
    
    try {
      // Mock API call - in a real app, this would call your backend
      setTimeout(() => {
        const mockGuide = generateMockGuide(data);
        onGuideGenerated(mockGuide);
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      onGuideGenerated('', 'Error generating guide. Please try again.');
      setIsSubmitting(false);
    }
  };

  const generateMockGuide = (data: FormValues) => {
    return `# Interview Guide for ${data.candidateName || 'You'} - ${data.jobTitle || 'Role'} at ${data.company || 'Company'}

## Job Overview
Based on the job description, this position requires expertise in [key skills]. Your resume shows relevant experience in these areas.

## Interview Preparation
Here are some key questions to prepare for:

### Technical Questions
1. How would you approach [technical problem]?
2. Can you explain your experience with [technology]?
3. What methodology do you use for [process]?

### Behavioral Questions
1. Tell me about a time you faced a challenge in your previous role.
2. How do you prioritize tasks when facing tight deadlines?
3. Describe your ideal team environment.

## Your Strengths
Based on your resume, highlight these strengths during the interview:
- [Strength 1]
- [Strength 2]
- [Strength 3]

## Follow-up Email Template
Subject: Thank You for the [Job Title] Interview

Dear [Interviewer's Name],

Thank you for taking the time to speak with me today about the [Job Title] position. I enjoyed learning more about [company culture/projects/team].

I'm excited about the opportunity to bring my skills in [relevant skills] to your team.

Best regards,
[Your Name]
`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="candidateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Paste your resume content here..." 
                    className="min-h-[150px]" 
                    {...field} 
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Paste the job description here..." 
                    className="min-h-[150px]" 
                    {...field}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Guide...' : 'Create Interview Guide'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
