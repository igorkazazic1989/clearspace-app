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