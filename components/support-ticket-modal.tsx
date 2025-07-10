"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export function SupportTicketModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Function to detect device information
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent
    let deviceType = "Desktop"
    let browser = "Unknown"
    let os = "Unknown"

    // Device type detection
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = "Tablet"
    } else if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)
    ) {
      deviceType = "Mobile"
    }

    // Browser detection
    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"
    else if (userAgent.includes("Opera")) browser = "Opera"

    // OS detection
    if (userAgent.includes("Windows")) os = "Windows"
    else if (userAgent.includes("Mac")) os = "macOS"
    else if (userAgent.includes("Linux")) os = "Linux"
    else if (userAgent.includes("Android")) os = "Android"
    else if (userAgent.includes("iOS")) os = "iOS"

    return { deviceType, browser, os }
  }

  // Function to get IP and location information
  const getLocationInfo = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/")
      const data = await response.json()
      return {
        ipaddress: data.ip || "",
        country: data.country_name || "",
        city_from_ip: data.city || "",
        isp: data.org || "",
        city_from_isp: data.city || "",
      }
    } catch (error) {
      console.error("Error getting location info:", error)
      return {
        ipaddress: "",
        country: "",
        city_from_ip: "",
        isp: "",
        city_from_isp: "",
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Validate required fields
      if (!formData.full_name || !formData.email || !formData.subject || !formData.message) {
        setErrorMessage("Please fill in all required fields.")
        setSubmitStatus("error")
        return
      }

      // Get device and location information
      const deviceInfo = getDeviceInfo()
      const locationInfo = await getLocationInfo()

      // Prepare the data for submission
      const submitData = {
        ...formData,
        ...deviceInfo,
        ...locationInfo,
        status: "Open",
      }

      const response = await fetch("https://realestatetraining.ph/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          full_name: "",
          email: "",
          subject: "",
          message: "",
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsOpen(false)
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setErrorMessage(result.message || "Failed to submit support ticket. Please try again.")
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting support ticket:", error)
      setErrorMessage("Network error. Please check your connection and try again.")
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-800 underline">Create a ticket</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>
            Need help? Submit a support ticket and our team will get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === "success" && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Your support ticket has been submitted successfully! We'll get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              placeholder="Brief description of your issue"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Please describe your issue in detail..."
              className="min-h-[100px]"
              disabled={isSubmitting}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-[#001f3f] hover:bg-[#001f3f]/90">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Ticket"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
