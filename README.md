# Obvioustant

Welcome to **Obvioustant**—because typing is too much effort and talking to yourself is socially acceptable now. This project takes your incoherent ramblings, transcribes them, and magically turns them into structured tasks, events, and notes. Basically, it's like having a personal assistant, except it won’t judge you for your life choices (yet).

## Features
- **Speech-to-Text**: Converts your voice into text, assuming you actually speak clearly.
- **Task Extraction**: Detects to-do items because you clearly need reminders.
- **Event Scheduling**: Picks up dates and times, so you stop forgetting important things.
- **Summarization**: Attempts to make sense of your words—good luck with that.

## Tech Stack
- **Frontend**: React (Vite, TailwindCSS, ShadCN for some UI magic)
- **Backend**: Express.js + Google Gemini API (because we trust AI, right?)
- **Speech Recognition**: Browser’s built-in Web Speech API
- **Data Handling**: Axios for fetching, because fetch() is too vanilla

## Setup & Installation

### 1. Clone this masterpiece
```
git clone https://github.com/your-repo/obvioustant.git
cd obvioustant
```

### 2. Set up the frontend
```
cd frontend
npm install
npm run dev
```

### 3. Set up the backend
```
cd backend
npm install
node server.js
```

### 4. Talk to your computer
Open `http://localhost:5173` (or whatever Vite decides) and start mumbling. The backend should be running on `http://localhost:5000`. If nothing works, blame the API key.

## API Endpoints
| Method | Endpoint | Purpose |
|--------|-------------|---------|
| POST | `/extract-actions` | Feeds your ramblings to the AI and extracts tasks/events/notes |

## Notes
- You need a **Google Gemini API key** (`GEMINI_API_KEY` in `.env`). Get one [here](https://ai.google.dev/) if you don’t have it.
- Speech recognition may not work well if you mumble, whisper, or speak like a robot.
- This will not replace a real assistant. Sorry.

---

### Frontend
Located in the `frontend/` folder. See [frontend README](frontend/README.md) for setup instructions and sarcasm.

### Backend
Located in the `backend/` folder. See [backend README](backend/README.md) if you actually care how it works.

