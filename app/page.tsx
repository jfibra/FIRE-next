"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  BookOpen,
  Award,
  Play,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ModuleModal } from "@/components/module-modal"

const modules = [
  {
    id: "1",
    cname: "RESA LAW",
    description:
      "The Real Estate Service Act of the Philippines or Republic Act No. 9646. This course will tackle the basics and the acts that focus primarily its Implementing Rules and Regulations. After taking this module, you will be able to fully understand the use and importance of the RESA law in the real estate industry.",
    speaker: "DR. EDUARDO G. ONG",
    spimg: "DR. EDUARDO G. ONG.png",
    learndesc: "Introduction of the RESA Law. Students will use the video and powerpoint provided",
    learndesc2: "Understanding the Implementing Rules and Regulations",
    learndesc3: "Application of RESA Law in real estate practice",
  },
  {
    id: "2",
    cname: "DOCUMENTATION & TITLING",
    description:
      "Learn the ropes and see the importance of the proper ways for documentation and titling. This will include the needed documents, basic requirements, the different processing of the Certificate of Title and the laws that apply.",
    speaker: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA",
    spimg: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png",
    learndesc:
      "Discussion of the land administration and management laws in the Philippines, key legislation, land mandates, and acquiring lands",
    learndesc2:
      "Learn about sales patents, special patents, residential free patents and the flow of process of the different kinds of patents",
    learndesc3: "Certificate of Title processing and requirements",
  },
  {
    id: "3",
    cname: "CODE OF ETHICS AND RESPONSIBILITIES",
    description:
      "This course will teach you how to transition from the real Estate service practitioners duties and behavior proper to a professional",
    speaker: "ENGR. ELEANOR LIGANOR",
    spimg: "ENGR. ELEANOR LIGANOR.png",
    learndesc: "Introduction of the code of ethics, PRC and its functions",
    learndesc2: "Sec 23. Issuance of Special Temporary Permit to Sec 33. Display of License in the Place of Business",
    learndesc3:
      "Sec 34. Accreditation and Integration of Real Estate Service Association (AIPO) to Sec 45. Effectivity",
  },
  {
    id: "4",
    cname: "Real Estate Taxation under RA8424 and Train Law",
    description:
      "The focal point of this course is the basics of RA 8424 and TRAIN Law and the commission of the Internal Revenue Real Property Values. In this course, you will understand the different components of taxation, understand the TRAIN law and how the TRAIN Law has changed taxation in the Philippines.",
    speaker: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA",
    spimg: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png",
    learndesc: "Assessment of various properties, BLGF under the DOF and the discussion of RA 9646",
    learndesc2: "Definition of terms and role of the assessor",
    learndesc3: "Introduction of TRAIN Law and its impact on real estate",
  },
  {
    id: "5",
    cname: "THE SHARK PRINCIPLES",
    description:
      "The course SHARK Principles, discusses the underlying principles to success that are applicable to every real estate practitioner. The principles in this course will not only help your career but also help you understand the importance of having good principles and teach you the value of maintaining good relationships with clients.",
    speaker: "Alejandro Manalac",
    spimg: "ALEJANDRO MANALAC.png",
    learndesc: "Part I: Developing Champions with Values",
    learndesc2: "Part II: The SHARK Selling Principle",
    learndesc3: "Part III: The Language of Selling",
  },
  {
    id: "6",
    cname: "LEADERSHIP & MANAGEMENT SKILLS",
    description:
      "Leadership and Management Skills in Real Estate will help you develop your knowledge and other vital points such as effective leadership, goals, marketing and even working and marketing with peers. These are all essential in becoming a leader and manager in the Real Estate industry.",
    speaker: "Azela E. Honor,REB",
    spimg: "AZELA HONOR.png",
    learndesc: "Discussion of how to be an effective leader and a leader's mindset",
    learndesc2: "Discussion on digital marketing skills and exploring the different people skills",
    learndesc3: "Tackling collaborative skills, networking skills and Public Speaking 101",
  },
  {
    id: "7",
    cname: "Boosting your Rental Sales",
    description:
      "Your opportunity to the future of Real Estate - Understanding property management and rental strategies. Learn how to maximize rental income and manage properties effectively.",
    speaker: "Anthony Leuterio",
    spimg: "ANTHONY GERARD LEUTERIO.png",
    learndesc: "Understanding the different aspects of property management",
    learndesc2: "Insights and support facilities in a residential property management",
    learndesc3: "Why quality management tools in facilities matter",
  },
  {
    id: "8",
    cname: "Branding Building and Why it Matters in the New Normal",
    description:
      "This course will aid you in understanding and developing how building and improving one's personality traits plays an important role for you and your team especially in building a brand. Branding gives you an identity which will help you in your career.",
    speaker: "George Ryan Sarmago",
    spimg: "GEORGE RYAN SARMAGO.png",
    learndesc: "Discussion of the functions of branding and the difference between selling and branding",
    learndesc2: "Identifying and understanding brand crisis and branding the Filipinohomes way",
    learndesc3: "Strategic postings (what and what not to post) and 7 strategies in building a brand during ECQ",
  },
]

