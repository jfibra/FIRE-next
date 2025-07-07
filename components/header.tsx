"use client"

import { Phone, Mail, CheckCircle } from "lucide-react"

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Phone className="w-4 h-4" />
            <span>+639569256686</span>
          </div>
          <div className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Mail className="w-4 h-4" />
            <span>info@filipinohomes.com</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Trusted by 35,000+ Real Estate Agents</span>
          </div>
        </div>
      </div>
    </header>
  )
}
