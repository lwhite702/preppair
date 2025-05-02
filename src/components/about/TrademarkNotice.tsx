
import React from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

const TrademarkNotice = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="text-center text-sm text-muted-foreground mt-12 md:mt-16 pt-6 md:pt-8 border-t">
      <p className={isMobile ? "px-4" : ""}>
        PrepPair.Me™ and ResumeFormatter.io™ are services and trademarks of Wrelike Brands LLC. All rights reserved.
      </p>
    </section>
  );
};

export default TrademarkNotice;
