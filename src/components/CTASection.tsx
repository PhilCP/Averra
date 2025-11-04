import { motion } from "framer-motion"
import { Button } from "./ui/button"

const CTASection = () => {
  return (
    <section className="relative py-6 overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      {/* Animated Gradient Glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,150,255,0.15),transparent_70%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_60%)]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-400/40 rounded-full blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [Math.random() * 500, Math.random() * -500],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-6">
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white via-sky-400 to-gray-400 bg-clip-text text-transparent">
            Ready to Experience a Cleaner Tomorrow?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl">
            Join hundreds of satisfied clients who’ve elevated their spaces with
            our professional cleaning solutions. Let’s make your world shine.
          </p>
        </motion.div>

        {/* Button Section */}
        <motion.div
          className="flex flex-wrap justify-center md:justify-end gap-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Button className="px-4 py-2 rounded-full text-lg font-semibold bg-gradient-to-r from-sky-500 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white shadow-lg hover:shadow-sky-500/40 transition-all duration-300">
            Get Started
          </Button>

          
        </motion.div>
      </div>
    </section>
  )
}

export default CTASection
