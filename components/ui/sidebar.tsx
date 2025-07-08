"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const sidebarVariants = cva(
  "flex h-full flex-col overflow-hidden border-r bg-sidebar-background text-sidebar-foreground",
  {
    variants: {
      variant: {
        default: "",
        compact: "w-16",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  children?: React.ReactNode
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(({ className, variant, children, ...props }, ref) => (
  <aside ref={ref} className={cn(sidebarVariants({ variant }), className)} {...props}>
    {children}
  </aside>
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-20 items-center justify-center p-4", className)} {...props} />
  ),
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarHeaderTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("text-xl font-semibold", className)} {...props} />,
)
SidebarHeaderTitle.displayName = "SidebarHeaderTitle"

const SidebarMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <ScrollArea ref={ref} className={cn("flex-1", className)} {...props} />,
)
SidebarMain.displayName = "SidebarMain"

const SidebarNav = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <nav ref={ref} className={cn("flex flex-col p-2", className)} {...props} />,
)
SidebarNav.displayName = "SidebarNav"

const SidebarNavMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-2", className)} {...props} />,
)
SidebarNavMain.displayName = "SidebarNavMain"

const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & {
    active?: boolean
    disabled?: boolean
    subLink?: boolean
  }
>(({ className, active, disabled, subLink, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = active ?? pathname === props.href

  return (
    <Link
      ref={ref}
      aria-disabled={disabled}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        subLink && "ml-4",
        className,
      )}
      {...props}
    />
  )
})
SidebarNavLink.displayName = "SidebarNavLink"

const SidebarNavSub = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-2", className)} {...props} />,
)
SidebarNavSub.displayName = "SidebarNavSub"

const SidebarNavSubLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & {
    active?: boolean
    disabled?: boolean
  }
>(({ className, active, disabled, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = active ?? pathname === props.href

  return (
    <Link
      ref={ref}
      aria-disabled={disabled}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        disabled && "pointer-events-none opacity-50",
        "ml-4",
        className,
      )}
      {...props}
    />
  )
})
SidebarNavSubLink.displayName = "SidebarNavSubLink"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-20 items-center justify-center p-4", className)} {...props} />
  ),
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarToggle = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border bg-background p-2 shadow-md",
        className,
      )}
      {...props}
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  ),
)
SidebarToggle.displayName = "SidebarToggle"

const SidebarCollapsible = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
  }
>(({ className, open, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
      open ? "h-auto" : "h-0",
      className,
    )}
    {...props}
  >
    {children}
  </div>
))
SidebarCollapsible.displayName = "SidebarCollapsible"

const SidebarCollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    open?: boolean
  }
>(({ className, open, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown
      className={cn("ml-auto h-4 w-4 transition-transform duration-200", open ? "rotate-180" : "rotate-0")}
    />
  </button>
))
SidebarCollapsibleTrigger.displayName = "SidebarCollapsibleTrigger"

const SidebarCollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex flex-col space-y-2", className)} {...props} />,
)
SidebarCollapsibleContent.displayName = "SidebarCollapsibleContent"

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarMain,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarNavSub,
  SidebarNavSubLink,
  SidebarFooter,
  SidebarToggle,
  SidebarCollapsible,
  SidebarCollapsibleTrigger,
  SidebarCollapsibleContent,
}
