"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  className?: string
  onComplete?: () => void
  textStyle?: React.CSSProperties
}

export default function TypewriterText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
  className = "",
  onComplete,
  textStyle = {},
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // If we've completed all words and we're not in deleting mode
    if (currentWordIndex === words.length - 1 && currentText === words[currentWordIndex] && !isDeleting) {
      setIsComplete(true)
      if (onComplete) {
        onComplete()
      }
      return
    }

    // Handle typing and deleting
    if (!isDeleting && currentText !== words[currentWordIndex]) {
      // Still typing current word
      timeout = setTimeout(() => {
        setCurrentText(words[currentWordIndex].substring(0, currentText.length + 1))
      }, typingSpeed)
    } else if (!isDeleting && currentText === words[currentWordIndex]) {
      // Finished typing current word, prepare to delete after delay
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delayBetweenWords)
    } else if (isDeleting && currentText !== "") {
      // Deleting current word
      timeout = setTimeout(() => {
        setCurrentText(words[currentWordIndex].substring(0, currentText.length - 1))
      }, deletingSpeed)
    } else if (isDeleting && currentText === "") {
      // Finished deleting, move to next word
      setIsDeleting(false)
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }

    return () => clearTimeout(timeout)
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
    onComplete,
    isComplete,
  ])

  return (
    <div className={className}>
      <span style={textStyle}>
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.7 }}
          className="inline-block w-[0.15em] h-[1.2em] bg-white ml-1 align-middle"
          style={{ display: isComplete ? "none" : "inline-block" }}
        />
      </span>
    </div>
  )
}
