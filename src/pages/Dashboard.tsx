import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadForm from "@/components/UploadForm";
import GuideDisplay from "@/components/GuideDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { InterviewGuide } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
  const [guides, setGuides] = useState<InterviewGuide[]>([]);
  const [isLoadingGuides, setIsLoadingGuides] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<Date | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<InterviewGuide | null>(null);

  // Load user's guides
  useEffect(() => {
    if (user) {
      fetchGuides();
      checkSubscription();
    }
  }, [user]);

  const fetchGuides = async () => {
    try {
      setIsLoadingGuides(true);
      
      const { data, error } = await supabase
        .from("interview_guides")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setGuides(data.map(guide => ({
          id: guide.id,
          userId: guide.user_id,
          title: guide.title,
          candidateName: guide.candidate_name,
          jobTitle: guide.job_title,
          company: guide.company,
          createdAt: new Date(guide.created_at),
          content: guide.content,
          resumeFileName: guide.resume_filename,
          jobDescriptionText: guide.job_description_text
        })));
      }
    } catch (error) {
      console.error("Error fetching guides:", error);
      toast.error("Failed to load your guides");
    } finally {
      setIsLoadingGuides(false);
    }
  };
  
  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      setIsLoadingSubscription(true);
      
      const { data, error } = await supabase.functions.invoke("check-subscription");
      
      if (error) throw error;
      
      setIsSubscribed(data.subscribed || false);
      setSubscriptionTier(data.subscription_tier || null);
      setSubscriptionEnd(data.subscription_end ? new Date(data.subscription_end) : null);
    } catch (error) {
      console.error("Error checking subscription:", error);
    } finally {
      setIsLoadingSubscription(false);
    }
  };

  const handleGuideGenerated = (markdownContent: string) => {
    setGeneratedGuide(markdownContent);
    
    // Refresh guides list after generation
    if (user) {
      fetchGuides();
    }
    
    // Scroll to the guide display
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleViewGuide = (guide: InterviewGuide) => {
    setSelectedGuide(guide);
    setGeneratedGuide(guide.content);
    
    // Scroll to the guide display
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("guideDisplay")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };
  
  const handleCreateSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      
      if (error) throw error;
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to start checkout process");
    }
  };
  
  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) throw error;
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error accessing customer portal:", error);
      toast.error("Failed to access subscription management");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl font-bold mb-4 text-center">Your Interview Dashboard</h1>
            <p className="text-center text-muted-foreground">
              Create, manage, and review your personalized interview guides
            </p>
          </div>

          {user && (
            <div className="mb-12 max-w-3xl mx-auto">
              <Card className={`${isSubscribed ? 'border-primary/30 bg-primary/5' : ''}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle>Subscription Status</CardTitle>
                    <CardDescription>
                      {isSubscribed 
                        ? `You have a ${subscriptionTier || 'premium'} subscription`
                        : "Upgrade for unlimited guides and features"}
                    </CardDescription>
                  </div>
                  {isSubscribed && (
                    <div className="bg-primary/10 text-primary py-1 px-3 rounded-full text-xs font-medium">
                      Active
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoadingSubscription ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        <span className="text-muted-foreground">Checking subscription status...</span>
                      </div>
                    ) : isSubscribed ? (
                      <div className="space-y-2">
                        <div className="text-sm">
                          Your subscription renews on {subscriptionEnd ? format(subscriptionEnd, "MMMM d, yyyy") : "N/A"}
                        </div>
                        <Button variant="outline" onClick={handleManageSubscription}>
                          Manage Subscription
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Upgrade to create unlimited interview guides, access advanced features, and more.
                        </div>
                        <Button onClick={handleCreateSubscription}>
                          Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {user && guides.length > 0 && !generatedGuide && (
            <div className="mb-12 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Your Recent Guides</h2>
              <div className="grid gap-4">
                {isLoadingGuides ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  guides.map(guide => (
                    <Card key={guide.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => handleViewGuide(guide)}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">{guide.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <CalendarCheck className="h-3.5 w-3.5 mr-1 inline" />
                            {format(new Date(guide.createdAt), "MMM d, yyyy")}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {!generatedGuide ? (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-center">Create New Guide</h2>
              <UploadForm onGuideGenerated={handleGuideGenerated} />
            </div>
          ) : (
            <div id="guideDisplay" className="w-full max-w-4xl mx-auto">
              <GuideDisplay 
                markdownContent={generatedGuide} 
                title={selectedGuide?.title}
                company={selectedGuide?.company}
                jobTitle={selectedGuide?.jobTitle}
                candidateName={selectedGuide?.candidateName}
              />
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setGeneratedGuide(null);
                    setSelectedGuide(null);
                  }}
                  className="text-primary underline"
                >
                  Create another guide
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
