"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SmoothScroll from "../../components/SmoothScroll";
import MagneticCursor from "../../components/MagneticCursor";
import { BreadcrumbSchema, FAQSchema } from "../../components/seo/StructuredData";

interface ServiceItem {
  id: string;
  category: "surgical" | "trauma-pediatric" | "rehab-wellness";
  title: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  procedures: string[];
  keyBenefit: string;
  recoveryTimeline: string;
}

const serviceCategories = [
  { id: "all", name: "All Offerings" },
  { id: "surgical", name: "Surgical Specialties" },
  { id: "trauma-pediatric", name: "Trauma & Pediatrics" },
  { id: "rehab-wellness", name: "Rehabilitation & Diagnostics" },
];

const servicesData: ServiceItem[] = [
  {
    id: "joint-care",
    category: "surgical",
    title: "Joint Care & Reconstruction",
    slug: "joint-care-clinic",
    description: "Minimally invasive total hip and knee reconstructions utilizing surgical navigation systems for sub-millimeter precision.",
    accentColor: "#f98825",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    procedures: [
      "Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "Unicondylar (Partial) Knee Surgery",
      "Computer-Navigated Joint Arthroplasty",
      "Revision Joint Surgery",
    ],
    keyBenefit: "Drastically reduced intraoperative trauma and rapid load-bearing initiation.",
    recoveryTimeline: "2 - 4 weeks for independent movement.",
  },
  {
    id: "arthroscopy",
    category: "surgical",
    title: "Arthroscopy & Sports Medicine",
    slug: "arthroscopy",
    description: "Precision keyhole surgery restoring ligaments, tendons, and cartilage stability with minimal tissue disruption.",
    accentColor: "#004b57",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    procedures: [
      "ACL / PCL Ligament Reconstruction",
      "Meniscus Tear Repair & Debridement",
      "Shoulder Rotator Cuff Repairs",
      "Recurrent Shoulder Dislocation Stabilisation",
      "Ankle & Wrist Keyhole Surgery",
    ],
    keyBenefit: "Minimized scarring, less postoperative pain, and optimized athletic recovery.",
    recoveryTimeline: "4 - 6 weeks for light activity; 6 months for elite sport.",
  },
  {
    id: "bone-cancer",
    category: "surgical",
    title: "Bone Cancer Treatment (Oncology)",
    slug: "bone-cancer-treatment",
    description: "Expert multi-disciplinary care focusing on limb-salvage surgeries and customized endoprosthetic skeletal reconstructions.",
    accentColor: "#ba1a1a",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    procedures: [
      "Limb-Sparing Wide Tumor Excision",
      "Modular Endoprosthesis Reconstructions",
      "Biopsies of Intra-articular Tumors",
      "Soft Tissue Sarcoma Resections",
      "Metastatic Bone Disease Stabilisation",
    ],
    keyBenefit: "Total oncological eradication while successfully preserving limb functionality.",
    recoveryTimeline: "Highly customized based on oncology protocols and biological integration.",
  },
  {
    id: "pediatric-ortho",
    category: "trauma-pediatric",
    title: "Paediatric Orthopaedics",
    slug: "paediatric-orthopaedics-deformity-clinic",
    description: "Corrective treatments for congenital deformities, developmental milestones, and skeletal anomalies in young patients.",
    accentColor: "#f98825",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    procedures: [
      "Congenital Clubfoot Correction (Ponseti)",
      "Developmental Dysplasia of the Hip (DDH) Care",
      "Genu Valgum (Knock Knees) Guided Growth",
      "Neuromuscular Deformity Corrections (Cerebral Palsy)",
      "Pediatric Bone Infection Treatments",
    ],
    keyBenefit: "Gentle corrective methods maximizing child's growth potential.",
    recoveryTimeline: "Varies based on early-stage intervention protocols.",
  },
  {
    id: "fracture-trauma",
    category: "trauma-pediatric",
    title: "Fracture & Trauma Clinic",
    slug: "fracture-clinic",
    description: "24/7 advanced emergency orthopaedic trauma center focused on limb salvage, complex fractures, and industrial injuries.",
    accentColor: "#004b57",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    procedures: [
      "Complex Articular Fracture Fixation",
      "Polytrauma & Multiple Limb Stabilization",
      "Industrial & Crush Injury Emergency Salvage",
      "Non-union & Mal-union Revision Surgery",
      "Minimally Invasive Plate Osteosynthesis (MIPO)",
    ],
    keyBenefit: "Immediate specialist intervention minimizing long-term mobility impairment.",
    recoveryTimeline: "6 - 12 weeks for solid bone integration.",
  },
  {
    id: "spinal-disorders",
    category: "trauma-pediatric",
    title: "Spinal Disorders Clinic",
    slug: "back-pain-and-spinal-disorders",
    description: "Comprehensive management of degenerative disc disease, nerve compressions, and spinal column stabilizing procedures.",
    accentColor: "#ba1a1a",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    procedures: [
      "Microdiscectomy for Herniated Discs",
      "Lumbar Spinal Decompression",
      "Spinal Fusion & Stabilisation",
      "Non-surgical Epidural Injections",
      "Postural Scoliosis Correction Services",
    ],
    keyBenefit: "Effective spinal nerve decompression returning comfort and mobility.",
    recoveryTimeline: "4 - 8 weeks depending on physical rehabilitation milestones.",
  },
  {
    id: "genetic-testing",
    category: "rehab-wellness",
    title: "Genetic Testing & Profiling",
    slug: "genetic-testing",
    description: "Advanced DNA diagnostics mapped to orthopedic risk factors, cancer predispositions, and personalized medicine pathways.",
    accentColor: "#f98825",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    procedures: [
      "Oncological Risk Profiling & DNA Screening",
      "Pharmacogenomic Medicine Customisation",
      "Familial Osteoporosis Genetic Assessments",
      "Connective Tissue Disorder DNA Mapping",
      "Post-test Specialist Clinical Counseling",
    ],
    keyBenefit: "Proactive healthcare strategy tailored specifically to patient's genetic layout.",
    recoveryTimeline: "Diagnostic testing; reports completed in 2 - 3 weeks.",
  },
  {
    id: "sports-training",
    category: "rehab-wellness",
    title: "Sports Training & Rehab",
    slug: "sports-training",
    description: "High-performance physical training, injury prevention analytics, and biomechanical assessment for professional athletes.",
    accentColor: "#004b57",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    procedures: [
      "Biomechanical Video Gait Analysis",
      "Targeted Injury Prevention Screening",
      "Post-ACL Reconstruction Reconditioning",
      "High-Performance Athletic Conditioning",
      "Neuromuscular Strength Testing",
    ],
    keyBenefit: "Elite-level recovery protocols bringing players safely back to high performance.",
    recoveryTimeline: "Dynamic training regimes customized around baseline athletic targets.",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const filteredServices = servicesData.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <SmoothScroll>
      <MagneticCursor />
      <Navbar />

      {/* SEO Schema Components */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.vallihospital.in/" },
          { name: "Services", url: "https://www.vallihospital.in/services" },
        ]}
      />
      <FAQSchema
        questions={[
          {
            question: "What orthopedic specialties are offered at Valli Hospital?",
            answer: "Valli Hospital offers a complete range of orthopaedic services, including Computer-Navigated Joint Replacement, Sports Arthroscopy, Pediatric Orthopedics, Bone Cancer Treatment (Orthopedic Oncology), Spine Surgery, and 24/7 Fracture Emergency Care.",
          },
          {
            question: "Who leads the orthopedic surgeries at Valli Hospital?",
            answer: "Our flagship orthopedic and joint reconstruction surgeries are led by Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, bringing over two decades of highly specialized trauma and joint care experience to Salem.",
          },
          {
            question: "Is there a dedicated physical rehabilitation facility?",
            answer: "Yes, our integrated clinical ecosystem includes high-performance sports training, advanced physical therapy, and biomechanical analytics for a seamless end-to-end recovery pathway.",
          },
        ]}
      />

      {/* Hero Banner */}
      <section
        ref={headerRef}
        className="relative min-h-[50vh] md:min-h-[55vh] flex items-end bg-[#001f25] overflow-hidden pt-36 pb-20"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-25%] right-[-10%] w-[50vw] h-[50vw] bg-[#004b57]/20 rounded-[8rem] rotate-45" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[35vw] h-[35vw] bg-[#f98825]/8 rounded-[6rem] rotate-12" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.03,
            }}
          />
        </motion.div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Home
            </Link>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825] animate-pulse" />
            Procedural Offerings
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight mb-6"
          >
            Our Clinical <br />
            <span className="text-[#f98825]">Services Catalog</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-medium"
          >
            Highly advanced surgical solutions, proactive genomic profiling, and high-performance physical conditioning systems tailored for long-term health.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs & Bento Catalog */}
      <section className="py-20 md:py-28 bg-[#f9fafb] relative overflow-hidden">
        <div className="absolute top-[20%] left-[-15%] w-[40vw] h-[40vw] bg-[#004b57]/4 rounded-[6rem] rotate-12 pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[45vw] h-[45vw] bg-[#f98825]/4 rounded-[8rem] rotate-45 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Category Filters */}
          <div className="flex justify-center mb-16 overflow-x-auto py-2 -mx-6 px-6 hide-scrollbar">
            <div className="flex gap-2 p-1.5 bg-[#e5eaeb] rounded-full border border-gray-200/60 shadow-inner">
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  id={`filter-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-3 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-[#004b57] text-white shadow-md"
                      : "text-[#40484a] hover:text-[#004b57] hover:bg-white/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={service.id}
                  className="bg-white border border-[#e5eaeb] rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Glowing subtle watermark */}
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 group-hover:scale-125 transition-transform duration-700 pointer-events-none"
                    style={{ backgroundColor: service.accentColor }}
                  />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                        style={{ backgroundColor: service.accentColor }}
                      >
                        {service.icon}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] px-3.5 py-1.5 bg-[#f9fafb] border border-[#e5eaeb] text-[#40484a] rounded-full">
                        {service.category === "surgical"
                          ? "Oncological & Surgical"
                          : service.category === "trauma-pediatric"
                          ? "Emergency & Pediatric"
                          : "Rehab & Diagnostics"}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-2xl md:text-3xl font-black text-[#00333c] mb-3 tracking-tight group-hover:text-[#f98825] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 font-semibold leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Procedures List */}
                    <div className="mb-6 bg-[#f9fafb] border border-[#e5eaeb] rounded-2xl p-5">
                      <h4 className="text-[#004b57] text-xs font-black uppercase tracking-wider mb-3">
                        Key Procedures & Modalities
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#40484a] font-semibold">
                        {service.procedures.map((proc, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#f98825]" />
                            {proc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits & Recovery Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#e5eaeb] pt-6 mb-8 text-sm text-[#40484a]">
                      <div>
                        <span className="block text-[10px] font-black text-[#004b57] uppercase tracking-wider mb-1">
                          Primary Outcome
                        </span>
                        <span className="font-semibold leading-snug">{service.keyBenefit}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-[#004b57] uppercase tracking-wider mb-1">
                          Typical Recovery
                        </span>
                        <span className="font-semibold leading-snug text-[#f98825]">
                          {service.recoveryTimeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-4 mt-auto">
                    <Link
                      href={`/${service.slug}`}
                      className="bg-[#004b57] text-white hover:bg-[#00333c] text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full transition-colors flex items-center gap-2"
                    >
                      Learn Details
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/book-appointment"
                      className="border border-[#e5eaeb] hover:border-[#f98825] hover:text-[#f98825] text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-full text-[#40484a] transition-all bg-white"
                    >
                      Book Clinic Visit
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#004b57] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-[-15%] w-[45vw] h-[45vw] bg-[#001f25]/30 rounded-[6rem] rotate-12 pointer-events-none" />
        <div className="absolute bottom-0 left-[-15%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45 pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6"
          >
            24/7 Clinical Pathways
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Schedule a Custom Consultation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg mb-8 max-w-xl mx-auto"
          >
            Get mapped to the appropriate specialist clinic. Our expert surgical teams and diagnostic labs are active 24/7.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/book-appointment"
              className="bg-[#f98825] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-[#e0751e] transition-colors shadow-lg"
            >
              Book Specialty Appointment
            </Link>
            <Link
              href="/contact-us"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-sm border border-white/20 transition-colors"
            >
              Contact Diagnostics Hub
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </SmoothScroll>
  );
}
