
import { Bell, Mail, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({ user }: HeaderProps) {
  const mockUser = user || {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4 lg:gap-6">
        <h1 className="text-lg font-semibold md:text-xl lg:block lg:text-2xl">
          RecruiterHub
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/settings">
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
        
        <Link to="/settings">
          <Button variant="outline" size="icon">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Emails</span>
          </Button>
        </Link>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-recruiter-600 text-xs text-white">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
              aria-label="User menu"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-recruiter-100 text-recruiter-700">
                {mockUser.avatar ? (
                  <img
                    src={mockUser.avatar}
                    alt={mockUser.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {mockUser.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {mockUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Email Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings/sessions">Active Sessions</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth/logout">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
