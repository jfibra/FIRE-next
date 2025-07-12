"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen, User, Calendar, Play, FileText, Loader2, AlertCircle } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
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

export default function ModulePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.id as string

  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModule = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://realestatetraining.ph/api/modules/${moduleId}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Module not found")
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Module = await response.json()
        setModule(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching module:", err)
        setError(err instanceof Error ? err.message : "Failed to load module")
      } finally {
        setLoading(false)
      }
    }

    if (moduleId) {
      fetchModule()
    }
  }, [moduleId])

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  const handlePreviousModule = () => {
    const prevId = Number.parseInt(moduleId) - 1
    if (prevId >= 1) {
      router.push(`/dashboard/modules/${prevId}`)
    }
  }

  const handleNextModule = () => {
    const nextId = Number.parseInt(moduleId) + 1
    router.push(`/dashboard/modules/${nextId}`)
  }

  const handleStartLearning = () => {
    router.push(`/dashboard/modules/${moduleId}/learn`)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLearningPoints = (module: Module) => {
    const points = []
    if (module.learndesc) points.push(module.learndesc)
    if (module.learndesc2) points.push(module.learndesc2)
    if (module.learndesc3) points.push(module.learndesc3)
    return points
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#001f3f]" />
            <p className="text-lg text-gray-600">Loading module...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !module) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Module Not Found</h3>
            <p className="text-gray-600 mb-4">{error || "The requested module could not be found."}</p>
            <Button onClick={handleBackToDashboard} className="bg-[#001f3f] hover:bg-[#001f3f]/90">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const learningPoints = getLearningPoints(module)

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button
            onClick={handleBackToDashboard}
            variant="outline"
            className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent h-10 lg:h-12 text-sm lg:text-base w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={handlePreviousModule}
              variant="outline"
              disabled={Number.parseInt(moduleId) <= 1}
              className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent h-10 lg:h-12 text-sm lg:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNextModule}
              variant="outline"
              className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent h-10 lg:h-12 text-sm lg:text-base"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Module Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-[#fde047] text-[#001f3f] text-sm lg:text-base px-4 py-2">Module {module.id}</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001f3f]">{module.cname}</h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">{module.description}</p>
        </div>

        {/* Module Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructor Info */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#001f3f] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-[#001f3f]">Instructor</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <p className="text-lg font-semibold">{module.speaker}</p>
              {module.spcontact && <p className="text-sm text-gray-600">Contact: {module.spcontact}</p>}
            </CardContent>
          </Card>

          {/* Date Added */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#fde047] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#001f3f]" />
              </div>
              <CardTitle className="text-xl text-[#001f3f]">Date Added</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">{formatDate(module.dateadded)}</p>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-[#001f3f]">Resources</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-2">
              {module.video && (
                <div className="flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Video Content</span>
                </div>
              )}
              {module.presentation && (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4 text-red-600" />
                  <span className="text-sm">PDF Materials</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* What You'll Learn */}
        <Card className="border-2 border-[#001f3f]">
          <CardHeader>
            <CardTitle className="text-2xl lg:text-3xl text-[#001f3f] text-center">What You'll Learn</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {learningPoints.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningPoints.map((point, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#fde047] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#001f3f] font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Learning objectives will be available soon.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Start Learning Button */}
        <div className="text-center">
          <Button
            onClick={handleStartLearning}
            size="lg"
            className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white px-8 py-4 text-lg lg:text-xl h-auto"
          >
            <Play className="w-6 h-6 mr-3" />
            Start Learning
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
