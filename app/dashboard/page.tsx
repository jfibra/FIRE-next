"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LayoutDashboard,
  UserCircle,
  Download,
  Award,
  LogOut,
  Search,
  Bell,
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Settings,
  User,
} from "lucide-react"

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

interface DashboardUser {
  id: number
  emailaddress: string
  firstname?: string
  lastname?: string
  name?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // sidebar collapsed state
  const [collapsed, setCollapsed] = useState(false)
  const toggleSidebar = () => setCollapsed((c) => !c)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userData = localStorage.getItem("user")

    if (!isLoggedIn || !userData) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch {
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const getUserDisplayName = () =>
    user?.name || `${user?.firstname || ""} ${user?.lastname || ""}`.trim() || user?.emailaddress || "User"

  /* ------------------------- Sidebar menu config ------------------------ */
  type MenuKey = "dashboard" | "profile" | "downloadables" | "certificate"
  const [activeMenu, setActiveMenu] = useState<MenuKey>("dashboard")
  const menuItems: { id: MenuKey | "logout"; label: string; icon: any; onClick: () => void }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, onClick: () => setActiveMenu("dashboard") },
    { id: "profile", label: "Profile Management", icon: UserCircle, onClick: () => setActiveMenu("profile") },
    { id: "downloadables", label: "Downloadables", icon: Download, onClick: () => setActiveMenu("downloadables") },
    { id: "certificate", label: "Generate Your Certificate", icon: Award, onClick: () => setActiveMenu("certificate") },
    { id: "logout", label: "Logout", icon: LogOut, onClick: handleLogout },
  ]

  /* -------------------------- Demo module data -------------------------- */
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
      description: "Understand contracts, regulations, and legal requirements",
      progress: 30,
      duration: "5 hours",
      status: "In Progress",
      lessons: 15,
      completedLessons: 4,
    },
    {
      id: 4,
      title: "Marketing & Sales Strategies",
      description: "Techniques for marketing properties and closing deals",
      progress: 0,
      duration: "6 hours",
      status: "Not Started",
      lessons: 18,
      completedLessons: 0,
    },
  ]

  /* ------------------------ Helper functions ---------------------------- */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4" />
      case "In Progress":
        return <Play className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#001f3f]" />
      </div>
    )
  }

  /* --------------------------- Main content ----------------------------- */
  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Profile features coming soon…</p>
            </CardContent>
          </Card>
        )
      case "downloadables":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Downloadables</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Downloadable resources coming soon…</p>
            </CardContent>
          </Card>
        )
      case "certificate":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Generate Your Certificate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Certificate generation coming soon…</p>
            </CardContent>
          </Card>
        )
      default:
        /* Dashboard */
        return (
          <>
            <h2 className="text-2xl font-bold text-[#001f3f] mb-6">Welcome back, {getUserDisplayName()}!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingModules.map((m) => (
                <Card key={m.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between">
                      <CardTitle className="text-[#001f3f]">{m.title}</CardTitle>
                      <Badge className={`flex items-center gap-1 ${getStatusColor(m.status)}`}>
                        {getStatusIcon(m.status)}
                        {m.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{m.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-[#001f3f]">{m.progress}%</span>
                    </div>
                    <Progress value={m.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {m.completedLessons}/{m.lessons} lessons
                      </span>
                      <span>{m.duration}</span>
                    </div>
                    <Button
                      disabled={m.status === "Completed"}
                      className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
                    >
                      {m.status === "Completed" ? (
                        <>
                          <CheckCircle className="mr-2 w-4 h-4" />
                          Completed
                        </>
                      ) : m.status === "In Progress" ? (
                        <>
                          <Play className="mr-2 w-4 h-4" />
                          Continue Learning
                        </>
                      ) : (
                        <>
                          <BookOpen className="mr-2 w-4 h-4" />
                          Start Module
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )
    }
  }

  /* --------------------------- JSX layout ------------------------------- */
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* --- Sidebar --- */}
      <aside
        className={`${collapsed ? "w-16" : "w-64"} transition-all duration-200 bg-[#001f3f] text-white flex flex-col`}
      >
        {/* Logo / toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#001f3f]/40">
          <div className="flex items-center space-x-2 overflow-hidden">
            <Image
              src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
              alt="FIRE"
              height={32}
              width={32}
              className="flex-shrink-0"
            />
            {!collapsed && <span className="font-bold text-lg">FIRE</span>}
          </div>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8" onClick={toggleSidebar}>
            {/* Simple hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const active = activeMenu === item.id
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`group flex items-center w-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-white/10" : "hover:bg-white/10"
                } ${item.id === "logout" ? "text-red-300 hover:text-red-200" : ""}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-[#001f3f]/40 flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.png" alt={getUserDisplayName()} />
            <AvatarFallback className="bg-[#fde047] text-[#001f3f]">
              {getUserDisplayName().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{getUserDisplayName()}</p>
              <p className="text-xs text-gray-300 truncate">{user?.emailaddress}</p>
            </div>
          )}
        </div>
      </aside>

      {/* --- Main section --- */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <h1 className="font-bold text-[#001f3f] hidden sm:block">FIRE Agent Dashboard</h1>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search modules..."
                  className="pl-10 w-64 h-9 border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f]"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 text-[10px] flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.png" alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-[#fde047] text-[#001f3f]">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                      <p className="text-xs text-muted-foreground">{user?.emailaddress}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>
    </div>
  )
}
