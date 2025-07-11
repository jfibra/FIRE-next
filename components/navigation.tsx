"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-primary-white shadow-lg py-3 sm:py-4 sticky top-0 z-40 backdrop-blur-sm bg-primary-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <Image
                src="/images/FIRE-LOGO-NEW-TRANSPARENT.png"
                alt="Real Estate Training PH"
                width={350}
                height={90}
                className="h-auto w-[350px] sm:w-[350px] md:w-[350px] lg:w-[400px]"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-8 sm:ml-10 flex items-baseline space-x-3 sm:space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-dark-blue-light px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium transition-colors"
              >
                HOME
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-dark-blue-light text-sm font-medium transition-colors"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue hover:from-primary-dark-blue hover:to-primary-dark-blue-dark shadow-lg text-sm px-4 py-2">
                LOGIN
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark-blue-light"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-white border-t">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-dark-blue-light block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-dark-blue-light block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </Link>
            <div className="px-3 py-2">
              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue hover:from-primary-dark-blue hover:to-primary-dark-blue-dark shadow-lg text-base py-2.5">
                  LOGIN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
