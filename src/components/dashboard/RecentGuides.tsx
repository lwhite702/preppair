
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import { InterviewGuide } from "@/lib/types";

interface RecentGuidesProps {
  guides: InterviewGuide[];
  isLoading: boolean;
  onViewGuide: (guide: InterviewGuide) => void;
}

const RecentGuides = ({ guides, isLoading, onViewGuide }: RecentGuidesProps) => {
  return (
    <div className="mb-12 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Recent Guides</h2>
      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          guides.map(guide => (
            <Card key={guide.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => onViewGuide(guide)}>
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
  );
};

export default RecentGuides;
