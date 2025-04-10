
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ href, icon: Icon, title, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      {/* Backdrop (mobile only) */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 flex-col border-r bg-sidebar p-4 transition-transform duration-300 md:relative md:z-0 md:flex",
          isCollapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "translate-x-0",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-sidebar-foreground"
          >
            {!isCollapsed && <span className="text-sidebar-primary">RecruiterHub</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:flex"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5 md:hidden" />
            )}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>

        <div className="mt-8 flex flex-1 flex-col gap-4">
          <nav className="flex flex-col gap-1">
            <NavItem
              href="/"
              icon={LayoutDashboard}
              title={isCollapsed ? "" : "Dashboard"}
              isActive={isActivePath("/")}
              onClick={() => setIsCollapsed(true)}
            />
            <NavItem
              href="/jobs"
              icon={Briefcase}
              title={isCollapsed ? "" : "Jobs"}
              isActive={isActivePath("/jobs")}
              onClick={() => setIsCollapsed(true)}
            />
            <NavItem
              href="/applications"
              icon={Users}
              title={isCollapsed ? "" : "Applications"}
              isActive={isActivePath("/applications")}
              onClick={() => setIsCollapsed(true)}
            />
            <NavItem
              href="/settings"
              icon={Settings}
              title={isCollapsed ? "" : "Settings"}
              isActive={isActivePath("/settings")}
              onClick={() => setIsCollapsed(true)}
            />
          </nav>

          <div className="mt-auto">
            <NavItem
              href="/auth/logout"
              icon={LogOut}
              title={isCollapsed ? "" : "Logout"}
              isActive={false}
              onClick={() => setIsCollapsed(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
