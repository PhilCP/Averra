/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, MapPin, Clock, Users, ChevronRight, Tag } from "lucide-react";

const eventColors: Record<number, string> = {
  0: "#00a8e8",
  1: "#16a34a",
  2: "#f59e0b",
};

interface EventContact { email: string; phone: string; }
interface EventData {
  badge: string; category: string; title: string; subtitle: string;
  date: string; location: string; duration: string; spots: string;
  highlights: string[]; contact: EventContact;
}

function EventCard({ event, color, featured = false }: { event: EventData; color: string; featured?: boolean }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0d1e35 0%, #0a2540 100%)",
        border: `1px solid ${color}30`,
        borderRadius: featured ? "20px" : "16px",
        overflow: "hidden", position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: featured
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${color}20`
          : "0 8px 30px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = featured
          ? `0 28px 70px rgba(0,0,0,0.5), 0 0 0 1px ${color}40`
          : `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${color}30`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = featured
          ? `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${color}20`
          : "0 8px 30px rgba(0,0,0,0.3)";
      }}
    >
      <div style={{ height:"4px", background:`linear-gradient(90deg, ${color}, ${color}66)` }}/>
      <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px", borderRadius:"50%", background:`radial-gradient(circle, ${color}18 0%, transparent 70%)`, pointerEvents:"none" }}/>

      <div style={{ padding: featured ? "24px 28px" : "20px 22px" }}>
        {/* Badges */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
          <span style={{ background:`${color}22`, border:`1px solid ${color}55`, color, fontSize:"11px", fontWeight:700, borderRadius:"20px", padding:"3px 10px", letterSpacing:"0.05em" }}>
            {event.badge}
          </span>
          <span style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.5)", fontSize:"11px", fontWeight:600, borderRadius:"20px", padding:"3px 10px", display:"flex", alignItems:"center", gap:"4px" }}>
            <Tag size={10}/>{event.category}
          </span>
        </div>

        <h3 style={{ margin:"0 0 6px", color:"#fff", fontSize: featured ? "22px" : "17px", fontWeight:800, lineHeight:1.2, letterSpacing:"-0.01em" }}>
          {event.title}
        </h3>
        <p style={{ margin:"0 0 18px", color:"rgba(255,255,255,0.5)", fontSize:"13px", lineHeight:1.5 }}>
          {event.subtitle}
        </p>

        {/* Meta pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", marginBottom:"18px" }}>
          {[
            { icon:<Calendar size={12}/>, text: event.date },
            { icon:<MapPin size={12}/>,   text: event.location },
            { icon:<Clock size={12}/>,    text: event.duration },
            { icon:<Users size={12}/>,    text: event.spots },
          ].map((m, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"20px", padding:"4px 10px", fontSize:"11.5px", color:"rgba(255,255,255,0.55)" }}>
              <span style={{ color }}>{m.icon}</span>{m.text}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div style={{ overflow:"hidden", maxHeight: expanded || featured ? "300px" : "0px", transition:"max-height 0.4s ease" }}>
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"10px", padding:"14px", marginBottom:"16px" }}>
            <div style={{ fontSize:"11px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"rgba(255,255,255,0.35)", marginBottom:"10px" }}>
              {t("eventsSection.highlightsLabel")}
            </div>
            {event.highlights.map((h, i) => (
              <div key={i} style={{ display:"flex", gap:"8px", alignItems:"flex-start", marginBottom:"6px" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:color, marginTop:"6px", flexShrink:0 }}/>
                <span style={{ color:"rgba(255,255,255,0.65)", fontSize:"13px", lineHeight:1.4 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap" }}>
          <a
            href={`mailto:${event.contact.email}?subject=${t("eventsSection.emailSubject")} - ${event.title}`}
            style={{ display:"flex", alignItems:"center", gap:"6px", background:`linear-gradient(135deg, ${color}, ${color}cc)`, color:"#fff", textDecoration:"none", padding:"9px 18px", borderRadius:"25px", fontSize:"13px", fontWeight:700, boxShadow:`0 4px 16px ${color}44`, transition:"transform 0.2s", whiteSpace:"nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
          >
            {t("eventsSection.registerBtn")} <ChevronRight size={13}/>
          </a>
          {!featured && (
            <button onClick={() => setExpanded(!expanded)} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", padding:"9px 16px", borderRadius:"25px", fontSize:"13px", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
            >
              {expanded ? t("eventsSection.showLess") : t("eventsSection.learnMore")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const { t } = useTranslation();
  const events: EventData[] = t("eventsSection.events", { returnObjects: true }) as any;
  const featured = events[0];
  const rest     = events.slice(1);

  return (
    <section id="events" style={{ padding:"100px 0", background:"linear-gradient(180deg, #08111f 0%, #061525 100%)", position:"relative", overflow:"hidden", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>
      {/* Background glows */}
      <div style={{ position:"absolute", top:"10%", left:"5%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,168,232,0.06) 0%, transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"15%", right:"5%", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle, rgba(0,100,180,0.06) 0%, transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ maxWidth:"1080px", margin:"0 auto", padding:"0 24px" }}>
        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"60px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(0,168,232,0.1)", border:"1px solid rgba(0,168,232,0.3)", borderRadius:"30px", padding:"6px 16px", marginBottom:"16px" }}>
            <Calendar size={13} style={{ color:"#00a8e8" }}/>
            <span style={{ color:"#00a8e8", fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em" }}>
              {t("eventsSection.sectionBadge")}
            </span>
          </div>
          <h2 style={{ margin:"0 0 12px", fontSize:"clamp(30px, 5vw, 48px)", fontWeight:900, color:"#fff", lineHeight:1.1, letterSpacing:"-0.02em" }}>
            {t("eventsSection.heading.main")}{" "}
            <span style={{ background:"linear-gradient(90deg, #00a8e8, #0077cc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              {t("eventsSection.heading.accent")}
            </span>
          </h2>
          <p style={{ margin:"0 auto", maxWidth:"500px", color:"rgba(255,255,255,0.45)", fontSize:"16px", lineHeight:1.6 }}>
            {t("eventsSection.subheading")}
          </p>
        </div>

        {/* Featured */}
        <div style={{ marginBottom:"24px" }}>
          <EventCard event={featured} color={eventColors[0]} featured={true}/>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"16px" }}>
          {rest.map((ev, i) => (
            <EventCard key={i} event={ev} color={eventColors[i + 1]}/>
          ))}
        </div>

        {/* Footer note
        <p style={{ textAlign:"center", marginTop:"40px", color:"rgba(255,255,255,0.25)", fontSize:"13px" }}>
          {t("eventsSection.followNote")}{" "}
          <a href="https://instagram.com/averra_cleaner" target="_blank" rel="noreferrer"
            style={{ color:"#00a8e8", textDecoration:"none", fontWeight:600 }}>
            @averra_cleaner
          </a>
          {" "}{t("eventsSection.followNote2")}
        </p> */}
      </div>
    </section>
  );
}