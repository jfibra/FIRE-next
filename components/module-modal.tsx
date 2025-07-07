"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, User, Clock } from "lucide-react"

interface Module {
  id: string
  cname: string
  description: string
  speaker: string
  spimg: string
  learndesc: string
  learndesc2: string
  learndesc3: string
}

interface ModuleModalProps {
  module: Module | null
  isOpen: boolean
  onClose: () => void
}

export function ModuleModal({ module, isOpen, onClose }: ModuleModalProps) {
  if (!module) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="text-sm">
              Module {module.id}
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Clock className="w-3 h-3 mr-1" />
              2-3 hours
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-bold text-left">{module.cname}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Speaker Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {module.speaker
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Instructor</span>
              </div>
              <h3 className="font-semibold text-lg">{module.speaker}</h3>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Course Overview</h4>
            <p className="text-gray-700 leading-relaxed">{module.description}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="font-semibold text-lg mb-3">What You'll Learn</h4>
            <div className="space-y-3">
              {module.learndesc && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <p className="text-gray-700">{module.learndesc}</p>
                </div>
              )}
              {module.learndesc2 && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <p className="text-gray-700">{module.learndesc2}</p>
                </div>
              )}
              {module.learndesc3 && (
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <p className="text-gray-700">{module.learndesc3}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Play className="w-4 h-4 mr-2" />
              Login Now To Access
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
