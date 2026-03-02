/* global Paddle */
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

// --- MODELLER & KONSTANTER (Från din fil) ---
const ACCENT  = "#b8ff57";
const ACCENT2 = "#57c8ff";
const DANGER  = "#ff5757";
const WARN    = "#ffb957";
const BORDER  = "#2e2e42";
const TEXT    = "#e8e8f0";
const MUTED   = "#6b6b88";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: ${TEXT}; font-family: 'Syne', sans-serif; line-height: 1.6; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid ${BORDER}; }
  .hero h1 { font-size: 3.8rem; margin-bottom: 15px; letter-spacing: -2px; line-height: 1.1; }
  .btn { background: ${ACCENT}; color: #0a0a0f; padding: 16px 28px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(184, 255, 87, 0.2); }
  .input-field { background: #16161d; border: 1px solid ${BORDER}; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; margin-bottom: 10px; outline: none; font-family: 'DM Mono', monospace; }
  .container { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
  .feature-card { background: #1a1a26; padding: 30px; border-radius: 20px; border: 1px solid ${BORDER}; }
  .feature-card h3 { color: ${ACCENT}; margin-bottom: 10px; }
  .legal-box { background: #111119; padding: 25px; border-radius: 16px; border: 1px solid ${BORDER}; font-size: 0.9rem; line-height: 1.7; }
  .legal-box h4 { color: ${ACCENT}; margin-bottom: 15px; font-family: 'Syne', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; }
  footer { text-align: center; padding: 80px 20px; opacity: 0.6; font-size: 0.85rem; border-top: 1px solid ${BORDER}; }
  .badge { background: rgba(184, 255, 87, 0.1); color: ${ACCENT}; padding: 4px 12px; border-radius: 20px; display: inline-block; font-size: 0.8rem; margin-bottom: 20px; font-weight: 700; }
`;

// --- LANDNINGSSIDA (Visas om utloggad) ---
function LandingPage({ email, setEmail, handleLogin, loading }) {
  return (
    <>
      <header className="hero">
        <div className="badge">V2.1 – PRIVATE ACCESS</div>
        <h1>ClearSpace AI</h1>
        <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '40px', maxWidth: '750px', margin: '0 auto 40px' }}>
          Den enda digitala städaren som faktiskt förstår dina filer. <br/>
          Lokala AI-modeller. 100% integritet. Inget moln.
        </p>

        <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input 
            className="input-field" 
            type="email" 
            placeholder="Ange din e-post för tillgång" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Skickar länk..." : "Starta 7-dagars Trial"}
          </button>
          <p style={{ fontSize: '0.85rem', marginTop: '15px', color: MUTED }}>
            Ingen bindningstid. 99 SEK/mån efter trial.
          </p>
        </form>
      </header>

      <section className="container">
        <h2 style={{ textAlign: 'center', fontSize: '2.8rem', marginBottom: '50px' }}>Vad gör oss unika?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔒 100% Lokal AI</h3>
            <p>Vi använder <strong>CLIP</strong> och <strong>Phi-3 Mini</strong> som körs direkt på din processor. Dina bilder och dokument analyseras lokalt – vi skickar aldrig en enda pixel till internet.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Developer Purge</h3>
            <p>ClearSpace förstår kodprojekt. Vi hittar automatiskt gigantiska <code>node_modules</code> och build-filer i projekt du inte rört på månader.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Kontextuell Analys</h3>
            <p>Istället för att bara leta efter stora filer, förstår vår AI historien bakom dem. Den hittar dubbletter, suddiga foton och "Ghost Projects" som bara tar plats.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Carbon Ledger</h3>
            <p>Varje gigabyte du rensar minskar behovet av framtida molnlagring. Vi spårar din CO₂-besparing i realtid.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ background: '#0d0d14', borderRadius: '30px', margin: '40px auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>Legal & Trust Center</h2>
        <div className="feature-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="legal-box">
            <h4>Terms of Use</h4>
            <p>Genom att använda ClearSpace AI accepterar du att mjukvaran hanterar dina lokala filer. Tjänsten tillhandahålls "i befintligt skick". Du ansvarar själv för att granska filer i Digital Quarantine innan de raderas permanent efter 30 dagar. Prenumerationer hanteras via Paddle och kan sägas upp när som helst.</p>
          </div>
          <div className="legal-box">
            <h4>Privacy Policy</h4>
            <p>Vi samlar endast in din e-post för inloggning. <strong>Ingen fil-metadata, inget filinnehåll och ingen analysdata lämnar någonsin din dator.</strong> Vi använder Supabase för säker autentisering och Paddle för krypterade betalningar. Vi säljer aldrig din data – vi ser den inte ens.</p>
          </div>
          <div className="legal-box">
            <h4>Refund Policy</h4>
            <p>Vi erbjuder 14 dagars full återbetalning efter din första betalning om du inte är nöjd. Kontakta support@clearspace-ai.app för assistans. Inga frågor ställs.</p>
          </div>
          <div className="legal-box">
            <h4>Säkerhet</h4>
            <p>Alla AI-beräkningar sker i en sandlåda på din enhet. Appen kräver endast läsrättigheter till de mappar du väljer att skanna. Ingen nätverksaktivitet sker under själva analysprocessen.</p>
          </div>
        </div>
      </section>
    </>
  );
}

// --- HUVUDAPP (Inloggningslogik) ---
export default function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) alert(error.message);
    else alert("Inloggningslänk skickad! Kolla din mejl.");
    setLoading(false);
  };

  const handleSubscribe = () => {
    if (!session) return;
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: "pri_01kjfdcenf2ztwdq53mwb2yrsg", quantity: 1 }],
        customData: { userId: session.user.id }
      });
    } else {
      alert("Betalsystemet laddas...");
    }
  };

  // Om användaren är inloggad, visa din stora Dashboard-komponent (skulle importeras här)
  // För detta exempel visar vi en förenklad inloggad vy
  return (
    <>
      <style>{fonts}{css}</style>
      {!session ? (
        <LandingPage email={email} setEmail={setEmail} handleLogin={handleLogin} loading={loading} />
      ) : (
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: `1px solid ${BORDER}`, paddingBottom: '20px' }}>
             <h2 style={{ fontFamily: 'Syne' }}>ClearSpace Dashboard</h2>
             <div style={{ display: 'flex', gap: '15px' }}>
               <span className="badge">Konto: {session.user.email}</span>
               <button onClick={handleSubscribe} className="btn" style={{ padding: '8px 15px', fontSize: '0.9rem' }}>Uppgradera</button>
               <button onClick={() => supabase.auth.signOut()} style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer' }}>Logga ut</button>
             </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', opacity: 0.5 }}>
            [Här laddas din fullständiga AI-Dashboard från declutter-ai.jsx]
          </p>
        </div>
      )}

      <footer>
        <p>© 2026 ClearSpace AI. Registered in Sweden. Built for privacy. Sparmål: 1 500 SEK/mån.</p>
        <p style={{ marginTop: '10px' }}>support@clearspace-ai.app</p>
      </footer>
    </>
  );