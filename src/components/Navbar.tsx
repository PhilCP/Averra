"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();
  const links = ["home", "about", "pricing", "service", "contact"];

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close language dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Smooth scroll
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/av-logo.png"
            alt="Logo"
            className="w-38 h-26 object-contain transition-transform duration-300 hover:scale-110"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={(e) => handleLinkClick(e, link)}
                className="relative text-gray-800 hover:text-primary font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {t(link)}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons + Language Dropdown */}
        <div className="hidden md:flex items-center gap-4 relative">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 transition"
          >
            {t("login")}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition">
            {t("signup")}
          </Button>

          {/* Language Dropdown */}
          <div ref={langRef} className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center   transition text-xl"
            >
              {i18n.language === "en" ? "🇬🇧" : "🇫🇷"}
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
                <button
                  className="px-2 py-2 text-center hover:bg-gray-100 text-xl"
                  onClick={() => changeLanguage("en")}
                >
                  🇬🇧
                </button>
                <button
                  className="px-2 py-2 text-center hover:bg-gray-100 text-xl"
                  onClick={() => changeLanguage("fr")}
                >
                  🇫🇷
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {open ? (
            <X className="cursor-pointer text-gray-800" onClick={() => setOpen(false)} />
          ) : (
            <Menu className="cursor-pointer text-gray-800" onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link}`}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-gray-800 hover:text-primary font-medium transition-colors"
              >
                {t(link)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 mt-4 px-6">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white rounded-full transition"
          >
            {t("login")}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full transition">
            {t("signup")}
          </Button>

          {/* Mobile Language Switcher */}
          <div className="flex gap-2 mt-2 text-2xl">
            <button onClick={() => changeLanguage("en")}>🇬🇧</button>
            <button onClick={() => changeLanguage("fr")}>🇫🇷</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
