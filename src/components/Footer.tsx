"use client"

import { useMemo, type FC } from "react"
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
} from "lucide-react"
import { Button } from "./ui/button"

const Footer: FC = () => {
  const { t } = useTranslation()

  const navLinks = useMemo(() => [
    { name: t("footer.links.home"), href: "#home" },
    { name: t("footer.links.about"), href: "#about" },
    { name: t("footer.links.services"), href: "#service" },
    { name: t("footer.links.pricing"), href: "#pricing" },
    { name: t("footer.links.contact"), href: "#contact" },
  ], [t])

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-24 pb-10 overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      {/* Subtle radial glow behind logo area */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(0,168,232,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand — wider column */}
          <div className="md:col-span-5">
            <a href="#home">
              <img
                src="/av-logo.png"
                alt="Logo"
                className="w-[160px] h-auto object-contain mb-5 opacity-90 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 text-sm font-semibold transition-all shadow-lg shadow-primary/20">
              {t("footer.book_button")}
            </Button>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-5">
              {t("footer.links_title")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-5">
              {t("footer.contact_title")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-slate-300">+243 981 539 797</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@averracleaners.com"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  hello@averracleaners.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-slate-300">{t("footer.location")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">

          {/* Socials */}
          <div className="flex gap-3">
            {[Instagram, Linkedin, Twitter, Youtube, Facebook].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 hover:border-primary/60 hover:bg-primary/10 text-slate-500 hover:text-primary transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright + Developer credit */}
          <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
            <p className="text-xs text-slate-500">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
            <p className="text-xs text-slate-600">
              {t("footer.developed_by")}{" "}
              <a
                href="https://www.terrvio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors duration-200 font-medium"
              >
                Terrvio Technologies
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer