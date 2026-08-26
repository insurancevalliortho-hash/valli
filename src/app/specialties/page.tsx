"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MagneticCursor from "../../components/MagneticCursor";
import Link from "next/link";

const Specialties = [
    {
        id: "orthopaedics",
        title: "Orthopaedics & Joint Replacement",
        subtitle: "Flagship Department",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#00333c] to-[#004b57]",
        dark: true,
        tag: "Flagship Department",
        tagBg: "bg-[#f98825]/20 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        description: "Comprehensive bone and joint care, sports injuries, and minimally invasive total joint replacements backed by advanced arthroscopy and computer navigation.",
        bullets: [
            "Total Knee & Hip Replacement using minimally invasive techniques for faster recovery.",
            "Arthroscopic surgery for sports injuries, ligament reconstruction, and cartilage repairs.",
            "Complex trauma & fracture management with 24/7 emergency orthopedic readiness.",
            "Spine disorder treatment including disc herniation, spondylolisthesis, and stenosis.",
            "Advanced diagnostics: high-speed CT scan, ultrasound, and bone density studies on-site.",
            "Integrated physiotherapy & rehabilitation to restore full mobility post-surgery.",
        ],
        stat: { value: "3,000+", label: "Joint Replacements Performed" },
    },
    {
        id: "gastroenterology",
        title: "Advanced Surgical Gastroenterology",
        subtitle: "Digestive Care",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Digestive Health",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M8 7v4m8-4v4m-4-8v12m-6 4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2z" />
            </svg>
        ),
        description: "High-performance surgical management of complex abdominal conditions within a 50-bedded multispecialty framework powered by laparoscopy and advanced endoscopy.",
        bullets: [
            "Minimally invasive laparoscopic surgery for gallstones, hernias, appendicitis, and GERD.",
            "Advanced Endoscopy & Colonoscopy for GI bleeding, peptic ulcers, and polyp management.",
            "Complex hepatobiliary surgery for pancreatitis, liver abscesses, and pancreatic pseudocysts.",
            "Emergency laparotomies and life-saving care for GI perforations and bowel obstruction.",
            "High-resolution CT scan & ultrasound for rapid mapping of abdominal trauma.",
            "ACLS & ATLS certified team with high-tech ICU for seamless post-operative critical care.",
        ],
        stat: { value: "24/7", label: "Surgical Readiness" },
    },
    {
        id: "neurosurgery",
        title: "Advanced Neurosurgery & Neurological Care",
        subtitle: "Brain & Spine",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Brain & Spine",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Elite neurosurgical precision for brain tumors, cerebrovascular emergencies, and spine disorders within a high-tech ICU-backed multispecialty infrastructure.",
        bullets: [
            "Brain tumor surgery: Gliomas, Meningiomas, Pituitary Adenomas with neuro-microscope precision.",
            "Cerebrovascular care for Aneurysms, AVM, Ischemic & Hemorrhagic Stroke.",
            "Emergency neurosurgery for Traumatic Brain Injury, Epidural & Subdural Hematomas.",
            "Spine surgery: Herniated Disc, Spondylolisthesis, Spinal Stenosis, and Spinal Cord Tumors.",
            "VP Shunting for Hydrocephalus and management of Trigeminal Neuralgia.",
            "Rapid CT scan & MRI-guided diagnostics for congenital anomalies and ICP management.",
        ],
        stat: { value: "High", label: "Precision Rate" },
    },
    {
        id: "pulmonology",
        title: "Advanced Respiratory Care & Pulmonology",
        subtitle: "Lung & Airway",
        accentColor: "#3cb3a6",
        bg: "bg-white",
        dark: false,
        tag: "Respiratory Care",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 3c0 0-4 4-4 9s2 6 4 6 4-1 4-6-4-9-4-9z" />
            </svg>
        ),
        description: "Elite respiratory care for Asthma, COPD, TB, and life-threatening emergencies like ARDS within a 50-bedded multispecialty setup with interventional pulmonology.",
        bullets: [
            "Expert management of Asthma, COPD, Bronchiectasis, ILD, and Pleural Effusion.",
            "Flexible Bronchoscopy for lung cancer diagnosis and therapeutic removal of foreign bodies.",
            "Life-saving ICU care for ARDS, Pneumothorax, and Massive Hemoptysis — 24/7.",
            "High-resolution CT & ultrasound (USG Thorax) for lung nodules and mediastinal conditions.",
            "Thoracocentesis, BiPAP/CPAP therapy, and comprehensive Pulmonary Rehabilitation.",
            "Synergy with Endoscopy and Laparoscopy teams for Pulmonary Embolism and Sarcoidosis.",
        ],
        stat: { value: "24/7", label: "Respiratory ICU" },
    },
    {
        id: "hematology",
        title: "Hematology & Blood Disorders",
        subtitle: "Precision Care for Every Drop of Life",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Blood Disorders",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
            </svg>
        ),
        description: "Expert diagnosis and management of blood disorders from Anemia and Hemophilia to Leukemia within a 50-bedded multispecialty framework with 24/7 ICU readiness.",
        bullets: [
            "Diagnosis & management of Iron Deficiency Anemia, Thalassemia, Sickle Cell Disease, and Hemophilia.",
            "Emergency care for Septicemia, Thrombocytopenia, DIC, and DVT — ACLS & ATLS certified team.",
            "High-speed CT scan & ultrasound for Lymphadenopathy and Splenomegaly investigations.",
            "Endoscopy & Colonoscopy suite for rapid identification of occult GI bleeding.",
            "Comprehensive oncology workups for Leukemia, Lymphoma, and Multiple Myeloma.",
            "Laparoscopic Splenectomy for ITP and minimally invasive surgical synergy when needed.",
        ],
        stat: { value: "24/7", label: "Emergency Hematology" },
    },
    {
        id: "critical-care",
        title: "Anaesthesiology & Critical Care",
        subtitle: "The Shield of Critical Care",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#00333c] to-[#001f25]",
        dark: true,
        tag: "Critical Care",
        tagBg: "bg-[#f98825]/20 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Precision anaesthesia and rapid-response critical care — the high-velocity clinical engine safeguarding every heartbeat through surgery, trauma, and recovery.",
        bullets: [
            "General, Regional & Ultrasound-Guided Nerve Block Anaesthesia for all surgical specialties.",
            "24/7 ICU management for Septic Shock, MODS, ARDS, and Status Epilepticus.",
            "Primary responders for Polytrauma, TBI, and Hemorrhagic Shock in all emergencies.",
            "24/7 POCUS diagnostics, ABG analysis, and real-time hemodynamic monitoring.",
            "Management of Poisoning/Toxicology, DKA, and Acute Renal Failure in critical care.",
            "Sedation for Endoscopy/Colonoscopy and post-operative recovery for high-risk patients.",
        ],
        stat: { value: "10-Bed", label: "Advanced ICU" },
    },
    {
        id: "internal-medicine",
        title: "Internal Medicine & Urology",
        subtitle: "Primary Care",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Primary Care",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        ),
        description: "Expert core of our 50-bedded multispecialty hospital managing chronic and acute illnesses with ACLS/ATLS-certified staff, on-site diagnostics, and integrated critical care.",
        bullets: [
            "Expert management of Diabetes, Hypertension, Infectious Diseases, and Renal disorders.",
            "ACLS & ATLS certified team with seamless ICU transition for rapid-deterioration cases.",
            "In-house CT scan & Ultrasound delivering accurate diagnoses within minutes.",
            "High-definition Endoscopy & Colonoscopy for gastrointestinal health without referrals.",
            "Laparoscopic surgical synergy for internal medical complications requiring intervention.",
            "Comprehensive urology: nephrology disorders, bladder and prostate care, renal failure.",
        ],
        stat: { value: "24/7", label: "Care & Diagnostics" },
    },
    {
        id: "paediatrics",
        title: "Paediatrics & Paediatric Surgery",
        subtitle: "Child-First Care",
        accentColor: "#3cb3a6",
        bg: "bg-white",
        dark: false,
        tag: "Child-First Care",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        description: "Complete healthcare for children including newborn wellness, emergency surgeries, and laparoscopic procedures with child-safe anesthesia protocols.",
        bullets: [
            "Newborn wellness check-ups, immunization, and neonatal intensive care support.",
            "Pediatric emergency surgery for appendicitis, intussusception, and acute abdomen.",
            "Laparoscopic procedures: hernia repair, pyloric stenosis, and undescended testis.",
            "Birth defect corrections and congenital anomaly management with specialist oversight.",
            "Child-safe diagnostic suite: dedicated pediatric imaging, ultrasound, and lab services.",
            "Specialized pediatric anesthesia with incubator-ready post-op monitoring.",
        ],
        stat: { value: "100%", label: "Child-Safe Protocols" },
    },
    {
        id: "emergency",
        title: "24x7 Emergency & Industrial Injury",
        subtitle: "Every Second Counts",
        accentColor: "#f98825",
        bg: "bg-gradient-to-r from-[#ebfdfc] to-[#ffffff]",
        dark: false,
        tag: "Emergency Ready",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        description: "Immediate advanced trauma and industrial injury care with 30-minute arrival-to-operation protocols backed by ACLS/ATLS certified emergency responders.",
        bullets: [
            "50-bedded trauma center with dedicated triage zone and 30-min arrival-to-operation time.",
            "ACLS & ATLS certified emergency physicians and surgeons on-site 24/7/365.",
            "Industrial injury rapid limb-salvage protocols and emergency polytrauma management.",
            "Instant bedside diagnostics: high-speed CT scan, ultrasound, and point-of-care labs.",
            "Seamless ER to ICU transition with continuous intensivist monitoring.",
            "Mass casualty readiness — one of the region's largest emergency setups.",
        ],
        stat: { value: "50+", label: "Trauma Bed Capacity" },
    },
    {
        id: "omfs",
        title: "Oral & Maxillofacial Surgery",
        subtitle: "Advanced Facial Surgical Care",
        accentColor: "#004b57",
        bg: "bg-white",
        dark: false,
        tag: "Facial Surgery",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
            </svg>
        ),
        description: "Elite surgical precision for the face, jaws, and mouth — managing complex facial trauma, oral cancers, TMJ disorders, and orthognathic reconstruction.",
        bullets: [
            "Complex facial trauma: Mandibular, ZMC, Orbital Floor Fractures, and Nasal Bone Injuries.",
            "Oral cancer (SCC), odontogenic cysts, ameloblastoma, and dentoalveolar pathology management.",
            "3D CT facial reconstruction and ultrasound for precise TMJ and salivary gland mapping.",
            "Microvascular reconstruction, nerve repair, and cleft lip & palate orthognathic correction.",
            "Emergency airway management for Ludwig's Angina and deep neck space infections.",
            "Synergy with Neurosurgery and Plastic Surgery for holistic functional & aesthetic restoration.",
        ],
        stat: { value: "Elite", label: "Facial Reconstruction" },
    },
    {
        id: "brachial-plexus",
        title: "Brachial Plexus & Peripheral Nerve Surgery",
        subtitle: "Microscopic Nerve Restoration",
        accentColor: "#3cb3a6",
        bg: "bg-white",
        dark: false,
        tag: "Nerve Surgery",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        description: "Elite microscopic precision for restoring upper limb function — managing Brachial Plexus Injuries, Nerve Compressions, and Obstetric Palsy with Neurotization techniques.",
        bullets: [
            "Traumatic Brachial Plexus Injuries: Avulsions, Ruptures, and Neuromas management.",
            "Obstetric Brachial Plexus Palsy: Erb's Palsy and Klumpke's Palsy surgical correction.",
            "Nerve Grafting, Nerve Transfers (Neurotization), and Microneurolysis with high-precision microscopes.",
            "Carpal Tunnel, Ulnar Nerve Entrapment, and Thoracic Outlet Syndrome (TOS).",
            "CT Myelography & high-resolution Nerve Ultrasound for Schwannoma and Neurofibroma mapping.",
            "Neuropathic pain management with Pain Intervention Medicine and Muscle Re-education Physiotherapy.",
        ],
        stat: { value: "Micro", label: "Precision Nerve Surgery" },
    },
    {
        id: "laboratory",
        title: "High-Precision Laboratory & Diagnostics",
        subtitle: "Diagnostic Backbone",
        accentColor: "#004b57",
        bg: "bg-gradient-to-br from-[#f0faf9] to-[#ffffff]",
        dark: false,
        tag: "Diagnostics",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
        ),
        description: "24/7 diagnostic backbone of our multispecialty infrastructure — rapid Biochemistry, Hematology, Microbiology, and Pathology guiding every life-saving decision.",
        bullets: [
            "Automated CBC, Lipid Profile, LFT, RFT, Thyroid Panel, and HbA1c with rapid turnaround.",
            "Emergency diagnostics: Troponin-I, Procalcitonin, Blood Culture, Serum Amylase 24/7.",
            "Histopathology & Cytology (FNAC/Biopsy) for cancers, TB, and inflammatory bowel disease.",
            "Coagulation profiles (PT/INR), ABG analysis for ventilator patients and surgical prep.",
            "Inflammatory markers (CRP, ESR, RA Factor) for Rheumatoid Arthritis and Gout.",
            "Integrated with CT Scan, Ultrasound, Endoscopy, and Laparoscopy for holistic diagnostics.",
        ],
        stat: { value: "24/7", label: "Lab Operations" },
    },
    {
        id: "interventional-usg",
        title: "Interventional Ultrasound & Pain Management",
        subtitle: "Precision Pain Relief",
        accentColor: "#3cb3a6",
        bg: "bg-gradient-to-br from-[#f0faf9] to-[#ffffff]",
        dark: false,
        tag: "Pain Medicine",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
        ),
        description: "Premier precision-guided diagnostics and advanced pain relief using two GE Versana USG machines — from nerve blocks and PRP therapy to USG-guided biopsies and cancer pain management.",
        bullets: [
            "Nerve blocks for trauma pain management — immediate acute pain relief.",
            "PRP (Platelet-Rich Plasma) & Stem Cell injections for sports injuries and arthritis.",
            "Epidural & caudal injections for precise spinal pain targeting.",
            "Plexus & ganglion blocks for Trigeminal Neuralgia and TMJ disorders.",
            "Chronic cancer pain, pancreatic pain, and stroke-related pain protocols.",
            "Ultrasound-guided biopsies for definitive diagnostic clarity.",
        ],
        stat: { value: "2×GE", label: "Versana USG Machines" },
    },
    {
        id: "dialysis-kidney-care",
        title: "24/7 Dialysis & Kidney Care",
        subtitle: "Lifeline for Renal Health",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#001f25] to-[#004b57]",
        dark: true,
        tag: "Renal Care",
        tagBg: "bg-[#f98825]/20 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
            </svg>
        ),
        description: "24-hour dedicated renal care center featuring the Fresenius Kabi 4008S for high-precision hemodialysis — a critical lifeline for kidney failure, poisoning, trauma shock, and transplant bridge therapy.",
        bullets: [
            "High-precision hemodialysis with Fresenius Kabi 4008S (German technology).",
            "Emergency dialysis for acute kidney failure, severe poisoning & trauma-induced renal shock.",
            "Expert management of medically compromised patients — alcoholic liver disease & pancreatitis.",
            "Qualified nephrologists, renal technicians & intensivists on duty 24/7/365.",
            "Sterile, infection-controlled environment prioritizing patient safety.",
            "Bridge dialysis therapy to support patients awaiting renal transplant.",
        ],
        stat: { value: "24/7", label: "Renal Emergency Ready" },
    },
    {
        id: "hematology-blood-disorders",
        title: "Hematology & Blood Disorders",
        subtitle: "Safeguarding Your Vital Life Force",
        accentColor: "#ba1a1a",
        bg: "bg-[#fff5f5]",
        dark: false,
        tag: "Blood Disorders",
        tagBg: "bg-red-100 text-red-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" />
            </svg>
        ),
        description: "Expert diagnosis and management of Anemia, Thalassemia, Hemophilia, DVT, Leukemia, Lymphoma, and DIC within a 50-bedded multispecialty framework with 24/7 ACLS/ATLS-certified ICU care.",
        bullets: [
            "Iron Deficiency, Megaloblastic & Sickle Cell Anemia management.",
            "Thalassemia, Hemophilia & Von Willebrand Disease treatment.",
            "Life-threatening DVT, Pulmonary Embolism & DIC emergency care.",
            "Septicemia & Thrombocytopenia — ICU-backed ACLS/ATLS response.",
            "Leukemia, Lymphoma & Multiple Myeloma oncology workups.",
            "Laparoscopic Splenectomy for ITP & surgical synergy.",
        ],
        stat: { value: "24/7", label: "Emergency Hematology" },
    },
    {
        id: "surgical-gastroenterology",
        title: "Surgical Gastroenterology & Digestive Care",
        subtitle: "Precision Abdominal Surgery",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Digestive Care",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M8 7v4m8-4v4m-4-8v12m-6 4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2z" />
            </svg>
        ),
        description: "High-performance laparoscopic and open surgery for gallstones, GI cancers, pancreatitis, hernias, and emergency laparotomies — backed by advanced endoscopy and 24/7 ICU-ready critical care.",
        bullets: [
            "Laparoscopic Cholecystectomy for gallstones & hernia repair.",
            "GI Cancer surgery — esophagus, stomach, colon & rectum.",
            "Chronic Pancreatitis, Pseudocyst & Liver Abscess management.",
            "Emergency Laparotomy for GI Perforations & Peritonitis.",
            "Advanced Endoscopy & Colonoscopy for GI Bleeding & Polyps.",
            "Colorectal surgery, Hemorrhoidectomy & Splenectomy.",
        ],
        stat: { value: "24/7", label: "Surgical Readiness" },
    },
    {
        id: "respiratory-care-pulmonology",
        title: "Respiratory Care & Interventional Pulmonology",
        subtitle: "Elite Lung & Airway Care",
        accentColor: "#3cb3a6",
        bg: "bg-gradient-to-br from-[#f0faf9] to-[#ffffff]",
        dark: false,
        tag: "Respiratory Care",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 3c0 0-4 4-4 9s2 6 4 6 4-1 4-6-4-9-4-9z" />
            </svg>
        ),
        description: "Elite respiratory care for Asthma, COPD, TB, and life-threatening ARDS — with interventional bronchoscopy, BiPAP/CPAP therapy, and 24/7 ICU-backed pulmonary emergency readiness.",
        bullets: [
            "Asthma, COPD, Bronchiectasis & ILD management.",
            "Pneumonia, TB, Pleural Effusion & Sleep Apnea treatment.",
            "ARDS, Pneumothorax & Massive Hemoptysis emergency care.",
            "Flexible Bronchoscopy for Lung Cancer diagnosis.",
            "Pulmonary Embolism & Sarcoidosis — multidisciplinary synergy.",
            "Thoracocentesis, BiPAP/CPAP & Pulmonary Rehabilitation.",
        ],
        stat: { value: "24/7", label: "Respiratory ICU" },
    },
    {
        id: "neurosurgery-neurological-care",
        title: "Advanced Neurosurgery & Neurological Critical Care",
        subtitle: "Brain & Spine Precision",
        accentColor: "#f98825",
        bg: "bg-gradient-to-br from-[#001f25] to-[#003340]",
        dark: true,
        tag: "Brain & Spine",
        tagBg: "bg-[#f98825]/20 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        description: "Elite surgical precision for brain tumors, cerebrovascular emergencies, TBI, and spine disorders — powered by neuro-microscope technology, 24/7 ICU, and ACLS/ATLS-certified emergency response.",
        bullets: [
            "Brain Tumor surgery (Gliomas, Meningiomas, Pituitary Adenomas).",
            "Cerebrovascular surgery for Aneurysms, AVM & Stroke.",
            "Emergency TBI, Epidural & Subdural Hematoma management.",
            "Herniated Disc, Spondylolisthesis & Spinal Stenosis surgery.",
            "VP Shunting for Hydrocephalus & Congenital Anomalies.",
            "Trigeminal Neuralgia & Chronic Back Pain management.",
        ],
        stat: { value: "Neuro", label: "Microscope Precision" },
    },
    {
        id: "critical-care-anaesthesia",
        title: "Critical Care & Anaesthesia",
        subtitle: "The Shield of Critical Care",
        accentColor: "#f98825",
        bg: "bg-white",
        dark: false,
        tag: "Critical Care",
        tagBg: "bg-[#f98825]/10 text-[#f98825]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        description: "Precision anaesthesia and rapid-response critical care — the clinical engine safeguarding every heartbeat across surgery, trauma, ICU, and post-operative recovery 24/7.",
        bullets: [
            "General, Spinal & Epidural Anaesthesia for all surgical specialties.",
            "Ultrasound-Guided Nerve Blocks & Regional Anaesthesia.",
            "24/7 ICU for Septic Shock, MODS, ARDS & Status Epilepticus.",
            "Polytrauma, TBI & Hemorrhagic Shock primary response.",
            "POCUS diagnostics, ABG analysis & hemodynamic monitoring.",
            "Poisoning, DKA & Acute Renal Failure critical management.",
        ],
        stat: { value: "10-Bed", label: "Advanced ICU" },
    },
    {
        id: "oral-maxillofacial-surgery",
        title: "Oral & Maxillofacial Surgery",
        subtitle: "Restoring Facial Harmony",
        accentColor: "#004b57",
        bg: "bg-gradient-to-br from-[#f0faf9] to-[#ffffff]",
        dark: false,
        tag: "Facial Surgery",
        tagBg: "bg-[#004b57]/10 text-[#004b57]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0112 0v2" />
            </svg>
        ),
        description: "Elite surgical precision for complex facial trauma, oral cancers, TMJ disorders, and orthognathic reconstruction — combining 3D CT mapping with microsurgical mastery for complete facial restoration.",
        bullets: [
            "Mandibular, ZMC & Orbital Fracture repair.",
            "Oral Cancer (SCC), Odontogenic Cysts & Ameloblastoma surgery.",
            "TMJ Ankylosis & Salivary Gland Tumor management.",
            "Cleft Lip & Palate orthognathic correction.",
            "3D CT Facial Reconstruction & precision nerve repair.",
            "Ludwig's Angina & airway emergency management.",
        ],
        stat: { value: "Elite", label: "Facial Reconstruction" },
    },
    {
        id: "brachial-plexus-nerve-surgery",
        title: "Brachial Plexus & Peripheral Nerve Surgery",
        subtitle: "Microscopic Nerve Restoration",
        accentColor: "#3cb3a6",
        bg: "bg-white",
        dark: false,
        tag: "Nerve Surgery",
        tagBg: "bg-[#3cb3a6]/10 text-[#3cb3a6]",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        description: "Elite microscopic precision for upper limb nerve restoration — nerve grafting, neurotization, Carpal Tunnel, Erb's Palsy, TOS, and Schwannoma surgery with high-resolution CT myelography.",
        bullets: [
            "Traumatic Brachial Plexus Injury repair (Avulsions, Ruptures).",
            "Erb's Palsy & Klumpke's Palsy surgical correction.",
            "Nerve Grafting, Neurotization & Microneurolysis.",
            "Carpal Tunnel, Ulnar Nerve Entrapment & TOS surgery.",
            "Schwannoma & Neurofibroma excision with CT Myelography.",
            "Neuropathic Pain management & Muscle Re-education Physio.",
        ],
        stat: { value: "Micro", label: "Precision Nerve Surgery" },
    },
    {
        id: "plastic-reconstructive-surgery",
        title: "Advanced Plastic, Reconstructive & Cosmetic Surgery",
        subtitle: "Artistry Meets Precision",
        accentColor: "#db2777",
        bg: "bg-white",
        dark: false,
        tag: "Plastic Surgery",
        tagBg: "bg-rose-100 text-rose-700",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
                <path d="M12 4v16m8-8H4M12 4a8 8 0 018 8m-8-8a8 8 0 00-8 8m8 8a8 8 0 018-8m-8 8a8 8 0 00-8-8" />
            </svg>
        ),
        description: "Elite plastic, reconstructive, and cosmetic surgery combining microsurgical precision with aesthetic artistry for complex wounds, hand trauma, varicose veins, and aesthetic rejuvenation.",
        bullets: [
            "Diabetic foot wounds, Traumatic wounds & pressure sore management.",
            "Hand Trauma — Tendon, nerve, crush injuries & soft tissue repair.",
            "Maxillo-facial surgery for facial trauma & jaw injuries.",
            "Minimally invasive laser surgery for Varicose Veins.",
            "Cosmetic surgery — Gynaecomastia correction & Abdominoplasty.",
            "Non-surgical rejuvenation — PRP, Exosomes, Microneedling & Peels.",
        ],
        stat: { value: "24/7", label: "Reconstructive Care" },
    },
];

