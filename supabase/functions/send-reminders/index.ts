
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Type definitions
interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  guide_id: string;
  type: "interview" | "follow_up" | "reminder";
  completed: boolean;
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

interface InterviewGuide {
  id: string;
  user_id: string;
  title: string;
  job_title: string;
  company: string;
  interview_date: string;
  reminder_sent: boolean;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get all upcoming interviews that need reminders
    const today = new Date();
    
    // Get interviews happening tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(23, 59, 59, 999);
    
    // Get interviews from guides
    const { data: interviews, error: interviewsError } = await supabaseClient
      .from("interview_guides")
      .select("id, user_id, title, job_title, company, interview_date, reminder_sent")
      .eq("status", "interview_scheduled")
      .eq("reminder_sent", false)
      .gte("interview_date", tomorrow.toISOString())
      .lte("interview_date", endOfTomorrow.toISOString());
    
    if (interviewsError) {
      throw interviewsError;
    }
    
    console.log(`Found ${interviews.length} interviews that need reminders`);
    
    // Process each interview
    const reminders = [];
    
    for (const interview of interviews) {
      try {
        // Get user profile
        const { data: userProfile, error: userError } = await supabaseClient
          .from("profiles")
          .select("id, email, name")
          .eq("id", interview.user_id)
          .single();
        
        if (userError) {
          console.error(`Error getting user profile: ${userError.message}`);
          continue;
        }
        
        // Mark reminder as sent
        const { error: updateError } = await supabaseClient
          .from("interview_guides")
          .update({ reminder_sent: true })
          .eq("id", interview.id);
        
        if (updateError) {
          console.error(`Error updating reminder status: ${updateError.message}`);
          continue;
        }
        
        // Send email
        const emailResult = await sendReminderEmail(
          userProfile.email,
          userProfile.name || "Candidate",
          interview.job_title,
          interview.company,
          new Date(interview.interview_date)
        );
        
        reminders.push({
          id: interview.id,
          email: userProfile.email,
          success: emailResult.success,
          error: emailResult.error
        });
        
        console.log(`Sent reminder for interview ${interview.id} to ${userProfile.email}`);
      } catch (error) {
        console.error(`Error processing interview ${interview.id}: ${error.message}`);
        reminders.push({
          id: interview.id,
          success: false,
          error: error.message
        });
      }
    }
    
    return new Response(
      JSON.stringify({ success: true, reminders }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
  } catch (error) {
    console.error(`Error in send-reminders: ${error.message}`);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});

// In a real application, this would send emails via a service like Resend or SendGrid
// For this example, we're just simulating the email sending
async function sendReminderEmail(
  email: string,
  name: string,
  jobTitle: string,
  company: string,
  interviewDate: Date
): Promise<{ success: boolean; error?: string }> {
  try {
    // Simulate email sending
    console.log(`EMAIL: Sending reminder to ${email} for interview at ${company}`);
    console.log(`EMAIL SUBJECT: Reminder: Your interview for ${jobTitle} at ${company} tomorrow`);
    console.log(`EMAIL BODY: 
      Dear ${name},
      
      This is a friendly reminder that you have an interview scheduled for the ${jobTitle} position at ${company} tomorrow, ${interviewDate.toLocaleDateString()} at ${interviewDate.toLocaleTimeString()}.
      
      Make sure to:
      - Review your interview guide
      - Research the company
      - Prepare questions to ask the interviewer
      - Get a good night's sleep
      
      Good luck with your interview!
      
      Best regards,
      InterviewAce Team
    `);
    
    // In a real application, we would use Resend or another email service
    // const { data, error } = await resend.emails.send({
    //   from: "InterviewAce <reminders@interviewace.com>",
    //   to: [email],
    //   subject: `Reminder: Your interview for ${jobTitle} at ${company} tomorrow`,
    //   html: `...email template...`
    // });
    
    // if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error(`Error sending reminder email: ${error.message}`);
    return { success: false, error: error.message };
  }
}
