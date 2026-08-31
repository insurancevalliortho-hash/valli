import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Critical Care & Anaesthesiology in Salem | 24/7 ICU & Emergency | Valli Hospital",
  description: "24/7 Advanced Intensive Care Unit (ICU) and Anaesthesiology at Valli Super Specialty Hospital, Salem. Specializing in septic shock, multi-organ failure, acute respiratory distress, severe polytrauma, and painless nerve block anaesthesia.",
  keywords: [
    "critical care specialist in salem",
    "best critical care specialist in salem",
    "top critical care specialist in salem",
    "24 hours hospital in salem",
    "ICU hospital Salem",
    "anaesthesia specialist Salem",
    "painless fracture nerve block",
    "emergency ICU Salem",
    "septic shock treatment Salem",
    "polytrauma ICU Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/critical-care-anaesthesia",
  },
  openGraph: {
    title: "24/7 Critical Care & Anaesthesiology Center Salem | Valli Hospital",
    description: "Multi-parameter ICU life support, round-the-clock intensivist coverage, and advanced ultrasound-guided regional anaesthesia in Salem.",
    url: "https://www.vallihospital.in/critical-care-anaesthesia",
    type: "website",
  }
};

export default function CriticalCareAnaesthesiaPage() {
  const faqList = [
    {
      question: "What capabilities are available in the Valli Hospital Intensive Care Unit (ICU)?",
      answer: "Our 24/7 ICU is equipped with advanced invasive/non-invasive ventilators, continuous arterial and central venous hemodynamics, dedicated dialysis support, bedside point-of-care ultrasound (POCUS), and round-the-clock intensivist monitoring."
    },
    {
      question: "What is ultrasound-guided regional nerve block anaesthesia?",
      answer: "Using high-resolution ultrasound imaging, our anaesthesiologists deliver micro-doses of local anaesthetic directly around target nerve trunks. This completely numbs the surgical limb for hours to days, eliminating surgical pain and allowing safe operation without systemic side effects or deep general anaesthesia."
    },
    {
      question: "How does the emergency critical care team handle severe polytrauma?",
      answer: "Our critical care and trauma resuscitation team follows strict ATLS (Advanced Trauma Life Support) protocols, achieving rapid airway control, damage control resuscitation, blood component therapy, and immediate operative clearance."
    },
    {
      question: "Who are the lead anaesthesiologists and critical care intensivists?",
      answer: "Our critical care division is led by Dr. G. Balamurugan (MBBS, MD Anaesthesia) and Dr. S. Pradeep (MBBS, Consultant in Anaesthesia & Critical Care)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Critical Care & Anaesthesia', url: 'https://www.vallihospital.in/critical-care-anaesthesia' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Critical Care Medicine & Anaesthesiology"
        description="24/7 advanced multi-disciplinary intensive care unit and modern regional anaesthesia suites in Salem."
        url="https://www.vallihospital.in/critical-care-anaesthesia"
      />
      <MedicalProcedureSchema
        name="Ultrasound-Guided Regional Nerve Blockade & Intensive Life Support"
        description="Targeted peripheral nerve blockade and continuous multi-organ critical life support."
        bodyLocation="Nervous System & Vital Organ Systems"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Critical Care & Anaesthesia</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            24/7 Intensive Care & Anaesthesiology
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Critical Care & <br /> <span className="text-[#f98825]">Anaesthesiology in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Safeguarding every heartbeat 24/7. State-of-the-art ICU monitoring, ventilator management, and advanced painless ultrasound-guided regional nerve blocks.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              🚨 24/7 ICU Emergency: +91 90034 17111
            </a>
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Hospital Directions & Access
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Round-the-Clock Intensive Care Excellence</h2>
              <p>
                In critical medical emergencies, seamless intensive care monitoring and precise anaesthesia protocols represent the backbone of surgical success. At <strong>Valli Super Specialty Hospital</strong>, our dedicated team of anesthesiologists and intensivists ensures rapid stabilization for acute trauma, sepsis, respiratory distress, and high-risk surgical patients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🫁</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">24/7 Multi-Disciplinary ICU</h3>
                <p className="text-base text-gray-600">Advanced invasive ventilators, continuous cardiac telemetry, blood gas monitoring, and isolation suites for sepsis and critical respiratory failure.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">💉</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Ultrasound Nerve Blocks</h3>
                <p className="text-base text-gray-600">Targeted regional analgesia delivering complete, painless operative anesthesia and sustained post-surgical pain relief with minimal opioid requirement.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Critical Care & Anaesthesia Specialists</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Consultant Anaesthesiologist</div>
                  <div className="text-xl font-bold text-white">Dr. G. Balamurugan</div>
                  <p className="text-sm text-gray-300 mt-2">MBBS, MD Anaesthesia. Specialist in advanced perioperative anaesthetic safety and high-risk surgical intensive care.</p>
                  <Link href="/doctors/dr-balamurugan-g" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Critical Care Consultant</div>
                  <div className="text-xl font-bold text-white">Dr. S. Pradeep</div>
                  <p className="text-sm text-gray-300 mt-2">MBBS, Consultant Anaesthesia & Critical Care. Specialist in targeted nerve blocks and emergency ICU stabilization.</p>
                  <Link href="/doctors/dr-spradeep" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-[#00333c] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-[#00333c] mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-base">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#00333c] text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4">24/7 Emergency Casualty & ICU in Salem</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Our emergency intensive care unit is fully operational around the clock for acute trauma and medical emergencies.</p>
          <a
            href="tel:+919003417111"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Call Emergency Casualty: +91 90034 17111
          </a>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Departments</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Emergency Fracture Clinic</Link></li>
            <li><Link href="/dialysis-kidney-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Dialysis & Kidney Care</Link></li>
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery ICU</Link></li>
            <li><Link href="/respiratory-care-pulmonology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Pulmonology & Respiratory</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
