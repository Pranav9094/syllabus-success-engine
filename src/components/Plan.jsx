import React from 'react'

export default function Plan({ planData }) {
  if (!planData) return null

  const intensityColors = {
    high: { bg: '#2a0a0a', border: '#6b1a1a', badge: '#D85A30' },
    mid: { bg: '#2a1a00', border: '#6b4400', badge: '#EF9F27' },
    low: { bg: '#0a1a0a', border: '#1a4a1a', badge: '#1D9E75' }
  }

  return (
    <div style={{ padding: '32px 48px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '22px',
          color: '#1D9E75',
          marginBottom: '8px'
        }}>YOUR 15-WEEK STUDY PLAN</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Color coded by intensity — Green: Easy • Amber: Medium • Red: Heavy
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        {planData.map((week) => {
          const colors = intensityColors[week.intensity] || intensityColors.low
          return (
            <div key={week.week} style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '16px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  color: '#888'
                }}>WEEK {week.week}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: colors.badge,
                  border: `1px solid ${colors.badge}`,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}>{(week.intensity || 'low').toUpperCase()}</span>
              </div>

              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '13px',
                color: '#ffffff',
                marginBottom: '8px',
                lineHeight: '1.4'
              }}>{week.title}</div>

              <div style={{
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {(week.topics || []).map((topic, i) => (
                  <div key={i}>• {topic}</div>
                ))}
              </div>

              <div style={{
                marginTop: '10px',
                fontSize: '11px',
                color: '#444',
                fontFamily: 'Space Mono, monospace'
              }}>
                {week.hours ? `${week.hours}h recommended` : ''}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}