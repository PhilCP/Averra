"use client"

import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function ContactSection() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"kenya" | "drc">("kenya")

  // Safely fetch the services array
  const services = t("contact2.form.services", { returnObjects: true }) as string[];

  return (
    <section id="contact" className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-100/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                {t("contact2.header")}
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                {t("contact2.title")}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t("contact2.subtitle")}</p>
            </motion.div>

            {/* Region Switcher */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-flex gap-2">
              {(["kenya", "drc"] as const).map((region) => (
                <button 
                  key={region}
                  onClick={() => setActiveTab(region)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === region ? "bg-primary text-white shadow-md" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {t(`contact2.tabs.${region}`)}
                </button>
              ))}
            </div>

            {/* Contact Bento */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {t("contact2.callUs")}
                </p>
                <p className="text-slate-900 font-bold">{t(`contact2.phone.${activeTab}`)}</p>
              </div>

              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-sky-600" />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {t("contact2.emailUs")}
                </p>
                <p className="text-slate-900 font-bold">{t("contact2.email")}</p>
              </div>

              <div className="sm:col-span-2 bg-slate-900 p-6 rounded-3xl shadow-lg text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{t("contact2.fastResponse")}</p>
                    <p className="text-xs text-slate-400">{t("contact2.fastResponseDesc")}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-400 opacity-50" />
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-6 pt-4">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {t("contact2.followUs")}
              </span>
              <div className="flex gap-3">
                {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-400 hover:text-white hover:scale-110 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 relative mt-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2 h-8 bg-blue-400 rounded-full" />
                <h3 className="text-2xl font-bold text-slate-900">{t("contact2.form.header")}</h3>
              </div>

              <form className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    {t("contact2.form.fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    {t("contact2.form.emailAddress")}
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    {t("contact2.form.serviceCategory")}
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all appearance-none">
                    {Array.isArray(services) && services.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                    {t("contact2.form.message")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your space..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button type="submit" className="sm:col-span-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-3 group transition-all active:scale-[0.98]">
                  <span>{t("contact2.form.submit")}</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>

              <div className="absolute top-[-20px] right-[-20px] w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl rotate-12 hidden md:flex">
                <MessageSquare className="text-white w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}