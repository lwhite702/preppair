
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import { InterviewGuide } from "@/lib/types";
import { useScreenSize } from "@/hooks/use-mobile";

export interface RecentGuidesProps {
  guides: InterviewGuide[];
  isLoading: boolean;
  onViewGuide: (guide: InterviewGuide) => void;
}

const RecentGuides = ({ guides, isLoading, onViewGuide }: RecentGuidesProps) => {
  const { isMobile } = useScreenSize();
  
  return (
    <div className="mb-6 md:mb-12 mx-auto">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Your Recent Guides</h2>
      <div className="grid gap-2 md:gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-24 md:h-32">
            <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-primary" />
          </div>
        ) : guides.length > 0 ? (
          guides.map(guide => (
            <Card 
              key={guide.id} 
              className="hover:border-primary/50 transition-colors cursor-pointer shadow-sm" 
              onClick={() => onViewGuide(guide)}
            >
              <CardContent className={`flex items-center justify-between ${isMobile ? 'p-3' : 'p-4'}`}>
                <div className="space-y-0.5 md:space-y-1">
                  <div className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{guide.title}</div>
                  <div className="text-xs md:text-sm text-muted-foreground flex items-center">
                    <CalendarCheck className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1 inline" />
                    {format(new Date(guide.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"} 
                  className={isMobile ? "h-8 px-2" : ""}
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No guides created yet
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentGuides;
