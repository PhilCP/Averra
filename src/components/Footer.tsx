import { useEffect, useState, type FC } from "react"
import {
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react"
import { Button } from "./ui/button"

const Footer: FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-t from-amber-100 via-amber-50 to-white text-gray-800 pt-20 pb-10 overflow-hidden">
      {/* Soft background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.15),transparent_50%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          {/* Brand & CTA */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Averra Cleaners
            </h2>
            <p className="text-gray-600 mb-6">
              Premium home & office cleaning services across Nairobi.
              Reliable, professional, and spotless results every time.
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6 py-2 transition-all">
              Book a Cleaning
            </Button>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-amber-500" /> +254 769 344 703
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-amber-500" /> hello@averracleaners.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500" /> Kilimani, Nairobi
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Services", "Pricing", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-10"></div>

        {/* Social & copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex gap-4">
            {[Instagram, Linkedin, Twitter, Youtube, Facebook].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2 rounded-full border border-amber-200 hover:border-amber-500 hover:bg-amber-500/10 text-amber-600 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Averra Cleaners Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  )
}

export default Footer
