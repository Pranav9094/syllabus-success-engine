import React, { useState } from 'react'

export default function Plan({ planData }) {
  if (!planData) return null
  const [selectedWeek, setSelectedWeek] = useState(null)

  const intensityColors = {
    high: { bg: '#1a0800', border: '#4a2000', badge: '#FF6B00', glow: '#FF6B0022' },
    mid: { bg: '#1a1a00', border: '#3a3a00', badge: '#F5E642', glow: '#F5E64222' },
    low: { bg: '#0a0f00', border: '#1f2200', badge: '#A8CC00', glow: '#A8CC0022' }
  }

  return (
    <div style={{ padding: '32px 48px', position: 'relative', backgroundColor: '#050505', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', color: '#F5E642', marginBottom: '8px', letterSpacing: '3px' }}>
          ⚡ YOUR 15-WEEK STUDY PLAN
        </h2>
        <p style={{ color: '#333322', fontSize: '12px', fontFamily: 'Space Mono, monospace' }}>
          CLICK ANY WEEK TO VIEW DETAILS &nbsp;•&nbsp; GREEN: EASY &nbsp;•&nbsp; YELLOW: MEDIUM &nbsp;•&nbsp; ORANGE: HEAVY
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {planData.map((week) => {
          const colors = intensityColors[week.intensity] || intensityColors.low
          return (
            <div key={week.week} onClick={() => setSelectedWeek(week)}
              style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.border = `1px solid ${colors.badge}`; e.currentTarget.style.boxShadow = `0 0 20px ${colors.glow}`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.border = `1px solid ${colors.border}`; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#444433' }}>WEEK {week.week}</span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: colors.badge, border: `1px solid ${colors.badge}`, padding: '2px 8px', borderRadius: '4px' }}>
                  {(week.intensity || 'low').toUpperCase()}
                </span>
              </div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#cccc99', marginBottom: '8px', lineHeight: '1.5' }}>{week.title}</div>
              <div style={{ fontSize: '11px', color: '#444433', lineHeight: '1.6' }}>
                {(week.topics || []).slice(0, 2).map((topic, i) => <div key={i}>• {topic}</div>)}
                {(week.topics || []).length > 2 && <div style={{ color: '#F5E642', fontSize: '10px', marginTop: '4px' }}>+{week.topics.length - 2} more →</div>}
              </div>
            </div>
          )
        })}
      </div>

      {selectedWeek && (
        <div onClick={() => setSelectedWeek(null)} style={{ position: 'fixed', inset: 0, backgroundColor: '#000000dd', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{
            backgroundColor: '#0f0f0f', borderRadius: '16px', padding: '2rem',
            maxWidth: '520px', width: '100%',
            border: `1px solid ${(intensityColors[selectedWeek.intensity] || intensityColors.low).badge}`,
            boxShadow: `0 0 60px ${(intensityColors[selectedWeek.intensity] || intensityColors.low).glow}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#444433', marginBottom: '4px' }}>WEEK {selectedWeek.week}</p>
                <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '15px', color: '#F5E642' }}>{selectedWeek.title}</h3>
              </div>
              <button onClick={() => setSelectedWeek(null)} style={{ background: '#1a1a00', border: '1px solid #333322', color: '#666633', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', fontSize: '16px' }}>✕</button>
            </div>

            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#F5E642', marginBottom: '12px', letterSpacing: '1px' }}>TOPICS TO COVER</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
              {(selectedWeek.topics || []).map((topic, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#050505', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1f1f00' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F5E642', flexShrink: 0 }} />
                  <span style={{ color: '#cccc99', fontSize: '13px' }}>{topic}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setSelectedWeek(null)} style={{ width: '100%', backgroundColor: '#F5E642', color: '#050505', padding: '0.75rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontWeight: 'bold', fontSize: '13px', letterSpacing: '2px' }}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}