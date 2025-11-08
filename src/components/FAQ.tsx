import { useState } from "react"
import type { FC } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"

const FAQ: FC = () => {
  const [hovered, setHovered] = useState<"one" | "two" | null>(null)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-6 items-center">
        {/* LEFT: FAQ content */}
        <div>
          <p className="text-sm text-primary tracking-widest uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-snug">
            Your Questions, Answered
          </h2>

          <Accordion type="single" collapsible className="w-full mb-10">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What’s included in the monthly cleaning package?
              </AccordionTrigger>
              <AccordionContent>
                Our monthly cleaning package covers everything — dishes, laundry, ironing, kitchen and bathroom deep cleaning, appliances, carpets, and more. You get 8 thorough cleanings per month (twice a week).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I choose my cleaning days?</AccordionTrigger>
              <AccordionContent>
                Yes! You can select the days that best fit your schedule. We’re flexible and adjust to your preferred routine.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How do payments work?</AccordionTrigger>
              <AccordionContent>
                Payments are made monthly in advance through your preferred method — mobile money, card, or bank transfer. There are no hidden fees or add-ons.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Do you bring your own cleaning supplies?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Our team brings high-quality, eco-friendly cleaning products and professional tools to every visit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What if I’m not satisfied with the service?</AccordionTrigger>
              <AccordionContent>
                Your satisfaction is guaranteed. If you’re not happy, we’ll schedule a free re-clean or resolve the issue promptly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* RIGHT: Layered Images with Hover Interaction */}
        <div className="relative w-full flex justify-center items-center">
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-amber-400 rounded-full blur-xl opacity-30" />
          <div className="absolute bottom-10 right-6 w-14 h-14 bg-amber-400 rounded-full blur-2xl opacity-20" />

          {/* Image 1 */}
          <div
            onMouseEnter={() => setHovered("one")}
            onMouseLeave={() => setHovered(null)}
            className={`absolute top-8 left-10 w-2/3 rounded-3xl overflow-hidden shadow-lg border-4 border-white transition-all duration-500
              ${hovered === "one" ? "z-20 scale-105 rotate-0" : "z-0 rotate-[-2deg]"}`}
          >
            <img
              src="/averra-hero.jpg"
              alt="Cleaning background"
              className="object-cover w-full h-[220px] transition-transform duration-500"
            />
          </div>

          {/* Image 2 */}
          <div
            onMouseEnter={() => setHovered("two")}
            onMouseLeave={() => setHovered(null)}
            className={`relative w-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white transition-all duration-500
              ${hovered === "two" ? "z-20 scale-105 rotate-0" : "z-10 rotate-[2deg]"}`}
          >
            <img
              src="/averra-hero.jpg"
              alt="Cleaning detail"
              className="object-cover w-full h-[260px] transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
