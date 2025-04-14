
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  FileText, 
  Trash2, 
  Eye, 
  CalendarIcon, 
  User, 
  Briefcase 
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GuideData {
  id: string;
  title: string;
  candidateName: string | null;
  jobTitle: string;
  company: string;
  createdAt: string;
  content: string;
  userId: string | null;
  userEmail?: string;
  userName?: string;
}

const AdminGuides = () => {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      
      // Fetch all guides with user information
      const { data, error } = await supabase
        .from("interview_guides")
        .select(`
          id, 
          title, 
          candidate_name, 
          job_title, 
          company, 
          created_at, 
          content,
          user_id
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Fetch all users to get their emails
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, name");
        
      if (profilesError) throw profilesError;
      
      // Create a user lookup map
      const userMap = new Map();
      profiles?.forEach(profile => {
        userMap.set(profile.id, { 
          email: profile.email,
          name: profile.name
        });
      });
      
      // Map the guides with user information
      const formattedGuides: GuideData[] = data?.map(guide => ({
        id: guide.id,
        title: guide.title,
        candidateName: guide.candidate_name,
        jobTitle: guide.job_title,
        company: guide.company,
        createdAt: guide.created_at,
        content: guide.content,
        userId: guide.user_id,
        userEmail: guide.user_id ? userMap.get(guide.user_id)?.email : "Anonymous",
        userName: guide.user_id ? userMap.get(guide.user_id)?.name : null
      })) || [];
      
      setGuides(formattedGuides);
    } catch (error: any) {
      console.error("Error fetching guides:", error);
      toast.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleViewGuide = (guide: GuideData) => {
    setSelectedGuide(guide);
  };

  const handleDeleteGuide = async () => {
    if (!selectedGuide) return;
    
    try {
      const { error } = await supabase
        .from("interview_guides")
        .delete()
        .eq("id", selectedGuide.id);
        
      if (error) throw error;
      
      toast.success("Guide deleted successfully");
      setGuides(guides.filter(g => g.id !== selectedGuide.id));
      setShowDeleteDialog(false);
      setSelectedGuide(null);
    } catch (error: any) {
      console.error("Error deleting guide:", error);
      toast.error(`Failed to delete guide: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Interview Guides</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchGuides}
          disabled={loading}
        >
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
          Refresh
        </Button>
      </div>
      
      {loading ? (
        <div className="py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {selectedGuide ? (
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedGuide.title}</h3>
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {selectedGuide.candidateName && (
                        <p className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1" />
                          Candidate: {selectedGuide.candidateName}
                        </p>
                      )}
                      <p className="flex items-center">
                        <Briefcase className="h-3.5 w-3.5 mr-1" />
                        {selectedGuide.jobTitle} at {selectedGuide.company}
                      </p>
                      <p className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        Created on {format(new Date(selectedGuide.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedGuide(null)}
                    >
                      Back to List
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Guide
                    </Button>
                  </div>
                </div>
                
                <div className="prose max-w-none mt-6">
                  {selectedGuide.content.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {guides.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No guides found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    guides.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell className="font-medium">
                          {guide.title}
                        </TableCell>
                        <TableCell>
                          {guide.jobTitle} at {guide.company}
                        </TableCell>
                        <TableCell>
                          {guide.userEmail || "Anonymous"}
                        </TableCell>
                        <TableCell>
                          {format(new Date(guide.createdAt), "MMM d, yyyy")}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewGuide(guide)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedGuide(guide);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      
      <AlertDialog 
        open={showDeleteDialog} 
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              interview guide and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteGuide}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminGuides;
