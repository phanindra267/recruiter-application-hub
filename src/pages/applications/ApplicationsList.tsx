
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Download,
  Eye,
  Filter,
  MessageSquare,
  Search,
  UserCheck,
  X,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { applications, jobs } from "@/lib/mock-data";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

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

export default function ApplicationsList() {
  const [searchParams] = useSearchParams();
  const initialJobId = searchParams.get("jobId");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<string | null>(initialJobId);
  const { toast } = useToast();

  const filteredApplications = applications.filter((application) => {
    // Filter by search query (candidate name)
    const matchesSearch = application.candidateName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter ? application.status === statusFilter : true;
    
    // Filter by job
    const matchesJob = jobFilter ? application.jobId === jobFilter : true;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Application status changed to ${statusLabels[newStatus]}`,
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Applications
        </h1>
        
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex w-full flex-1 gap-2 md:w-auto md:justify-end">
            <Select
              value={statusFilter || ""}
              onValueChange={(value) => setStatusFilter(value || null)}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {statusFilter ? statusLabels[statusFilter] : "All Statuses"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={jobFilter || ""}
              onValueChange={(value) => setJobFilter(value || null)}
            >
              <SelectTrigger className="w-[220px]">
                <div className="flex items-center gap-2 truncate">
                  {jobFilter
                    ? jobs.find((job) => job.id === jobFilter)?.title || "Select Job"
                    : "All Jobs"}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {(statusFilter || jobFilter) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setStatusFilter(null);
                  setJobFilter(null);
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear filters</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No applications found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="font-medium">{application.candidateName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">
                        {application.jobTitle}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={`w-[130px] justify-start p-1 pl-2 ${
                              statusColors[application.status]
                            }`}
                          >
                            <span>{statusLabels[application.status]}</span>
                            <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(application.id, "applied")}
                            className="bg-blue-100 text-blue-800"
                          >
                            Applied
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(application.id, "reviewing")}
                            className="bg-yellow-100 text-yellow-800"
                          >
                            Reviewing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(application.id, "shortlisted")}
                            className="bg-green-100 text-green-800"
                          >
                            Shortlisted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(application.id, "rejected")}
                            className="bg-red-100 text-red-800"
                          >
                            Rejected
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(application.id, "hired")}
                            className="bg-purple-100 text-purple-800"
                          >
                            Hired
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>
                      {format(application.date, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link to={`/applications/${application.id}/resume`}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download Resume</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link to={`/applications/${application.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
