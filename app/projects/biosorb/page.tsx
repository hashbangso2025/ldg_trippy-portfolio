"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Bone, PlayCircle, Quote, HeartPulse, Sparkles, Users, Star, Rocket, Award, TrendingUp, Zap, Globe, CheckCircle, Activity, Stethoscope, Cross, Target } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: "Biomechanical modeling and degradation visualization enhance preoperative planning and patient education.",
    author: ""
  },
  {
    quote: "Real-time osseointegration monitoring provides valuable insights for optimizing rehabilitation protocols.",
    author: ""
  },
  {
    quote: "Correlating implant resorption kinetics with tissue healing phases represents a significant clinical advancement.",
    author: ""
  }
]

const valueProps = [
  { icon: <Bone className="w-8 h-8 text-pink-500" />, title: "Osseointegration", desc: "Bioabsorbable polymers eliminate stress shielding while facilitating natural bone healing and load transfer." },
  { icon: <Target className="w-8 h-8 text-yellow-400" />, title: "Surgical Planning", desc: "3D modeling with degradation timelines for precise preoperative planning and patient counseling." },
  { icon: <Activity className="w-8 h-8 text-blue-500" />, title: "Clinical Monitoring", desc: "Standardized outcome tracking with radiographic assessment protocols for healing progression." },
  { icon: <Stethoscope className="w-8 h-8 text-teal-500" />, title: "Biomaterial Science", desc: "Controlled polymer chemistry with predictable resorption kinetics and mechanical properties." },
]

const achievements = [
  { icon: <Award className="w-6 h-6 text-gold-500" />, title: "FDA Breakthrough", desc: "Device Pathway Status" },
  { icon: <TrendingUp className="w-6 h-6 text-green-500" />, title: "Clinical Success", desc: "95%+ Patient Satisfaction" },
  { icon: <Globe className="w-6 h-6 text-blue-500" />, title: "Global Impact", desc: "12+ Countries" },
  { icon: <CheckCircle className="w-6 h-6 text-emerald-500" />, title: "Proven Technology", desc: "5,000+ Procedures" },
]

