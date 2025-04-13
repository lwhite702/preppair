
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSubscription = (userId: string | undefined) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [subscriptionEnd, setSubscriptionEnd] = useState<Date | null>(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);

  const checkSubscription = async () => {
    if (!userId) return;
    
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

  useEffect(() => {
    if (userId) {
      checkSubscription();
    }
  }, [userId]);

  return {
    isSubscribed,
    subscriptionTier,
    subscriptionEnd,
    isLoadingSubscription,
    handleCreateSubscription,
    handleManageSubscription,
    checkSubscription
  };
};
