"use client"
import { motion } from "framer-motion"
import { CheckCircle2, Sparkles } from "lucide-react"

export default function Pricing() {
  const pricingData = [
    {
      type: "Studio",
      price: "Ksh 5,000",
      summary:
        "All-inclusive cleaning, laundry, appliances & steam. Twice-a-week cleaning ensures your home stays spotless all month long.",
    },
    {
      type: "1 Bedroom",
      price: "Ksh 8,000",
      summary:
        "Full home care — laundry, dishes, deep steam sanitation, and light organization. Perfect for modern 1-bedroom apartments.",
    },
    {
      type: "2 Bedroom",
      price: "Ksh 13,000",
      summary:
        "Comprehensive cleaning package with deep sanitation, fabric care, carpets, sofas, and full organization. Ideal for growing households.",
    },
    {
      type: "3 Bedroom",
      price: "Ksh 18,000",
      summary:
        "Premium care for spacious apartments — from kitchen appliances to furniture detailing, all included.",
    },
    {
      type: "4 Bedroom",
      price: "Ksh 23,500",
      summary:
        "Full family-size home cleaning — everything from laundry, ironing, dishes, and deep steam cleaning for every room.",
    },
    {
      type: "5 Bedroom",
      price: "Ksh 25,000",
      summary:
        "Luxury all-in-one service for large homes — complete peace of mind with every detail handled professionally.",
    },
  ]

  const inclusions = [
    "Dishes, laundry & ironing",
    "Kitchen & bathroom deep steam cleaning",
    "Fridge, microwave & oven care",
    "Carpet, sofa & bed cleaning",
    "Surface dusting, mopping & sanitizing",
    "Fabric & furniture detailing",
    "Light organization & bed making",
  ]

  return (
    <section
      id="pricing"
      className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-sky-100 overflow-hidden"
    >
      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_70%)] opacity-70"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-sky-600 tracking-widest uppercase mb-2"
        >
          Pricing Plans
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
        >
          Dedicated to Perfection — One Flat Monthly Fee
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Experience elevated, all-inclusive home cleaning with Averra Cleaners. Every detail. Every
          room. One simple monthly price.
        </motion.p>

        {/* Pricing Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pricingData.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04, y: -5 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
              className="relative bg-white/40 border border-white/50 backdrop-blur-xl rounded-3xl p-8 text-left shadow-lg hover:shadow-sky-200/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-300/10 to-transparent opacity-0 hover:opacity-100 transition-all duration-500"></div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {plan.type}
              </h3>
              <p className="text-3xl font-bold text-sky-600 mb-4">
                {plan.price} <span className="text-base text-gray-500 font-normal">/ month</span>
              </p>
              <p className="text-gray-700 leading-relaxed">{plan.summary}</p>
            </motion.div>
          ))}
        </div>

        {/* Inclusions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-left bg-white/30 border border-white/40 backdrop-blur-xl rounded-3xl p-10 shadow-lg relative"
        >
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-sky-600" />
            <h3 className="text-2xl font-semibold text-gray-900">
              Every Plan Includes
            </h3>
          </div>

          <ul className="space-y-3 text-gray-700">
            {inclusions.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="text-sky-500 w-5 h-5 mt-1 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <p className="mt-8 text-gray-800 font-medium">
            Cleaning Frequency:{" "}
            <span className="text-sky-600 font-semibold">
              Twice a week (8 times per month)
            </span>{" "}
            to keep your home effortlessly elegant.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-gray-700 max-w-2xl mx-auto leading-relaxed"
        >
          We’re not your average cleaners. We handle everything — from dishes and laundry to steam
          cleaning, sofas, and carpets — for one simple monthly price.
        </motion.p>
      </div>
    </section>
  )
}
