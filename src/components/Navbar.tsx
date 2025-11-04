import { useState } from "react"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const links = ["Home", "About", "Pricing", "Service", "Contact"]

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 md:py-4">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/av-logo.png"
            alt="Ocean Clean Logo"
            className="w-20 h-13 object-contain transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
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

        {/* Mobile Menu Icon */}
        <Menu
          className="md:hidden cursor-pointer text-gray-800"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4 border-t border-gray-100">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
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
      )}
    </nav>
  )
}

export default Navbar
