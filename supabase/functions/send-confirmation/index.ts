
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { guideId, email, name, company, jobTitle } = await req.json();
    
    // Simulate sending an email (in a real implementation, you'd use a service like Resend or SendGrid)
    console.log(`Sending confirmation email to ${email} for guide ${guideId}`);
    
    // In a real implementation, you would send an actual email here
    // For example, using Resend:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // await resend.emails.send({
    //   from: "InterviewAce <no-reply@interviewace.com>",
    //   to: email,
    //   subject: `Your ${company} Interview Guide is Ready!`,
    //   html: `<h1>Hi ${name},</h1>
    //          <p>Your interview guide for the ${jobTitle} position at ${company} is ready!</p>
    //          <p>Log in to view your guide: https://your-app-url.com/guides/${guideId}</p>`,
    // });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email would be sent in a real implementation" 
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send confirmation email", 
        details: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders
        },
      }
    );
  }
});
