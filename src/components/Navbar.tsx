"use client";

import { useState, useEffect } from "react";
// import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
const [open, setOpen] = useState(false);
const [show, setShow] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

const { t, i18n } = useTranslation();
const links = ["home", "about", "pricing", "service", "contact"];

// Hide / show navbar on scroll
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

// Lock body scroll when mobile menu open
useEffect(() => {
document.body.style.overflow = open ? "hidden" : "";
return () => {
document.body.style.overflow = "";
};
}, [open]);

const handleLinkClick = (
e: React.MouseEvent<HTMLAnchorElement>,
id: string
) => {
e.preventDefault();
document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
setOpen(false);
};

const changeLanguage = (lang: string) => {
if (i18n.language !== lang) {
i18n.changeLanguage(lang);
}
};

const desktopLinkClass =
"relative text-gray-800 hover:text-primary font-semibold transition-colors " +
"after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 " +
"after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

return (
<>
{/* Navbar */}
<nav
className={`fixed w-full z-50 transition-transform duration-300 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
> <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
{/* Logo */} <a href="#home" className="flex items-center gap-3"> <img
           src="/av-logo.png"
           alt="Logo"
           className="w-[200px] h-[90px] object-contain transition-transform duration-300 hover:scale-110"
         /> </a>


      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link}`}
              onClick={(e) => handleLinkClick(e, link)}
              className={desktopLinkClass}
            >
              {t(link)}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {/* <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 transition"
        >
          {t("login")}
        </Button>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition">
          {t("signup")}
        </Button> */}

        {/* Language */}
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

      {/* Mobile Menu Button */}
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
          <Menu className="w-5 h-5 text-gray-800" />
        </span>
      </button>
    </div>
  </nav>

  {/* Backdrop */}
  <div
    onClick={() => setOpen(false)}
    className={`md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    }`}
  />

  {/* Mobile Drawer */}
  <div
    className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 transition-transform duration-500 ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
    style={{
      background:
        "linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #0c2340 100%)",
      boxShadow: "-8px 0 40px rgba(0,168,232,0.15)",
      transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
    }}
  >
    {/* Glow Top */}
    <div
      className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 pointer-events-none"
      style={{
        background: "radial-gradient(circle, #00a8e8 0%, transparent 70%)",
        transform: "translate(30%, -30%)",
      }}
    />

    {/* Glow Bottom */}
    <div
      className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
      style={{
        background: "radial-gradient(circle, #2b5ca8 0%, transparent 70%)",
        transform: "translate(-30%, 30%)",
      }}
    />

    <div className="relative h-full flex flex-col px-8 pt-24 pb-10 overflow-y-auto">
      {/* Links */}
      <ul className="flex flex-col gap-1 mb-10">
        {links.map((link, i) => (
          <li key={link}>
            <a
              href={`#${link}`}
              onClick={(e) => handleLinkClick(e, link)}
              className="group flex items-center gap-4 py-3 text-white/80 hover:text-white font-medium text-lg transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-200" />

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

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        {/* <Button
          variant="outline"
          className="border-primary/60 text-primary hover:bg-primary hover:text-white rounded-full transition w-full"
        >
          {t("login")}
        </Button>

        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full transition w-full shadow-lg shadow-primary/25">
          {t("signup")}
        </Button> */}
      </div>

      {/* Language */}
      <div className="flex gap-5 mt-8 justify-center">
        {[
          { code: "en", flag: "🇬🇧" },
          { code: "fr", flag: "🇫🇷" },
        ].map(({ code, flag }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            className={`text-3xl transition-all duration-200 hover:scale-110 ${
              i18n.language === code
                ? "opacity-100"
                : "opacity-30 hover:opacity-60"
            }`}
            style={
              i18n.language === code
                ? { filter: "drop-shadow(0 0 8px rgba(0,168,232,0.8))" }
                : {}
            }
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  </div>
</>
);
}

export default Navbar;
