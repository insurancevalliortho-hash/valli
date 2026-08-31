import React from 'react';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';
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
        { question: 'What is Interventional Ultrasound & Pain Management?', answer: 'It is a precision-guided specialty at Valli Super Specialty Hospital using high-definition GE Versana USG systems to perform targeted nerve blocks, regenerative PRP injections, epidural injections, and ultrasound-guided biopsies for instant and sustained pain relief.' },
        { question: 'What pain conditions are treated at Valli Hospital Pain Management clinic?', answer: 'We treat severe joint arthritis, chronic back/neck pain, sciatica, Trigeminal Neuralgia, TMJ disorders, intractable cancer pain, and acute sports injuries without heavy reliance on oral opioids.' },
        { question: 'Who leads the Interventional Ultrasound and Radiology team?', answer: 'Our imaging and interventional team is led by Dr. S. Senthilnathan (MBBS, MD - Consultant Radio Diagnosis) and senior anaesthetists.' },
      ]} />
      <MedicalSpecialtySchema
        name="Interventional Pain Management & Radio Diagnosis Center"
        description="Ultrasound-guided targeted nerve blocks, regenerative therapies, and non-surgical pain management in Salem."
        url="https://www.vallihospital.in/interventional-ultrasound-pain-management"
      />
      <MedicalProcedureSchema
        name="Ultrasound-Guided Targeted Nerve Infiltration & PRP Therapy"
        description="Real-time sonographic precision needle targeting of inflamed nerve bundles and degenerative joints."
        bodyLocation="Peripheral Nerves & Musculoskeletal System"
      />

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

      {/* Hero Section - Concept 1 */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-16 overflow-hidden text-left">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#3cb3a6]/20 rounded-[6rem] rotate-12 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45 blur-2xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />
                Specialty Clinic
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Interventional Ultrasound <br /> <span className="text-[#3cb3a6]">&amp; Pain Management</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Premier precision-guided diagnostics and advanced pain relief — powered by GE Versana USG guidance and targeted nerve blocks.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/book-appointment"
                  className="bg-[#f98825] hover:bg-[#e0751e] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-xs sm:max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#00333c] border border-white/10">
                  <Image
                    src="/SpeakersIMG/Dr.balamurugan.jpeg"
                    alt="Dr. G. Balamurugan"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 text-left space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#3cb3a6] uppercase block">
                    Anaesthesia &amp; Pain Specialist
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dr. G. Balamurugan</h3>
                  <p className="text-xs text-gray-300 font-medium">
                    MBBS, MD ANAESTHESIA
                  </p>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#f98825] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-white/20">
                  Lead Specialist
                </div>
              </div>
            </div>

          </div>
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
