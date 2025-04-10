
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Briefcase,
  Clock,
  Edit2,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { format, isAfter } from "date-fns";
import { jobs } from "@/lib/mock-data";
import { useToast } from "@/components/ui/use-toast";

export default function JobsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteJob = (jobId: string) => {
    toast({
      title: "Job deleted",
      description: "The job posting has been deleted successfully.",
    });
  };

  const getStatusBadge = (status: string, deadline: Date) => {
    if (status === "draft") {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Draft</Badge>;
    } else if (status === "closed") {
      return <Badge variant="outline" className="bg-red-100 text-red-800">Closed</Badge>;
    } else if (!isAfter(deadline, new Date())) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800">Expired</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Jobs</h1>
          <Link to="/jobs/create">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add New Job
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="w-full rounded-md border bg-white pl-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className={`cursor-pointer ${!statusFilter ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setStatusFilter(null)}
            >
              All
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer ${statusFilter === "active" ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setStatusFilter("active")}
            >
              Active
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer ${statusFilter === "draft" ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </Badge>
            <Badge
              variant="outline"
              className={`cursor-pointer ${statusFilter === "closed" ? "bg-primary text-primary-foreground" : "bg-background"}`}
              onClick={() => setStatusFilter("closed")}
            >
              Closed
            </Badge>
          </div>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Briefcase className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 text-lg font-semibold">No jobs found</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {searchQuery
                ? `No jobs match your search "${searchQuery}"`
                : "Start by creating your first job posting"}
            </p>
            <Link to="/jobs/create">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add New Job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-2 text-lg">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="hover:text-primary hover:underline"
                        >
                          {job.title}
                        </Link>
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/jobs/${job.id}/edit`}>
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-3 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Deadline: {format(job.deadline, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{job.applicationsCount} Applications</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  {getStatusBadge(job.status, job.deadline)}
                  <Link to={`/applications?jobId=${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Applications
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
