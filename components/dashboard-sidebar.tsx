"use client"

import { useState } from "react"
import Image from "next/image"
import { LayoutDashboard, UserCircle, Download, Award, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

interface DashboardSidebarProps {
  user: {
    id: number
    emailaddress: string
    firstname?: string
    lastname?: string
    fullname?: string
    s3bucket?: string
  }
  activeMenu: string
  onLogout: () => void
}

export function DashboardSidebar({ user, activeMenu, onLogout }: DashboardSidebarProps) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const getUserDisplayName = () => {
    if (user?.fullname) return user.fullname
    if (user?.firstname && user?.lastname) return `${user.firstname} ${user.lastname}`
    if (user?.firstname) return user.firstname
    return user?.emailaddress || "User"
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    if (name === user?.emailaddress) {
      return name.charAt(0).toUpperCase()
    }
    const nameParts = name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  const getProfileImageUrl = () => {
    return user?.s3bucket || "/placeholder-user.png"
  }

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "profile", label: "Profile Management", icon: UserCircle, href: "/dashboard/profile" },
    { id: "downloadables", label: "Downloadables", icon: Download, href: "/dashboard/downloadables" },
    { id: "certificate", label: "Generate Your Certificate", icon: Award, href: "/dashboard/certificate" },
    { id: "logout", label: "Logout", icon: LogOut, onClick: onLogout },
  ]

  const handleMenuClick = (item: any) => {
    if (item.onClick) {
      item.onClick()
    } else if (item.href) {
      router.push(item.href)
    }
    setMobileOpen(false)
  }

  // Mobile overlay
  if (mobileOpen) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
        <aside className="fixed left-0 top-0 h-full w-80 bg-[#001f3f] text-white flex flex-col shadow-2xl z-50 lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#001f3f]/40">
            <div className="flex items-center space-x-3">
              <Image src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png" alt="FIRE" height={150} width={300} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item)}
                className={`group flex items-center w-full px-4 py-3 text-base font-medium transition-colors ${
                  activeMenu === item.id ? "bg-white/10" : "hover:bg-white/10"
                } ${item.id === "logout" ? "text-red-300 hover:text-red-200" : ""}`}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span className="ml-3">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-[#001f3f]/40 flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={getProfileImageUrl() || "/placeholder.svg"}
                alt={getUserDisplayName()}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder-user.png"
                }}
              />
              <AvatarFallback className="bg-[#fde047] text-[#001f3f] text-base font-bold">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-base font-semibold truncate">{getUserDisplayName()}</p>
              <p className="text-sm text-gray-300 truncate">{user?.emailaddress}</p>
            </div>
          </div>
        </aside>
      </>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-30 lg:hidden bg-white shadow-md"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-6 h-6 text-[#001f3f]" />
      </Button>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex ${
          collapsed ? "w-16 xl:w-20" : "w-64 xl:w-80"
        } transition-all duration-300 bg-[#001f3f] text-white flex-col shadow-2xl`}
      >
        <div className="flex items-center justify-between p-4 xl:p-6 border-b border-[#001f3f]/40">
          <div className="flex items-center space-x-3 overflow-hidden">
            <Image
              src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png"
              alt="FIRE"
              height={collapsed ? 0 : 150}
              width={collapsed ? 0 : 350}
              className="flex-shrink-0"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-8 xl:h-10 w-8 xl:w-10"
            onClick={() => setCollapsed(!collapsed)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 xl:w-6 h-5 xl:h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 xl:py-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className={`group flex items-center w-full px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-lg font-medium transition-colors ${
                activeMenu === item.id ? "bg-white/10" : "hover:bg-white/10"
              } ${item.id === "logout" ? "text-red-300 hover:text-red-200" : ""}`}
            >
              <item.icon className="w-5 xl:w-7 h-5 xl:h-7 flex-shrink-0" />
              {!collapsed && <span className="ml-3 xl:ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 xl:p-6 border-t border-[#001f3f]/40 flex items-center space-x-3 xl:space-x-4">
          <Avatar className="h-8 xl:h-12 w-8 xl:w-12">
            <AvatarImage
              src={getProfileImageUrl() || "/placeholder.svg"}
              alt={getUserDisplayName()}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder-user.png"
              }}
            />
            <AvatarFallback className="bg-[#fde047] text-[#001f3f] text-sm xl:text-lg font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm xl:text-lg font-semibold truncate">{getUserDisplayName()}</p>
              <p className="text-xs xl:text-sm text-gray-300 truncate">{user?.emailaddress}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
