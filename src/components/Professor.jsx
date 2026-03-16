import React, { useState } from 'react';

const Professor = ({ planData, professorName = 'Prof. AI' }) => {
  const [messages, setMessages] = useState([
    {
      from: 'professor',
      text: `Hello! I'm ${professorName}, your AI study buddy. I've analyzed your study plan. Ask me anything about your syllabus, weak topics, or exam strategy!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI response (Pranav will connect real API)
    setTimeout(() => {
      const responses = [
        `Great question! Based on your study plan, I recommend focusing on the high-intensity weeks first.`,
        `Looking at your syllabus, this topic usually appears in Week 3-5. Make sure to practice problems daily!`,
        `Pro tip: For this subject, spend 60% time on theory and 40% on practice problems.`,
        `I see you're struggling with this. Let's break it down — start with fundamentals in Week 1.`,
        `Based on your ${planData?.length || 15}-week plan, you have enough time. Stay consistent!`,
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { from: 'professor', text: randomResponse }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'DM Sans, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Space Mono, monospace',
          color: '#1D9E75',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.25rem'
        }}>AI PROFESSOR</h1>
        <p style={{ color: '#555', fontSize: '0.875rem' }}>
          Your personal study buddy — {professorName}
        </p>
      </div>

      {/* Chat Window */}
      <div style={{
        flex: 1,
        backgroundColor: '#111111',
        borderRadius: '16px',
        border: '1px solid #1f1f1f',
        padding: '1.5rem',
        maxWidth: '720px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: '500px',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start'
          }}>
            {/* Professor Avatar */}
            {msg.from === 'professor' && (
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#1D9E75',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0a0a0a',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                fontFamily: 'Space Mono, monospace',
                marginRight: '0.75rem',
                flexShrink: 0
              }}>AI</div>
            )}

            <div style={{
              maxWidth: '70%',
              backgroundColor: msg.from === 'user' ? '#1D9E75' : '#1a1a1a',
              color: msg.from === 'user' ? '#0a0a0a' : 'white',
              padding: '0.875rem 1rem',
              borderRadius: msg.from === 'user'
                ? '16px 16px 0 16px'
                : '16px 16px 16px 0',
              fontSize: '0.9rem',
              lineHeight: '1.6',
              border: msg.from === 'professor' ? '1px solid #222' : 'none'
            }}>
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              backgroundColor: '#1D9E75',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0a0a0a', fontWeight: 'bold', fontSize: '0.85rem',
              fontFamily: 'Space Mono, monospace'
            }}>AI</div>
            <div style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #222',
              borderRadius: '16px 16px 16px 0',
              padding: '0.875rem 1rem',
              color: '#555',
              fontSize: '0.85rem',
              fontFamily: 'Space Mono, monospace'
            }}>thinking...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{
        maxWidth: '720px',
        width: '100%',
        margin: '1rem auto 0',
        display: 'flex',
        gap: '0.75rem'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask your AI professor anything..."
          style={{
            flex: 1,
            backgroundColor: '#111111',
            color: 'white',
            padding: '0.875rem 1.25rem',
            borderRadius: '8px',
            border: '1px solid #222',
            outline: 'none',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.9rem'
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#1D9E75',
            color: '#0a0a0a',
            border: 'none',
            padding: '0.875rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'Space Mono, monospace',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            letterSpacing: '0.05em'
          }}>
          SEND →
        </button>
      </div>
    </div>
  );
};

export default Professor;