"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function MouseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number>(0)
  const backgroundDotsRef = useRef<{ x: number; y: number; size: number; originalX: number; originalY: number }[]>([])

  // Initialize background dots
  useEffect(() => {
    const dots = []
    const spacing = 50
    const canvas = canvasRef.current
    if (!canvas) return

    const width = window.innerWidth
    const height = window.innerHeight * 2 // Make it taller for scrolling

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        // Add some randomness to the grid
        const offsetX = (Math.random() - 0.5) * spacing * 0.5
        const offsetY = (Math.random() - 0.5) * spacing * 0.5
        const size = Math.random() * 1.5 + 0.5

        dots.push({
          x: x + offsetX,
          y: y + offsetY,
          size,
          originalX: x + offsetX,
          originalY: y + offsetY,
        })
      }
    }

    backgroundDotsRef.current = dots
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMouseMoving(true)

      // Create gold spark particles on mouse move
      if (Math.random() > 0.7) {
        // Only create particles occasionally
        createParticle(e.clientX, e.clientY)
      }

      // Reset the moving flag after a delay
      setTimeout(() => setIsMouseMoving(false), 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Create a new particle
  const createParticle = (x: number, y: number) => {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 2 + 1
    const size = Math.random() * 3 + 1
    const life = Math.random() * 20 + 10

    // Gold color variations
    const colors = [
      "rgba(212, 175, 55, 0.8)",
      "rgba(255, 215, 0, 0.8)",
      "rgba(255, 223, 0, 0.8)",
      "rgba(207, 181, 59, 0.8)",
    ]

    const particle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life,
      maxLife: life,
    }

    particlesRef.current.push(particle)
  }

  // Animation loop
  const animate = (time: number) => {
    if (previousTimeRef.current === undefined) {
      previousTimeRef.current = time
    }

    const deltaTime = time - previousTimeRef.current
    previousTimeRef.current = time

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw background dots
    backgroundDotsRef.current.forEach((dot) => {
      const dx = mousePosition.x - dot.x
      const dy = mousePosition.y - dot.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150

      if (distance < maxDistance && isMouseMoving) {
        // Move dots away from mouse with a swirling effect
        const angle = Math.atan2(dy, dx) + Math.PI / 2 // Add 90 degrees for swirl
        const force = (1 - distance / maxDistance) * 0.2

        dot.x += Math.cos(angle) * force * deltaTime * 0.1
        dot.y += Math.sin(angle) * force * deltaTime * 0.1
      } else {
        // Slowly return to original position
        dot.x += (dot.originalX - dot.x) * 0.02
        dot.y += (dot.originalY - dot.y) * 0.02
      }

      // Draw the dot
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.fill()
    })

    // Update and draw particles
    particlesRef.current.forEach((particle, index) => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--

      // Remove dead particles
      if (particle.life <= 0) {
        particlesRef.current.splice(index, 1)
        return
      }

      // Draw particle with fading based on life
      const opacity = (particle.life / particle.maxLife) * 0.8
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

      // Create gradient for more realistic gold spark
      const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
      gradient.addColorStop(0.3, particle.color.replace("0.8", `${opacity}`))
      gradient.addColorStop(1, `rgba(212, 175, 55, 0)`)

      ctx.fillStyle = gradient
      ctx.fill()
    })

    requestRef.current = requestAnimationFrame(animate)
  }

  // Start and stop animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isMouseMoving])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.8 }}
    />
  )
}
