"use client"

import type React from "react"

import { CheckCircle, Loader2, XCircle, Send } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SupportTicketModal() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, priority: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus("idle")

    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      // Simulate success
      if (formData.name && formData.email && formData.subject && formData.priority && formData.message) {
        setStatus("success")
        setFormData({ name: "", email: "", subject: "", priority: "", message: "" })
        setTimeout(() => {
          setOpen(false)
          setStatus("idle")
        }, 3000)
      } else {
        setStatus("error")
      }
    } catch (error) {
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
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
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
            <Label htmlFor="priority" className="text-sm font-medium">
              Priority Level *
            </Label>
            <Select value={formData.priority} onValueChange={handleSelectChange} disabled={isLoading} required>
              <SelectTrigger className="w-full text-sm sm:text-base h-9 sm:h-10">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Account issue</SelectItem>
                <SelectItem value="high">High - Cannot access courses</SelectItem>
                <SelectItem value="urgent">Urgent - Technical problem</SelectItem>
              </SelectContent>
            </Select>
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
              <span>Ticket submitted successfully!</span>
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
