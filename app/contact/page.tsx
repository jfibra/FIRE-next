"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-white to-gray-100">
      <Header />
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark-blue mb-3 sm:mb-4">Get in Touch</h1>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our courses or need assistance? We're here to help you start your real estate
              journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-primary-dark-blue flex items-center gap-2 sm:gap-3">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-dark-blue rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Phone Number</p>
                      <p className="text-base sm:text-lg font-semibold text-primary-dark-blue">+63 9569256686</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-dark-blue rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Email Address</p>
                      <p className="text-base sm:text-lg font-semibold text-primary-dark-blue">
                        info@filipinohomes.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-dark-blue rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-white" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">Office Address</p>
                      <p className="text-base sm:text-lg font-semibold text-primary-dark-blue">Cebu, Philippines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl text-green-800 flex items-center gap-2 sm:gap-3">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-primary-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Monday - Friday</span>
                    <span className="font-bold text-primary-dark-blue text-sm sm:text-base">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-primary-white rounded-lg shadow-sm">
                    <span className="font-medium text-gray-700 text-sm sm:text-base">Saturday</span>
                    <span className="font-bold text-primary-dark-blue text-sm sm:text-base">8:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-100 rounded-lg">
                    <span className="font-medium text-gray-500 text-sm sm:text-base">Sunday</span>
                    <span className="font-medium text-gray-500 text-sm sm:text-base">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-primary-white">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-primary-dark-blue flex items-center gap-2 sm:gap-3">
                  <Send className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark-blue" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-1 sm:mt-2 h-10 sm:h-12 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 sm:mt-2 h-10 sm:h-12 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 sm:mt-2 h-10 sm:h-12 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 sm:mt-2 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue resize-none text-sm sm:text-base"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue text-lg font-semibold shadow-lg hover:from-primary-dark-blue hover:to-primary-dark-blue-dark"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
