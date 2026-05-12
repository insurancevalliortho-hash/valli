# 📸 Valli Super Speciality Hospital - Website Photoshoot Guide

This README serves as a comprehensive guide for the photographer to capture the exact assets needed for the Valli Super Speciality Hospital website. The shots are organized by the specific pages and sections on the website where they will be used.

---

## 1. 🏠 Homepage & Hero Sections
*These are the most critical images. They dictate the first impression and require the highest production value (Awwwards-level lighting, wide angles, clean aesthetics).*

- [ ] **Hospital Exterior (Twilight/Dusk Shot)**
  - *Location:* Opp. Sri Vidya Mandir School, Meyyanoor Road.
  - *Style:* Wide-angle, glowing windows, dramatic sky, high-end corporate feel.
  - *Usage:* `About Us` page hero and `Contact Us` page.
- [ ] **Grand Reception & Lobby**
  - *Style:* Warm, welcoming, bright. Capture the scale and cleanliness of the entrance.
  - *Usage:* Homepage background elements.
- [ ] **Action/Candid Medical Moments**
  - *Style:* Blurry background (bokeh), sharp focus on a doctor consulting a patient or analyzing an X-ray.
  - *Usage:* Carousel or Hero section backdrops.

---

## 2. 👨‍⚕️ Doctors & Surgeon Profiles
*Consistency is key here. Set up a single lighting rig and background for all doctors to ensure the `/doctors` page looks unified and premium.*

- [ ] **Chief Surgeon Portrait (Dr. T. Natanasabapathy)**
  - *Style:* Authoritative yet approachable. Dark or slate-grey background. Dramatic side lighting.
  - *Usage:* `SurgeonProfile.tsx` on the Homepage. (Replaces `surgeon.jpeg`).
- [ ] **Individual Doctor Headshots**
  - *Style:* Consistent lighting, solid dark or light background (to be easily masked or mix-blend-mode applied in code).
  - *Usage:* `/doctors` directory grid and individual `[slug]/ClientPage.tsx`.
- [ ] **Team/Group Shot (Optional but recommended)**
  - *Style:* Core surgical team standing together in the OT or a bright hallway.

---

## 3. 🏗️ Facilities (Based on `/facilities` page)
*Capture the specific high-end equipment mentioned in the new facilities layout. Highlight the "technology" aspect with crisp, clinical lighting.*

- [ ] **Advanced Radiology & Imaging**
  - *Subject:* Dual Slice GE Prospeed 2 CT machine, CR/DR X-ray units.
  - *Style:* Machine in focus, perhaps a technician looking at the monitors in the background.
- [ ] **Clinical Laboratory Services**
  - *Subject:* Hematology and Biochemistry units, technicians working.
  - *Style:* Clean, sterile, showing the scale of the 24/7 lab operations.
- [ ] **Specialized Diabetic Mini-Lab**
  - *Subject:* Close-up of diagnostic equipment, blood analysis.
- [ ] **Diagnostic & Interventional USG**
  - *Subject:* GE Versana USG machines.
  - *Style:* Screen glowing, showing high-resolution imaging, doctor holding the ultrasound probe.

---

## 4. 🔬 Technology & Infrastructure (Based on `/technology` page)
*Showcase the "Architecture of Healing." These photos should look futuristic and ultra-clean.*

- [ ] **Modular OTs (Operation Theatres)**
  - *Subject:* The HVAC laminar-flow setup, surgical lights, sterile environment.
  - *Style:* Symmetrical, bright surgical lights turned on, sterile blue/green hues.
- [ ] **Surgical Systems**
  - *Subject:* 4K Arthroscope, HD Laparoscopic System, Computer Navigation System, Neuro-Microscope.
  - *Style:* Macro shots of the equipment lenses, or wide shots of the systems mounted in the OT.
- [ ] **Critical Care (10-Bed ICU)**
  - *Subject:* ICU beds, ventilators, central monitoring station.
  - *Style:* Quiet, organized, highlighting the 24/7 monitoring aspect.
- [ ] **Endoscopy Suite**
  - *Subject:* High-definition scopes and monitors.

---

## 5. 🏥 Specialities / Clinic Pages
*Each specific route under `/specialities` needs a representing photo. These can be a mix of equipment, models/patients, or specific clinical actions.*

- [ ] **Joint Care & Arthroscopy** (Knee models, arthroscopic tools)
- [ ] **Sports Medicine & Injury Clinic** (Physiotherapy equipment, dynamic movement)
- [ ] **Foot and Ankle Clinic** (Pedoscan, gait analysis tools)
- [ ] **Back Pain & Spinal Disorders** (Spine anatomical models, MRI scans on lightboards)
- [ ] **Paediatric Orthopaedics** (Kid-friendly consultation rooms, gentle interactions)

---

## 📷 Photographer Briefing Notes
1. **Aspect Ratios**: Shoot both wide (landscape 16:9) for hero banners and tall (portrait 4:5) for mobile layouts and individual cards.
2. **Negative Space**: Leave plenty of "empty" space on the left or right of hero shots so text can be overlaid without clashing with the subject.
3. **Color Palette**: Valli Hospital uses a lot of Deep Teal (`#00333c`, `#004b57`) and Orange/Amber (`#f98825`). If lighting or props can subtly incorporate these colors (e.g., teal scrubs, warm orange ambient lighting), it will match the website perfectly.
4. **Resolution**: Deliver high-resolution assets, but also provide Web-optimized variants (WebP format, compressed) for immediate drop-in to the Next.js `public/` directory.