import { useState, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"

const images = ["/cleaning-1.jpg", "/cleaning-2.jpg", "/cleaning-4.jpg"]

// ✅ Animated number counter
const AnimatedNumber = ({ value }: { value: number }) => {
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest).toLocaleString())
      },
    })
    return controls.stop
  }, [value, count])

  return (
    <motion.h3
      className="text-3xl md:text-4xl font-bold text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayValue}
      <span className="text-amber-500">+</span>
    </motion.h3>
  )
}

const About = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT: INTERACTIVE IMAGES */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-full md:w-[500px] h-[400px] flex justify-center items-center">
            {images.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Cleaning ${i + 1}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`absolute rounded-3xl object-cover shadow-2xl border-4 border-white cursor-pointer transition-all duration-700 ease-out
                  ${i === 0 ? "w-[80%] h-[70%] top-0 left-6 rotate-[-3deg]" : ""}
                  ${i === 1 ? "w-[85%] h-[75%] top-10 right-8 rotate-[2deg]" : ""}
                  ${i === 2 ? "w-[75%] h-[65%] bottom-8 left-10 rotate-[-2deg]" : ""}
                `}
                animate={{
                  zIndex: activeIndex === i ? 10 : 0,
                  scale: activeIndex === i ? 1.1 : 1,
                  rotate:
                    activeIndex === i
                      ? 0
                      : i === 0
                      ? -3
                      : i === 1
                      ? 2
                      : -2,
                  opacity: activeIndex === null || activeIndex === i ? 1 : 0.6,
                  filter:
                    activeIndex === i
                      ? "brightness(1.05)"
                      : "brightness(0.9)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            ))}

            {/* Decorative glows */}
            <div className="absolute -top-10 left-0 w-16 h-16 bg-amber-400 rounded-full blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-amber-300 rounded-full blur-2xl opacity-20" />
          </div>
        </div>

        {/* RIGHT: TEXT CONTENT */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-semibold uppercase mb-3 tracking-widest">
            About Averra Cleaners
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Clean Home is a Better Life
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            At <span className="font-semibold text-gray-900">Averra Cleaners </span>, we’re redefining home cleaning in Nairobi.
Our team goes beyond surface cleaning delivering complete, all-inclusive care that
covers
            Our experienced team provides <span className="text-amber-500">residential </span> 
            and <span className="text-amber-500">laundry, dishes, appliances, steam cleaning, fabric care</span> under one simple monthly plan
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            At Averra Cleaners, we’re redefining home cleaning in Nairobi.
Our team goes beyond surface cleaning delivering complete, all-inclusive care that
covers laundry, dishes, appliances, steam cleaning, and fabric care under one simple monthly
plan.
We proudly serve all major Nairobi neighborhoods, including Lavington, Kileleshwa,
Kilimani, Westlands, Runda, Karen, Parklands, and Lang’ata etc. ensuring every home we
touch feels fresh, peaceful, and premium.
Trusted by Nairobi homeowners | Built on quality, reliability, and care | 100% satisfaction
guaranteed
From laundry to steam-cleaning, Averra does it all twice a week.”
Every detail. Every room. One flat fee.
          </p>

          {/* Animated Stats Section */}
          <div className="flex items-center gap-10 mb-10">
            <div className="text-center">
              <AnimatedNumber value={53000} />
              <p className="text-gray-500 text-sm">Layouts Cleaned</p>
            </div>
            <div className="text-center">
              <AnimatedNumber value={10000} />
              <p className="text-gray-500 text-sm">Projects Completed</p>
            </div>
            <div className="text-center">
              <AnimatedNumber value={150} />
              <p className="text-gray-500 text-sm">Awards Won</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
