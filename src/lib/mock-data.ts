// Mock data for development and demonstration
import { subDays, subHours, addDays } from "date-fns";

// Generate consistent IDs
const generateId = (prefix: string, index: number) => `${prefix}-${index.toString().padStart(3, '0')}`;

// Jobs
export const jobs = Array.from({ length: 10 }, (_, i) => ({
  id: generateId('job', i + 1),
  title: [
    "Senior Frontend Developer",
    "Backend Engineer",
    "UX Designer",
    "Product Manager",
    "DevOps Engineer",
    "Data Scientist",
    "Full Stack Developer",
    "Marketing Specialist",
    "HR Coordinator",
    "Customer Support Representative"
  ][i],
  company: "RecruiterHub Inc.",
  location: ["Remote", "New York, NY", "San Francisco, CA", "Austin, TX", "Boston, MA"][i % 5],
  department: ["Engineering", "Design", "Product", "Marketing", "HR"][i % 5],
  employmentType: ["Full-time", "Part-time", "Contract", "Internship"][i % 4],
  description: "We are looking for a talented professional to join our growing team...",
  requirements: "Bachelor's degree in related field, 3+ years of experience...",
  salary: `$${80 + i * 10}k - $${100 + i * 10}k`,
  status: ["draft", "active", "closed"][i % 3],
  postedDate: subDays(new Date(), i * 2),
  deadline: addDays(new Date(), 14 + i),
  applicationsCount: Math.floor(Math.random() * 50)
}));

// Candidates
export const candidates = Array.from({ length: 20 }, (_, i) => ({
  id: generateId('candidate', i + 1),
  name: [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sophia Martinez",
    "William Garcia",
    "Olivia Wilson",
    "James Anderson",
    "Ava Thomas",
    "Alexander Jackson",
    "Charlotte White",
    "Daniel Harris",
    "Mia Martin",
    "Ethan Thompson",
    "Amelia Garcia",
    "Matthew Robinson",
    "Emily Clark",
    "Benjamin Rodriguez",
    "Abigail Lewis",
    "Samuel Walker",
    "Elizabeth Hall"
  ][i],
  email: `candidate${i + 1}@example.com`,
  phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  location: ["New York, NY", "San Francisco, CA", "Austin, TX", "Chicago, IL", "Miami, FL"][i % 5],
  currentRole: ["Software Engineer", "Product Designer", "Data Analyst", "Project Manager", "Marketing Specialist"][i % 5],
  experience: `${Math.floor(Math.random() * 10) + 1} years`,
  skills: [
    ["JavaScript", "React", "TypeScript", "CSS"],
    ["UX Design", "Figma", "Sketch", "Adobe XD"],
    ["Python", "Data Analysis", "SQL", "Machine Learning"],
    ["Project Management", "Scrum", "Agile", "Jira"],
    ["Marketing", "Social Media", "SEO", "Content Writing"]
  ][i % 5],
  resumeUrl: "#",
  portfolioUrl: i % 3 === 0 ? "https://portfolio.example.com" : null
}));

// Applications
export const applications = Array.from({ length: 30 }, (_, i) => {
  const candidateIndex = i % candidates.length;
  const jobIndex = i % jobs.length;
  const daysAgo = Math.floor(Math.random() * 30);
  
  // Ensure status is one of the valid options
  const statusOptions = ["applied", "reviewing", "shortlisted", "rejected", "hired"] as const;
  const status = statusOptions[i % 5];
  
  return {
    id: generateId('application', i + 1),
    candidateId: candidates[candidateIndex].id,
    candidateName: candidates[candidateIndex].name,
    jobId: jobs[jobIndex].id,
    jobTitle: jobs[jobIndex].title,
    status,
    date: subDays(new Date(), daysAgo),
    notes: i % 3 === 0 ? "Candidate has excellent experience and seems like a good culture fit." : "",
    rating: Math.floor(Math.random() * 5) + 1
  };
});

// Dashboard stats
export const dashboardStats = {
  totalJobs: jobs.length,
  activeJobs: jobs.filter(job => job.status === "active").length,
  totalApplications: applications.length,
  newApplications: applications.filter(app => app.date > subDays(new Date(), 7)).length,
  shortlistedCandidates: applications.filter(app => app.status === "shortlisted").length,
  hiredCandidates: applications.filter(app => app.status === "hired").length,
  
  // Applications by status for charts
  applicationsByStatus: [
    { name: "Applied", value: applications.filter(app => app.status === "applied").length },
    { name: "Reviewing", value: applications.filter(app => app.status === "reviewing").length },
    { name: "Shortlisted", value: applications.filter(app => app.status === "shortlisted").length },
    { name: "Rejected", value: applications.filter(app => app.status === "rejected").length },
    { name: "Hired", value: applications.filter(app => app.status === "hired").length }
  ],
  
  // Weekly application trend
  weeklyApplications: Array.from({ length: 7 }, (_, i) => ({
    date: subDays(new Date(), 6 - i).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 10) + 1
  }))
};

// Recent activity
export const recentActivity = Array.from({ length: 10 }, (_, i) => {
  const activityTypes = [
    "job_posted",
    "application_received",
    "candidate_status_changed",
    "candidate_shortlisted",
    "candidate_hired"
  ];
  const activityType = activityTypes[i % activityTypes.length];
  const hoursAgo = Math.floor(Math.random() * 48);
  
  let message = "";
  
  switch (activityType) {
    case "job_posted":
      message = `New job posted: ${jobs[i % jobs.length].title}`;
      break;
    case "application_received":
      message = `New application from ${candidates[i % candidates.length].name} for ${jobs[i % jobs.length].title}`;
      break;
    case "candidate_status_changed":
      message = `${candidates[i % candidates.length].name}'s status changed to ${["reviewing", "shortlisted", "rejected"][i % 3]}`;
      break;
    case "candidate_shortlisted":
      message = `${candidates[i % candidates.length].name} was shortlisted for ${jobs[i % jobs.length].title}`;
      break;
    case "candidate_hired":
      message = `${candidates[i % candidates.length].name} was hired for ${jobs[i % jobs.length].title}`;
      break;
  }
  
  return {
    id: generateId('activity', i + 1),
    type: activityType,
    message,
    date: subHours(new Date(), hoursAgo),
    read: i % 3 === 0
  };
});

// Recent applications for dashboard
export const recentApplicationsList = applications
  .sort((a, b) => b.date.getTime() - a.date.getTime())
  .slice(0, 5);
