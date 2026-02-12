"use client"

import { motion } from "framer-motion"
import { 
  Waves, Wind, Layers, CheckCircle2,
} from "lucide-react"
import { useTranslation } from "react-i18next"

export default function Services() {
  const { t } = useTranslation()

 const serviceGroups = [
  {
    title: t("services.core.title"),
    description: t("services.core.description"),
    icon: Waves,
    items: t("services.core.items", { returnObjects: true }) as string[],
    delay: 0.1
  },
  {
    title: t("services.deep.title"),
    description: t("services.deep.description"),
    icon: Wind,
    items: t("services.deep.items", { returnObjects: true }) as string[],
    delay: 0.2
  },
  {
    title: t("services.textile.title"),
    description: t("services.textile.description"),
    icon: Layers,
    items: t("services.textile.items", { returnObjects: true }) as string[],
    delay: 0.3
  }
]


  return (
    <section id="services" className="relative py-32 bg-gray-200 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
              {t("services.header")}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.95] tracking-tighter mb-8"
          >
            {t("services.title.main")} <br />
            <span className="text-slate-300">{t("services.title.sub")}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-500 leading-relaxed max-w-xl"
          >
            {t("services.description")}
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
                {group.items.map((item: string, i: number) => (
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
      </div>
    </section>
  )
}
