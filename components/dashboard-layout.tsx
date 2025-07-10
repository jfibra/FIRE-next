"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface DashboardUser {
  id: number
  emailaddress: string
  firstname?: string
  lastname?: string
  name?: string
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<DashboardUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userData = localStorage.getItem("user")

    if (!isLoggedIn || !userData) {
      router.push("/login")
      return
    }

    try {
      setUser(JSON.parse(userData))
    } catch {
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const getActiveMenu = () => {
    if (pathname === "/dashboard") return "dashboard"
    if (pathname === "/dashboard/profile") return "profile"
    if (pathname === "/dashboard/downloadables") return "downloadables"
    if (pathname === "/dashboard/certificate") return "certificate"
    return "dashboard"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 lg:h-16 w-12 lg:w-16 border-b-2 lg:border-b-4 border-[#001f3f]" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar user={user} activeMenu={getActiveMenu()} onLogout={handleLogout} />

      <div className="flex-1 flex flex-col lg:ml-0">
        <DashboardHeader user={user} onLogout={handleLogout} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-12 lg:ml-0">{children}</main>
      </div>
    </div>
  )
}
