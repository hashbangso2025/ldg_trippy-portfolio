"use client"

import { motion } from "framer-motion"
import { useState, useMemo, useEffect } from "react"
import ProjectCard from "./project-card"

interface Technology {
  name: string
}

interface Project {
  id: number
  title: string
  description: React.ReactNode
  technologies: Technology[]
  link?: string
  image?: string
  isLogo?: boolean
  hasDetailView?: boolean
  detailPageUrl?: string
}

export default function ProjectSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  // Memoize sparkle properties only after mount
  interface Sparkle {
    width: number
    height: number
    left: number
    top: number
    opacity: number
    duration: number
    delay: number
  }
  const sparkles = useMemo<Sparkle[]>(() => {
    if (!mounted) return []
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return Array.from({ length: isMobile ? 2 : 4 }, () => ({
      width: 5 + Math.random() * 7,
      height: 5 + Math.random() * 7,
      left: 32 + Math.random() * 36,
      top: 22 + Math.random() * 56,
      opacity: 0.4 + Math.random() * 0.2,
      duration: 3.5 + Math.random() * 1.5,
      delay: Math.random() * 2,
    }))
  }, [mounted])

  const projects: Project[] = [
    {
      id: 0,
      title: "OrthoLink™",
      description:
        "I prototyped a specialized software solution aimed at enhancing efficiency, quality, and regulatory compliance within orthopedic medical device distribution, facilitating U.S. manufacturers' exports to Brazil, and optimizing healthcare services for economically distressed areas.",
      technologies: [
        { name: "Regulatory Compliance" },
        { name: "Lean Operations" },
        { name: "Strategic Leadership" },
        { name: "Global Market Expertise" },
      ],
      image: "/OrthoBridge.PNG",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "https://www.linkedin.com/company/ona-global-ai/",
    },
    {
      id: 1,
      title: "BioSorb Orthopedics",
      description:
        "Built BioSorb, an educational app helping surgeons treat people better by showcasing the advantages of bioabsorbable implants, animated simulations, and real-time recovery insights.",
      technologies: [
        { name: "Web Development" },
        { name: "CSS Animations" },
        { name: "Medical Education" },
        { name: "Data Visualization" },
      ],
      image: "/biosorb-logo.png",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "/projects/biosorb",
    },
    {
      id: 2,
      title: "Non Profit Consulting",
      description:
        "Co-founded Tally Food Rescue, a 501(c)(3) non-profit, building automated logistics solutions for client Second Harvest with blockchain-inspired MVP and real-time dashboards.",
      technologies: [
        { name: "Blockchain" },
        { name: "Data Analytics" },
        { name: "PostgreSQL" },
        { name: "Dashboard Design" },
      ],
      image: "/tfr-logo.png",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "/projects/tfr",
    },
    {
      id: -1, // Using negative ID to ensure it appears at the top
      title: "Boudreau Tutors",
      description:
        "Built and scaled bespoke academic support for 20–30 students, designing individualized curricula and driving $30K+ in revenue.",
      technologies: [
        { name: "Business Leadership" },
        { name: "Pedagogical Strategy" },
        { name: "Client Management" },
        { name: "Revenue Growth" },
      ],
      image: "/evan-boud-tutors-logo.png",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "/projects/boudreau",
    },
    {
      id: 3,
      title: "Tuzzy",
      description:
        "Cultivated impactful international (brazil) business development, driving Tuzzy Esports' U.S. entry into the nation's billion-dollar esports and e-commerce markets to unlock new growth.",
      technologies: [
        { name: "E-commerce" },
        { name: "Market Analysis" },
        { name: "AI for Business" },
        { name: "Online Marketing" },
      ],
      image: "/tuzzy-logo.png",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "https://tuzzy.gg/",
    },
    {
      id: 5,
      title: "GarnetGather AI",
      description:
        <>
          Engineered a prototype community portal for Florida State University on React/Next.js, employing NLP to surface campus culture, athletics analytics, and archival content.
          <br />
          <span style={{ fontSize: '0.75em', color: '#aaa', display: 'block', marginTop: 4 }}>
            DISCLAIMER: GarnetGather is NOT affiliated with Florida State University.
          </span>
        </>,
      technologies: [
        { name: "Natural Language Processing" },
        { name: "Full-stack Development" },
        { name: "Community Platform" },
        { name: "User Experience Design" },
      ],
      image: "/nolenet-logo.png",
      isLogo: true,
      hasDetailView: true,
      detailPageUrl: "/projects/garnetgather",
    },
    {
      id: 6,
      title: "Portfolio Website",
      description:
        "Architected and deployed a production-grade, full-stack Next.js application (Spring 2025), integrating real-time music-stream data.",
      technologies: [
        { name: "Next.js" },
        { name: "API Integration" },
        { name: "Spotify Integration" },
        { name: "Heroku Deployment" },
      ],
      link: "https://apstodd.com",
      image: "/portfolio-memoji.png",
      isLogo: true,
    },
  ]

  return (
    <section 
      id="projects" 
      className="relative py-20 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Softer gold gradient/vignette background */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="w-[110vw] h-[80vh] md:w-[90vw] md:h-[70vh] rounded-3xl bg-gradient-to-br from-yellow-100/30 via-yellow-200/20 to-yellow-50/0 blur-3xl opacity-50 shadow-xl"></div>
      </div>
      {/* Fewer, smaller, subtler gold sparkles */}
      <motion.div
        className="absolute inset-0 flex justify-center items-center z-10 pointer-events-none transform-gpu"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.7, transition: { staggerChildren: 0.18 } },
        }}
      >
        {sparkles.map((sparkle: Sparkle, i: number) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-yellow-200 shadow"
            style={{
              width: `${sparkle.width}px`,
              height: `${sparkle.height}px`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              filter: 'blur(2px)',
              opacity: sparkle.opacity,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.7, 0],
              scale: [0, 1.1, 1, 1.15, 0],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
            }}
          />
        ))}
      </motion.div>
      <div className="container mx-auto px-4 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl md:text-7xl font-serif mb-8 sm:mb-12 text-center"
          style={{
            background: 'linear-gradient(90deg, #d4af37, #fffacd, #f0e68c, #d4af37)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 8px #d4af3788)',
            fontWeight: 900,
            letterSpacing: '0.04em',
          }}
        >
          PROJECTS
        </motion.h2>
        <div className="grid gap-6 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch px-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative h-full flex"
            >
              {/* Softer gold border and shadow around each card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 opacity-30 blur group-hover:opacity-60 transition-opacity duration-300 z-0" />
              <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-black/70 border-2 border-yellow-200/40 p-4 sm:p-8 text-center overflow-hidden z-10 flex flex-col min-h-[420px] h-full w-full">
                {project.image && (
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 mx-auto rounded-xl shadow border border-yellow-100/40 flex items-center justify-center ${project.title === 'Portfolio Website' ? 'bg-black' : 'bg-[#f9f6f1]'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain rounded-xl"
                      style={{ width: '100%', height: '100%' }}
                      onError={e => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-serif mb-2"
                  style={{
                    background: 'linear-gradient(90deg, #d4af37, #fffacd, #f0e68c, #d4af37)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 flex-1">{project.description}</p>
                <div className="grid grid-cols-2 gap-3 mt-auto w-80 mx-auto">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="block px-2 py-2 text-xs sm:text-sm bg-black/40 text-yellow-900 rounded-full border border-yellow-200/30 text-center flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(90deg, #fffbe6, #f9e79f, #fffacd)',
                        color: '#bfa100',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        boxShadow: '0 0 4px #d4af3788',
                        fontSize: '0.75rem',
                        lineHeight: '1.1',
                        width: '9rem',
                        height: '2.5rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                {/* View Project overlay/button for detail pages */}
                {project.hasDetailView && project.detailPageUrl && (
                  <a
                    href={project.detailPageUrl}
                    className="absolute inset-0 flex items-center justify-center bg-black/70 bg-opacity-70 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 text-black font-bold text-lg shadow-lg border-2 border-yellow-300/60 hover:scale-105 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      {project.title === "OrthoLink™" ? "Schedule a Demo" : "View Project"}
                    </span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
