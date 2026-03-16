# ⚡ SYLLABUS → SUCCESS ENGINE

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-F5E642?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)
![Electron](https://img.shields.io/badge/Electron-27-47848F?style=for-the-badge&logo=electron)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4-F5E642?style=for-the-badge)

### *Transform any syllabus into a 15-week AI-powered success roadmap*
**Team THE ELITES — Kanan Hackathon 2026**

</div>

---

## 🎯 The Problem

Students receive dense, unstructured syllabuses with no idea how to break them down into a study plan. They waste hours figuring out *what* to study, *when* to study, and *how hard* to push — instead of actually studying.

## 💡 Our Solution

**Syllabus → Success Engine** takes any syllabus (PDF or text), feeds it to Claude AI, and generates a complete 15-week study plan — color-coded by intensity, synced to your calendar, and backed by a personal AI professor available 24/7.

---

## ✨ Core Features

### ⚡ NOVA — Your AI Study Professor *(Prime Feature)*
> The heart of the application. NOVA is a cyberpunk AI persona powered by Claude Sonnet, trained to be your personal study buddy.

- 🧠 Analyzes your entire 15-week plan before you even ask
- 💬 Answers questions about tough topics, exam strategy, weak areas
- ⚡ Gives sharp, concise, exam-focused advice in real time
- 🎭 Maintains a consistent futuristic cyberpunk persona across all sessions
- 📚 Context-aware — knows your subject, your plan, your intensity levels

---

### 📄 Smart Syllabus Upload
- Upload any **PDF syllabus** — Claude AI extracts and parses the content automatically
- Or **paste text** directly for instant processing
- Drag & drop support with real-time upload feedback

### 🗓️ 15-Week AI Study Plan
- Fully personalized based on your syllabus content
- **Color-coded intensity** — 🟢 Easy / 🟡 Medium / 🟠 Heavy
- Click any week card to see detailed topics breakdown
- Hover animations with intensity-based glow effects

### 📅 Smart Study Calendar
- **Monthly calendar view** with events displayed on actual dates
- **Add custom events** — exams, assignments, study sessions
- **One-click Google Calendar sync** — opens pre-filled event directly
- **Export .ICS file** — import into any calendar app
- Click any date to view or add events instantly

### ✉️ Weekly Prep Emails *(Hackathon Critical Requirement)*
- Auto-drafts a weekly preparation email summarizing tough topics
- Includes upcoming exams, NOVA's study tips, high-intensity alerts
- Opens directly in Gmail with one click — ready to send

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18 |
| Desktop | Electron 27 |
| AI Engine | Anthropic Claude Sonnet 4 |
| Styling | Inline CSS + Space Mono + DM Sans |
| Calendar Export | ICS Format |
| Email | Mailto Protocol |

---

## 🎨 Design System
```
Theme    : Cyberpunk Yellow
Primary  : #F5E642 (Neon Yellow)
BG       : #050505 (Deep Black)
Surface  : #0f0f0f (Dark Surface)
Text     : #cccc99 (Warm White)
Font     : Space Mono (headings) + DM Sans (body)
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v16+
- npm v8+
- Anthropic API Key ([Get one here](https://console.anthropic.com))

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/Pranav9094/syllabus-success-engine.git
cd syllabus-success-engine
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment**
```bash
# Create .env file in root
REACT_APP_ANTHROPIC_API_KEY=your_api_key_here
```

**4. Run in browser**
```bash
npm start
```

**5. Run as Electron desktop app**
```bash
npm run electron-dev
```

---

## 📁 Project Structure
```
syllabus-success-engine/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Upload.jsx      # PDF upload + syllabus input
│   │   ├── Plan.jsx        # 15-week study grid
│   │   ├── Professor.jsx   # NOVA AI chat interface
│   │   └── Calendar.jsx    # Monthly calendar + events
│   ├── App.jsx             # Main app + routing
│   ├── theme.js            # Cyberpunk color system
│   └── index.js            # Entry point
├── main.js                 # Electron main process
├── preload.js              # Electron preload
└── package.json
```

---

## 🏆 Hackathon Critical Requirements

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Sync to Google Calendar | ✅ | One-click Google Calendar link + .ICS export |
| Auto-draft Weekly Prep Emails | ✅ | Gmail mailto with NOVA-generated summary |
| AI Study Buddy Persona | ✅ | NOVA — consistent cyberpunk AI professor |

---

## 👥 Team THE ELITES

> Built with ⚡ and lots of caffeine for **Kanan Hackathon 2026**

---

<div align="center">

*"Don't just study. Succeed with a system."*

**⚡ SYLLABUS → SUCCESS ENGINE**

</div>