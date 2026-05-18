/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Calendar, MapPin, Globe, Clock, CheckCircle2, ChevronRight } from "lucide-react";

const badgeColor: Record<string, string> = {
  "theory_practical": "#00a8e8",
  "theory":           "#2b7a9e",
  "practical":        "#16a34a",
  "practical_demo":   "#16a34a",
  "field_activity":   "#d97706",
  "company_visits":   "#7c3aed",
  "evaluation":       "#e11d48",
};

export default function TrainingPopup() {
  const { t } = useTranslation();
  const [visible, setVisible]   = useState(false);
  const [tab, setTab]           = useState("overview");
  const [entered, setEntered]   = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setEntered(true), 30);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setEntered(false);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  const schedule: { day: string; topic: string; typeKey: string }[] =
    t("trainingPopup.schedule", { returnObjects: true }) as any;

  const objectives: string[] =
    t("trainingPopup.objectives", { returnObjects: true }) as any;

  const metaPills = [
    { icon: <Calendar size={13} />, text: t("trainingPopup.meta.dates") },
    { icon: <MapPin size={13} />,   text: t("trainingPopup.meta.location") },
    { icon: <Clock size={13} />,    text: t("trainingPopup.meta.duration") },
    { icon: <Globe size={13} />,    text: t("trainingPopup.meta.languages") },
  ];

  const stats = [
    { label: t("trainingPopup.stats.duration"),    value: t("trainingPopup.stats.durationVal") },
    { label: t("trainingPopup.stats.sessions"),    value: t("trainingPopup.stats.sessionsVal") },
    { label: t("trainingPopup.stats.certificate"), value: t("trainingPopup.stats.certificateVal") },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(5,15,30,0.75)",
          backdropFilter: "blur(6px)",
          opacity: entered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Modal wrapper */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px", pointerEvents: "none",
      }}>
        <div style={{
          pointerEvents: "all",
          width: "100%", maxWidth: "680px", maxHeight: "90vh", overflowY: "auto",
          borderRadius: "20px",
          background: "linear-gradient(160deg, #0d1e35 0%, #0a2a4a 60%, #081828 100%)",
          border: "1px solid rgba(0,168,232,0.25)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,168,232,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0) scale(1)" : "translateY(40px) scale(0.96)",
          transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,168,232,0.3) transparent",
        }}>

          {/* ── Header ── */}
          <div style={{
            position: "relative", padding: "28px 28px 20px",
            borderBottom: "1px solid rgba(0,168,232,0.15)", overflow: "hidden",
          }}>
            {/* Glow blobs */}
            <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,168,232,0.18) 0%, transparent 70%)", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:"-30px", left:"20%", width:"120px", height:"120px", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,168,232,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>

            {/* Close */}
            <button onClick={close} style={{
              position:"absolute", top:"16px", right:"16px",
              background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:"50%", width:"32px", height:"32px",
              display:"flex", alignItems:"center", justifyContent:"center",
              cursor:"pointer", color:"rgba(255,255,255,0.6)", transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(0,168,232,0.2)"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}
            >
              <X size={14} />
            </button>

            {/* Brand + badge */}
            <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"12px" }}>
              <div style={{ background:"linear-gradient(135deg,#00a8e8,#0066aa)", borderRadius:"8px", padding:"6px 10px", fontSize:"11px", fontWeight:700, letterSpacing:"0.12em", color:"#fff", textTransform:"uppercase" }}>
                Averra Cleaners
              </div>
              <div style={{ background:"rgba(0,168,232,0.15)", border:"1px solid rgba(0,168,232,0.4)", borderRadius:"20px", padding:"3px 10px", fontSize:"11px", color:"#00a8e8", fontWeight:600 }}>
                🎓 {t("trainingPopup.badge")}
              </div>
            </div>

            <h2 style={{ margin:"0 0 6px", fontSize:"clamp(20px, 4vw, 26px)", fontWeight:800, color:"#fff", lineHeight:1.2, letterSpacing:"-0.01em" }}>
              {t("trainingPopup.title")}
            </h2>
            <p style={{ margin:"0 0 16px", color:"rgba(255,255,255,0.55)", fontSize:"14px", lineHeight:1.5 }}>
              {t("trainingPopup.subtitle")}
            </p>

            {/* Meta pills */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {metaPills.map((m, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"20px", padding:"4px 10px", fontSize:"12px", color:"rgba(255,255,255,0.65)" }}>
                  <span style={{ color:"#00a8e8" }}>{m.icon}</span>{m.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ display:"flex", borderBottom:"1px solid rgba(0,168,232,0.12)", padding:"0 28px" }}>
            {["overview", "schedule"].map(key => (
              <button key={key} onClick={() => setTab(key)} style={{
                background:"none", border:"none", cursor:"pointer",
                padding:"12px 16px 10px", fontSize:"13px", fontWeight:600,
                color: tab===key ? "#00a8e8" : "rgba(255,255,255,0.4)",
                borderBottom: tab===key ? "2px solid #00a8e8" : "2px solid transparent",
                transition:"all 0.2s",
              }}>
                {t(`trainingPopup.tabs.${key}`)}
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          <div style={{ padding:"20px 28px 28px" }}>

            {tab === "overview" && (
              <div>
                <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"14px", lineHeight:1.7, margin:"0 0 20px" }}>
                  {t("trainingPopup.description")}
                </p>

                <h4 style={{ color:"#fff", fontSize:"13px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 12px", opacity:0.5 }}>
                  {t("trainingPopup.objectivesTitle")}
                </h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"24px" }}>
                  {objectives.map((item, i) => (
                    <div key={i} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                      <CheckCircle2 size={16} style={{ color:"#00a8e8", marginTop:"1px", flexShrink:0 }} />
                      <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"13.5px", lineHeight:1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"10px", marginBottom:"24px" }}>
                  {stats.map((s, i) => (
                    <div key={i} style={{ background:"rgba(0,168,232,0.07)", border:"1px solid rgba(0,168,232,0.18)", borderRadius:"12px", padding:"14px", textAlign:"center" }}>
                      <div style={{ fontSize:"20px", fontWeight:800, color:"#00a8e8" }}>{s.value}</div>
                      <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.45)", marginTop:"3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "schedule" && (
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {schedule.map((item, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"10px", transition:"background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background="rgba(0,168,232,0.07)"}
                    onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.03)"}
                  >
                    <div style={{ minWidth:"46px", fontSize:"11px", fontWeight:700, color:"#00a8e8", fontVariantNumeric:"tabular-nums" }}>{item.day}</div>
                    <div style={{ flex:1, fontSize:"13px", color:"rgba(255,255,255,0.8)", lineHeight:1.4 }}>{item.topic}</div>
                    <div style={{ fontSize:"10px", fontWeight:600, whiteSpace:"nowrap", padding:"2px 8px", borderRadius:"20px", background:`${badgeColor[item.typeKey] || "#555"}22`, color: badgeColor[item.typeKey] || "#aaa", border:`1px solid ${badgeColor[item.typeKey] || "#555"}44` }}>
                      {t(`trainingPopup.scheduleTypes.${item.typeKey}`)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop:"24px", padding:"18px", background:"linear-gradient(135deg, rgba(0,168,232,0.12), rgba(0,100,180,0.08))", border:"1px solid rgba(0,168,232,0.25)", borderRadius:"14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
              <div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:"14px" }}>{t("trainingPopup.cta.title")}</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:"12px", marginTop:"2px" }}>{t("trainingPopup.cta.contact")}</div>
              </div>
              <a href="#events" onClick={close} style={{ display:"flex", alignItems:"center", gap:"6px", background:"linear-gradient(135deg,#00a8e8,#0077cc)", color:"#fff", textDecoration:"none", padding:"10px 20px", borderRadius:"30px", fontSize:"13px", fontWeight:700, boxShadow:"0 4px 16px rgba(0,168,232,0.35)", transition:"transform 0.2s, box-shadow 0.2s", whiteSpace:"nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(0,168,232,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,168,232,0.35)"; }}
              >
                {t("trainingPopup.cta.button")} <ChevronRight size={14}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}