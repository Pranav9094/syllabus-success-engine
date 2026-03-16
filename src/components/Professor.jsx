import React, { useState } from 'react';

const Professor = ({ planData, professorName = 'NOVA' }) => {
  const [messages, setMessages] = useState([{
    from: 'professor',
    text: `⚡ Yo! I'm ${professorName}, your AI study buddy. I've analyzed your ${planData?.length || 15}-week plan. Ask me anything — topics, strategy, exam prep!`
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input;
    setMessages(prev => [...prev, { from: 'user', text: userInput }]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are NOVA, a futuristic cyberpunk AI study professor. You have the student's ${planData?.length || 15}-week study plan. Be sharp, concise, and energetic. Use ⚡ occasionally. Max 3 sentences.`,
          messages: [{ role: 'user', content: userInput }]
        })
      });

      const data = await response.json();

      // Safe check karo pehle
      if (data && data.content && data.content.length > 0) {
        setMessages(prev => [...prev, { from: 'professor', text: data.content[0].text }]);
      } else if (data && data.error) {
        setMessages(prev => [...prev, { from: 'professor', text: `⚡ API Error: ${data.error.message}` }]);
      } else {
        setMessages(prev => [...prev, { from: 'professor', text: `⚡ Something went wrong. Try again!` }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { from: 'professor', text: `⚡ Stay locked in! Your ${planData?.length || 15}-week plan is solid. Focus on high-intensity weeks first!` }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex', flexDirection: 'column', fontFamily: 'DM Sans, sans-serif', padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', color: '#F5E642', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem', letterSpacing: '3px' }}>⚡ AI PROFESSOR</h1>
        <p style={{ color: '#444433', fontSize: '0.875rem', fontFamily: 'Space Mono, monospace' }}>NOVA — YOUR CYBERPUNK STUDY BUDDY</p>
      </div>

      <div style={{ flex: 1, backgroundColor: '#0f0f0f', borderRadius: '16px', border: '1px solid #1f1f00', padding: '1.5rem', maxWidth: '720px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '500px', maxHeight: '500px', overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
            {msg.from === 'professor' && (
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050505', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace', marginRight: '0.75rem', flexShrink: 0 }}>⚡</div>
            )}
            <div style={{ maxWidth: '70%', backgroundColor: msg.from === 'user' ? '#F5E642' : '#1a1a00', color: msg.from === 'user' ? '#050505' : '#cccc99', padding: '0.875rem 1rem', borderRadius: msg.from === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0', fontSize: '0.9rem', lineHeight: '1.6', border: msg.from === 'professor' ? '1px solid #1f1f00' : 'none' }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#050505', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}>⚡</div>
            <div style={{ backgroundColor: '#1a1a00', border: '1px solid #1f1f00', borderRadius: '16px 16px 16px 0', padding: '0.875rem 1rem', color: '#444433', fontSize: '0.85rem', fontFamily: 'Space Mono, monospace' }}>processing...</div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: '720px', width: '100%', margin: '1rem auto 0', display: 'flex', gap: '0.75rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Ask NOVA anything..."
          style={{ flex: 1, backgroundColor: '#0f0f0f', color: '#cccc99', padding: '0.875rem 1.25rem', borderRadius: '8px', border: '1px solid #1f1f00', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem' }} />
        <button onClick={sendMessage} style={{ backgroundColor: '#F5E642', color: '#050505', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px' }}>
          SEND ⚡
        </button>
      </div>
    </div>
  );
};

export default Professor;