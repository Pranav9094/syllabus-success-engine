import React, { useState } from 'react'
import Upload from './components/Upload'
import Plan from './components/Plan'
import Professor from './components/Professor'
import Calendar from './components/Calendar'

export default function App() {
  const [screen, setScreen] = useState('upload')
  const [syllabusText, setSyllabusText] = useState('')
  const [subjectName, setSubjectName] = useState('')
  const [studyHours, setStudyHours] = useState('')
  const [planData, setPlanData] = useState(null)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleGenerate(text, subject, hours) {
    setSyllabusText(text)
    setSubjectName(subject)
    setStudyHours(hours)
    setLoading(true)
    setScreen('loading')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a study plan generator. Return ONLY valid JSON, no markdown.

Syllabus: ${text}
Subject: ${subject}
Study hours per day: ${hours}

Return this exact JSON:
{
  "weeks": [
    { "week": 1, "title": "Topic", "topics": ["t1", "t2"], "intensity": "low" }
  ],
  "calendarEvents": [
    { "title": "Event", "date": "Week X", "type": "exam", "notes": "note" }
  ]
}

Generate exactly 15 weeks and 5 calendar events.`
          }]
        })
      })

      const data = await response.json()
      const raw = data.content[0].text
      const clean = raw.replace(/\`\`\`json|\`\`\`/g, '').trim()
      const parsed = JSON.parse(clean)
      setPlanData(parsed.weeks)
      setCalendarEvents(parsed.calendarEvents)
      setScreen('plan')

    } catch(e) {
      // Fallback data
      const fallback = Array.from({length: 15}, (_, i) => ({
        week: i + 1,
        title: `Week ${i + 1} — ${subject}`,
        topics: ['Study session', 'Practice'],
        intensity: i === 7 || i === 14 ? 'high' : i % 3 === 0 ? 'mid' : 'low'
      }))
      setPlanData(fallback)
      setCalendarEvents([
        { title: 'Mid-term Exam', date: 'Week 8', type: 'exam', notes: 'Covers weeks 1-7' },
        { title: 'Assignment Due', date: 'Week 5', type: 'assignment', notes: 'Unit project' },
        { title: 'Final Exam', date: 'Week 15', type: 'exam', notes: 'Comprehensive final' }
      ])
      setScreen('plan')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#ffffff',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      {/* Title Bar */}
      <div style={{
        height: '38px',
        background: '#111111',
        borderBottom: '1px solid #222222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        WebkitAppRegion: 'drag'
      }}>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          color: '#1D9E75',
          letterSpacing: '1px'
        }}>// SYLLABUS-TO-SUCCESS ENGINE</span>
        <div style={{ display: 'flex', gap: '8px', WebkitAppRegion: 'no-drag' }}>
          <button onClick={() => window.electronAPI?.minimizeWindow()}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF9F27', border: 'none', cursor: 'pointer' }} />
          <button onClick={() => window.electronAPI?.maximizeWindow()}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1D9E75', border: 'none', cursor: 'pointer' }} />
          <button onClick={() => window.electronAPI?.closeWindow()}
            style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#D85A30', border: 'none', cursor: 'pointer' }} />
        </div>
      </div>

      {/* Nav */}
      {screen !== 'upload' && screen !== 'loading' && (
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '12px 24px',
          borderBottom: '1px solid #1a1a1a',
          background: '#111111'
        }}>
          {['plan', 'professor', 'calendar'].map(s => (
            <button key={s} onClick={() => setScreen(s)} style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              letterSpacing: '1px',
              background: screen === s ? '#1D9E75' : 'transparent',
              color: screen === s ? '#ffffff' : '#666666',
              textTransform: 'uppercase'
            }}>{s}</button>
          ))}
          <button onClick={() => setScreen('upload')} style={{
            marginLeft: 'auto',
            padding: '6px 16px',
            borderRadius: '6px',
            border: '1px solid #333333',
            cursor: 'pointer',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            background: 'transparent',
            color: '#666666'
          }}>NEW PLAN</button>
        </div>
      )}

      {/* Screens */}
      {screen === 'upload' && <Upload onGenerate={handleGenerate} />}

      {screen === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: '16px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            border: '3px solid #1a1a1a', borderTop: '3px solid #1D9E75',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: '#1D9E75' }}>
            GENERATING YOUR PLAN...
          </div>
        </div>
      )}

      {screen === 'plan' && planData && <Plan planData={planData} />}
      {screen === 'professor' && <Professor planData={planData} professorName="NOVA" />}
      {screen === 'calendar' && <Calendar events={calendarEvents} />}
    </div>
  )
}