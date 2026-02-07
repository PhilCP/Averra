"use client"

import { motion } from "framer-motion"
import { 
  Waves, 
  Wind, 
  Layers, 
  CalendarDays,

  CheckCircle2,
  Sparkles
} from "lucide-react"

export default function Services() {
  const serviceGroups = [
    {
      title: "Core Essentials",
      description: "Daily living care that keeps the rhythm of your home perfect.",
      icon: Waves,
      items: ["Dishes & Laundry Care", "Surface Dusting & Mopping", "Light Organization"],
      delay: 0.1
    },
    {
      title: "Deep Sanitation",
      description: "Surgical-level hygiene for the most important areas.",
      icon: Wind,
      items: ["Steam Sanitization", "Appliance Detailing", "Full Home Sanitizing"],
      delay: 0.2
    },
    {
      title: "Textile Luxury",
      description: "Restoring the original feel of your premium upholstery.",
      icon: Layers,
      items: ["Carpet & Sofa Deep Clean", "Mattress Hygiene", "Fabric Detailing"],
      delay: 0.3
    }
  ]

  return (
    <section id="services" className="relative py-32 bg-gray-200 overflow-hidden">
      {/* Visual Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[30%] h-[50%] bg-sky-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">The Averra Standard</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] tracking-tighter mb-8"
          >
            Everything included. <br />
            <span className="text-slate-300">Nothing overlooked.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-500 leading-relaxed max-w-xl"
          >
            A comprehensive cleaning plan designed to maintain a spotless residence 
            without the need for complex add-ons or hidden fees.
          </motion.p>
        </div>

        {/* Dynamic Service Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {serviceGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: group.delay, duration: 0.6 }}
              className="group relative bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-blue-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.1)] transition-all duration-500"
            >
              {/* Icon & Category */}
              <div className="flex items-start justify-between mb-12">
                <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <group.icon size={32} strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-2">
                  0{idx + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">{group.title}</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">{group.description}</p>
              
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <CheckCircle2 size={12} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900 transition-colors italic">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* High-Impact Value Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-950 rounded-[3rem] p-1 md:p-2 shadow-2xl overflow-hidden"
        >
          <div className="relative bg-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 backdrop-blur-3xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center rotate-3 shadow-xl">
                  <CalendarDays className="text-white w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">
                  8x
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="text-white text-3xl font-bold tracking-tight mb-2">Twice a Week Schedule</h4>
                <p className="text-slate-400 font-medium">Full consistency. 8 deep sessions per month included by default.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="hidden sm:flex flex-col items-end justify-center px-6 border-r border-white/10">
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Pricing Model</span>
                <span className="text-white font-bold italic">All-Inclusive</span>
              </div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-slate-950 transition-all cursor-default group">
                <Sparkles size={24} className="group-hover:animate-spin" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}