# 🌌 Cyber-Console 3D Portfolio — Architectural & Refactor Plan

> **Client / Developer**: Mario Fernando Pérez Martínez  
> **Profile**: Ingeniero Electrónico con énfasis en Telecomunicaciones | Backend Developer & AI Enthusiast (Universidad del Quindío)  
> **Aesthetic Direction**: High-Tech Cyber-Console / Immersive 3D Sci-Fi (Awwwards-level), Obsidian `#0B0F19`, Glowing Cyber-Green `#00FF66`, Glassmorphic HUDs, Lenis Smooth Scroll, Three.js Particle/Neural Network Canvas, Framer Motion Micro-Interactions.

---

## 1. Codebase & Environment Analysis

- **Framework**: Next.js 15.2.4 (App Router: `app/layout.tsx`, `app/page.tsx`)
- **Runtime / React**: React 19.0.0 & React-DOM 19.0.0
- **Language**: TypeScript (`tsconfig.json` with `@/*` aliases)
- **Styling**: Tailwind CSS 3.4.17 + PostCSS + CSS variables
- **Package Manager**: `pnpm` (lockfile detected: `pnpm-lock.yaml`, pnpm v10.33.0 installed)
- **Current State**: Monochromatic flat terminal `#000000` with basic `#00FF41` text scanlines and static ASCII logs.
- **Goal**: Full transformation into a high-octane 3D Cyber-Console with floating HUD cards, interactive 3D neural-hologram canvas reacting to mouse and scroll, Lenis smooth scrolling, and complete CV data integration.

---

## 2. Architectural Strategy

### A. Color Palette & Cyber-Aesthetics
- **Base Background**: Deep Obsidian `#0B0F19` with a subtle high-tech glowing vector grid (`rgba(0, 255, 102, 0.05)`).
- **Primary Accent**: Neon Cyber-Green `#00FF66` with bloom/glow filters (`box-shadow: 0 0 25px rgba(0, 255, 102, 0.45)`).
- **Secondary Accents**: Matrix Emerald `#00CC55`, Tech Cyan `#00E5FF` (for telemetry and network indicators), and Deep Slate `#111827`.
- **Surface Materials**: Glassmorphism HUD panels (`rgba(11, 15, 25, 0.75)` backdrop blur `16px`, cyber border `1px solid rgba(0, 255, 102, 0.2)` with corner crosshair bracket accents `[+]`).
- **Typography**: Dual hierarchy — `Fira Code` / `JetBrains Mono` for code telemetry, terminal commands, metric tags, and stats; crisp sans-serif/mono hybrid for readability.

### B. Interactive 3D Canvas (Centerpiece & Scrollytelling)
- **Component**: `<CyberSceneCanvas />` mounted in fixed or relative viewport backdrop with client-side dynamic rendering (`next/dynamic` with `ssr: false`).
- **Scene Architecture**:
  1. **Neural Particle Core**: 2,500+ glowing points forming an abstract neural spherical network interconnected with dynamic lines/vertices.
  2. **Holographic Motherboard Ring / Orb**: Rotating concentric orbital rings with pulsing radar scanning effect representing telecommunications & hardware engineering.
  3. **Mouse Parallax Reactivity**: Smooth lerp interpolation based on mouse pointer coordinates `(clientX, clientY)` giving true holographic depth.
  4. **Lenis Scrollytelling Link**: As the user scrolls through sections (Hero -> About -> Projects -> Skills -> Experience -> Contact), the camera and particle cloud smoothly rotate, expand, or tilt, providing an orchestrated spatial journey.

### C. Lenis Smooth Scrolling Engine
- **Component**: `<SmoothScrollProvider />` utilizing `lenis` configured with custom lerp (`0.08`) and smooth touch handling.
- Integrated with Framer Motion scroll indicators and camera triggers.

---

## 3. CV Data Mapping

