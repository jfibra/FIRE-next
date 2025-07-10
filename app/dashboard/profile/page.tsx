"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Profile Management</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Picture Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 lg:h-32 lg:w-32">
                  <AvatarImage src="/placeholder-user.png" alt="Profile" />
                  <AvatarFallback className="bg-[#fde047] text-[#001f3f] text-2xl lg:text-3xl font-bold">
                    U
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-[#001f3f] hover:bg-[#001f3f]/90"
                >
                  <Camera className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          {/* Personal Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm lg:text-base">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm lg:text-base">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm lg:text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm lg:text-base">
                  Phone Number
                </Label>
                <Input id="phone" placeholder="Enter your phone number" className="h-10 lg:h-12 text-sm lg:text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm lg:text-base">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="min-h-[100px] lg:min-h-[120px] text-sm lg:text-base"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license" className="text-sm lg:text-base">
                  Real Estate License Number
                </Label>
                <Input
                  id="license"
                  placeholder="Enter your license number"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm lg:text-base">
                  Company/Brokerage
                </Label>
                <Input
                  id="company"
                  placeholder="Enter your company name"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience" className="text-sm lg:text-base">
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  placeholder="Enter years of experience"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization" className="text-sm lg:text-base">
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  placeholder="e.g., Residential, Commercial"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-10 lg:h-12 px-6 lg:px-8 text-sm lg:text-base">
            <Save className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
