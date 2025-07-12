"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, Loader2, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useState, useEffect } from "react"

interface Module {
  id: number
  cname: string
  description: string
  speaker: string
  spimg: string
  spcontact: string
  learndesc: string
  learndesc2: string
  learndesc3: string
  video: string
  presentation: string
  dateadded: string | null
}

interface ApiResponse {
  modules: Module[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://realestatetraining.ph/api/modules")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ApiResponse = await response.json()
        setModules(data.modules || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching modules:", err)
        setError("Failed to load training modules. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [])

  const handleBackToHome = () => {
    router.push("/")
  }

  const handleStartModule = (moduleId: number) => {
    router.push(`/dashboard/modules/${moduleId}`)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#001f3f]" />
            <p className="text-lg text-gray-600">Loading training modules...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Modules</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-[#001f3f] hover:bg-[#001f3f]/90">
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Welcome back!</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">
              Continue your real estate training journey - {modules.length} modules available
            </p>
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
          {modules.map((module) => (
            <Card
              key={module.id}
              className="flex flex-col h-full hover:shadow-lg lg:hover:shadow-xl transition-shadow duration-300 border border-gray-200 lg:border-2"
            >
              <CardHeader className="pb-4 lg:pb-6">
                <div className="flex flex-col gap-2">
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-[#001f3f] leading-tight">
                    {module.cname}
                  </CardTitle>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 lg:mt-3 line-clamp-3">
                  {module.description}
                </p>
              </CardHeader>
              <div className="mt-auto">
                <CardContent className="space-y-3 lg:space-y-6">
                  {module.speaker && (
                    <div className="mt-2 lg:mt-3">
                      <p className="text-xs sm:text-sm text-gray-500">Instructor:</p>
                      <p className="text-sm sm:text-base font-medium text-[#001f3f]">{module.speaker}</p>
                    </div>
                  )}
                  <Button
                    onClick={() => handleStartModule(module.id)}
                    className="w-full h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-semibold bg-[#001f3f] hover:bg-[#001f3f]/90 text-white"
                  >
                    <BookOpen className="mr-2 lg:mr-3 w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />
                    Start Module
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {modules.length === 0 && !loading && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Training Modules Available</h3>
            <p className="text-gray-600">Training modules will appear here once they are available.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
