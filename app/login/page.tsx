"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react"
import Image from "next/image"
import { SupportTicketModal } from "@/components/support-ticket-modal"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check credentials (you can modify this logic as needed)
    if (formData.email === "itadmin@gmail.com" && formData.password === "admin123") {
      // Store user session (in a real app, you'd use proper authentication)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: formData.email,
          name: "IT Admin",
          role: "admin",
        }),
      )

      // Redirect to dashboard
      router.push("/dashboard")
    } else {
      alert("Invalid credentials. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />

      <div className="flex-grow bg-gradient-to-br from-gray-50 via-primary-white to-gray-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Login Card */}
          <Card className="border-0 my-4 shadow-2xl bg-primary-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6 sm:pb-8">
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary-dark-blue">Welcome Back</CardTitle>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Sign in to access your agent dashboard</p>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-9 sm:pl-10 h-10 sm:h-12 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue text-sm sm:text-base"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-12 border-gray-300 focus:border-primary-dark-blue focus:ring-primary-dark-blue text-sm sm:text-base"
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 sm:h-12 bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue hover:from-primary-dark-blue hover:to-primary-dark-blue-dark text-base sm:text-lg font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 h-5 mr-2 border-2 border-primary-white border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 sm:w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center space-y-3 sm:space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-primary-white text-gray-500">Need help?</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-600">
                  Having trouble logging in? <SupportTicketModal />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
