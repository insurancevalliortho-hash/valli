"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const domains = [
    {
        number: "01",
        label: "Imaging & Diagnostics",
        tagline: "See everything before you touch anything.",
        bg: "bg-[#f9fafb]",
        dark: false,
        accent: "#f98825",
        techs: [
            {
                title: "High-Speed CT Scanner",
                tag: "24/7 Imaging",
                wide: true,
                dark: true,
                bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
                accent: "#f98825",
                stat: { v: "24/7", l: "Availability" },
                desc: "Sub-second whole-body scans powering trauma triage, 3D spinal & facial reconstruction, pulmonary embolism detection, and neurodiagnostic mapping — across every specialty, round the clock.",
                points: ["3D facial & spinal reconstruction", "Sub-second whole-body scan", "Trauma triage in < 5 min", "Low-dose radiation protocol"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></svg>,
            },
            {
                title: "High-Resolution USG & POCUS",
                tag: "Bedside Diagnostics",
                wide: false,
                dark: false,
                bg: "bg-white",
                accent: "#3cb3a6",
                stat: { v: "POCUS", l: "Point-of-Care" },
                desc: "Multi-purpose ultrasound covering abdomen, thorax, nerve imaging, and critical care bedside decisions — no waiting, no referrals.",
                points: ["Nerve USG for blocks", "USG Thorax for pulmonology", "POCUS at ICU bedside", "Obstetric & vascular use"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>,
            },
            {
                title: "C-ARM Fluoroscopy",
                tag: "Intraoperative",
                wide: false,
                dark: false,
                bg: "bg-[#f0fafa]",
                accent: "#f98825",
                stat: { v: "0.1mm", l: "Accuracy" },
                desc: "Live X-ray guidance during complex fracture fixations and joint replacements — surgeons operate with a data-verified view at all times.",
                points: ["Live surgical X-ray feed", "Sub-mm implant placement", "Intraoperative validation", "Reduced revision risk"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            },
            {
                title: "Pedoscan & Doppler",
                tag: "Vascular Diagnostics",
                wide: false,
                dark: false,
                bg: "bg-white",
                accent: "#004b57",
                stat: { v: "100%", l: "Diabetic Protocol" },
                desc: "Dynamic foot pressure mapping and Doppler blood flow assessment — critical for diabetic foot care, peripheral vascular planning, and gait correction.",
                points: ["Dynamic gait analysis", "Diabetic foot screening", "Doppler blood flow", "Custom orthotic planning"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" /></svg>,
            },
        ],
        /* bento layout: [wide(7/12) + 2 small stacked(5/12)] + 1 full-width below */
        layout: "imaging",
    },
    {
        number: "02",
        label: "Surgical Systems",
        tagline: "Operate with sight, precision, and confidence.",
        bg: "bg-[#001f25]",
        dark: true,
        accent: "#3cb3a6",
        techs: [
            {
                title: "2 HVAC Modular OTs",
                tag: "Sterile Environment",
                wide: true,
                dark: true,
                bg: "bg-[#f98825]/10 border border-[#f98825]/20",
                accent: "#f98825",
                stat: { v: "Class 100", l: "Clean-Room Standard" },
                desc: "Two HVAC-equipped laminar-flow Modular Operation Theatres with HEPA filtration, positive pressure, and UV sterilisation — the global gold standard for advanced surgical environments.",
                points: ["Laminar airflow control", "HEPA filtration system", "UV sterilisation cycle", "Multi-specialty capable"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
            },
            {
                title: "4K Arthroscope",
                tag: "Joint Surgery",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#3cb3a6",
                stat: { v: "4K", l: "Ultra-HD Vision" },
                desc: "Crystal-clear 4K resolution for diagnosing and treating ligament, cartilage, and meniscus injuries through 3–5mm keyhole incisions.",
                points: ["3–5mm keyhole incisions", "Same-day discharge", "Zero open scar", "Ligament reconstruction"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M15 10l4.553-2.069A1 1 0 0121 8.882v6.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>,
            },
            {
                title: "HD Laparoscopic System",
                tag: "Keyhole Surgery",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#f98825",
                stat: { v: "Mini", l: "Invasive Precision" },
                desc: "High-definition laparoscopy for gallstones, hernias, splenectomies, colorectal surgeries, and appendicectomies — multiple specialties, one platform.",
                points: ["Gallbladder & hernia repair", "Laparoscopic splenectomy", "Colon & rectal surgery", "Paediatric procedures"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
            },
            {
                title: "Computer Navigation System",
                tag: "GPS Surgery",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#3cb3a6",
                stat: { v: "±1°", l: "Alignment Precision" },
                desc: "Patient-specific intraoperative GPS mapping during knee and hip replacements — every cut is guided by data, not estimation.",
                points: ["Patient anatomy mapping", "Optimal implant angle", "Longer implant lifespan", "Fewer revisions"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
            },
            {
                title: "Surgical Neuro-Microscope",
                tag: "Microsurgery",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#f98825",
                stat: { v: "40×", l: "Magnification" },
                desc: "High-precision neuro-microscopes for craniotomies, spinal decompressions, nerve grafts, Neurotization, and microvascular reconstructions.",
                points: ["10–40× surgical field", "Craniotomy precision", "Nerve graft accuracy", "Brachial plexus repair"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" /></svg>,
            },
        ],
        layout: "surgical",
    },
    {
        number: "03",
        label: "Critical Care",
        tagline: "Every heartbeat monitored. No moment unguarded.",
        bg: "bg-[#f9fafb]",
        dark: false,
        accent: "#f98825",
        techs: [
            {
                title: "10-Bed Advanced ICU",
                tag: "24/7 Intensive Care",
                wide: true,
                dark: true,
                bg: "bg-gradient-to-br from-[#00333c] to-[#001f25]",
                accent: "#f98825",
                stat: { v: "10", l: "ICU Beds" },
                desc: "Multidisciplinary ICU with ventilators, BiPAP/CPAP, ABG stations, and round-the-clock intensivists — managing Septic Shock, MODS, ARDS, TBI, and complex post-operative recovery.",
                points: ["24/7 intensivist coverage", "Mechanical ventilators", "BiPAP / CPAP units", "Multi-organ failure support"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
            },
            {
                title: "ABG & Hemodynamic Monitoring",
                tag: "Real-Time",
                wide: false,
                dark: false,
                bg: "bg-white",
                accent: "#3cb3a6",
                stat: { v: "<5min", l: "Turnaround" },
                desc: "Arterial Blood Gas analysis and bedside hemodynamic monitoring tracking acid-base balance, oxygenation, and perfusion pressure in real time.",
                points: ["Instant acid-base status", "Ventilator optimization", "Perfusion tracking", "Rapid clinical action"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
            },
            {
                title: "Ultrasound-Guided Nerve Blocks",
                tag: "Pain-Free Surgery",
                wide: false,
                dark: false,
                bg: "bg-[#f0fafa]",
                accent: "#f98825",
                stat: { v: "80%", l: "Less Post-Op Pain" },
                desc: "Targeted anaesthesia delivered directly to the surgical site under real-time ultrasound guidance — radically reducing opioid use and enabling faster discharge.",
                points: ["Targeted regional block", "80% opioid reduction", "Elder-patient safe", "Faster mobilisation"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
            },
            {
                title: "BiPAP / CPAP Therapy",
                tag: "Respiratory Support",
                wide: false,
                dark: false,
                bg: "bg-white",
                accent: "#3cb3a6",
                stat: { v: "NIV", l: "Non-Invasive" },
                desc: "Non-invasive ventilatory support for OSA, COPD exacerbations, and pulmonary rehab — keeping patients breathing without intubation wherever possible.",
                points: ["Non-invasive ventilation", "Sleep Apnea therapy", "COPD exacerbation care", "Pulmonary rehabilitation"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M12 3c0 0-4 4-4 9s2 6 4 6 4-1 4-6-4-9-4-9z" /></svg>,
            },
        ],
        layout: "critical",
    },
    {
        number: "04",
        label: "Endoscopic Suite",
        tagline: "See inside. Treat in the same breath.",
        bg: "bg-[#00333c]",
        dark: true,
        accent: "#f98825",
        techs: [
            {
                title: "High-Definition Endoscopy",
                tag: "Upper GI",
                wide: false,
                dark: true,
                bg: "bg-[#f98825]/10 border border-[#f98825]/20",
                accent: "#f98825",
                stat: { v: "HD", l: "Crystal Clarity" },
                desc: "Upper GI endoscopy for peptic ulcers, GERD, Barrett's oesophagus, gastric cancers, and GI bleeding — diagnostic and therapeutic in one session.",
                points: ["Diagnosis + therapy together", "Same-session biopsy", "Bleeding arrestment", "Oesophagal dilation"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M8 7v4m8-4v4m-4-8v12m-6 4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2z" /></svg>,
            },
            {
                title: "Colonoscopy Suite",
                tag: "Lower GI",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#3cb3a6",
                stat: { v: "IBS", l: "& Cancer Screening" },
                desc: "Full colonoscopy for colorectal cancer screening, polyp removal, GI bleeding localisation, and IBD assessment — integrated with Gastroenterology, Hematology, and Lab.",
                points: ["Early cancer detection", "Polypectomy", "IBD confirmation", "GI bleed mapping"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M4 6h16M4 12h16m-7 6h7" /></svg>,
            },
            {
                title: "Flexible Bronchoscopy",
                tag: "Pulmonology",
                wide: false,
                dark: true,
                bg: "bg-white/5 border border-white/10",
                accent: "#f98825",
                stat: { v: "Flex", l: "Interventional Scope" },
                desc: "Precise airway diagnosis for lung cancer, ARDS evaluation, foreign body retrieval, and BAL sampling — the cornerstone of our Interventional Pulmonology unit.",
                points: ["Lung cancer biopsy", "Foreign body removal", "BAL fluid sampling", "Airway assessment"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M12 3c0 0-4 4-4 9s2 6 4 6 4-1 4-6-4-9-4-9z" /></svg>,
            },
        ],
        layout: "endoscopic",
    },
    {
        number: "05",
        label: "Laboratory Medicine",
        tagline: "Molecular truth. Delivered in minutes.",
        bg: "bg-[#f9fafb]",
        dark: false,
        accent: "#004b57",
        techs: [
            {
                title: "Fully Automated Lab Analyzers",
                tag: "Biochemistry",
                wide: true,
                dark: true,
                bg: "bg-gradient-to-br from-[#004b57] to-[#003340]",
                accent: "#f98825",
                stat: { v: "<15min", l: "Critical Result TAT" },
                desc: "High-throughput automated analysers running CBC, LFT, RFT, HbA1c, Thyroid Panel, Coagulation (PT/INR), Troponin-I, and Serum Amylase 24/7 — milliseconds from sample to clinical action.",
                points: ["CBC with full differential", "PT/INR for surgery prep", "Troponin-I cardiac panel", "Serum Amylase/Lipase"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>,
            },
            {
                title: "Histopathology & FNAC",
                tag: "Pathology",
                wide: false,
                dark: false,
                bg: "bg-white",
                accent: "#f98825",
                stat: { v: "FNAC", l: "Rapid Pathology" },
                desc: "Tissue biopsy, FNAC, and cytology for definitive cancer diagnosis, AFB staining for TB, and post-endoscopy IBD assessment — directly linked to our surgical teams.",
                points: ["FNAC & core needle biopsy", "AFB staining for TB", "Frozen section reports", "Oncology integration"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
            },
            {
                title: "Microbiology & Blood Culture",
                tag: "Infection Control",
                wide: false,
                dark: false,
                bg: "bg-[#f0fafa]",
                accent: "#3cb3a6",
                stat: { v: "24/7", l: "Culture Monitoring" },
                desc: "Automated blood cultures, Procalcitonin, and antibiotic sensitivity testing enabling precise Septicemia management and ICU antibiotic stewardship.",
                points: ["Automated blood culture", "Procalcitonin assay", "Antibiotic sensitivity", "Sepsis rapid panel"],
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6v4l3 3" /></svg>,
            },
        ],
        layout: "laboratory",
    },
];

/* ─── Tech Card ─────────────────────────────────────────────────────── */
function TechCard({ t, idx, parentDark }: { t: (typeof domains)[0]["techs"][0]; idx: number; parentDark: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay: 0.07 * idx, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            className={`group relative rounded-[1.75rem] overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-500 h-full ${t.bg} ${t.dark ? "border-white/10" : "border-[#e5eaeb]"}`}
        >
            {/* Accent glow corner */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-[1.5rem] rotate-45 opacity-15 group-hover:opacity-35 group-hover:scale-110 transition-all duration-600"
                style={{ backgroundColor: t.accent }} />

            <div className="relative z-10 p-7 flex flex-col h-full gap-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                    <div className="w-13 h-13 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: t.dark ? "rgba(255,255,255,0.09)" : `${t.accent}1a`, color: t.accent }}>
                        {t.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shrink-0
                        ${t.dark ? "bg-white/10 text-white/80 border border-white/15" : "bg-white text-[#40484a] border border-[#e5eaeb]"}`}>
                        {t.tag}
                    </span>
                </div>

                {/* Body */}
                <div className="flex-1">
                    <h3 className={`text-lg font-black tracking-tight leading-tight mb-2.5 ${t.dark ? "text-white" : "text-[#00333c]"}`}>{t.title}</h3>
                    <p className={`text-sm leading-relaxed font-medium ${t.dark ? "text-white/55" : "text-[#475569]"}`}>{t.desc}</p>
                </div>

                {/* Points */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {t.points.map(p => (
                        <li key={p} className={`flex items-center gap-1.5 text-[11px] font-semibold ${t.dark ? "text-white/60" : "text-[#00333c]"}`}>
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: t.accent }} />
                            {p}
                        </li>
                    ))}
                </ul>

                {/* Stat */}
                <div className={`pt-4 border-t ${t.dark ? "border-white/10" : "border-[#e5eaeb]"}`}>
                    <div className="text-2xl font-black" style={{ color: t.accent }}>{t.stat.v}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${t.dark ? "text-white/35" : "text-[#94a3b8]"}`}>{t.stat.l}</div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Domain Section ────────────────────────────────────────────────── */
function DomainSection({ domain }: { domain: typeof domains[0] }) {
    const [hero, ...rest] = domain.techs;
    const wideCard = domain.techs.find(t => t.wide) ?? hero;
    const smallCards = domain.techs.filter(t => !t.wide);

    return (
        <section className={`${domain.bg} relative overflow-hidden`}>
            {/* Giant ambient number watermark */}
            <div
                className={`absolute -top-10 -right-6 select-none pointer-events-none font-black leading-none`}
                style={{
                    fontSize: "clamp(8rem, 22vw, 18rem)",
                    color: domain.dark ? "rgba(255,255,255,0.025)" : "rgba(0,51,60,0.045)",
                    lineHeight: 1,
                }}
            >
                {domain.number}
            </div>

            <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
                {/* Domain header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-black uppercase tracking-[0.25em]"
                            style={{ color: domain.accent }}>
                            Domain {domain.number}
                        </span>
                        <div className="flex-1 h-px" style={{ backgroundColor: `${domain.accent}30` }} />
                    </div>
                    <h2 className={`text-4xl md:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] ${domain.dark ? "text-white" : "text-[#00333c]"}`}>
                        {domain.label}
                    </h2>
                    <p className={`mt-3 text-base font-medium max-w-lg ${domain.dark ? "text-white/45" : "text-[#64748b]"}`}>
                        {domain.tagline}
                    </p>
                </motion.div>

                {/* ── Imaging layout: wide(left) + 2 stacked(right) + 1 full below ── */}
                {domain.layout === "imaging" && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
                            <div className="lg:col-span-7"><TechCard t={domain.techs[0]} idx={0} parentDark={domain.dark} /></div>
                            <div className="lg:col-span-5 grid grid-rows-2 gap-5">
                                <TechCard t={domain.techs[1]} idx={1} parentDark={domain.dark} />
                                <TechCard t={domain.techs[2]} idx={2} parentDark={domain.dark} />
                            </div>
                        </div>
                        <div><TechCard t={domain.techs[3]} idx={3} parentDark={domain.dark} /></div>
                    </>
                )}

                {/* ── Surgical layout: wide(top) + 4 cards 2x2 ── */}
                {domain.layout === "surgical" && (
                    <>
                        <div className="mb-5"><TechCard t={domain.techs[0]} idx={0} parentDark={domain.dark} /></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                            {domain.techs.slice(1).map((t, i) => (
                                <TechCard key={t.title} t={t} idx={i + 1} parentDark={domain.dark} />
                            ))}
                        </div>
                    </>
                )}

                {/* ── Critical layout: wide(top) + 3 equal ── */}
                {domain.layout === "critical" && (
                    <>
                        <div className="mb-5"><TechCard t={domain.techs[0]} idx={0} parentDark={domain.dark} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {domain.techs.slice(1).map((t, i) => (
                                <TechCard key={t.title} t={t} idx={i + 1} parentDark={domain.dark} />
                            ))}
                        </div>
                    </>
                )}

                {/* ── Endoscopic layout: 3 equal cards ── */}
                {domain.layout === "endoscopic" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {domain.techs.map((t, i) => (
                            <TechCard key={t.title} t={t} idx={i} parentDark={domain.dark} />
                        ))}
                    </div>
                )}

                {/* ── Laboratory layout: wide(left 7/12) + 2 stacked(right 5/12) ── */}
                {domain.layout === "laboratory" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <div className="lg:col-span-7"><TechCard t={domain.techs[0]} idx={0} parentDark={domain.dark} /></div>
                        <div className="lg:col-span-5 grid grid-rows-2 gap-5">
                            <TechCard t={domain.techs[1]} idx={1} parentDark={domain.dark} />
                            <TechCard t={domain.techs[2]} idx={2} parentDark={domain.dark} />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function TechnologyPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative min-h-[65vh] flex items-end bg-[#001f25] overflow-hidden pt-32 pb-20">
                <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 right-[-15%] w-[50vw] h-[50vw] bg-[#3cb3a6]/10 rounded-[6rem] rotate-12" />
                    <div className="absolute -bottom-20 -left-10 w-[35vw] h-[35vw] bg-[#f98825]/8 rounded-[5rem] rotate-45" />
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "44px 44px", opacity: 0.025 }} />
                    {/* Ambient domain count */}
                    <div className="absolute bottom-4 right-8 text-[20rem] font-black text-white/[0.018] leading-none select-none pointer-events-none hidden xl:block">05</div>
                </motion.div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                        <a href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </a>
                    </motion.div>

                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6] animate-pulse" />
                        Clinical Infrastructure
                    </motion.span>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-5">
                        Medicine at the<br /><span className="text-[#f98825]">Edge of Science</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="text-base md:text-lg text-white/55 max-w-xl leading-relaxed font-medium mb-10">
                        18 technologies. 5 clinical domains. One mission — to give every patient the advantage of diagnostic precision and surgical mastery.
                    </motion.p>

                    {/* Domain index */}
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="flex flex-wrap gap-3">
                        {domains.map(d => (
                            <a key={d.number}
                                href={`#domain-${d.number}`}
                                className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/12 bg-white/5 hover:bg-white/10 transition-all duration-300">
                                <span className="text-[10px] font-black text-white/30 group-hover:text-white/60 transition-colors">{d.number}</span>
                                <span className="text-xs font-bold text-white/50 group-hover:text-white/80 transition-colors">{d.label}</span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── DOMAIN SECTIONS ── */}
            {domains.map(d => (
                <div key={d.number} id={`domain-${d.number}`}>
                    <DomainSection domain={d} />
                </div>
            ))}

            {/* ── PHILOSOPHY ── */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#004b57]/8 text-[#004b57] border border-[#004b57]/12 text-xs font-bold tracking-[0.18em] uppercase mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                            Our Philosophy
                        </span>
                        <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-[#00333c] tracking-tight leading-tight">
                            Why Technology <span className="text-[#f98825]">Changes Everything</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { icon: "🎯", title: "Pinpoint Accuracy", desc: "From CT-guided diagnosis to computer-navigated surgery — every intervention is data-verified to sub-millimetre precision." },
                            { icon: "⚡", title: "Speed Saves Lives", desc: "High-speed CT, rapid lab results, and 24/7 ICU monitoring compress critical decision windows from hours to minutes." },
                            { icon: "🛡️", title: "Minimal Invasion", desc: "Arthroscopy, laparoscopy, and bronchoscopy let us treat complex conditions through tiny portals — less trauma, faster healing." },
                            { icon: "🔗", title: "Integrated Ecosystem", desc: "Every imaging unit, lab panel, and OT is linked to clinical teams so findings immediately inform life-saving action." },
                        ].map((w, i) => (
                            <motion.div key={w.title}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                className="bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-4">{w.icon}</div>
                                <h3 className="text-[#00333c] font-black text-base mb-2">{w.title}</h3>
                                <p className="text-[#40484a] text-sm leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="bg-[#004b57] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Experience the difference<br />technology makes.
                    </motion.h2>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-white/55 text-base mb-8 font-medium max-w-md mx-auto">
                        Book a consultation and let our specialists put the right technology to work for you.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/book-appointment" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">Book a Consultation</a>
                        <a href="/specialities" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">View Specialities</a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </SmoothScroll>
    );
}
