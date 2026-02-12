"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  Sparkles,
  Home,
  Building2,
  Briefcase,
  GraduationCap,
  Hotel,
  Utensils,
  MapPin,
  Phone,
} from "lucide-react"
import { useTranslation } from "react-i18next"

// ======= Types =======
type KenyaPlan = {
  type: string
  price: string
  desc: string
}

type ServiceItem = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  items: string[]
}

type PricingItem = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  price: string
}

type ContactInfo = {
  office: string
  address: string
  phone: string
}

// ======= Component =======
export default function Pricing() {
  const { t } = useTranslation()
  const [region, setRegion] = useState<"kenya" | "drc">("kenya")

  // ======= Helpers for typing i18n =======
  const tArray = (key: string) => t(key, { returnObjects: true }) as string[]
  const tObj = <T extends object>(key: string) => t(key, { returnObjects: true }) as T

  // ======= Kenya =======
  const kenyaPlans: KenyaPlan[] = tObj<KenyaPlan[]>("pricing1.kenyaPlans")
  const kenyaIncludes: string[] = tArray("pricing1.kenyaIncludes")

  // ======= DRC =======
  const drcServices: ServiceItem[] = [
    { icon: Home, title: t("pricing1.drc.services.0.title"), items: tArray("pricing1.drc.services.0.items") },
    { icon: Building2, title: t("pricing1.drc.services.1.title"), items: tArray("pricing1.drc.services.1.items") },
    { icon: Sparkles, title: t("pricing1.drc.services.2.title"), items: tArray("pricing1.drc.services.2.items") },
  ]

  const drcPricing: PricingItem[] = [
    { icon: Briefcase, title: t("pricing1.drc.pricing.0.title"), price: t("pricing1.drc.pricing.0.price") },
    { icon: GraduationCap, title: t("pricing1.drc.pricing.1.title"), price: t("pricing1.drc.pricing.1.price") },
    { icon: Hotel, title: t("pricing1.drc.pricing.2.title"), price: t("pricing1.drc.pricing.2.price") },
    { icon: Utensils, title: t("pricing1.drc.pricing.3.title"), price: t("pricing1.drc.pricing.3.price") },
  ]

  const drcContact: ContactInfo = tObj<ContactInfo>("pricing1.drc.contact")

  // ======= Render =======
  return (
    <section id="pricing" className="relative py-24 bg-slate-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full mb-4 inline-block">
            {t("pricing1.header")}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t("pricing1.title")}
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            {t("pricing1.description")}
          </p>

          {/* Toggle Button */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex gap-2">
              <button
                onClick={() => setRegion("kenya")}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                  region === "kenya" ? "bg-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {t("pricing1.toggle.kenya")}
              </button>
              <button
                onClick={() => setRegion("drc")}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
                  region === "drc" ? "bg-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                {t("pricing1.toggle.drc")}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {region === "kenya" ? (
            <motion.div
              key="kenya"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              {/* Kenya Plans */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kenyaPlans.map((plan, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full hover:border-sky-200 transition-colors">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{plan.type}</h3>
                    <div className="text-3xl font-bold text-blue-400 mb-4">{plan.price}</div>
                    <p className="text-slate-500 text-sm leading-relaxed flex-grow">{plan.desc}</p>
                  </div>
                ))}
              </div>

              {/* Kenya Includes */}
              <div className="bg-sky-900 rounded-[2.5rem] p-10 md:p-14 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="max-w-md">
                    <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center mb-6">
                      <Sparkles className="text-sky-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t("pricing1.everyPlanIncludes")}</h3>
                    <p className="text-sky-200/70">{t("pricing1.everyPlanDescription")}</p>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm font-medium">
                    {kenyaIncludes.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="drc"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-12"
            >
              {/* DRC Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {drcServices.map((service, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col h-full">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="text-blue-400 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">{service.title}</h3>
                    <ul className="space-y-4 flex-grow">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm text-slate-600">
                          <div className="mt-1 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* DRC Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {drcPricing.map((p, i) => (
                  <div key={i} className="group bg-slate-900 hover:bg-slate-800 transition-all p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                      <p.icon className="w-5 h-5 text-white/70 group-hover:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">{p.title}</h4>
                      <p className="text-white font-bold">{p.price}<span className="text-[10px] text-white/30 ml-1">/ mois</span></p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DRC Contact */}
              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                    <MapPin className="text-orange-600 w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900">{drcContact.office}</h4>
                    <p className="text-sm text-slate-500">{drcContact.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                   <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-bold text-slate-700">{drcContact.phone}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
