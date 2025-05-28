import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "./providers"
import { Inter, Playfair_Display, Outfit } from "next/font/google"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Evan Boudreau - STEM Entrepreneurship",
  description: "Personal portfolio of Evan Boudreau, STEM Entrepreneurship Major",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
