"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    images: string[]
    imageTitles: string[]
    imageDescriptions: string[]
    technologies: string[]
    link?: string
  }
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, project])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const nextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-700"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Image section */}
          <div className="relative w-full md:w-3/5 h-[40vh] md:h-[90vh] bg-black flex items-center justify-center overflow-hidden">
            {/* Navigation arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-70 text-white hover:bg-opacity-100 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 p-2 rounded-full bg-gray-800 bg-opacity-70 text-white hover:bg-opacity-100 transition-all"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image carousel */}
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentImageIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full flex items-center justify-center p-4"
              >
                <img
                  src={project.images[currentImageIndex] || "/placeholder.svg"}
                  alt={project.imageTitles[currentImageIndex]}
                  className="max-w-full max-h-full object-contain rounded-md"
                />
              </motion.div>
            </AnimatePresence>

            {/* Image pagination dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1)
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white scale-125" : "bg-gray-500"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content section */}
          <div className="w-full md:w-2/5 p-6 overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Visit Project <ExternalLink size={14} />
                </a>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-3">{project.imageTitles[currentImageIndex]}</h3>
              <p className="text-gray-300">{project.imageDescriptions[currentImageIndex]}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-800 text-gray-200 border-gray-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
