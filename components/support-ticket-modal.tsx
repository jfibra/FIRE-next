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
import { HelpCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface SupportTicketModalProps {
  trigger?: React.ReactNode
}

export function SupportTicketModal({ trigger }: SupportTicketModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const deviceInfo = getDeviceInfo()

      const response = await fetch("https://realestatetraining.ph/api/support-tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          priority: "medium", // Default priority
          device_info: JSON.stringify(deviceInfo),
          source: "support_modal",
        }),
      })

      if (response.ok) {
        toast({
          title: "Support ticket submitted",
          description: "We'll get back to you as soon as possible.",
        })
        setIsOpen(false)
        setFormData({
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
      setIsSubmitting(false)
    }
  }

  const defaultTrigger = (
    <Button variant="outline" className="w-full bg-transparent">
      <HelpCircle className="w-4 h-4 mr-2" />
      Create Support Ticket
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Support Ticket</DialogTitle>
          <DialogDescription>Having trouble? Let us know and we'll help you get back on track.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Ticket"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
