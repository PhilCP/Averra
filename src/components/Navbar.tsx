"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Smooth scroll
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
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

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 transition"
          >
            {t("login")}
          </Button>

          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition">
            {t("signup")}
          </Button>

          {/* Language Switcher (Click Flags) */}
          <div className="flex items-center gap-2 ml-3 text-2xl">
            <button
              onClick={() => changeLanguage("en")}
              className={`transition transform hover:scale-110 ${
                i18n.language === "en" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇬🇧
            </button>

            <button
              onClick={() => changeLanguage("fr")}
              className={`transition transform hover:scale-110 ${
                i18n.language === "fr" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇫🇷
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {open ? (
            <X
              className="cursor-pointer text-gray-800"
              onClick={() => setOpen(false)}
            />
          ) : (
            <Menu
              className="cursor-pointer text-gray-800"
              onClick={() => setOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[500px] py-4" : "max-h-0"
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
          <div className="flex gap-4 mt-4 text-3xl justify-center">
            <button
              onClick={() => changeLanguage("en")}
              className={`transition ${
                i18n.language === "en" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇬🇧
            </button>

            <button
              onClick={() => changeLanguage("fr")}
              className={`transition ${
                i18n.language === "fr" ? "opacity-100" : "opacity-40"
              }`}
            >
              🇫🇷
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;