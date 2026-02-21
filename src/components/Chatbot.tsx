import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ANTHROPIC_KEY   = import.meta.env.VITE_ANTHROPIC_KEY as string;
// ⚠️  Make sure your .env file (NOT .env.local) at project root contains:
// VITE_ANTHROPIC_KEY=sk-ant-api03-...
const WHATSAPP_NUMBER = "243981539797";
const CONTACT_EMAIL   = "hello@averracleaners.com";
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM: Record<Lang, string> = {
  en: `You are Averra's friendly virtual assistant for a professional cleaning company in Nairobi, Kenya and Kolwezi, DRC.
Help customers with booking, services, pricing, and FAQs. Be warm, concise, and professional. Respond only in English.
Services: residential, commercial, deep cleaning, steam cleaning, laundry, ironing, appliance detailing, carpet/sofa/mattress care.
Pricing Kenya: Studio Ksh 5,000 | 1BR Ksh 8,000 | 2BR Ksh 13,000 | 3BR Ksh 18,000 | 4BR Ksh 23,500 | 5BR Ksh 25,000.
Pricing DRC: offices $40–300 | schools $150–1,000 | hotels $200–1,500 | restaurants $120–700.
FAQ: 8 sessions/month, payment via M-Pesa/Airtel/card/bank transfer, eco-friendly supplies, all staff background-checked.
Contact: hello@averracleaners.com | Kenya: +254 769 344 703 | DRC: +243 998 723 522.`,
  fr: `Vous êtes l'assistante virtuelle d'Averra, entreprise de nettoyage professionnel à Nairobi (Kenya) et Kolwezi (RDC).
Aidez les clients pour les réservations, services, tarifs et FAQ. Soyez chaleureuse, concise et professionnelle. Répondez uniquement en français.
Services : résidentiel, commercial, nettoyage en profondeur, vapeur, lessive, repassage, appareils, tapis/canapé/matelas.
Tarifs Kenya : Studio 5 000 Ksh | 1ch. 8 000 Ksh | 2ch. 13 000 Ksh | 3ch. 18 000 Ksh | 4ch. 23 500 Ksh | 5ch. 25 000 Ksh.
Tarifs RDC : bureaux 40–300$ | écoles 150–1 000$ | hôtels 200–1 500$ | restaurants 120–700$.
FAQ : 8 séances/mois, paiement M-Pesa/Airtel/carte/virement, fournitures écologiques, personnel vérifié.
Contact : hello@averracleaners.com | Kenya : +254 769 344 703 | RDC : +243 998 723 522.`,
};

const GREETING: Record<Lang, string> = {
  en: "Hi there! 👋 I'm Averra's assistant. I can help you book a cleaning, explore our services, or answer any questions. How can I help you today?",
  fr: "Bonjour ! 👋 Je suis l'assistante Averra. Je peux vous aider à réserver un nettoyage, explorer nos services ou répondre à vos questions. Comment puis-je vous aider ?",
};

const CHIPS: Record<Lang, { icon: string; label: string }[]> = {
  en: [
    { icon: "✨", label: "What services do you offer?" },
    { icon: "💰", label: "Pricing & plans" },
    { icon: "📅", label: "Book an appointment" },
    { icon: "🌿", label: "Eco-friendly?" },
  ],
  fr: [
    { icon: "✨", label: "Quels services ?" },
    { icon: "💰", label: "Tarifs & forfaits" },
    { icon: "📅", label: "Réserver" },
    { icon: "🌿", label: "Écologique ?" },
  ],
};

const HANDOFF: Record<Lang, { prompt: string; wa: string; em: string; dis: string }> = {
  en: { prompt: "Want a faster, personal response? Connect with our team directly.", wa: "WhatsApp", em: "Email us", dis: "Keep chatting" },
  fr: { prompt: "Vous préférez une réponse personnalisée ? Contactez notre équipe directement.", wa: "WhatsApp", em: "Envoyer un e-mail", dis: "Continuer ici" },
};

const HANDOFF_KEYWORDS = [
  "whatsapp","phone","call","email","contact","speak","human","agent","book","booking",
  "téléphone","appeler","courriel","contacter","parler","humain","réserver","réservation",
];

