"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, HelpCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SupportTicketModalProps {
  children: React.ReactNode
}

export function SupportTicketModal({ children }: SupportTicketModalProps) {
  const [supportTicket, setSupportTicket] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false)

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Contact Support
          </DialogTitle>
          <DialogDescription>Having trouble? Send us a message and we'll help you out.</DialogDescription>
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
          <Button type="submit" className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90" disabled={isSubmittingTicket}>
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
  )
}
