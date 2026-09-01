# System Design & Architecture

## 1. AI System Architecture
- Implement a dedicated utility folder `lib/gemini.ts` or `services/ai.ts` for initializing the Google Gen AI SDK.
- Create endpoints:
  - `POST /api/ai/breakdown-task`: Receives a broad task string, prompts Gemini 3.6 Flash to return a JSON array of micro-tasks.
  - `POST /api/ai/reflect`: Receives session data and user notes, prompts Gemini 3.7 Flash for personalized feedback.

## 2. State Management
- Use React Context or Zustand to manage global states:
  - `TimerState`: Active, Paused, Completed, Time Remaining.
  - `SessionState`: Current active micro-task, Osoji checklist status.
  - `IkigaiState`: User's saved core purpose.

## 3. Database Schema (Supabase/Firebase)
- **Users Table:** `id`, `email`, `created_at`
- **Ikigai Table:** `id`, `user_id`, `goal_title`, `reasoning`
- **Tasks Table:** `id`, `user_id`, `title`, `is_micro`, `parent_task_id`, `status`
- **Sessions Table:** `id`, `user_id`, `task_id`, `duration`, `reflection_note`, `ai_feedback`, `completed_at`

## 4. User Flow Enforcement
Ensure the application logic strictly follows this progression without letting the user bypass the mental prep:
Select Task -> Trigger Osoji Modal (2 mins) -> Auto-start Focus Room (25 mins) -> Reflection Modal -> Back to Dashboard.