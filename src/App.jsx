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
  .card { background: #16161d; padding: 25px; border-radius: 166px; border: 1px solid #2a2a35; border-radius: 16px; }
  .card h3 { font-family: 'Syne', sans-serif; color: #6366f1; margin-bottom: 10px; font-size: 1.3rem; }
  .faq-item { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #1a1a25; }
  .faq-item strong { color: #6366f1; display: block; margin-bottom: 8px; font-size: 1.1rem; }
  .privacy-box { background: linear-gradient(145deg, #16161d, #1a1a2e); padding: 40px; border-radius: 24px; border: 1px solid #6366f144; margin: 60px 0; }
  .legal-section { background: #07070c; padding: 60px 0; border-top: 1px solid #2a2a35; font-size: 0.85rem; }
  .legal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-top: 20px; }
  .legal-box h4 { color: #6366f1; margin-bottom: 10px; font-family: 'Syne', sans-serif; }
  footer { text-align: center; padding: 80px 20px; opacity: 0.5; font-size: 0.85rem; border-top: 1px solid #2a2a35; }
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
        <p style={{fontSize: '0.9rem', opacity: 0.6}}>100% Private. 100% Local. 100% Focus.</p>
      </header>

      <div className="container">
        <section>
          <h2>🧠 How It Works</h2>
          <p style={{fontSize: '1.1rem', opacity: 0.85}}>
            Most cleaning tools only see file sizes. We see context. ClearSpace uses <strong>Local Visual Intelligence (CLIP)</strong> and a <strong>Local LLM (Phi-3 Mini)</strong> to actually "see" and understand your data. Whether it’s identifying the best shot in a burst of photos, reading text in old screenshots, or identifying "dead" code projects, ClearSpace does the heavy lifting for you.
          </p>
        </section>

        <section>
          <h2>🛠️ Key Features</h2>
          <div className="grid">
            <div className="card">
              <h3>1. Swipe-to-Clean</h3>
              <p>The most addictive way to tidy up. Left to delete, right to keep. Turn the chore of file management into a high-speed productivity game.</p>
            </div>
            <div className="card">
              <h3>2. Developer’s Deep-Purge</h3>
              <p>Built specifically for devs. We hunt down hidden space-hogs like forgotten node_modules, venv, and dist folders in projects you haven't touched in months. Clean your environment without breaking your code.</p>
            </div>
            <div className="card">
              <h3>3. AI Narrative & Project Necromancy</h3>
              <p>Our local AI doesn't just list files—it tells their story. It identifies "Ghost Projects" and "Existential Crisis" files (like CV_final_v2_REAL_FINAL.pdf) and gives you smart, witty suggestions on what to archive.</p>
            </div>
            <div className="card">
              <h3>4. Digital Feng Shui & Mental Load</h3>
              <p>Your desktop is your headspace. We calculate your Mental Load Score based on digital clutter and offer a one-click Zen Mode to hide distractions and help you reach deep focus.</p>
            </div>
            <div className="card">
              <h3>5. Carbon Ledger & Green Streak</h3>
              <p>See the impact of your actions. Every GB you delete reduces the need for cloud storage and lowers your digital carbon footprint. Track your "Green Streak" and see how many trees your cleaning efforts represent.</p>
            </div>
          </div>
        </section>

        <section className="privacy-box">
          <h2>🔒 Privacy First</h2>
          <p style={{marginBottom: '20px'}}><strong>Zero-Network Policy.</strong> ClearSpace AI operates entirely offline.</p>
          <ul style={{listStyle: 'none', lineHeight: '2', opacity: 0.9}}>
            <li>🔹 <strong>No Cloud:</strong> Your data never leaves your machine.</li>
            <li>🔹 <strong>No Logs:</strong> We don't track what you delete.</li>
            <li>🔹 <strong>AI Audit Log:</strong> View a real-time log of exactly what our local models are processing. 0 bytes sent to the internet, every single time.</li>
          </ul>
        </section>

        <section>
          <h2>📅 The Weekly Reset</h2>
          <p>Build a habit of clarity. Don't just clean once; stay clean. Our built-in <strong>Weekly Schedule</strong> helps you maintain a lean machine with automated reminders and "The Sunday Reset" rituals. Track your weekly streaks and keep your computer (and mind) in peak performance.</p>
        </section>

        <section style={{marginTop: '80px'}}>
          <h2>❓ FAQ</h2>
          <div className="faq-item">
            <strong>What does it cost?</strong>
            <p>ClearSpace costs 99 SEK per month. No hidden fees, no long-term contracts. Cancel anytime.</p>
          </div>
          <div className="faq-item">
            <strong>Is it truly private?</strong>
            <p>Yes. All AI models (Phi-3 Mini and CLIP) run 100% locally on your device’s GPU/CPU. We have no servers to send your data to.</p>
          </div>
          <div className="faq-item">
            <strong>Does it support developer environments?</strong>
            <p>Absolutely. We have specialized "Detectors" for npm, yarn, pnpm, python, and rust build artifacts.</p>
          </div>
          <div className="faq-item">
            <strong>Which OS are supported?</strong>
            <p>ClearSpace v2.1 works on macOS and Windows.</p>
          </div>
          <div className="faq-item">
            <strong>What happens to deleted files?</strong>
            <p>They enter our Digital Quarantine—a secure 30-day safety net. You can restore any file with a single click before they are permanently purged.</p>
          </div>
        </section>
      </div>

      <section className="legal-section">
        <div className="container">
          <h2>⚖️ Legal & Compliance</h2>
          <div className="legal-grid">
            <div className="legal-box">
              <h4>Terms of Service</h4>
              <p>By using ClearSpace AI, you agree to our terms. Software is provided "as is". You are responsible for your file management decisions.</p>
            </div>
            <div className="legal-box">
              <h4>Privacy Policy</h4>
              <p>100% Local processing. We only collect your email address for subscription management via Paddle. No personal data ever leaves your machine.</p>
            </div>
            <div className="legal-box">
              <h4>Refund Policy</h4>
              <p>We offer a 14-day no-questions-asked refund policy. Contact support for a full refund within 14 days of purchase.</p>
            </div>
            <div className="legal-box">
              <h4>Contact & Support</h4>
              <p>Email: <strong>support@clearspace-ai.app</strong></p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 ClearSpace AI. Registered in Sweden. Built for developers who value focus.</p>
      </footer>
    </>
  );
}
