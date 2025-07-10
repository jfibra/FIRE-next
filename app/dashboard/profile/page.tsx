"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: number
  firstname: string
  lastname: string
  fullname: string
  emailaddress: string
  phone?: string
  cellphone?: string
  gender?: string
  state?: string
  city?: string
  barangay?: string
  civilStatus?: string
  site?: string
  fbLink?: string
  s3bucket?: string
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null)

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    emailaddress: "",
    phone: "",
    cellphone: "",
    gender: "",
    state: "",
    city: "",
    barangay: "",
    civilStatus: "",
    site: "",
    fbLink: "",
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    try {
      const userData = localStorage.getItem("user")
      if (!userData) return

      const currentUser = JSON.parse(userData)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/users/${currentUser.id}`,
      )

      if (response.ok) {
        const userProfile = await response.json()
        setUser(userProfile)
        setFormData({
          firstname: userProfile.firstname || "",
          lastname: userProfile.lastname || "",
          emailaddress: userProfile.emailaddress || "",
          phone: userProfile.phone || "",
          cellphone: userProfile.cellphone || "",
          gender: userProfile.gender || "",
          state: userProfile.state || "",
          city: userProfile.city || "",
          barangay: userProfile.barangay || "",
          civilStatus: userProfile.civilStatus || "",
          site: userProfile.site || "",
          fbLink: userProfile.fbLink || "",
        })
      } else {
        setMessage({ type: "error", text: "Failed to load profile data" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error loading profile data" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear message when user starts typing
    if (message) setMessage(null)
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    setMessage(null)

    try {
      // Update fullname based on first and last name
      const updatedData = {
        ...formData,
        fullname: `${formData.firstname} ${formData.lastname}`.trim(),
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      )

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: result.message || "Profile updated successfully!" })
        setUser(result.user)

        // Update localStorage with new user data
        localStorage.setItem("user", JSON.stringify(result.user))

        toast({
          title: "Success",
          description: "Profile updated successfully!",
        })
      } else {
        setMessage({ type: "error", text: result.message || "Failed to update profile" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile. Please try again." })
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select a valid image file" })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image size should be less than 5MB" })
      return
    }

    setIsUploadingPhoto(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append("photo", file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/users/${user.id}/upload-photo`,
        {
          method: "POST",
          body: formData,
        },
      )

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: "success", text: result.message || "Photo uploaded successfully!" })

        // Update user data with new photo URL
        const updatedUser = { ...user, s3bucket: result.photo_url }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))

        toast({
          title: "Success",
          description: "Profile photo updated successfully!",
        })
      } else {
        setMessage({ type: "error", text: result.message || result.error || "Failed to upload photo" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading photo. Please try again." })
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading profile...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Profile Management</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`flex items-center space-x-2 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : message.type === "error"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
          >
            {message.type === "success" && <CheckCircle className="h-5 w-5" />}
            {message.type === "error" && <AlertCircle className="h-5 w-5" />}
            {message.type === "info" && <AlertCircle className="h-5 w-5" />}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Picture Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 lg:h-32 lg:w-32">
                  <AvatarImage src={user?.s3bucket || "/placeholder-user.png"} alt="Profile" />
                  <AvatarFallback className="bg-[#fde047] text-[#001f3f] text-2xl lg:text-3xl font-bold">
                    {user?.firstname?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>
              <div className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={isUploadingPhoto}
                />
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => document.getElementById("photo-upload")?.click()}
                  disabled={isUploadingPhoto}
                >
                  {isUploadingPhoto ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Change Photo
                    </>
                  )}
                </Button>
              </div>
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
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange("firstname", e.target.value)}
                    placeholder="Enter your first name"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm lg:text-base">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange("lastname", e.target.value)}
                    placeholder="Enter your last name"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm lg:text-base">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.emailaddress}
                  onChange={(e) => handleInputChange("emailaddress", e.target.value)}
                  placeholder="Enter your email"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm lg:text-base">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cellphone" className="text-sm lg:text-base">
                    Cellphone Number
                  </Label>
                  <Input
                    id="cellphone"
                    value={formData.cellphone}
                    onChange={(e) => handleInputChange("cellphone", e.target.value)}
                    placeholder="Enter your cellphone number"
                    className="h-10 lg:h-12 text-sm lg:text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm lg:text-base">
                    Gender
                  </Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger className="h-10 lg:h-12">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="civilStatus" className="text-sm lg:text-base">
                    Civil Status
                  </Label>
                  <Select
                    value={formData.civilStatus}
                    onValueChange={(value) => handleInputChange("civilStatus", value)}
                  >
                    <SelectTrigger className="h-10 lg:h-12">
                      <SelectValue placeholder="Select civil status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Address Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm lg:text-base">
                  State/Province
                </Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="Enter your state/province"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm lg:text-base">
                  City
                </Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="barangay" className="text-sm lg:text-base">
                  Barangay
                </Label>
                <Input
                  id="barangay"
                  value={formData.barangay}
                  onChange={(e) => handleInputChange("barangay", e.target.value)}
                  placeholder="Enter your barangay"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site" className="text-sm lg:text-base">
                  Website
                </Label>
                <Input
                  id="site"
                  value={formData.site}
                  onChange={(e) => handleInputChange("site", e.target.value)}
                  placeholder="Enter your website URL"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fbLink" className="text-sm lg:text-base">
                  Facebook Profile
                </Label>
                <Input
                  id="fbLink"
                  value={formData.fbLink}
                  onChange={(e) => handleInputChange("fbLink", e.target.value)}
                  placeholder="Enter your Facebook profile URL"
                  className="h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-10 lg:h-12 px-6 lg:px-8 text-sm lg:text-base"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 lg:h-5 lg:w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
