"use client"

import { useEffect, useState, useMemo, type FC } from "react"
import { useTranslation } from "react-i18next"
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
  const { t } = useTranslation()
  const [showTopBtn, setShowTopBtn] = useState(false)

  // Memoize links to prevent re-renders
  const navLinks = useMemo(() => [
    { name: t('footer.links.home'), href: "#" },
    { name: t('footer.links.about'), href: "#" },
    { name: t('footer.links.services'), href: "#" },
    { name: t('footer.links.pricing'), href: "#" },
    { name: t('footer.links.contact'), href: "#" },
  ], [t])

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">{t('footer.brand')}</h2>
            <p className="text-slate-300 mb-6">{t('footer.description')}</p>
            <Button className="bg-primary hover:bg-amber-600 text-white rounded-full px-6 py-2 transition-all">
              {t('footer.book_button')}
            </Button>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('footer.contact_title')}</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-blue-400" /> +254 769 344 703
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-blue-400" /> hello@averracleaners.com
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400" /> {t('footer.location')}
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('footer.links_title')}</h3>
            <ul className="space-y-3 text-slate-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-blue-400 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            {[Instagram, Linkedin, Twitter, Youtube, Facebook].map((Icon, idx) => (
              <a key={idx} href="#" className="p-2 rounded-full border border-slate-800 hover:border-blue-500 hover:bg-blue-500/10 text-blue-400 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>

      {showTopBtn && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 bg-primary hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  )
}

export default Footer