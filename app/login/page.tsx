"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Eye, EyeOff, AlertCircle, HelpCircle, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Layout } from "@/components/layout"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"error" | "success" | "info">("error")
  const [showPassword, setShowPassword] = useState(false)
  const [supportTicket, setSupportTicket] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (message) {
      setMessage("")
      setMessageType("error")
    }
  }

  const handleSupportTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSupportTicket((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent
    let browserName = "Unknown"
    let osName = "Unknown"

    // Detect browser
    if (userAgent.indexOf("Chrome") > -1) browserName = "Chrome"
    else if (userAgent.indexOf("Firefox") > -1) browserName = "Firefox"
    else if (userAgent.indexOf("Safari") > -1) browserName = "Safari"
    else if (userAgent.indexOf("Edge") > -1) browserName = "Edge"

    // Detect OS
    if (userAgent.indexOf("Windows") > -1) osName = "Windows"
    else if (userAgent.indexOf("Mac") > -1) osName = "macOS"
    else if (userAgent.indexOf("Linux") > -1) osName = "Linux"
    else if (userAgent.indexOf("Android") > -1) osName = "Android"
    else if (userAgent.indexOf("iOS") > -1) osName = "iOS"

    return { browserName, osName, userAgent }
  }

  const handleSupportTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingTicket(true)

    try {
      const deviceInfo = getDeviceInfo()

      const ticketData = {
        ...supportTicket,
        priority: "medium", // Default priority
        device_info: deviceInfo.userAgent,
        browser: deviceInfo.browserName,
        os: deviceInfo.osName,
        location: "Unknown", // You could use a geolocation API here
        timestamp: new Date().toISOString(),
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://realestatetraining.ph/api"}/support-tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketData),
        },
      )

      if (response.ok) {
        toast({
          title: "Support ticket submitted",
          description: "We'll get back to you within 24 hours.",
        })
        setSupportTicket({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to submit ticket")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit support ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmittingTicket(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setMessageType("error")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://realestatetraining.ph/api"}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      // Handle different response statuses with specific messages
      if (response.status === 200) {
        // Success - Login successful
        setMessage(data.message || "Login successful! Redirecting to your dashboard...")
        setMessageType("success")

        // Store user data and login status
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("isLoggedIn", "true")

        toast({
          title: "Login successful",
          description: "Welcome back to FIRE Training Portal!",
        })

        // Redirect to dashboard after a brief delay to show success message
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else if (response.status === 404) {
        // User not found
        setMessage(data.message || "User not found, checking with LR records.")
        setMessageType("info")
      } else if (response.status === 401) {
        // Wrong password
        setMessage(data.message || "Wrong password for the account.")
        setMessageType("error")
      } else {
        // Other errors
        setMessage(data.message || "An unexpected error occurred. Please try again.")
        setMessageType("error")
      }
    } catch (error) {
      console.error("Login error:", error)
      setMessage("Network error. Please check your connection and try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const getAlertVariant = () => {
    switch (messageType) {
      case "success":
        return "default"
      case "info":
        return "default"
      case "error":
      default:
        return "destructive"
    }
  }

  const getAlertIcon = () => {
    switch (messageType) {
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "info":
        return <HelpCircle className="h-4 w-4" />
      case "error":
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <Image
                  src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
                  alt="FIRE Logo"
                  width={120}
                  height={40}
                  className="drop-shadow-sm"
                />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-[#001f3f]">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Sign in to access your FIRE training portal
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
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
                      messageType === "success" ? "text-green-800" : messageType === "info" ? "text-blue-800" : ""
                    }
                  >
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailaddress" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="emailaddress"
                    name="emailaddress"
                    type="email"
                    value={formData.emailaddress}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="h-11 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                      className="h-11 pr-10 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f]"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-[#001f3f] hover:bg-[#001f3f]/90 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <Link href="/forgot-password" className="text-sm text-[#001f3f] hover:underline font-medium">
                  Forgot your password?
                </Link>

                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-gray-600">Need help?</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-[#001f3f] hover:bg-[#001f3f]/10 p-1 h-auto">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Contact Support
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>
                          Having trouble logging in? Send us a message and we'll help you out.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSupportTicketSubmit} className="space-y-4">
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

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-[#001f3f] hover:underline font-medium">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
