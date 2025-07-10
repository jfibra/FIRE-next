"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Loader2,
  Calendar,
  Building,
  Users,
  CheckCircle,
  AlertCircle,
  Camera,
  Save,
  Edit3,
  Briefcase,
  Award,
  Star,
  TrendingUp,
  Shield,
  Sparkles,
  Crown,
  Zap,
  Heart,
  Target,
} from "lucide-react"

const API_BASE_URL = "https://realestatetraining.ph/api"

interface UserProfile {
  id: number
  lrid?: string
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
  birthday?: string
  site?: string
  fbLink?: string
  invitedBy?: string
  brokerID?: string
  teamname?: string
  tlName?: string
  photo?: string
  s3bucket?: string
  userrole?: string
  endorsement?: string
  endorsement_notes?: string
  status?: string
  verification?: string
  created_at?: string
  updated_at?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userData = localStorage.getItem("user")

    if (!isLoggedIn || !userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      loadUserProfile(parsedUser.id)
    } catch {
      router.push("/login")
    }
  }, [router])

  const loadUserProfile = async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setFormData(userData)
        localStorage.setItem("user", JSON.stringify(userData))
      } else {
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while loading profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      if (field === "firstname" || field === "lastname") {
        const firstname = field === "firstname" ? value : prev.firstname || ""
        const lastname = field === "lastname" ? value : prev.lastname || ""
        updated.fullname = `${firstname} ${lastname}`.trim()
      }

      return updated
    })
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setUser({ ...user, ...formData })
        localStorage.setItem("user", JSON.stringify({ ...user, ...formData }))
        setEditingSection(null)

        toast({
          title: "🎉 Success!",
          description: result.message || "Profile updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while saving profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("photo", file)

      const response = await fetch(`${API_BASE_URL}/users/${user.id}/upload-photo`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        const updatedUser = { ...user, s3bucket: result.photo_url }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))

        toast({
          title: "📸 Photo Updated!",
          description: result.message || "Profile photo updated successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || result.error || "Failed to upload photo",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error while uploading photo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const getUserDisplayName = () => {
    if (formData.fullname) return formData.fullname
    if (formData.firstname && formData.lastname) return `${formData.firstname} ${formData.lastname}`
    if (formData.firstname) return formData.firstname
    return user?.emailaddress || "User"
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    if (name === user?.emailaddress) {
      return name.charAt(0).toUpperCase()
    }
    const nameParts = name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  const getLocationString = () => {
    const parts = [formData.city, formData.state].filter(Boolean)
    return parts.length > 0 ? parts.join(", ") : "Location not specified"
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-[#e0a800]"
      case "inactive":
        return "text-red-500"
      case "pending":
        return "text-[#e0a800]"
      default:
        return "text-gray-600"
    }
  }

  const getProfileCompletionScore = () => {
    const fields = [
      user?.firstname,
      user?.lastname,
      user?.emailaddress,
      user?.phone || user?.cellphone,
      user?.city,
      user?.state,
      user?.s3bucket,
      user?.lrid,
      user?.teamname,
    ]
    const completed = fields.filter(Boolean).length
    return Math.round((completed / fields.length) * 100)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-[#e0a800] rounded-full animate-spin mx-auto"></div>
              <Sparkles className="w-8 h-8 text-[#e0a800] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-[#001f3f]">Loading Your Amazing Profile</h3>
              <p className="text-gray-600">Preparing something spectacular...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="relative mb-6">
            <AlertCircle className="h-20 w-20 text-red-400 mx-auto animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-[#001f3f] mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load your profile data</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#e0a800] hover:bg-[#c49600] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const completionScore = getProfileCompletionScore()

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 p-4">
        {/* Exciting Profile Header with Animated Background */}
        <Card className="overflow-hidden border-0 shadow-2xl relative">
          {/* Animated Background */}
          <div className="h-40 lg:h-56 relative bg-gradient-to-br from-[#001f3f] via-[#001f3f] to-[#003366] overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-[#e0a800]/20 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 left-1/3 w-12 h-12 bg-[#e0a800]/20 rounded-full animate-ping"></div>
              <div className="absolute bottom-8 right-1/4 w-8 h-8 bg-white/30 rounded-full animate-pulse"></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Sparkle Effects */}
            <div className="absolute top-6 right-12">
              <Sparkles className="w-6 h-6 text-[#e0a800] animate-pulse" />
            </div>
            <div className="absolute bottom-12 left-8">
              <Star className="w-5 h-5 text-white/70 animate-twinkle" />
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 lg:px-8 pb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-20 lg:-mt-24">
              <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
                {/* Enhanced Avatar */}
                <div className="relative mb-6 lg:mb-0 group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#e0a800] to-[#001f3f] rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <Avatar className="relative w-36 h-36 lg:w-44 lg:h-44 border-4 border-white shadow-2xl">
                    <AvatarImage
                      src={user.s3bucket || "/placeholder-user.png"}
                      alt={getUserDisplayName()}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder-user.png"
                      }}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-[#e0a800] to-[#c49600] text-white text-4xl lg:text-6xl font-bold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Camera Overlay with Animation */}
                  <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer flex items-center justify-center backdrop-blur-sm">
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="text-center text-white">
                        <Camera className="w-8 h-8 mx-auto mb-1 animate-bounce" />
                        <span className="text-xs font-medium">Update Photo</span>
                      </div>
                    </Label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-1" />
                        <span className="text-xs">Uploading...</span>
                      </div>
                    </div>
                  )}

                  {/* Status Ring */}
                  <div className="absolute -bottom-2 -right-2">
                    <div
                      className={`w-8 h-8 rounded-full border-4 border-white shadow-lg ${
                        user.status === "active" ? "bg-[#e0a800]" : "bg-gray-400"
                      } flex items-center justify-center`}
                    >
                      {user.status === "active" && <Zap className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </div>

                {/* Enhanced Profile Info */}
                <div className="flex-1 space-y-3 lg:pb-6">
                  <div className="space-y-2">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[#001f3f] flex items-center gap-3">
                      {getUserDisplayName()}
                      {user.verification === "verified" && (
                        <div className="relative">
                          <CheckCircle className="w-8 h-8 text-[#e0a800]" />
                          <div className="absolute inset-0 animate-ping">
                            <CheckCircle className="w-8 h-8 text-[#e0a800] opacity-75" />
                          </div>
                        </div>
                      )}
                    </h1>
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-[#e0a800]" />
                      <p className="text-xl text-gray-700 font-medium">{user.userrole || "Real Estate Professional"}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#e0a800]" />
                      <span className="font-medium">{getLocationString()}</span>
                    </div>
                    {user.teamname && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-5 h-5 text-[#001f3f]" />
                        <span className="font-medium">{user.teamname}</span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Status Badges */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Badge
                      className={`px-4 py-2 text-sm font-semibold rounded-full ${
                        user.status === "active" ? "bg-[#e0a800] text-white shadow-lg" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          user.status === "active" ? "bg-white animate-pulse" : "bg-gray-400"
                        }`}
                      ></div>
                      {user.status?.charAt(0).toUpperCase() + (user.status?.slice(1) || "")} Member
                    </Badge>

                    {user.verification === "verified" && (
                      <Badge className="bg-[#001f3f] text-white px-4 py-2 rounded-full shadow-lg">
                        <Shield className="w-4 h-4 mr-2" />
                        Verified Pro
                      </Badge>
                    )}

                    <Badge className="bg-gradient-to-r from-[#001f3f] to-[#e0a800] text-white px-4 py-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4 mr-2" />
                      {completionScore}% Complete
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 lg:mt-0">
                <Button
                  onClick={() => setEditingSection(editingSection ? null : "general")}
                  variant="outline"
                  className="flex-1 lg:flex-none border-2 border-[#001f3f] hover:border-[#e0a800] hover:bg-[#e0a800]/10 transition-all duration-200"
                >
                  <Edit3 className="w-5 h-5 mr-2" />
                  {editingSection ? "Cancel Edit" : "Edit Profile"}
                </Button>
                {editingSection && (
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex-1 lg:flex-none bg-[#e0a800] hover:bg-[#c49600] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Saving Magic...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Completion Progress */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#001f3f]" />
                <h3 className="text-lg font-semibold text-[#001f3f]">Profile Strength</h3>
              </div>
              <div className="text-2xl font-bold text-[#e0a800]">{completionScore}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-[#001f3f] to-[#e0a800] h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${completionScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {completionScore < 70
                ? "Complete your profile to unlock more features!"
                : "Great job! Your profile looks amazing!"}
            </p>
          </CardContent>
        </Card>

        {/* Enhanced About Section */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-[#001f3f]/10 rounded-lg">
                  <Heart className="w-6 h-6 text-[#001f3f]" />
                </div>
                About Me
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "about" ? null : "about")}
                className="hover:bg-[#e0a800]/10 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {editingSection === "about" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstname" className="text-sm font-semibold text-[#001f3f]">
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      value={formData.firstname || ""}
                      onChange={(e) => handleInputChange("firstname", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname" className="text-sm font-semibold text-[#001f3f]">
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      value={formData.lastname || ""}
                      onChange={(e) => handleInputChange("lastname", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailaddress" className="text-sm font-semibold text-[#001f3f]">
                    Email Address
                  </Label>
                  <Input
                    id="emailaddress"
                    type="email"
                    value={formData.emailaddress || ""}
                    onChange={(e) => handleInputChange("emailaddress", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-[#001f3f]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cellphone" className="text-sm font-semibold text-[#001f3f]">
                      Mobile Number
                    </Label>
                    <Input
                      id="cellphone"
                      value={formData.cellphone || ""}
                      onChange={(e) => handleInputChange("cellphone", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthday" className="text-sm font-semibold text-[#001f3f]">
                    Birthday
                  </Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday || ""}
                    onChange={(e) => handleInputChange("birthday", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#001f3f]/5 to-white rounded-lg">
                  <div className="p-2 bg-[#001f3f]/10 rounded-full">
                    <Mail className="w-5 h-5 text-[#001f3f]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#001f3f]">{user.emailaddress}</p>
                    <p className="text-sm text-gray-600">Primary Email</p>
                  </div>
                </div>
                {(user.phone || user.cellphone) && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#e0a800]/5 to-white rounded-lg">
                    <div className="p-2 bg-[#e0a800]/10 rounded-full">
                      <Phone className="w-5 h-5 text-[#e0a800]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#001f3f]">{user.cellphone || user.phone}</p>
                      <p className="text-sm text-gray-600">Contact Number</p>
                    </div>
                  </div>
                )}
                {user.birthday && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Calendar className="w-5 h-5 text-[#001f3f]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#001f3f]">{new Date(user.birthday).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Birthday</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Professional Section */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-[#e0a800]/5 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-[#e0a800]/10 rounded-lg">
                  <Briefcase className="w-6 h-6 text-[#e0a800]" />
                </div>
                Professional Excellence
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "professional" ? null : "professional")}
                className="hover:bg-[#e0a800]/10 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {editingSection === "professional" ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lrid" className="text-sm font-semibold text-[#001f3f]">
                      License ID
                    </Label>
                    <Input
                      id="lrid"
                      value={formData.lrid || ""}
                      onChange={(e) => handleInputChange("lrid", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brokerID" className="text-sm font-semibold text-[#001f3f]">
                      Broker ID
                    </Label>
                    <Input
                      id="brokerID"
                      value={formData.brokerID || ""}
                      onChange={(e) => handleInputChange("brokerID", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="teamname" className="text-sm font-semibold text-[#001f3f]">
                      Team Name
                    </Label>
                    <Input
                      id="teamname"
                      value={formData.teamname || ""}
                      onChange={(e) => handleInputChange("teamname", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tlName" className="text-sm font-semibold text-[#001f3f]">
                      Team Leader
                    </Label>
                    <Input
                      id="tlName"
                      value={formData.tlName || ""}
                      onChange={(e) => handleInputChange("tlName", e.target.value)}
                      className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invitedBy" className="text-sm font-semibold text-[#001f3f]">
                    Invited By
                  </Label>
                  <Input
                    id="invitedBy"
                    value={formData.invitedBy || ""}
                    onChange={(e) => handleInputChange("invitedBy", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {user.lrid && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#e0a800]/5 to-white rounded-lg">
                    <div className="p-2 bg-[#e0a800]/10 rounded-full">
                      <Award className="w-5 h-5 text-[#e0a800]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#001f3f]">Real Estate License</p>
                      <p className="text-sm text-gray-600">ID: {user.lrid}</p>
                    </div>
                  </div>
                )}
                {user.teamname && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#001f3f]/5 to-white rounded-lg">
                    <div className="p-2 bg-[#001f3f]/10 rounded-full">
                      <Users className="w-5 h-5 text-[#001f3f]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#001f3f]">{user.teamname}</p>
                      {user.tlName && <p className="text-sm text-gray-600">Team Leader: {user.tlName}</p>}
                    </div>
                  </div>
                )}
                {user.brokerID && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Building className="w-5 h-5 text-[#001f3f]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#001f3f]">Broker Information</p>
                      <p className="text-sm text-gray-600">ID: {user.brokerID}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Location Section */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-[#001f3f]/5 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-[#001f3f]/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-[#001f3f]" />
                </div>
                Location & Territory
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "location" ? null : "location")}
                className="hover:bg-[#001f3f]/10 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {editingSection === "location" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-semibold text-[#001f3f]">
                    State/Province
                  </Label>
                  <Input
                    id="state"
                    value={formData.state || ""}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold text-[#001f3f]">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barangay" className="text-sm font-semibold text-[#001f3f]">
                    Barangay
                  </Label>
                  <Input
                    id="barangay"
                    value={formData.barangay || ""}
                    onChange={(e) => handleInputChange("barangay", e.target.value)}
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-r from-[#e0a800]/5 to-white rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#e0a800]/10 rounded-full">
                    <Target className="w-6 h-6 text-[#e0a800]" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-[#001f3f]">{getLocationString()}</p>
                    {user.barangay && <p className="text-gray-600">Barangay: {user.barangay}</p>}
                    <p className="text-sm text-[#e0a800] font-medium mt-1">Your Service Area</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Contact & Links Section */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold">
                <div className="p-2 bg-[#001f3f]/10 rounded-lg">
                  <Globe className="w-6 h-6 text-[#001f3f]" />
                </div>
                Digital Presence
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(editingSection === "contact" ? null : "contact")}
                className="hover:bg-[#e0a800]/10 transition-colors duration-200"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {editingSection === "contact" ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site" className="text-sm font-semibold text-[#001f3f]">
                    Website URL
                  </Label>
                  <Input
                    id="site"
                    value={formData.site || ""}
                    onChange={(e) => handleInputChange("site", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fbLink" className="text-sm font-semibold text-[#001f3f]">
                    Facebook Profile
                  </Label>
                  <Input
                    id="fbLink"
                    value={formData.fbLink || ""}
                    onChange={(e) => handleInputChange("fbLink", e.target.value)}
                    placeholder="https://facebook.com/yourprofile"
                    className="border-2 border-gray-200 focus:border-[#e0a800] transition-colors duration-200"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {user.site && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#001f3f]/5 to-white rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="p-2 bg-[#001f3f]/10 rounded-full">
                      <Globe className="w-5 h-5 text-[#001f3f]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#001f3f]">Personal Website</p>
                      <a
                        href={user.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e0a800] hover:text-[#c49600] hover:underline transition-colors duration-200"
                      >
                        {user.site}
                      </a>
                    </div>
                  </div>
                )}
                {user.fbLink && (
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-[#e0a800]/5 to-white rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="p-2 bg-[#e0a800]/10 rounded-full">
                      <Facebook className="w-5 h-5 text-[#e0a800]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#001f3f]">Facebook Profile</p>
                      <a
                        href={user.fbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e0a800] hover:text-[#c49600] hover:underline transition-colors duration-200"
                      >
                        View Facebook Profile
                      </a>
                    </div>
                  </div>
                )}
                {!user.site && !user.fbLink && (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 italic">No digital presence links added yet</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Add your website and social media to boost your profile!
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(1deg);
          }
          75% {
            transform: rotate(-1deg);
          }
        }
        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        .animate-twinkle {
          animation: twinkle 2s infinite;
        }
      `}</style>
    </DashboardLayout>
  )
}
