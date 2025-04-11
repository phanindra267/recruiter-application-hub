
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, FileText, Mail, Send, User } from "lucide-react";

interface SendEmailFormProps {
  candidateEmail?: string;
  candidateName?: string;
  defaultTemplate?: string;
  onClose?: () => void;
}

export default function SendEmailForm({ 
  candidateEmail = '', 
  candidateName = '',
  defaultTemplate = 'custom',
  onClose 
}: SendEmailFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    to: candidateEmail,
    subject: '',
    message: '',
    template: defaultTemplate
  });

  // Email templates
  const templates = {
    applicationReceived: {
      subject: "Thank you for your application",
      message: `Dear ${candidateName},\n\nThank you for applying to our position. We have received your application and our team will review it shortly.\n\nBest regards,\nThe Recruitment Team`
    },
    interviewInvite: {
      subject: "Interview Invitation",
      message: `Dear ${candidateName},\n\nWe would like to invite you for an interview for the position you applied for. Please let us know your availability.\n\nBest regards,\nThe Recruitment Team`
    },
    rejection: {
      subject: "Application Status Update",
      message: `Dear ${candidateName},\n\nThank you for your interest in our company. After careful consideration, we have decided to move forward with other candidates.\n\nBest regards,\nThe Recruitment Team`
    },
    custom: {
      subject: "",
      message: ""
    }
  };

  const handleTemplateChange = (value: string) => {
    setEmailData(prev => ({
      ...prev,
      template: value,
      subject: templates[value as keyof typeof templates].subject,
      message: templates[value as keyof typeof templates].message
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Email sent successfully",
        description: `Email has been sent to ${emailData.to}`,
      });
      
      if (onClose) {
        onClose();
      }
    }, 1500);
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
          <CardDescription>
            Compose and send an email to the candidate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Email Template</Label>
            <Select 
              defaultValue={emailData.template} 
              onValueChange={handleTemplateChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applicationReceived">Application Received</SelectItem>
                <SelectItem value="interviewInvite">Interview Invitation</SelectItem>
                <SelectItem value="rejection">Rejection Notice</SelectItem>
                <SelectItem value="custom">Custom Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to">Recipient</Label>
            <div className="flex items-center rounded-md border px-3">
              <AtSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="to"
                name="to"
                value={emailData.to}
                onChange={handleInputChange}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="recipient@example.com"
                disabled={!!candidateEmail}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <div className="flex items-center rounded-md border px-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <Input
                id="subject"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Email subject"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={8}
              value={emailData.message}
              onChange={handleInputChange}
              placeholder="Type your message here..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading || !emailData.to || !emailData.subject}>
            {isLoading ? (
              <>Sending...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