export default function HomePage() {
  const [selectedModule, setSelectedModule] = useState<(typeof modules)[0] | null>(null)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)

  const handleViewModule = (module: (typeof modules)[0]) => {
    setSelectedModule(module)
    setIsModuleModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span>+63 9569256686</span>
            </div>
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@filipinohomes.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Trusted by 10,000+ Students</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-lg py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/images/logo.png" alt="FIRE Logo" width={200} height={60} className="h-12 w-auto" />
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              HOME
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
              CONTACT US
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-4 py-2">
                  🏆 Award-Winning Training Institute
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Welcome to <span className="text-yellow-300">FIRE</span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Exclusive training platform for Filipino Homes and Rent.ph agents. Access comprehensive real estate
                  courses designed to enhance your professional skills and career growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg shadow-xl"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = "/documents/agent-endorsement-letter.pdf"
                    link.download = "Agent-Endorsement-Letter.pdf"
                    link.click()
                  }}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Download Agent Endorsement Letter
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <div className="text-blue-200 text-sm">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-blue-200 text-sm">Industry Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <video controls className="w-full h-auto rounded-lg" poster="/images/video-thumbnail.png">
                <source src="https://realestatetraining.ph/video/homepage.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Brokerage Essentials</h3>
              <p className="text-slate-600">
                Master the art of real estate brokerage, from client acquisition to closing deals.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Rental Management</h3>
              <p className="text-slate-600">
                Learn effective strategies for managing rental properties and tenant relationships.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-800">Investment Analysis</h3>
              <p className="text-slate-600">
                Develop skills to analyze and maximize real estate investment opportunities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 mb-4">Comprehensive Training Program</Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Training Modules</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Master the skills you need to succeed in the Philippine real estate industry with our expert-led training
              modules.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Module {module.id}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {module.cname}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-3">{module.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users className="w-4 h-4" />
                    <span className="truncate font-medium">{module.speaker}</span>
                  </div>
                  <Button
                    onClick={() => handleViewModule(module)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group-hover:shadow-lg transition-all"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    View Module
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Anthony Leuterio Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/sir-ton.png"
                alt="Anthony Gerard Leuterio"
                width={500}
                height={600}
                className="relative rounded-2xl"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                  🏆 2024 International Realtor of the Year
                </Badge>
                <h2 className="text-4xl font-bold text-slate-800">Anthony Gerard "Tonton" Leuterio</h2>
                <p className="text-2xl text-blue-600 font-semibold">Founder & CEO</p>
              </div>

              <div className="space-y-6 text-slate-700">
                <p className="text-lg leading-relaxed">
                  Named by the U.S.-based National Association of Realtors (NAR), acknowledging his leadership in
                  ethical practices and global real estate excellence.
                </p>

                <p className="leading-relaxed">
                  Anthony Gerard Leuterio is a celebrated Filipino real estate entrepreneur, best known as the Founder &
                  CEO of Filipino Homes, Leuterio Realty & Brokerage, and Rent.ph. With a Bachelor's in Computer Science
                  from the University of San Jose–Recoletos and further studies at Harvard Business School Online, his
                  blend of tech-savvy and business acumen has transformed real estate in the Philippines.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">🏢 Filipino Homes</h4>
                    <p className="text-sm text-slate-600">
                      Founded in 2008, grown to ~100 offices and over 11,000 licensed agents nationally.
                    </p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-0">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">🏠 Rent.ph</h4>
                    <p className="text-sm text-slate-600">
                      Launched in 2012, now the largest rental platform in the country.
                    </p>
                  </Card>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h4 className="font-bold text-slate-800 mb-2">Leadership Philosophy</h4>
                  <p className="text-slate-700">
                    Emphasizes client-first principles, stressing responsible dealings, protecting investments, and
                    lifelong client support. Believes in uplifting people—from clients to agents—through training,
                    ethics, and family-style mentorship.
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-lg text-slate-800">500+ Industry Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 px-6 py-3 text-lg">
              🚀 Start Your Journey Today
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start Your Real Estate Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join FIRE today and take the first step towards a successful career in real estate! Get access to expert
              training, industry insights, and professional certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-12 py-4 text-lg shadow-xl"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Image src="/images/logo.png" alt="FIRE Logo" width={200} height={60} className="h-12 w-auto" />
              <p className="text-slate-400 leading-relaxed">
                Comprehensive online real estate training for Filipino professionals. Building careers, one student at a
                time.
              </p>
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-slate-400 ml-2">Trusted by 10,000+ students</span>
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

      <ScrollToTop />
      <ModuleModal module={selectedModule} isOpen={isModuleModalOpen} onClose={() => setIsModuleModalOpen(false)} />
    </div>
  )
}
