# UI/UX & Styling Guidelines

## 1. Visual Identity (Zen / Minimalist)
- **Theme:** Monochrome with subtle earthy accents (wood, matcha green, or ink black).
- **Whitespace:** Use generous padding and margins. The UI must NEVER look cluttered. 
- **Typography:** Clean sans-serif (e.g., Inter or Geist). Bold fonts only for key metrics or the Ikigai statement.

## 2. Tailwind CSS Rules
- Rely on utility classes for all styling.
- Use `backdrop-blur` and semi-transparent dark overlays for the Osoji and Reflection modals to keep the focus on the center content.
- Example color palette mapping:
  - Background: `bg-neutral-50` (Light) or `bg-neutral-900` (Dark)
  - Card/Surface: `bg-white` or `bg-neutral-800`
  - Accent/Primary: `text-emerald-600` or `bg-slate-800`

## 3. Component Design
- **Focus Room:** Must be full-screen or hide main navigation. Hide the system clock or other to-do items while the timer is running.
- **Micro-interactions:** Add subtle transitions (`transition-all duration-300 ease-in-out`) when checking off a Kaizen task or completing the Osoji checklist.

## 4. AI Interaction UX
- Whenever the application is waiting for a Gemini API response (e.g., generating task breakdowns), show a subtle skeleton loader or a minimalist glowing spinner. Do not block the entire screen, just the specific component being generated.