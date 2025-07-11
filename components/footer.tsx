import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-dark-blue to-primary-dark-blue-dark text-primary-white py-10 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Image
              src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png"
              alt="FIRE Logo"
              width={350}
              height={45}
              className="h-auto w-[350px] sm:w-[350px]"
            />
            <p className="text-gray-400 leading-relaxed text-sm">
              Comprehensive online real estate training for Filipino professionals. Building careers, one agent at a
              time.
            </p>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 h-4 fill-primary-yellow text-primary-yellow" />
              ))}
              <span className="text-xs sm:text-sm text-gray-400 ml-1 sm:ml-2">
                Trusted by 35,000+ Real Estate Agents
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              <Link href="/" className="block text-gray-400 hover:text-primary-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-primary-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Contact Info</h4>
            <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 h-5 text-blue-400" />
                <span>+63 9569256686</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 h-5 text-blue-400" />
                <span>info@filipinohomes.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 h-5 text-blue-400" />
                <span>Cebu, Philippines</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">Follow Us</h4>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-gray-400 text-sm">Stay connected for updates and industry insights</p>
              <div className="flex gap-2 sm:gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-primary-white hover:border-primary-white bg-transparent text-xs sm:text-sm px-3 py-1.5"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-400 hover:text-primary-white hover:border-primary-white bg-transparent text-xs sm:text-sm px-3 py-1.5"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; 2025 Filipino Homes Institute of Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
