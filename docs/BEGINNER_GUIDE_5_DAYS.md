# Complete 5-Day Beginner's Guide & Project Blueprint
**Fitness Intelligence: From Zero to Full-Stack Mastery**

Welcome! If you are new to programming or finding full-stack development overwhelming, this guide is designed specifically for you. You do not need to memorize everything at once. We will break down this entire repository step-by-step using simple real-world analogies, code references, and a clear 5-day roadmap.

---

## Part 1: Git vs. GitHub (Explained in Plain English)

Many beginners confuse Git and GitHub. They are related, but they are completely different tools.

| Concept | What It Is | Real-World Analogy |
| :--- | :--- | :--- |
| **Git** | A software tool running **locally on your computer** that tracks file changes over time. | A camera taking save-point snapshots in a video game. |
| **GitHub** | A **cloud website** (owned by Microsoft) that hosts Git repositories online so developers can share and collaborate. | YouTube or Google Drive, but specially designed for code and Git histories. |

### How Code Moves from Your Keyboard to GitHub

There are 4 main states in Git:

```
[ Your Files ] ---> ( git add ) ---> [ Staging Area ] ---> ( git commit ) ---> [ Local Repo ] ---> ( git push ) ---> [ GitHub Cloud ]
(Working Dir)                        (Ready to save)                          (Saved Snapshot)                        (Online Repository)
```

1. **Working Directory**: The actual files you see and edit in VS Code on your laptop.
2. **Staging Area (`git add .`)**: The "shopping cart" where you select which modified files you want to include in your next save point.
3. **Commit (`git commit -m "feat: add voice coach"`)**: The permanent local snapshot with a message and author name attached.
4. **Push (`git push origin main`)**: Uploads your local commits to GitHub so your teammates and recruiters can see them.

* **Repository (Repo)**: The project folder containing all code plus the hidden `.git/` history folder.
* **Branch (`main`)**: The primary timeline of the project.
* **Remote (`origin`)**: The nickname for the online URL pointing to GitHub (e.g., `https://github.com/ayaskantdas977-hub/Fitness-Intelligence`).

---

## Part 2: Port-to-Port Communication (How Frontend & Backend Connect)

### What Is a Port?
Think of your computer as a large **apartment building** with a single street address (`localhost` or `127.0.0.1`).  
Different software programs running on your computer need their own private **door numbers** so messages don't get mixed up. These door numbers are called **Ports**.

In this project, two servers run at the same time:

```
  +---------------------------------------------------------------------------------+
  |                             YOUR COMPUTER (localhost)                           |
  |                                                                                 |
  |   [ Browser / Client ]                                                          |
  |            |                                                                    |
  |            | 1. Loads HTML/CSS/JS (Port 5173)                                   |
  |            v                                                                    |
  |   +--------------------------+                   +--------------------------+   |
  |   |    FRONTEND DEV SERVER   |                   |    BACKEND REST SERVER   |   |
  |   |    Vite + React 19       |                   |    Spring Boot (Java)    |   |
  |   |    PORT: 5173            |                   |    PORT: 8080            |   |
  |   +--------------------------+                   +--------------------------+   |
  |            |                                                  ^                 |
  |            |                                                  |                 |
  |            +---- 2. fetch("http://localhost:8080/api/...") ---+                 |
  |                  (HTTP JSON Request: logs, poses, user data)  |                 |
  |                                                               |                 |
  |                                                               v                 |
  |                                                  +--------------------------+   |
  |                                                  |    In-Memory Database    |   |
  |                                                  |    H2 (port 8080/h2)     |   |
  |                                                  +--------------------------+   |
  +---------------------------------------------------------------------------------+
```

### Step-by-Step Flow:
1. **Frontend Server (Port 5173)**:
   * When you run `npm run dev`, Vite starts a lightweight local web server on port `5173`.
   * You open `http://localhost:5173` in Google Chrome. Vite serves the compiled React components, Tailwind styling, and 3D assets to your browser.
2. **Backend Server (Port 8080)**:
   * When you run `mvn spring-boot:run` in the `backend/` folder, Java starts a Spring Boot REST server on port `8080` (configured in `backend/src/main/resources/application.yml`).
