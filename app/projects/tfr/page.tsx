"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ExternalLink, BarChart3, Database, Code, Users, Truck, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import Image from 'next/image'

export default function TFRProjectPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Parallax effects
  const heroImageY = useTransform(smoothProgress, [0, 0.2], [0, -100])
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])

  // Stats counter animation
  const [animateStats, setAnimateStats] = useState(false)
  const { scrollYProgress: statsScrollProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    const unsubscribe = statsScrollProgress.onChange((v) => {
      if (v > 0.1 && !animateStats) {
        setAnimateStats(true)
      }
    })

    return () => unsubscribe()
  }, [statsScrollProgress, animateStats])

  // Handle scroll for hero visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsHeroVisible(false)
      } else {
        setIsHeroVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const projectImages = ["/tfr-architecture.png", "/tfr-workflow.png", "/tfr-interface.png"]
  const projectImageTitles = ["TFR Data Architecture", "TFR Workflow Diagram", "TFR User Interface"]
  const projectImageDescriptions = [
    "The TFR data architecture shows the complete flow from Primarius (the operational front-end) through our ETL layer to PostgreSQL and finally to Tableau for visualization. This architecture enabled real-time data processing and reporting for Second Harvest Food Bank's distribution network.",
    "Our workflow diagram illustrates how data moves from input screens through the PostgreSQL database and Python middleware to scheduled tasks and auto-loading dashboards. This system automated previously manual processes, saving hundreds of staff hours monthly.",
    "The TFR user interface provides an intuitive management system for Second Harvest Food Bank staff to track drivers, tickets, agencies, and distributions. The clean, responsive design ensures accessibility for all staff members regardless of technical expertise.",
  ]

  const technologies = [
    "Blockchain",
    "AI",
    "Data Analytics",
    "PostgreSQL",
    "ETL",
    "Dashboard Design",
    "Supply Chain",
    "Nonprofit",
    "STEM Product Development/Management",
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  // Counter animation for stats
  const Counter = ({
    end,
    duration = 2,
    label,
    prefix = "",
    suffix = "",
  }: { end: number; duration?: number; label: string; prefix?: string; suffix?: string }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!animateStats) return

      let startTime: number
      let animationFrameId: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step)
        }
      }

      animationFrameId = requestAnimationFrame(step)

      return () => cancelAnimationFrame(animationFrameId)
    }, [animateStats, end, duration])

    return (
      <div className="text-center">
        <h3 className="text-5xl font-bold mb-2 text-white">
          <span className="text-[#e67e22]">{prefix}</span>
          {count}
          <span className="text-[#e67e22]">{suffix}</span>
        </h3>
        <p className="text-gray-300">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-200 to-white text-gray-900 font-sans">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-orange-700 hover:text-black mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-orange-600 drop-shadow-lg">
            Tally Food Rescue – Data Management
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6">
            Automated logistics and real-time analytics for Second Harvest Food Bank, empowering nonprofits with data-driven impact.
          </p>
        </div>

        {/* Interactive Image Carousel Showcase */}
        <div className="flex flex-col items-center mb-16">
          <div className="rounded-3xl shadow-2xl border-4 border-orange-400 bg-white p-4 max-w-4xl mx-auto relative">
            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mb-4">
              {[
                { src: "/tfr-architecture.png", label: "Architecture" },
                { src: "/Screenshot 2025-05-27 at 6.57.20 PM.png", label: "Dashboard" },
                { src: "/tfr-interface.png", label: "Interface" },
                { src: "/tfr-logo.png", label: "Logo" },
              ].map((img, idx) => (
                <button
                  key={img.label}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${currentImageIndex === idx ? 'bg-orange-400 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}`}
                >
                  {img.label}
                </button>
              ))}
            </div>
            {/* Carousel Image */}
            <Image
              src={[
                "/tfr-architecture.png",
                "/Screenshot 2025-05-27 at 6.57.20 PM.png",
                "/tfr-interface.png",
                "/tfr-logo.png",
              ][currentImageIndex]}
              alt={[
                "Tally Food Rescue Architecture",
                "Tally Food Rescue Dashboard",
                "Tally Food Rescue Interface",
                "Tally Food Rescue Logo",
              ][currentImageIndex]}
              width={currentImageIndex === 3 ? 400 : 1200}
              height={currentImageIndex === 3 ? 400 : 700}
              className="rounded-2xl mx-auto"
              priority
            />
            <div className="absolute -inset-2 rounded-3xl border-4 border-orange-300 animate-pulse opacity-30 pointer-events-none" />
            <div className="text-center text-sm text-gray-600 mt-4 font-medium">
              {[
                "System architecture for real-time data and automation",
                "Live platform dashboard built for Second Harvest Food Bank",
                "User interface for managing drivers, tickets, and agencies",
                "Tally Food Rescue Logo",
              ][currentImageIndex]}
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <BarChart3 className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">Real-Time Analytics</h3>
            <p className="text-sm text-gray-700 text-center">Live dashboards for drivers, tickets, agencies, and distributions.</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <Zap className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">Automated Logistics</h3>
            <p className="text-sm text-gray-700 text-center">Automated ticketing and distribution tracking, saving staff hours.</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <Users className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">Nonprofit Impact</h3>
            <p className="text-sm text-gray-700 text-center">Empowering food banks to serve more people, more efficiently.</p>
          </div>
        </div>

        {/* My Role */}
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="text-2xl font-bold mb-2 text-orange-700">My Role</h2>
          <p className="text-lg text-gray-800">
            I led the Tally Food Rescue project from whiteboard concept to white-glove deployment—designing, building, and launching a full-stack data platform for Second Harvest Food Bank. I sat down with clients to deeply understand their pain points, ensuring the solution addressed real operational challenges. My work spanned requirements gathering, system architecture, UI/UX design, backend automation, and hands-on training for nonprofit staff, ensuring a seamless transition from idea to impactful, real-world solution.
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">Next.js</span>
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">React</span>
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">PostgreSQL</span>
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">ETL</span>
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">Data Analytics</span>
          <span className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">Tableau</span>
        </div>
      </div>
    </div>
  )
}
