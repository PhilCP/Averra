"use client"
import { motion } from "framer-motion"
import { Sparkles, ShieldCheck, Clock, Home, Recycle, Users } from "lucide-react"

const services = [
  {
    icon: <Home className="w-10 h-10 text-amber-500" />,
    title: "Residential Cleaning",
    desc: "Transform your home into a spotless sanctuary with our deep, eco-friendly cleaning solutions.",
  },
  {
    icon: <Users className="w-10 h-10 text-amber-500" />,
    title: "Commercial Cleaning",
    desc: "Impress your clients and boost productivity with a consistently clean and organized workspace.",
  },
  {
    icon: <Clock className="w-10 h-10 text-amber-500" />,
    title: "Scheduled Maintenance",
    desc: "Set up flexible cleaning schedules tailored to your routine  weekly, biweekly, or monthly.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-amber-500" />,
    title: "Sanitization Services",
    desc: "Ensure safety and hygiene with certified sanitization for homes, offices, and public spaces.",
  },
  {
    icon: <Recycle className="w-10 h-10 text-amber-500" />,
    title: "Eco-Friendly Cleaning",
    desc: "We use biodegradable, non-toxic cleaning products to protect your family and the environment.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-amber-500" />,
    title: "Move-in / Move-out Cleaning",
    desc: "Detailed cleaning for new beginnings perfect for tenants, landlords, and real estate agents.",
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-br from-amber-50 via-white to-amber-100 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.2),transparent_70%)] opacity-60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
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
          Professional Cleaning Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-gray-600 max-w-2xl mx-auto mb-16"
        >
          From homes to offices, our skilled team ensures every corner shines. Choose the service that fits your lifestyle and experience next-level cleanliness.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
              className="group relative bg-white/30 border border-white/40 backdrop-blur-xl rounded-3xl p-8 text-left shadow-lg hover:shadow-amber-200/50 transition-all duration-300 overflow-hidden"
            >
              {/* Glow layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 bg-amber-100/70 rounded-2xl group-hover:bg-amber-200/90 transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">{service.desc}</p>

              {/* Floating sparkles animation */}
              <motion.div
                className="absolute bottom-4 right-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: -2 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
