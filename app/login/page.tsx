"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Eye,
  EyeOff,
  AlertCircle,
  HelpCircle,
  CheckCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Layout } from "@/components/layout";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info">(
    "error"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [supportTicket, setSupportTicket] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (message) {
      setMessage("");
      setMessageType("error");
    }
  };

  const handleSupportTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSupportTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let osName = "Unknown";

    // Detect browser
    if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome";
    else if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox";
    else if (userAgent.indexOf("Safari") > -1) browserName = "Safari";
    else if (userAgent.indexOf("Edge") > -1) browserName = "Edge";

    // Detect OS
    if (userAgent.indexOf("Windows") > -1) osName = "Windows";
    else if (userAgent.indexOf("Mac") > -1) osName = "macOS";
    else if (userAgent.indexOf("Linux") > -1) osName = "Linux";
    else if (userAgent.indexOf("Android") > -1) osName = "Android";
    else if (userAgent.indexOf("iOS") > -1) osName = "iOS";

    return { browserName, osName, userAgent };
  };

  const handleSupportTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTicket(true);

    try {
      const deviceInfo = getDeviceInfo();

      const ticketData = {
        ...supportTicket,
        priority: "medium", // Default priority
        device_info: deviceInfo.userAgent,
        browser: deviceInfo.browserName,
        os: deviceInfo.osName,
        location: "Unknown", // You could use a geolocation API here
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://realestatetraining.ph/api"
        }/support-tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        }
      );

      if (response.ok) {
        toast({
          title: "Support ticket submitted",
          description: "We'll get back to you within 24 hours.",
        });
        setSupportTicket({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit ticket");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setMessageType("error");

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "https://realestatetraining.ph/api"
        }/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // Handle different response statuses with specific messages
      if (response.status === 200) {
        // Success - Login successful
        setMessage(
          data.message || "Login successful! Redirecting to your dashboard..."
        );
        setMessageType("success");

        // Store user data and login status
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");

        toast({
          title: "Login successful",
          description: "Welcome back to FIRE Training Portal!",
        });

        // Redirect to dashboard after a brief delay to show success message
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else if (response.status === 404) {
        // User not found
        setMessage(data.message || "User not found, checking with LR records.");
        setMessageType("info");
      } else if (response.status === 401) {
        // Wrong password
        setMessage(data.message || "Wrong password for the account.");
        setMessageType("error");
      } else {
        // Other errors
        setMessage(
          data.message || "An unexpected error occurred. Please try again."
        );
        setMessageType("error");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Network error. Please check your connection and try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const getAlertVariant = () => {
    switch (messageType) {
      case "success":
        return "default";
      case "info":
        return "default";
      case "error":
      default:
        return "destructive";
    }
  };

  const getAlertIcon = () => {
    switch (messageType) {
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "info":
        return <HelpCircle className="h-4 w-4" />;
      case "error":
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-2xl">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-8 pb-12 text-center">
              <div className="flex justify-center">
                <Image
                  src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
                  alt="FIRE Logo"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold text-[#001f3f] mb-3">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-xl text-gray-600">
                  Sign in to access your FIRE training portal
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 px-12 pb-12">
              {message && (
                <Alert
                  variant={getAlertVariant()}
                  className={
                    messageType === "success"
                      ? "border-green-200 bg-green-50"
                      : messageType === "info"
                      ? "border-blue-200 bg-blue-50"
                      : ""
                  }
                >
                  {getAlertIcon()}
                  <AlertDescription
                    className={
                      messageType === "success"
                        ? "text-green-800"
                        : messageType === "info"
                        ? "text-blue-800"
                        : ""
                    }
                  >
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label
                    htmlFor="emailaddress"
                    className="text-xl font-medium text-[#001f3f]"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="emailaddress"
                    name="emailaddress"
                    type="email"
                    value={formData.emailaddress}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="pl-4 h-16 text-xl border-2 border-gray-200 focus:border-[#e0a800] focus:ring-[#e0a800] rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="password"
                    className="text-xl font-medium text-[#001f3f]"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="pl-4 pr-14 h-16 text-xl border-2 border-gray-200 focus:border-[#e0a800] focus:ring-[#e0a800] rounded-lg"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-6 w-6 text-gray-400" />
                      ) : (
                        <Eye className="h-6 w-6 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-16 text-xl font-semibold bg-[#e0a800] hover:bg-[#001f3f] text-white transition-all duration-300 transform hover:scale-[1.02] rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-6">
                <Link
                  href="/forgot-password"
                  className="text-2xl text-[#e0a800] hover:text-[#001f3f] font-medium transition-colors"
                >
                  Forgot your password?
                </Link>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-2xl text-gray-600">Need help?</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-2xl text-[#001f3f] hover:bg-[#001f3f]/10 p-1 h-auto"
                      >
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Create A Support Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create A Support Ticket</DialogTitle>
                        <DialogDescription>
                          Having trouble logging in? Send us a message and we'll
                          help you out.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSupportTicketSubmit}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={supportTicket.fullName}
                            onChange={handleSupportTicketChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={supportTicket.email}
                            onChange={handleSupportTicketChange}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={supportTicket.subject}
                            onChange={handleSupportTicketChange}
                            placeholder="Brief description of your issue"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={supportTicket.message}
                            onChange={handleSupportTicketChange}
                            placeholder="Describe your issue in detail..."
                            className="min-h-[100px]"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90"
                          disabled={isSubmittingTicket}
                        >
                          {isSubmittingTicket ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Ticket"
                          )}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
