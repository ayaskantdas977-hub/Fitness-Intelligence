# Fitness Intelligence

> Explainable training and nutrition platform with on-device motion tracking, transparent formulas, and audio cues.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-FF6B1A?style=for-the-badge&logo=github)](https://ayaskantdas977-hub.github.io/Fitness-Intelligence/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript%20%7C%20Vite-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203%20%7C%20Java%2017-6DB33F?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![MediaPipe](https://img.shields.io/badge/Vision-Google%20MediaPipe%20Pose-4285F4?style=flat&logo=google)](https://developers.google.com/mediapipe)
[![Tests Passing](https://img.shields.io/badge/Tests-73%2F73%20Passing-success?style=flat&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

### Links & Live Demo
- **Live Web Application**: [https://ayaskantdas977-hub.github.io/Fitness-Intelligence/](https://ayaskantdas977-hub.github.io/Fitness-Intelligence/)
- **Academy Courses**: [https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/courses](https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/courses)
- **Clinical Assessment & Research**: [https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/assessment](https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/assessment)
- **Voice Coach Studio**: [https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/voice-coach](https://ayaskantdas977-hub.github.io/Fitness-Intelligence/#/voice-coach)
- **Documentation**: [System Architecture](docs/ARCHITECTURE.md) | [Polish Audit](docs/POLISH_AUDIT.md) | [Changelog](CHANGELOG.md) | [Contributing](CONTRIBUTING.md)

---

## What is Fitness Intelligence?

Fitness Intelligence is an explainable sports science and nutrition platform designed to remove ambiguity from daily training. Using on-device computer vision, it tracks joint angles to provide immediate biomechanical feedback without uploading video to external servers. For nutrition, it links visual meal estimation with gram-level portion scaling anchored to reference food densities.

The platform functions completely in your browser via local adapters, while providing synchronized cloud persistence when connected to the Spring Boot backend.

---

## What it does and current limits

### What it does
- **On-device motion checking**: Tracks 33 body landmarks via MediaPipe Pose in browser memory, calculating depth, joint angles, and repetition completion for squats, push-ups, and curls.
- **Calibrated macro tracking**: Computes calories and macronutrient ratios with gram-level scaling anchored to USDA FoodData Central reference values.
- **Multilingual voice cues**: Synthesizes real-time audio corrections in Tamil (தமிழ்), Odia (ଓଡ଼ିଆ), Hindi, and English using the client-side Web Speech and Web Audio APIs.
- **Safety-first split generation**: Incorporates clinical screening rules to recommend exercise splits that minimize spinal shear and joint impingement.

### Current limits
- **Camera framing**: Video tracking requires a clear, single-person full-body view; multi-person backgrounds or heavy occlusion can degrade landmark visibility.
- **Exercise models**: Real-time state machines currently cover Squats, Push-ups, and Biceps Curls; other exercises use audio cues and timer guidance.
- **Visual estimation**: Photo food scanning provides initial volumetric estimates; dense mixed curries or layered meals require manual gram confirmation for exact tracking.

---

## Key features

### 1. Movement form checker
- Live webcam and video upload analysis running completely client-side.
- Joint angle state machines for hip, knee, and elbow kinematics.
- Color-coded feedback overlays:
  - Green: Proper joint alignment and full range of motion.
  - Amber / Red: Technique warnings (knee valgus collapse, excessive forward lean, sub-parallel depth).
- Repetition counter based on verified kinematic transitions.

### 2. Nutrition and meal diary
- Visual meal recognition and search database covering standard and Indian staples.
- Gram-level portion adjustment anchored to reference densities.
- Transparent macro breakdown for energy, protein, carbohydrate, and fat intake.

### 3. Voice coach and audio studio
- Real-time cadence metronome and voice cue playback for hands-free training.
- Native pronunciations in Tamil, Odia, Hindi, and English.
- Exercise library with 60 movement setups and safety cues.

### 4. Training academy and courses
- Structured training masterclasses covering safe exercise progression and nutrition fundamentals.
- Mentorship programs led by certified instructors (CSCS, DPT, RD).
- Transparent pricing tiers and direct instructor consultation channels.

### 5. Clinical research matrix
- Evidence comparisons highlighting contemporary 2024–2026 sports medicine standards against historic guidelines.
- Primary literature citations from BJSM, ACSM, and JOSPT.
- Sample metrics comparing axial spinal load and joint contact pressures.

---

## Tech stack

### Frontend
- **Framework**: React 19 with TypeScript & Vite
- **Styling**: Tailwind CSS with dark theme tokens (#0F0B09 baseline)
- **Computer Vision**: Google MediaPipe Pose Landmarker (`@mediapipe/tasks-vision`)
- **Audio & Visuals**: Web Speech API, Web Audio API, HTML5 Canvas
- **Icons**: Lucide React

### Backend
- **Framework**: Java 17 + Spring Boot 3
- **Data**: Spring Data JPA + H2 In-Memory Database (PostgreSQL-compatible)
- **Architecture**: RESTful Controllers with domain service layer
- **Testing**: JUnit 5 + MockMvc test suite

---

## Quick start

### 1. Run the frontend (React + Vite)
```bash
# Clone the repository
git clone https://github.com/ayaskantdas977-hub/Fitness-Intelligence.git
cd Fitness-Intelligence

# Install dependencies
npm install

# Start development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### 2. Run the backend (Spring Boot 3)
```bash
cd backend

# Run automated tests
mvn test

# Start the Spring Boot REST API
mvn spring-boot:run
```
The backend starts on **[http://localhost:8080](http://localhost:8080)**. The frontend automatically detects the live server and displays the connection badge.

---

## Project structure

```
fitness-intelligence/
├── src/
│   ├── components/       # Design system components, modals, audio HUD
│   │   ├── ai/           # Copilot drawer & prompt handlers
│   │   ├── audio/        # Voice coach HUD & metronome
│   │   ├── layout/       # AppShell and navigation
│   │   └── ui/           # Buttons, cards, food result views
│   ├── pages/            # Form Checker, Nutrition, Workouts, Courses, Dashboard
│   ├── lib/              # Pose analysis state machines & kinematics
│   ├── services/         # Dual-adapter layer (Local storage + Spring Boot API)
│   └── data/             # Course catalog & research matrix baselines
│
├── backend/              # Spring Boot 3 application
│   └── src/
│       ├── main/java/    # REST controllers, entities, services
│       └── test/java/    # Automated JUnit test suite
│
├── docs/                 # Documentation, audit logs, and color baseline
└── package.json          # Frontend dependencies and scripts
```

---

## Troubleshooting tips

- **Webcam permission blocked**:  
  Ensure camera permissions are enabled in your browser settings for `localhost`. Check that your device does not have a physical webcam privacy shutter engaged.

---

## License

This project is licensed under the [MIT License](LICENSE).