3. **The Connection (Port 5173 ➔ Port 8080)**:
   * In `src/services/springBootApi.ts`, the frontend makes asynchronous HTTP calls:
     ```typescript
     // When running locally, calls port 8080
     const BASE_URL = 'http://localhost:8080/api';
     const response = await fetch(`${BASE_URL}/workouts`);
     const data = await response.json();
     ```
4. **What is CORS (Cross-Origin Resource Sharing)?**:
   * Security rule in web browsers: By default, a website running on port `5173` is **not allowed** to fetch data from port `8080` because they have different origins.
   * How we solve it: In `backend/src/main/resources/application.yml`, we whitelist the frontend port:
     ```yaml
     app:
       cors:
         allowed-origins:
           - "http://localhost:5173"
     ```
5. **Offline Fallback Architecture**:
   * If the Java backend on port 8080 is not running, the frontend's Service Registry (`src/services/registry.ts`) automatically switches to `src/services/localAdapter.ts`. The app seamlessly stores all workout and nutrition logs in browser `localStorage` with zero crashes!

---

## Part 3: Complete Project Hierarchy & Folder Map

```text
fitness-intelligence/
├── backend/                     # Java Spring Boot Backend (Port 8080)
│   ├── pom.xml                  # Maven dependencies (Spring Boot 3.3.4, JPA, H2)
│   └── src/main/
│       ├── java/com/fitnessintelligence/
│       │   ├── controller/      # REST API endpoints (receives HTTP requests)
│       │   ├── model/           # Database entity tables (Workout, Nutrition, User)
│       │   ├── repository/      # JPA database queries
│       │   └── service/         # Business logic & calculation rules
│       └── resources/
│           └── application.yml  # Port (8080), Database (H2), and CORS settings
│
├── src/                         # React 19 + TypeScript Frontend (Port 5173)
│   ├── components/              # Modular UI components
│   │   ├── 3d/                  # Three.js / React Three Fiber interactive 3D canvases
│   │   ├── ai/                  # Fitness copilot drawer & chat UI
│   │   ├── form-checker/        # Webcam HUD, angle overlays, live skeleton
│   │   ├── landing/             # Asymmetric hero & feature cards
│   │   ├── layout/              # AppShell, responsive bottom navigation, headers
│   │   └── ui/                  # Reusable buttons, cards, toasts, modals
│   ├── engine/                  # Core Math & Domain Logic (No UI)
│   │   ├── rules.ts             # Biomechanics calculation & rep counters
│   │   ├── clinicalSafetyResearch.ts # ACSM medical safety & injury substitution
│   │   └── pdfTextExtractor.ts  # Client-side medical report scanner
│   ├── pages/                   # Full-screen page views
│   │   ├── LandingPage.tsx      # 3D interactive hero & introduction
│   │   ├── FormCheckerPage.tsx  # MediaPipe live webcam pose tracking
│   │   ├── VoiceCoachPage.tsx   # Multilingual audio studio (Odia/Tamil/Hindi/EN)
│   │   ├── NutritionPage.tsx    # Food scanner & USDA macro calculator
│   │   ├── CoursesPage.tsx      # Fitness creator academy (Jeet Selal, Guru Mann)
│   │   └── DashboardPage.tsx    # Daily intake, workout history & analytics
│   ├── services/                # Communication layer
│   │   ├── springBootApi.ts     # HTTP REST calls to port 8080
│   │   ├── localAdapter.ts      # Offline-first browser storage fallback
│   │   ├── registry.ts          # Switches between cloud and offline mode
│   │   └── voiceCoachService.ts # Web Speech API multilingual speech synthesis
│   ├── data/                    # Master course catalog & instructor metadata
│   ├── types/                   # TypeScript interfaces (types for workouts, poses, etc.)
│   ├── App.tsx                  # Top-level routing & layout shell
│   └── main.tsx                 # React DOM mount point & route normalizer
│
├── test/                        # Vitest automated test suite (73 passing tests)
│   ├── pose.test.ts             # Biomechanics angle math tests
│   ├── voiceCoach.test.ts       # Audio cue generation tests
│   ├── courses.test.ts          # Course catalog & pricing validation tests
│   └── rules.test.ts            # Clinical safety & exercise rules tests
│
├── docs/                        # Architecture guides, color baselines, audit reports
├── scripts/                     # Color snapshot verification script (zero color drift)
├── package.json                 # Frontend dependencies (React 19, Three.js, MediaPipe, Vite)
└── vite.config.ts               # Vite configuration (port 5173, base URL)
```

