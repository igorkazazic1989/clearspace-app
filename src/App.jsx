/* global Paddle */
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: white; font-family: 'DM Mono', monospace; line-height: 1.6; }
  .hero { padding: 120px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2a2a35; }
  .hero h1 { font-family: 'Syne', sans-serif; font-size: 3.8rem; margin-bottom: 15px; letter-spacing: -2px; line-height: 1.1; }
  .btn { background: #6366f1; color: white; padding: 16px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; transition: 0.2s; font-size: 1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
  .input-field { background: #16161d; border: 1px solid #2a2a35; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; font-family: 'DM Mono'; font-size: 1rem; margin-bottom: 20px; outline: none; }
  .container { max-width: 900px; margin: 0 auto; padding: 80px 20px; }
  footer { text-align: center; padding: 80px 20px; opacity: 0.5; font-size: 0.85rem; }
`;

function AuthView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: { emailRedirectTo: window.location.origin }
      });
      if (error) alert(error.message);
      else alert("Kolla din mejl för inloggningslänk!");
    } catch (err) {
      alert("Ett fel uppstod vid inloggning.");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{fonts}{css}</style>
      <header className="hero">
        <h1>ClearSpace AI</h1>
        <p style={{marginBottom: '30px', opacity: 0.8}}>Logga in för att starta din prenumeration.</p>
        <form onSubmit={handleLogin}>
          <input 
            className="input-field" 
            type="email" 
            placeholder="din.mail@exempel.se" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <br />
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Skickar..." : "Logga in / Skapa konto"}
          </button>
        </form>
      </header>
    </>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubscribe = () => {
    if (!session) return;
    if (typeof window !== "undefined" && window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: "pri_01kjfdcenf2ztwdq53mwb2yrsg", quantity: 1 }],
        customData: { userId: session.user.id }
      });
    } else {
      alert("Betalsystemet laddas, försök igen om ett ögonblick.");
    }
  };

  if (!session) return <AuthView />;

  return (
    <>
      <style>{fonts}{css}</style>
      <header className="hero">
        <div style={{color: '#6366f1', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.8rem'}}>KONTO: {session.user.email}</div>
        <h1>ClearSpace AI</h1>
        <button onClick={handleSubscribe} className="btn" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
          Start 7-Day Free Trial
        </button>
        <button onClick={() => supabase.auth.signOut()} style={{display: 'block', margin: '20px auto', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.8rem'}}>Logga ut</button>
      </header>
      <footer className="container">
        <p>© 2026 ClearSpace AI. Mål: 1 500 SEK/mån totalt sparande.</p>
      </footer>
    </>
  );
}