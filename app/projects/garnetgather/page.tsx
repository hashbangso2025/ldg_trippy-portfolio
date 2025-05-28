"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ArrowLeft, BarChart3, Database, Code, Users, Zap, BookOpen, Trophy, Sparkles } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'

// FSU brand colors
const colors = {
  garnet: "#782F40",
  gold: "#CEB888",
  black: "#111111",
}

export default function GarnetGatherProjectPage() {
  const [mounted, setMounted] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [animateStats, setAnimateStats] = useState(false)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Parallax effects
  const heroImageY = useTransform(smoothProgress, [0, 0.2], [0, -100])
  const heroTextY = useTransform(smoothProgress, [0, 0.2], [0, -50])
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0])

  // Stats counter animation
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

  const technologies = [
    "React",
    "Next.js",
    "NLP",
    "Data Analytics",
    "Community Platform",
    "User Experience Design",
  ]

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
          <span className="text-[#CEB888]">{prefix}</span>
          {count}
          <span className="text-[#CEB888]">{suffix}</span>
        </h3>
        <p className="text-white/80">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#782F40] via-[#782F40]/85 to-[#111111] text-white font-sans">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#CEB888]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#CEB888]/5 blur-3xl" />
        <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Back button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-[#CEB888] hover:text-white mb-8 transition-colors group"
        >
          <div className="p-2 rounded-full bg-[#782F40]/80 mr-2 group-hover:bg-[#782F40] transition-colors border border-[#CEB888]/20">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="relative">
            Back to Home
            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#CEB888] group-hover:w-full transition-all duration-300"></span>
          </span>
        </Link>

        {/* Hero Section */}
        <motion.div 
          ref={heroRef}
          className="max-w-4xl mx-auto text-center mb-24"
          style={{
            opacity: heroOpacity,
            y: heroTextY,
          }}
        >
          <Badge 
            className="mb-4 px-4 py-1.5 bg-[#CEB888]/20 text-[#CEB888] border-[#CEB888]/30 backdrop-blur-sm"
          >
            Florida State University Project
          </Badge>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
            <span className="relative inline-block">
              <span className="absolute -inset-1.5 blur-md bg-[#CEB888]/20 rounded-lg"></span>
              <span className="relative">GarnetGather</span>
            </span>{" "}
            <span className="text-[#CEB888]">AI</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-white/80 max-w-3xl mx-auto">
            A prototype community portal for Florida State University, built on React/Next.js, employing NLP to surface campus culture, athletics analytics, and archival content.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#782F40]/80 text-[#CEB888] border border-[#CEB888]/30 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Showcase */}
        <motion.div 
          className="flex justify-center mb-24"
          style={{
            y: heroImageY,
          }}
        >
          <div className="rounded-3xl shadow-2xl border-4 border-[#CEB888] bg-[#111111]/90 p-6 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute -inset-2 rounded-3xl border-4 border-[#CEB888]/40 animate-pulse opacity-20 pointer-events-none" />
            
            <div className="relative">
              {/* FSU header bar */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-[#782F40] rounded-t-lg flex items-center px-4 z-10 border-b border-[#CEB888]/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#CEB888]"></div>
                  <div className="w-3 h-3 rounded-full bg-white/50"></div>
                  <div className="w-3 h-3 rounded-full bg-white/50"></div>
                </div>
                <div className="text-white/90 text-xs absolute left-1/2 transform -translate-x-1/2">
                  GarnetGather AI Dashboard
                </div>
              </div>
              
              {/* Main image with frame effect */}
              <div className="pt-10 rounded-xl overflow-hidden">
                <Image
                  src="/garnetgather-screenshot.png"
                  alt="GarnetGather AI Platform Screenshot"
                  width={1200}
                  height={700}
                  className="rounded-b-xl mx-auto"
                  priority
                />
              </div>
              
              {/* Glare effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-xl"></div>
            </div>
            
            {/* Caption */}
            <div className="text-center text-[#CEB888] mt-6 font-medium">
              Prototype dashboard featuring real-time analytics and campus culture insights
            </div>
          </div>
        </motion.div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#111111]/30 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center border border-[#CEB888]/20 hover:border-[#CEB888]/40 transition-colors group">
            <div className="p-4 rounded-full bg-[#782F40] mb-4 group-hover:bg-[#782F40]/80 transition-colors ring-2 ring-[#CEB888]/20">
              <BarChart3 className="w-8 h-8 text-[#CEB888]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Real-Time Analytics</h3>
            <p className="text-center text-white/70">Live dashboards for campus culture and athletics analytics to track engagement and trends.</p>
          </div>
          
          <div className="bg-[#111111]/30 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center border border-[#CEB888]/20 hover:border-[#CEB888]/40 transition-colors group">
            <div className="p-4 rounded-full bg-[#782F40] mb-4 group-hover:bg-[#782F40]/80 transition-colors ring-2 ring-[#CEB888]/20">
              <BookOpen className="w-8 h-8 text-[#CEB888]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Knowledge Discovery</h3>
            <p className="text-center text-white/70">NLP-powered content analysis for surfacing valuable insights from campus resources.</p>
          </div>
          
          <div className="bg-[#111111]/30 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center border border-[#CEB888]/20 hover:border-[#CEB888]/40 transition-colors group">
            <div className="p-4 rounded-full bg-[#782F40] mb-4 group-hover:bg-[#782F40]/80 transition-colors ring-2 ring-[#CEB888]/20">
              <Trophy className="w-8 h-8 text-[#CEB888]" />
            </div>
            <h3 className="font-bold text-xl mb-3">Athletics Integration</h3>
            <p className="text-center text-white/70">Deep integration with FSU sports data providing team statistics and performance metrics.</p>
          </div>
        </div>

        {/* Stats Section */}
        <div 
          ref={statsRef}
          className="bg-[#782F40]/80 backdrop-blur-md rounded-2xl p-12 mb-24 border border-[#CEB888]/30 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Platform Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Counter end={15000} suffix="+" label="Campus Users" />
            <Counter end={200} suffix="+" label="Analytics Reports" />
            <Counter end={98} suffix="%" label="User Satisfaction" />
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm text-white/60 mb-2">
            DISCLAIMER: GarnetGather is NOT affiliated with Florida State University.
          </p>
          <h3 className="text-2xl font-bold mb-4 text-[#CEB888]">
            A Prototype Community Portal
          </h3>
          <p className="text-white/80 mb-6">
            This project showcases the application of modern web technologies and 
            natural language processing to create a dynamic platform for university communities.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="inline-block px-6 py-3 bg-[#782F40] text-[#CEB888] rounded-full font-medium border border-[#CEB888]/30">
              <Sparkles className="w-5 h-5 inline-block mr-2" />
              Prototype Project
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 