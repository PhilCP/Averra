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
  Home,
  Info,
  Briefcase,
  DollarSign,
  PhoneCall,
} from "lucide-react"

const Footer: FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  // Show the button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true)
      else setShowTopBtn(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-white-300 text-black-300 pt-12 relative overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_#fbbf24,_transparent_40%)]"></div>

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative inline-block">
            Contact
            <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-amber-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition">
              <Mail className="w-4 h-4 text-amber-500" />
              help@averra.com
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <Phone className="w-4 h-4 text-amber-500" />
              +254 123 456 7890
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative inline-block">
            Address
            <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-amber-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition">
              <MapPin className="w-4 h-4 text-amber-500" />
              Kilimani, Nairobi
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative inline-block">
            Social
            <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-amber-500 rounded-full"></span>
          </h3>
          <div className="flex flex-wrap gap-5">
            {[Instagram, Linkedin, Twitter, Youtube, Facebook].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2 rounded-full border border-gray-700 hover:border-amber-500 hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 relative inline-block">
            Quick Links
            <span className="absolute left-0 -bottom-1 w-8 h-[2px] bg-amber-500 rounded-full"></span>
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition">
              <Home className="w-4 h-4 text-amber-500" />
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <Info className="w-4 h-4 text-amber-500" />
              <a href="/about" className="hover:underline">About Us</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <Briefcase className="w-4 h-4 text-amber-500" />
              <a href="/services" className="hover:underline">Services</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <DollarSign className="w-4 h-4 text-amber-500" />
              <a href="/pricing" className="hover:underline">Pricing</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition">
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 text-center border-t border-gray-800 text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} Averra Cleaning Services. All Rights Reserved.
      </div>

      {/* Back to Top Button */}
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
