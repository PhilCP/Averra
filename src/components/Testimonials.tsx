"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

const testimonials = [
  {
    name: "Grace M.",
    role: "Kilimani",
    message:
      "Averra Cleaners has completely transformed my home. They handle everything — even my oven and couch look brand new every week.",
    image: "/av.jpg",
  },
  {
    name: "Brian K.",
    role: "Lavington",
    message:
      "They’re consistent, professional, and my home has never felt this fresh.",
    image: "/averra-hero.jpg",
  },
  {
    name: "Sylvia N.",
    role: "Westlands",
    message:
      "Since hiring Averra Cleaners, I actually look forward to coming home. Everything is spotless, and they take care of the little things I always forget.",
    image: "/av.jpg",
  },
  {
    name: "Michael O.",
    role: "Parklands",
    message:
      "The team at Averra Cleaners is amazing! Punctual, thorough, and very friendly. My home has never been cleaner.",
    image: "/averra-hero.jpg",
  },
  {
    name: "Faith W.",
    role: "Kilimani",
    message:
      "I love that they offer a full-service package. From laundry to deep cleaning, they make my life so much easier.",
    image: "/av.jpg",
  },
  {
    name: "James T.",
    role: "Lavington",
    message:
      "Averra Cleaners is worth every penny. They’re reliable, detail-oriented, and my home always smells fresh and inviting.",
    image: "/averra-hero.jpg",
  },
  {
    name: "Rachel A.",
    role: "Westlands",
    message:
      "The professionalism and care they show are unmatched. Even my carpets and curtains look brand new!",
    image: "/av.jpg",
  },
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const handleNext = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <section className="relative py-28 bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-amber-400 font-semibold tracking-widest uppercase mb-2">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-14 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="relative flex justify-center items-center">
          {/* Left Button */}
          <Button
            onClick={handlePrev}
            variant="outline"
            className="hidden md:flex absolute left-0 z-10 rounded-full bg-neutral-800/80 hover:bg-amber-700/40 border-none backdrop-blur-md shadow-md transition"
          >
            <ChevronLeft className="w-6 h-6 text-amber-400" />
          </Button>

          <div className="overflow-hidden w-full max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-800 p-10 md:p-12 flex flex-col md:flex-row items-center gap-8 text-left"
              >
                {/* Image */}
                <motion.img
                  src={t.image}
                  alt={t.name}
                  className="w-32 h-32 md:w-44 md:h-44 rounded-2xl object-cover shadow-lg border border-neutral-700"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Text */}
                <div className="flex-1 space-y-5">
                  <Quote className="text-amber-400 w-10 h-10 opacity-70" />
                  <p className="text-gray-300 text-lg leading-relaxed">
                    “{t.message}”
                  </p>
                  <div className="pt-4">
                    <h3 className="text-xl font-semibold text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <Button
            onClick={handleNext}
            variant="outline"
            className="hidden md:flex absolute right-0 z-10 rounded-full bg-neutral-800/80 hover:bg-amber-700/40 border-none backdrop-blur-md shadow-md transition"
          >
            <ChevronRight className="w-6 h-6 text-amber-400" />
          </Button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-6 mt-8">
          <Button
            variant="outline"
            onClick={handlePrev}
            className="border-amber-500 text-amber-400 bg-neutral-800 hover:bg-amber-700/50 rounded-full"
          >
            ← Prev
          </Button>
          <Button
            variant="outline"
            onClick={handleNext}
            className="border-amber-500 text-amber-400 bg-neutral-800 hover:bg-amber-700/50 rounded-full"
          >
            Next →
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
