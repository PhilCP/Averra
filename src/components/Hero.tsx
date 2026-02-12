"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Hero() {
  // Smooth scroll handler
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      
      {/* Subtle floating sparkle dots */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-40 animate-pulse" />
      <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-white rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-white rounded-full opacity-20 animate-pulse" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl px-6"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-4 -mt-46">
          Sparkling Spaces
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-lg text-gray-500 leading-relaxed mb-8">
          Enjoy a spotless space with our expert cleaning team. Affordable,
          eco-friendly, and tailored to your needs!
        </p>

        {/* CTA Button */}
        <Button
          onClick={scrollToContact}
          className="bg-primary hover:bg-primary/90 text-white rounded-full transition px-6 py-2 text-lg hover:scale-105"
        >
          Book Cleaning Service
        </Button>
      </motion.div>

      {/* Bottom Image */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 w-full flex justify-center"
      >
        <img
          src="/hands.png"
          alt="Cleaning tools"
          className="w-full max-w-2xl object-contain"
        />
      </motion.div>
    </section>
  );
}
