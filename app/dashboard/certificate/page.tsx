"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Download, CheckCircle, Clock, Star } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function CertificatePage() {
  const completedCourses = [
    {
      id: 1,
      title: "Real Estate Fundamentals",
      completionDate: "2024-01-15",
      score: 95,
      duration: "4 hours",
      certificateId: "FIRE-2024-001",
    },
    {
      id: 2,
      title: "Property Valuation Methods",
      completionDate: "2024-01-20",
      score: 88,
      duration: "3 hours",
      certificateId: "FIRE-2024-002",
    },
  ]

  const inProgressCourses = [
    {
      id: 3,
      title: "Legal Aspects of Real Estate",
      progress: 75,
      estimatedCompletion: "2024-02-15",
    },
    {
      id: 4,
      title: "Investment Analysis",
      progress: 60,
      estimatedCompletion: "2024-02-20",
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-blue-100 text-blue-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Generate Your Certificate</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Download certificates for completed courses and track your progress
          </p>
        </div>

        {/* Overall Progress Card */}
        <Card className="bg-gradient-to-r from-[#001f3f] to-[#001f3f]/80 text-white">
          <CardHeader>
            <CardTitle className="text-xl lg:text-2xl flex items-center">
              <Award className="mr-3 w-6 h-6 lg:w-8 lg:h-8" />
              Certification Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{completedCourses.length}</div>
                <div className="text-sm lg:text-base opacity-90">Completed Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">{inProgressCourses.length}</div>
                <div className="text-sm lg:text-base opacity-90">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold">
                  {Math.round((completedCourses.length / (completedCourses.length + inProgressCourses.length)) * 100)}%
                </div>
                <div className="text-sm lg:text-base opacity-90">Overall Progress</div>
              </div>
            </div>
            <Progress
              value={(completedCourses.length / (completedCourses.length + inProgressCourses.length)) * 100}
              className="h-3 lg:h-4 bg-white/20"
            />
          </CardContent>
        </Card>

        {/* Completed Courses - Available Certificates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl flex items-center">
              <CheckCircle className="mr-2 w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              Available Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedCourses.length > 0 ? (
              <div className="space-y-4 lg:space-y-6">
                {completedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 lg:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 space-y-2 sm:space-y-1">
                      <h3 className="text-base lg:text-lg font-semibold text-[#001f3f]">{course.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <Badge className={`${getScoreColor(course.score)} text-xs lg:text-sm`}>
                          Score: {course.score}%
                        </Badge>
                        <span className="text-xs lg:text-sm text-gray-500">
                          Completed: {new Date(course.completionDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs lg:text-sm text-gray-500">Duration: {course.duration}</span>
                      </div>
                      <p className="text-xs lg:text-sm text-gray-600">Certificate ID: {course.certificateId}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(course.score / 20) ? "fill-current" : ""}`}
                          />
                        ))}
                      </div>
                      <Button className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-9 lg:h-10 text-sm lg:text-base">
                        <Download className="mr-2 w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 lg:py-12">
                <Award className="mx-auto w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mb-4" />
                <p className="text-base lg:text-lg text-gray-600">No certificates available yet</p>
                <p className="text-sm lg:text-base text-gray-500">Complete a course to earn your first certificate</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* In Progress Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl flex items-center">
              <Clock className="mr-2 w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              Courses in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inProgressCourses.length > 0 ? (
              <div className="space-y-4 lg:space-y-6">
                {inProgressCourses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 lg:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 lg:mb-4">
                      <h3 className="text-base lg:text-lg font-semibold text-[#001f3f] mb-2 sm:mb-0">{course.title}</h3>
                      <span className="text-sm lg:text-base font-medium text-[#001f3f]">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 lg:h-3 mb-2" />
                    <p className="text-xs lg:text-sm text-gray-600">
                      Estimated completion: {new Date(course.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 lg:py-12">
                <Clock className="mx-auto w-12 h-12 lg:w-16 lg:h-16 text-gray-400 mb-4" />
                <p className="text-base lg:text-lg text-gray-600">No courses in progress</p>
                <p className="text-sm lg:text-base text-gray-500">Start a new course to begin your learning journey</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
