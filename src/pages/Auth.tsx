
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect path from location state or default to dashboard
  const redirectTo = location.state?.redirectTo || "/dashboard";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      toast.success("Sign up successful! Redirecting...");
      navigate(redirectTo);
    } catch (error: any) {
      toast.error(error.message || "Error signing up");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Sign in successful! Redirecting...");
      navigate(redirectTo);
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.message || "Error sending reset email");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* No need for Header here as it's included in App.tsx */}
      <main className="flex-grow py-6 md:py-12">
        <div className="container grid md:grid-cols-2 gap-8 max-w-5xl">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Unlock the Full Power of PrepPair.me</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Save & Access Your Guides</h3>
                  <p className="text-sm text-muted-foreground">Create a library of interview guides for all your job applications</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Download & Print</h3>
                  <p className="text-sm text-muted-foreground">Take your guides offline or share them with a mentor</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Post-Interview Feedback</h3>
                  <p className="text-sm text-muted-foreground">Track your progress and generate follow-up emails</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Unlimited Guide Creation</h3>
                  <p className="text-sm text-muted-foreground">Create as many guides as you need for all your job applications</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-center">PrepPair.me</CardTitle>
              <CardDescription className="text-center">
                Continue where you left off by signing in or creating an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                        <button
                          type="button"
                          onClick={resetPassword}
                          className="text-xs text-primary hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8} // Enforce stronger password policy
                      />
                      <PasswordStrengthMeter password={password} />
                      <p className="text-xs text-muted-foreground">
                        Password should be at least 8 characters with upper and lowercase letters, numbers, and special characters.
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                        </>
                      ) : (
                        "Create Free Account"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              Powered by PrepPair.me
            </CardFooter>
          </Card>
        </div>
      </main>
      {/* No need for Footer here as it's included in App.tsx */}
    </div>
  );
};

export default Auth;