export default function BioSorbProject() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Enhanced parallax and mouse tracking
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Intersection observer for animations
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    
    if (heroRef.current) observer.observe(heroRef.current)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  // Auto-advance testimonials with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden font-sans text-rendering-fix">
      {/* Ultra-enhanced animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-full h-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 animate-gradient-shift"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          />
        </div>
        
        {/* Enhanced floating particles with mouse interaction */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-particle-enhanced"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${12 + Math.random() * 8}s`,
                transform: `translate(${mousePosition.x * (0.01 + Math.random() * 0.02)}px, ${mousePosition.y * (0.01 + Math.random() * 0.02)}px)`
              }}
            >
              <div className={`w-${Math.random() > 0.5 ? '1' : '2'} h-${Math.random() > 0.5 ? '1' : '2'} bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full blur-sm`} />
            </div>
          ))}
        </div>
        
        {/* Morphing gradient orbs with 3D effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full blur-3xl animate-morph-slow"
          style={{ 
            left: '5%', 
            top: '15%',
            transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.x * 0.05}px) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-morph-slow"
          style={{ 
            right: '5%', 
            top: '50%',
            transform: `translateY(${scrollY * -0.2}px) translateX(${mousePosition.x * -0.03}px) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-teal-500/35 to-emerald-500/35 rounded-full blur-3xl animate-morph-slow"
          style={{ 
            left: '60%', 
            bottom: '10%',
            transform: `translateY(${scrollY * 0.1}px) translateX(${mousePosition.x * 0.02}px) rotateZ(${mousePosition.x * 0.05}deg)`,
            animationDelay: '4s'
          }}
        />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-grid-pattern animate-grid-flow" />
        </div>
      </div>

      {/* Interactive cursor follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1.5 : 1})`
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Ultra-enhanced back button */}
        <Link 
          href="/"
          className="group inline-flex items-center text-blue-300 hover:text-white mb-8 transition-all duration-500 transform hover:scale-105"
        >
          <div className="relative overflow-hidden rounded-full p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-400/30 group-hover:border-cyan-400/50 transition-all duration-500">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="ml-3 relative">
            Back to Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500"></span>
          </span>
        </Link>

        {/* Ultra-premium Hero Section */}
        <div ref={heroRef} className="max-w-5xl mx-auto text-center mb-40 relative">
          {/* Floating orthopedic elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 opacity-20 animate-float-around">
              <Bone className="w-12 h-12 text-cyan-400" />
            </div>
            <div className="absolute top-40 right-20 opacity-15 animate-float-around" style={{ animationDelay: '2s' }}>
              <Cross className="w-10 h-10 text-blue-400" />
            </div>
            <div className="absolute bottom-40 left-20 opacity-20 animate-float-around" style={{ animationDelay: '4s' }}>
              <Activity className="w-8 h-8 text-teal-400" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-15 animate-float-around" style={{ animationDelay: '6s' }}>
              <Target className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" />
            <span className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 font-semibold text-sm uppercase tracking-wider animate-fade-in-up shadow-2xl">
              <ShieldCheck className="w-6 h-6 text-cyan-400 animate-pulse" /> 
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                Made for Surgeons
              </span>
            </span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black mb-12 tracking-tight animate-fade-in-up delay-200 relative leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent animate-gradient-x-enhanced drop-shadow-2xl relative z-10 block">
              BioSorb
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-cyan-300/20 to-teal-300/20 blur-3xl animate-pulse-slow -z-10" />
          </h1>
          
          <p className="text-3xl md:text-4xl text-blue-100 mb-16 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-400 relative">
            <span className="relative block">
              Bioabsorbable <span className="text-cyan-300 font-semibold bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">orthopedic implants</span> with interactive simulations and clinical monitoring for superior outcomes.
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-lg blur-xl -z-10" />
            </span>
          </p>

          {/* Simple hero image */}
          <div className="relative w-full max-w-2xl mx-auto h-[500px] md:h-[600px] animate-fade-in-up delay-600">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-300/30 bg-gradient-to-br from-slate-800/90 to-slate-900/90">
              {/* Phone Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src="/biosorb-screenshot.png"
                  alt="BioSorb Advanced Interface - Mobile App Screenshot"
                  width={350}
                  height={600}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Section - Moved to top */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-md rounded-3xl p-20 shadow-2xl border-2 border-blue-400/30 text-center animate-fade-in-up group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-3xl group-hover:from-blue-500/20 group-hover:to-teal-500/20 transition-all duration-700" />
            
            {/* Floating orthopedic elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 animate-float-around">
                <Bone className="w-8 h-8 text-blue-400" />
              </div>
              <div className="absolute top-20 right-10 animate-float-around" style={{ animationDelay: '2s' }}>
                <Activity className="w-6 h-6 text-teal-400" />
              </div>
              <div className="absolute bottom-20 left-20 animate-float-around" style={{ animationDelay: '4s' }}>
                <Stethoscope className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="absolute bottom-10 right-20 animate-float-around" style={{ animationDelay: '6s' }}>
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-teal-500/30 rounded-full blur-2xl animate-pulse-glow" />
                <div className="relative w-28 h-28 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-700 shadow-2xl">
                  <div className="relative">
                    <Bone className="w-14 h-14 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                      <Cross className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/50 to-cyan-500/50 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
              
              <div className="mb-6">
                <span className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 font-semibold text-lg uppercase tracking-wider shadow-lg">
                  My Purpose
                </span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-blue-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent relative leading-tight">
                <span className="block relative z-10">
                  Mission Statement
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 via-teal-300/30 to-cyan-300/30 blur-2xl animate-pulse-slow -z-10" />
              </h2>
              
              <div className="relative">
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto group-hover:text-blue-100 transition-colors duration-500">
                  <span className="relative block">
                    "Educating surgeons and patients on advanced bioabsorbable orthopedic solutions for better patient outcomes."
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-lg blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </span>
                </p>
              </div>
              
              {/* Patient-focused visual elements */}
              <div className="mt-12 flex justify-center items-center gap-8 opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-2 text-blue-300">
                  <Bone className="w-5 h-5" />
                  <span className="text-sm font-medium">Bone Health</span>
                </div>
                <div className="flex items-center gap-2 text-teal-300">
                  <Activity className="w-5 h-5" />
                  <span className="text-sm font-medium">Recovery Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-300">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Precision Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-enhanced Why BioSorb Section */}
        <div className="max-w-7xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent animate-fade-in-up relative leading-tight">
              <span className="block relative z-10">
                Why BioSorb?
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/20 via-cyan-300/20 to-teal-300/20 blur-2xl animate-pulse-slow -z-10" />
            </h2>
            <p className="text-2xl text-blue-200 text-center mb-20 max-w-4xl mx-auto animate-fade-in-up delay-200 relative leading-relaxed">
              Advanced bioabsorbable technology for superior patient outcomes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {valueProps.map((v, i) => (
                <div 
                  key={i} 
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-cyan-400/50 transition-all duration-700 hover:scale-105 hover:shadow-2xl animate-fade-in-up transform-gpu perspective-1000"
                  style={{ 
                    animationDelay: `${i * 200}ms`,
                    transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotateX(5deg) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.01}deg) scale(1.05)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-8">
                      <div className="relative p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">{v.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-500">{v.title}</h3>
                        <p className="text-blue-100 text-xl leading-relaxed group-hover:text-white transition-colors duration-500">{v.desc}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-teal-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-border-flow" style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-gradient-to-br from-slate-900/90 to-blue-900/90 rounded-3xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ultra-premium Implant Types Showcase */}
        <div className="max-w-8xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 bg-clip-text text-transparent animate-fade-in-up relative leading-tight">
              <span className="block relative z-10">
                Implant Types
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/20 via-pink-300/20 to-rose-300/20 blur-2xl animate-pulse-slow -z-10" />
            </h2>
            <p className="text-2xl text-blue-200 text-center mb-20 max-w-4xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
              Precision-engineered solutions for every orthopedic challenge
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'PLGA', color: 'from-cyan-500 to-blue-500', img: '/Bioabsorbable Shoulder Implant Fig 1.jpg', joint: 'Shoulder', tip: 'Poly(lactic-co-glycolic acid) for soft tissue fixation' },
                { label: 'HA/TCP', color: 'from-gray-400 to-slate-600', img: '/Knee Implant X Ray.jpeg', joint: 'Knee', tip: 'Hydroxyapatite/TCP composite for subchondral support' },
                { label: 'Mg Alloy', color: 'from-blue-500 to-indigo-600', img: '/Ankle Implant X-Ray Bioabsorbable.jpg', joint: 'Ankle', tip: 'Magnesium alloys with controlled corrosion rates' },
                { label: 'PLA/PGA', color: 'from-green-500 to-emerald-600', img: '/Wrist Implant X Ray.jpeg', joint: 'Wrist', tip: 'Copolymers for small bone reconstruction' },
              ].map((type, i) => (
                <div
                  key={type.joint}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-cyan-400/50 transition-all duration-700 hover:scale-110 hover:shadow-2xl animate-fade-in-up transform-gpu perspective-1000"
                  style={{ 
                    animationDelay: `${i * 200}ms`,
                    transform: `translateY(${scrollY * (0.01 + i * 0.005)}px)`
                  }}
                  onMouseEnter={() => setShowTooltip(type.joint)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <span className={`px-6 py-3 rounded-full text-white text-sm font-bold bg-gradient-to-r ${type.color} shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                        {type.label}
                      </span>
                    </div>
                    
                    <div className="relative mb-6 rounded-2xl overflow-hidden bg-white/10 p-6 group-hover:bg-white/20 transition-colors duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image 
                        src={type.img} 
                        alt={`${type.joint} Implant`} 
                        width={150} 
                        height={150} 
                        className="w-full h-40 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-cyan-300 transition-colors duration-500">{type.joint}</h3>
                    
                    {/* Ultra-enhanced tooltip */}
                    {showTooltip === type.joint && (
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white text-sm px-6 py-4 rounded-2xl shadow-2xl z-30 animate-tooltip-appear border border-cyan-400/30 backdrop-blur-md min-w-max">
                        <div className="text-center">
                          <div className="font-semibold mb-1 text-cyan-300">{type.tip}</div>
                          <div className="text-xs text-blue-200">Advanced biocompatible materials</div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900" />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg -z-10" />
                      </div>
                    )}
                  </div>
                  
                  {/* Floating particles around card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    {[...Array(6)].map((_, idx) => (
                      <div
                        key={idx}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-around"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${idx * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ultra-enhanced Chart Section */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/20 overflow-hidden animate-fade-in-up group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-700" />
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent relative leading-tight">
                <span className="block relative z-10">
                  Resorption Kinetics Analysis
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-300/20 to-emerald-300/20 blur-xl animate-pulse-slow -z-10" />
              </h2>
              <p className="text-blue-200 text-center mb-12 text-xl leading-relaxed">Tendon-Bone Interface Healing vs. Implant Degradation Timeline</p>
              
              <div className="w-full h-48 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
                
                {/* Orthopedic visual elements around chart */}
                <div className="absolute top-2 left-4 opacity-30">
                  <Bone className="w-6 h-6 text-teal-400" />
                </div>
                <div className="absolute top-2 right-4 opacity-30">
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="absolute bottom-2 left-8 opacity-25">
                  <Cross className="w-5 h-5 text-blue-400" />
                </div>
                <div className="absolute bottom-2 right-8 opacity-25">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                
                <svg viewBox="0 0 400 120" width="100%" height="120" className="drop-shadow-2xl relative z-10">
                  <defs>
                    <linearGradient id="healingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="degradationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  <path d="M0,60 Q60,45 120,60 Q180,75 240,60 Q300,45 400,80" fill="none" stroke="url(#healingGradient)" strokeWidth="5" className="animate-draw-enhanced" filter="url(#glow)" />
                  <path d="M0,80 Q100,35 200,80 Q300,120 400,60" fill="none" stroke="url(#degradationGradient)" strokeWidth="5" className="animate-draw-enhanced delay-500" filter="url(#glow)" />
                  
                  <circle cx="120" cy="60" r="8" fill="#3b82f6" className="animate-pulse-enhanced" filter="url(#glow)" />
                  <circle cx="300" cy="80" r="8" fill="#0891b2" className="animate-pulse-enhanced delay-300" filter="url(#glow)" />
                  
                  <text x="120" y="35" fontSize="16" fill="#60a5fa" fontWeight="bold" textAnchor="middle" className="animate-fade-in delay-1000">3 mo</text>
                  <text x="300" y="55" fontSize="16" fill="#22d3ee" fontWeight="bold" textAnchor="middle" className="animate-fade-in delay-1200">12 mo</text>
                </svg>
              </div>
              
              <div className="flex justify-between text-lg text-blue-300 mb-8 font-semibold">
                <span>0 months</span>
                <span>6 months</span>
                <span>12 months</span>
                <span>18 months</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { color: 'from-blue-500 to-cyan-500', title: 'Bioresorbable Polymers', desc: 'Controlled hydrolytic degradation' },
                  { color: 'from-teal-500 to-emerald-500', title: 'Osteoconductive Ceramics', desc: 'Bone ingrowth and remodeling' },
                  { color: 'from-gray-500 to-slate-500', title: 'Biodegradable Metals', desc: 'Load-bearing with gradual resorption' }
                ].map((item, i) => (
                  <div key={i} className="group flex items-center gap-4 bg-gradient-to-r from-white/10 to-white/5 px-6 py-4 rounded-2xl border border-white/20 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105">
                    <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${item.color} group-hover:scale-125 transition-transform duration-500 shadow-lg`}></span>
                    <div>
                      <div className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-500">{item.title}</div>
                      <div className="text-blue-200 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-premium Testimonial Carousel */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-5xl font-black text-center mb-20 bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-fade-in-up relative leading-tight">
              <span className="block relative z-10">
                What Surgeons Say
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 via-teal-300/20 to-cyan-300/20 blur-2xl animate-pulse-slow -z-10" />
            </h2>
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/20 animate-fade-in-up group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl group-hover:from-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-700" />
              
              {/* Floating quote marks */}
              <div className="absolute top-8 left-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <Quote className="w-16 h-16 text-emerald-400 transform -rotate-12" />
              </div>
              <div className="absolute bottom-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                <Quote className="w-16 h-16 text-teal-400 transform rotate-12 scale-x-[-1]" />
              </div>
              
              <div className="relative z-10">
                <Quote className="w-16 h-16 text-emerald-400 mb-8 mx-auto animate-pulse-enhanced" />
                
                <div className="relative mb-12 min-h-[160px] flex items-center justify-center">
                  <p className="text-3xl text-white italic font-light leading-relaxed max-w-4xl relative">
                    <span className="relative">
                      "{testimonials[testimonialIdx].quote}"
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </span>
                  </p>
                </div>
                
                <div className="mb-12">
                  {testimonials[testimonialIdx].author && (
                    <div className="text-emerald-200 text-xl font-semibold mb-2 relative">
                      <span className="relative">
                        — {testimonials[testimonialIdx].author}
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-lg blur-lg -z-10" />
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center items-center gap-6">
                  <button 
                    onClick={prevTestimonial} 
                    className="group/btn relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:scale-110 transition-all duration-500 shadow-2xl flex items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span className="relative text-2xl">‹</span>
                  </button>
                  
                  <div className="flex gap-3">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIdx(i)}
                        className={`relative w-4 h-4 rounded-full transition-all duration-500 overflow-hidden ${
                          i === testimonialIdx 
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-125 shadow-lg' 
                            : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                        }`}
                      >
                        {i === testimonialIdx && (
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 animate-pulse-glow" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    onClick={nextTestimonial} 
                    className="group/btn relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:scale-110 transition-all duration-500 shadow-2xl flex items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    <span className="relative text-2xl">›</span>
                  </button>
                </div>
              </div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-float-around"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: `${4 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ultra-enhanced Animations */}
      <style jsx global>{`
        @keyframes gradient-x-enhanced {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 200% 50%; }
          75% { background-position: 300% 50%; }
        }
        .animate-gradient-x-enhanced {
          background-size: 400% 400%;
          animation: gradient-x-enhanced 12s ease-in-out infinite;
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease-in-out infinite;
        }
        
        @keyframes morph-slow {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: scale(1) rotate(0deg);
          }
          25% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            transform: scale(1.1) rotate(90deg);
          }
          50% { 
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
            transform: scale(0.9) rotate(180deg);
          }
          75% { 
            border-radius: 60% 40% 60% 30% / 70% 30% 60% 40%;
            transform: scale(1.05) rotate(270deg);
          }
        }
        .animate-morph-slow {
          animation: morph-slow 20s ease-in-out infinite;
        }
        
        @keyframes float-particle-enhanced {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-30px) translateX(15px) scale(1.2);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-60px) translateX(-10px) scale(0.8);
            opacity: 0.6;
          }
          75% { 
            transform: translateY(-30px) translateX(-15px) scale(1.1);
            opacity: 0.9;
          }
        }
        .animate-float-particle-enhanced {
          animation: float-particle-enhanced 15s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(6, 182, 212, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(6, 182, 212, 0.6), 0 0 120px rgba(16, 185, 129, 0.4);
            transform: scale(1.02);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        @keyframes bounce-enhanced {
          0%, 100% { 
            transform: translateY(0) scale(1);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% { 
            transform: translateY(-25%) scale(1.05);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-bounce-enhanced {
          animation: bounce-enhanced 2s infinite;
        }
        
        @keyframes slide-in-left {
          0% { 
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out 2s both;
        }
        
        @keyframes slide-in-right {
          0% { 
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out 2.5s both;
        }
        
        @keyframes border-glow {
          0%, 100% { 
            border-color: rgba(59, 130, 246, 0.5);
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          25% { 
            border-color: rgba(6, 182, 212, 0.7);
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
          }
          50% { 
            border-color: rgba(16, 185, 129, 0.6);
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.4);
          }
          75% { 
            border-color: rgba(6, 182, 212, 0.7);
            box-shadow: 0 0 30px rgba(6, 182, 212, 0.5);
          }
        }
        .animate-border-glow {
          animation: border-glow 4s ease-in-out infinite;
        }
        
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-flow {
          background-size: 200% 200%;
          animation: border-flow 3s ease-in-out infinite;
        }
        
        @keyframes draw-enhanced {
          0% { 
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          10% { opacity: 1; }
          100% { 
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        .animate-draw-enhanced {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-enhanced 3s ease-out forwards;
        }
        .delay-500 { animation-delay: 0.5s; }
        
        @keyframes pulse-enhanced {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
        .animate-pulse-enhanced {
          animation: pulse-enhanced 2s ease-in-out infinite;
        }
        .delay-300 { animation-delay: 0.3s; }
        
        @keyframes tooltip-appear {
          0% { 
            transform: translateX(-50%) translateY(10px) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(-50%) translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-tooltip-appear {
          animation: tooltip-appear 0.3s ease-out;
        }
        
        @keyframes float-around {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translate(10px, -10px) scale(1.2);
            opacity: 1;
          }
          50% { 
            transform: translate(-5px, -20px) scale(0.8);
            opacity: 0.8;
          }
          75% { 
            transform: translate(-10px, -5px) scale(1.1);
            opacity: 0.9;
          }
        }
        .animate-float-around {
          animation: float-around 4s ease-in-out infinite;
        }
        
        @keyframes grid-flow {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-50px) translateY(-50px); }
        }
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
          transform: translateY(40px);
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1200 { animation-delay: 1.2s; }
        
        @keyframes fade-in-up {
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.1);
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }
        
        /* Text rendering fixes */
        .text-rendering-fix {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent text clipping */
        .no-clip {
          overflow: visible !important;
          contain: none !important;
        }
        
        /* Ensure proper z-index stacking */
        .text-layer {
          position: relative;
          z-index: 10;
        }
        
        /* Fix gradient text rendering */
        .gradient-text-fix {
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-attachment: fixed;
        }
      `}</style>
    </div>
  )
} 