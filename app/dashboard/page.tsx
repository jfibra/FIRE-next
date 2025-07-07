"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, BookOpen, Award, Download, Eye, Play, CheckCircle, Home, Menu, X, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface DashboardUser {
  email: string
  name: string
  role: string
}

const modules = [
  {
    id: "1",
    title: "RESA LAW",
    instructor: "DR. EDUARDO G. ONG",
    color: "from-blue-500 via-blue-600 to-blue-700",
    shadowColor: "shadow-blue-500/25",
    progress: 85,
    completed: true,
  },
  {
    id: "2",
    title: "DOCUMENTATION & TITLING",
    instructor: "ATTY. WALFRIDO LOMONSOD ALCANTARA",
    color: "from-emerald-500 via-emerald-600 to-emerald-700",
    shadowColor: "shadow-emerald-500/25",
    progress: 60,
    completed: false,
  },
  {
    id: "3",
    title: "CODE OF ETHICS AND RESPONSIBILITIES",
    instructor: "ENGR. ELEANOR LIGANOR",
    color: "from-amber-500 via-orange-500 to-orange-600",
    shadowColor: "shadow-orange-500/25",
    progress: 40,
    completed: false,
  },
  {
    id: "4",
    title: "Real Estate Taxation under RA8424 and Train Law",
    instructor: "ATTY. WALFRIDO LOMONSOD ALCANTARA",
    color: "from-rose-500 via-pink-600 to-pink-700",
    shadowColor: "shadow-pink-500/25",
    progress: 0,
    completed: false,
  },
  {
    id: "5",
    title: "THE SHARK PRINCIPLES",
    instructor: "Alejandro Manalac",
    color: "from-cyan-500 via-teal-600 to-teal-700",
    shadowColor: "shadow-teal-500/25",
    progress: 100,
    completed: true,
  },
  {
    id: "6",
    title: "LEADERSHIP & MANAGEMENT SKILLS",
    instructor: "Azela E. Honor,REB",
    color: "from-green-500 via-green-600 to-green-700",
    shadowColor: "shadow-green-500/25",
    progress: 30,
    completed: false,
  },
  {
    id: "7",
    title: "Boosting your Rental Sales",
    instructor: "Anthony Leuterio",
    color: "from-yellow-500 via-yellow-600 to-amber-600",
    shadowColor: "shadow-yellow-500/25",
    progress: 75,
    completed: false,
  },
  {
    id: "8",
    title: "Branding Building and Why it Matters in the New Normal",
    instructor: "George Ryan Sarmago",
    color: "from-red-500 via-red-600 to-red-700",
    shadowColor: "shadow-red-500/25",
    progress: 20,
    completed: false,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const completedModules = modules.filter((m) => m.completed).length
  const totalProgress = Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white shadow-2xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt="FIRE Logo"
                width={120}
                height={40}
                className="h-8 w-auto drop-shadow-lg"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  FIRE Training Dashboard
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white hover:bg-white/20 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="hidden md:flex text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b shadow-xl">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-700 hover:bg-slate-100"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 mb-8 text-white shadow-2xl shadow-blue-500/20 border border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-white/30 shadow-xl shadow-black/20">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold backdrop-blur-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Welcome back, {user.name}!
                </h2>
                <p className="text-blue-100/90 text-lg">
                  You have completed {completedModules} of {modules.length} modules. Keep up the great work!
                </p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 px-6 py-3 text-lg font-semibold backdrop-blur-sm shadow-lg">
              🏆 {totalProgress}% Complete
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 text-white border-0 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-3">{modules.length}</div>
              <div className="text-cyan-100 text-lg font-medium">Available Modules</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 via-green-600 to-green-700 text-white border-0 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-3">{completedModules}</div>
              <div className="text-emerald-100 text-lg font-medium">Completed Modules</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 via-pink-600 to-pink-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg backdrop-blur-sm">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-3">{totalProgress}%</div>
              <div className="text-purple-100 text-lg font-medium">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">My Profile</h3>
              <p className="text-slate-600">View and manage your profile</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Download className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Downloads</h3>
              <p className="text-slate-600">Access course materials</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Certificates</h3>
              <p className="text-slate-600">View your achievements</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-3 text-lg">Settings</h3>
              <p className="text-slate-600">Manage your preferences</p>
            </CardContent>
          </Card>
        </div>

        {/* Training Modules */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Training Modules
            </h2>
            <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 text-lg font-semibold shadow-lg">
              {completedModules}/{modules.length} Completed
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {modules.map((module) => (
              <Card
                key={module.id}
                className={`group hover:shadow-2xl ${module.shadowColor} transition-all duration-500 hover:-translate-y-3 border-0 overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl`}
              >
                <div className={`h-3 bg-gradient-to-r ${module.color} shadow-lg`}></div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      variant="secondary"
                      className="bg-slate-100 text-slate-700 px-3 py-1 font-semibold shadow-sm"
                    >
                      Module {module.id}
                    </Badge>
                    {module.completed && (
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg leading-tight">
                    {module.title}
                  </h3>

                  <p className="text-slate-600 mb-6 truncate font-medium">{module.instructor}</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">Progress</span>
                      <span className="font-bold text-slate-800 text-lg">{module.progress}%</span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${module.color} transition-all duration-500 shadow-sm`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 py-3 font-semibold text-lg`}
                    >
                      {module.completed ? (
                        <>
                          <Eye className="w-5 h-5 mr-2" />
                          Review
                        </>
                      ) : module.progress > 0 ? (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
