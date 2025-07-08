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
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto p-4 sm:p-6 md:p-8">
        <DialogHeader>
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Module {module.id}
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">
              <Clock className="w-3 h-3 mr-1" />
              2-3 hours
            </Badge>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-left text-primary-dark-blue">
            {module.cname}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Speaker Info */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
            <div className="w-14 h-14 sm:w-16 h-16 bg-gradient-to-br from-primary-dark-blue-light to-primary-dark-blue rounded-full flex items-center justify-center text-primary-white font-bold text-lg sm:text-xl">
              {module.speaker
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <User className="w-3.5 h-3.5 sm:w-4 h-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">Instructor</span>
              </div>
              <h3 className="font-semibold text-base sm:text-lg text-primary-dark-blue">{module.speaker}</h3>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-primary-dark-blue">Course Overview</h4>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{module.description}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-primary-dark-blue">
              What You'll Learn
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {module.learndesc && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-dark-blue-light text-xs sm:text-sm font-semibold">1</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{module.learndesc.replace(/Agents/g, "Agents")}</p>
                </div>
              )}
              {module.learndesc2 && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-dark-blue-light text-xs sm:text-sm font-semibold">2</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{module.learndesc2.replace(/Agents/g, "Agents")}</p>
                </div>
              )}
              {module.learndesc3 && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-dark-blue-light text-xs sm:text-sm font-semibold">3</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{module.learndesc3.replace(/Agents/g, "Agents")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-4 border-t border-gray-200">
            <Button className="w-full h-10 sm:h-12 bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue hover:from-primary-dark-blue hover:to-primary-dark-blue-dark text-base sm:text-lg">
              <Play className="w-4 h-4 sm:w-5 h-5 mr-2" />
              Login Now To Access
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
