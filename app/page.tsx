"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, BookOpen, Award, Play, ArrowRight, TrendingUp, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ModuleModal } from "@/components/module-modal"
import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const modules = [ { "id": "1", "cname": "RESA LAW", "description": "The Real Estate Service Act of the Philippines or Republic Act No. 9646. This course will tackle the basics and the acts that focus primarily its Implementing Rules and Regulations. After taking this module, you will be able to fully understand the use and importance of the RESA law in the real estate industry. The course will use webinar videos and a Powerpoint presentation. In order to assess this module, an online quiz and end of the module assignment will be given to the students.", "speaker": "DR. EDUARDO G. ONG", "spimg": "DR. EDUARDO G. ONG.png", "spcontact": "01234567890", "learndesc": "Introduction of the RESA Law. Students will use the video and powerpoint provided", "learndesc2": "", "learndesc3": "", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/VnC_BeHrQ6o\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"><\/iframe>", "presentation": "resalaw.pdf", "dateadded": "2020-06-02" }, { "id": "2", "cname": "DOCUMENTATION & TITLING", "description": "Learn the ropes and see the importance of the proper ways for documentation and titling. This will include the needed documents, basic requirements, the different processing of the Certificate of Title and the laws that apply.", "speaker": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA", "spimg": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png", "spcontact": "01234567890", "learndesc": "Discussion of the land administration and management laws in the Philippines, key legislation, land mandates, and acquiring lands. The students will base this on the video and the Powerpoint presentation given.", "learndesc2": "Learn about sales patents, special patents, residential free patents and the flow of process of the different kinds of patents.", "learndesc3": "", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/m2MzEhkk3Ic\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "docandtitling.pdf", "dateadded": "2020-06-04" }, { "id": "3", "cname": "CODE OF ETHICS AND RESPONSIBILITIES", "description": "This course will teach you how to transition from the real Estate service practitioners duties and behavior proper to a professional", "speaker": "ENGR. ELEANOR LIGANOR", "spimg": "ENGR. ELEANOR LIGANOR.png", "spcontact": "123456789", "learndesc": "Introduction of the code of ethics, PRC and its functions \t\t\tStudents will use the video and powerpoint provided", "learndesc2": "Sec 23. Issuance of Special Temporary Permit to Sec 33. Display of License in the Place of Business Students will use the video and powerpoint provided", "learndesc3": "Sec 34. Accreditation and Integration of Real Estate Service Association (AIPO) to Sec 45. Effectivity Online Quiz: Code of Ethics", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/FOnH6eLN-sY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "CODEOFETHICS.pdf", "dateadded": null }, { "id": "4", "cname": "Real Estate Taxation under RA8424 and Train Law", "description": "The focal point of this course is the basics of RA 8424 and TRAIN Law and the commission of the Internal Revenue Real Property Values. In this course, you will understand the different components of taxation, understand the TRAIN law and how the TRAIN Law has changed taxation in the Philippines. Assessment will be done through an online quiz and an end of module assignment. By the end of this course, you will have a better understanding on how taxation and TRAIN Law works and how vital it is in the industry.", "speaker": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA", "spimg": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png", "spcontact": "123456789", "learndesc": "Assessment of various properties, BLGF under the DOF\r\nand the discussion of RA 9646\r\nVideo and powerpoint will be used", "learndesc2": "Definition of terms and role of the assessor\r\nStudents will use the video and powerpoint provided\r\n.", "learndesc3": "Introduction of TRAIN Law\r\nOnline Quiz: Real Estate Taxation under RA 8424 and TRAIN Law", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/ZMGIElqC7RQ\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "RA8424.pdf", "dateadded": null }, { "id": "5", "cname": "THE SHARK PRINCIPLES", "description": "The course SHARK Principles , discusses the underlying principles to success that are applicable to every real estate practitioner. Students taking this module will be assessed based on an online quiz and an end of the module assignment. The principles in this course will not only help your career but also help you understand the importance of having good principles and teach you the value of maintaining good relationships with clients. ", "speaker": "Alejandro Manalac", "spimg": "ALEJANDRO MANALAC.png", "spcontact": "123456789", "learndesc": "Part I: Developing Champions with Values\r\nStudents will use the video and powerpoint provided\r\n", "learndesc2": "Part II: The SHARK Selling Principle\r\nStudents will use the video and powerpoint provided", "learndesc3": "Part III: The Language of Selling \r\nOnline Quiz: SHARK Principles", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/K-I-y9G9GTM\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "sharkprinciples.pdf", "dateadded": null }, { "id": "6", "cname": "LEADERSHIP & MANAGEMENT SKILLS", "description": "In this course, entitled Leadership and Management Skills in Real Estate will help you develop your knowledge and other vital points such as effective leadership, goals, marketing and even working and marketing with peers. These are all essential in becoming a leader and manager in the Real Estate industry. It will also discuss how you can work with others and be a leader in various aspects in the industry. An assessment will be done through an online quiz and an end of module assignment. ", "speaker": "Azela E. Honor,REB", "spimg": "AZELA HONOR.png", "spcontact": "123456789", "learndesc": "Discussion of how to be an effective leader and a leader’s mindset\t\tStudents will use the video and powerpoint provided", "learndesc2": "Discussion on digital marketing skills and exploring the different people skills Video and powerpoint will be used", "learndesc3": "Tackling collaborative skills, networking skills and Public Speaking 101 Students will use the video and powerpoint provided", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/q96V3ZXP2I0\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "leadership.pdf", "dateadded": null }, { "id": "7", "cname": "Boosting your Rental Sales", "description": "Your opportunity to the future of Real Estate", "speaker": "Anthony Leuterio", "spimg": "ANTHONY GERARD LEUTERIO.png", "spcontact": "123456789", "learndesc": "Understanding the different aspects of property management Video and powerpoint will be used", "learndesc2": "Insights and support facilities in a residential property management Students will use the video and powerpoint provided", "learndesc3": "Why quality management tools in facilities matter \tOnline Quiz: Best Practices in Real Estate, Rent Management and Property Management", "video": "<iframe width=\"990px\" height=\"558px\" src=\"https:\/\/filipinohomes123.s3.ap-southeast-1.amazonaws.com\/uploads\/Boosting_Your_Rental_Sales.mp4\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "rent.pdf", "dateadded": null }, { "id": "8", "cname": "Branding Building and Why it Matters in the New Normal", "description": "This course will aid you in understanding and developing how building and improving one's personality traits plays an important role for you and your team especially in building a brand. Branding gives you an identity which will help you in your career. This will also aid in adapting to the new normal, which is making a brand for you on social media. Moreover, learning when to post and when not to is vital especially with contents and strategic postings. By the end of this course, you will have a better understanding on how taxation and TRAIN Law works and how vital it is in the industry. ", "speaker": "George Ryan Sarmago", "spimg": "GEORGE RYAN SARMAGO.png", "spcontact": "123456789", "learndesc": "Discussion of the functions of branding and the difference between selling and branding \t\t\tStudents will use the video and powerpoint provided", "learndesc2": "Identifying and understanding brand crisis and branding the Filipinohomes way Video and powerpoint will be used", "learndesc3": "Strategic postings (what and what not to post) and 7 strategies in building a brand during ECQ Students will use the video and powerpoint provided", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/x8I1ck0MjTI\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "branding.pdf", "dateadded": null }, { "id": "9", "cname": "Ignite Your Social Media Marketing", "description": "At present, our lives are linked to social media and it has also become a part of our lives. During this course, entitled Ignite Your Social Media Marketing, it will show you how social media plays a vital role in sales in the real estate industry especially during a worldwide pandemic. . This will include a brief discussion on sales, listings and the effectiveness of your posts to your viewers. An aspect on using social media such as videos and postings will also be discussed which will be supported by real life sales and how it is possible to make the most of marketing through social media platforms.An assessment will be done through an online quiz and an end of module assignment. ", "speaker": "Marc Godornes", "spimg": "MARC CHRISTIAN GODORNES.png", "spcontact": "123456789", "learndesc": "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used", "learndesc2": "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used", "learndesc3": "Insights on the types of videos and the shift in the market during quarantine Students will use the video and powerpoint provided", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/wZdcSuJ-f1g\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "ignite.pdf", "dateadded": null }, { "id": "10", "cname": "Supercharge your FACEBOOK Marketing in 2020", "description": "Nowadays, we use the platform of Facebook for numerous things and one of these includes promoting your units. This course will teach you how to market yourself better and effectively on Facebook. Your understanding of this subject will be through an assessment as an online quiz and an end of module assignment.", "speaker": "Gilbert Monecillo", "spimg": "GILBERT MONECILLO.png", "spcontact": "123456789", "learndesc": "Discussing ECQ and how social media marketing can be used as a marketing Platform Students will use the video and powerpoint provided", "learndesc2": "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used", "learndesc3": "Insights on the types of videos and the shift in the market during quarantine Students will use the video and powerpoint provided", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/sg2T0bz71Ks\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "Supercharge.pdf", "dateadded": null }, { "id": "11", "cname": "Real Property Taxation under RA7160", "description": "This will help you understand the real property taxation based on the local government code of 1991. This will cover property tax, business tax, professional tax, amusement tax and other fees and charges.", "speaker": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA", "spimg": "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png", "spcontact": "123456789", "learndesc": "Discussing ECQ and how social media marketing can be used as a marketing Platform Students will use the video and powerpoint provided", "learndesc2": "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used", "learndesc3": "Insights on the types of videos and the shift in the market during quarantine Students will use the video and powerpoint provided", "video": "<iframe width=\"1000px\" height=\"720px\" src=\"https:\/\/www.youtube.com\/embed\/f4e1lT32wOo\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen><\/iframe>", "presentation": "", "dateadded": null }]

export default function HomePage() {
  const [selectedModule, setSelectedModule] = useState<(typeof modules)[0] | null>(null)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)

  const handleViewModule = (module: (typeof modules)[0]) => {
    setSelectedModule(module)
    setIsModuleModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Navigation />

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
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">35,000+</div>
                  <div className="text-blue-200 text-sm">Real Estate Agents Trained</div>
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

      <Footer />
      <ScrollToTop />
      <ModuleModal module={selectedModule} isOpen={isModuleModalOpen} onClose={() => setIsModuleModalOpen(false)} />
    </div>
  )
}
