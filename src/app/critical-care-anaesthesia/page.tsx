import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Critical Care & Anaesthesia Salem | ICU & Emergency Management | Valli Hospital",
  description: "Advanced Anaesthesiology & Critical Care at Valli Super Specialty Hospital, Salem. General, regional & nerve block anaesthesia, 24/7 ICU for septic shock, MODS, ARDS, polytrauma, TBI, DKA, and toxicology.",
  keywords: ["critical care Salem", "anaesthesia Salem", "ICU Salem", "nerve block Salem", "septic shock Salem", "ARDS Salem", "polytrauma Salem", "emergency ICU Salem", "ACLS Salem", "ATLS Salem"],
  alternates: { canonical: "https://www.vallihospital.in/critical-care-anaesthesia" },
};

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Critical Care & Anaesthesia', url: 'https://www.vallihospital.in/critical-care-anaesthesia' }
      ]} />
      <FAQSchema questions={[
        { question: 'What anaesthesia services does Valli Hospital offer?', answer: 'We provide General Anaesthesia, Regional Anaesthesia (Spinal and Epidural), and Ultrasound-Guided Nerve Blocks for neurosurgery, laparoscopy, orthopedic trauma, joint replacements, and all surgical specialties.' },
        { question: 'What critical care conditions are managed at Valli Hospital ICU?', answer: 'Our ICU manages Septic Shock, MODS, ARDS, Status Epilepticus, Polytrauma, TBI, Hemorrhagic Shock, Poisoning, DKA, and Acute Renal Failure — 24/7 with ACLS and ATLS certified intensivists.' },
      ]} />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Critical Care &amp; Anaesthesia</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#f98825]/15 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#004b57]/30 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            The Shield of<br /><span className="text-[#f98825]">Critical Care &amp; Anaesthesia - <span className="whitespace-nowrap">Dr. Balamurugan</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            The high-velocity clinical engine of our 50-bedded multispecialty hospital — precision anaesthesia and rapid-response critical care safeguarding every heartbeat 24/7.
          </p>
        </div>
      </section>

      <section className="bg-[#001f25] border-t border-white/10 py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['10-Bed','Advanced ICU'],['24/7','Emergency Response'],['ACLS','ATLS Certified'],['USG-Guided','Nerve Blocks']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#f98825]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Anaesthesiology and Critical Care Medicine serves as the high-velocity clinical engine of our 50-bedded multispecialty infrastructure. We specialize in providing precision General Anaesthesia, Regional Anaesthesia (Spinal and Epidural), and Ultrasound-Guided Nerve Blocks for a vast spectrum of surgeries, from Microscopic Neurosurgery and Advanced Laparoscopy to complex Orthopedic Trauma and Joint Replacements. Backed by a state-of-the-art ICU and a multidisciplinary team rigorously trained in ACLS and ATLS, we are the primary responders for life-threatening Medical and Surgical Emergencies, including Septic Shock, Multi-Organ Dysfunction Syndrome (MODS), Acute Respiratory Failure (ARDS), and Status Epilepticus.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Critical Care, Diagnostics &amp; Ventilator Management</h2>
            <p>Our critical care powerhouse is uniquely equipped to manage severe Polytrauma, Traumatic Brain Injuries (TBI), and Hemorrhagic Shock, working in seamless synergy with our Emergency, Pulmonology, and Surgical Gastroenterology wings. Leveraging a 24/7 diagnostic suite of high-resolution CT scans, Ultrasound (POCUS), and ABG analysis, we ensure real-time monitoring of Hemodynamic Stability and Acid-Base Balance. Our expertise extends to the therapeutic management of Poisoning/Toxicology, Diabetic Ketoacidosis (DKA), and Acute Renal Failure. Whether providing sedation for diagnostic Endoscopy and Colonoscopy or managing post-operative recovery for high-risk patients, Valli Superspecialty combines advanced ventilator management with rapid-response clinical mastery to safeguard every heartbeat 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['General, Spinal & Epidural Anaesthesia for all surgical specialties','Ultrasound-Guided Nerve Blocks & Regional Anaesthesia','24/7 ICU management — Septic Shock, MODS, ARDS','Status Epilepticus & neurological emergency ICU care','Polytrauma, TBI & Hemorrhagic Shock management','POCUS diagnostics & real-time hemodynamic monitoring','ABG analysis for ventilator & acid-base management','Poisoning, Toxicology & DKA critical management','Acute Renal Failure & electrolyte emergency care','Sedation for Endoscopy & Colonoscopy procedures','Post-operative high-risk patient recovery management','Seamless ICU synergy across all surgical departments'].map(cap => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f98825]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f98825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#40484a] text-sm font-semibold">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments &amp; Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery</Link></li>
            <li><Link href="/surgical-gastroenterology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Surgical Gastroenterology</Link></li>
            <li><Link href="/respiratory-care-pulmonology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Respiratory Care &amp; Pulmonology</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
