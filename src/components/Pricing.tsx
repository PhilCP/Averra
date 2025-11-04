"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { CheckCircle2 } from "lucide-react"

const plans = {
  monthly: [
    {
      name: "Basic",
      price: "Ksh 7,000/mo",
      features: ["2 Rooms Cleaning", "Weekly Scheduling", "Standard Support"],
    },
    {
      name: "Standard",
      price: "Ksh 8,000/mo",
      features: ["5 Rooms Cleaning", "Bi-weekly Deep Clean", "Priority Support"],
    },
    {
      name: "Premium",
      price: "Ksh 9,000/mo",
      features: ["Unlimited Rooms", "Full House Cleaning", "24/7 Support"],
    },
  ],
  yearly: [
    {
      name: "Basic",
      price: "Ksh 19,000/yr",
      features: ["2 Rooms Cleaning", "Weekly Scheduling", "Standard Support"],
    },
    {
      name: "Standard",
      price: "Ksh 39,000/yr",
      features: ["5 Rooms Cleaning", "Bi-weekly Deep Clean", "Priority Support"],
    },
    {
      name: "Premium",
      price: "Ksh 59,000/yr",
      features: ["Unlimited Rooms", "Full House Cleaning", "24/7 Support"],
    },
  ],
}

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-br from-blue-50 via-white to-sky-100 relative overflow-hidden"
    >
      {/* Soft glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.2),transparent_70%)] opacity-60"></div>

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
          className="text-4xl md:text-5xl font-bold mb-12 text-gray-900"
        >
          Choose Your Cleaning Plan
        </motion.h2>

        {/* Toggle */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-white/40 backdrop-blur-lg border border-sky-200 rounded-full shadow-inner overflow-hidden">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 text-sm font-medium transition-all ${
                !isYearly
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 text-sm font-medium transition-all ${
                isYearly
                  ? "bg-sky-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isYearly ? "yearly" : "monthly"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {plans[isYearly ? "yearly" : "monthly"].map((plan, i) => {
              const isSelected = selectedPlan === plan.name
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative cursor-pointer bg-white/30 border backdrop-blur-xl rounded-3xl p-8 transition-all duration-300 shadow-lg ${
                    isSelected
                      ? "border-sky-500 shadow-sky-300/50"
                      : "border-white/40 hover:border-sky-300/60"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition bg-gradient-to-br from-sky-300/20 to-transparent`}
                  ></div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-extrabold text-sky-600 mb-8">
                    {plan.price}
                  </p>

                  <ul className="space-y-3 mb-8 text-gray-700">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex justify-center items-center gap-2"
                      >
                        <CheckCircle2 className="text-sky-500 w-5 h-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full rounded-full py-4 font-semibold transition-all ${
                      isSelected
                        ? "bg-sky-600 hover:bg-sky-700 text-white shadow-md"
                        : "bg-gray-900 hover:bg-sky-600 text-white"
                    }`}
                  >
                    {isSelected ? "Selected" : "Choose Plan"}
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
