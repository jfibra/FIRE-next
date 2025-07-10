"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

interface LocationData {
  ip: string
  country: string
  city: string
  isp: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
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

    try {
      const deviceInfo = getDeviceInfo()

      const contactData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        ipaddress: locationData?.ip || "",
        country: locationData?.country || "",
        city_from_ip: locationData?.city || "",
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        isp: locationData?.isp || "",
        city_from_isp: locationData?.city || "",
      }

      const response = await fetch("https://realestatetraining.ph/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (response.ok) {
        const result = await response.json()
        setStatus("success")
        setFormData({ full_name: "", email: "", phone: "", message: "" })
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />

      <div className="flex-grow bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001f3f] mb-4">Get in Touch</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our real estate training programs? We're here to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[#001f3f]">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#001f3f] p-2 sm:p-3 rounded-lg">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#001f3f] text-base sm:text-lg">Address</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        123 Real Estate Avenue
                        <br />
                        Manila, Philippines 1000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#001f3f] p-2 sm:p-3 rounded-lg">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#001f3f] text-base sm:text-lg">Phone</h3>
                      <p className="text-gray-600 text-sm sm:text-base">+63 (2) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#001f3f] p-2 sm:p-3 rounded-lg">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#001f3f] text-base sm:text-lg">Email</h3>
                      <p className="text-gray-600 text-sm sm:text-base">info@realestatetraining.ph</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#001f3f] p-2 sm:p-3 rounded-lg">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#001f3f] text-base sm:text-lg">Business Hours</h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 9:00 AM - 2:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-[#001f3f]">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-sm font-semibold text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="h-10 sm:h-12 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f] text-sm sm:text-base"
                        placeholder="Enter your full name"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-10 sm:h-12 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f] text-sm sm:text-base"
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-10 sm:h-12 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f] text-sm sm:text-base"
                        placeholder="Enter your phone number"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[120px] sm:min-h-[150px] border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f] text-sm sm:text-base resize-none"
                        placeholder="Tell us how we can help you..."
                        required
                        disabled={isLoading}
                      />
                    </div>

                    {status === "success" && (
                      <div className="flex items-center gap-2 text-green-600 text-sm sm:text-base">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Message sent successfully! We'll get back to you soon.</span>
                      </div>
                    )}

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-600 text-sm sm:text-base">
                        <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Failed to send message. Please try again.</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-10 sm:h-12 bg-gradient-to-r from-[#001f3f] to-[#001f3f]/90 hover:from-[#001f3f]/90 hover:to-[#001f3f] text-base sm:text-lg font-semibold shadow-lg"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
