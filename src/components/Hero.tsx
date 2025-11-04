"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-50">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('/cleaning-2.jpg')] bg-cover bg-center brightness-[0.7]"
      />

      {/* Gradient + Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/80 via-sky-800/70 to-transparent backdrop-blur-[2px]" />

      {/* Glow Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/30 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[140px]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto"
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mt-22 mb-6"
        >
          <Sparkles className="w-4 h-4 text-blue-300" />
          <span className="text-sm tracking-wider text-blue-100 uppercase font-medium">
            Committed To Perfection
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold leading-[1.15] mb-6 tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
        >
          Experience the <span className="text-sky-400">Future</span> of <br />
          Professional Cleaning
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Smart, spotless, and sustainable cleaning solutions crafted for homes, offices, and modern spaces that deserve excellence.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button className="px-8 py-2 text-lg font-semibold rounded-full bg-sky-500 hover:bg-sky-600 shadow-lg hover:shadow-sky-400/40 transition-all duration-300 flex items-center gap-2">
            Book Now <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="px-8 py-2 text-lg font-semibold rounded-full border-white/40 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex flex-wrap justify-center items-center gap-8 text-sm md:text-base text-blue-100"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">100+</span>
            <span>Happy Clients</span>
          </div>
          <div className="w-1 h-8 bg-white/20 rounded-full hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">24/7</span>
            <span>Support</span>
          </div>
          <div className="w-1 h-8 bg-white/20 rounded-full hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white">Eco</span>
            <span>Friendly Methods</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-50 to-transparent" />
    </section>
  )
}
