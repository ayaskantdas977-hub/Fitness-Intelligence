# System Architecture & Technical Specifications

## 1. Overview
Fitness Intelligence is a client-first, edge-computed biomechanics and fitness intelligence web application. It combines real-time browser computer vision (MediaPipe / TensorFlow.js Pose), a deterministic clinical triage rule engine, an interactive Udemy-style beginner academy, and an offline-resilient service registry with optional Spring Boot cloud synchronization.

```mermaid
flowchart TD
    subgraph Client ["Client Browser (React 19 + TypeScript + Vite)"]
        UI[AppShell & Responsive UI]
        CV[MediaPipe Pose Tracker / WebCam]
        Rules[Clinical Safety & Triaging Engine]
        Store[Local Storage / IndexedDB Cache]
        Courses[Academy Marketplace & Player]
    end

    subgraph ServiceRegistry ["Service Registry Layer"]
        Reg[Service Registry Router]
        LocalAdapt[Local Adapter (Offline Fallback)]
        CloudAdapt[Spring Boot Cloud Adapter]
    end

    subgraph Backend ["Backend Cloud (Optional / Hybrid)"]
        Spring[Spring Boot REST Services]
        Tunnel[Cloudflare Secure Tunnel]
    end

    UI --> CV
    CV --> Rules
    Rules --> UI
    UI --> Store
    UI --> Courses
    UI --> Reg
    Reg --> LocalAdapt
    Reg --> CloudAdapt
    CloudAdapt -.-> Tunnel
    Tunnel -.-> Spring
```

---

## 2. Core Subsystems

### 2.1 Computer Vision & Biomechanical Pose Tracking
- **Engine**: In-browser landmark estimation via 33 keypoints.
- **Angles Monitored**:
  - Lumbar flexion / spine angle (Shoulder - Hip - Knee)
  - Knee varus/valgus & flexion depth (Hip - Knee - Ankle)
  - Elbow flexion & shoulder elevation angle (Wrist - Elbow - Shoulder)
- **Zero Latency**: All image analysis and trigonometric angle calculations run entirely on the user's GPU/CPU locally without streaming raw video streams to third-party servers.

### 2.2 Clinical Safety & Intake Triage Engine
- **Deterministic Evaluation**: Implements ACSM (11th Ed.) and physical therapy guidelines for disc herniations, rotator cuff tears, patellofemoral pain syndrome, and hypertension.
- **Red/Yellow/Green Categorization**: Automatically swaps high-risk compound exercises (e.g., barbell back squats under spinal axial load) for clinically proven alternatives (e.g., seated horizontal leg press with lumbar pad).

### 2.3 Courses Marketplace Architecture
- **Curriculum & Instructor Models**: Structured in `src/data/coursesData.ts`.
- **Direct WhatsApp Protocol**: Deep links instructors with pre-formatted inquiry text strings to provide 1-on-1 coach support.
- **Client Payment Simulation**: Provides UPI, Card, and NetBanking checkout emulation with immediate state persistence in browser local storage.

### 2.4 Service Registry & Cloud Hybrid Resilience
- Seamless transition between local browser operation and Spring Boot cloud services.
- If backend services or tunnels are unreachable, `LocalAdapter` handles authentication simulation, mock food AI, and program persistence with zero downtime.