type Message = { role: "user" | "assistant"; content: string };
type Lang    = "en" | "fr";

const SparkleIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" opacity="0.9"/>
    <path d="M19 16L19.8 18.2L22 19L19.8 19.8L19 22L18.2 19.8L16 19L18.2 18.2L19 16Z" fill="white" opacity="0.7"/>
    <path d="M5 4L5.5 5.5L7 6L5.5 6.5L5 8L4.5 6.5L3 6L4.5 5.5L5 4Z" fill="white" opacity="0.6"/>
  </svg>
);

export default function Chatbot() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("fr") ? "fr" : "en";

  const [open, setOpen]                         = useState(false);
  const [messages, setMessages]                 = useState<Message[]>([{ role: "assistant", content: GREETING[lang] }]);
  const [input, setInput]                       = useState("");
  const [loading, setLoading]                   = useState(false);
  const [userMsgCount, setUserMsgCount]         = useState(0);
  const [showHandoff, setShowHandoff]           = useState(false);
  const [handoffDismissed, setHandoffDismissed] = useState(false);
  const [showSuggestions, setShowSuggestions]   = useState(true);
  const [apiError, setApiError]                 = useState<string | null>(null);
  const [pulse, setPulse]                       = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) setPulse(false); }, [open]);

  useEffect(() => {
    const l: Lang = i18n.language?.startsWith("fr") ? "fr" : "en";
    setMessages([{ role: "assistant", content: GREETING[l] }]);
    setUserMsgCount(0); setShowHandoff(false);
    setHandoffDismissed(false); setShowSuggestions(true); setApiError(null);
  }, [i18n.language]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, showHandoff, apiError, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 350); }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggestions(false); setApiError(null);
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);
    const userMsg: Message = { role: "user", content: text };
    const history = [...messages, userMsg];
    setMessages(history); setInput(""); setLoading(true);
    const wantsHandoff = HANDOFF_KEYWORDS.some((kw) => text.toLowerCase().includes(kw));
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 500,
          system: SYSTEM[lang],
          messages: history.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data?.error?.message || `HTTP ${res.status}`); return; }
      const reply = data.content?.[0]?.text;
      if (!reply) { setApiError("Empty response — please retry."); return; }
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      if ((newCount >= 3 || wantsHandoff) && !handoffDismissed) setTimeout(() => setShowHandoff(true), 600);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Network error");
    } finally { setLoading(false); }
  }, [loading, userMsgCount, messages, lang, handoffDismissed]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(lang === "fr" ? "Bonjour Averra ! Je souhaite en savoir plus sur vos services." : "Hi Averra! I'd like to learn more about your cleaning services.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };
  const openEmail = () => {
    const sub = encodeURIComponent(lang === "fr" ? "Demande de service – Averra" : "Service Inquiry – Averra");
    window.open(`mailto:${CONTACT_EMAIL}?subject=${sub}`, "_blank");
  };

  const h = HANDOFF[lang];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        :root {
          --av-cyan:#00a8e8; --av-blue:#2b5ca8; --av-accent:#60a5fa;
          --av-dark:#1e40af; --av-light:#bfdbfe; --av-white:#ffffff;
          --av-bg:#f0f7ff; --av-glass:rgba(255,255,255,0.18);
          --av-shadow:0 32px 80px rgba(0,168,232,0.22),0 8px 24px rgba(30,64,175,0.15);
          --av-font:'Plus Jakarta Sans',sans-serif;
        }
        .av-wrap * { box-sizing:border-box; font-family:var(--av-font); }
        .av-fab {
          position:fixed; bottom:24px; right:24px; width:60px; height:60px; border-radius:50%;
          background:linear-gradient(135deg,var(--av-cyan) 0%,var(--av-dark) 100%);
          border:none; cursor:pointer; z-index:9998;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 8px 32px rgba(0,168,232,0.5),0 2px 8px rgba(30,64,175,0.3);
          transition:transform 0.25s cubic-bezier(.34,1.56,.64,1),box-shadow 0.2s; outline:none;
        }
        .av-fab:hover { transform:scale(1.12) rotate(5deg); box-shadow:0 12px 40px rgba(0,168,232,0.6); }
        .av-fab:active { transform:scale(0.95); }
        .av-fab.pulse::after {
          content:''; position:absolute; inset:-4px; border-radius:50%;
          border:2px solid var(--av-cyan); opacity:0;
          animation:avPulseRing 2s ease-out infinite;
        }
        @keyframes avPulseRing { 0%{transform:scale(0.9);opacity:0.8} 100%{transform:scale(1.5);opacity:0} }
        .av-badge {
          position:fixed; bottom:92px; right:24px; background:var(--av-white);
          color:var(--av-dark); border-radius:14px; padding:8px 16px 8px 12px;
          font-size:13px; font-weight:600; cursor:pointer; z-index:9997; white-space:nowrap;
          box-shadow:0 4px 20px rgba(0,168,232,0.25),0 1px 4px rgba(0,0,0,0.08);
          animation:avBadgeIn 0.4s cubic-bezier(.34,1.56,.64,1);
          display:flex; align-items:center; gap:6px; border:1.5px solid var(--av-light);
        }
        .av-badge::before { content:''; width:8px; height:8px; border-radius:50%; background:#22c55e; box-shadow:0 0 0 2px rgba(34,197,94,0.25); animation:avBlink 2s ease infinite; flex-shrink:0; }
        @keyframes avBlink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes avBadgeIn { from{opacity:0;transform:translateY(12px) scale(0.85)} to{opacity:1;transform:translateY(0) scale(1)} }
        .av-window {
          position:fixed; bottom:96px; right:24px; width:400px;
          max-height:calc(100vh - 120px); height:620px;
          background:var(--av-white); border-radius:24px;
          box-shadow:var(--av-shadow); z-index:9999;
          display:flex; flex-direction:column; overflow:hidden;
          transform-origin:bottom right; animation:avWinIn 0.32s cubic-bezier(.34,1.56,.64,1);
          border:1px solid rgba(191,219,254,0.6);
        }
        @keyframes avWinIn { from{transform:scale(0.7) translateY(32px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        .av-header {
          background:linear-gradient(135deg,var(--av-cyan) 0%,var(--av-blue) 50%,var(--av-dark) 100%);
          padding:18px 18px 16px; display:flex; align-items:center; gap:12px; flex-shrink:0; position:relative; overflow:hidden;
        }
        .av-header::before { content:''; position:absolute; top:-40px; right:-40px; width:120px; height:120px; border-radius:50%; background:rgba(255,255,255,0.07); pointer-events:none; }
        .av-header::after  { content:''; position:absolute; bottom:-30px; left:20px; width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.05); pointer-events:none; }
        .av-avatar-wrap { position:relative; flex-shrink:0; }
        .av-avatar { width:44px; height:44px; border-radius:14px; background:var(--av-glass); backdrop-filter:blur(8px); border:1.5px solid rgba(255,255,255,0.3); display:flex; align-items:center; justify-content:center; }
        .av-status-dot { position:absolute; bottom:-2px; right:-2px; width:12px; height:12px; border-radius:50%; background:#22c55e; border:2px solid white; box-shadow:0 0 0 2px rgba(34,197,94,0.3); }
        .av-hinfo { flex:1; min-width:0; }
        .av-hinfo h3 { margin:0; color:#fff; font-size:15px; font-weight:700; letter-spacing:-0.01em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .av-hinfo p  { margin:2px 0 0; color:rgba(255,255,255,0.7); font-size:11.5px; }
        .av-header-actions { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .av-lang { display:flex; gap:3px; background:rgba(0,0,0,0.15); border-radius:8px; padding:3px; }
        .av-lbtn { background:transparent; border:none; border-radius:6px; color:rgba(255,255,255,0.65); font-size:11px; font-weight:700; padding:3px 8px; cursor:pointer; transition:background 0.15s,color 0.15s; font-family:var(--av-font); }
        .av-lbtn.on { background:rgba(255,255,255,0.9); color:var(--av-dark); }
        .av-lbtn:hover:not(.on) { color:#fff; background:rgba(255,255,255,0.15); }
        .av-close { width:32px; height:32px; border-radius:10px; background:rgba(255,255,255,0.12); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.15s; }
        .av-close:hover { background:rgba(255,255,255,0.22); }
        .av-msgs { flex:1; overflow-y:auto; padding:16px 14px 8px; display:flex; flex-direction:column; gap:10px; background:var(--av-bg); background-image:radial-gradient(ellipse at 20% 0%,rgba(0,168,232,0.06) 0%,transparent 60%),radial-gradient(ellipse at 80% 100%,rgba(43,92,168,0.06) 0%,transparent 60%); }
        .av-msgs::-webkit-scrollbar { width:3px; }
        .av-msgs::-webkit-scrollbar-thumb { background:var(--av-light); border-radius:2px; }
        .av-row { display:flex; align-items:flex-end; gap:8px; }
        .av-row.usr { flex-direction:row-reverse; }
        .av-bot-icon { width:28px; height:28px; border-radius:9px; flex-shrink:0; background:linear-gradient(135deg,var(--av-cyan),var(--av-blue)); display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,168,232,0.3); margin-bottom:2px; }
        .av-bub { max-width:80%; padding:10px 14px; font-size:13.5px; line-height:1.6; word-break:break-word; animation:avBubIn 0.22s cubic-bezier(.34,1.56,.64,1); }
        @keyframes avBubIn { from{opacity:0;transform:scale(0.88) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .av-bub.bot { background:var(--av-white); color:#1e2a3a; border-radius:4px 18px 18px 18px; box-shadow:0 2px 12px rgba(30,64,175,0.08),0 1px 3px rgba(0,0,0,0.05); border:1px solid rgba(191,219,254,0.5); }
        .av-bub.usr { background:linear-gradient(135deg,var(--av-cyan) 0%,var(--av-blue) 100%); color:#fff; border-radius:18px 4px 18px 18px; box-shadow:0 4px 16px rgba(0,168,232,0.35); }
        .av-time { font-size:10px; color:#94a3b8; padding:0 4px; margin-top:-4px; }
        .av-typing-row { display:flex; align-items:flex-end; gap:8px; }
        .av-typing { background:var(--av-white); border:1px solid rgba(191,219,254,0.5); border-radius:4px 18px 18px 18px; padding:12px 16px; display:flex; align-items:center; gap:5px; box-shadow:0 2px 12px rgba(30,64,175,0.08); animation:avBubIn 0.22s ease; }
        .av-typing span { width:7px; height:7px; border-radius:50%; background:linear-gradient(135deg,var(--av-cyan),var(--av-blue)); animation:avTypeDot 1.4s ease-in-out infinite; opacity:0.4; }
        .av-typing span:nth-child(2) { animation-delay:0.2s; }
        .av-typing span:nth-child(3) { animation-delay:0.4s; }
        @keyframes avTypeDot { 0%,60%,100%{transform:scale(0.8);opacity:0.3} 30%{transform:scale(1.2);opacity:1} }
        .av-error { margin:0 14px 8px; padding:11px 14px; background:linear-gradient(135deg,#fff5f5,#fff0f0); border:1.5px solid #fca5a5; border-radius:14px; font-size:12.5px; color:#dc2626; line-height:1.5; flex-shrink:0; animation:avBubIn 0.2s ease; display:flex; align-items:flex-start; gap:8px; }
        .av-handoff { margin:0 14px 10px; flex-shrink:0; background:linear-gradient(135deg,rgba(0,168,232,0.07),rgba(43,92,168,0.07)); border:1.5px solid rgba(0,168,232,0.2); border-radius:18px; padding:14px 15px; animation:avBubIn 0.25s ease; }
        .av-handoff-header { display:flex; align-items:center; gap:8px; margin-bottom:11px; }
        .av-handoff-icon { width:32px; height:32px; border-radius:10px; flex-shrink:0; background:linear-gradient(135deg,var(--av-cyan),var(--av-blue)); display:flex; align-items:center; justify-content:center; }
        .av-handoff p { margin:0; font-size:12.5px; color:#1e40af; line-height:1.5; font-weight:500; }
        .av-hbtns { display:flex; gap:7px; flex-wrap:wrap; }
        .av-hbtn { display:flex; align-items:center; gap:6px; border:none; border-radius:20px; padding:7px 14px; font-size:12.5px; font-weight:600; cursor:pointer; font-family:var(--av-font); transition:transform 0.15s,box-shadow 0.15s,filter 0.15s; }
        .av-hbtn:hover { transform:translateY(-2px); filter:brightness(1.05); }
        .av-hbtn:active { transform:translateY(0); }
        .av-hbtn.wa  { background:linear-gradient(135deg,#22c55e,#16a34a); color:#fff; box-shadow:0 4px 12px rgba(34,197,94,0.35); }
        .av-hbtn.em  { background:linear-gradient(135deg,var(--av-cyan),var(--av-blue)); color:#fff; box-shadow:0 4px 12px rgba(0,168,232,0.35); }
        .av-hbtn.dis { background:rgba(0,0,0,0.04); color:#64748b; border:1.5px solid #e2e8f0; font-weight:400; }
        .av-hbtn.dis:hover { transform:none; background:rgba(0,0,0,0.06); }
        .av-chips { padding:6px 14px 4px; display:flex; flex-wrap:wrap; gap:6px; background:var(--av-bg); flex-shrink:0; border-top:1px solid rgba(191,219,254,0.4); }
        .av-chip { background:var(--av-white); color:var(--av-dark); border:1.5px solid rgba(0,168,232,0.25); border-radius:20px; padding:6px 12px; font-size:12px; font-weight:500; cursor:pointer; transition:all 0.18s cubic-bezier(.34,1.56,.64,1); display:flex; align-items:center; gap:5px; box-shadow:0 1px 4px rgba(0,168,232,0.1); font-family:var(--av-font); white-space:nowrap; }
        .av-chip:hover { background:linear-gradient(135deg,var(--av-cyan),var(--av-blue)); color:#fff; border-color:transparent; transform:translateY(-1px) scale(1.02); box-shadow:0 4px 12px rgba(0,168,232,0.35); }
        .av-chip:active { transform:scale(0.97); }
        .av-irow { padding:12px 14px; background:var(--av-white); border-top:1px solid rgba(191,219,254,0.5); display:flex; align-items:center; gap:10px; flex-shrink:0; }
        .av-inp { flex:1; border:1.5px solid rgba(0,168,232,0.2); border-radius:20px; padding:10px 16px; font-size:13.5px; color:#1e2a3a; outline:none; background:var(--av-bg); transition:border-color 0.2s,background 0.2s,box-shadow 0.2s; font-family:var(--av-font); }
        .av-inp:focus { border-color:var(--av-cyan); background:var(--av-white); box-shadow:0 0 0 3px rgba(0,168,232,0.12); }
        .av-inp::placeholder { color:#94a3b8; }
        .av-send { width:44px; height:44px; border-radius:14px; flex-shrink:0; background:linear-gradient(135deg,var(--av-cyan) 0%,var(--av-dark) 100%); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(0,168,232,0.4); transition:transform 0.18s cubic-bezier(.34,1.56,.64,1),box-shadow 0.18s,opacity 0.15s; outline:none; }
        .av-send:hover:not(:disabled) { transform:scale(1.08) rotate(-5deg); box-shadow:0 6px 20px rgba(0,168,232,0.5); }
        .av-send:active:not(:disabled) { transform:scale(0.94); }
        .av-send:disabled { opacity:0.38; cursor:not-allowed; }
        .av-powered { text-align:center; padding:5px 0 8px; font-size:10px; color:#94a3b8; font-weight:400; letter-spacing:0.02em; flex-shrink:0; background:var(--av-white); }
        .av-powered span { color:var(--av-cyan); font-weight:600; }
        @media (max-width:480px) {
          .av-window { width:100vw; height:100dvh; bottom:0; right:0; border-radius:20px 20px 0 0; max-height:100dvh; }
          .av-fab { bottom:20px; right:20px; }
          .av-badge { bottom:88px; right:20px; }
        }
        @media (max-width:360px) {
          .av-hbtn { padding:6px 10px; font-size:11.5px; }
          .av-chip  { font-size:11px; padding:5px 10px; }
        }
      `}</style>

      <div className="av-wrap">
        {!open && (
          <div className="av-badge" onClick={() => setOpen(true)}>
            {lang === "fr" ? "Bonjour ! Comment puis-je vous aider ?" : "Hi! How can we help you?"}
          </div>
        )}
        <button className={`av-fab${pulse ? " pulse" : ""}`} onClick={() => setOpen((o) => !o)} aria-label="Toggle chat">
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : <SparkleIcon />}
        </button>

        {open && (
          <div className="av-window" role="dialog">
            <div className="av-header">
              <div className="av-avatar-wrap">
                <div className="av-avatar">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C7.03 3 3 7.03 3 12C3 14.39 3.96 16.57 5.54 18.17L4 21L7.03 19.56C8.56 20.47 10.22 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM16 14H8V12.5H16V14ZM16 11H8V9.5H16V11Z" fill="white"/>
                  </svg>
                </div>
                <div className="av-status-dot"/>
              </div>
              <div className="av-hinfo">
                <h3>{lang === "fr" ? "Assistante Averra" : "Averra Assistant"}</h3>
                <p>{lang === "fr" ? "En ligne · Répond en quelques secondes" : "Online · Replies in seconds"}</p>
              </div>
              <div className="av-header-actions">
                <div className="av-lang">
                  <button className={`av-lbtn${lang === "en" ? " on" : ""}`} onClick={() => i18n.changeLanguage("en")}>EN</button>
                  <button className={`av-lbtn${lang === "fr" ? " on" : ""}`} onClick={() => i18n.changeLanguage("fr")}>FR</button>
                </div>
                <button className="av-close" onClick={() => setOpen(false)} aria-label="Close">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="av-msgs">
              {messages.map((msg, i) => {
                const isBot = msg.role === "assistant";
                const time = new Date().toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US", { hour: "2-digit", minute: "2-digit" });
                return (
                  <div key={i}>
                    <div className={`av-row${isBot ? "" : " usr"}`}>
                      {isBot && (
                        <div className="av-bot-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM16 14H8V12H16V14ZM16 10H8V8H16V10Z"/>
                          </svg>
                        </div>
                      )}
                      <div className={`av-bub ${isBot ? "bot" : "usr"}`}>{msg.content}</div>
                    </div>
                    {i === messages.length - 1 && (
                      <div className="av-time" style={{ textAlign: isBot ? "left" : "right", paddingLeft: isBot ? "40px" : "0" }}>{time}</div>
                    )}
                  </div>
                );
              })}
              {loading && (
                <div className="av-typing-row">
                  <div className="av-bot-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM16 14H8V12H16V14ZM16 10H8V8H16V10Z"/>
                    </svg>
                  </div>
                  <div className="av-typing"><span/><span/><span/></div>
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {apiError && <div className="av-error"><span style={{fontSize:"15px",flexShrink:0}}>⚠️</span><span>{apiError}</span></div>}

            {showHandoff && (
              <div className="av-handoff">
                <div className="av-handoff-header">
                  <div className="av-handoff-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/></svg>
                  </div>
                  <p>{h.prompt}</p>
                </div>
                <div className="av-hbtns">
                  <button className="av-hbtn wa" onClick={openWhatsApp}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    {h.wa}
                  </button>
                  <button className="av-hbtn em" onClick={openEmail}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    {h.em}
                  </button>
                  <button className="av-hbtn dis" onClick={() => { setShowHandoff(false); setHandoffDismissed(true); }}>{h.dis}</button>
                </div>
              </div>
            )}

            {showSuggestions && (
              <div className="av-chips">
                {CHIPS[lang].map(({ icon, label }) => (
                  <button key={label} className="av-chip" onClick={() => sendMessage(label)}>
                    <span>{icon}</span>{label}
                  </button>
                ))}
              </div>
            )}

            <div className="av-irow">
              <input ref={inputRef} className="av-inp" placeholder={lang === "fr" ? "Écrivez votre message..." : "Type your message..."} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={loading} autoComplete="off"/>
              <button className="av-send" onClick={() => sendMessage(input)} disabled={!input.trim() || loading} aria-label="Send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            <div className="av-powered">Powered by <span>Averra AI</span> · Claude Haiku</div>
          </div>
        )}
      </div>
    </>
  );
}