/* global Paddle */
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: white; font-family: 'DM Mono', monospace; line-height: 1.6; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2a2a35; }
  .hero h1 { font-family: 'Syne', sans-serif; font-size: 3.5rem; margin-bottom: 15px; letter-spacing: -2px; }
  .btn { background: #6366f1; color: white; padding: 16px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; transition: 0.2s; font-size: 1.1rem; margin-top: 20px; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
  .input-field { background: #16161d; border: 1px solid #2a2a35; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; font-family: 'DM Mono'; font-size: 1rem; margin-bottom: 10px; outline: none; }
  .container { max-width: 900px; margin: 0 auto; padding: 60px 20px; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 40px; }
  .feature-card { background: #111119; padding: 30px; border-radius: 20px; border: 1px solid #2a2a35; }
  .feature-card h3 { font-family: 'Syne', sans-serif; margin-bottom: 10px; color: #6366f1; }
  footer { text-align: center; padding: 60px 20px; opacity: 0.6; font-size: 0.9rem; border-top: 1px solid #2a2a35; }
  .badge { background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; margin-bottom: 10px; display: inline-block; }
`;

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
    else alert("Kolla din mejl för inloggningslänk!");
    setLoading(false);
  };

  const handleSubscribe = () => {
    if (!session) {
      alert("Vänligen logga in först för att starta din provperiod.");
      return;
    }
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: "pri_01kjfdcenf2ztwdq53mwb2yrsg", quantity: 1 }],
        customData: { userId: session.user.id }
      });
    } else {
      alert("Betalsystemet laddas, prova igen om en sekund.");
    }
  };

  return (
    <>
      <style>{fonts}{css}</style>
      
      <header className="hero">
        <div className="badge">VERSION 2.1 – LIVE NOW</div>
        <h1>ClearSpace AI</h1>
        <p style={{fontSize: '1.2rem', opacity: 0.8, marginBottom: '40px'}}>Declutter your digital life. One swipe at a time.</p>

        {!session ? (
          <form onSubmit={handleLogin} style={{maxWidth: '400px', margin: '0 auto'}}>
            <input 
              className="input-field" 
              type="email" 
              placeholder="din.mail@exempel.se" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit" className="btn" style={{width: '100%'}} disabled={loading}>
              {loading ? "Skickar länk..." : "Sign up to start free trial"}
            </button>
            <p style={{fontSize: '0.8rem', marginTop: '15px', opacity: 0.6}}>99 SEK/month after trial. Cancel anytime.</p>
          </form>
        ) : (
          <div>
            <p style={{color: '#6366f1', marginBottom: '10px'}}>Inloggad som: {session.user.email}</p>
            <button onClick={handleSubscribe} className="btn">Start 7-Day Free Trial</button>
            <button onClick={() => supabase.auth.signOut()} style={{display: 'block', margin: '20px auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer'}}>Logga ut</button>
          </div>
        )}
      </header>

      <section className="container">
        <h2 style={{fontFamily: 'Syne', textAlign: 'center', fontSize: '2rem'}}>🧠 How It Works</h2>
        <p style={{textAlign: 'center', marginTop: '10px', opacity: 0.8}}>ClearSpace uses Local Visual Intelligence and a Local LLM to understand your data. Everything happens on your machine, 100% private.</p>
        
        <div className="feature-grid">
          <div className="feature-card">
            <h3>1. Swipe-to-Clean</h3>
            <p>Left to delete, right to keep. High-speed productivity.</p>
          </div>
          <div className="feature-card">
            <h3>2. Dev Deep-Purge</h3>
            <p>Finds hidden node_modules and build artifacts in old projects.</p>
          </div>
          <div className="feature-card">
            <h3>3. AI Narrative</h3>
            <p>Identify "Ghost Projects" and get witty suggestions on what to archive.</p>
          </div>
        </div>
      </section>

      <footer className="container">
        <p>© 2026 ClearSpace AI. Built for developers. Sparmål: 1 500 SEK/mån.</p>
        <div style={{marginTop: '20px', fontSize: '0.8rem'}}>
          Terms of Service | Privacy Policy | support@clearspace-ai.app
        </div>
      </footer>
    </>
  );
}