
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login (for demo purposes)
    setTimeout(() => {
      // For demo purposes, we're using a hardcoded test user
      if (email === "demo@recruiter.com" && password === "password") {
        // Store user info in localStorage (in a real app, you'd store the token)
        localStorage.setItem("recruiterUser", JSON.stringify({ 
          name: "Demo Recruiter",
          email: "demo@recruiter.com"
        }));
        
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Try demo@recruiter.com / password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-recruiter-50 to-recruiter-100 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-recruiter-800">RecruiterHub</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/auth/forgot-password"
                className="text-xs text-recruiter-600 hover:text-recruiter-800"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-recruiter-600 hover:bg-recruiter-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link
              to="/auth/register"
              className="text-recruiter-600 hover:text-recruiter-800"
            >
              Sign up
            </Link>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setEmail("demo@recruiter.com");
                setPassword("password");
              }}
            >
              Use Demo Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
