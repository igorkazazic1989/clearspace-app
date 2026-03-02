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
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error