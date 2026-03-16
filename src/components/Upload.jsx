import React, { useState } from 'react';

const Upload = ({ onGenerate }) => {
  const [syllabusText, setSyllabusText] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [studyHours, setStudyHours] = useState('');

  const handleGenerate = () => {
    if (!syllabusText || !subjectName || !studyHours) return;
    onGenerate(syllabusText, subjectName, studyHours);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#111111',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '640px',
        border: '1px solid #1f1f1f'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: 'Space Mono, monospace',
            color: '#1D9E75',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            SYLLABUS → SUCCESS ENGINE
          </h1>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>
            Paste your syllabus. Get a 15-week AI study plan.
          </p>
        </div>

        {/* Subject Name */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            color: '#888',
            fontSize: '0.78rem',
            fontFamily: 'Space Mono, monospace',
            display: 'block',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Subject Name</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="e.g. Data Structures & Algorithms"
            style={{
              width: '100%',
              backgroundColor: '#0a0a0a',
              color: 'white',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #222',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Study Hours */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{
            color: '#888',
            fontSize: '0.78rem',
            fontFamily: 'Space Mono, monospace',
            display: 'block',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Study Hours Per Week</label>
          <input
            type="number"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
            placeholder="e.g. 10"
            min="1"
            max="40"
            style={{
              width: '100%',
              backgroundColor: '#0a0a0a',
              color: 'white',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #222',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Syllabus Textarea */}
        <div style={{ marginBottom: '1.75rem' }}>
          <label style={{
            color: '#888',
            fontSize: '0.78rem',
            fontFamily: 'Space Mono, monospace',
            display: 'block',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>Paste Syllabus</label>
          <textarea
            value={syllabusText}
            onChange={(e) => setSyllabusText(e.target.value)}
            placeholder="Paste your full syllabus here..."
            rows={8}
            style={{
              width: '100%',
              backgroundColor: '#0a0a0a',
              color: 'white',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #222',
              outline: 'none',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              boxSizing: 'border-box',
              resize: 'vertical',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          style={{
            width: '100%',
            backgroundColor: '#1D9E75',
            color: '#0a0a0a',
            padding: '0.875rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Space Mono, monospace',
            fontWeight: 'bold',
            fontSize: '0.95rem',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.85'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          GENERATE STUDY PLAN →
        </button>

        {/* Warning */}
        {(!syllabusText || !subjectName || !studyHours) && (
          <p style={{
            color: '#444',
            fontSize: '0.78rem',
            textAlign: 'center',
            marginTop: '0.75rem',
            fontFamily: 'Space Mono, monospace'
          }}>
            Fill all fields to generate
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
