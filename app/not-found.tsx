import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-dark-blue-light to-primary-dark-blue text-primary-white p-4 text-center">
      <Image
        src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png"
        alt="FIRE Logo"
        width={250}
        height={75}
        className="mb-8 animate-pulse"
      />
      <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-primary-yellow">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg sm:text-xl mb-8 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-primary-yellow hover:bg-primary-yellow-dark text-primary-dark-blue font-semibold px-8 py-4 text-lg shadow-lg transition-all duration-300">
          <Home className="w-5 h-5 mr-2" />
          Go to Homepage
        </Button>
      </Link>
    </div>
  )
}
