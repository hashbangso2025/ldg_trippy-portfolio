"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  image: string
  hasDetailView?: boolean
  detailPageUrl?: string
}

export default function ProjectCard({
  title,
  description,
  tags,
  link,
  image,
  hasDetailView = false,
  detailPageUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 bg-black border-gray-700 transform-gpu hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:border-gray-600">
        {hasDetailView && detailPageUrl ? (
          detailPageUrl.startsWith('http') ? (
            <div className="relative overflow-hidden aspect-video bg-gray-900 flex items-center justify-center cursor-pointer">
              <div className="relative overflow-hidden aspect-video bg-gray-900 flex items-center justify-center cursor-pointer">
                {image.includes("logo") ||
                title === "ZenOrtho™" ||
                title === "Non Profit Consulting" ||
                title === "SnapTag" ||
                title === "Listening Tab" ||
                title === "BioSorb Orthopedics" ||
                title === "GarnetGather AI" ||
                title === "Tuzzy" ||
                title === "Boudreau Scholastic Guild" ||
                image.includes("memoji") ? (
                  <div
                    className={`w-full h-full flex items-center justify-center p-8 ${
                      title === "SnapTag"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900"
                        : title === "Listening Tab"
                          ? "bg-gradient-to-br from-gray-900 to-black"
                          : title === "BioSorb Orthopedics"
                            ? "bg-gradient-to-br from-[#001a2c] via-[#002d4a] to-black"
                            : title === "GarnetGather AI"
                              ? "bg-gradient-to-br from-[#782F40] via-[#5B2333] to-black"
                              : title === "OrthoLink™"
                                ? "bg-gradient-to-br from-[#1a3a5f] via-[#0f2a47] to-black"
                                : title === "Tuzzy"
                                  ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                  : title === "Non Profit Consulting"
                                    ? "bg-gradient-to-br from-[#e67e22] via-[#d35400] to-[#a04000]"
                                    : title === "Boudreau Scholastic Guild"
                                      ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                      : "bg-gradient-to-br from-gray-900 to-black"
                    }`}
                  >
                    <motion.img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className={`max-w-[60%] max-h-[60%] object-contain rounded-xl ${
                        title === "Listening Tab" ? "listening-tab-logo" : ""
                      } ${title === "BioSorb Orthopedics" ? "biosorb-logo" : ""} ${
                        title === "GarnetGather AI" ? "nolenet-logo" : ""
                      } ${title === "OrthoLink™" ? "zenortho-logo" : ""} ${title === "Tuzzy" ? "pokemint-logo" : ""}`}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotate: isHovered ? [0, -2, 2, 0] : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                ) : (
                  <motion.div className="w-full h-full">
                    <motion.img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                )}
                {/* Overlay button for external detailPageUrl */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={detailPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 text-black font-bold text-lg shadow-lg border-2 border-yellow-300/60 hover:scale-105 transition-transform"
                    style={{ textDecoration: 'none' }}
                  >
                    {title === "OrthoLink™" ? "Schedule a Demo" : "Visit Website"}
                  </a>
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
              </div>
            </div>
          ) : (
            <Link href={detailPageUrl} className="block">
              <div className="relative overflow-hidden aspect-video bg-gray-900 flex items-center justify-center cursor-pointer">
                {image.includes("logo") ||
                title === "ZenOrtho™" ||
                title === "Non Profit Consulting" ||
                title === "SnapTag" ||
                title === "Listening Tab" ||
                title === "BioSorb Orthopedics" ||
                title === "GarnetGather AI" ||
                title === "Tuzzy" ||
                title === "Boudreau Scholastic Guild" ||
                image.includes("memoji") ? (
                  <div
                    className={`w-full h-full flex items-center justify-center p-8 ${
                      title === "SnapTag"
                        ? "bg-gradient-to-br from-gray-800 to-gray-900"
                        : title === "Listening Tab"
                          ? "bg-gradient-to-br from-gray-900 to-black"
                          : title === "BioSorb Orthopedics"
                            ? "bg-gradient-to-br from-[#001a2c] via-[#002d4a] to-black"
                            : title === "GarnetGather AI"
                              ? "bg-gradient-to-br from-[#782F40] via-[#5B2333] to-black"
                              : title === "OrthoLink™"
                                ? "bg-gradient-to-br from-[#1a3a5f] via-[#0f2a47] to-black"
                                : title === "Tuzzy"
                                  ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                  : title === "Non Profit Consulting"
                                    ? "bg-gradient-to-br from-[#e67e22] via-[#d35400] to-[#a04000]"
                                    : title === "Boudreau Scholastic Guild"
                                      ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                      : "bg-gradient-to-br from-gray-900 to-black"
                    }`}
                  >
                    <motion.img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className={`max-w-[60%] max-h-[60%] object-contain rounded-xl ${
                        title === "Listening Tab" ? "listening-tab-logo" : ""
                      } ${title === "BioSorb Orthopedics" ? "biosorb-logo" : ""} ${
                        title === "GarnetGather AI" ? "nolenet-logo" : ""
                      } ${title === "OrthoLink™" ? "zenortho-logo" : ""} ${title === "Tuzzy" ? "pokemint-logo" : ""}`}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        rotate: isHovered ? [0, -2, 2, 0] : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                ) : (
                  <motion.div className="w-full h-full">
                    <motion.img
                      src={image || "/placeholder.svg"}
                      alt={title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                )}

                {/* View Project overlay */}
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-medium"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Eye size={18} /> {title === "OrthoLink™" ? "Schedule a Demo" : "View Project"}
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
              </div>
            </Link>
          )
        ) : link ? (
          <div className="relative overflow-hidden aspect-video bg-gray-900 flex items-center justify-center cursor-pointer">
            {image.includes("logo") ||
            title === "ZenOrtho™" ||
            title === "Non Profit Consulting" ||
            title === "SnapTag" ||
            title === "Listening Tab" ||
            title === "BioSorb Orthopedics" ||
            title === "GarnetGather AI" ||
            title === "Tuzzy" ||
            title === "Boudreau Scholastic Guild" ||
            image.includes("memoji") ? (
              <div
                className={`w-full h-full flex items-center justify-center p-8 ${
                  title === "SnapTag"
                    ? "bg-gradient-to-br from-gray-800 to-gray-900"
                    : title === "Listening Tab"
                      ? "bg-gradient-to-br from-gray-900 to-black"
                      : title === "BioSorb Orthopedics"
                        ? "bg-gradient-to-br from-[#001a2c] via-[#002d4a] to-black"
                        : title === "GarnetGather AI"
                          ? "bg-gradient-to-br from-[#782F40] via-[#5B2333] to-black"
                          : title === "OrthoLink™"
                            ? "bg-gradient-to-br from-[#1a3a5f] via-[#0f2a47] to-black"
                            : title === "Tuzzy"
                              ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                              : title === "Non Profit Consulting"
                                ? "bg-gradient-to-br from-[#e67e22] via-[#d35400] to-[#a04000]"
                                : title === "Boudreau Scholastic Guild"
                                  ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                  : "bg-gradient-to-br from-gray-900 to-black"
                }`}
              >
                <motion.img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className={`max-w-[60%] max-h-[60%] object-contain rounded-xl ${
                    title === "Listening Tab" ? "listening-tab-logo" : ""
                  } ${title === "BioSorb Orthopedics" ? "biosorb-logo" : ""} ${
                    title === "GarnetGather AI" ? "nolenet-logo" : ""
                  } ${title === "OrthoLink™" ? "zenortho-logo" : ""} ${title === "Tuzzy" ? "pokemint-logo" : ""}`}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotate: isHovered ? [0, -2, 2, 0] : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </div>
            ) : (
              <motion.div className="w-full h-full">
                <motion.img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )}

            {/* Overlay button for external link */}
            {title === "Tuzzy" ? (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href="https://tuzzy.gg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 text-black font-bold text-lg shadow-lg border-2 border-yellow-300/60 hover:scale-105 transition-transform"
                  style={{ textDecoration: 'none' }}
                >
                  Visit Website
                </a>
              </motion.div>
            ) : (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 text-black font-bold text-lg shadow-lg border-2 border-yellow-300/60 hover:scale-105 transition-transform"
                  style={{ textDecoration: 'none' }}
                >
                  Visit Website
                </a>
              </motion.div>
            )}

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </div>
        ) : (
          <div className="relative overflow-hidden aspect-video bg-gray-900 flex items-center justify-center cursor-pointer">
            {image.includes("logo") ||
            title === "ZenOrtho™" ||
            title === "Non Profit Consulting" ||
            title === "SnapTag" ||
            title === "Listening Tab" ||
            title === "BioSorb Orthopedics" ||
            title === "GarnetGather AI" ||
            title === "Tuzzy" ||
            title === "Boudreau Scholastic Guild" ||
            image.includes("memoji") ? (
              <div
                className={`w-full h-full flex items-center justify-center p-8 ${
                  title === "SnapTag"
                    ? "bg-gradient-to-br from-gray-800 to-gray-900"
                    : title === "Listening Tab"
                      ? "bg-gradient-to-br from-gray-900 to-black"
                      : title === "BioSorb Orthopedics"
                        ? "bg-gradient-to-br from-[#001a2c] via-[#002d4a] to-black"
                        : title === "GarnetGather AI"
                          ? "bg-gradient-to-br from-[#782F40] via-[#5B2333] to-black"
                          : title === "OrthoLink™"
                            ? "bg-gradient-to-br from-[#1a3a5f] via-[#0f2a47] to-black"
                            : title === "Tuzzy"
                              ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                              : title === "Non Profit Consulting"
                                ? "bg-gradient-to-br from-[#e67e22] via-[#d35400] to-[#a04000]"
                                : title === "Boudreau Scholastic Guild"
                                  ? "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-black"
                                  : "bg-gradient-to-br from-gray-900 to-black"
                }`}
              >
                <motion.img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className={`max-w-[60%] max-h-[60%] object-contain rounded-xl ${
                    title === "Listening Tab" ? "listening-tab-logo" : ""
                  } ${title === "BioSorb Orthopedics" ? "biosorb-logo" : ""} ${
                    title === "GarnetGather AI" ? "nolenet-logo" : ""
                  } ${title === "OrthoLink™" ? "zenortho-logo" : ""} ${title === "Tuzzy" ? "pokemint-logo" : ""}`}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotate: isHovered ? [0, -2, 2, 0] : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </div>
            ) : (
              <motion.div className="w-full h-full">
                <motion.img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            )}

            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            />
          </div>
        )}
        <CardHeader className="pb-2">
          <motion.h3
            className="text-xl font-bold text-white"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {title}
          </motion.h3>
        </CardHeader>
        <CardContent className="flex-grow">
          <motion.p
            className="text-gray-200 mb-4"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {description}
          </motion.p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                animate={{
                  y: isHovered ? -2 : 0,
                  opacity: isHovered ? 1 : 0.9,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
              >
                <Badge variant="outline" className="border-gray-500 text-gray-200">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
