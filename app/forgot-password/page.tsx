"use client"

import type React from "react"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "https://realestatetraining.ph/api"}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailaddress: email }),
        },
      )

      const data = await response.json()

      if (data.success) {
        // Show success notification
        await Swal.fire({
          icon: "success",
          title: "Password Reset Successful!",
          text: data.message,
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#e0a800",
          background: "#ffffff",
          color: "#001f3f",
          customClass: {
            popup: "rounded-lg shadow-2xl",
            title: "text-[#001f3f] font-bold",
            content: "text-gray-600",
            confirmButton:
              "bg-[#e0a800] hover:bg-[#001f3f] text-white font-semibold px-6 py-2 rounded-md transition-colors",
          },
        })

        // Redirect to login page
        router.push("/login")
      } else {
        // Show error notification
        await Swal.fire({
          icon: "error",
          title: "Email Not Found",
          text: data.message || "Email address not found. Please enter a valid email address.",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#e0a800",
          background: "#ffffff",
          color: "#001f3f",
          customClass: {
            popup: "rounded-lg shadow-2xl",
            title: "text-[#001f3f] font-bold",
            content: "text-gray-600",
            confirmButton:
              "bg-[#e0a800] hover:bg-[#001f3f] text-white font-semibold px-6 py-2 rounded-md transition-colors",
          },
        })
      }
    } catch (error) {
      // Show error notification for network issues
      await Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Unable to process your request. Please check your internet connection and try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#e0a800",
        background: "#ffffff",
        color: "#001f3f",
        customClass: {
          popup: "rounded-lg shadow-2xl",
          title: "text-[#001f3f] font-bold",
          content: "text-gray-600",
          confirmButton:
            "bg-[#e0a800] hover:bg-[#001f3f] text-white font-semibold px-6 py-2 rounded-md transition-colors",
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-2xl">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-8 text-center pb-12">
              <div className="flex justify-center">
                <Image
                  src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
                  alt="FIRE Logo"
                  width={400}
                  height={150}
                  className="object-contain"
                />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold text-[#001f3f] mb-3">Forgot Password?</CardTitle>
                <CardDescription className="text-xl text-gray-600">
                  Enter your email address and we'll send you a new password
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 px-12 pb-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-xl font-medium text-[#001f3f]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-14 h-16 text-xl border-2 border-gray-200 focus:border-[#e0a800] focus:ring-[#e0a800] rounded-lg"
                      required
                    />
                  </div>
                  <p className="text-lg text-gray-500 mt-3">
                    We'll check if this email is registered and send you a new password.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 text-xl font-semibold bg-[#e0a800] hover:bg-[#001f3f] text-white transition-all duration-300 transform hover:scale-[1.02] rounded-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send New Password"
                  )}
                </Button>
              </form>

              <div className="text-center pt-6 border-t border-gray-200">
                <Link
                  href="/login"
                  className="inline-flex items-center space-x-3 text-xl text-[#e0a800] hover:text-[#001f3f] font-medium transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                  <span>Back to Login</span>
                </Link>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-xl text-[#001f3f] mb-3">How it works:</h4>
                <ol className="text-lg text-gray-600 space-y-2">
                  <li>1. Enter your registered email address</li>
                  <li>2. We'll verify if your account exists</li>
                  <li>3. A new password will be sent to your email</li>
                  <li>4. Use the new password to login</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
