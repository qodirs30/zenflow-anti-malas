# Product Requirements Document (PRD)
**Project Name:** ZenFlow (Japanese Productivity App)
**Author:** Qodir

## 1. Project Overview
ZenFlow is a web application designed to combat procrastination using 4 Japanese productivity philosophies: Ikigai (Purpose), Kaizen (Micro-steps), Osoji (Workspace Prep), and Pomodoro/Ichigo Ichie (Mindful Focus). 

## 2. Core Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Database/Auth:** Supabase or Firebase
- **AI Integration:** Google Gemini (3.6 Flash & 3.7 Flash)

## 3. AI Agent Instructions (CRITICAL)
- **Model Usage:** You must integrate the Gemini API for AI features. Use **Gemini 3.6 Flash** for fast, real-time text parsing (e.g., breaking down tasks) and **Gemini 3.7 Flash** for deeper contextual reflections.
- **Environment Variables:** The API key is stored securely in Vercel. Always access it via `process.env.GEMINI_API_KEY`. NEVER hardcode the key.
- **API Routes:** All Gemini API calls must be executed securely on the server side using Next.js Route Handlers (`app/api/...`) to prevent exposing the key to the client.

## 4. Core Features & AI Implementation
- **Ikigai Dashboard:** Displays the user's primary life goals.
- **Kaizen Task Splitter (AI Feature):** Users input a large task. The app sends this to Gemini 3.6 Flash to automatically break it down into 3-5 actionable micro-tasks (under 5 minutes each).
- **Osoji Ritual Modal:** A 2-minute pre-focus checklist.
- **Ichigo Ichie Focus Room:** A 25-minute Pomodoro timer with ambient sounds and a distraction-free UI.
- **Post-Session Reflection (AI Feature):** Users write a 1-sentence reflection. Gemini 3.7 Flash analyzes it and provides a short, encouraging 1-sentence feedback based on their Ikigai.