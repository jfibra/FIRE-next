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

const modules = [
  {
    id: "1",
    cname: "RESA LAW",
    description:
      "The Real Estate Service Act of the Philippines or Republic Act No. 9646. This course will tackle the basics and the acts that focus primarily its Implementing Rules and Regulations. After taking this module, you will be able to fully understand the use and importance of the RESA law in the real estate industry. The course will use webinar videos and a Powerpoint presentation. In order to assess this module, an online quiz and end of the module assignment will be given to the agents.",
    speaker: "DR. EDUARDO G. ONG",
    spimg: "DR. EDUARDO G. ONG.png",
    spcontact: "01234567890",
    learndesc: "Introduction of the RESA Law. Agents will use the video and powerpoint provided",
    learndesc2: "",
    learndesc3: "",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/VnC_BeHrQ6o" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>',
    presentation: "resalaw.pdf",
    dateadded: "2020-06-02",
  },
  {
    id: "2",
    cname: "DOCUMENTATION & TITLING",
    description:
      "Learn the ropes and see the importance of the proper ways for documentation and titling. This will include the needed documents, basic requirements, the different processing of the Certificate of Title and the laws that apply.",
    speaker: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA",
    spimg: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png",
    spcontact: "01234567890",
    learndesc:
      "Discussion of the land administration and management laws in the Philippines, key legislation, land mandates, and acquiring lands. The agents will base this on the video and the Powerpoint presentation given.",
    learndesc2:
      "Learn about sales patents, special patents, residential free patents and the flow of process of the different kinds of patents.",
    learndesc3: "",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/m2MzEhkk3Ic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "docandtitling.pdf",
    dateadded: "2020-06-04",
  },
  {
    id: "3",
    cname: "CODE OF ETHICS AND RESPONSIBILITIES",
    description:
      "This course will teach you how to transition from the real Estate service practitioners duties and behavior proper to a professional",
    speaker: "ENGR. ELEANOR LIGANOR",
    spimg: "ENGR. ELEANOR LIGANOR.png",
    spcontact: "123456789",
    learndesc:
      "Introduction of the code of ethics, PRC and its functions \t\t\tAgents will use the video and powerpoint provided",
    learndesc2:
      "Sec 23. Issuance of Special Temporary Permit to Sec 33. Display of License in the Place of Business Agents will use the video and powerpoint provided",
    learndesc3:
      "Sec 34. Accreditation and Integration of Real Estate Service Association (AIPO) to Sec 45. Effectivity Online Quiz: Code of Ethics",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/FOnH6eLN-sY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "CODEOFETHICS.pdf",
    dateadded: null,
  },
  {
    id: "4",
    cname: "Real Estate Taxation under RA8424 and Train Law",
    description:
      "The focal point of this course is the basics of RA 8424 and TRAIN Law and the commission of the Internal Revenue Real Property Values. In this course, you will understand the different components of taxation, understand the TRAIN law and how the TRAIN Law has changed taxation in the Philippines. Assessment will be done through an online quiz and an end of module assignment. By the end of this course, you will have a better understanding on how taxation and TRAIN Law works and how vital it is in the industry.",
    speaker: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA",
    spimg: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png",
    spcontact: "123456789",
    learndesc:
      "Assessment of various properties, BLGF under the DOF\r\nand the discussion of RA 9646\r\nVideo and powerpoint will be used",
    learndesc2:
      "Definition of terms and role of the assessor\r\nAgents will use the video and powerpoint provided\r\n.",
    learndesc3: "Introduction of TRAIN Law\r\nOnline Quiz: Real Estate Taxation under RA 8424 and TRAIN Law",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/ZMGIElqC7RQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "RA8424.pdf",
    dateadded: null,
  },
  {
    id: "5",
    cname: "THE SHARK PRINCIPLES",
    description:
      "The course SHARK Principles , discusses the underlying principles to success that are applicable to every real estate practitioner. Agents taking this module will be assessed based on an online quiz and an end of the module assignment. The principles in this course will not only help your career but also help you understand the importance of having good principles and teach you the value of maintaining good relationships with clients. ",
    speaker: "Alejandro Manalac",
    spimg: "ALEJANDRO MANALAC.png",
    spcontact: "123456789",
    learndesc: "Part I: Developing Champions with Values\r\nAgents will use the video and powerpoint provided\r\n",
    learndesc2: "Part II: The SHARK Selling Principle\r\nAgents will use the video and powerpoint provided",
    learndesc3: "Part III: The Language of Selling \r\nOnline Quiz: SHARK Principles",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/K-I-y9G9GTM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "sharkprinciples.pdf",
    dateadded: null,
  },
  {
    id: "6",
    cname: "LEADERSHIP & MANAGEMENT SKILLS",
    description:
      "In this course, entitled Leadership and Management Skills in Real Estate will help you develop your knowledge and other vital points such as effective leadership, goals, marketing and even working and marketing with peers. These are all essential in becoming a leader and manager in the Real Estate industry. It will also discuss how you can work with others and be a leader in various aspects in the industry. An assessment will be done through an online quiz and an end of module assignment. ",
    speaker: "Azela E. Honor,REB",
    spimg: "AZELA HONOR.png",
    spcontact: "123456789",
    learndesc:
      "Discussion of how to be an effective leader and a leader’s mindset\t\tAgents will use the video and powerpoint provided",
    learndesc2:
      "Discussion on digital marketing skills and exploring the different people skills Video and powerpoint will be used",
    learndesc3:
      "Tackling collaborative skills, networking skills and Public Speaking 101 Agents will use the video and powerpoint provided",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/q96V3ZXP2I0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "leadership.pdf",
    dateadded: null,
  },
  {
    id: "7",
    cname: "Boosting your Rental Sales",
    description: "Your opportunity to the future of Real Estate",
    speaker: "Anthony Leuterio",
    spimg: "ANTHONY GERARD LEUTERIO.png",
    spcontact: "123456789",
    learndesc: "Understanding the different aspects of property management Video and powerpoint will be used",
    learndesc2:
      "Insights and support facilities in a residential property management Agents will use the video and powerpoint provided",
    learndesc3:
      "Why quality management tools in facilities matter \tOnline Quiz: Best Practices in Real Estate, Rent Management and Property Management",
    video:
      '<iframe width="990px" height="558px" src="https://filipinohomes123.s3.ap-southeast-1.amazonaws.com/uploads/Boosting_Your_Rental_Sales.mp4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "rent.pdf",
    dateadded: null,
  },
  {
    id: "8",
    cname: "Branding Building and Why it Matters in the New Normal",
    description:
      "This course will aid you in understanding and developing how building and improving one's personality traits plays an important role for you and your team especially in building a brand. Branding gives you an identity which will help you in your career. This will also aid in adapting to the new normal, which is making a brand for you on social media. Moreover, learning when to post and when not to is vital especially with contents and strategic postings. By the end of this course, you will have a better understanding on how taxation and TRAIN Law works and how vital it is in the industry. ",
    speaker: "George Ryan Sarmago",
    spimg: "GEORGE RYAN SARMAGO.png",
    spcontact: "123456789",
    learndesc:
      "Discussion of the functions of branding and the difference between selling and branding \t\t\tAgents will use the video and powerpoint provided",
    learndesc2:
      "Identifying and understanding brand crisis and branding the Filipinohomes way Video and powerpoint will be used",
    learndesc3:
      "Strategic postings (what and what not to post) and 7 strategies in building a brand during ECQ Agents will use the video and powerpoint provided",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/x8I1ck0MjTI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "branding.pdf",
    dateadded: null,
  },
  {
    id: "9",
    cname: "Ignite Your Social Media Marketing",
    description:
      "At present, our lives are linked to social media and it has also become a part of our lives. During this course, entitled Ignite Your Social Media Marketing, it will show you how social media plays a vital role in sales in the real estate industry especially during a worldwide pandemic. . This will include a brief discussion on sales, listings and the effectiveness of your posts to your viewers. An aspect on using social media such as videos and postings will also be discussed which will be supported by real life sales and how it is possible to make the most of marketing through social media platforms.An assessment will be done through an online quiz and an end of module assignment. ",
    speaker: "Marc Godornes",
    spimg: "MARC CHRISTIAN GODORNES.png",
    spcontact: "123456789",
    learndesc: "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used",
    learndesc2:
      "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used",
    learndesc3:
      "Insights on the types of videos and the shift in the market during quarantine Agents will use the video and powerpoint provided",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/wZdcSuJ-f1g" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "ignite.pdf",
    dateadded: null,
  },
  {
    id: "10",
    cname: "Supercharge your FACEBOOK Marketing in 2020",
    description:
      "Nowadays, we use the platform of Facebook for numerous things and one of these includes promoting your units. This course will teach you how to market yourself better and effectively on Facebook. Your understanding of this subject will be through an assessment as an online quiz and an end of module assignment.",
    speaker: "Gilbert Monecillo",
    spimg: "GILBERT MONECILLO.png",
    spcontact: "123456789",
    learndesc:
      "Discussing ECQ and how social media marketing can be used as a marketing Platform Agents will use the video and powerpoint provided",
    learndesc2:
      "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used",
    learndesc3:
      "Insights on the types of videos and the shift in the market during quarantine Agents will use the video and powerpoint provided",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/sg2T0bz71Ks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "Supercharge.pdf",
    dateadded: null,
  },
  {
    id: "11",
    cname: "Real Property Taxation under RA7160",
    description:
      "This will help you understand the real property taxation based on the local government code of 1991. This will cover property tax, business tax, professional tax, amusement tax and other fees and charges.",
    speaker: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA",
    spimg: "ATTY. WALFRIDO LOMONSOD ALCANTARA, REB, REA.png",
    spcontact: "123456789",
    learndesc:
      "Discussing ECQ and how social media marketing can be used as a marketing Platform Agents will use the video and powerpoint provided",
    learndesc2:
      "Why Boosting posts and posting stories are essential in making sales Video and powerpoint will be used",
    learndesc3:
      "Insights on the types of videos and the shift in the market during quarantine Agents will use the video and powerpoint provided",
    video:
      '<iframe width="1000px" height="720px" src="https://www.youtube.com/embed/f4e1lT32wOo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    presentation: "",
    dateadded: null,
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
    <div className="min-h-screen bg-primary-white">
      <Header />
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-dark-blue-light via-primary-dark-blue to-primary-dark-blue-dark text-primary-white py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-primary-yellow/20 text-primary-yellow border-primary-yellow/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  🏆 Award-Winning Training Institute
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Welcome to <span className="text-primary-yellow">FIRE</span>
                </h1>
                <p className="text-base sm:text-xl text-blue-100 leading-relaxed max-w-lg">
                  Exclusive training platform for Filipino Homes and Rent.ph agents. Access comprehensive real estate
                  courses designed to enhance your professional skills and career growth.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-primary-yellow hover:bg-primary-yellow-dark text-primary-dark-blue font-semibold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg shadow-xl"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = "/documents/agent-endorsement-letter.pdf"
                    link.download = "Agent-Endorsement-Letter.pdf"
                    link.click()
                  }}
                >
                  <BookOpen className="w-4 h-4 sm:w-5 h-5 mr-2" />
                  Download Agent Endorsement Letter
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2 sm:pt-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">35,000+</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Real Estate Agents Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">500+</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Industry Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold">95%</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <video controls className="w-full h-auto rounded-lg shadow-xl" poster="/images/video-thumbnail.png">
                <source src="https://realestatetraining.ph/video/homepage.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center p-6 sm:p-8 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-dark-blue-light to-primary-dark-blue rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="w-7 h-7 sm:w-8 h-8 text-primary-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-primary-dark-blue">
                Brokerage Essentials
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Master the art of real estate brokerage, from client acquisition to closing deals.
              </p>
            </Card>

            <Card className="text-center p-6 sm:p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-7 h-7 sm:w-8 h-8 text-primary-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-primary-dark-blue">Rental Management</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Learn effective strategies for managing rental properties and tenant relationships.
              </p>
            </Card>

            <Card className="text-center p-6 sm:p-8 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="w-7 h-7 sm:w-8 h-8 text-primary-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-primary-dark-blue">Investment Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Develop skills to analyze and maximize real estate investment opportunities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-12 sm:py-20 bg-primary-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-16">
            <Badge className="bg-blue-100 text-primary-dark-blue px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm">
              Comprehensive Training Program
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark-blue mb-3 sm:mb-6">Our Training Modules</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Master the skills you need to succeed in the Philippine real estate industry with our expert-led training
              modules.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {modules.map((module) => (
              <Card
                key={module.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-primary-white to-gray-50 p-4 sm:p-0"
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <Badge variant="secondary" className="bg-blue-100 text-primary-dark-blue text-xs sm:text-sm">
                      Module {module.id}
                    </Badge>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 sm:w-3 h-3 fill-primary-yellow text-primary-yellow" />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary-dark-blue-light transition-colors">
                    {module.cname}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{module.description}</p>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                    <Users className="w-3.5 h-3.5 sm:w-4 h-4" />
                    <span className="truncate font-medium">{module.speaker}</span>
                  </div>
                  <Button
                    onClick={() => handleViewModule(module)}
                    className="w-full bg-gradient-to-r from-primary-dark-blue-light to-primary-dark-blue hover:from-primary-dark-blue hover:to-primary-dark-blue-dark group-hover:shadow-lg transition-all text-sm sm:text-base py-2 sm:py-2.5"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 h-4 mr-1.5 sm:mr-2" />
                    View Module
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Anthony Leuterio Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/sir-ton.png"
                alt="Anthony Gerard Leuterio"
                width={400}
                height={480}
                className="relative rounded-xl sm:rounded-2xl w-full h-auto shadow-xl"
              />
            </div>
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-primary-yellow/20 text-primary-yellow border-primary-yellow/30 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                  🏆 2024 International Realtor of the Year
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark-blue">
                  Anthony Gerard "Tonton" Leuterio
                </h2>
                <p className="text-xl sm:text-2xl text-primary-dark-blue-light font-semibold">Founder & CEO</p>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-700">
                <p className="text-base sm:text-lg leading-relaxed">
                  Named by the U.S.-based National Association of Realtors (NAR), acknowledging his leadership in
                  ethical practices and global real estate excellence.
                </p>

                <p className="leading-relaxed text-sm sm:text-base">
                  Anthony Gerard Leuterio is a celebrated Filipino real estate entrepreneur, best known as the Founder &
                  CEO of Filipino Homes, Leuterio Realty & Brokerage, and Rent.ph. With a Bachelor's in Computer Science
                  from the University of San Jose–Recoletos and further studies at Harvard Business School Online, his
                  blend of tech-savvy and business acumen has transformed real estate in the Philippines.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-md">
                    <h4 className="font-bold text-primary-dark-blue mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                      🏢 Filipino Homes
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Founded in 2008, grown to ~100 offices and over 11,000 licensed agents nationally.
                    </p>
                  </Card>
                  <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-md">
                    <h4 className="font-bold text-primary-dark-blue mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                      🏠 Rent.ph
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Launched in 2012, now the largest rental platform in the country.
                    </p>
                  </Card>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-r from-primary-yellow/10 to-primary-yellow/20 rounded-xl border border-primary-yellow/30 shadow-md">
                  <h4 className="font-bold text-primary-dark-blue mb-1.5 sm:mb-2 text-base sm:text-lg">
                    Leadership Philosophy
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700">
                    Emphasizes client-first principles, stressing responsible dealings, protecting investments, and
                    lifelong client support. Believes in uplifting people—from clients to agents—through training,
                    ethics, and family-style mentorship.
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 h-6 fill-primary-yellow text-primary-yellow" />
                    ))}
                  </div>
                  <span className="font-bold text-base sm:text-lg text-primary-dark-blue">500+ Industry Awards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-dark-blue-light via-primary-dark-blue to-primary-dark-blue-dark text-primary-white py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <Badge className="bg-primary-yellow/20 text-primary-yellow border-primary-yellow/30 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg">
              🚀 Start Your Journey Today
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join FIRE today and take the first step towards a successful career in real estate! Get access to expert
              training, industry insights, and professional certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-primary-yellow hover:bg-primary-yellow-dark text-primary-dark-blue font-semibold px-8 py-3 sm:px-12 sm:py-4 text-base sm:text-lg shadow-xl"
                >
                  <Award className="w-4 h-4 sm:w-5 h-5 mr-2" />
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
