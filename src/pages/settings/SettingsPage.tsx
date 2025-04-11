
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, Save, Server, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import MainLayout from "@/components/layout/MainLayout";

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("email");
  
  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "recruitment@example.com",
    smtpPassword: "••••••••••••",
    senderName: "RecruiterHub",
    senderEmail: "noreply@recruiterhub.example.com",
    enableEmailNotifications: true
  });

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    companyName: "RecruiterHub",
    companyWebsite: "https://recruiterhub.example.com",
    timezone: "UTC+0",
    dateFormat: "MM/DD/YYYY"
  });

  // Email templates
  const [emailTemplates, setEmailTemplates] = useState({
    applicationReceivedTemplate: "Dear {{candidateName}},\n\nThank you for applying to the {{position}} position at {{companyName}}. We have received your application and our team will review it shortly.\n\nBest regards,\n{{recruiterName}}",
    interviewInviteTemplate: "Dear {{candidateName}},\n\nWe would like to invite you for an interview for the {{position}} position. Please let us know your availability.\n\nBest regards,\n{{recruiterName}}",
    rejectionTemplate: "Dear {{candidateName}},\n\nThank you for your interest in the {{position}} position. After careful consideration, we have decided to move forward with other candidates.\n\nBest regards,\n{{recruiterName}}"
  });

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAccountSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailTemplates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = () => {
    // In a real application, this would save to a backend
    localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
    localStorage.setItem('accountSettings', JSON.stringify(accountSettings));
    localStorage.setItem('emailTemplates', JSON.stringify(emailTemplates));
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test email sent",
      description: "A test email has been sent to your inbox",
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Settings</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="account">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Mail className="mr-2 h-4 w-4" />
              Email Templates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>
                  Configure your SMTP server for sending emails to candidates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input 
                      id="smtpServer" 
                      name="smtpServer"
                      value={emailSettings.smtpServer} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input 
                      id="smtpPort" 
                      name="smtpPort"
                      value={emailSettings.smtpPort} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input 
                      id="smtpUsername" 
                      name="smtpUsername"
                      value={emailSettings.smtpUsername} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input 
                      id="smtpPassword" 
                      name="smtpPassword"
                      type="password" 
                      value={emailSettings.smtpPassword} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input 
                      id="senderName" 
                      name="senderName"
                      value={emailSettings.senderName} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input 
                      id="senderEmail" 
                      name="senderEmail"
                      value={emailSettings.senderEmail} 
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                  <Switch 
                    id="enableEmailNotifications" 
                    name="enableEmailNotifications"
                    checked={emailSettings.enableEmailNotifications} 
                    onCheckedChange={(checked) => 
                      setEmailSettings(prev => ({
                        ...prev,
                        enableEmailNotifications: checked
                      }))
                    }
                  />
                  <Label htmlFor="enableEmailNotifications">Enable email notifications</Label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={handleTestEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Update your company information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      name="companyName"
                      value={accountSettings.companyName} 
                      onChange={handleAccountSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input 
                      id="companyWebsite" 
                      name="companyWebsite"
                      value={accountSettings.companyWebsite} 
                      onChange={handleAccountSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input 
                      id="timezone" 
                      name="timezone"
                      value={accountSettings.timezone} 
                      onChange={handleAccountSettingsChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Input 
                      id="dateFormat" 
                      name="dateFormat"
                      value={accountSettings.dateFormat} 
                      onChange={handleAccountSettingsChange}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Configure templates for different email communications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationReceivedTemplate">Application Received</Label>
                    <Textarea 
                      id="applicationReceivedTemplate" 
                      name="applicationReceivedTemplate"
                      rows={6}
                      value={emailTemplates.applicationReceivedTemplate} 
                      onChange={handleTemplateChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interviewInviteTemplate">Interview Invitation</Label>
                    <Textarea 
                      id="interviewInviteTemplate" 
                      name="interviewInviteTemplate"
                      rows={6}
                      value={emailTemplates.interviewInviteTemplate} 
                      onChange={handleTemplateChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rejectionTemplate">Rejection Notice</Label>
                    <Textarea 
                      id="rejectionTemplate" 
                      name="rejectionTemplate"
                      rows={6}
                      value={emailTemplates.rejectionTemplate} 
                      onChange={handleTemplateChange}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Templates
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
