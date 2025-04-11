
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  Download,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import MainLayout from "@/components/layout/MainLayout";
import { applications, candidates, jobs } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import SendEmailForm from "@/components/email/SendEmailForm";

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-800",
  reviewing: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  hired: "bg-purple-100 text-purple-800",
};

const statusLabels: Record<string, string> = {
  applied: "Applied",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the application by ID
  const application = applications.find((app) => app.id === id);
  
  // Find the candidate and job
  const candidate = candidates.find((c) => c.id === application?.candidateId);
  const job = jobs.find((j) => j.id === application?.jobId);
  
  const [note, setNote] = useState(application?.notes || "");
  const [currentStatus, setCurrentStatus] = useState<"applied" | "reviewing" | "shortlisted" | "rejected" | "hired">(
    (application?.status as "applied" | "reviewing" | "shortlisted" | "rejected" | "hired") || "applied"
  );
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  if (!application || !candidate || !job) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-2xl font-bold">Application not found</h1>
          <p className="mt-2 text-gray-500">
            The application you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/applications">
            <Button className="mt-4">Go back to Applications</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleStatusChange = (newStatus: "applied" | "reviewing" | "shortlisted" | "rejected" | "hired") => {
    setCurrentStatus(newStatus);
    toast({
      title: "Status updated",
      description: `Application status changed to ${statusLabels[newStatus]}`,
    });
  };

  const handleNoteSubmit = () => {
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully",
    });
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/applications">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Application Details
          </h1>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Candidate Info Card */}
          <div className="col-span-1 rounded-lg border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-recruiter-100 text-recruiter-800">
                <User className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-bold">{candidate.name}</h2>
              <p className="text-muted-foreground">{candidate.currentRole}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge className={statusColors[currentStatus]}>
                  {statusLabels[currentStatus]}
                </Badge>
                <Badge variant="outline">{candidate.experience}</Badge>
              </div>
              
              <div className="mt-6 w-full space-y-4 border-t pt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${candidate.email}`}
                    className="text-sm hover:underline"
                  >
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${candidate.phone}`}
                    className="text-sm hover:underline"
                  >
                    {candidate.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Applied {format(application.date, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid w-full grid-cols-2 gap-2">
                <Button asChild>
                  <a href="#">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>
                <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" /> Email
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Send Email to Candidate</DialogTitle>
                      <DialogDescription>
                        Send an email to {candidate.name} regarding their application.
                      </DialogDescription>
                    </DialogHeader>
                    <SendEmailForm 
                      candidateEmail={candidate.email}
                      candidateName={candidate.name}
                      defaultTemplate="custom"
                      onClose={() => setEmailDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Job Information */}
            <div className="rounded-lg border bg-card">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">Applied for</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Change status:
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`w-[120px] justify-between text-sm ${
                          statusColors[currentStatus]
                        }`}
                      >
                        {statusLabels[currentStatus]}
                        <ChevronLeft className="h-4 w-4 rotate-270" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("applied")}
                        className="bg-blue-100 text-blue-800"
                      >
                        Applied
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("reviewing")}
                        className="bg-yellow-100 text-yellow-800"
                      >
                        Reviewing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("shortlisted")}
                        className="bg-green-100 text-green-800"
                      >
                        Shortlisted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("rejected")}
                        className="bg-red-100 text-red-800"
                      >
                        Rejected
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange("hired")}
                        className="bg-purple-100 text-purple-800"
                      >
                        Hired
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <div className="mt-2 flex items-center gap-6">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{job.department}</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Job Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Application Tabs */}
            <Tabs defaultValue="candidate" className="rounded-lg border bg-card">
              <TabsList className="grid w-full grid-cols-3 rounded-t-lg bg-muted">
                <TabsTrigger value="candidate">Candidate Info</TabsTrigger>
                <TabsTrigger value="skills">Skills & Experience</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="candidate" className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Candidate Rating</h3>
                    <div className="flex items-center gap-2">
                      {renderRating(application.rating || 0)}
                      <span className="text-sm text-muted-foreground">
                        ({application.rating}/5)
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold">Current Role</h3>
                    <p>{candidate.currentRole}</p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold">Location</h3>
                    <p>{candidate.location}</p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold">Experience</h3>
                    <p>{candidate.experience}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {candidate.portfolioUrl && (
                    <div>
                      <h3 className="mb-2 font-semibold">Portfolio</h3>
                      <a
                        href={candidate.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.portfolioUrl}
                      </a>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="p-4">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Add notes about this candidate..."
                    className="min-h-32"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  
                  <Button onClick={handleNoteSubmit}>Save Notes</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
