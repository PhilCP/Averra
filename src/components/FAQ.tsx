"use client"

import { useState, useMemo, type FC } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next" // Import hook
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion"
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  ArrowRight, 
  X,
  ShieldCheck
} from "lucide-react"

const FAQ: FC = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  // Map the JSON array from our translation files
  const faqs = useMemo(() => {
    return t('faq.questions', { returnObjects: true }) as Array<{ q: string, a: string }>
  }, [t])

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, faqs])

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 right-[-5%] text-[15vw] font-black text-slate-50 select-none pointer-events-none uppercase">
        {t('faq.bg_text')}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <HelpCircle className="text-white w-5 h-5" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                {t('faq.badge')}
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter leading-[1.1] mb-8">
              {t('faq.title_part1')} <br />{t('faq.title_part2')}
            </h2>

            {/* Search Bar */}
            <div className="relative max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={18} />
              <input 
                type="text"
                placeholder={t('faq.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-12 text-slate-900 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </motion.div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => (
                  <motion.div
                    key={faq.q}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <AccordionItem 
                      value={`item-${i}`}
                      className="border-none bg-slate-50 rounded-[2rem] px-8 transition-all data-[state=open]:bg-white data-[state=open]:shadow-2xl data-[state=open]:shadow-blue-900/5"
                    >
                      <AccordionTrigger className="text-left text-lg font-bold text-slate-900 py-6 hover:no-underline hover:text-blue-400 transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-500 text-base leading-relaxed pb-6">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-[2rem]">
                   <p className="text-slate-400 italic">
                     {t('faq.no_results', { query: searchQuery })}
                   </p>
                </div>
              )}
            </AnimatePresence>
          </Accordion>

          {/* Quick Contact Banner */}
          <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-white">
              <MessageCircle className="w-8 h-8 text-blue-400" />
              <div className="text-center sm:text-left">
                <p className="font-bold text-lg leading-tight">{t('faq.cta.title')}</p>
                <p className="text-slate-400 font-medium text-sm">{t('faq.cta.subtitle')}</p>
              </div>
            </div>
            <button className="bg-blue-400 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-blue-400 transition-all flex items-center gap-2 shrink-0">
              {t('faq.cta.button')} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT Side */}
        <div className="lg:col-span-5 sticky top-32 hidden lg:block">
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white z-10"
            >
              <img
                src="/cleaning-1.jpg" 
                alt="Service"
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-400 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-tight">{t('faq.vetted_badge.title')}</p>
                    <p className="text-blue-100 text-xs font-medium">{t('faq.vetted_badge.subtitle')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