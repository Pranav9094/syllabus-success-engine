import React from 'react';

const typeConfig = {
  exam: { bg: '#2b0d0d', border: '#E53535', text: '#E53535', icon: '📝' },
  study: { bg: '#0d2b1f', border: '#1D9E75', text: '#1D9E75', icon: '📚' },
  assignment: { bg: '#2b1f0d', border: '#E5A000', text: '#E5A000', icon: '📋' },
};

const Calendar = ({ events }) => {
  if (!events || events.length === 0) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: '#555', fontFamily: 'Space Mono, monospace' }}>
        No events scheduled yet.
      </p>
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
          marginBottom: '0.25rem'
        }}>STUDY CALENDAR</h1>
        <p style={{ color: '#555', fontSize: '0.875rem' }}>
          Your synced schedule — {events.length} events total
        </p>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
          {Object.entries(typeConfig).map(([type, config]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '10px', height: '10px',
                borderRadius: '50%',
                backgroundColor: config.border
              }} />
              <span style={{
                color: '#555',
                fontSize: '0.78rem',
                fontFamily: 'Space Mono, monospace',
                textTransform: 'uppercase'
              }}>{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {events.map((event, i) => {
          const config = typeConfig[event.type] || typeConfig.study;
          return (
            <div key={i} style={{
              backgroundColor: config.bg,
              border: `1px solid ${config.border}`,
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Icon */}
              <div style={{
                width: '48px', height: '48px',
                backgroundColor: '#0a0a0a',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0
              }}>{config.icon}</div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <p style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  marginBottom: '0.25rem'
                }}>{event.title}</p>
                <p style={{
                  color: '#555',
                  fontSize: '0.8rem',
                  fontFamily: 'Space Mono, monospace'
                }}>{event.date}</p>
              </div>

              {/* Type Badge */}
              <span style={{
                backgroundColor: config.border + '22',
                color: config.text,
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontFamily: 'Space Mono, monospace',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                flexShrink: 0
              }}>{event.type}</span>
            </div>
          );
        })}
      </div>

      {/* Google Calendar Sync Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button style={{
          backgroundColor: 'transparent',
          color: '#1D9E75',
          border: '1px solid #1D9E75',
          padding: '0.75rem 2rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Space Mono, monospace',
          fontWeight: 'bold',
          fontSize: '0.85rem',
          letterSpacing: '0.05em'
        }}>
          SYNC TO GOOGLE CALENDAR →
        </button>
      </div>
    </div>
  );
};

export default Calendar;