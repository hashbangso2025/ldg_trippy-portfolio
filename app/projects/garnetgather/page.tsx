"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight, Download, ExternalLink, BarChart3, Database, Code, Users, Truck, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import Image from 'next/image'

export default function GarnetGatherProjectPage() {
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

  const projectImages = ["/garnetgather-image.png", "/garnetgather-architecture.png", "/garnetgather-interface.png"]
  const projectImageTitles = ["GarnetGather AI", "GarnetGather Architecture", "GarnetGather Interface"]
  const projectImageDescriptions = [
    "GarnetGather AI is a prototype community portal for Florida State University, built on React/Next.js, employing NLP to surface campus culture, athletics analytics, and archival content.",
    "The architecture of GarnetGather AI showcases the integration of NLP and real-time data processing.",
    "The user interface of GarnetGather AI provides an intuitive experience for users to explore campus culture and analytics.",
  ]

  const technologies = [
    "React",
    "Next.js",
    "NLP",
    "Data Analytics",
    "Community Platform",
    "User Experience Design",
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
            GarnetGather AI
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6">
            A prototype community portal for Florida State University, built on React/Next.js, employing NLP to surface campus culture, athletics analytics, and archival content.
          </p>
        </div>

        {/* Screenshot Showcase */}
        <div className="flex justify-center mb-16">
          <div className="rounded-3xl shadow-2xl border-4 border-[#782F40] bg-white p-4 max-w-4xl mx-auto relative">
            <Image
              src="/garnetgather-screenshot.png"
              alt="GarnetGather AI Platform Screenshot"
              width={1200}
              height={700}
              className="rounded-2xl mx-auto"
              priority
            />
            <div className="absolute -inset-2 rounded-3xl border-4 border-[#782F40] animate-pulse opacity-20 pointer-events-none" />
            <div className="text-center text-sm text-gray-600 mt-4 font-medium">Prototype platform dashboard for GarnetGather AI</div>
          </div>
        </div>

        {/* Interactive Image Carousel Showcase */}
        <div className="flex flex-col items-center mb-16">
          <div className="rounded-3xl shadow-2xl border-4 border-orange-400 bg-white p-4 max-w-4xl mx-auto relative">
            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mb-4">
              {projectImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${currentImageIndex === idx ? 'bg-orange-400 text-white' : 'bg-orange-100 text-orange-800 hover:bg-orange-200'}`}
                >
                  {projectImageTitles[idx]}
                </button>
              ))}
            </div>
            {/* Carousel Image */}
            <Image
              src={projectImages[currentImageIndex]}
              alt={projectImageTitles[currentImageIndex]}
              width={1200}
              height={700}
              className="rounded-2xl mx-auto"
              priority
            />
            <div className="absolute -inset-2 rounded-3xl border-4 border-orange-300 animate-pulse opacity-30 pointer-events-none" />
            <div className="text-center text-sm text-gray-600 mt-4 font-medium">
              {projectImageDescriptions[currentImageIndex]}
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <BarChart3 className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">Real-Time Analytics</h3>
            <p className="text-sm text-gray-700 text-center">Live dashboards for campus culture and athletics analytics.</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <Zap className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">NLP Integration</h3>
            <p className="text-sm text-gray-700 text-center">Advanced natural language processing for content analysis.</p>
          </div>
          <div className="bg-orange-100 rounded-xl p-6 flex flex-col items-center shadow-md">
            <Users className="w-10 h-10 text-orange-500 mb-2" />
            <h3 className="font-bold text-lg mb-1">Community Impact</h3>
            <p className="text-sm text-gray-700 text-center">Empowering users to explore and engage with campus culture.</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-orange-200 text-orange-800 px-4 py-2 rounded-full font-semibold">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
} 