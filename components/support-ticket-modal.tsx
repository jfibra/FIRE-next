"use client"

import type React from "react"

import { CheckCircle, Loader2, XCircle, Send } from "lucide-react"
import { useState, useEffect } from "react"

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

interface LocationData {
  ip: string
  country: string
  city: string
  isp: string
}

export function SupportTicketModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isLoading, setIsLoading] = useState(false)
  const [locationData, setLocationData] = useState<LocationData | null>(null)

  // Get user's location and device info
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        setLocationData({
          ip: data.ip,
          country: data.country_name,
          city: data.city,
          isp: data.org,
        })
      } catch (error) {
        console.error("Failed to fetch location data:", error)
      }
    }

    fetchLocationData()
  }, [])

  // Get device information
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent

    // Device type detection
    let deviceType = "Desktop"
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = "Tablet"
    } else if (
      /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)
    ) {
      deviceType = "Mobile"
    }

    // Browser detection
    let browser = "Unknown"
    if (userAgent.includes("Chrome")) browser = "Chrome"
    else if (userAgent.includes("Firefox")) browser = "Firefox"
    else if (userAgent.includes("Safari")) browser = "Safari"
    else if (userAgent.includes("Edge")) browser = "Edge"
    else if (userAgent.includes("Opera")) browser = "Opera"

    // OS detection
    let os = "Unknown"
    if (userAgent.includes("Windows")) os = "Windows"
    else if (userAgent.includes("Mac")) os = "macOS"
    else if (userAgent.includes("Linux")) os = "Linux"
    else if (userAgent.includes("Android")) os = "Android"
    else if (userAgent.includes("iOS")) os = "iOS"

    return { deviceType, browser, os }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    if (!formData.full_name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error")
      setIsLoading(false)
      return
    }

    try {
      const deviceInfo = getDeviceInfo()

      const ticketData = {
        full_name: formData.full_name,
        email: formData.email,
        subject: formData.subject,
        priority: "medium", // Default priority
        message: formData.message,
        status: "Open",
        ipaddress: locationData?.ip || "",
        country: locationData?.country || "",
        city_from_ip: locationData?.city || "",
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        isp: locationData?.isp || "",
        city_from_isp: locationData?.city || "",
        user_id: null,
        assigned_to: null,
      }

      const response = await fetch("https://realestatetraining.ph/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(ticketData),
      })

      if (response.ok) {
        const result = await response.json()
        setStatus("success")
        setFormData({ full_name: "", email: "", subject: "", message: "" })
        setTimeout(() => {
          setOpen(false)
          setStatus("idle")
        }, 3000)
      } else {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        setStatus("error")
      }
    } catch (error) {
      console.error("Network Error:", error)
      setStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-primary-dark-blue-light hover:text-primary-dark-blue-dark transition-colors font-medium">
          Create a ticket
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary-dark-blue">
            Create Support Ticket
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600">
            Having trouble? Submit a support ticket and our team will help you out.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="text-sm sm:text-base h-9 sm:h-10"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="text-sm sm:text-base h-9 sm:h-10"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium">
              Subject *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              className="text-sm sm:text-base h-9 sm:h-10"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Message *
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe your issue in detail..."
              className="text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
              required
              disabled={isLoading}
            />
          </div>
          {status === "success" && (
            <div className="flex items-center gap-2 text-green-600 text-sm sm:text-base">
              <CheckCircle className="h-4 w-4" />
              <span>Support ticket submitted successfully!</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 text-red-600 text-sm sm:text-base">
              <XCircle className="h-4 w-4" />
              <span>Failed to submit ticket. Please try again.</span>
            </div>
          )}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary-dark-blue-light hover:bg-primary-dark-blue text-primary-white h-10 sm:h-11 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
