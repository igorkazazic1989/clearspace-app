import { useState, useEffect, useRef } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes swipeLeft { to { transform: translateX(-140%) rotate(-18deg); opacity: 0; } }
  @keyframes swipeRight { to { transform: translateX(140%) rotate(18deg); opacity: 0; } }
  @keyframes popIn { 0% { transform: scale(0.85); opacity: 0; } 60% { transform: scale(1.04); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes hapticRing { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(2.6); opacity: 0; } }
  @keyframes ghostFloat { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-9px) rotate(2deg); } }
  @keyframes scanPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
  @keyframes growStem { 0% { height: 0; opacity: 0; } 100% { height: 44px; opacity: 1; } }
  @keyframes bloom { 0% { transform: scale(0) rotate(-25deg); opacity: 0; } 70% { transform: scale(1.15) rotate(6deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
  @keyframes floatUp { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
  @keyframes twinkle { 0%,100% { opacity: 0; transform: scale(0.4); } 50% { opacity: 1; transform: scale(1); } }
  @keyframes slideInRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes countUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
`;

const ACCENT  = "#b8ff57";
const ACCENT2 = "#57c8ff";
const PURPLE  = "#c084fc";
const DANGER  = "#ff5757";
const WARN    = "#ffb957";
const DIM     = "#1a1a26";
const MID     = "#252535";
const BORDER  = "#2e2e42";
const TEXT    = "#e8e8f0";
const MUTED   = "#6b6b88";

const S = {
  app: { fontFamily: "'Syne', sans-serif", background: "#0a0a0f", color: TEXT, minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { borderBottom: `1px solid ${BORDER}`, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, background: "rgba(10,10,15,0.97)", backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 100 },
  logo: { display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 17, letterSpacing: "-0.02em", flexShrink: 0 },
  dot: { width: 9, height: 9, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" },
  nav: { display: "flex", gap: 3, flexWrap: "wrap" },
  navBtn: (active) => ({ padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 12, fontWeight: active ? 600 : 400, fontFamily: "'Syne', sans-serif", background: active ? ACCENT : "transparent", color: active ? "#0a0a0f" : MUTED, transition: "all 0.18s" }),
  badge: (color = ACCENT) => ({ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600, fontFamily: "'DM Mono', monospace", background: color + "18", color, border: `1px solid ${color}28` }),
  card: { background: DIM, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 22 },
  sub: { background: MID, border: `1px solid ${BORDER}`, borderRadius: 11, padding: 14 },
  btn: (color = ACCENT, ghost = false) => ({ padding: "8px 18px", borderRadius: 9, border: ghost ? `1px solid ${color}40` : "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Syne', sans-serif", background: ghost ? "transparent" : color, color: ghost ? color : "#0a0a0f", transition: "all 0.15s", letterSpacing: "0.02em" }),
};

function Stat({ label, value, color = ACCENT, unit = "" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: "-0.03em", lineHeight: 1 }}>
        {value}<span style={{ fontSize: 13, fontWeight: 500, marginLeft: 2 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 11, color: MUTED, marginTop: 4, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
    </div>
  );
}

function Bar({ pct, color = ACCENT, label, sub }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13 }}>{label}</span>
        <span style={{ fontSize: 12, color: MUTED, fontFamily: "'DM Mono', monospace" }}>{sub}</span>
      </div>
      <div style={{ height: 5, background: BORDER, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 3, transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

// ─── HAPTIC RIPPLE ───────────────────────────────────────────────────────────
function HapticRipple({ trigger, color = DANGER }) {
  const [rings, setRings] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const id = Date.now();
    setRings(r => [...r, id]);
    setTimeout(() => setRings(r => r.filter(x => x !== id)), 650);
    if (navigator.vibrate) navigator.vibrate([35, 12, 22]);
  }, [trigger]);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", overflow: "hidden" }}>
      {rings.map(id => (
        <div key={id} style={{ position: "absolute", inset: 0, borderRadius: "inherit", border: `2px solid ${color}`, animation: "hapticRing 0.55s ease-out forwards" }} />
      ))}
    </div>
  );
}

// ─── PLANT CELEBRATION ───────────────────────────────────────────────────────
function PlantCelebration({ show }) {
  if (!show) return null;
  const particles = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div style={{ position: "relative", height: 110, display: "flex", justifyContent: "center", alignItems: "flex-end", marginBottom: 10 }}>
      {particles.map(i => (
        <div key={i} style={{
          position: "absolute",
          width: 7, height: 7, borderRadius: i % 3 === 0 ? "50%" : "2px",
          background: [ACCENT, ACCENT2, WARN, PURPLE, "#ff9cf5"][i % 5],
          top: `${15 + Math.sin(i * 0.7) * 35}%`,
          left: `${8 + i * 6}%`,
          animation: `twinkle ${0.7 + (i % 4) * 0.35}s ease-in-out ${i * 0.08}s infinite`,
        }} />
      ))}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transformOrigin: "bottom center" }}>
        <div style={{ fontSize: 26, animation: "bloom 0.7s 0.55s cubic-bezier(.34,1.56,.64,1) both" }}>🌸</div>
        <div style={{ fontSize: 16, animation: "bloom 0.6s 0.35s cubic-bezier(.34,1.56,.64,1) both", marginTop: -2 }}>🌿</div>
        <div style={{ width: 4, height: 44, background: "linear-gradient(to top, #4ade80, #86efac)", borderRadius: 4, animation: "growStem 0.5s ease both", marginTop: -2 }} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 🛡️  DIGITAL KARANTÄN
// ════════════════════════════════════════════════════════════════════════════
const QINIT = [
  { id: 1, name: "Zoom_installer_5.8.pkg",  size: "88 MB",  icon: "📦", added: 28, expires: 2,  type: "Installatör" },
  { id: 2, name: "GoPro_beach_2022.mp4",    size: "4.2 GB", icon: "🎬", added: 25, expires: 5,  type: "Video" },
  { id: 3, name: "meme_friday.png",          size: "1.1 MB", icon: "😂", added: 29, expires: 1,  type: "Bild" },
  { id: 4, name: "invoice_2019.pdf",         size: "0.2 MB", icon: "📄", added: 15, expires: 15, type: "PDF" },
  { id: 5, name: "node-v18-installer.zip",   size: "30 MB",  icon: "📦", added: 20, expires: 10, type: "Installatör" },
  { id: 6, name: "screenshot_password.png",  size: "0.3 MB", icon: "📋", added: 30, expires: 0,  type: "Skärmdump" },
];

function DigitalQuarantine() {
  const [items, setItems] = useState(QINIT);
  const [popping, setPopping] = useState(null);
  const [restoring, setRestoring] = useState(null);
  const [haptic, setHaptic] = useState(0);
  const [clean, setClean] = useState(false);

  const totalMb = items.reduce((a, x) => {
    const n = parseFloat(x.size); return a + (x.size.includes("GB") ? n * 1024 : n);
  }, 0);

  const remove = (id, isDelete) => {
    if (isDelete) { setHaptic(h => h + 1); setPopping(id); }
    else setRestoring(id);
    setTimeout(() => {
      setItems(it => { const next = it.filter(x => x.id !== id); if (next.length === 0) setTimeout(() => setClean(true), 150); return next; });
      setPopping(null); setRestoring(null);
    }, 420);
  };

  const timerColor = d => d <= 1 ? DANGER : d <= 5 ? WARN : ACCENT2;
  const circ = 2 * Math.PI * 17;

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: ACCENT2 + "1a", display: "grid", placeItems: "center", fontSize: 22 }}>🛡️</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Digital Karantän</h2>
          <p style={{ color: MUTED, fontSize: 13 }}>Filer väntar 30 dagar — ångra dig när som helst innan permanent radering</p>
        </div>
        <span style={{ ...S.badge(ACCENT2), marginLeft: "auto" }}>KRYPTERAD MAPP</span>
      </div>

      {/* How it works */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { i: "🗑️", l: "Du swipar / raderar",  d: "Filen försvinner från din vy omedelbart" },
          { i: "📦", l: "30 dagars karantän",     d: "Komprimeras och lagras dolt på disken" },
          { i: "💨", l: "Auto-radering",           d: "Om den inte rörs raderas den permanent" },
        ].map(s => (
          <div key={s.l} style={{ ...S.sub, display: "flex", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: ACCENT2 + "1a", display: "grid", placeItems: "center", fontSize: 16, flexShrink: 0 }}>{s.i}</div>
            <div><div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{s.l}</div><div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{s.d}</div></div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        {[
          { label: "I karantän",     value: items.length, unit: " filer", color: ACCENT2 },
          { label: "Hålls inlåst",   value: totalMb > 1024 ? (totalMb/1024).toFixed(1) : Math.round(totalMb), unit: totalMb > 1024 ? " GB" : " MB", color: WARN },
          { label: "Raderas idag",   value: items.filter(x => x.expires <= 0).length, color: DANGER },
          { label: "Säkerhetsnet",   value: "100%", color: ACCENT },
        ].map(s => <div key={s.label} style={{ ...S.sub, textAlign: "center", padding: "12px 6px" }}><Stat {...s} /></div>)}
      </div>

      {/* File list */}
      <div style={S.card}>
        {clean ? (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <PlantCelebration show />
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, animation: "popIn 0.5s ease" }}>Karantänen är tom! 🎉</div>
            <div style={{ color: MUTED }}>Inga filer väntar på radering. Lagringen är ren.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontWeight: 600 }}>Karantänerade filer</h3>
              <button style={{ ...S.btn(DANGER, true), fontSize: 11, padding: "5px 12px" }} onClick={() => { setItems([]); setClean(true); }}>Radera alla permanent</button>
            </div>
            <div style={{ display: "grid", gap: 9 }}>
              {items.map(item => {
                const isPopping   = popping   === item.id;
                const isRestoring = restoring === item.id;
                const color       = timerColor(item.expires);
                const dashOff     = circ * (1 - item.added / 30);

                return (
                  <div key={item.id} style={{
                    ...S.sub, position: "relative", display: "flex", gap: 12, alignItems: "center",
                    opacity:    isPopping || isRestoring ? 0 : 1,
                    transform:  isPopping ? "scale(0.88)" : isRestoring ? "translateX(30px)" : "none",
                    transition: "all 0.4s ease",
                    borderColor: item.expires <= 0 ? DANGER + "55" : BORDER,
                    overflow: "hidden",
                  }}>
                    <HapticRipple trigger={isPopping ? haptic : 0} color={DANGER} />

                    {/* SVG countdown ring */}
                    <div style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
                      <svg width="42" height="42" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                        <circle cx="21" cy="21" r="17" fill="none" stroke={BORDER} strokeWidth="3" />
                        <circle cx="21" cy="21" r="17" fill="none" stroke={color} strokeWidth="3"
                          strokeDasharray={circ} strokeDashoffset={dashOff} strokeLinecap="round" />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 17 }}>{item.icon}</div>
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 500, fontSize: 12, fontFamily: "'DM Mono', monospace", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={S.badge(MUTED)}>{item.type}</span>
                        <span style={S.badge(MUTED)}>{item.size}</span>
                        {item.expires <= 0
                          ? <span style={S.badge(DANGER)}>⚡ Raderas idag</span>
                          : <span style={S.badge(color)}>{item.expires} dagar kvar</span>}
                      </div>
                    </div>

                    {/* Day progress bar */}
                    <div style={{ width: 72 }}>
                      <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: "hidden", marginBottom: 3 }}>
                        <div style={{ height: "100%", width: `${(item.added / 30) * 100}%`, background: color, borderRadius: 2 }} />
                      </div>
                      <div style={{ fontSize: 10, color: MUTED, fontFamily: "'DM Mono', monospace", textAlign: "right" }}>{item.added}/30d</div>
                    </div>

                    <div style={{ display: "flex", gap: 5 }}>
                      <button onClick={() => remove(item.id, false)} style={{ ...S.btn(ACCENT, true), padding: "4px 9px", fontSize: 11 }}>↩ Återställ</button>
                      <button onClick={() => remove(item.id, true)}  style={{ ...S.btn(DANGER, true), padding: "4px 9px", fontSize: 11 }}>💥 Radera</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 🕵️  PROJEKT-DETEKTIVEN
// ════════════════════════════════════════════════════════════════════════════
const PROJECTS = [
  {
    id: 1, name: "Lägenhetsrenovering 2024", icon: "🏠", status: "Avslutat", statusColor: ACCENT, confidence: 97,
    files: 45, size: "2.3 GB", lastActive: "4 månader sedan",
    fileTypes: [
      { t: "Foton",        n: 28, i: "📸", s: "2.1 GB" },
      { t: "PDF-offerter", n: 8,  i: "📄", s: "45 MB" },
      { t: "Anteckningar", n: 6,  i: "📝", s: "1.2 MB" },
      { t: "Skärmdumpar",  n: 3,  i: "🖼️", s: "8 MB" },
    ],
    suggestion: "Projektet verkar helt avslutat sedan 4 månader. Jag föreslår att du arkiverar allt i ett komprimerat ZIP-arkiv och tar bort originalen.",
    actions: [{ l: "Arkivera som ZIP", c: WARN }, { l: "Rensa allt", c: DANGER }, { l: "Granska fil för fil", c: MUTED, ghost: true }],
  },
  {
    id: 2, name: "Jobbsökning H1 2023", icon: "💼", status: "Gammalt", statusColor: WARN, confidence: 91,
    files: 22, size: "180 MB", lastActive: "1.5 år sedan",
    fileTypes: [
      { t: "CV-versioner",     n: 9, i: "📄", s: "12 MB" },
      { t: "Personliga brev",  n: 7, i: "✉️", s: "3 MB" },
      { t: "Företagsresearch", n: 4, i: "🔍", s: "160 MB" },
      { t: "Avtal",            n: 2, i: "📋", s: "5 MB" },
    ],
    suggestion: "Du har 9 versioner av ditt CV. Jag rekommenderar att du behåller den senaste och arkiverar resten. Företagsresearchen kan raderas.",
    actions: [{ l: "Behåll senaste CV", c: ACCENT }, { l: "Arkivera allt", c: WARN }, { l: "Visa alla filer", c: MUTED, ghost: true }],
  },
  {
    id: 3, name: "Semester Kreta 2024", icon: "🏖️", status: "Avslutat", statusColor: ACCENT, confidence: 99,
    files: 312, size: "8.4 GB", lastActive: "6 månader sedan",
    fileTypes: [
      { t: "RAW-bilder",       n: 180, i: "📷", s: "7.2 GB" },
      { t: "Videor",           n: 24,  i: "🎬", s: "1.1 GB" },
      { t: "Redigerade bilder",n: 48,  i: "🖼️", s: "90 MB" },
      { t: "Kartor/övrigt",   n: 60,  i: "🗺️", s: "15 MB" },
    ],
    suggestion: "Du har 180 RAW-filer men bara 48 redigerade. De ej redigerade RAW-filerna tar 7.2 GB. Vill du radera RAW-dubbletter till redigerade bilder?",
    actions: [{ l: "Radera ej redigerade RAW", c: DANGER }, { l: "Arkivera allt", c: WARN }, { l: "Granska och välj", c: MUTED, ghost: true }],
  },
  {
    id: 4, name: "Podcast-projekt (pausat)", icon: "🎙️", status: "Pågående?", statusColor: ACCENT2, confidence: 73,
    files: 18, size: "940 MB", lastActive: "11 månader sedan",
    fileTypes: [
      { t: "Audioinspelningar", n: 8, i: "🔊", s: "800 MB" },
      { t: "Manus",             n: 7, i: "📝", s: "0.8 MB" },
      { t: "Grafik",            n: 3, i: "🎨", s: "140 MB" },
    ],
    suggestion: "Osäker status — projektet verkar pausat men inte avslutat. 11 månader sedan senaste ändringen. Vill du fortsätta eller arkivera tills vidare?",
    actions: [{ l: "Markera som aktivt", c: ACCENT }, { l: "Arkivera tills vidare", c: WARN }, { l: "Radera", c: DANGER }],
  },
];

const SCAN_MODES = {
  quick: {
    id: "quick",
    label: "Quick Scan",
    icon: "⚡",
    color: ACCENT,
    time: "~10 sek",
    cpu: "Låg",
    cpuColor: ACCENT,
    desc: "Analyserar filnamn, sökvägar, storlek och datum. Ingen bildanalys — körs omedelbart utan att belasta processorn.",
    steps: [
      "Läser filsystemsträdet…",
      "Analyserar filnamn & metadata…",
      "Kontrollerar skapandedatum…",
      "Grupperar via namnmönster…",
      "Bedömer projektstatus…",
      "Sammanställer rapport…",
    ],
    stepSpeed: 80,
    increment: () => 12 + Math.random() * 14,
  },
  deep: {
    id: "deep",
    label: "Deep Scan",
    icon: "🧠",
    color: PURPLE,
    time: "~2–5 min",
    cpu: "Hög (lokal AI)",
    cpuColor: WARN,
    desc: "Kör CLIP-modellen (ViT-B/32) lokalt för att förstå bildinnehåll. Identifierar semantiska teman, ansikten, platser. Belastar CPU/GPU under skanningen.",
    steps: [
      "Läser filsystemsträdet…",
      "Analyserar filnamn & metadata…",
      "Laddar CLIP-modell (151 MB)…",
      "Extraherar bildembeddings med CLIP…",
      "Klustring via cosine-similaritet…",
      "Analyserar textvärdar med Phi-3 Mini…",
      "Identifierar semantiska teman…",
      "Bedömer projektstatus med LLM…",
      "Sammanställer djuprapport…",
    ],
    stepSpeed: 200,
    increment: () => 3 + Math.random() * 6,
  },
};

function CpuMeter({ active, color }) {
  const [bars] = useState(() => Array.from({ length: 12 }, (_, i) => i));
  const [levels, setLevels] = useState(Array(12).fill(0));
  useEffect(() => {
    if (!active) { setLevels(Array(12).fill(0)); return; }
    const iv = setInterval(() => {
      setLevels(Array(12).fill(0).map(() => 20 + Math.random() * 80));
    }, 180);
    return () => clearInterval(iv);
  }, [active]);
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 28 }}>
      {bars.map((_, i) => (
        <div key={i} style={{
          width: 5, borderRadius: 2,
          height: active ? `${levels[i] || 10}%` : "10%",
          background: color,
          opacity: active ? 0.85 : 0.25,
          transition: "height 0.15s ease",
        }} />
      ))}
    </div>
  );
}

function ProjectDetective() {
  const [selected, setSelected]   = useState(null);
  const [handled, setHandled]     = useState([]);
  const [scanning, setScanning]   = useState(false);
  const [scanPct, setScanPct]     = useState(0);
  const [scanDone, setScanDone]   = useState(true);
  const [confirm, setConfirm]     = useState(null);
  const [scanMode, setScanMode]   = useState(null);   // null = not chosen yet
  const [chosenMode, setChosenMode] = useState(null); // mode used for last scan
  const [currentStep, setCurrentStep] = useState(0);

  const visible = PROJECTS.filter(p => !handled.includes(p.id));

  const startScan = (modeId) => {
    const mode = SCAN_MODES[modeId];
    setChosenMode(modeId);
    setScanMode(null);
    setScanDone(false);
    setScanning(true);
    setScanPct(0);
    setCurrentStep(0);
    let p = 0;
    const iv = setInterval(() => {
      p += mode.increment();
      const step = Math.min(mode.steps.length - 1, Math.floor((p / 100) * mode.steps.length));
      setCurrentStep(step);
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setScanning(false);
        setScanDone(true);
      }
      setScanPct(Math.min(100, Math.round(p)));
    }, mode.stepSpeed);
  };

  const mode = chosenMode ? SCAN_MODES[chosenMode] : null;

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: PURPLE + "1a", display: "grid", placeItems: "center", fontSize: 22 }}>🕵️</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Projekt-detektiven</h2>
          <p style={{ color: MUTED, fontSize: 13 }}>AI grupperar filer efter projekt och föreslår kontextuella åtgärder</p>
        </div>
        <button
          style={{ ...S.btn(PURPLE, true), marginLeft: "auto" }}
          onClick={() => setScanMode("choose")}
          disabled={scanning}
        >
          {scanning ? `${scanPct}% …` : "↻ Skanna om"}
        </button>
      </div>

      {/* ── Scan Mode Chooser Modal ── */}
      {scanMode === "choose" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "grid", placeItems: "center", zIndex: 300, backdropFilter: "blur(6px)" }}
          onClick={() => setScanMode(null)}>
          <div style={{ ...S.card, maxWidth: 560, width: "94%", animation: "popIn 0.28s ease", border: `1px solid ${PURPLE}40` }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 5 }}>Välj skanningstyp</div>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>
              Välj hur djupt du vill att AI:n ska analysera dina filer. Båda körs <strong style={{ color: TEXT }}>helt lokalt</strong> — inget skickas till nätet.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
              {Object.values(SCAN_MODES).map(m => (
                <div key={m.id}
                  style={{ ...S.sub, cursor: "pointer", transition: "border-color 0.2s", borderColor: m.color + "50", position: "relative" }}
                  onClick={() => startScan(m.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: m.color + "18", display: "grid", placeItems: "center", fontSize: 18 }}>{m.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: m.color }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace" }}>{m.time}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, marginBottom: 14 }}>{m.desc}</p>

                  {/* Resource indicators */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      { l: "Tid", v: m.time },
                      { l: "CPU/GPU", v: m.cpu, c: m.cpuColor },
                      { l: "Modeller", v: m.id === "deep" ? "CLIP + Phi-3" : "Inga" },
                      { l: "Precision", v: m.id === "deep" ? "Hög" : "Medium" },
                    ].map(r => (
                      <div key={r.l} style={{ background: "#0a0a0f", borderRadius: 7, padding: "6px 9px" }}>
                        <div style={{ fontSize: 10, color: MUTED, fontFamily: "'DM Mono', monospace", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{r.l}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: r.c || TEXT }}>{r.v}</div>
                      </div>
                    ))}
                  </div>

                  {m.id === "deep" && (
                    <div style={{ marginTop: 12, padding: "7px 10px", background: WARN + "0e", borderRadius: 7, border: `1px solid ${WARN}22`, fontSize: 11, color: WARN, lineHeight: 1.6 }}>
                      ⚠️ Fläkten kan höras. Datorn kan vara trög under analysen. Stäng tunga program.
                    </div>
                  )}
                  {m.id === "quick" && (
                    <div style={{ marginTop: 12, padding: "7px 10px", background: ACCENT + "0a", borderRadius: 7, border: `1px solid ${ACCENT}20`, fontSize: 11, color: ACCENT, lineHeight: 1.6 }}>
                      ✓ Påverkar inte datorns prestanda. Perfekt under arbetsdagen.
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button style={{ ...S.btn(MUTED, true), width: "100%", border: `1px solid ${BORDER}`, color: MUTED, fontSize: 12 }} onClick={() => setScanMode(null)}>Avbryt</button>
          </div>
        </div>
      )}

      {/* ── Active Scan Progress ── */}
      {!scanDone && mode && (
        <div style={{ ...S.card, marginBottom: 18, borderColor: mode.color + "40" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ fontSize: 18 }}>{mode.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{mode.label} pågår…</span>
              <span style={S.badge(mode.color)}>{mode.time}</span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", color: mode.color, fontSize: 14 }}>{scanPct}%</span>
          </div>

          <div style={{ height: 8, background: BORDER, borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
            <div style={{ height: "100%", width: `${scanPct}%`, background: `linear-gradient(90deg, ${mode.color}88, ${mode.color})`, borderRadius: 4, transition: "width 0.15s ease" }} />
          </div>

          {/* Step log */}
          <div style={{ display: "grid", gap: 4, marginBottom: 12 }}>
            {mode.steps.map((step, i) => {
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: done ? 0.5 : active ? 1 : 0.2, transition: "opacity 0.3s" }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${done ? ACCENT : active ? mode.color : BORDER}`, background: done ? ACCENT : "transparent", display: "grid", placeItems: "center", flexShrink: 0 }}>
                    {done && <span style={{ fontSize: 8, color: "#0a0a0f", fontWeight: 700 }}>✓</span>}
                    {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: mode.color, animation: "pulse 1s infinite" }} />}
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: active ? mode.color : done ? MUTED : BORDER }}>
                    {active && "→ "}{step}
                  </span>
                  {active && mode.id === "deep" && (
                    <span style={{ marginLeft: "auto" }}>
                      <CpuMeter active={true} color={mode.color} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* CPU usage bar (deep only) */}
          {mode.id === "deep" && (
            <div style={{ ...S.sub, padding: "10px 14px", display: "flex", gap: 14, alignItems: "center", background: WARN + "08", borderColor: WARN + "28" }}>
              <div>
                <div style={{ fontSize: 11, color: WARN, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>CPU / GPU BELASTNING</div>
                <CpuMeter active={true} color={WARN} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 5, background: BORDER, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
                  <div style={{ height: "100%", width: `${40 + Math.round(scanPct * 0.5)}%`, background: WARN, borderRadius: 3, transition: "width 0.3s" }} />
                </div>
                <div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace" }}>
                  CLIP-modell aktiv · ~{Math.round(scanPct * 1.4)} bilder bearbetade av 180
                </div>
              </div>
              <span style={S.badge(WARN)}>{40 + Math.round(scanPct * 0.5)}% CPU</span>
            </div>
          )}
        </div>
      )}

      {/* Scan mode result banner */}
      {chosenMode && scanDone && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "9px 14px", background: SCAN_MODES[chosenMode].color + "0a", border: `1px solid ${SCAN_MODES[chosenMode].color}22`, borderRadius: 10, fontSize: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 16 }}>{SCAN_MODES[chosenMode].icon}</span>
          <span style={{ color: SCAN_MODES[chosenMode].color, fontWeight: 600 }}>{SCAN_MODES[chosenMode].label} slutförd</span>
          <span style={{ color: MUTED }}>·</span>
          <span style={{ color: MUTED }}>{chosenMode === "deep" ? "CLIP-bildanalys + LLM-klustring · Hög precision" : "Metadata & filnamnsmönster · Medium precision"}</span>
          <button style={{ marginLeft: "auto", ...S.btn(SCAN_MODES[chosenMode].color, true), padding: "3px 10px", fontSize: 11 }} onClick={() => setScanMode("choose")}>Byt metod ↻</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        {[
          { label: "Projekt funna",   value: PROJECTS.length, color: PURPLE },
          { label: "Totala filer",    value: "397",           color: MUTED },
          { label: "Kan arkiveras",   value: "11.9", unit: " GB", color: WARN },
          { label: "Hanterade",       value: handled.length,  color: ACCENT },
        ].map(s => <div key={s.label} style={{ ...S.sub, textAlign: "center", padding: "12px 6px" }}><Stat {...s} /></div>)}
      </div>

      {visible.length === 0 ? (
        <div style={{ ...S.card, textAlign: "center", padding: 48 }}>
          <PlantCelebration show />
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Alla projekt hanterade!</div>
          <div style={{ color: MUTED }}>Ditt filsystem är välorganiserat och städat.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {visible.map(proj => (
            <div key={proj.id} style={{ ...S.card, cursor: "pointer", transition: "border-color 0.2s", borderColor: selected === proj.id ? PURPLE + "55" : BORDER }}
              onClick={() => setSelected(s => s === proj.id ? null : proj.id)}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ fontSize: 34 }}>{proj.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 15 }}>{proj.name}</span>
                    <span style={S.badge(proj.statusColor)}>{proj.status}</span>
                    <span style={{ ...S.badge(MUTED), marginLeft: "auto" }}>AI: {proj.confidence}%</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, fontSize: 12, color: MUTED }}>
                    <span>📁 {proj.files} filer</span>
                    <span>💾 {proj.size}</span>
                    <span>🕐 {proj.lastActive}</span>
                  </div>
                </div>
                <span style={{ color: MUTED, fontSize: 13 }}>{selected === proj.id ? "▲" : "▼"}</span>
              </div>

              {selected === proj.id && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${BORDER}`, animation: "fadeUp 0.22s ease" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 }}>
                    {proj.fileTypes.map(ft => (
                      <div key={ft.t} style={{ ...S.sub, display: "flex", gap: 9, alignItems: "center", padding: 11 }}>
                        <span style={{ fontSize: 18 }}>{ft.i}</span>
                        <div><div style={{ fontSize: 13, fontWeight: 500 }}>{ft.t}</div><div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace" }}>{ft.n} st · {ft.s}</div></div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: PURPLE + "0e", border: `1px solid ${PURPLE}22`, borderRadius: 9, padding: "11px 13px", marginBottom: 13, fontSize: 13, lineHeight: 1.7 }}>
                    <div style={{ fontWeight: 600, color: PURPLE, fontSize: 11, fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>🤖 AI-förslag</div>
                    {proj.suggestion}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {proj.actions.map(a => (
                      <button key={a.l}
                        style={{ ...S.btn(a.c, !!a.ghost), padding: "6px 14px", fontSize: 12 }}
                        onClick={e => { e.stopPropagation(); setConfirm({ proj, action: a.l, color: a.c }); }}>
                        {a.l}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "grid", placeItems: "center", zIndex: 300, backdropFilter: "blur(5px)" }}
          onClick={() => setConfirm(null)}>
          <div style={{ ...S.card, maxWidth: 420, width: "92%", animation: "popIn 0.28s ease", border: `1px solid ${confirm.color}40` }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>{confirm.proj.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{confirm.action}: {confirm.proj.name}?</h3>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 18, lineHeight: 1.65 }}>
              {confirm.proj.files} filer ({confirm.proj.size}) kommer att {confirm.action.toLowerCase().includes("radera") ? "raderas" : "arkiveras"}.
              {confirm.action.toLowerCase().includes("radera") ? " Filerna skickas till Digital Karantän i 30 dagar." : " Arkivet sparas på vald plats."}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...S.btn(confirm.color), flex: 1 }} onClick={() => { setHandled(h => [...h, confirm.proj.id]); setSelected(null); setConfirm(null); }}>Bekräfta</button>
              <button style={{ ...S.btn(MUTED, true), flex: 1, border: `1px solid ${BORDER}`, color: TEXT }} onClick={() => setConfirm(null)}>Avbryt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 👻  GHOST FILES — DJUPRENGÖRING
// ════════════════════════════════════════════════════════════════════════════
const GHOST_CATS = [
  {
    id: "empty", icon: "📂", label: "Tomma mappar", color: ACCENT2, count: 23, size: "0 KB",
    desc: "Mappar utan innehåll — skräpar ner sidopaneler och förvirrar",
    items: [
      { name: "Untitled Folder/",   path: "~/Desktop/",           age: "3 år" },
      { name: "New Folder (2)/",    path: "~/Downloads/",          age: "1 år" },
      { name: "temp/",              path: "~/Documents/Work/",     age: "8 mån" },
      { name: "test_backup/",       path: "~/Documents/",          age: "2 år" },
      { name: "archive_old/",       path: "~/Desktop/",            age: "4 år" },
    ],
  },
  {
    id: "broken", icon: "🔗", label: "Trasiga genvägar", color: DANGER, count: 14, size: "< 1 MB",
    desc: "Alias och genvägar som pekar på program eller filer som inte längre finns",
    items: [
      { name: "Adobe Premiere Pro.lnk", path: "~/Desktop/",  age: "2 år",  target: "Ej installerat" },
      { name: "Old Project Folder.lnk", path: "~/Desktop/",  age: "1 år",  target: "Filen raderad" },
      { name: "Zoom Meetings.lnk",      path: "~/Desktop/",  age: "6 mån", target: "Fel version" },
    ],
  },
  {
    id: "logs", icon: "📋", label: "Gamla loggfiler", color: WARN, count: 187, size: "1.8 GB",
    desc: "Loggfiler som program lämnat kvar — ofta värdelösa efter avinstallation",
    items: [
      { name: "iTunes_Library_backup.log",  path: "~/Library/Logs/iTunes/",        age: "4 år",  app: "iTunes (avinstallerat)" },
      { name: "CrashReporter_*.log (×48)",  path: "~/Library/Logs/DiagnosticR/",   age: "2 år",  app: "System" },
      { name: "npm-debug.log (×23)",        path: "~/Desktop/",                    age: "1 år",  app: "Node.js" },
      { name: "Adobe_*.log (×89)",          path: "~/Library/Logs/Adobe/",         age: "3 mån", app: "Adobe Suite" },
      { name: "VirtualBox_*.log (×27)",     path: "~/.VirtualBox/",                age: "2 år",  app: "VirtualBox (avinstallerat)" },
    ],
  },
  {
    id: "cache", icon: "🗄️", label: "App-rester", color: PURPLE, count: 31, size: "4.2 GB",
    desc: "Konfigurationsfiler och cache från program som inte längre är installerade",
    items: [
      { name: "com.evernote.Evernote/",          path: "~/Library/Application Support/", age: "3 år",  app: "Evernote (borttaget)" },
      { name: "com.skype.skype/ (890 MB)",        path: "~/Library/Application Support/", age: "2 år",  app: "Skype (borttaget)" },
      { name: "Microsoft Office Caches/ (2 GB)",  path: "~/Library/Caches/",              age: "6 mån", app: "Office" },
      { name: "Spotify_storage/ (1.1 GB)",        path: "~/Library/Caches/",              age: "1 år",  app: "Spotify" },
    ],
  },
];

function GhostFiles() {
  const [expanded, setExpanded] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanPct, setScanPct] = useState(0);
  const [scanDone, setScanDone] = useState(false);
  const [deleted, setDeleted] = useState({});
  const [haptic, setHaptic] = useState(0);
  const [allClean, setAllClean] = useState(false);

  const SCAN_STEPS = ["Läser filsystemsträdet…","Kontrollerar mappar…","Validerar genvägar…","Analyserar loggfiler…","Söker app-rester…","Jämför installerade program…","Sammanställer rapport…"];

  const runScan = () => {
    setScanDone(false); setScanning(true); setScanPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 2.5 + Math.random() * 7;
      if (p >= 100) { p = 100; clearInterval(iv); setScanning(false); setScanDone(true); }
      setScanPct(Math.min(100, Math.round(p)));
    }, 130);
  };

  const deleteAll = (id) => {
    setHaptic(h => h + 1);
    setDeleted(d => { const next = { ...d, [id]: true }; if (Object.keys(next).length === GHOST_CATS.length) setTimeout(() => setAllClean(true), 500); return next; });
  };

  const totalSaveable = GHOST_CATS.filter(c => !deleted[c.id]).reduce((a, c) => {
    const n = parseFloat(c.size); return isNaN(n) ? a : a + (c.size.includes("GB") ? n * 1024 : n);
  }, 0);

  const stepLabel = SCAN_STEPS[Math.min(6, Math.floor(scanPct / (100 / 7)))];

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: MUTED + "1a", display: "grid", placeItems: "center", fontSize: 22, animation: "ghostFloat 3s ease-in-out infinite" }}>👻</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Ghost Files — Djuprengöring</h2>
          <p style={{ color: MUTED, fontSize: 13 }}>Tomma mappar · trasiga genvägar · loggfiler · app-rester</p>
        </div>
        <button style={{ ...S.btn(scanning ? MUTED : ACCENT), marginLeft: "auto" }} onClick={runScan} disabled={scanning}>
          {scanning ? `Skannar ${scanPct}%` : "🔍 Djuprengöring"}
        </button>
      </div>

      {/* Scan animation */}
      {scanning && (
        <div style={{ ...S.card, marginBottom: 18, borderColor: ACCENT + "30" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ fontWeight: 500 }}>Djupskanning pågår</span>
            <span style={{ fontFamily: "'DM Mono', monospace", color: ACCENT }}>{scanPct}%</span>
          </div>
          <div style={{ height: 8, background: BORDER, borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: `${scanPct}%`, background: `linear-gradient(90deg, ${ACCENT2}, ${ACCENT})`, borderRadius: 4, transition: "width 0.15s ease" }} />
          </div>
          <div style={{ fontSize: 11, color: ACCENT2, fontFamily: "'DM Mono', monospace", animation: "scanPulse 1s infinite" }}>→ {stepLabel}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, marginTop: 12 }}>
            {["Mappar","Genvägar","Loggfiler","App-rester"].map((l, i) => (
              <div key={l} style={{ ...S.sub, padding: "7px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{l}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: ACCENT, animation: "pulse 1s infinite" }}>
                  {scanPct > i * 25 ? Math.round(scanPct * [0.23, 0.14, 1.87, 0.31][i]) : "—"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!scanDone && !scanning && (
        <div style={{ ...S.card, textAlign: "center", padding: 52, borderStyle: "dashed", borderColor: MUTED + "40" }}>
          <div style={{ fontSize: 54, marginBottom: 14, animation: "ghostFloat 2.5s ease-in-out infinite" }}>👻</div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Spökfiler lurar i djupet</h3>
          <p style={{ color: MUTED, fontSize: 14, maxWidth: 340, margin: "0 auto 20px", lineHeight: 1.7 }}>
            Starta en djuprengöring för att avslöja tomma mappar, trasiga genvägar, loggfiler och app-rester.
          </p>
          <button style={S.btn(ACCENT)} onClick={runScan}>Starta djuprengöring</button>
        </div>
      )}

      {scanDone && (
        allClean ? (
          <div style={{ ...S.card, textAlign: "center", padding: 52 }}>
            <PlantCelebration show />
            <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Systemet är spökfritt! 🎊</div>
            <div style={{ color: MUTED }}>Inga dolda filer, trasiga genvägar eller loggskräp kvar.</div>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Tomma mappar",    value: GHOST_CATS[0].count, color: ACCENT2 },
                { label: "Trasiga genvägar",value: GHOST_CATS[1].count, color: DANGER },
                { label: "Loggfiler",       value: GHOST_CATS[2].count, color: WARN },
                { label: "Kan frigöras",    value: totalSaveable > 1024 ? (totalSaveable/1024).toFixed(1) : Math.round(totalSaveable), unit: totalSaveable > 1024 ? " GB" : " MB", color: ACCENT },
              ].map(s => <div key={s.label} style={{ ...S.sub, textAlign: "center", padding: "12px 6px" }}><Stat {...s} /></div>)}
            </div>

            <div style={{ display: "grid", gap: 11 }}>
              {GHOST_CATS.map(cat => {
                const done = deleted[cat.id];
                return (
                  <div key={cat.id} style={{ ...S.card, opacity: done ? 0.38 : 1, transition: "opacity 0.4s", borderColor: expanded === cat.id ? cat.color + "50" : BORDER }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", cursor: done ? "default" : "pointer" }}
                      onClick={() => !done && setExpanded(e => e === cat.id ? null : cat.id)}>
                      <div style={{ width: 42, height: 42, borderRadius: 11, background: cat.color + "14", display: "grid", placeItems: "center", fontSize: 20, flexShrink: 0 }}>{cat.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{cat.label}</span>
                          <span style={S.badge(cat.color)}>{cat.count} objekt</span>
                          <span style={S.badge(MUTED)}>{cat.size}</span>
                          {done && <span style={S.badge(ACCENT)}>✓ Rengjort</span>}
                        </div>
                        <div style={{ fontSize: 13, color: MUTED }}>{cat.desc}</div>
                      </div>
                      {!done && (
                        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                          <button style={{ ...S.btn(cat.color), padding: "6px 14px", fontSize: 12 }}
                            onClick={e => { e.stopPropagation(); deleteAll(cat.id); }}>Rensa alla</button>
                          <span style={{ color: MUTED }}>{expanded === cat.id ? "▲" : "▼"}</span>
                        </div>
                      )}
                    </div>

                    {expanded === cat.id && !done && (
                      <div style={{ marginTop: 13, paddingTop: 13, borderTop: `1px solid ${BORDER}`, animation: "fadeUp 0.22s ease" }}>
                        <div style={{ display: "grid", gap: 6 }}>
                          {cat.items.map((item, i) => (
                            <div key={i} style={{ ...S.sub, padding: "9px 12px", display: "flex", gap: 10, alignItems: "center" }}>
                              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, flex: 1 }}>{item.name}</div>
                              <div style={{ fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.path}</div>
                              {item.age    && <span style={S.badge(MUTED)}>{item.age}</span>}
                              {item.app    && <span style={S.badge(WARN)}>{item.app}</span>}
                              {item.target && <span style={S.badge(DANGER)}>→ {item.target}</span>}
                            </div>
                          ))}
                          {cat.count > cat.items.length && (
                            <div style={{ fontSize: 12, color: MUTED, textAlign: "center", padding: "7px 0" }}>+ {cat.count - cat.items.length} fler…</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ ...S.card, marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", background: DANGER + "07", borderColor: DANGER + "22" }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>Rensa hela systemet på en gång</div>
                <div style={{ fontSize: 13, color: MUTED }}>{GHOST_CATS.filter(c => !deleted[c.id]).length} kategorier · frigör ~{totalSaveable > 1024 ? (totalSaveable/1024).toFixed(1) + " GB" : Math.round(totalSaveable) + " MB"}</div>
              </div>
              <button style={{ ...S.btn(DANGER), padding: "11px 24px" }}
                onClick={() => { GHOST_CATS.forEach(c => deleteAll(c.id)); }}>
                Djuprengör allt
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ORIGINAL MODULES (kept intact)
// ════════════════════════════════════════════════════════════════════════════
const photoGroups = [
  { id: 1, label: "Solnedgång vid havet", date: "3 aug 2024", saving: "14.2 MB", images: [
    { id:"a", emoji:"🌅", score:94, label:"Skarp · Bäst ljus", keep:true },
    { id:"b", emoji:"🌅", score:61, label:"Lätt suddig", keep:false },
    { id:"c", emoji:"🌅", score:44, label:"Underfokuserad", keep:false },
    { id:"d", emoji:"🌅", score:38, label:"Bländad", keep:false },
    { id:"e", emoji:"🌅", score:72, label:"OK men dubblett", keep:false },
  ]},
  { id: 2, label: "Barnkalas", date: "12 dec 2024", saving: "8.7 MB", images: [
    { id:"a", emoji:"🎂", score:91, label:"Perfekt fokus", keep:true },
    { id:"b", emoji:"🎂", score:55, label:"Suddig · rörelseblutt", keep:false },
    { id:"c", emoji:"🎂", score:88, label:"Bra men dubblett", keep:false },
  ]},
];

const screenshots = [
  { id:1, emoji:"🎫", text:"Stockholm–Göteborg · Avgång 14:22", type:"Biljett",      keep:true,  size:"0.8 MB", note:"Viktig! Resa om 3 dagar" },
  { id:2, emoji:"😂", text:"Meme: When it's Friday…",           type:"Meme",         keep:false, size:"1.1 MB", note:"Sparad för 47 dagar, aldrig delad" },
  { id:3, emoji:"🍝", text:"Pasta carbonara – 4 ägg…",          type:"Recept",       keep:false, size:"0.6 MB", note:"Aldrig öppnad efter skärmdump" },
  { id:4, emoji:"📋", text:"Lösenord: Temporärt123!",           type:"Känslig info", keep:false, size:"0.3 MB", note:"⚠️ Känslig text" },
  { id:5, emoji:"🎟️",text:"Konsertbiljett Robyn · 2023",       type:"Gammal biljett",keep:false,size:"0.9 MB", note:"Evenemanget passerat för 1 år" },
];

function VisualIntelligence() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [dismissed, setDismissed] = useState([]);
  const [blurScan, setBlurScan] = useState(false);
  const [blurDone, setBlurDone] = useState(false);
  const [activeTab, setActiveTab] = useState("duplicates");
  const blurPhotos = [
    { emoji:"🏔️", label:"Bergsvy_20230714.jpg",  issue:"Out of focus",      score:18, size:"3.2 MB" },
    { emoji:"🌃", label:"Nattbild_concert.jpg",   issue:"För mörk (ISO-brus)",score:22, size:"4.1 MB" },
    { emoji:"👶", label:"IMG_5823.jpg",           issue:"Rörelseblutt",      score:11, size:"2.8 MB" },
    { emoji:"🐕", label:"Hunden_park.jpg",        issue:"Underfokuserad",    score:29, size:"3.5 MB" },
  ];
  return (
    <div style={{ animation:"fadeUp 0.4s ease both" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:ACCENT+"1a", display:"grid", placeItems:"center", fontSize:22 }}>👁️</div>
        <div><h2 style={{ fontSize:20, fontWeight:700 }}>Visuell Intelligens</h2><p style={{ color:MUTED, fontSize:13 }}>Lokal CLIP-analys — inget lämnar datorn</p></div>
        <span style={{ ...S.badge(ACCENT), marginLeft:"auto" }}>● LOKAL AI</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:18 }}>
        {[{label:"Analyserade",value:"4 832",color:ACCENT},{label:"Nära-dubbletter",value:"23",color:WARN,unit:" gr"},{label:"Suddiga",value:"87",color:DANGER},{label:"Kan frigöras",value:"2.4",color:ACCENT2,unit:" GB"}].map(s=>(
          <div key={s.label} style={{...S.sub,textAlign:"center",padding:"12px 6px"}}><Stat {...s}/></div>
        ))}
      </div>
      <div style={{ display:"flex", gap:7, marginBottom:14 }}>
        {[{id:"duplicates",l:"Nära-dubbletter"},{id:"blur",l:"Suddig/Misslyckad"},{id:"screenshots",l:"Skärmdumpsanalys"}].map(t=>(
          <button key={t.id} style={S.navBtn(activeTab===t.id)} onClick={()=>setActiveTab(t.id)}>{t.l}</button>
        ))}
      </div>
      {activeTab==="duplicates"&&(
        <div>
          <div style={{ display:"flex", gap:7, marginBottom:12 }}>
            {photoGroups.map((g,i)=><button key={g.id} style={{...S.btn(i===activeGroup?ACCENT:MID,i!==activeGroup),border:i!==activeGroup?`1px solid ${BORDER}`:"none",color:i===activeGroup?"#0a0a0f":TEXT}} onClick={()=>setActiveGroup(i)}>{g.label} · {g.images.length} bilder</button>)}
          </div>
          {(()=>{const g=photoGroups[activeGroup];return(
            <div style={S.card}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <span style={{ fontWeight:600 }}>{g.label} <span style={{ color:MUTED, fontWeight:400, fontSize:13 }}>{g.date}</span></span>
                <span style={S.badge(WARN)}>Sparar {g.saving}</span>
              </div>
              <div style={{ display:"flex", gap:9 }}>
                {g.images.map(img=>(
                  <div key={img.id} style={{ flex:1, borderRadius:11, border:`2px solid ${img.keep?ACCENT:BORDER}`, background:img.keep?ACCENT+"08":MID, padding:10, textAlign:"center", position:"relative", opacity:dismissed.includes(img.id)?0.28:1, transition:"opacity 0.3s" }}>
                    {img.keep&&<div style={{ position:"absolute", top:-7, left:"50%", transform:"translateX(-50%)", background:ACCENT, color:"#0a0a0f", fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:20, whiteSpace:"nowrap" }}>✓ BEHÅLL</div>}
                    <div style={{ fontSize:32, margin:"10px 0 5px" }}>{img.emoji}</div>
                    <div style={{ fontSize:19, fontWeight:800, color:img.score>80?ACCENT:img.score>50?WARN:DANGER }}>{img.score}</div>
                    <div style={{ fontSize:9, color:MUTED, fontFamily:"'DM Mono',monospace", marginBottom:5 }}>SCORE</div>
                    <div style={{ fontSize:10, color:img.keep?ACCENT:MUTED }}>{img.label}</div>
                    {!img.keep&&<button onClick={()=>setDismissed(d=>[...d,img.id])} style={{...S.btn(DANGER,true),padding:"3px 8px",fontSize:10,marginTop:5}}>Radera</button>}
                  </div>
                ))}
              </div>
            </div>
          );})()}
        </div>
      )}
      {activeTab==="blur"&&(
        <div style={S.card}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div><h3 style={{ fontWeight:600, marginBottom:2 }}>Teknisk bildkvalitetsanalys</h3><p style={{ color:MUTED, fontSize:12 }}>Laplacian-variantanalys på enheten</p></div>
            <button style={S.btn(blurDone?ACCENT2:ACCENT)} onClick={()=>{setBlurScan(true);setTimeout(()=>{setBlurScan(false);setBlurDone(true);},1700);}}>{blurScan?"Analyserar…":blurDone?"✓ Klar":"Starta scanning"}</button>
          </div>
          {blurScan&&<div style={{...S.sub,marginBottom:12,display:"flex",gap:9,alignItems:"center"}}><div style={{ width:15,height:15,border:`2px solid ${ACCENT}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.7s linear infinite" }}/><span style={{ fontFamily:"'DM Mono',monospace",fontSize:12,color:ACCENT }}>Kör Laplacian-analys… 2 841 / 4 832</span></div>}
          <div style={{ display:"grid", gap:7 }}>
            {blurPhotos.map((p,i)=>(
              <div key={i} style={{...S.sub,display:"flex",gap:11,alignItems:"center",opacity:blurDone?1:0.3,transition:"opacity 0.5s"}}>
                <div style={{ fontSize:26 }}>{p.emoji}</div>
                <div style={{ flex:1 }}><div style={{ fontWeight:500, fontSize:13, marginBottom:2 }}>{p.label}</div><div style={{ fontSize:12, color:DANGER }}>{p.issue}</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontWeight:700, color:DANGER, fontSize:17 }}>{p.score}</div><div style={{ fontSize:9, color:MUTED, fontFamily:"'DM Mono',monospace" }}>/100</div></div>
                <span style={S.badge(MUTED)}>{p.size}</span>
                <button style={{...S.btn(DANGER,true),padding:"4px 10px",fontSize:11}}>Radera</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab==="screenshots"&&(
        <div style={S.card}>
          <h3 style={{ fontWeight:600, marginBottom:3 }}>Skärmdumpsanalys</h3>
          <p style={{ color:MUTED, fontSize:12, marginBottom:12 }}>AI läser texten via OCR och klassificerar innehållet</p>
          <div style={{ display:"grid", gap:7 }}>
            {screenshots.map(s=>(
              <div key={s.id} style={{...S.sub,display:"flex",gap:11,alignItems:"center",borderColor:s.keep?ACCENT+"40":BORDER}}>
                <div style={{ fontSize:26 }}>{s.emoji}</div>
                <div style={{ flex:1 }}><div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:3 }}><span style={{ fontWeight:600, fontSize:13 }}>{s.text}</span><span style={S.badge(s.keep?ACCENT:s.type==="Känslig info"?DANGER:MUTED)}>{s.type}</span></div><div style={{ fontSize:11, color:s.type==="Känslig info"?DANGER:MUTED }}>{s.note}</div></div>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:MUTED }}>{s.size}</span>
                {!s.keep&&<button style={{...S.btn(DANGER,true),padding:"4px 10px",fontSize:11}}>Radera</button>}
                {s.keep&&<span style={{ fontSize:12, color:ACCENT, fontWeight:600 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const downloadFiles = [
  { name:"Zoom_installer.pkg",            size:"88 MB",    type:"installer", icon:"📦", note:"Zoom v5.8 – kör redan v5.17",    danger:true },
  { name:"invoice_2019_04.pdf",           size:"0.2 MB",   type:"pdf",       icon:"📄", note:"Räkning från 2019 – 6 år gammal", danger:true },
  { name:"invoice_2024_12.pdf",           size:"0.2 MB",   type:"pdf",       icon:"📄", note:"Räkning från december",           danger:false },
  { name:"GoPro_4K_beach.mp4",           size:"4 200 MB", type:"video",     icon:"🎬", note:"4K · skapad feb 2022 · aldrig öppnad", danger:true },
  { name:"figma-agent.dmg",              size:"120 MB",   type:"installer", icon:"📦", note:"Figma Agent – redan installerat",  danger:true },
  { name:"presentation_v3_FINAL_2.pptx", size:"45 MB",    type:"office",    icon:"📊", note:"5 versioner av samma fil",         danger:false },
  { name:"node-v18.zip",                 size:"30 MB",    type:"installer", icon:"📦", note:"Node.js 18 – du kör Node 22",      danger:true },
];

function DownloadsDetective() {
  const [filter, setFilter] = useState("all");
  const [deleted, setDeleted] = useState([]);
  const filtered = downloadFiles.filter(f=>(filter==="all"||f.type===filter||(filter==="danger"&&f.danger))&&!deleted.includes(f.name));
  const diskData = [
    {label:"Installationsfiler",pct:28,color:DANGER,size:"238 MB"},
    {label:"Videofiler",pct:48,color:WARN,size:"4.1 GB"},
    {label:"Gamla PDF-räkningar",pct:8,color:ACCENT2,size:"68 MB"},
    {label:"Office-dokument",pct:10,color:ACCENT,size:"85 MB"},
    {label:"Övrigt",pct:6,color:MUTED,size:"51 MB"},
  ];
  return (
    <div style={{ animation:"fadeUp 0.4s ease both" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:WARN+"1a", display:"grid", placeItems:"center", fontSize:22 }}>🔍</div>
        <div><h2 style={{ fontSize:20, fontWeight:700 }}>Downloads-detektiven</h2><p style={{ color:MUTED, fontSize:13 }}>Automatisk klassificering av nedladdningsmappen</p></div>
      </div>
      <div style={{...S.card,marginBottom:16}}>
        <h3 style={{ fontWeight:600, marginBottom:12 }}>Hårddiskvisualisering</h3>
        <div style={{ display:"flex", height:16, borderRadius:8, overflow:"hidden", marginBottom:14, gap:2 }}>
          {diskData.map(d=><div key={d.label} style={{ flex:d.pct, background:d.color }}/>)}
        </div>
        <div style={{ display:"grid", gap:7 }}>{diskData.map(d=><Bar key={d.label} label={d.label} pct={d.pct} color={d.color} sub={d.size}/>)}</div>
      </div>
      <div style={{ display:"flex", gap:7, marginBottom:12 }}>
        {[{id:"all",l:"Alla"},{id:"danger",l:"🚨 Rekommenderas"},{id:"installer",l:"📦 Installer"},{id:"pdf",l:"📄 PDF"},{id:"video",l:"🎬 Video"}].map(f=>(
          <button key={f.id} style={S.navBtn(filter===f.id)} onClick={()=>setFilter(f.id)}>{f.l}</button>
        ))}
      </div>
      <div style={S.card}>
        {filtered.length===0?(
          <div style={{ textAlign:"center", padding:"38px 0" }}>
            <PlantCelebration show/>
            <div style={{ fontWeight:700, fontSize:17, marginBottom:5 }}>Nedladdningsmappen är ren! ✨</div>
            <div style={{ color:MUTED }}>Inga rekommenderade filer kvar.</div>
          </div>
        ):(
          <div style={{ display:"grid", gap:7 }}>
            {filtered.map(f=>(
              <div key={f.name} style={{...S.sub,display:"flex",gap:9,alignItems:"center",borderColor:f.danger?DANGER+"28":BORDER}}>
                <div style={{ fontSize:22 }}>{f.icon}</div>
                <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:500, fontSize:12, fontFamily:"'DM Mono',monospace", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</div><div style={{ fontSize:12, color:f.danger?WARN:MUTED }}>{f.note}</div></div>
                <span style={S.badge(f.danger?DANGER:MUTED)}>{f.size}</span>
                <button onClick={()=>setDeleted(d=>[...d,f.name])} style={{...S.btn(f.danger?DANGER:MID,!f.danger),padding:"5px 12px",fontSize:12,border:f.danger?"none":`1px solid ${BORDER}`,color:f.danger?"#fff":TEXT}}>Radera</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const tabGroups = [
  {id:1,title:"React hooks documentation",   url:"react.dev/reference/react",  idle:"9 dagar",  duplicates:2,icon:"⚛️",summary:"Dokumentation för useState, useEffect m.fl. Finns offline i din IDE."},
  {id:2,title:"Recept: Bästa kladdkakan",    url:"koket.se/recept/kladdkaka",  idle:"3 veckor", duplicates:0,icon:"🍫",summary:"Recept på kladdkaka. Läst 0 gånger sedan fliken öppnades."},
  {id:3,title:"Hacker News",                 url:"news.ycombinator.com",       idle:"11 dagar", duplicates:3,icon:"📰",summary:"Öppnad i 4 separata fönster. Innehållet uppdateras varje timme — du missar inget."},
  {id:4,title:"YouTube – Lo-fi beats",       url:"youtube.com/watch?v=...",    idle:"6 dagar",  duplicates:0,icon:"🎵",summary:"Video pausad vid 0:03. Förmodligen en olycklighet."},
];

function BrowserCleaner() {
  const [expanded, setExpanded] = useState(null);
  const [closed, setClosed] = useState([]);
  const [summarizing, setSummarizing] = useState(null);
  const [summaryDone, setSummaryDone] = useState([]);
  const visible = tabGroups.filter(t=>!closed.includes(t.id));
  return (
    <div style={{ animation:"fadeUp 0.4s ease both" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:ACCENT2+"1a", display:"grid", placeItems:"center", fontSize:22 }}>🌐</div>
        <div><h2 style={{ fontSize:20, fontWeight:700 }}>Smart Webb-städare</h2><p style={{ color:MUTED, fontSize:13 }}>Zombie-flikar, dubbletter och läs-senare-analys</p></div>
        <span style={{...S.badge(ACCENT2),marginLeft:"auto"}}>Chrome · Firefox · Edge</span>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
        {[{v:tabGroups.length,l:"Zombie-flikar",c:DANGER},{v:6,l:"Dubbletter",c:WARN},{v:"247 MB",l:"RAM frigörs",c:ACCENT2}].map(s=>(
          <div key={s.l} style={{...S.sub,textAlign:"center",padding:14}}><div style={{ fontSize:26, fontWeight:800, color:s.c, letterSpacing:"-0.02em" }}>{s.v}</div><div style={{ fontSize:11, color:MUTED, fontFamily:"'DM Mono',monospace", marginTop:3, textTransform:"uppercase" }}>{s.l}</div></div>
        ))}
      </div>
      <div style={S.card}>
        {visible.length===0?(
          <div style={{ textAlign:"center", padding:"38px 0" }}>
            <PlantCelebration show/>
            <div style={{ fontWeight:700, fontSize:17, marginBottom:5 }}>Alla zombie-flikar städade! 🎉</div>
            <div style={{ color:MUTED }}>Webbläsaren andas lättad.</div>
          </div>
        ):(
          <>
            <div style={{ display:"grid", gap:7 }}>
              {visible.map(t=>(
                <div key={t.id}>
                  <div style={{...S.sub,cursor:"pointer",borderColor:expanded===t.id?ACCENT2+"55":BORDER}} onClick={()=>setExpanded(e=>e===t.id?null:t.id)}>
                    <div style={{ display:"flex", gap:9, alignItems:"center" }}>
                      <div style={{ fontSize:21 }}>{t.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}><div style={{ fontWeight:500, fontSize:13, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:2 }}>{t.title}</div><div style={{ fontSize:11, color:MUTED, fontFamily:"'DM Mono',monospace" }}>{t.url}</div></div>
                      <span style={S.badge(DANGER)}>{t.idle}</span>
                      {t.duplicates>0&&<span style={S.badge(WARN)}>×{t.duplicates+1}</span>}
                      <span style={{ color:MUTED }}>{expanded===t.id?"▲":"▼"}</span>
                    </div>
                    {expanded===t.id&&(
                      <div style={{ marginTop:11, paddingTop:11, borderTop:`1px solid ${BORDER}` }}>
                        <div style={{ background:MID, borderRadius:8, padding:10, marginBottom:9, fontSize:13 }}>
                          {summaryDone.includes(t.id)?t.summary:summarizing===t.id?<span style={{ color:ACCENT2, animation:"pulse 1s infinite" }}>Analyserar sidinnehåll…</span>:<span style={{ color:MUTED }}>Klicka för AI-sammanfattning av sidan</span>}
                        </div>
                        <div style={{ display:"flex", gap:7 }}>
                          {!summaryDone.includes(t.id)&&<button style={S.btn(ACCENT2,true)} onClick={e=>{e.stopPropagation();setSummarizing(t.id);setTimeout(()=>{setSummarizing(null);setSummaryDone(d=>[...d,t.id]);},1500);}}>Sammanfatta</button>}
                          <button style={S.btn(DANGER,true)} onClick={e=>{e.stopPropagation();setClosed(c=>[...c,t.id]);}}>Stäng flik</button>
                          {t.duplicates>0&&<button style={S.btn(WARN,true)} onClick={e=>e.stopPropagation()}>Stäng {t.duplicates} dubbletter</button>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button style={{...S.btn(DANGER),marginTop:12,width:"100%",padding:10}} onClick={()=>setClosed(tabGroups.map(t=>t.id))}>Stäng alla zombie-flikar</button>
          </>
        )}
      </div>
    </div>
  );
}

function PrivacyStack() {
  const models = [
    {name:"CLIP (ViT-B/32)",    use:"Bildanalys & semantisk likhetssökning", size:"151 MB", runtime:"ONNX Runtime",         icon:"🔬"},
    {name:"Laplacian Variance", use:"Skärpa & blur-detektion",               size:"< 1 KB", runtime:"CPU / NumPy",           icon:"📐"},
    {name:"Tesseract OCR",      use:"Textextrahering ur skärmdumpar",        size:"22 MB",  runtime:"Lokal binär",            icon:"📝"},
    {name:"Phi-3 Mini (4-bit)", use:"Textklassificering & sammanfattning",   size:"2.4 GB", runtime:"llama.cpp / Metal",      icon:"🧠"},
  ];
  const openSource = [
    {name:"Filskannermodul",       status:"Helt öppen (MIT)",          color:ACCENT},
    {name:"AI-modellintegration",  status:"Öppen (Apache 2.0)",        color:ACCENT},
    {name:"Nätverkslager (noll)",  status:"Verifierbart — inga anrop", color:ACCENT},
    {name:"Molnsynk (opt-in)",     status:"Krypterat E2E",             color:WARN},
  ];
  return (
    <div style={{ animation:"fadeUp 0.4s ease both" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:ACCENT+"1a", display:"grid", placeItems:"center", fontSize:22 }}>🔒</div>
        <div><h2 style={{ fontSize:20, fontWeight:700 }}>Integritet som Grundprincip</h2><p style={{ color:MUTED, fontSize:13 }}>Teknisk arkitektur byggd för att aldrig behöva lita på oss</p></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div style={S.card}>
          <h3 style={{ fontWeight:600, marginBottom:12 }}>Lokala AI-modeller</h3>
          <div style={{ display:"grid", gap:8 }}>
            {models.map(m=>(
              <div key={m.name} style={{...S.sub,display:"flex",gap:9}}>
                <div style={{ fontSize:19 }}>{m.icon}</div>
                <div><div style={{ fontWeight:600, fontSize:11, fontFamily:"'DM Mono',monospace", color:ACCENT }}>{m.name}</div><div style={{ fontSize:12, margin:"2px 0" }}>{m.use}</div><div style={{ display:"flex", gap:5, marginTop:4 }}><span style={S.badge(MUTED)}>{m.size}</span><span style={S.badge(ACCENT2)}>{m.runtime}</span></div></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={S.card}>
            <h3 style={{ fontWeight:600, marginBottom:10 }}>Öppen Källkod</h3>
            <div style={{ display:"grid", gap:6 }}>
              {openSource.map(o=><div key={o.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", background:MID, borderRadius:7 }}><span style={{ fontSize:13 }}>{o.name}</span><span style={S.badge(o.color)}>{o.status}</span></div>)}
            </div>
          </div>
          <div style={{...S.card,background:DANGER+"07",borderColor:DANGER+"28"}}>
            <h3 style={{ fontWeight:600, marginBottom:9, color:DANGER }}>Nätverksaktivitet: Noll</h3>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:MUTED, lineHeight:1.8 }}>
              <div style={{ color:ACCENT }}>$ tcpdump -i any host 0.0.0.0</div>
              <div>0 packets captured</div>
              <div style={{ color:ACCENT, marginTop:5 }}>✓ Ingen nätverkstrafik</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const swipeItems = [
  {id:1,emoji:"🌅",type:"Bild",      name:"IMG_4821.jpg",          info:"Suddig version av solnedgångsfoto",   size:"3.8 MB",   risk:"low"},
  {id:2,emoji:"📦",type:"Installer", name:"Dropbox_installer.dmg", info:"Dropbox v145 — du kör v210",          size:"92 MB",    risk:"high"},
  {id:3,emoji:"😂",type:"Skärmdump",name:"Screenshot_2024-01-02.png",info:"Meme sparad för 8 månader sedan",  size:"1.1 MB",   risk:"low"},
  {id:4,emoji:"🎬",type:"Video",     name:"vacation_2022.mp4",     info:"Aldrig öppnad på 2 år",               size:"2 100 MB", risk:"high"},
  {id:5,emoji:"📄",type:"PDF",       name:"elräkning_2018.pdf",    info:"Faktura från 2018 — 7 år gammal",     size:"0.2 MB",   risk:"medium"},
  {id:6,emoji:"🎂",type:"Bild",      name:"IMG_5821.jpg",          info:"98% match med IMG_5820",              size:"4.1 MB",   risk:"low"},
];

function SwipeClean() {
  const [idx, setIdx] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [kept, setKept] = useState([]);
  const [trashed, setTrashed] = useState([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [hapticTrig, setHapticTrig] = useState(0);
  const startX = useRef(0);
  const current = swipeItems[idx];
  const done = idx >= swipeItems.length;
  const co2 = (totalSaved / 1024 * 0.002).toFixed(4);
  const costSaved = (totalSaved / 1024 / 15 * 29).toFixed(2);

  const decide = (keep) => {
    const item = swipeItems[idx];
    if (!keep) {
      setTrashed(t => [...t, item]);
      setTotalSaved(s => s + parseFloat(item.size.replace(/[^0-9.]/g, "")));
      setHapticTrig(h => h + 1);
      if (navigator.vibrate) navigator.vibrate([40, 15, 25]);
    } else {
      setKept(k => [...k, item]);
    }
    setSwipeDir(keep ? "right" : "left");
    setTimeout(() => { setSwipeDir(null); setDragX(0); setIdx(i => i + 1); }, 340);
  };

  const cardStyle = swipeDir === "left" ? { animation: "swipeLeft 0.34s ease forwards" }
    : swipeDir === "right" ? { animation: "swipeRight 0.34s ease forwards" }
    : dragging ? { transform: `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`, transition: "none" }
    : { animation: "popIn 0.28s ease both" };

  const tintLeft  = dragging && dragX < -30;
  const tintRight = dragging && dragX > 30;

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
        <div style={{ width:44, height:44, borderRadius:12, background:ACCENT+"1a", display:"grid", placeItems:"center", fontSize:22 }}>✨</div>
        <div><h2 style={{ fontSize:20, fontWeight:700 }}>Swipe-to-Clean</h2><p style={{ color:MUTED, fontSize:13 }}>← Radera · Behåll → · Raderade filer går till Karantän</p></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:18 }}>
        <div style={{...S.sub,textAlign:"center",padding:"12px 6px"}}><Stat label="Frigjort" value={totalSaved>1000?(totalSaved/1024).toFixed(1):Math.round(totalSaved)} unit={totalSaved>1000?" GB":" MB"} color={ACCENT}/></div>
        <div style={{...S.sub,textAlign:"center",padding:"12px 6px"}}><Stat label="CO₂ sparat" value={co2} unit=" kg" color={ACCENT}/></div>
        <div style={{...S.sub,textAlign:"center",padding:"12px 6px"}}><Stat label="Besparing/mån" value={costSaved} unit=" kr" color={WARN}/></div>
      </div>

      {!done ? (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
          <div style={{ width:"100%", maxWidth:380, display:"flex", gap:3 }}>
            {swipeItems.map((_,i)=><div key={i} style={{ flex:1, height:3, borderRadius:2, background:i<idx?ACCENT:i===idx?ACCENT+"60":BORDER, transition:"background 0.3s" }}/>)}
          </div>
          <div style={{ position:"relative", width:330 }}>
            {idx+1<swipeItems.length&&<div style={{ position:"absolute", top:7, left:"50%", transform:"translateX(-50%) scale(0.96)", width:310, height:230, background:MID, borderRadius:19, border:`1px solid ${BORDER}`, zIndex:0 }}/>}
            <div key={idx} style={{...cardStyle,position:"relative",zIndex:1,width:330,background:tintLeft?"rgba(255,87,87,0.12)":tintRight?"rgba(184,255,87,0.08)":DIM,border:`2px solid ${tintLeft?DANGER+"60":tintRight?ACCENT+"60":BORDER}`,borderRadius:19,padding:26,cursor:"grab",userSelect:"none",overflow:"hidden"}}
              onMouseDown={e=>{setDragging(true);startX.current=e.clientX;}}
              onMouseMove={e=>{if(dragging)setDragX(e.clientX-startX.current);}}
              onMouseUp={()=>{if(Math.abs(dragX)>55)decide(dragX>0);setDragging(false);setDragX(0);}}
              onMouseLeave={()=>{if(dragging){setDragging(false);setDragX(0);}}}>
              <HapticRipple trigger={hapticTrig} color={DANGER}/>
              {tintLeft &&<div style={{ position:"absolute",top:14,right:14,fontSize:20,transform:"rotate(15deg)" }}>🗑️</div>}
              {tintRight&&<div style={{ position:"absolute",top:14,left:14,fontSize:20,transform:"rotate(-15deg)" }}>✓</div>}
              <div style={{ textAlign:"center", marginBottom:16 }}>
                <div style={{ fontSize:56, marginBottom:7 }}>{current.emoji}</div>
                <span style={S.badge(current.risk==="high"?DANGER:current.risk==="medium"?WARN:MUTED)}>{current.type}</span>
              </div>
              <div style={{ textAlign:"center", marginBottom:5 }}>
                <div style={{ fontWeight:700, fontSize:13, fontFamily:"'DM Mono',monospace", marginBottom:4 }}>{current.name}</div>
                <div style={{ color:MUTED, fontSize:13 }}>{current.info}</div>
              </div>
              <div style={{ display:"flex", justifyContent:"center", marginTop:9 }}>
                <span style={{...S.badge(current.risk==="high"?DANGER:MUTED),fontSize:13,padding:"3px 12px"}}>{current.size}</span>
              </div>
              <div style={{ marginTop:12, padding:"7px 10px", background:ACCENT2+"0e", borderRadius:7, fontSize:11, color:ACCENT2, textAlign:"center" }}>
                🛡️ Raderade filer skickas till Digital Karantän (30 dagar)
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:7, color:MUTED, fontSize:12 }}>
            <span>← dra för att radera</span>
            <span style={{ width:4, height:4, borderRadius:"50%", background:MUTED, display:"inline-block", margin:"auto 0" }}/>
            <span>dra för att behålla →</span>
          </div>
          <div style={{ display:"flex", gap:11 }}>
            <button style={{ width:58, height:58, borderRadius:"50%", border:`2px solid ${DANGER}40`, background:DANGER+"12", fontSize:22, cursor:"pointer" }} onClick={()=>decide(false)}>🗑️</button>
            <button style={{ width:58, height:58, borderRadius:"50%", border:`2px solid ${ACCENT}40`, background:ACCENT+"12", fontSize:22, cursor:"pointer" }} onClick={()=>decide(true)}>✓</button>
          </div>
        </div>
      ) : (
        <div style={{...S.card,textAlign:"center",padding:46,animation:"popIn 0.4s ease"}}>
          <PlantCelebration show/>
          <h3 style={{ fontSize:23, fontWeight:800, marginBottom:7 }}>Städningen klar! 🌱</h3>
          <p style={{ color:MUTED, marginBottom:20 }}>Du raderade {trashed.length} filer och behöll {kept.length}</p>
          <div style={{ display:"flex", justifyContent:"center", gap:22, marginBottom:18 }}>
            <Stat label="Frigjort" value={totalSaved>1000?(totalSaved/1024).toFixed(1):Math.round(totalSaved)} unit={totalSaved>1000?" GB":" MB"} color={ACCENT}/>
            <Stat label="CO₂-besparing" value={co2} unit=" kg" color={ACCENT}/>
            <Stat label="Besparing/mån" value={costSaved} unit=" kr" color={WARN}/>
          </div>
          <div style={{...S.sub,maxWidth:400,margin:"0 auto 14px",fontSize:13,lineHeight:1.8,textAlign:"left"}}>
            <div style={{ fontWeight:600, marginBottom:5, color:ACCENT }}>🌍 Miljöpåverkan</div>
            Frigör {totalSaved>1000?(totalSaved/1024).toFixed(1)+" GB":Math.round(totalSaved)+" MB"} → minskar molninfrastrukturens CO₂ med <strong>{co2} kg</strong> — ca {(parseFloat(co2)*5).toFixed(0)} km bilresa.
          </div>
          <div style={{...S.sub,maxWidth:400,margin:"0 auto 18px",fontSize:13,lineHeight:1.8,textAlign:"left",borderColor:ACCENT2+"40"}}>
            <div style={{ fontWeight:600, marginBottom:5, color:ACCENT2 }}>🛡️ Digital Karantän aktiverad</div>
            {trashed.length} filer väntar 30 dagar i karantän. Ingen fil raderas permanent förrän tidsfristen löper ut.
          </div>
          <button style={S.btn(ACCENT)} onClick={()=>{setIdx(0);setKept([]);setTrashed([]);setTotalSaved(0);}}>Städa igen</button>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 🕐  UNDO-HISTORIK — Karantänens Minne
// ════════════════════════════════════════════════════════════════════════════

// Simulated deletion history — files "deleted" at different times in the last 24h
const now = Date.now();
const H = (hoursAgo, minsAgo = 0) => now - hoursAgo * 3_600_000 - minsAgo * 60_000;

const HISTORY_INIT = [
  {
    id: 1, name: "Zoom_installer_5.8.pkg",   icon: "📦", size: "88 MB",    type: "Installatör",
    deletedAt: H(0, 8),  source: "Downloads-detektiven",  recoverable: true,  risk: "low",
    reason: "Gammal installer — programmet redan uppdaterat",
  },
  {
    id: 2, name: "meme_friday.png",           icon: "😂", size: "1.1 MB",  type: "Bild",
    deletedAt: H(0, 23), source: "Swipe-to-Clean",          recoverable: true,  risk: "low",
    reason: "Klassificerad som meme — sparad för 8 månader sedan",
  },
  {
    id: 3, name: "Lägenhetsrenovering 2024/", icon: "🏠", size: "2.3 GB",  type: "Projektmapp",
    deletedAt: H(2, 14), source: "Projekt-detektiven",       recoverable: true,  risk: "medium",
    reason: "Projektet markerat som avslutat",
  },
  {
    id: 4, name: "screenshot_password.png",   icon: "📋", size: "0.3 MB",  type: "Skärmdump",
    deletedAt: H(5, 3),  source: "Visuell Intelligens",       recoverable: true,  risk: "high",
    reason: "Innehöll känslig text (OCR-detekterat)",
  },
  {
    id: 5, name: "invoice_2019_04.pdf",       icon: "📄", size: "0.2 MB",  type: "PDF",
    deletedAt: H(9, 44), source: "Downloads-detektiven",  recoverable: true,  risk: "low",
    reason: "Faktura äldre än 7 år",
  },
  {
    id: 6, name: "New Folder (empty)/",       icon: "📂", size: "0 KB",   type: "Tom mapp",
    deletedAt: H(12, 5), source: "Ghost Files",             recoverable: false, risk: "low",
    reason: "Tom mapp — skrevs över av systemet",
  },
  {
    id: 7, name: "node-v18-installer.zip",    icon: "📦", size: "30 MB",   type: "Installatör",
    deletedAt: H(18, 30),source: "Ghost Files",             recoverable: true,  risk: "low",
    reason: "Node.js 18 — du kör Node 22",
  },
  {
    id: 8, name: "vacation_2020_raw.mp4",     icon: "🎬", size: "4.2 GB",  type: "Video",
    deletedAt: H(23, 10),source: "Swipe-to-Clean",          recoverable: false, risk: "medium",
    reason: "Aldrig öppnad på 4 år — skrevs över av systemet",
  },
];

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const mins  = Math.round(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  if (mins < 60) return `${mins} min sedan`;
  return `${hours} tim sedan`;
}

function timeBar(ts) {
  const age = (Date.now() - ts) / (24 * 3_600_000); // 0–1 within 24h
  return Math.min(100, Math.round(age * 100));
}

function UndoHistory() {
  const [items, setItems] = useState(HISTORY_INIT);
  const [restored, setRestored] = useState([]);
  const [filter, setFilter] = useState("all");
  const [haptic, setHaptic] = useState(0);
  const [confirmPerm, setConfirmPerm] = useState(null);
  const [undoneId, setUndoneId] = useState(null);

  const doRestore = (id) => {
    setUndoneId(id);
    setTimeout(() => {
      setRestored(r => [...r, id]);
      setItems(it => it.filter(x => x.id !== id));
      setUndoneId(null);
    }, 500);
  };

  const permDelete = (id) => {
    setHaptic(h => h + 1);
    setConfirmPerm(null);
    setTimeout(() => setItems(it => it.filter(x => x.id !== id)), 400);
  };

  const filtered = items.filter(x => {
    if (filter === "recoverable") return x.recoverable;
    if (filter === "lost") return !x.recoverable;
    return true;
  });

  const riskColor = r => r === "high" ? DANGER : r === "medium" ? WARN : ACCENT2;
  const sourceColor = s => {
    if (s.includes("Swipe")) return ACCENT;
    if (s.includes("Projekt")) return PURPLE;
    if (s.includes("Ghost")) return MUTED;
    if (s.includes("Visuell")) return ACCENT2;
    return WARN;
  };

  const totalRecoverable = items.filter(x => x.recoverable).length;
  const totalLost        = items.filter(x => !x.recoverable).length;
  const totalSizeMb      = items.reduce((a, x) => {
    const n = parseFloat(x.size);
    return a + (x.size.includes("GB") ? n * 1024 : isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: ACCENT + "1a", display: "grid", placeItems: "center", fontSize: 22 }}>🕐</div>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Undo-historik</h2>
          <p style={{ color: MUTED, fontSize: 13 }}>Allt du raderat de senaste 24 timmarna — med möjlighet att ångra</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <span style={S.badge(ACCENT)}>Rullande 24h-fönster</span>
        </div>
      </div>

      {/* How it works strip */}
      <div style={{ ...S.sub, display: "flex", gap: 18, alignItems: "center", marginBottom: 18, padding: "12px 18px", background: ACCENT + "06", borderColor: ACCENT + "20" }}>
        <div style={{ fontSize: 20 }}>💡</div>
        <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
          Filer som skickas till <strong style={{ color: ACCENT2 }}>Digital Karantän</strong> finns kvar i 30 dagar och syns här tills de skrivs över av systemet.
          Filer markerade <span style={{ color: DANGER, fontWeight: 600 }}>Ej återställbar</span> har redan skrivits över i filsystemet — men finns fortfarande i karantänen om du agerar snabbt.
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 18 }}>
        {[
          { label: "Raderade filer",     value: items.length,           color: MUTED },
          { label: "Återställbara",      value: totalRecoverable,       color: ACCENT },
          { label: "Möjligen förlorade", value: totalLost,              color: DANGER },
          { label: "Total storlek",      value: totalSizeMb > 1024 ? (totalSizeMb/1024).toFixed(1) : Math.round(totalSizeMb), unit: totalSizeMb > 1024 ? " GB" : " MB", color: WARN },
        ].map(s => <div key={s.label} style={{ ...S.sub, textAlign: "center", padding: "12px 6px" }}><Stat {...s} /></div>)}
      </div>

      {/* Timeline visual */}
      <div style={{ ...S.card, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontWeight: 600, fontSize: 14 }}>Tidslinje — senaste 24 timmar</h3>
          <div style={{ display: "flex", gap: 12, fontSize: 11, color: MUTED, fontFamily: "'DM Mono', monospace", alignItems: "center" }}>
            <span>Nu</span>
            <div style={{ flex: 1, width: 200, height: 1, background: BORDER }} />
            <span>24h sedan</span>
          </div>
        </div>
        <div style={{ position: "relative", height: 52 }}>
          {/* Timeline bar */}
          <div style={{ position: "absolute", top: 24, left: 0, right: 0, height: 3, background: BORDER, borderRadius: 2 }} />
          {/* Now indicator */}
          <div style={{ position: "absolute", top: 14, left: 0, width: 2, height: 22, background: ACCENT, borderRadius: 1 }} />
          {/* File dots */}
          {items.map(x => {
            const pct = timeBar(x.deletedAt);
            return (
              <div key={x.id} title={x.name} style={{
                position: "absolute",
                left: `${pct}%`,
                top: x.recoverable ? 10 : 30,
                width: 12, height: 12, borderRadius: "50%",
                background: x.recoverable ? riskColor(x.risk) : MUTED,
                border: `2px solid #0a0a0f`,
                transform: "translateX(-50%)",
                cursor: "pointer",
                transition: "transform 0.2s",
                zIndex: 1,
              }} />
            );
          })}
          {/* Labels */}
          <div style={{ position: "absolute", bottom: 0, left: 0, fontSize: 10, color: MUTED, fontFamily: "'DM Mono', monospace" }}>← återställbara</div>
          <div style={{ position: "absolute", bottom: 0, right: 0, fontSize: 10, color: MUTED, fontFamily: "'DM Mono', monospace" }}>möjligen förlorade →</div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {[{ c: ACCENT, l: "Låg risk" }, { c: WARN, l: "Medium risk" }, { c: DANGER, l: "Hög risk" }, { c: MUTED, l: "Möjligen förlorad" }].map(b => (
            <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: MUTED }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: b.c }} />{b.l}
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
        {[{ id: "all", l: `Alla (${items.length})` }, { id: "recoverable", l: `✓ Återställbara (${totalRecoverable})` }, { id: "lost", l: `⚠️ Möjligen förlorade (${totalLost})` }].map(f => (
          <button key={f.id} style={S.navBtn(filter === f.id)} onClick={() => setFilter(f.id)}>{f.l}</button>
        ))}
      </div>

      {/* File list */}
      <div style={S.card}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0" }}>
            <PlantCelebration show />
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 5 }}>Ingenting att visa</div>
            <div style={{ color: MUTED }}>Inga raderade filer i den valda kategorin.</div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 9 }}>
            {filtered.map(item => {
              const age = timeBar(item.deletedAt);
              const isUndoing = undoneId === item.id;

              return (
                <div key={item.id} style={{
                  ...S.sub,
                  position: "relative",
                  display: "flex", gap: 13, alignItems: "center",
                  opacity: isUndoing ? 0 : 1,
                  transform: isUndoing ? "translateX(-30px) scale(0.95)" : "none",
                  transition: "all 0.45s ease",
                  borderColor: item.recoverable ? BORDER : MUTED + "30",
                  overflow: "hidden",
                }}>
                  <HapticRipple trigger={isUndoing ? haptic + 1 : 0} color={ACCENT} />

                  {/* Icon + recoverability */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: item.recoverable ? ACCENT + "10" : MUTED + "12", display: "grid", placeItems: "center", fontSize: 20, border: `1px solid ${item.recoverable ? ACCENT + "25" : BORDER}` }}>
                      {item.icon}
                    </div>
                    <div style={{ position: "absolute", bottom: -3, right: -3, width: 14, height: 14, borderRadius: "50%", background: item.recoverable ? ACCENT : MUTED, display: "grid", placeItems: "center", fontSize: 8, border: "1.5px solid #0a0a0f" }}>
                      {item.recoverable ? "✓" : "⚠"}
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600, fontSize: 13, fontFamily: "'DM Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 240 }}>{item.name}</span>
                      <span style={S.badge(sourceColor(item.source))}>{item.source}</span>
                      {!item.recoverable && <span style={S.badge(DANGER)}>Ej återställbar</span>}
                    </div>
                    <div style={{ fontSize: 12, color: MUTED, marginBottom: 5 }}>{item.reason}</div>

                    {/* Age progress bar */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ flex: 1, height: 3, background: BORDER, borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${age}%`, background: age > 80 ? DANGER : age > 50 ? WARN : ACCENT, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 10, color: MUTED, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{timeAgo(item.deletedAt)}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
                    <span style={S.badge(MUTED)}>{item.size}</span>
                    <span style={S.badge(riskColor(item.risk))}>{item.type}</span>
                  </div>

                  <div style={{ display: "flex", gap: 5 }}>
                    {item.recoverable ? (
                      <button
                        style={{ ...S.btn(ACCENT), padding: "6px 14px", fontSize: 12 }}
                        onClick={() => doRestore(item.id)}>
                        ↩ Ångra
                      </button>
                    ) : (
                      <button
                        style={{ ...S.btn(MUTED, true), padding: "6px 12px", fontSize: 11, border: `1px solid ${MUTED}30`, color: MUTED, cursor: "not-allowed" }}
                        disabled>
                        Förlorad
                      </button>
                    )}
                    <button
                      style={{ ...S.btn(DANGER, true), padding: "6px 10px", fontSize: 11 }}
                      onClick={() => setConfirmPerm(item)}>
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {restored.length > 0 && (
          <div style={{ marginTop: 14, padding: "10px 14px", background: ACCENT + "0a", borderRadius: 9, border: `1px solid ${ACCENT}20`, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>✓</span>
            <span style={{ fontSize: 13, color: ACCENT }}>
              {restored.length} fil{restored.length > 1 ? "er" : ""} återställd{restored.length > 1 ? "a" : ""} till ursprungsplatsen
            </span>
          </div>
        )}
      </div>

      {/* Permanent delete confirm */}
      {confirmPerm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.78)", display: "grid", placeItems: "center", zIndex: 300, backdropFilter: "blur(5px)" }}
          onClick={() => setConfirmPerm(null)}>
          <div style={{ ...S.card, maxWidth: 400, width: "92%", animation: "popIn 0.25s ease", border: `1px solid ${DANGER}40` }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{confirmPerm.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8, color: DANGER }}>Radera permanent?</h3>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>{confirmPerm.name}</p>
            <p style={{ color: MUTED, fontSize: 13, marginBottom: 18, lineHeight: 1.65 }}>
              Denna post tas bort från historiken. Filen finns fortfarande i Digital Karantän tills 30-dagarsfristen löper ut.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ ...S.btn(DANGER), flex: 1 }} onClick={() => permDelete(confirmPerm.id)}>Ta bort från historik</button>
              <button style={{ ...S.btn(MUTED, true), flex: 1, border: `1px solid ${BORDER}`, color: TEXT }} onClick={() => setConfirmPerm(null)}>Avbryt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("history");

  const tabs = [
    { id: "visual",     label: "👁️  Visuell AI"   },
    { id: "downloads",  label: "🔍  Downloads"    },
    { id: "browser",    label: "🌐  Browser"       },
    { id: "privacy",    label: "🔒  Integritet"    },
    { id: "swipe",      label: "✨  Swipe"         },
    { id: "quarantine", label: "🛡️  Karantän",    isNew: true },
    { id: "projects",   label: "🕵️  Projekt",     isNew: true },
    { id: "ghost",      label: "👻  Spökfiler",    isNew: true },
    { id: "history",    label: "🕐  Undo-historik", isNew: true },
  ];

  const panels = { visual: VisualIntelligence, downloads: DownloadsDetective, browser: BrowserCleaner, privacy: PrivacyStack, swipe: SwipeClean, quarantine: DigitalQuarantine, projects: ProjectDetective, ghost: GhostFiles, history: UndoHistory };
  const Panel = panels[tab];

  return (
    <>
      <style>{fonts}{css}</style>
      <div style={S.app}>
        <header style={S.header}>
          <div style={S.logo}>
            <div style={S.dot}/>
            <span>ClearSpace</span>
            <span style={{...S.badge(ACCENT),marginLeft:7,fontSize:10}}>v2.1</span>
          </div>
          <nav style={S.nav}>
            {tabs.map(t => (
              <div key={t.id} style={{ position: "relative" }}>
                <button style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
                {t.isNew && <div style={{ position:"absolute", top:-1, right:-1, width:7, height:7, borderRadius:"50%", background:ACCENT, border:"1.5px solid #0a0a0f" }}/>}
              </div>
            ))}
          </nav>
          <div style={{ display:"flex", gap:9, alignItems:"center", flexShrink:0 }}>
            <span style={S.badge(ACCENT)}>● 4 832 filer</span>
            <span style={{...S.badge(WARN),cursor:"pointer"}}>6.8 GB frigjort</span>
          </div>
        </header>
        <main style={{ flex:1, padding:"28px 32px", maxWidth:1100, width:"100%", margin:"0 auto" }}>
          <Panel/>
        </main>
      </div>
    </>
  );
}
