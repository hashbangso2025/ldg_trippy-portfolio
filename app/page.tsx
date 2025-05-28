"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { FaGithub, FaLinkedin, FaEnvelope, FaStrava, FaPlay } from "react-icons/fa"
import { PiSquaresFour } from "react-icons/pi"
import { GiMountainClimbing } from "react-icons/gi"
import { MoonIcon, SunIcon, Music } from "lucide-react"
import ProjectSection from "@/components/project-section"
import ActivitySection from "@/components/activity-section"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import MorphingLogo from "@/components/morphing-logo"
import LiquidButton from "@/components/liquid-button"
import FoilText from "@/components/foil-text"
import OrnateBorder from "@/components/ornate-border"
import GoldDivider from "@/components/gold-divider"
import LensFlare from "@/components/lens-flare"
import Image from "next/image"
import dynamic from 'next/dynamic'

// "ssr: false" means no server HTML, only render after hydration
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"), { ssr: false })

// Dynamically import client-only components
const MouseParticles = dynamic(() => import("@/components/mouse-particles"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
const TypewriterText = dynamic(() => import("@/components/typewriter-text"), { ssr: false })

interface Particle {
  left: string
  top: string
  duration: number
  delay: number
}

interface Sparkle {
  width: string
  height: string
  left: string
  top: string
  opacity: number
  duration: number
  delay: number
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [currentSong, setCurrentSong] = useState("Executive Focus")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [typewriterComplete, setTypewriterComplete] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true)
        audioRef.current.muted = false
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
    window.addEventListener("click", handleFirstClick)
    return () => window.removeEventListener("click", handleFirstClick)
  }, [hasInteracted])

  const handlePlayPause = () => {
    if (!audioRef.current) return
    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Ensure audio is loaded before playing
        if (audioRef.current.readyState >= 2) {
          audioRef.current.play()
          setIsPlaying(true)
        } else {
          // If audio isn't loaded yet, wait for it
          audioRef.current.load()
          audioRef.current.oncanplaythrough = () => {
            audioRef.current?.play()
            setIsPlaying(true)
          }
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
    }
  }

  // Add error handling for audio loading
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onerror = (e) => {
        console.error('Audio loading error:', e)
        setIsPlaying(false)
      }
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const handleTypewriterComplete = () => {
    setTypewriterComplete(true)
    setTimeout(() => {
      setShowSubtitle(true)
    }, 500)
  }

  // Generate all random values in a single useMemo to ensure consistency
  const randomValues = useMemo(() => {
    if (!mounted) {
      return {
        particles: [],
        sparkles: [],
        goldStars: [],
        lensFlares: []
      }
    }
    // Reduce particles and sparkles for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return {
      particles: Array.from({ length: isMobile ? 6 : 10 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
      sparkles: Array.from({ length: isMobile ? 3 : 6 }, () => ({
        width: `${8 + Math.random() * 8}px`,
        height: `${8 + Math.random() * 8}px`,
        left: `${40 + Math.random() * 20}%`,
        top: `${30 + Math.random() * 40}%`,
        opacity: 0.7 + Math.random() * 0.3,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
      goldStars: Array.from({ length: isMobile ? 10 : 20 }, () => ({
        width: 2 + Math.random() * 2,
        height: 2 + Math.random() * 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        opacity: 0.5 + Math.random() * 0.2,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
      })),
      lensFlares: Array.from({ length: 2 }, (_, i) => ({
        width: 32 + i * 12,
        height: 32 + i * 12,
        left: 20 + i * 30,
        top: 30 + i * 20,
        opacity: 0.08 + i * 0.03,
        duration: 4 + i,
        delay: i * 0.7,
      }))
    }
  }, [mounted])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Visual enhancements */}
      <ScrollProgress />
      <ScrollToTop />
      <MouseParticles />

      {/* Navigation - Embedded in hero section */}
      <nav className="absolute top-0 w-full z-30">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <a href="#" className="text-xl gold-text" style={{ fontFamily: "Butler, serif", fontWeight: 700 }}>
            <FoilText>EB</FoilText>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="hidden md:block hover:text-white gold-underline text-gray-200"
              style={{ fontFamily: "Neue Haas Grotesk, sans-serif", letterSpacing: "0.01em" }}
            >
              Projects
            </a>
            <a
              href="#activities"
              className="hidden md:block hover:text-white gold-underline text-gray-200"
              style={{ fontFamily: "Neue Haas Grotesk, sans-serif", letterSpacing: "0.01em" }}
            >
              Activities
            </a>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="hidden"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION ULTRA-LUXURIOUS */}
      <section className="relative min-h-screen marble-bg overflow-hidden">
        {/* Nebula, stars, lens flares background for hero section only */}
        <AnimatedBackground />
        <ScrollProgress />
        <ScrollToTop />
        <MouseParticles />

        {/* Luxury overlay with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/50 animate-gradient" />
        
        {/* Animated gold particles */}
        <div className="absolute inset-0 pointer-events-none">
          {randomValues.particles.map((particle: Particle, i: number) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Gold accent lines with enhanced glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.3)] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.3)] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.3)] to-transparent shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
        </div>

        {/* Floating gold orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300/10 to-yellow-100/5 blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Logo with refined luxury effects (no glow) */}
            <div className="mb-8 relative flex flex-col items-center">
              {/* Subtle gold reflection/halo under logo */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-t from-yellow-200/15 to-transparent rounded-full opacity-30" />
              <Image
                src="/evan-boudreau-logo.png"
                alt="Evan Boudreau Logo"
                width={200}
                height={200}
                className="mx-auto luxury-border rounded-lg relative z-10 transform hover:scale-105 transition-transform duration-300 shadow-none"
                priority
              />
            </div>

            {/* Description card with glassmorphism, gold border, and shadow */}
            <div className="luxury-border rounded-xl p-6 mb-8 backdrop-blur-md bg-black/40 relative overflow-hidden shadow-2xl" style={{boxShadow:'0 8px 32px 0 rgba(212,175,55,0.10), 0 1.5px 8px 0 rgba(0,0,0,0.18)'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/5 to-yellow-100/5 animate-gradient" />
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-4 sm:mb-6 foil-text relative z-10">
                {mounted ? (
                  <TypewriterText words={["Evan Boudreau"]} typingSpeed={70} className="text-yellow-300" />
                ) : (
                  <span>Evan Boudreau</span>
                )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-center text-gray-200 leading-relaxed relative z-10 font-light tracking-wide" style={{ fontFamily: "Neue Haas Grotesk, sans-serif", lineHeight: "1.8" }}>
              Evan is an innovator and Florida State University STEM Entrepreneurship scholar. He leverages scientific innovation to engineer valuable, viable, impactful solutions and enterprises for capital growth and sustainable value. He believes synergistic technical and business acumen drives innovation-enabling businesses, capital, and jobs for human-centered talent. He is seeking an internship to deploy his skills and drive results.
              </p>
            </div>

            {/* Social buttons with gold shimmer and 3D press effect */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8" style={{ fontFamily: "Neue Haas Grotesk, sans-serif" }}>
              <LiquidButton href="#projects" fillDirection="left" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <PiSquaresFour className="mr-2" /> <span className="tracking-wider font-medium">Projects</span>
              </LiquidButton>
              <LiquidButton href="#activities" fillDirection="right" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <GiMountainClimbing className="mr-2" /> <span className="tracking-wider font-medium">Activities</span>
              </LiquidButton>
              <LiquidButton href="mailto:ejb24f@fsu.edu" fillDirection="bottom" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <FaEnvelope className="mr-2" /> Email
              </LiquidButton>
              <LiquidButton href="http://www.linkedin.com/in/evanboudreau" fillDirection="bottom" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <FaLinkedin className="mr-2" /> LinkedIn
              </LiquidButton>
              <LiquidButton href="https://github.com/evan555555555555555" fillDirection="top" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <FaGithub className="mr-2" /> GitHub
              </LiquidButton>
              <LiquidButton href="https://www.strava.com/" fillDirection="right" className="luxury-border btn-3d w-full justify-center gold-shimmer hover:scale-95 transition-all duration-200">
                <FaStrava className="mr-2" /> Strava
              </LiquidButton>
            </div>

            {/* Music player with enhanced luxury effects */}
            <div className="luxury-border rounded-xl p-6 backdrop-blur-sm bg-black/30 relative overflow-hidden mb-8 flex items-center" style={{boxShadow:'none'}}>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-16 h-16 rounded-lg overflow-visible relative group flex items-center justify-center bg-black/40">
                  {/* Final Gold SVG Music Note with minimal glow */}
                  <motion.svg
                    viewBox="0 0 64 64"
                    width="56"
                    height="56"
                    fill="none"
                    className=""
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <defs>
                      <linearGradient id="gold-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fffbe6" />
                        <stop offset="30%" stopColor="#ffe066" />
                        <stop offset="60%" stopColor="#ffd700" />
                        <stop offset="100%" stopColor="#bfa43a" />
                      </linearGradient>
                      <radialGradient id="gold-highlight" cx="0.5" cy="0.3" r="0.7">
                        <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.9" />
                        <stop offset="80%" stopColor="#ffd700" stopOpacity="0.1" />
                      </radialGradient>
                    </defs>
                    <g>
                      {/* Very subtle gold halo */}
                      <ellipse cx="32" cy="56" rx="14" ry="6" fill="#ffd70022" opacity="0.12" />
                      <path d="M44 8v32.5a12 12 0 1 1-4-8.9V16h-8v24.5a12 12 0 1 1-4-8.9V8h16z" fill="url(#gold-gradient)" />
                      <path d="M44 8v32.5a12 12 0 1 1-4-8.9V16h-8v24.5a12 12 0 1 1-4-8.9V8h16z" fill="url(#gold-highlight)" opacity="0.7" />
                      <ellipse cx="20" cy="52" rx="8" ry="8" fill="url(#gold-gradient)" opacity="0.7" />
                      <ellipse cx="40" cy="52" rx="8" ry="8" fill="url(#gold-gradient)" opacity="0.5" />
                    </g>
                  </motion.svg>
                </div>
                <div className="space-y-1">
                  <h3 className="foil-text text-lg font-bold">Now Playing</h3>
                  <p className="text-gradient-gold text-sm font-light tracking-wide" style={{background: 'linear-gradient(90deg, #ffe066, #ffd700, #bfa43a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}> {currentSong}</p>
                </div>
              </div>
              <button 
                onClick={handlePlayPause}
                className="luxury-border btn-3d p-3 rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 group ml-auto relative z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 to-yellow-100/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 5.25v13.5m10.5-13.5v13.5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Image Section */}
      <div className="relative flex justify-center my-32">
        {/* Gold gradient/vignette background */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[110vw] h-[60vh] md:w-[80vw] md:h-[50vh] rounded-3xl bg-gradient-to-br from-yellow-100/60 via-yellow-200/40 to-yellow-50/0 blur-2xl opacity-80 shadow-2xl"></div>
        </div>
        {/* Animated gold sparkles */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
        >
          {randomValues.sparkles.map((sparkle: Sparkle, i: number) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-yellow-300 shadow-lg"
              style={{
                width: sparkle.width,
                height: sparkle.height,
                left: sparkle.left,
                top: sparkle.top,
                filter: 'blur(1px)',
                opacity: sparkle.opacity,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.7, 1, 0],
                scale: [0, 1.2, 1, 1.3, 0],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
              }}
            />
          ))}
        </motion.div>
        {/* Glowing gold border around the image */}
        <motion.div 
          className="relative z-20 p-2 rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-100 to-yellow-50 shadow-[0_0_60px_10px_rgba(212,175,55,0.25)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/think-big-quote.png"
            alt="You have to think anyway, so why not think big - Evan Boudreau"
            className="rounded-xl shadow-2xl max-w-full md:max-w-2xl border-4 border-yellow-300/80 bg-[#f9f6f1]"
            style={{ boxShadow: '0 0 40px 0 #d4af37cc, 0 8px 32px 0 #0002' }}
          />
        </motion.div>
      </div>

      <GoldDivider className="mx-auto my-12" width="80%" />

      {/* Projects Section */}
      <ProjectSection />

      <GoldDivider className="mx-auto my-12" width="80%" />

      {/* Activities Section */}
      <ActivitySection />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/Corporate Background Music For Videos - Inspirational Corporate Ambient by AShamaluevMusic.mp3"
        loop
        muted
        preload="auto"
        style={{ display: "none" }}
        onError={(e) => {
          console.error('Audio error:', e)
          setIsPlaying(false)
        }}
      />

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 relative z-10 marble-bg">
        <div className="container mx-auto px-4 text-center">
          <p
            className="text-gray-200 caption-text"
            style={{ fontFamily: "Neue Haas Grotesk, sans-serif", letterSpacing: "0.01em" }}
          >
            © {new Date().getFullYear()} Evan Boudreau. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a
              href="https://github.com/evan555555555555555"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-300 hover:text-[hsl(var(--gold))] transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="http://www.linkedin.com/in/evanboudreau"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-300 hover:text-[hsl(var(--gold))] transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:ejb24f@fsu.edu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="text-gray-300 hover:text-[hsl(var(--gold))] transition-colors"
            >
              <FaEnvelope className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
