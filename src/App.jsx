import React from 'react';

function App() {
  const target = 12000;
  const saved = 1000;
  const progress = (saved / target) * 100;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#38bdf8' }}>CLEARSPACE AI</h1>
      <p>Systemet är redo.</p>
      
      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #334155', borderRadius: '12px', backgroundColor: '#1e293b' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Sparmål 2026</h2>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>{saved} / {target} SEK</div>
        
        <div style={{ width: '100%', height: '20px', backgroundColor: '#334155', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#22c55e' }}></div>
        </div>
        
        <p style={{ marginTop: '10px', color: '#94a3b8' }}>
          Februari status: Du har nått {progress.toFixed(1)}% av ditt årsmål!
        </p>
      </div>
    </div>
  );
}

export default App;
