# Backend - Obvioustant

Welcome to the backend, where all the real work happens (and where you debug for hours).

## Stack
- **Express.js** – Because building an API in raw Node.js is torture.
- **Google Gemini API** – Some AI wizardry to extract tasks and events from your rambling.
- **Axios** – Because we need to call APIs like civilized developers.

## Setup & Running

### 1. Install dependencies
```
cd backend
npm install
```

### 2. Start the server
```
npm start
```

Your server should now be running at `http://localhost:5000`, assuming nothing broke.

## How It Works
1. The frontend sends your speech transcript here.
2. We pass it to Google Gemini, hoping it understands you.
3. The AI responds with structured tasks, events, and notes.
4. We send that back to the frontend, and boom—fake productivity achieved.

## API Endpoints
| Method | Endpoint | Purpose |
|--------|-------------|---------|
| POST | `/extract-actions` | Takes your words and finds tasks/events/notes |

## Issues & Fixes
- **Server crashes** – Did you remember to add your `GEMINI_API_KEY` to `.env`?
- **AI doesn’t extract tasks properly** – Maybe try speaking in full sentences?
- **Everything is broken** – Sounds like a skill issue.

## Notes
- Make sure you have a `.env` file with `GEMINI_API_KEY=your-api-key-here`.
- This backend exists only to serve the frontend. Without it, it’s just vibes.
- If nothing works, check your logs and start crying.

If you’re stuck, pretend to read the docs before asking for help. Cheers!

