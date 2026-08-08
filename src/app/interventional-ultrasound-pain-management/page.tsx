import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Interventional Ultrasound & Pain Management Salem | PRP Nerve Block | Valli Hospital",
  description: "Advanced Interventional Ultrasound & Pain Management at Valli Super Specialty Hospital, Salem. Expert nerve blocks, PRP injections, stem cell therapy, epidural injections, and USG-guided biopsies. Two GE Versana machines. 24/7 pain relief.",
  keywords: [
    "interventional ultrasound Salem",
    "pain management Salem",
    "nerve block Salem",
    "PRP injection Salem",
    "stem cell injection Salem",
    "epidural injection Salem",
    "USG guided biopsy Salem",
    "trigeminal neuralgia treatment Salem",
    "cancer pain management Salem",
    "Valli Hospital pain clinic",
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/interventional-ultrasound-pain-management",
  },
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
        { name: 'Interventional Ultrasound & Pain Management', url: 'https://www.vallihospital.in/interventional-ultrasound-pain-management' }
      ]} />
      <FAQSchema questions={[
        { question: 'What is Interventional Ultrasound & Pain Management?', answer: 'It is a precision-guided specialty at Valli Super Specialty Hospital using two GE Versana USG machines to perform nerve blocks, PRP injections, stem cell therapy, epidural injections, and ultrasound-guided biopsies for pain relief and diagnostics.' },
        { question: 'What conditions are treated at Valli Hospital Pain Management clinic?', answer: 'We treat trauma pain, arthritis, chronic back pain, Trigeminal Neuralgia, TMJ disorders, cancer pain, pancreatic pain, stroke-related pain, and sports injuries using advanced interventional techniques.' },
        { question: 'Who leads the Interventional Ultrasound team?', answer: 'Our multidisciplinary team includes a senior Radiologist, an Anesthetist, a specialized Pain Medicine Consultant, and three expert technicians.' },
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Interventional Ultrasound &amp; Pain Management</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#3cb3a6]/20 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            Interventional Ultrasound<br />
            <span className="text-[#3cb3a6]">&amp; Pain Management</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Lead Specialist:</span>
            <span className="text-white bg-[#3cb3a6] px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider">
              Dr. G. Balamurugan
            </span>
          </div>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Premier precision-guided diagnostics and advanced pain relief — powered by two GE Versana USG machines and a specialist multidisciplinary team in Salem.
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-[#3cb3a6]">2</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">GE Versana USG Machines</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#3cb3a6]">24/7</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Pain Relief Services</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#3cb3a6]">3+</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Expert Technicians</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#3cb3a6]">10+</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Intervention Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Department Overview</h2>
            <p>
              The Interventional Ultrasound Department at Valli Superspeciality Hospital, Salem, is a premier center for precision-guided diagnostics and advanced pain relief. Equipped with two high-end GE Versana USG machines, our facility ensures crystal-clear imaging for the most delicate medical interventions. Our multidisciplinary team features three expert technicians, a senior Radiologist, an Anesthetist, and a specialized Pain Medicine Consultant.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Trauma Pain Management &amp; Nerve Blocks</h2>
            <p>
              We provide life-changing nerve blocks for trauma pain management, ensuring immediate relief for patients suffering from acute injuries. Our specialists excel in ultrasound-guided therapeutic procedures, including PRP (Platelet-Rich Plasma) and Stem Cell injections tailored for sports injury treatment and arthritis management. For those battling chronic back conditions, we perform precise epidural and caudal injections to target spinal pain at its source.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Complex Neurological &amp; Oncological Pain</h2>
            <p>
              Our expertise extends to complex neurological pain, offering plexus and ganglion blocks for conditions like Trigeminal Neuralgia and TMJ (Temporomandibular Joint) pain. We are a vital resource for oncology patients, providing compassionate interventional care for chronic cancer pain and pancreatic pain. Furthermore, we offer specialized protocols for stroke-related pain and long-term recovery from high-velocity trauma.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Ultrasound-Guided Diagnostics &amp; Biopsies</h2>
            <p>
              For definitive diagnostic clarity, our team conducts ultrasound-guided biopsies, ensuring accuracy while prioritizing patient safety and comfort. By combining real-time imaging with expert clinical intervention, we bridge the gap between traditional medicine and modern regenerative therapy. Valli Superspeciality Hospital remains Salem&apos;s trusted destination for cutting-edge pain medicine and interventional radiology.
            </p>

            {/* Key Capabilities */}
            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Nerve blocks for trauma pain management",
                  "PRP (Platelet-Rich Plasma) injections",
                  "Stem Cell injections for arthritis & sports injury",
                  "Epidural and caudal injections for spinal pain",
                  "Plexus and ganglion blocks for Trigeminal Neuralgia",
                  "TMJ (Temporomandibular Joint) pain intervention",
                  "Chronic cancer & pancreatic pain management",
                  "Stroke-related pain protocols",
                  "Ultrasound-guided biopsies",
                  "Rapid trauma Echocardiography",
                  "Aesthetic dermatological USG procedures",
                  "Real-time PRP & regenerative therapy",
                ].map((cap) => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3cb3a6]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#3cb3a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
