"use client"
import { motion } from "framer-motion"
import { Sparkles, CheckCircle } from "lucide-react"

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-br from-light via-white to-accent overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,168,232,0.15),transparent_70%)] opacity-60"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-primary tracking-widest uppercase mb-2"
        >
          Our Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          All-Inclusive Home Cleaning Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Enjoy complete peace of mind with Averra’s full-service cleaning — no add-ons, no hidden
          charges. Our comprehensive cleaning plan keeps your home spotless and refreshed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative bg-white/30 border border-white/40 backdrop-blur-xl rounded-3xl p-10 text-left shadow-lg hover:shadow-accent/40 transition-all duration-300 overflow-hidden"
        >
          {/* Glow layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-all duration-500"></div>

          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-10 h-10 text-primary" />
            <h3 className="text-2xl font-semibold text-gray-900">What’s Included</h3>
          </div>

          <ul className="space-y-3 text-gray-700 leading-relaxed">
            {[
              "Dishes, laundry & ironing",
              "Kitchen & bathroom deep steam cleaning",
              "Fridge, microwave & oven care",
              "Carpet, sofa & bed cleaning",
              "Surface dusting, mopping, and sanitizing",
              "Fabric and furniture detailing",
              "Light organization & bed making",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-gray-800 font-medium"
          >
            Cleaning is done{" "}
            <span className="text-secondary font-semibold">twice a week</span> (8 times per month),
            ensuring your home stays spotless all month long.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
