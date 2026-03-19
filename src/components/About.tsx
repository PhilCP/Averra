"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Sparkles, Star } from "lucide-react"

// Animated number counter
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest).toLocaleString()),
    })
    return controls.stop
  }, [value, count])

  return (
    <motion.span
      className="text-4xl font-bold text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayValue}
      <span className="text-primary">+</span>
    </motion.span>
  )
}

// const features = [
//   {
//     icon: Sparkles,
//     labelKey: "about1.features.quality",
//     fallback: "Premium Quality",
//   },
//   {
//     icon: ShieldCheck,
//     labelKey: "about1.features.trusted",
//     fallback: "Fully Insured",
//   },
//   {
//     icon: Clock,
//     labelKey: "about1.features.punctual",
//     fallback: "Always On Time",
//   },
//   {
//     icon: Star,
//     labelKey: "about1.features.rated",
//     fallback: "5-Star Rated",
//   },
// ]

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT: IMAGE + FLOATING BADGE */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Main image */}
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] w-full max-w-md mx-auto shadow-2xl">
            <img
              src="/cleaning-5.jpg"
              alt="Our team at work"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat card — bottom left */}
          <motion.div
            className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-1">
                {t("about1.stats.ratingLabel") || "Customer Rating"}
              </p>
              <p className="text-base font-bold text-gray-900 leading-none">4.9 / 5.0</p>
            </div>
          </motion.div>

          {/* Floating stat card — top right */}
          <motion.div
            className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-gray-400 leading-none mb-1">
              {t("about1.stats.projects") || "Projects Done"}
            </p>
            <div className="flex items-baseline gap-1">
              <AnimatedNumber value={190} />
            </div>
          </motion.div>

          {/* Decorative accent */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-10 left-10 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        </motion.div>

        {/* RIGHT: TEXT + FEATURES GRID */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-5 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {t("about1.subtitle") || "About Us"}
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
            {t("about1.title") || "We Clean Your Space\nSo You Can Focus on Life"}
          </h2>

          {/* Body copy */}
          <p className="text-gray-500 leading-relaxed mb-8 text-[0.95rem]">
            {t("about1.description") ||
              "With years of experience and a passionate team, we deliver spotless results every time. From homes to offices, we treat every space as if it were our own."}
          </p>

          Stats row
          <div className="flex items-center gap-10 mb-10 pb-10 border-b border-gray-100">
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedNumber value={250} />
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t("about1.stats.layouts") || "Happy Clients"}
              </p>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div>
              <div className="flex items-baseline gap-1">
                <AnimatedNumber value={190} />
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t("about1.stats.projects") || "Projects Done"}
              </p>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">8</span>
                <span className="text-primary font-bold text-2xl">yrs</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t("about1.stats.experience") || "Experience"}
              </p>
            </div>
          </div>

          {/* Feature pills grid */}
          {/* <div className="grid grid-cols-2 gap-3">
            {features.map(({ icon: Icon, labelKey, fallback }, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 bg-gray-50 hover:bg-primary/5 rounded-xl px-4 py-3 transition-colors duration-200 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {t(labelKey) || fallback}
                </span>
              </motion.div>
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  )
}