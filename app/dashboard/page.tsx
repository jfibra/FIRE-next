"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, CheckCircle, Clock, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DashboardPage() {
  const router = useRouter()

  const handleBackToHome = () => {
    router.push("/")
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
        return <CheckCircle className="w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6" />
      case "In Progress":
        return <Play className="w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6" />
      default:
        return <Clock className="w-3 sm:w-4 lg:w-6 h-3 sm:h-4 lg:h-6" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Welcome back!</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Continue your real estate training journey</p>
          </div>
          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent h-10 lg:h-12 text-sm lg:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {trainingModules.map((m) => (
            <Card
              key={m.id}
              className="hover:shadow-lg lg:hover:shadow-xl transition-shadow duration-300 border border-gray-200 lg:border-2"
            >
              <CardHeader className="pb-4 lg:pb-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-[#001f3f] leading-tight pr-2 sm:pr-0">
                    {m.title}
                  </CardTitle>
                  <Badge
                    className={`flex items-center gap-1 lg:gap-2 px-2 sm:px-3 lg:px-4 py-1 lg:py-2 text-xs sm:text-sm lg:text-base font-medium self-start sm:self-auto flex-shrink-0 ${getStatusColor(m.status)}`}
                  >
                    {getStatusIcon(m.status)}
                    <span className="whitespace-nowrap">{m.status}</span>
                  </Badge>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 lg:mt-3">{m.description}</p>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-6">
                <div className="flex justify-between text-sm lg:text-lg">
                  <span className="text-gray-600 font-medium">Progress</span>
                  <span className="font-bold text-base lg:text-xl text-[#001f3f]">{m.progress}%</span>
                </div>
                <Progress value={m.progress} className="h-2 lg:h-4" />
                <div className="flex justify-between text-xs sm:text-sm lg:text-base text-gray-500">
                  <span className="font-medium">
                    {m.completedLessons}/{m.lessons} lessons
                  </span>
                  <span className="font-medium">{m.duration}</span>
                </div>
                <Button
                  disabled={m.status === "Completed"}
                  className="w-full h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
                >
                  {m.status === "Completed" ? (
                    <>
                      <CheckCircle className="mr-2 lg:mr-3 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />
                      Completed
                    </>
                  ) : m.status === "In Progress" ? (
                    <>
                      <Play className="mr-2 lg:mr-3 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 lg:mr-3 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />
                      Start Module
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
