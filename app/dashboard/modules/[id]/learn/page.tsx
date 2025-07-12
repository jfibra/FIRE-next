"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Play,
  FileText,
  Loader2,
  AlertCircle,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
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

export default function ModuleLearnPage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = params.id as string

  const [module, setModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"video" | "pdf">("video")
  const [pdfZoom, setPdfZoom] = useState(1.0)
  const [pdfPage, setPdfPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

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

        // Set default tab based on available content
        if (data.video && !data.presentation) {
          setActiveTab("video")
        } else if (!data.video && data.presentation) {
          setActiveTab("pdf")
        } else if (data.video) {
          setActiveTab("video")
        }
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

  const handleBackToModule = () => {
    router.push(`/dashboard/modules/${moduleId}`)
  }

  const handlePreviousModule = () => {
    const prevId = Number.parseInt(moduleId) - 1
    if (prevId >= 1) {
      router.push(`/dashboard/modules/${prevId}/learn`)
    }
  }

  const handleNextModule = () => {
    const nextId = Number.parseInt(moduleId) + 1
    router.push(`/dashboard/modules/${nextId}/learn`)
  }

  const extractVideoId = (videoHtml: string) => {
    const match = videoHtml.match(/embed\/([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  const isDirectVideoUrl = (videoHtml: string) => {
    return videoHtml.includes(".mp4") || videoHtml.includes(".webm") || videoHtml.includes(".ogg")
  }

  const extractDirectVideoUrl = (videoHtml: string) => {
    const match = videoHtml.match(/src="([^"]*\.(mp4|webm|ogg)[^"]*)"/)
    return match ? match[1] : null
  }

  const handleZoomIn = () => {
    setPdfZoom((prev) => Math.min(prev + 0.25, 3.0))
  }

  const handleZoomOut = () => {
    setPdfZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handlePreviousPage = () => {
    setPdfPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setPdfPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePdfLoad = () => {
    setPdfLoading(false)
    setPdfError(null)
  }

  const handlePdfError = () => {
    setPdfLoading(false)
    setPdfError("Failed to load PDF. The file might not exist or be corrupted.")
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#001f3f]" />
            <p className="text-lg text-gray-600">Loading module content...</p>
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
            <Button onClick={() => router.push("/dashboard")} className="bg-[#001f3f] hover:bg-[#001f3f]/90">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const videoId = module.video ? extractVideoId(module.video) : null
  const directVideoUrl = module.video ? extractDirectVideoUrl(module.video) : null
  const hasVideo = !!(videoId || directVideoUrl)
  const hasPdf = !!module.presentation
  const pdfUrl = module.presentation ? `/pdf/${module.presentation}` : null

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Button
            onClick={handleBackToModule}
            variant="outline"
            className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent h-10 lg:h-12 text-sm lg:text-base w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Module
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
          <Badge className="bg-[#fde047] text-[#001f3f] text-sm lg:text-base px-4 py-2">
            Module {module.id} - Learning
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f]">{module.cname}</h1>
        </div>

        {/* Content Tabs */}
        {(hasVideo || hasPdf) && (
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {hasVideo && (
                <Button
                  onClick={() => setActiveTab("video")}
                  variant={activeTab === "video" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    activeTab === "video" ? "bg-[#001f3f] text-white" : "text-[#001f3f] hover:bg-gray-200"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Video Content
                </Button>
              )}
              {hasPdf && (
                <Button
                  onClick={() => setActiveTab("pdf")}
                  variant={activeTab === "pdf" ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    activeTab === "pdf" ? "bg-[#001f3f] text-white" : "text-[#001f3f] hover:bg-gray-200"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  PDF Materials
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        <Card className="border-2 border-gray-200">
          <CardContent className="p-0">
            {activeTab === "video" && hasVideo && (
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {videoId ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : directVideoUrl ? (
                  <video controls className="w-full h-full" src={directVideoUrl}>
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Video content unavailable</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "pdf" && hasPdf && pdfUrl && (
              <div className="space-y-4">
                {/* PDF Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gray-50 border-b">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleZoomOut}
                      variant="outline"
                      size="sm"
                      disabled={pdfZoom <= 0.5}
                      className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium text-[#001f3f] min-w-[60px] text-center">
                      {Math.round(pdfZoom * 100)}%
                    </span>
                    <Button
                      onClick={handleZoomIn}
                      variant="outline"
                      size="sm"
                      disabled={pdfZoom >= 3.0}
                      className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handlePreviousPage}
                      variant="outline"
                      size="sm"
                      disabled={pdfPage <= 1}
                      className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white bg-transparent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium text-[#001f3f] min-w-[80px] text-center">Page {pdfPage}</span>
                    <Button
                      onClick={handleNextPage}
                      variant="outline"
                      size="sm"
                      disabled={pdfPage >= totalPages}
                      className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={() => window.open(pdfUrl, "_blank")}
                    variant="outline"
                    size="sm"
                    className="border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* PDF Viewer */}
                <div className="relative bg-gray-100 min-h-[600px] flex items-center justify-center">
                  {pdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#001f3f]" />
                        <p className="text-sm text-gray-600">Loading PDF...</p>
                      </div>
                    </div>
                  )}

                  {pdfError ? (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Loading Error</h3>
                      <p className="text-gray-600 mb-4">{pdfError}</p>
                      <Button
                        onClick={() => window.open(pdfUrl, "_blank")}
                        className="bg-[#001f3f] hover:bg-[#001f3f]/90"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF Instead
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full max-w-4xl mx-auto p-4">
                      <div
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        style={{ transform: `scale(${pdfZoom})`, transformOrigin: "top center" }}
                      >
                        <iframe
                          src={`${pdfUrl}#page=${pdfPage}&zoom=${Math.round(pdfZoom * 100)}`}
                          className="w-full h-[800px] border-0"
                          title={`${module.cname} - PDF Materials`}
                          onLoad={handlePdfLoad}
                          onError={handlePdfError}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PDF Info */}
                <div className="p-4 bg-gray-50 text-center">
                  <p className="text-sm text-gray-600">
                    <FileText className="w-4 h-4 inline mr-1" />
                    {module.presentation} • Module {module.id} Materials
                  </p>
                </div>
              </div>
            )}

            {activeTab === "pdf" && hasPdf && !pdfUrl && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Not Available</h3>
                <p className="text-gray-600">The PDF file could not be located on the server.</p>
              </div>
            )}

            {!hasVideo && !hasPdf && (
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Content Available</h3>
                <p className="text-gray-600">Learning materials for this module are not yet available.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Module Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Module Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{module.description}</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#001f3f]">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-2">{module.speaker}</p>
              {module.spcontact && <p className="text-sm text-gray-600">Contact: {module.spcontact}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
