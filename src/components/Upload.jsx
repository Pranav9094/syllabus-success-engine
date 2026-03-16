import React, { useState, useRef } from 'react';

const Upload = ({ onGenerate }) => {
  const [syllabusText, setSyllabusText] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [studyHours, setStudyHours] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const extractTextFromPDF = async (file) => {
    setPdfLoading(true);
    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
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
          max_tokens: 2000,
          messages: [{ role: 'user', content: [
            { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } },
            { type: 'text', text: 'Extract all syllabus content. Return only raw text, no formatting.' }
          ]}]
        })
      });
      const data = await response.json();
      if (data.error) { alert('API Error: ' + data.error.message); setPdfLoading(false); return; }
      setSyllabusText(data.content[0].text);
      setPdfFile(file);
    } catch (e) { alert('PDF error. Manually paste karo.'); }
    setPdfLoading(false);
  };

  const allFilled = syllabusText && subjectName && studyHours;

  const inputStyle = {
    width: '100%', backgroundColor: '#050505', color: 'white',
    padding: '0.75rem 1rem', borderRadius: '8px',
    border: '1px solid #1f1f00', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', boxSizing: 'border-box'
  };

  const labelStyle = {
    color: '#666633', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace',
    display: 'block', marginBottom: '0.5rem',
    textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', padding: '2rem' }}>
      <div style={{ backgroundColor: '#0f0f0f', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '640px', border: '1px solid #1f1f00', boxShadow: '0 0 40px #F5E64211' }}>

        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Space Mono, monospace', color: '#F5E642', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '2px' }}>
            ⚡ SYLLABUS → SUCCESS ENGINE
          </h1>
          <p style={{ color: '#666633', fontSize: '0.875rem' }}>Upload PDF or paste syllabus. Get a 15-week AI study plan.</p>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Subject Name</label>
          <input type="text" value={subjectName} onChange={e => setSubjectName(e.target.value)}
            placeholder="e.g. Data Structures & Algorithms" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Study Hours Per Week</label>
          <input type="number" value={studyHours} onChange={e => setStudyHours(e.target.value)}
            placeholder="e.g. 10" min="1" max="40" style={inputStyle} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyle}>Syllabus PDF</label>
          {!pdfFile ? (
            <div
              onClick={() => !pdfLoading && fileInputRef.current.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f?.type === 'application/pdf') extractTextFromPDF(f); }}
              style={{ border: `2px dashed ${dragOver ? '#F5E642' : '#1f1f00'}`, borderRadius: '10px', padding: '2rem', textAlign: 'center', cursor: 'pointer', backgroundColor: dragOver ? '#1a1a00' : '#050505', transition: 'all 0.2s' }}
            >
              {pdfLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '3px solid #1f1f00', borderTop: '3px solid #F5E642', animation: 'spin 0.8s linear infinite' }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
                  <span style={{ color: '#F5E642', fontFamily: 'Space Mono, monospace', fontSize: '12px' }}>READING PDF...</span>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                  <p style={{ color: '#666633', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Click to upload or drag & drop</p>
                  <p style={{ color: '#333322', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}>PDF files only</p>
                </>
              )}
            </div>
          ) : (
            <div style={{ border: '1px solid #F5E642', borderRadius: '10px', padding: '1rem 1.25rem', backgroundColor: '#1a1a00', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>📄</span>
                <div>
                  <p style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: '600' }}>{pdfFile.name}</p>
                  <p style={{ color: '#666633', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}>{(pdfFile.size / 1024).toFixed(1)} KB • TEXT EXTRACTED ✓</p>
                </div>
              </div>
              <button onClick={() => { setPdfFile(null); setSyllabusText(''); }} style={{ background: 'transparent', border: 'none', color: '#666633', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={e => { const f = e.target.files[0]; if (f?.type === 'application/pdf') extractTextFromPDF(f); }} style={{ display: 'none' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1f1f00' }} />
          <span style={{ color: '#333322', fontSize: '0.75rem', fontFamily: 'Space Mono, monospace' }}>OR PASTE TEXT</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#1f1f00' }} />
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <textarea value={syllabusText} onChange={e => { setSyllabusText(e.target.value); if (pdfFile) setPdfFile(null); }}
            placeholder="Paste your full syllabus here..." rows={6}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
        </div>

        <button
          onClick={() => allFilled && onGenerate(syllabusText, subjectName, studyHours)}
          disabled={!allFilled}
          style={{
            width: '100%',
            backgroundColor: allFilled ? '#F5E642' : '#1a1a00',
            color: allFilled ? '#050505' : '#333322',
            padding: '0.875rem', borderRadius: '8px', border: 'none',
            cursor: allFilled ? 'pointer' : 'not-allowed',
            fontFamily: 'Space Mono, monospace', fontWeight: 'bold',
            fontSize: '0.95rem', letterSpacing: '2px', transition: 'all 0.2s'
          }}>
          ⚡ GENERATE STUDY PLAN →
        </button>

        {!allFilled && <p style={{ color: '#333322', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem', fontFamily: 'Space Mono, monospace' }}>Fill all fields to generate</p>}
      </div>
    </div>
  );
};

export default Upload;