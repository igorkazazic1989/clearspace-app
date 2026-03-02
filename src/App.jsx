/* global Paddle */
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

// --- STYLES & FONTS (Från din fil) ---
const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #e8e8f0; font-family: 'Syne', sans-serif; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2e2e42; }
  .btn { background: #b8ff57; color: #0a0a0f; padding: 16px 28px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(184, 255, 87, 0.2); }
  .input-field { background: #16161d; border: 1px solid #2e2e42; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; margin-bottom: 10px; outline: none; }
  .container { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
  .feature-card { background: #1a1a26; padding: 30px; border-radius: 20px; border: 1px solid #2e2e42; }
  .feature-card h3 { color: #b8ff57; margin-bottom: 10px; }
  footer { text-align: center; padding: 60px 20px; opacity: 0.6; font-size: 0.9rem; border-top: 1px solid #2e2e42; }
  .legal-box { background: #111119; padding: 20px; border-radius: 12px; border: 1px solid #2e2e42; font-size: 0.85rem; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
`;

// --- DIN DASHBOARD KOMPONENT (Förenklad för App-vyn) ---
function Dashboard({ session, handleSubscribe }) {
  return (
    <div style={{ padding: '40px 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '24px' }}>Welcome back, {session.user.email.split('@')[0]}</h2>
          <p style={{ color: '#6b6b88' }}>Your digital space is 82% optimized.</p>
        </div>
        <button onClick={handleSubscribe} className="btn">Upgrade to Premium</button>
      </header>
      
      <div className="feature-grid">
        <div className="feature-card">
          <h3>✨ Swipe-to-Clean</h3>
          <p>Interactive cleaning module active. 4,832 files analyzed.</p>
        </div>
        <div className="feature-card">
          <h3>🛡️ Digital Quarantine</h3>
          <p>6 files held for safety. Expires in 28 days.</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Dev Deep-Purge</h3>
          <p>Found 2.4 GB of stale node_modules.</p>
        </div>
      </div>
      
      <button onClick={() => supabase.auth.signOut()} style={{ marginTop: '40px', background: 'none', border: 'none', color: '#6b6b88', cursor: 'pointer', textDecoration: 'underline' }}>Log out</button>
    </div>
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
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (error) alert(error.message);
    else alert("Check your email for the magic link!");
    setLoading(false);
  };

  const handleSubscribe = () => {
    if (!session) {
      alert("Please log in first.");
      return;
    }
    if (window.Paddle) {
      window.Paddle.Checkout.open({
        items: [{ priceId: "pri_01kjfdcenf2ztwdq53mwb2yrsg", quantity: 1 }],
        customData: { userId: session.user.id }
      });
    } else {
      alert("Paddle is loading...");
    }
  };

  return (
    <>
      <style>{fonts}{css}</style>
      
      {session ? (
        <div className="container">
          <Dashboard session={session} handleSubscribe={handleSubscribe} />
        </div>
      ) : (
        <>
          <header className="hero">
            <div style={{ background: 'rgba(184, 255, 87, 0.1)', color: '#b8ff57', padding: '4px 12px',