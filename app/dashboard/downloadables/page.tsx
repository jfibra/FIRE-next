"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Download, Search, FileText, ImageIcon, Video } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DownloadablesPage() {
  const downloadableItems = [
    {
      id: 1,
      title: "Real Estate Forms Package",
      description: "Complete collection of essential real estate forms and contracts",
      type: "PDF",
      size: "2.5 MB",
      category: "Forms",
      icon: FileText,
      downloads: 1250,
    },
    {
      id: 2,
      title: "Property Valuation Spreadsheet",
      description: "Excel template for property valuation calculations",
      type: "XLSX",
      size: "1.2 MB",
      category: "Tools",
      icon: FileText,
      downloads: 890,
    },
    {
      id: 3,
      title: "Marketing Materials Pack",
      description: "Professional marketing templates and graphics",
      type: "ZIP",
      size: "15.8 MB",
      category: "Marketing",
      icon: ImageIcon,
      downloads: 2100,
    },
    {
      id: 4,
      title: "Legal Guidelines Handbook",
      description: "Comprehensive guide to real estate legal requirements",
      type: "PDF",
      size: "4.1 MB",
      category: "Legal",
      icon: FileText,
      downloads: 756,
    },
    {
      id: 5,
      title: "Training Video Series",
      description: "Complete video course on real estate fundamentals",
      type: "MP4",
      size: "1.2 GB",
      category: "Training",
      icon: Video,
      downloads: 445,
    },
    {
      id: 6,
      title: "Market Analysis Templates",
      description: "Templates for conducting market analysis reports",
      type: "DOCX",
      size: "800 KB",
      category: "Analysis",
      icon: FileText,
      downloads: 623,
    },
  ]

  const categories = ["All", "Forms", "Tools", "Marketing", "Legal", "Training", "Analysis"]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800"
      case "XLSX":
        return "bg-green-100 text-green-800"
      case "ZIP":
        return "bg-purple-100 text-purple-800"
      case "DOCX":
        return "bg-blue-100 text-blue-800"
      case "MP4":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 lg:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001f3f] mb-2">Downloadables</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">
            Access your training materials, forms, and resources
          </p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                <Input
                  placeholder="Search downloadables..."
                  className="pl-10 lg:pl-12 h-10 lg:h-12 text-sm lg:text-base"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className={`h-8 lg:h-10 text-xs lg:text-sm ${
                      category === "All" ? "bg-[#001f3f] hover:bg-[#001f3f]/90" : ""
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Downloads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {downloadableItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg lg:hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 lg:p-3 bg-[#001f3f]/10 rounded-lg">
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#001f3f]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-[#001f3f] leading-tight">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getTypeColor(item.type)}`}>{item.type}</Badge>
                        <span className="text-xs lg:text-sm text-gray-500">{item.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm lg:text-base text-gray-600 mt-2">{item.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-xs lg:text-sm text-gray-500">
                  <span>Category: {item.category}</span>
                  <span>{item.downloads.toLocaleString()} downloads</span>
                </div>
                <Button className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-10 lg:h-12 text-sm lg:text-base">
                  <Download className="mr-2 w-4 h-4 lg:w-5 lg:h-5" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
