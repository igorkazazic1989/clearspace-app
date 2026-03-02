/* global Paddle */
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

// --- GLOBAL STYLING & FONTS ---
const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const ACCENT  = "#b8ff57";
const BORDER  = "#2e2e42";
const TEXT    = "#e8e8f0";
const MUTED   = "#6b6b88";

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: ${TEXT}; font-family: 'Syne', sans-serif; line-height: 1.6; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid ${BORDER}; }
  .hero h1 { font-size: 3.5rem; margin-bottom: 15px; letter-spacing: -2px; }
  .btn { background: ${ACCENT}; color: #0a0a0f; padding: 16px 28px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(184, 255, 87, 0.2); }
  .input-field { background: #16161d; border: 1px solid ${BORDER}; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; margin-bottom: 10px; outline: none; }
  .container { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
  .feature-card { background: #1a1a26; padding: 30px; border-radius: 20px; border: 1px solid ${BORDER}; }
  .feature-card h3 { color: ${ACCENT}; margin-bottom: 10px; }
  .legal-box { background: #111119; padding: 25px; border-radius: 16px; border: 1px solid ${BORDER}; font-size: 0.9rem; }
  footer { text-align: center; padding: 80px 20px; opacity: 0.6; font-size: 0.85rem; border-top: 1px solid ${BORDER}; }
  .badge { background: rgba(184, 255, 87, 0.1); color: ${ACCENT}; padding: 4px 12px; border-radius: 20px; display: inline-block; font-size: 0.8rem; margin-bottom: 20px; }
`;

// --- LANDING PAGE COMPONENT ---
function LandingPage({ email, setEmail, handleLogin, loading }) {
  return (
    <>
      <header className="hero">
        <div className="badge">V2.1 – PRIVATE ACCESS</div>
        <h1>ClearSpace AI</h1>
        <p style={{ fontSize: '1.3rem', opacity: 0.9, marginBottom: '40px' }}>
          Den enda digitala städaren som faktiskt förstår dina filer.
        </p>
        <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
          <input className="input-field" type="email" placeholder="Din e-post" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? "Skickar..." : "Starta 7-dagars Trial"}
          </button>
        </form>
      </header>
      <section className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Varför ClearSpace?</h2>
        <div className="feature-grid">
          <div className="feature-card"><h3>🔒 100% Lokal AI</h3><p>Ingen data lämnar din dator.</p></div>
          <div className="feature-card"><h3>⚡ Developer Purge</h3><p>Rensa node_modules automatiskt.</p></div>
          <div className="feature-card"><h3>✨ Swipe-to-Clean</h3><p>Gör städningen addictive.</p></div>
        </div>
      </section>
      <section className="container">
        <div className="feature-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="legal-box"><h4>Terms of Use</h4><p>Prenumerationer hanteras via Paddle.</p></div>
          <div className="legal-box"><h4>Privacy Policy</h4><p>Vi säljer aldrig din data.</p></div>
        </div>
      </section>
    </>
  );
}

// --- MAIN APP ---
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