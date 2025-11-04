import { motion } from "framer-motion"
import type {Variants} from "framer-motion"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Pricing from "./components/Pricing"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Faq from "./components/FAQ"
import Banner from "./components/CTASection"
import Footer from "./components/Footer"
import Services from "./components/Services"

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
}

function App() {
  return (
    <div className="font-sans bg-gray-50 overflow-x-hidden">
      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.section variants={sectionVariants}>
          <Hero />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <About />
        </motion.section>
        <motion.section variants={sectionVariants}>
          <Services />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Pricing />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Testimonials />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Contact />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Faq />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Banner />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Footer />
        </motion.section>
      </motion.div>
    </div>
  )
}

export default App
