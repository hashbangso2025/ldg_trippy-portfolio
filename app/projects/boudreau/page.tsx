"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Book, GraduationCap, PenTool, Users, Brain, Target, ChartBar, Award, TrendingUp, Star, Clock, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const testimonials = [
  {
    quote: "Personalized learning plans and adaptive teaching techniques significantly improved my academic performance.",
    author: ""
  },
  {
    quote: "The focused curriculum development and individualized attention made complex subjects much more approachable.",
    author: ""
  },
  {
    quote: "Comprehensive study strategies and personalized academic support helped me achieve my educational goals.",
    author: ""
  }
]

const valueProps = [
  { icon: <PenTool className="w-8 h-8 text-blue-500" />, title: "Personalized Curriculum", desc: "Customized learning plans tailored to each student's needs, learning style, and academic goals." },
  { icon: <Brain className="w-8 h-8 text-purple-500" />, title: "Adaptive Teaching", desc: "Flexible teaching methods that evolve based on student progress and comprehension levels." },
  { icon: <ChartBar className="w-8 h-8 text-green-500" />, title: "Progress Tracking", desc: "Regular assessments and detailed progress reports to measure academic improvement." },
  { icon: <GraduationCap className="w-8 h-8 text-amber-500" />, title: "Academic Excellence", desc: "Focus on developing strong foundational knowledge and advanced problem-solving skills." },
]

