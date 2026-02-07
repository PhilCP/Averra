"use client"

import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100 via-white to-sky-50">
      
      {/* Cinematic Background */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-[url('/cleaning-2.jpg')] bg-cover bg-center brightness-[0.65] filter"
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-blue-800/60 to-transparent backdrop-blur-[2px] animate-pulse-slow" />

      {/* Floating Orbs & Particles */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-sky-400/25 rounded-full blur-[160px] animate-float-slow" />
      <div className="absolute bottom-20 right-1/3 w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[140px] animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-[2px] h-[2px] bg-white/20 rounded-full animate-pulse-fast" />
      <div className="absolute top-1/3 right-1/4 w-[3px] h-[3px] bg-white/30 rounded-full animate-pulse-slower" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-5 py-2 rounded-full border border-white/20 mb-6"
        >
          <Sparkles className="w-5 h-5 text-sky-300 animate-pulse" />
          <span className="text-sm tracking-wider text-blue-100 uppercase font-semibold">
            DEDICATED TO PERFECTION
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
        >
          Experience <span className="text-gradient bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">Elevated</span> <br />
          Home Cleaning
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Premium, all-inclusive cleaning services designed for Nairobi’s modern apartments and homes.  
          From laundry to deep steam sanitation, Averra Cleaners makes your space effortlessly elegant.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button className="px-10 py-3 text-lg font-semibold rounded-full bg-sky-500 hover:bg-sky-600 shadow-lg shadow-sky-400/30 transition-all duration-300 flex items-center gap-2">
            Book Now <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="px-10 py-3 text-lg font-semibold rounded-full border-white/40 text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-lg"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-10 text-sm md:text-base text-blue-100"
        >
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">200+</span>
            <span>Happy Clients</span>
          </div>
          <div className="w-1 h-8 bg-white/20 rounded-full hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">Twice-a-Week</span>
            <span>Cleaning</span>
          </div>
          <div className="w-1 h-8 bg-white/20 rounded-full hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-white">Eco</span>
            <span>Friendly Methods</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-sky-50 to-transparent" />
    </section>
  )
}
