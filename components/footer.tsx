import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Star } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Image src="/images/FIRE-LOGO-NEW-TRANSPARENT-WHITE.png" alt="FIRE Logo" className="w-15" />
            <p className="text-slate-400 leading-relaxed">
              Comprehensive online real estate training for Filipino professionals. Building careers, one student at a
              time.
            </p>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-slate-400 ml-2">Trusted by 35,000+ Real Estate Agents</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/" className="block text-slate-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Contact Info</h4>
            <div className="space-y-3 text-slate-400">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+63 9569256686</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@filipinohomes.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Cebu, Philippines</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Follow Us</h4>
            <div className="space-y-3">
              <p className="text-slate-400 text-sm">Stay connected for updates and industry insights</p>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-400 hover:text-white hover:border-white bg-transparent"
                >
                  Facebook
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-400 hover:text-white hover:border-white bg-transparent"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Filipino Homes Institute of Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
