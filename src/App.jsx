import { useState } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: white; font-family: 'DM Mono', monospace; line-height: 1.6; }
  .hero { padding: 100px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2a2a35; }
  .hero h1 { font-family: 'Syne', sans-serif; font-size: 3.5rem; margin-bottom: 15px; letter-spacing: -1px; }
  .btn { background: #6366f1; color: white; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; display: inline-block; margin: 20px 0; transition: 0.2s; border: none; cursor: pointer; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
  .container { max-width: 900px; margin: 0 auto; padding: 80px 20px; }
  h2 { font-family: 'Syne', sans-serif; font-size: 2.2rem; margin: 40px 0 20px; color: #fff; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 30px; }
  .card { background: #16161d; padding: 25px; border-radius: 16px; border: 1px solid #2a2a35; }
  .card h3 { font-family: 'Syne', sans-serif; color: #6366f1; margin-bottom: 10px; font-size: 1.3rem; }
  .faq-item { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #1a1a25; }
  .faq-item strong { color: #6366f1; display: block; margin-bottom: 8px; font-size: 1.1rem; }
  .legal-section { background: #07070c; padding: 60px 0; border-top: 1px solid #2a2a35; font-size: 0.9rem; }
  .legal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 20px; }
  .legal-box h4 { color: #6366f1; margin-bottom: 10px; font-family: 'Syne', sans-serif; }
  footer { text-align: center; padding: 40px; opacity: 0.5; font-size: 0.8rem; }
`;

export default function App() {
  return (
    <>
      <style>{fonts}{css}</style>
      
      <header className="hero">
        <div style={{color: '#6366f1', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px'}}>VERSION 2.1</div>
        <h1>ClearSpace AI</h1>
        <p style={{fontSize: '1.4rem', opacity: 0.9}}>Declutter your digital life. One swipe at a time.</p>
        <button className="btn">Get Started – 99 SEK/mo</button>
      </header>

      <div className="container">
        {/* Huvudinnehåll (How It Works, Features, etc.) */}
        <section>
          <h2>🧠 How It Works</h2>
          <p>ClearSpace uses <strong>Local Visual Intelligence</strong> and a <strong>Local LLM</strong> to understand your data. Everything happens on your machine, 100% private.</p>
        </section>

        <section style={{marginTop: '60px'}}>
          <h2>🛠️ Key Features</h2>
          <div className="grid">
            <div className="card"><h3>Swipe-to-Clean</h3><p>Left to delete, right to keep. High-speed productivity.</p></div>
            <div className="card"><h3>Dev Deep-Purge</h3><p>Finds hidden node_modules and build artifacts.</p></div>
            <div className="card"><h3>AI Narrative</h3><p>Witty suggestions on what to archive.</p></div>
          </div>
        </section>
      </div>

      {/* JURIDISK SEKTION FÖR PADDLE */}
      <section className="legal-section">
        <div className="container">
          <h2>⚖️ Legal & Compliance</h2>
          <div className="legal-grid">
            <div className="legal-box">
              <h4>Terms of Service</h4>
              <p>By using ClearSpace AI, you agree that this software is provided "as is". You are responsible for the files you choose to delete. ClearSpace AI is a tool to assist in digital organization and does not guarantee specific storage gains.</p>
            </div>
            <div className="legal-box">
              <h4>Privacy Policy</h4>
              <p>We value your privacy. ClearSpace AI operates 100% locally. We do not collect, store, or transmit your personal files. We only collect your email address for account management and subscription updates via Paddle.</p>
            </div>
            <div className="legal-box">
              <h4>Refund Policy</h4>
              <p>We offer a 14-day no-questions-asked refund policy. If you are not satisfied with ClearSpace AI within the first 14 days of your subscription, contact our support for a full refund.</p>
            </div>
            <div className="legal-box">
              <h4>Contact & Support</h4>
              <p>Questions? Need help? Reach out to us at:<br/><strong>support@clearspace-ai.app</strong></p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 ClearSpace AI. Registered in Sweden. All rights reserved.</p>
      </footer>
    </>
  );
}
