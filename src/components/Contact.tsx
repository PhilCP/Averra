"use client"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react"
import { Button } from "./ui/button"

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.15),transparent_70%)] opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SIDE – Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl border border-blue-100 shadow-lg flex flex-col justify-center"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Let’s Connect !
          </h2>
          <p className="text-gray-600 mb-10 text-lg leading-relaxed">
            Have a question, need assistance, or want to book a cleaning?
            Reach out we’d love to hear from you.
          </p>

          <ul className="space-y-5 text-gray-700 mb-10">
            <li className="flex items-center gap-3">
              <Clock className="text-blue-600 w-5 h-5" />
              <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-blue-600 w-5 h-5" />
              <span>+254 712 345 678</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-blue-600 w-5 h-5" />
              <span>info@averracleaners.co.ke</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-blue-600 w-5 h-5" />
              <span>Nairobi, Kenya</span>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-5">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 bg-white/60 rounded-full shadow-md border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE – Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl border border-blue-100 shadow-lg"
        >
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h3>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-200 bg-white/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-white/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-xl border border-gray-200 bg-white/70 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 p-3 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all">
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
