"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BookOpen, Settings, Search, Bell, User, LogOut, Play, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-dark-blue"></div>
      </div>
    )
  }

  const trainingModules = [
    {
      id: 1,
      title: "Real Estate Fundamentals",
      description: "Learn the basics of real estate principles and practices",
      progress: 75,
      duration: "4 hours",
      status: "In Progress",
      lessons: 12,
      completedLessons: 9,
    },
    {
      id: 2,
      title: "Property Valuation Methods",
      description: "Master different approaches to property valuation",
      progress: 100,
      duration: "3 hours",
      status: "Completed",
      lessons: 8,
      completedLessons: 8,
    },
    {
      id: 3,
      title: "Legal Aspects of Real Estate",
      description: "Understanding contracts, regulations, and legal requirements",
      progress: 30,
      duration: "5 hours",
      status: "In Progress",
      lessons: 15,
      completedLessons: 4,
    },
    {
      id: 4,
      title: "Marketing and Sales Strategies",
      description: "Effective techniques for marketing properties and closing deals",
      progress: 0,
      duration: "6 hours",
      status: "Not Started",
      lessons: 18,
      completedLessons: 0,
    },
    {
      id: 5,
      title: "Investment Analysis",
      description: "Analyze real estate investments and calculate returns",
      progress: 60,
      duration: "4.5 hours",
      status: "In Progress",
      lessons: 10,
      completedLessons: 6,
    },
    {
      id: 6,
      title: "Property Management",
      description: "Learn to manage residential and commercial properties",
      progress: 0,
      duration: "3.5 hours",
      status: "Not Started",
      lessons: 9,
      completedLessons: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />
      case "In Progress":
        return <Play className="w-4 h-4" />
      case "Not Started":
        return <Clock className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Image
                src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
                alt="FIRE Logo"
                width={120}
                height={40}
                className="h-8 w-auto sm:h-10 drop-shadow-sm"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-[#001f3f]">FIRE Agent Dashboard</h1>
              </div>
            </div>

            {/* Search and User Menu */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search modules..."
                  className="pl-10 w-64 h-9 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f]"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.png" alt={user.name} />
                      <AvatarFallback className="bg-[#001f3f] text-white">{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#001f3f] mb-2">Welcome back, {user.name}!</h2>
              <p className="text-gray-600 text-base sm:text-lg">Continue your real estate training journey</p>
            </div>
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="mt-4 sm:mt-0 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-[#001f3f] leading-tight">{module.title}</CardTitle>
                  <Badge className={`${getStatusColor(module.status)} flex items-center gap-1`}>
                    {getStatusIcon(module.status)}
                    {module.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-2">{module.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-[#001f3f]">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>
                      {module.completedLessons}/{module.lessons} lessons
                    </span>
                    <span>{module.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
                  disabled={module.status === "Completed"}
                >
                  {module.status === "Completed" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : module.status === "In Progress" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Module
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
