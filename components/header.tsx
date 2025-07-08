"use client"

import { Phone, Mail, CheckCircle } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-dark-blue to-primary-dark-blue-dark text-primary-white py-2 sm:py-3 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1.5 sm:gap-2 hover:text-blue-300 transition-colors">
            <Phone className="w-3.5 h-3.5 sm:w-4 h-4" />
            <span>+639569256686</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 hover:text-blue-300 transition-colors">
            <Mail className="w-3.5 h-3.5 sm:w-4 h-4" />
            <span>info@filipinohomes.com</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 sm:gap-4 text-xs">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 sm:w-4 h-4 text-primary-yellow" />
            <span>Trusted by 35,000+ Real Estate Agents</span>
          </div>
        </div>
      </div>
    </header>
  )
}
