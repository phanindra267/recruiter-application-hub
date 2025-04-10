
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface Application {
  id: string;
  candidateName: string;
  jobTitle: string;
  status: "applied" | "reviewing" | "shortlisted" | "rejected" | "hired";
  date: Date;
}

interface RecentApplicationsProps {
  applications: Application[];
}

const statusColors = {
  applied: "bg-blue-100 text-blue-800",
  reviewing: "bg-yellow-100 text-yellow-800",
  shortlisted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  hired: "bg-purple-100 text-purple-800",
};

const statusLabels = {
  applied: "Applied",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

export function RecentApplications({ applications }: RecentApplicationsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Applications</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.candidateName}
                </TableCell>
                <TableCell>{application.jobTitle}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[application.status]}
                  >
                    {statusLabels[application.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(application.date, { addSuffix: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
