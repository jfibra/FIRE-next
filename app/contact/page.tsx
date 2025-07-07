"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-600 font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Get in Touch</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Have questions about our courses or need assistance? We're here to help you start your real estate
              journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                    <Phone className="w-6 h-6" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Phone Number</p>
                      <p className="text-lg font-semibold text-slate-800">+63 9569256686</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Email Address</p>
                      <p className="text-lg font-semibold text-slate-800">info@filipinohomes.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Office Address</p>
                      <p className="text-lg font-semibold text-slate-800">Cebu, Philippines</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800 flex items-center gap-3">
                    <Clock className="w-6 h-6" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-slate-700">Monday - Friday</span>
                      <span className="font-bold text-slate-800">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                      <span className="font-medium text-slate-700">Saturday</span>
                      <span className="font-bold text-slate-800">8:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                      <span className="font-medium text-slate-500">Sunday</span>
                      <span className="font-medium text-slate-500">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-0 shadow-2xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
                  <Send className="w-6 h-6 text-blue-600" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-2 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-2 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-2 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-semibold text-slate-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
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