---

## Part 4: The 5-Day Fast-Track Mastery Plan

### Day 1: Project Setup, Git Fundamentals & Port Networking
* **Goal**: Understand how the project runs and how Git/GitHub works.
* **Hands-on Tasks**:
  1. Read Part 1 and Part 2 of this guide.
  2. Run `npm run dev` in terminal 1 (observe `http://localhost:5173`).
  3. Inspect `src/main.tsx` and `src/App.tsx` to see how React mounts into `index.html`.
  4. Practice Git commands: `git status`, `git log -5 --oneline`, `git branch`.
* **Key Concept**: Understand that code lives on your computer (Git) and syncs to the cloud (GitHub).

### Day 2: React 19 Frontend & Tailwind CSS Layouts
* **Goal**: Learn how UI components, state, and responsive styles work.
* **Hands-on Tasks**:
  1. Open `src/pages/DashboardPage.tsx` and see how React state (`useState`) stores daily calories and workouts.
  2. Inspect `src/components/layout/AppShell.tsx` to see how the desktop sidebar switches to the mobile navigation bar at 360px viewport.
  3. Modify a button text or label in `src/pages/CoursesPage.tsx` and see Vite hot-reload the page in 50ms without refreshing.
* **Key Concept**: React is made of small components that re-render when data (state) changes.

### Day 3: Computer Vision (MediaPipe) & Multilingual Voice Coach
* **Goal**: Learn how AI computer vision and browser audio work.
* **Hands-on Tasks**:
  1. Open `src/lib/poseAnalysis.ts`: Look at how `calculateAngle(pointA, pointB, pointC)` uses basic trigonometry (`Math.atan2`) to find knee and hip angles.
  2. Open `src/pages/FormCheckerPage.tsx`: See how the webcam video frame is fed into MediaPipe's 33 landmark points.
  3. Open `src/services/voiceCoachService.ts`: See how `window.speechSynthesis` speaks in Odia (`or-IN`), Tamil (`ta-IN`), Hindi (`hi-IN`), or English (`en-US`).
* **Key Concept**: AI doesn't have to be a heavy cloud API; lightweight models can run directly in the browser!

### Day 4: Spring Boot Backend & REST API Communication
* **Goal**: Learn how Java, REST APIs, and databases work.
* **Hands-on Tasks**:
  1. Open `backend/src/main/resources/application.yml`: Look at the port (8080) and CORS settings.
  2. Open `backend/src/main/java/com/fitnessintelligence/controller/`: Inspect how a `@GetMapping("/workouts")` handles HTTP requests.
  3. Open `src/services/springBootApi.ts` in the frontend: See how `fetch('http://localhost:8080/api/workouts')` talks to that Java controller.
  4. Open `src/services/localAdapter.ts`: Understand how the app stays fully functional even when the backend is offline.
* **Key Concept**: Frontend asks for data with HTTP GET/POST; Backend processes it, talks to the database, and replies with JSON.

### Day 5: Testing, Production Build & Presenting Your Work
* **Goal**: Run automated tests, build for production, and practice explaining the project to recruiters.
* **Hands-on Tasks**:
  1. Run `npm test`: Watch Vitest execute all 73 automated tests in under 3 seconds.
  2. Run `npm run build`: Watch Vite compile TypeScript into the production `dist/` bundle.
  3. Practice your 60-second LinkedIn elevator pitch explaining the 3 pillars:
     - Real-time MediaPipe computer vision.
     - Multilingual voice coaching for regional accessibility.
     - Spring Boot + React 19 full-stack architecture with offline resilience.
* **Key Concept**: Real engineers write tests and automated CI/CD deployment pipelines.
