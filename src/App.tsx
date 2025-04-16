
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import JobsList from "./pages/jobs/JobsList";
import CreateJob from "./pages/jobs/CreateJob";
import ApplicationsList from "./pages/applications/ApplicationsList";
import ApplicationDetail from "./pages/applications/ApplicationDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/settings/SettingsPage";
import SessionsPage from "./pages/settings/SessionsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Simple authentication check
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("recruiterUser") !== null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route 
            path="/auth/logout" 
            element={
              <Navigate 
                to="/auth/login"
                replace
              />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jobs/create" 
            element={
              <ProtectedRoute>
                <CreateJob />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/applications" 
            element={
              <ProtectedRoute>
                <ApplicationsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/applications/:id" 
            element={
              <ProtectedRoute>
                <ApplicationDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* Settings Routes */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings/sessions" 
            element={
              <ProtectedRoute>
                <SessionsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
