"use client"

import { motion } from "framer-motion"

interface Technology {
  name: string
}

interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  technologies: Technology[]
  image: string
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      id: 1,
      title: "OrthoLink™",
      subtitle: "AI-Powered Medical Device Platform",
      description: "Built an AI-powered SaaS & consulting platform that automates compliance, smart translation, and global logistics for orthopedic device distribution.",
      technologies: [
        { name: "AI & Machine Learning" },
        { name: "Regulatory Compliance" },
        { name: "Medical Device Informatics" },
      ],
      image: "/ortholink-logo.webp"
    },
    // Add more projects as needed
  ]

  return (
    <section className="projects-section relative min-h-screen w-full overflow-hidden py-20">
      <style jsx global>{`
        .projects-section {
          position: relative;
          background: #000 url('/textures/black-marble.jpg') center/cover no-repeat;
        }
        .projects-section::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 60% 0%, rgba(30,30,30,0.85) 0%, rgba(0,0,0,0.98) 100%);
          opacity: 0.95;
        }
        .gold-text {
          background: url('/textures/gold-foil.jpg') 0 0 / contain no-repeat, linear-gradient(90deg, #FFD700, #FFEC8B);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .gold-border {
          border-image: url('/textures/gold-foil.jpg') 30 fill / 1 / 0 stretch;
        }
        .card {
          position: relative;
          overflow: hidden;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(24px);
          border: 1px solid transparent;
          border-radius: 2rem;
          transition: all 0.4s cubic-bezier(.4,0,.2,1);
          padding: 3rem;
        }
        .card:hover {
          border: 2px solid #FFD700;
          backdrop-filter: blur(40px);
          animation: neon 2s infinite ease-in-out;
          transform: perspective(800px) rotateX(2deg) rotateY(-2deg) scale(1.04);
          box-shadow: 0 0 40px 0 #FFD70088, 0 0 0 4px #FFD70022;
        }
        .card::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(60deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: skewX(-25deg);
          transition: transform 0.6s ease-out;
          z-index: 2;
        }
        .card:hover::before {
          transform: translateX(200%) skewX(-25deg);
        }
        @keyframes neon {
          0%,100% { box-shadow: 0 0 10px rgba(255,215,0,0.4); }
          50%   { box-shadow: 0 0 30px rgba(255,215,0,0.8); }
        }
        .card-logo {
          filter: drop-shadow(0 0 8px rgba(255,215,0,0.3));
          animation: flicker 5s infinite alternate;
        }
        @keyframes flicker {
          0%,100% { opacity: 0.95; }
          50%    { opacity: 1.05; }
        }
        .tag:hover {
          background: rgba(255,215,0,0.2);
          transform: scale(1.1);
          color: #000;
          box-shadow: 0 0 12px 0 #FFD70055;
        }
        .gold-text:hover {
          filter: drop-shadow(0 0 8px #FFD700) drop-shadow(0 0 16px #FFD70099);
          transition: filter 0.3s;
        }
      `}</style>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="gold-text text-6xl md:text-8xl font-serif font-extrabold tracking-wider mb-20 text-center leading-tight"
          style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
        >
          PROJECTS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card flex flex-col justify-between shadow-inner transition-all ease-in-out duration-300 group-hover:scale-105 min-h-[500px] h-full">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-xl card-logo">
                    <img
                      src={project.image}
                      alt={project.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col items-center space-y-3">
                  <h3
                    className="gold-text text-2xl font-serif font-bold text-center leading-tight tracking-wider"
                    style={{ fontFamily: 'Cinzel, Playfair Display, serif' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#DDD] text-sm text-center font-light font-sans leading-relaxed" style={{ fontFamily: 'Inter, Söhne, sans-serif' }}>
                    {project.subtitle}
                  </p>
                  <p className="text-[#DDD] text-center font-sans leading-relaxed" style={{ fontFamily: 'Inter, Söhne, sans-serif' }}>
                    {project.description}
                  </p>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="tag px-4 py-1 text-sm text-[#FFD700] border border-[#FFD700]/40 rounded-full bg-transparent transition-all ease-in-out duration-300 font-sans hover:border-[#FFD700]"
                      style={{ fontFamily: 'Inter, Söhne, sans-serif' }}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 