"use client"

import { Search, Bell, Settings, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  user: {
    id: number
    emailaddress: string
    firstname?: string
    lastname?: string
    name?: string
  }
  onLogout: () => void
}

export function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  const getUserDisplayName = () =>
    user?.name || `${user?.firstname || ""} ${user?.lastname || ""}`.trim() || user?.emailaddress || "User"

  return (
    <header className="sticky top-0 z-10 bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 h-16 sm:h-20">
        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#001f3f] hidden sm:block">
          FIRE Agent Dashboard
        </h1>

        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 w-4 lg:w-5 h-4 lg:h-5 text-gray-400" />
            <Input
              placeholder="Search modules..."
              className="pl-10 lg:pl-12 w-48 lg:w-80 h-10 lg:h-12 text-sm lg:text-lg border-gray-300 focus:border-[#001f3f] focus:ring-[#001f3f]"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative h-10 lg:h-12 w-10 lg:w-12">
            <Bell className="w-5 lg:w-6 h-5 lg:h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 lg:h-5 w-4 lg:w-5 text-xs flex items-center justify-center font-bold">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-10 lg:h-12 w-10 lg:w-12">
                <Avatar className="h-8 lg:h-10 w-8 lg:w-10">
                  <AvatarImage src="/placeholder-user.png" alt={getUserDisplayName()} />
                  <AvatarFallback className="bg-[#fde047] text-[#001f3f] text-sm lg:text-lg font-bold">
                    {getUserDisplayName().charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 lg:w-64">
              <DropdownMenuLabel className="font-normal py-2 lg:py-3">
                <div className="space-y-1">
                  <p className="text-sm lg:text-lg font-semibold leading-none">{getUserDisplayName()}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">{user?.emailaddress}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2 lg:py-3">
                <User className="mr-2 lg:mr-3 h-4 lg:h-5 w-4 lg:w-5" />
                <span className="text-sm lg:text-base">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2 lg:py-3">
                <Settings className="mr-2 lg:mr-3 h-4 lg:h-5 w-4 lg:w-5" />
                <span className="text-sm lg:text-base">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="py-2 lg:py-3">
                <LogOut className="mr-2 lg:mr-3 h-4 lg:h-5 w-4 lg:w-5" />
                <span className="text-sm lg:text-base">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
