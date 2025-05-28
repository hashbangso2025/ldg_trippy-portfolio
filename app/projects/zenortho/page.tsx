"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Globe,
  FileText,
  Calendar,
  Clock,
  Users,
  Award,
  Layers,
  Download,
  Upload,
  Check,
  AlertCircle,
  FileCheck,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import dynamic from 'next/dynamic'
import Image from 'next/image'
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })

export default function ZenOrthoProject() {
  const [mounted, setMounted] = useState(false)
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("usa")
  const [activePlan, setActivePlan] = useState("starter")
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const heroRef = useRef<HTMLDivElement>(null)
  const interfaceRef = useRef<HTMLDivElement>(null)
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

  // Features data
  const features = [
    {
      title: "Built for Global Compliance",
      description: "One-click compliance across global regulatory bodies with AI-validated documents and localization.",
      icon: <Globe className="w-6 h-6" />,
      image: "/placeholder-logo.png",
    },
    {
      title: "High-Touch Support",
      description:
        "Regulatory experts help you onboard, translate, and navigate submissions — faster, safer, and audit-ready.",
      icon: <Users className="w-6 h-6" />,
      image: "/placeholder-logo.png",
    },
    {
      title: "Customizable & Scalable",
      description:
        "Modular tools and AI dashboards that adapt to your needs — whether you're in Brazil, the U.S., or scaling globally.",
      icon: <Layers className="w-6 h-6" />,
      image: "/placeholder-logo.png",
    },
  ]

  // Plans data
  const plans = [
    {
      id: "starter",
      name: "Starter Plan",
      description: "Everything an emerging ortho company needs in one subscription",
      features: [
        "Launch-ready Go-to-Market tools: interactive world map, country drill-downs, and printable market-entry checklists for up to three regions.",
        "Reg-intel core: Data Hub (24-month regulatory & clinical data, post-market dashboards) + Ortho News Center with live recall ticker and country filter.",
        "All-in-one Document Workspace: FDA 510(k), CE Tech File & ANVISA templates, AIGC Auto-Fill, real-time multi-language translation, manual UDI registry, and Kanban-style project board.",
        "Built-in governance: role-based permissions, audit logs, CSV/XLS exports, e-mail support—15 named users included.",
      ],
      price: "US $1,950 / month (annual billing)",
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      description: "The full AI-powered compliance cockpit for global orthopedic leaders",
      features: [
        "Advanced AI automation: Workflow Copilot (task & timeline predictions), automated UDI 2.0 with DI/PI extraction + EUDAMED/GUDID push, semantic Standards Library with live change alerts, and AI daily briefing emails.",
        "Pro-grade data intelligence: recall-signal detection, adverse-event spike alerts, semantic clinical-trial finder, and AI market-entry risk scoring—directly inside Go-to-Market & Data Hub.",
        "Security & scale: unlimited users, OAuth 2.0/SAML SSO, ISO 13485 & 27001 controls, SOC 2 Type 2 report, 21 CFR Part 11 e-signatures, and anomaly-detection guardrails.",
        "Deep integrations: REST/GraphQL APIs, webhooks, PLM-/ERP-/QMS-ready connectors, and optional UDI e-submission gateway.",
      ],
      price: "Custom pricing (from ~US $6,500 / month)",
    },
  ]

  // Documents data
  const documents = [
    {
      name: "510(k)_Draft.pdf",
      country: "USA",
      date: "04/22/2025",
      status: "Ready for Review",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "ANVISA_IFU_PT.docx",
      country: "Brazil",
      date: "04/21/2025",
      status: "Pending Translation",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "UDI_Metadata.csv",
      country: "Global",
      date: "04/20/2025",
      status: "Processing",
      icon: <FileText className="w-5 h-5" />,
    },
  ]

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

  const handleTooltip = (content: string, e: React.MouseEvent) => {
    setTooltipContent(content)
    setTooltipPosition({ x: e.clientX, y: e.clientY })
    setShowTooltip(true)
  }

  const hideTooltip = () => {
    setShowTooltip(false)
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
          <span className="text-[#ffb300]">{prefix}</span>
          {count}
          <span className="text-[#ffb300]">{suffix}</span>
        </h3>
        <p className="text-gray-300">{label}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back button */}
          <Link
            href="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
          </Link>

        {/* Project Header */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-300">ZenOrtho - Orthodontic Practice Management</h1>
          
          {/* Project Image */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src="/zenortho-screenshot.png"
              alt="ZenOrtho Project Screenshot"
              fill
              className="object-cover"
            />
          </div>

          {/* Project Description */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                ZenOrtho is a comprehensive practice management system designed specifically for orthodontic clinics. The platform streamlines patient management, treatment planning, and appointment scheduling while providing powerful analytics and reporting tools for practice growth.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Key Features</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-300">
                <li>Intelligent appointment scheduling with automated reminders</li>
                <li>Digital treatment planning and progress tracking</li>
                <li>Patient portal for secure communication and document sharing</li>
                <li>Integrated billing and insurance management</li>
                <li>Advanced analytics dashboard for practice insights</li>
                <li>Mobile app for on-the-go access</li>
              </ul>
      </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-200">Technical Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-yellow-200">Frontend</h3>
                  <ul className="text-sm text-gray-300">
                    <li>React Native</li>
                    <li>Redux</li>
                    <li>Styled Components</li>
                    <li>TypeScript</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-yellow-200">Backend</h3>
                  <ul className="text-sm text-gray-300">
                    <li>Node.js</li>
                    <li>PostgreSQL</li>
                    <li>Redis</li>
                    <li>Docker</li>
                  </ul>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2 text-yellow-200">Cloud</h3>
                  <ul className="text-sm text-gray-300">
                    <li>AWS</li>
                    <li>Lambda</li>
                    <li>S3</li>
                    <li>CloudFront</li>
                  </ul>
                </div>
              </div>
      </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-yellow-200">My Role</h2>
              <p className="text-gray-300 leading-relaxed">
                As a full-stack developer, I contributed to both the web and mobile applications, focusing on the patient portal and appointment scheduling features. I implemented real-time notifications, secure document handling, and integrated third-party services for payment processing and insurance verification.
              </p>
            </section>
          </div>
            </div>
          </div>
    </div>
  )
}
