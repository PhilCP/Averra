import {  useState } from "react"
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
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-snug">
            Get Answers to Common Questions About Our Services
          </h2>

          <Accordion type="single" collapsible className="w-full mb-10">
            <AccordionItem value="item-1">
              <AccordionTrigger>What do you not clean?</AccordionTrigger>
              <AccordionContent>
                We do not clean hazardous materials, outdoor areas, or electrical appliances.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do I need to be home for every cleaning service?
              </AccordionTrigger>
              <AccordionContent>
                Not necessarily! Many clients provide access codes or keys so we can clean while they’re away.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How will our relationship work?</AccordionTrigger>
              <AccordionContent>
                We start with an initial deep clean, followed by scheduled maintenance cleans as per your plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What time does your team arrive?</AccordionTrigger>
              <AccordionContent>
                We usually start appointments between 8 AM and 5 PM, depending on your selected schedule.
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
