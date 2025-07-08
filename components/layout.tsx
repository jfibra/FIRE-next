import type React from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { Header } from "./header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
