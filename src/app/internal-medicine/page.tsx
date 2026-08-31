import React from 'react';
import { BreadcrumbSchema, FAQSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
  title: "Internal Medicine & Diabetology Salem | Valli Hospital",
  description: "Comprehensive Department of Internal Medicine and Diabetology at Valli Super Specialty Hospital, Salem. Expert management of diabetes, hypertension, infectious diseases, and 24/7 emergency medical support in collaboration with critical care.",
  keywords: [
    "internal medicine Salem",
    "diabetologist Salem",
    "general physician Salem",
    "hypertension treatment Salem",
    "infectious disease doctor Salem",
    "diabetes hospital Salem",
    "24/7 physician Salem",
    "emergency medicine Salem",
    "Valli Hospital internal medicine",
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/internal-medicine",
  },
};

export default function Page() {
  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Internal Medicine', url: 'https://www.vallihospital.in/internal-medicine' }
      ]} />
      <FAQSchema questions={[
        { question: 'What conditions are treated by the Internal Medicine department?', answer: 'We treat a wide range of acute and chronic conditions including diabetes mellitus, hypertension, metabolic disorders, respiratory infections, fever management, and lifestyle diseases.' },
        { question: 'Does the Internal Medicine department offer 24/7 care in Salem?', answer: 'Yes. The department functions round the clock, providing 24-hour emergency medical services in close collaboration with our Department of Critical Care Medicine.' },
        { question: 'Who are the consultant physicians for Internal Medicine at Valli Hospital?', answer: 'Dr. Vasunthara Devi (Senior Consultant in Internal Medicine & Diabetology), Dr. I. Vijayalakshmi (MD General Medicine), and Dr. Ambiga provide comprehensive outpatient and inpatient medical care.' },
      ]} />
      <MedicalSpecialtySchema
        name="Internal Medicine & Diabetology Center"
        description="Comprehensive chronic disease management, diabetes care, hypertension clinic, and internal medical diagnostics in Salem."
        url="https://www.vallihospital.in/internal-medicine"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Internal Medicine</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            Internal Medicine &amp;<br />
            <span className="text-[#f98825]">Diabetology - <span className="whitespace-nowrap">Dr. Vasunthara Devi</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Comprehensive diagnostic evaluation, evidence-based management of lifestyle disorders, infectious diseases, and 24/7 critical ICU backup support in Salem.
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-[#f98825]">24/7</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Emergency Operations</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">Evidence-Based</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Clinical Protocols</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">ICU Backup</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Critical Care Integration</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">Preventive</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Patient Education</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Comprehensive Medical Care</h2>
            <p>
              The Department of Internal Medicine and Diabetology at Valli Superspecialty Hospital provides comprehensive, evidence-based care for a wide range of acute and chronic medical conditions. Our experienced physicians specialize in the diagnosis, treatment, and long-term management of diabetes, hypertension, gastric and liver disorders, respiratory illnesses, urinary tract infections, and various infectious diseases. Patients presenting with jaundice, fever, metabolic disorders, and other complex medical problems receive prompt evaluation and individualized treatment plans. Emphasis is placed on preventive care, patient education, and regular follow-up to promote long-term health and improve quality of life. Equipped with modern diagnostic facilities and supported by a multidisciplinary team, the department ensures accurate diagnosis and timely intervention for patients of all age groups.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">24-Hour Emergency Medical Services</h2>
            <p>
              The department functions round the clock, delivering 24-hour emergency medical services in close collaboration with the Department of Critical Care Medicine. Patients with acute heart conditions, severe respiratory distress, septicemia, uncontrolled diabetes, hypertensive emergencies, and other life-threatening illnesses receive immediate stabilization and intensive monitoring. Those requiring advanced life support or prolonged observation are seamlessly transferred to the Intensive Care Unit, where expert intensivists and physicians work together to provide coordinated, high-quality care. This integrated approach enables rapid decision-making, early intervention, and continuous monitoring, leading to improved clinical outcomes. With a commitment to compassion, clinical excellence, and patient safety, the Department of Internal Medicine and Diabetology remains a trusted center for comprehensive medical care at all hours.
            </p>

            {/* Key Capabilities */}
            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Diagnosis & management of Diabetes & Diabetology care",
                  "Hypertension & cardiovascular risk control",
                  "Gastric and liver disorders diagnosis",
                  "Respiratory illnesses & chronic asthma care",
                  "Urinary tract infections (UTI) therapy",
                  "Infectious diseases treatment (fevers, dengue, etc.)",
                  "Jaundice & metabolic disorders screening",
                  "24/7 emergency stabilization & response",
                  "Seamless integration with Critical Care & ICU care",
                  "Advanced diagnostics (high-speed CT scan, bedside ultrasound)",
                  "Preventive healthcare plans & regular follow-ups",
                  "Multidisciplinary coordinate intervention protocols",
                ].map((cap) => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f98825]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f98825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#40484a] text-sm font-semibold">{cap}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments &amp; Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/dialysis-kidney-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">24/7 Dialysis &amp; Kidney Care</Link></li>
            <li><Link href="/critical-care-anaesthesia" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Critical Care &amp; Anaesthesia</Link></li>
            <li><Link href="/respiratory-care-pulmonology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Respiratory Care &amp; Pulmonology</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
