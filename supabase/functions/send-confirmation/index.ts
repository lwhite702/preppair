
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
    //   from: "PrepPair <no-reply@preppair.com>",
    //   to: email,
    //   subject: "🎉 You're all set—your interview prep guide is ready",
    //   html: `
    //     <h1>Hey ${name},</h1>
    //     <p>You're officially prepped. Your custom guide is now live and ready to go:</p>
    //     <p><a href="https://your-app-url.com/guides/${guideId}">View My Guide</a></p>
    //     
    //     <h2>What's inside?</h2>
    //     <ul>
    //       <li>Job-specific interview questions</li>
    //       <li>Sample responses tailored to your resume</li>
    //       <li>Tips, tactics, and tone guidance</li>
    //     </ul>
    //     
    //     <p>Good luck—you've got this.</p>
    //     
    //     <p>—Team PrepPair 🧠💼</p>
    //   `,
    // });
    
    // Schedule second email to be sent after 24 hours
    // In a production environment, you would use a separate scheduler or queue
    // setTimeout(() => {
    //   resend.emails.send({
    //     from: "PrepPair <no-reply@preppair.com>",
    //     to: email,
    //     subject: "Interview like a pro: 3 things to try",
    //     html: `
    //       <h1>Interviews aren't exams—they're conversations.</h1>
    //       <p>Here's what our top users do before they walk in:</p>
    //       <ol>
    //         <li>Skim their guide right before showtime</li>
    //         <li>Reflect after the interview (we help with that too)</li>
    //         <li>Send a follow-up email within 24 hours</li>
    //       </ol>
    //       
    //       <p>Want a refresher?</p>
    //       <p><a href="https://your-app-url.com/guides/${guideId}">Open My Guide</a></p>
    //       
    //       <p>Your next win is one question away.</p>
    //       
    //       <p>—Team PrepPair</p>
    //     `,
    //   });
    // }, 24 * 60 * 60 * 1000); // 24 hours

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Welcome email would be sent in a real implementation" 
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
