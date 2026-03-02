/* global Paddle */
import React, { useState, useEffect } from "react";
import { supabase } from "./supabase";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: #e8e8f0; font-family: 'Syne', sans-serif; line-height: 1.6; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2e2e42; }
  .hero h1 { font-size: 3.5rem; margin-bottom: 15px; letter-spacing: -2px; line-height: 1.1; }
  .btn { background: #b8ff57; color: #0a0a0f; padding: 16px 28px; border-radius: 12px; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(184, 255, 87, 0.2); }
  .input-field { background: #16161d; border: 1px solid #2e2e42; padding: 16px; border-radius: 12px; color: white; width: 100%; max-width: 400px; margin-bottom: 10px; outline: none; font-family: 'DM Mono', monospace; }
  .container { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
  .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; margin-top: 40px; }
  .feature-card { background: #1a1a26; padding: 30px; border-radius: 20px; border: 1px solid #2e2e42; }
  .feature-card h3 { color: #b8ff57; margin-bottom: 10px; }
  .legal-box { background: #111119; padding: 20px; border-radius: 12px; border: 1px solid #2e2e42; font-size: 0.85rem; }
  footer { text-align: center; padding: 60px 20px; opacity: 0.6; font-size: 0.85rem; border-top: 1px solid #2e2e42; }
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
    else alert("Check your email for the magic link!");
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
      alert("Payment system is loading...");
    }
  };

  return (
    <>
      <style>{fonts}{css}</style>
      
      <header className="hero">
        <div style={{ background: 'rgba(184, 255, 87, 0.1)', color: '#b8ff57', padding: '4px 12px', borderRadius: '20px', display: 'inline-block', fontSize: '0.8rem', marginBottom: '20px' }}>
          V2.1 – PRIVATE BETA
        </div>
        <h1>ClearSpace AI</h1>
        <p style={{ fontSize: '1.4rem', opacity: 0.9, marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
          Declutter your digital life. One swipe at a time. Powered by local AI.
        </p>

        {!session ? (
          <form onSubmit={handleLogin} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <input 
              className="input-field" 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ?