"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, AlertCircle, HelpCircle } from "lucide-react"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface LoginUser {
  id: number
  emailaddress: string
  firstname?: string
  lastname?: string
  name?: string
}

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Support ticket modal state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [ticketData, setTicketData] = useState({
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
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleTicketInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTicketData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent
    let browserName = "Unknown"
    let osName = "Unknown"

    // Detect browser
    if (userAgent.includes("Chrome")) browserName = "Chrome"
    else if (userAgent.includes("Firefox")) browserName = "Firefox"
    else if (userAgent.includes("Safari")) browserName = "Safari"
    else if (userAgent.includes("Edge")) browserName = "Edge"

    // Detect OS
    if (userAgent.includes("Windows")) osName = "Windows"
    else if (userAgent.includes("Mac")) osName = "macOS"
    else if (userAgent.includes("Linux")) osName = "Linux"
    else if (userAgent.includes("Android")) osName = "Android"
    else if (userAgent.includes("iOS")) osName = "iOS"

    return {
      browser: browserName,
      os: osName,
      userAgent: userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString(),
    }
  }

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingTicket(true)

    try {
      const deviceInfo = getDeviceInfo()

      const response = await fetch("https://realestatetraining.ph/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: ticketData.fullName,
          email: ticketData.email,
          subject: ticketData.subject,
          message: ticketData.message,
          priority: "medium", // Default priority
          device_info: JSON.stringify(deviceInfo),
          source: "login_page",
        }),
      })

      if (response.ok) {
        toast({
          title: "Support ticket submitted",
          description: "We'll get back to you as soon as possible.",
        })
        setIsTicketModalOpen(false)
        setTicketData({
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
    setError("")

    try {
      const response = await fetch("https://realestatetraining.ph/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailaddress: formData.emailaddress,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store user data and login status
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("isLoggedIn", "true")

        toast({
          title: "Login successful",
          description: "Welcome back!",
        })

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError(data.message || "Invalid credentials")
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] to-[#003366] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png"
            alt="FIRE Logo"
            width={200}
            height={80}
            className="mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to FIRE</h1>
          <p className="text-blue-100">Sign in to access your training dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-[#001f3f]">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="emailaddress">Email Address</Label>
                <Input
                  id="emailaddress"
                  name="emailaddress"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.emailaddress}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Support Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">Need help accessing your account?</p>
                <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Create Support Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create Support Ticket</DialogTitle>
                      <DialogDescription>
                        Having trouble? Let us know and we'll help you get back on track.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitTicket} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={ticketData.fullName}
                          onChange={handleTicketInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={ticketData.email}
                          onChange={handleTicketInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={ticketData.subject}
                          onChange={handleTicketInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={ticketData.message}
                          onChange={handleTicketInputChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmittingTicket}>
                        {isSubmittingTicket ? "Submitting..." : "Submit Ticket"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-100 text-sm">© 2024 Filipino Homes Institute of Real Estate. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
