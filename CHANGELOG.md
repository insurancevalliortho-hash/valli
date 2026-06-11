# Changelog — Technovations 2026 & Iyakkam Build

All notable changes and fixes applied during this build run:

## [1.0.0] - 2026-06-10

### Added
- **New Page Routes**:
  - `/iyakkam` (Iyakkam program landing page highlighting Valli's sports rehab and biomechanics lab).
  - `/iyakkam/technnovations` (Technovations 2026 innovation challenge event landing page).
  - `/iyakkam/technnovations/register` (Responsive event registration form and UPI payment validation).
- **New Assets**:
  - `public/assets/iyakkam-gait.png` - Biomechanical gait analysis lab photo (with tracking skeleton overlays).
  - `public/assets/iyakkam-rehab.png` - Sports rehabilitation range-of-motion therapy photo.
  - `public/assets/technnovations-dashboard.png` - AI sports science telemetry dashboard mockup displaying gait cycle and joint range of motion curves.

### Changed & Optimized
- **Aesthetics & Theming**:
  - Converted the entire Technovations landing page and registration form from dark-mode navy blocks to a **premium light-themed design** in accordance with the hospital's main design guidelines.
  - Utilized light mint/soft-teal gradients (`from-white via-[#F6FCFB] to-[#E0F5F3]`), deep navy text `#1A1A2E`, and vibrant accents (`#00A896` primary teal and `#F26522` primary orange).
  - Integrated the website's global, highly polished `Navbar` and `Footer` components directly across all three pages to ensure absolute brand coordination and responsive navigation (including mobile hamburger toggles).
- **Interactions & Animations**:
  - Embedded a **real-time canvas-based biomechanical runner skeleton scanner** on the Iyakkam hero page, simulating tracking coordinate shifts (knee angle, ankle flexion, cadence) and laser scanning beams dynamically.
  - Initialized `@studio-freight/lenis` smooth scroll and scroll-reveal triggers for topic cards and prize amount count-ups.

### Fixed
- **Next.js Prerendering Error**:
  - Added the missing `"use client";` directive at the top of `src/components/Footer.tsx`. Because the footer imports Framer Motion (which relies on client-side React APIs), rendering it as a Server Component crashed the production build prerender phase for `/failed-surgery-corrections` and other pages.
- **Compilation Issues**:
  - Added missing `motion` and `AnimatePresence` imports from `framer-motion` inside `src/app/iyakkam/technnovations/page.tsx`.
  - Installed `animejs` and its typescript types `@types/animejs` to support animation loops.
