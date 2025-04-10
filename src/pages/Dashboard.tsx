
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Briefcase, FileCheck, UserCheck, Users } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentApplications } from "@/components/dashboard/RecentApplications";
import { dashboardStats, recentApplicationsList } from "@/lib/mock-data";

export default function Dashboard() {
  // Ensure the application list has the correct types
  const typedApplicationsList = recentApplicationsList.map(app => ({
    id: app.id,
    candidateName: app.candidateName,
    jobTitle: app.jobTitle,
    status: app.status as "applied" | "reviewing" | "shortlisted" | "rejected" | "hired",
    date: app.date
  }));

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Dashboard
        </h1>
        
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Jobs"
            value={dashboardStats.totalJobs}
            icon={Briefcase}
            description="Active job postings"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Applications"
            value={dashboardStats.totalApplications}
            icon={FileCheck}
            description="Total applications received"
            trend={{ value: 24, isPositive: true }}
          />
          <StatCard
            title="Shortlisted"
            value={dashboardStats.shortlistedCandidates}
            icon={UserCheck}
            description="Candidates in interview stage"
            trend={{ value: 10, isPositive: true }}
          />
          <StatCard
            title="Hired"
            value={dashboardStats.hiredCandidates}
            icon={Users}
            description="Candidates hired this quarter"
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Weekly Applications</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardStats.weeklyApplications}>
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { weekday: 'short' })}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="rounded-xl border bg-card p-4">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Application Status</h3>
            </div>
            <div className="flex h-[200px] items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                {dashboardStats.applicationsByStatus.map((status) => (
                  <div key={status.name} className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor:
                            status.name === "Applied"
                              ? "#3b82f6"
                              : status.name === "Reviewing"
                              ? "#f59e0b"
                              : status.name === "Shortlisted"
                              ? "#10b981"
                              : status.name === "Rejected"
                              ? "#ef4444"
                              : "#8b5cf6",
                        }}
                      />
                      <span className="text-xs font-medium">{status.name}</span>
                    </div>
                    <span className="text-xl font-bold">{status.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Applications */}
        <div className="rounded-xl border bg-card p-4">
          <RecentApplications applications={typedApplicationsList} />
        </div>
      </div>
    </MainLayout>
  );
}
