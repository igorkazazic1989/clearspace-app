import { useState } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0f; color: white; font-family: 'DM Mono', monospace; line-height: 1.6; }
  .hero { padding: 120px 20px; text-align: center; background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%); border-bottom: 1px solid #2a2a35; }
  .hero h1 { font-family: 'Syne', sans-serif; font-size: 3.8rem; margin-bottom: 15px; letter-spacing: -2px; line-height: 1.1; }
  
  .waitlist-form { display: flex; gap: 10px; justify-content: center; margin: 30px auto; max-width: 500px; width: 100%; }
  .input-field { background: #16161d; border: 1px solid #2a2a35; padding: 16px; border-radius: 12px; color: white; flex: 1; font-family: 'DM Mono'; font-size: 1rem; outline: none; transition: 0.2s; }
  .input-field:focus { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2); }
  
  .btn { background: #6366f1; color: white; padding: 16px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; transition: 0.2s; font-size: 1rem; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2); }
  
  .success-msg { color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 12px; border: 1px solid #10b98144; margin: 30px auto; max-width: 450px; }

  .container { max-width: 900px; margin: 0 auto; padding: 80px 20px; }
  h2 { font-family: 'Syne', sans-serif; font-size: 2.2rem; margin: 40px 0 20px; color: #fff; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin-top: 30px; }
  .card { background: #16161d; padding: 25px; border-radius: 16px; border: 1px solid #2a2a35; }
  .card h3 { font-family: 'Syne', sans-serif; color: #6366f1; margin-bottom: 10px; font-size: 1.3rem; }
  .privacy-box { background: linear-gradient(145deg, #16161d, #1a1a2e); padding: 40px; border-radius: 24px; border: 1px solid #6366f144; margin: 60px 0; }
  .legal-section { background: #07070c; padding: 60px 0; border-top: 1px solid #2a2a35; font-size: 0.85rem; }
  .legal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-top: 20px; }
  .legal-box h4 { color: #6366f1; margin-bottom: 10px; font-family: 'Syne', sans-serif; }
  footer { text-align: center; padding: 80px 20px; opacity: 0.5; font-size: 0.85rem; border-top: 1px solid #2a2a35; }
`;

export default function App() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      fetch("https://formspree.io/f/xvzbylba", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: email }) }).then(() => setSubmitted(true));
    }
  };

  return (
    <>
      <style>{fonts}{css}</style>
      
      <header className="hero">
        <div style={{color: '#6366f1', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px'}}>VERSION 2.1 – COMING SOON</div>
        <h1>ClearSpace AI</h1>
        <p style={{fontSize: '1.4rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto'}}>Declutter your digital life. One swipe at a time.</p>
        
       <div style={{ textAlign: 'center', marginTop: '30px' }}>
  <button 
    onClick={() => {
      Paddle.Checkout.open({
        items: [{
          priceId: "pri_01kjfdcenf2ztwdq53mwb2yrsg",
          quantity: 1
        }]
      });
    }} 
    className="btn"
    style={{ padding: '20px 40px', fontSize: '1.2rem' }}
  >
    Start 7-Day Free Trial
  </button>
  <p style={{ fontSize: '12px', color: '#888', marginTop: '10px' }}>
    99 SEK/month after trial. Cancel anytime. Card required for verification.
  </p>
</div>
        <p style={{fontSize: '0.9rem', opacity: 0.6}}>Join 500+ developers waiting for focus.</p>
      </header>

      <div className="container">
        <section>
          <h2>🧠 How It Works</h2>
          <p style={{fontSize: '1.1rem', opacity: 0.85}}>
            ClearSpace uses <strong>Local Visual Intelligence</strong> and a <strong>Local LLM</strong> to understand your data. Everything happens on your machine, 100% private.
          </p>
        </section>

        <section>
          <h2>🛠️ Key Features</h2>
          <div className="grid">
            <div className="card"><h3>1. Swipe-to-Clean</h3><p>Left to delete, right to keep. High-speed productivity.</p></div>
            <div className="card"><h3>2. Dev Deep-Purge</h3><p>Finds hidden node_modules and build artifacts in old projects.</p></div>
            <div className="card"><h3>3. AI Narrative</h3><p>Identify "Ghost Projects" and get witty suggestions on what to archive.</p></div>
            <div className="card"><h3>4. Digital Feng Shui</h3><p>Calculate your Mental Load Score and reach deep focus.</p></div>
            <div className="card"><h3>5. Carbon Ledger</h3><p>Track your Green Streak and reduce your digital carbon footprint.</p></div>
          </div>
        </section>

        <section className="privacy-box">
          <h2>🔒 Privacy First</h2>
          <p>ClearSpace AI operates entirely offline. No Cloud. No Logs. No Tracking.</p>
        </section>

        <section style={{marginTop: '80px'}}>
          <h2>❓ FAQ</h2>
          <div>
            <strong>What will it cost?</strong>
            <p>ClearSpace will cost 99 SEK per month when we launch.</p>
          </div>
        </section>
      </div>

      <section className="legal-section">
        <div className="container">
          <h2>⚖️ Legal & Compliance</h2>
          <div className="legal-grid">
            <div className="legal-box">
              <h4>Terms of Service</h4>
              <p>By joining the waitlist, you agree to receive launch updates.</p>
            </div>
            <div className="legal-box">
              <h4>Privacy Policy</h4>
              <p>We only use your email for waitlist updates. No data ever leaves your machine.</p>
            </div>
            <div className="legal-box">
              <h4>Refund Policy</h4>
              <p>We offer a 14-day refund policy upon full launch.</p>
            </div>
            <div className="legal-box">
              <h4>Contact & Support</h4>
              <p>Email: <strong>support@clearspace-ai.app</strong></p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2026 ClearSpace AI. Registered in Sweden. Built for developers.</p>
      </footer>
    </>
  );
}