const achievements = [
  { icon: <Star className="w-6 h-6 text-yellow-400" />, title: "Student Success", desc: "95%+ Grade Improvement" },
  { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Growing Community", desc: "20-30 Active Students" },
  { icon: <Clock className="w-6 h-6 text-green-500" />, title: "Dedicated Support", desc: "1000+ Hours of Tutoring" },
  { icon: <TrendingUp className="w-6 h-6 text-red-500" />, title: "Business Growth", desc: "$30K+ Revenue" },
]

export default function BoudreauTutorsProject() {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
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

  const projectImages = ["/boudreau-image-1.jpg", "/boudreau-image-2.jpg", "/boudreau-image-3.jpg"]
  const projectImageTitles = ["Teaching Session", "Curriculum Development", "Student Success"]
  const projectImageDescriptions = [
    "Personalized one-on-one teaching sessions are the core of Boudreau Tutors' approach to academic excellence.",
    "Curriculum development is tailored to each student's learning style, academic goals, and areas for improvement.",
    "Student success is measured through regular assessments and demonstrated improvement in academic performance.",
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden font-sans text-rendering-fix">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dynamic gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 animate-gradient-shift"
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
              <div className={`w-${Math.random() > 0.5 ? '1' : '2'} h-${Math.random() > 0.5 ? '1' : '2'} bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full blur-sm`} />
            </div>
          ))}
        </div>
        
        {/* Morphing gradient orbs with 3D effect */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full blur-3xl animate-morph-slow"
          style={{ 
            left: '5%', 
            top: '15%',
            transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.x * 0.05}px) rotateX(${mousePosition.y * 0.1}deg)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-3xl animate-morph-slow"
          style={{ 
            right: '5%', 
            top: '50%',
            transform: `translateY(${scrollY * -0.2}px) translateX(${mousePosition.x * -0.03}px) rotateY(${mousePosition.x * 0.1}deg)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-indigo-500/35 to-blue-500/35 rounded-full blur-3xl animate-morph-slow"
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
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isVisible ? 1.5 : 1})`
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Enhanced back button */}
        <Link 
          href="/"
          className="group inline-flex items-center text-blue-300 hover:text-white mb-8 transition-all duration-500 transform hover:scale-105"
        >
          <div className="relative overflow-hidden rounded-full p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 group-hover:border-purple-400/50 transition-all duration-500">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="ml-3 relative">
            Back to Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500"></span>
          </span>
        </Link>

        {/* Premium Hero Section */}
        <div ref={heroRef} className="max-w-5xl mx-auto text-center mb-40 relative">
          {/* Floating education elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 opacity-20 animate-float-around">
              <Book className="w-12 h-12 text-blue-400" />
            </div>
            <div className="absolute top-40 right-20 opacity-15 animate-float-around" style={{ animationDelay: '2s' }}>
              <GraduationCap className="w-10 h-10 text-purple-400" />
            </div>
            <div className="absolute bottom-40 left-20 opacity-20 animate-float-around" style={{ animationDelay: '4s' }}>
              <PenTool className="w-8 h-8 text-amber-400" />
            </div>
            <div className="absolute bottom-20 right-10 opacity-15 animate-float-around" style={{ animationDelay: '6s' }}>
              <Target className="w-10 h-10 text-green-400" />
            </div>
          </div>
          
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-glow" />
            <span className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 font-semibold text-sm uppercase tracking-wider animate-fade-in-up shadow-2xl">
              <GraduationCap className="w-6 h-6 text-purple-400 animate-pulse" /> 
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black mb-12 tracking-tight animate-fade-in-up delay-200 relative leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-amber-300 bg-clip-text text-transparent animate-gradient-x-enhanced drop-shadow-2xl relative z-10 block">
              Boudreau Tutors
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-300/20 to-amber-300/20 blur-3xl animate-pulse-slow -z-10" />
          </h1>
          
          <p className="text-3xl md:text-4xl text-blue-100 mb-16 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-400 relative">
            <span className="relative block">
              Personalized <span className="text-purple-300 font-semibold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">academic excellence</span> through customized curricula and individualized learning plans.
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-xl -z-10" />
            </span>
          </p>

          {/* Hero image */}
          <div className="relative w-full max-w-2xl mx-auto h-[500px] md:h-[600px] animate-fade-in-up delay-600">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-300/30 bg-gradient-to-br from-slate-800/90 to-slate-900/90">
              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src="/tutor-image-main.jpeg"
                  alt="Boudreau Tutors - Logo and Branding"
                  width={400}
                  height={400}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement Section */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/15 to-white/10 backdrop-blur-md rounded-3xl p-20 shadow-2xl border-2 border-blue-400/30 text-center animate-fade-in-up group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-700" />
            
            {/* Floating education elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 animate-float-around">
                <Book className="w-8 h-8 text-blue-400" />
              </div>
              <div className="absolute top-20 right-10 animate-float-around" style={{ animationDelay: '2s' }}>
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div className="absolute bottom-20 left-20 animate-float-around" style={{ animationDelay: '4s' }}>
                <Target className="w-8 h-8 text-amber-400" />
              </div>
              <div className="absolute bottom-10 right-20 animate-float-around" style={{ animationDelay: '3s' }}>
                <GraduationCap className="w-6 h-6 text-green-400" />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 relative inline-block">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Our Mission</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h2>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto relative z-10">
              At Boudreau Tutors, we're dedicated to empowering students through personalized education. We design individualized curricula that address each student's unique learning style, academic goals, and potential areas for growth.
            </p>
            
            <div className="mt-10 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative p-6 bg-gradient-to-br from-blue-500/20 to-blue-400/5 rounded-xl border border-blue-300/30 text-left hover:from-blue-500/30 hover:to-blue-400/10 transition-all duration-300 hover:border-blue-300/50 hover:shadow-xl group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-all duration-300">
                    <Users className="w-8 h-8 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-blue-200">Personalized Learning</h3>
                    <p className="text-blue-100">We create tailored learning experiences that adapt to each student's pace, style, and goals for optimal academic growth.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative p-6 bg-gradient-to-br from-purple-500/20 to-purple-400/5 rounded-xl border border-purple-300/30 text-left hover:from-purple-500/30 hover:to-purple-400/10 transition-all duration-300 hover:border-purple-300/50 hover:shadow-xl group">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-all duration-300">
                    <ChartBar className="w-8 h-8 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-purple-200">Measurable Results</h3>
                    <p className="text-purple-100">We track progress systematically, focusing on consistent improvement and building academic confidence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Image Carousel Showcase */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-2 border-blue-400/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center relative inline-block mx-auto">
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Our Work</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h2>
            
            {/* Carousel Controls */}
            <div className="flex justify-center gap-4 mb-8">
              {projectImages.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${currentImageIndex === idx ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'bg-blue-500/20 text-blue-100 hover:bg-blue-500/30'}`}
                >
                  {projectImageTitles[idx]}
                </button>
              ))}
            </div>
            
            {/* Carousel Image */}
            <div className="relative w-full rounded-xl overflow-hidden border-2 border-blue-300/30 mb-6">
              <Image
                src={projectImages[currentImageIndex]}
                alt={projectImageTitles[currentImageIndex]}
                width={1200}
                height={700}
                className="w-full h-auto rounded-xl"
                priority
              />
              <div className="absolute inset-0 border-2 border-blue-300/20 rounded-xl"></div>
            </div>
            
            <div className="text-center text-lg text-blue-100 mt-4">
              {projectImageDescriptions[currentImageIndex]}
            </div>
            
            {/* Arrow Controls */}
            <div className="flex justify-between absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 pointer-events-none">
              <button 
                onClick={prevImage}
                className="p-2 rounded-full bg-gradient-to-r from-blue-500/70 to-purple-500/70 text-white shadow-lg hover:from-blue-600/70 hover:to-purple-600/70 transition-all duration-200 pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="p-2 rounded-full bg-gradient-to-r from-blue-500/70 to-purple-500/70 text-white shadow-lg hover:from-blue-600/70 hover:to-purple-600/70 transition-all duration-200 pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Value Propositions */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center relative inline-block mx-auto">
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Our Approach</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valueProps.map((prop, i) => (
              <div 
                key={i} 
                className="relative p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-xl animate-fade-in-up"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
                <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/10 w-fit">
                  {prop.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{prop.title}</h3>
                <p className="text-blue-100">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 md:p-20 shadow-2xl border-2 border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-amber-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center relative inline-block mx-auto">
              <span className="bg-gradient-to-r from-blue-300 to-amber-300 bg-clip-text text-transparent">Our Impact</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-amber-400 rounded-full"></div>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, i) => (
                <div 
                  key={i} 
                  className="text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-amber-500/10 w-fit">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{achievement.title}</h3>
                  <p className="text-blue-100">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-5xl mx-auto mb-40 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 md:p-20 shadow-2xl border-2 border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center relative inline-block mx-auto">
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">What Students Say</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            </h2>
            
            <div className="relative">
              <Quote className="absolute -top-10 -left-10 w-20 h-20 text-purple-500/20" />
              <div className="relative z-10 min-h-[150px]">
                {testimonials.map((testimonial, i) => (
                  <div 
                    key={i}
                    className="text-center transition-all duration-500 absolute inset-0"
                    style={{
                      opacity: testimonialIdx === i ? 1 : 0,
                      transform: `translateY(${testimonialIdx === i ? 0 : 30}px)`
                    }}
                  >
                    <p className="text-2xl text-blue-100 italic mb-6">{testimonial.quote}</p>
                  </div>
                ))}
              </div>
              <Quote className="absolute -bottom-10 -right-10 w-20 h-20 text-blue-500/20 transform rotate-180" />
            </div>
            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    testimonialIdx === i ? 'bg-gradient-to-r from-purple-400 to-blue-400 w-8' : 'bg-white/30'
                  }`}
                  onClick={() => setTestimonialIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 