| CV Section | New Cyber-Console Component | Featured Content |
|---|---|---|
| **Header & Identity** | `<HeroHUD />` + `<CyberSceneCanvas />` | • Mario Fernando Pérez Martínez<br>• Ingeniero Electrónico (U. del Quindío, 2026)<br>• Backend Developer & AI Enthusiast<br>• Interactive Status Badges (System Online, Pasto/Armenia, CO, Latency: 12ms)<br>• Quick Action CTA: "INITIALIZE CONTACT", "DOWNLOAD CV", "EXPLORE REPOS" |
| **Profile & Telemetry** | `<AboutHUD />` | • Core Bio (Backend Java 21/Spring Boot, Applied AI, Cybersecurity & FTTH networks)<br>• Live Telemetry Counters (94.2% ML Accuracy, 30+ Endpoints, 3rd Place Hackathon, 15+ FTTH Families)<br>• Academic status: Graduado Marzo 2026, U. del Quindío |
| **Featured Projects** | `<ProjectsShowcase />` | **1. SentimAI**: Java 21, Spring Boot, MySQL, Redis, React, TF-IDF Logistic Regression ML (94.2% precision, 0.51 threshold), Docker, OCI.<br>**2. Command & Control (C2)**: Red Team / Pentesting framework, TLS encryption, multi-agent GUI operator, remote broadcast execution, Docker.<br>**3. Corporación TOMASI Backend**: Rural e-commerce backend, Java 21, Spring Boot, PostgreSQL, Wompi payments, Cloudinary, 30+ REST endpoints.<br>**4. Los Carlitos MVP**: 3rd Place Hackathon Talento Tech, 8h build, Gemini CLI, predictive viability ML agent, Firebase.<br>**5. MB Nutrition Labs**: Freelance pre-sale lead page, Antigravity, MCP, Spline, Figma, GCP.<br>**6. FTTH Academic Telematics**: High-speed symmetric network deployment. |
| **Skills & Matrix** | `<SkillsHUDMatrix />` | Grouped into cyber-tabs / modular grid:<br>• **Backend & Cloud**: Spring Boot, Express.js, Docker, OCI, GCP, Supabase, Redis, Firebase.<br>• **AI & Data Science**: Machine Learning, TF-IDF, Logistic Regression, LLMs, Prompt Eng, Code Agents (Antigravity, Gemini CLI, Claude Code).<br>• **Languages**: Java, Python, JavaScript, C, C++, SQL.<br>• **Networking & Security**: C2 Pentesting, TLS/SSL, IAM, FTTH, GNS3, EVE-NG, WebSockets. |
| **Experience & Certifications** | `<TimelineExperience />` | Timeline HUD with audio-visual vibe:<br>• Corporación TOMASI (Dic 2025 – Present)<br>• Hackathon TIC Talento Tech C2 (2025)<br>• Freelance MB Nutrition Labs (Oct 2026)<br>• Hackathon ONE II Latam SentimAI (Dic 2025 – Ene 2026)<br>• Hackathon Talento Tech "Los Carlitos" (3.er Lugar)<br>• Semillero FTTH Universidad del Quindío<br>• Full list of Certifications (Oracle OCI, Alura, Talento Tech, Google, Platzi). |
| **Terminal & Contact** | `<ContactConsole />` | Futuristic transmitter HUD with interactive message sender simulation, direct links (GitHub, LinkedIn, Email, Phone, Vercel Portfolio), and copy-to-clipboard functionality. |

---

## 4. Component Structure & Hierarchy

```
app/
├── layout.tsx                # Lenis provider, Fira Code font, root cyber-background & audio-visual base
├── globals.css               # Obsidian theme, scanline, glowing cyber-green utilities, HUD glass styles
├── page.tsx                  # Master Scrollytelling page assembling HUD sections & 3D backdrop
components/
├── 3d/
│   ├── cyber-scene-canvas.tsx # Dynamic client-only Three.js 3D canvas (Neural network + particle sphere)
│   ├── neural-core.tsx        # 3D points, line links, rotators, shader glowing materials
│   └── scene-controller.tsx   # Mouse parallax & scroll progress camera interpolation
├── hud/
│   ├── hud-card.tsx           # Glassmorphic card container with tech corners [+], neon borders, hover glow
│   ├── cyber-badge.tsx        # Status pill with pulsing LED dot (e.g. [SYSTEM: OPTIMAL])
│   ├── tech-tag.tsx           # Monospace capability pill (e.g. `JAVA 21`, `DOCKER`, `OCI`)
│   └── cyber-button.tsx       # Cyberpunk angled cut button with hover audio/visual glow
├── sections/
│   ├── hero-hud.tsx           # Terminal boot sequence + high-impact 3D title & metrics
│   ├── about-hud.tsx          # Dual engineer/developer breakdown with radar telemetry
│   ├── projects-showcase.tsx  # 3D interactive floating HUD cards for SentimAI, C2, TOMASI, etc.
│   ├── skills-matrix.tsx      # Categorized radar/matrix tech grid with filter tabs
│   ├── experience-timeline.tsx # Chronological HUD timeline with expandable telemetry
│   └── contact-console.tsx    # Live transmitter form, encrypted signal aesthetic, social uplinks
└── ui/
    └── smooth-scroll.tsx      # Lenis smooth scroll provider
```

---

## 5. Execution Steps & Validation

1. **Step 1 (Done)**: Codebase analysis completed.
2. **Step 2 (Current)**: Create `plan.md` (this file).
3. **Step 3**: Install 3D and animation dependencies using `pnpm install three @types/three @react-three/fiber @react-three/drei lenis framer-motion lucide-react`. Ensure compatible peer dependency resolution for React 19.
4. **Step 4**: Develop components with zero TypeScript errors:
   - Configure Tailwind with obsidian `#0B0F19`, cyber-green `#00FF66`, HUD borders and animations.
   - Build robust, resilient Three.js 3D canvas with fallback support.
   - Assemble all HUD sections using Framer Motion animations and Lenis smooth scroll.
   - Run `pnpm run build` or `pnpm run dev` to validate flawless compilation.
