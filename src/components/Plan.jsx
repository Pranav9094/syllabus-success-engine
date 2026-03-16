import React from 'react';

const intensityColor = (intensity) => {
  if (intensity === 'low') return { bg: '#0d2b1f', border: '#1D9E75', text: '#1D9E75' };
  if (intensity === 'mid') return { bg: '#2b1f0d', border: '#E5A000', text: '#E5A000' };
  return { bg: '#2b0d0d', border: '#E53535', text: '#E53535' };
};

const Plan = ({ planData }) => {
  if (!planData || planData.length === 0) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: '#555', fontFamily: 'Space Mono, monospace' }}>No plan generated yet.</p>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      padding: '2rem',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Space Mono, monospace',
          color: '#1D9E75',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>
          YOUR 15-WEEK STUDY PLAN
        </h1>
        <p style={{ color: '#555', fontSize: '0.875rem' }}>
          Color coded by intensity — Green: Easy • Amber: Medium • Red: Heavy
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        maxWidth: '960px',
        margin: '0 auto'
      }}>
        {planData.map((week, i) => {
          const colors = intensityColor(week.intensity);
          return (
            <div key={i} style={{
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '1.25rem',
            }}>
              {/* Week Number */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  color: colors.text,
                  fontSize: '0.78rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.05em'
                }}>WEEK {week.week}</span>
                <span style={{
                  backgroundColor: colors.border + '22',
                  color: colors.text,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontSize: '0.7rem',
                  fontFamily: 'Space Mono, monospace',
                  textTransform: 'uppercase'
                }}>{week.intensity}</span>
              </div>

              {/* Topic */}
              <p style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '0.95rem',
                marginBottom: '0.5rem'
              }}>{week.topic}</p>

              {/* Description */}
              <p style={{
                color: '#666',
                fontSize: '0.82rem',
                lineHeight: '1.5',
                marginBottom: '0.75rem'
              }}>{week.description}</p>

              {/* Hours */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{ color: colors.text, fontSize: '0.8rem' }}>⏱</span>
                <span style={{
                  color: '#555',
                  fontSize: '0.78rem',
                  fontFamily: 'Space Mono, monospace'
                }}>{week.hours}h recommended</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plan;