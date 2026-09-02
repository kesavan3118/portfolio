# Kesavan M — Portfolio

A premium, 3D, AI-assisted personal portfolio built with React + Vite.
Every piece of personal content (name, summary, skills, projects, education,
certifications, contact details) is pulled from a single file,
`src/data/resumeData.js`, whose values were taken directly from the
uploaded resume PDF — including its text and the hyperlinks embedded in
the PDF itself (GitHub, LinkedIn, and the two project live-demo/GitHub
links). Nothing in the site is invented.

## 1. Your profile photo

Your uploaded portrait is already placed at:

```
public/assets/profile.png
```

The Hero section (`src/components/Hero.jsx`) already points to it. If you
ever want to swap the photo, just replace that file with a new image
(keep the filename `profile.png`, or update the `src` in `Hero.jsx`).

## 2. Install

```bash
npm install
```

## 3. Run in development

```bash
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## 4. Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The optimized static site is output to `dist/` — deploy that folder to
any static host (Vercel, Netlify, GitHub Pages, etc.).

## 5. The AI Portfolio Assistant

By default the assistant runs **entirely in the browser** using
`src/data/aiKnowledge.js`, a small rule-based engine that only ever reads
from `resumeData.js`. There's no API key, no network call, and no way for
it to invent an answer — anything outside the resume gets a clear
"not available in the resume" response.

If you'd rather have it answered by a real Claude model:

1. Copy `.env.example` to `.env` and fill in `ANTHROPIC_API_KEY`.
2. Run the proxy server: `npm run server` (starts on `http://localhost:8787`).
3. Set `VITE_AI_ENDPOINT=http://localhost:8787/api/ask` in your `.env` so
   the frontend calls the proxy instead of the local engine.
4. Restart `npm run dev`.

The API key is only ever read server-side (`server/index.js`) via
`process.env.ANTHROPIC_API_KEY` — it is never bundled into frontend code.
The proxy's system prompt restricts the model to the same resume JSON
used by the local engine and instructs it to refuse anything outside it.

## 6. Project structure

```
kesavan-portfolio/
├─ index.html
├─ package.json
├─ vite.config.js
├─ .env.example
├─ public/
│  └─ assets/
│     └─ profile.png        ← your uploaded portrait
├─ server/
│  └─ index.js               ← optional secure AI proxy (not required to run the site)
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ data/
   │  ├─ resumeData.js       ← SINGLE SOURCE OF TRUTH for all content
   │  └─ aiKnowledge.js      ← local AI assistant logic (resume-only)
   ├─ hooks/
   │  ├─ useMousePosition.js
   │  ├─ usePrefersReducedMotion.js
   │  └─ useScrollReveal.js
   ├─ components/
   │  ├─ Background.jsx      ← animated grid / particles / glow wallpaper
   │  ├─ Navbar.jsx
   │  ├─ Hero.jsx             ← 3D portrait, mouse-follow parallax
   │  ├─ About.jsx
   │  ├─ Skills.jsx
   │  ├─ Projects.jsx
   │  ├─ ProjectCard.jsx      ← 3D tilt + expand interaction
   │  ├─ Education.jsx        ← animated timeline
   │  ├─ Certifications.jsx
   │  ├─ Contact.jsx
   │  ├─ Footer.jsx
   │  └─ AIAssistant.jsx      ← floating chat widget
   └─ styles/
      ├─ index.css            ← design tokens + global styles
      └─ *.css                ← one stylesheet per component
```

## 7. Content accuracy

All content lives in `src/data/resumeData.js`. If you update your resume,
edit that one file and every section (Hero, About, Skills, Projects,
Education, Certifications, Contact, and the AI Assistant) updates
automatically — there is nowhere else content is hard-coded.

## 8. Accessibility & performance

- Respects `prefers-reduced-motion` (disables particle canvas, grid drift,
  glow float, and scroll-reveal transforms).
- Keyboard-visible focus states on all interactive elements.
- Semantic landmarks (`header`, `main`, `section`, `footer`) and alt text
  on the profile image.
- Particle count and grid size automatically scale down on small screens.
- No layout requires horizontal scrolling at any breakpoint.
