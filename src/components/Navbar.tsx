"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const links = ["home", "about", "pricing", "service", "contact"];

  // Add subtle background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) i18n.changeLanguage(lang);
  };

  return (
    <>
      {/* ── Floating language pill (mobile only) ── */}
      <div
        className="md:hidden fixed right-4 top-1/2 -translate-y-1/2 z-[70] flex flex-col gap-2 items-center"
        style={{
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(12px)",
          borderRadius: "999px",
          padding: "8px 6px",
          boxShadow: "0 4px 24px rgba(0,168,232,0.2), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {[{ code: "en", flag: "🇬🇧" }, { code: "fr", flag: "🇫🇷" }].map(({ code, flag }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            aria-label={`Switch to ${code}`}
            className="text-xl transition-all duration-200 hover:scale-110"
            style={
              i18n.language === code
                ? { opacity: 1, filter: "drop-shadow(0 0 6px rgba(0,168,232,0.9))" }
                : { opacity: 0.3 }
            }
          >
            {flag}
          </button>
        ))}
      </div>

      {/* ── Navbar ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, "home")} className="flex items-center shrink-0">
            <img
              src="/av-logo.png"
              alt="Logo"
              className="w-[160px] h-[72px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={
                    "relative text-gray-700 hover:text-primary font-semibold text-[0.9rem] tracking-wide transition-colors " +
                    "after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] " +
                    "after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-full"
                  }
                >
                  {t(link)}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop: Language + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div
              className="flex items-center gap-1 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(15,23,42,0.06)",
                border: "1px solid rgba(15,23,42,0.08)",
              }}
            >
              {[{ code: "en", flag: "🇬🇧" }, { code: "fr", flag: "🇫🇷" }].map(({ code, flag }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  aria-label={`Switch to ${code}`}
                  className="text-xl transition-all duration-200 hover:scale-110 px-0.5"
                  style={
                    i18n.language === code
                      ? { opacity: 1 }
                      : { opacity: 0.35 }
                  }
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-300 ${
                open ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
            >
              <X className="w-5 h-5 text-primary" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              }`}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </span>
          </button>
        </div>

        {/* Desktop: thin accent line at bottom */}
        <div
          className="hidden md:block h-[1px] w-full"
          style={{
            background: scrolled
              ? "linear-gradient(90deg, transparent, rgba(0,168,232,0.3), transparent)"
              : "transparent",
            transition: "background 0.3s",
          }}
        />
      </nav>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-[75%] max-w-xs z-50 transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 55%, #0c2340 100%)",
          boxShadow: "8px 0 40px rgba(0,168,232,0.15)",
          transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
        }}
      >
        {/* Glow accents */}
        <div
          className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #00a8e8 0%, transparent 70%)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #2b5ca8 0%, transparent 70%)",
            transform: "translate(30%, 30%)",
          }}
        />

        <div className="relative h-full flex flex-col px-8 pt-28 pb-10 overflow-y-auto">
          {/* Brand mark inside drawer */}
          <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Navigation
          </p>

          {/* Links */}
          <ul className="flex flex-col gap-1">
            {links.map((link, i) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="group flex items-center gap-4 py-3 text-white/75 hover:text-white font-medium text-lg transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-200 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {t(link)}
                  </span>
                </a>
                {i < links.length - 1 && (
                  <div className="ml-6 h-px bg-white/5" />
                )}
              </li>
            ))}
          </ul>

          {/* Bottom divider */}
          <div className="mt-auto pt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <p className="text-white/20 text-xs text-center mt-4 tracking-widest uppercase">
              © 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;