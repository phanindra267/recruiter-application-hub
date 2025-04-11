
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, LogOut, RefreshCw, Shield, User } from "lucide-react";
import { format } from "date-fns";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: Date;
  isCurrentSession: boolean;
}

export default function SessionsPage() {
  const { toast } = useToast();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch actual session data from the backend
    const mockSessions: Session[] = [
      {
        id: "session-1",
        device: "Desktop",
        browser: "Chrome",
        location: "New York, USA",
        ip: "192.168.1.1",
        lastActive: new Date(),
        isCurrentSession: true
      },
      {
        id: "session-2",
        device: "Mobile",
        browser: "Safari",
        location: "London, UK",
        ip: "192.168.1.2",
        lastActive: new Date(Date.now() - 3600000),
        isCurrentSession: false
      },
      {
        id: "session-3",
        device: "Tablet",
        browser: "Firefox",
        location: "Berlin, Germany",
        ip: "192.168.1.3",
        lastActive: new Date(Date.now() - 86400000),
        isCurrentSession: false
      }
    ];

    setTimeout(() => {
      setSessions(mockSessions);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleRefreshSessions = () => {
    setIsLoading(true);
    // In a real app, you would fetch the latest session data
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sessions refreshed",
        description: "Your active sessions have been refreshed",
      });
    }, 500);
  };

  const handleTerminateSession = (sessionId: string) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
    toast({
      title: "Session terminated",
      description: "The selected session has been terminated successfully",
    });
  };

  const handleTerminateAllOtherSessions = () => {
    setSessions(sessions.filter(session => session.isCurrentSession));
    toast({
      title: "Sessions terminated",
      description: "All other sessions have been terminated successfully",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Active Sessions</h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshSessions}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleTerminateAllOtherSessions}
              disabled={sessions.filter(s => !s.isCurrentSession).length === 0}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out All Other Devices
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Device Sessions</CardTitle>
            <CardDescription>
              View and manage your active sessions across different devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{session.device}</span>
                          <span className="text-xs text-muted-foreground">
                            {session.browser}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.ip}</TableCell>
                      <TableCell>
                        {format(session.lastActive, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell>
                        {session.isCurrentSession ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Check className="mr-1 h-3 w-3" />
                            Current
                          </Badge>
                        ) : (
                          <Badge variant="outline">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {session.isCurrentSession ? (
                          <Button variant="ghost" size="sm" disabled>
                            Current Session
                          </Button>
                        ) : (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleTerminateSession(session.id)}
                          >
                            Terminate
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
            <CardDescription>
              Tips to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Use a strong password</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure your password is at least 12 characters long and contains a mix of letters, numbers, and special characters.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Enable two-factor authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security by enabling two-factor authentication for your account.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">Regularly review active sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Periodically check and terminate any suspicious or unused sessions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
