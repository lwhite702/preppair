
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

export const useAnonymousGuides = (hasUser: boolean) => {
  const [anonymousGuideCount, setAnonymousGuideCount] = useState<number>(0);
  const [sessionId, setSessionId] = useState<string>("");
  
  useEffect(() => {
    if (!hasUser) {
      // Initialize or retrieve session ID
      const storedSessionId = localStorage.getItem("interviewAceSessionId");
      const newSessionId = storedSessionId || uuidv4();
      
      if (!storedSessionId) {
        localStorage.setItem("interviewAceSessionId", newSessionId);
      }
      
      setSessionId(newSessionId);
      
      // Check the number of guides created by this anonymous user
      const fetchAnonymousGuideCount = async () => {
        const { data, error, count } = await supabase
          .from("anonymous_guides")
          .select("*", { count: "exact" })
          .eq("session_id", newSessionId);
        
        if (error) {
          console.error("Error fetching anonymous guides:", error);
          return;
        }
        
        setAnonymousGuideCount(count || 0);
      };
      
      fetchAnonymousGuideCount();
    }
  }, [hasUser]);

  // Function to increment the anonymous guide count
  const incrementGuideCount = () => {
    if (!hasUser) {
      setAnonymousGuideCount(prevCount => prevCount + 1);
    }
  };

  return {
    anonymousGuideCount,
    sessionId,
    incrementGuideCount,
    isAnonymousLimitReached: !hasUser && anonymousGuideCount >= 1
  };
};
