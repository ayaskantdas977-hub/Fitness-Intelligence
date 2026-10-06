# Changelog

All notable changes to the Fitness Intelligence platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-10-06

### Added
- **Udemy-Style Academy Marketplace**:
  - Full-featured courses catalog (`/courses`) for beginners and trainees.
  - Search filtering by keyword, price range slider (₹500 - ₹3,500), and dedicated "Around ₹1,500 (Best Value)" filter.
  - Certified instructor credentials (CSCS, DPT, RD), verified reviews, and ratings (4.7★ - 4.9★).
  - Direct 1-on-1 instructor contact with pre-filled WhatsApp consultation prompts and email support.
  - Interactive payment modal simulating UPI, Debit/Credit Card, and NetBanking.
  - Enrolled student portal with video preview and interactive module checklist.
- **Live 2026 Clinical Research Matrix**:
  - Exact "Beat" card design (`● BEAT 01 OF 06`) with animated status, category badges, and citation sources.
  - Direct 2026 peer-reviewed clinical research comparisons vs historic dogmas across Spine, Shoulder, Knee, Cardio, Nutrition, and Longevity.
  - Interactive horizontal dash navigation segments and expandable comparative metrics drawer.
- **Comprehensive Unit Testing**:
  - Added dedicated test suites for course data integrity and clinical research matrix metrics (`test/courses.test.ts`, `test/researchMatrix.test.ts`).

---

## [1.1.0] - 2026-10-04

### Added
- **High-Contrast Clinical PDF Upload & Analysis**:
  - High-visibility PDF selector UX with instant client-side text parsing.
  - Deep clinical extraction identifying spinal disc herniations, knee meniscus lesions, and labral tears.
  - Red/Yellow/Green clinical risk stratification and safe exercise split generator.

---

## [1.0.0] - 2026-10-02

### Added
- **Initial Core Release**:
  - Real-time in-browser pose tracking for Squats, Push-Ups, and Biceps Curls using MediaPipe.
  - Responsive AppShell with dark/light mode toggle.
  - Nutrition macro tracker and simulated food AI image recognition.
  - Dual-mode architecture with offline local storage and optional Spring Boot cloud synchronization.