export default function SpecialtiesPage() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <>
            <MagneticCursor />
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative min-h-[60vh] flex items-end bg-[#001f25] overflow-hidden pt-32 pb-20">
                <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#f98825]/10 rounded-[6rem] rotate-12 blur-sm" />
                    <div className="absolute -bottom-32 -left-16 w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[5rem] rotate-45" />
                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.03 }} />
                </motion.div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4">
                        <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Home
                        </Link>
                    </motion.div>

                    <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
                        Departments
                    </motion.span>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                        Centers of<br /><span className="text-[#f98825]">Excellence</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-xl text-white/60 max-w-xl leading-relaxed font-medium">
                        7 specialized departments. One goal — restoring your quality of life with world-class orthopedic care in Salem, Tamil Nadu.
                    </motion.p>
                </div>
            </section>

            {/* Specialty Cards */}
            <main className="bg-[#f9fafb] py-20">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="space-y-8">
                        {Specialties.map((item, index) => (
                            <motion.div
                                key={item.id}
                                id={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
                                className={`rounded-[2rem] overflow-hidden border ${item.dark ? "border-white/10" : "border-[#e5eaeb]"} shadow-sm hover:shadow-xl transition-shadow duration-500 ${item.bg}`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left — Icon + Title */}
                                    <div className={`md:w-80 lg:w-96 p-8 md:p-10 flex flex-col justify-between ${item.dark ? "" : "border-b md:border-b-0 md:border-r border-[#e5eaeb]"}`}>
                                        <div>
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                                                    style={{ backgroundColor: item.dark ? "rgba(255,255,255,0.1)" : `${item.accentColor}18`, color: item.accentColor }}>
                                                    {item.icon}
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${item.tagBg}`}>
                                                    {item.tag}
                                                </span>
                                            </div>
                                            <h2 className={`text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3 ${item.dark ? "text-white" : "text-[#00333c]"}`}>
                                                {item.title}
                                            </h2>
                                            <p className={`text-sm leading-relaxed font-medium ${item.dark ? "text-white/60" : "text-[#40484a]"}`}>
                                                {item.description}
                                            </p>
                                        </div>

                                        {/* Stat */}
                                        <div className={`mt-8 pt-6 border-t ${item.dark ? "border-white/10" : "border-[#e5eaeb]"}`}>
                                            <div className="text-3xl font-black" style={{ color: item.accentColor }}>{item.stat.value}</div>
                                            <div className={`text-xs font-bold uppercase tracking-widest mt-1 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>{item.stat.label}</div>
                                        </div>
                                    </div>

                                    {/* Right — Procedures + Tech + CTA */}
                                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                        <div className="mb-8">
                                            <h3 className={`text-xs font-bold uppercase tracking-widest mb-5 ${item.dark ? "text-white/40" : "text-[#40484a]"}`}>Department Highlights</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-4">
                                                {item.bullets.map((b, bi) => (
                                                    <div key={bi} className={`flex items-start gap-3 text-sm font-medium ${item.dark ? "text-white/80" : "text-[#00333c]"}`}>
                                                        <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: item.accentColor }} />
                                                        <span className="leading-relaxed">{b}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 mt-6">
                                            {/* Technical SEO: Dynamic Internal Links to Cluster Pages */}
                                            {(() => {
                                                const clusterMap: Record<string, { slug: string; name: string }> = {
                                                    "orthopaedics": { slug: "joint-care-clinic", name: "Joint Care Clinic" },
                                                    "gastroenterology": { slug: "failed-surgery-corrections", name: "Failed Surgery Corrections" },
                                                    "neurosurgery": { slug: "back-pain-and-spinal-disorders", name: "Back Pain & Spine" },
                                                    "pulmonology": { slug: "sports-training", name: "Sports Training & Rehab" },
                                                    "hematology": { slug: "bone-cancer-treatment", name: "Bone Cancer Clinic" },
                                                    "critical-care": { slug: "arthroscopy", name: "Arthroscopy Specialist" },
                                                    "internal-medicine": { slug: "internal-medicine", name: "Internal Medicine & Diabetology" },
                                                    "paediatrics": { slug: "paediatric-orthopaedics-deformity-clinic", name: "Paediatric Deformity Clinic" },
                                                    "emergency": { slug: "fracture-clinic", name: "Fracture & Trauma Clinic" },
                                                    "brachial-plexus": { slug: "back-pain-and-spinal-disorders", name: "Spine & Nerve Clinic" },
                                                    "laboratory": { slug: "genetic-testing", name: "Genetic Diagnostic Lab" },
                                                    "interventional-usg": { slug: "interventional-ultrasound-pain-management", name: "Pain Management Clinic" },
                                                    "dialysis-kidney-care": { slug: "dialysis-kidney-care", name: "Dialysis & Kidney Care" },
                                                    "hematology-blood-disorders": { slug: "hematology-blood-disorders", name: "Hematology & Blood Disorders" },
                                                    "surgical-gastroenterology": { slug: "surgical-gastroenterology", name: "Surgical Gastroenterology" },
                                                    "respiratory-care-pulmonology": { slug: "respiratory-care-pulmonology", name: "Respiratory Care & Pulmonology" },
                                                    "neurosurgery-neurological-care": { slug: "neurosurgery-neurological-care", name: "Neurosurgery & Neurological Care" },
                                                    "critical-care-anaesthesia": { slug: "critical-care-anaesthesia", name: "Critical Care & Anaesthesia" },
                                                    "oral-maxillofacial-surgery": { slug: "oral-maxillofacial-surgery", name: "Oral & Maxillofacial Surgery" },
                                                    "brachial-plexus-nerve-surgery": { slug: "brachial-plexus-nerve-surgery", name: "Brachial Plexus & Nerve Surgery" },
                                                    "plastic-reconstructive-surgery": { slug: "plastic-reconstructive-surgery", name: "Plastic & Reconstructive Surgery" }
                                                };
                                                const cluster = clusterMap[item.id];
                                                if (cluster) {
                                                    return (
                                                        <Link href={`/${cluster.slug}`}
                                                            className="inline-flex items-center gap-2 bg-[#f98825] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#e0751e] hover:-translate-y-0.5 transform transition-all duration-200 shadow-md">
                                                            Explore {cluster.name} →
                                                        </Link>
                                                    );
                                                }
                                                return null;
                                            })()}
                                            <Link href="/book-appointment"
                                                className="inline-flex items-center gap-2 bg-[#004b57] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#00333c] hover:-translate-y-0.5 transform transition-all duration-200 shadow-md">
                                                Book Consultation
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Banner */}
            <section className="bg-[#004b57] py-20">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Not sure which department<br />is right for you?
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-white/60 text-lg mb-8 font-medium">
                        Call us and our team will guide you to the right specialist.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:+919003417111" className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg">
                            Call +91 90034 17111
                        </a>
                        <Link href="/book-appointment" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors">
                            Book Online
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}
