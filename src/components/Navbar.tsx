import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const links = ["Home", "About", "Pricing", "Service", "Contact"];

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Smooth scroll for all links
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
    setOpen(false); // close mobile menu
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
            alt="Ocean Clean Logo"
            className="w-38 h-26 object-contain transition-transform duration-300 hover:scale-110"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
                className="relative text-gray-800 hover:text-primary font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 py-2 transition"
          >
            Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 transition">
            Sign Up
          </Button>
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
                href={`#${link.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, link.toLowerCase())}
                className="text-gray-800 hover:text-primary font-medium transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 mt-4 px-6">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white rounded-full transition"
          >
            Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full transition">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
