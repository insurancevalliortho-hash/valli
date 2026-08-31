import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Failed Surgery Correction & Revision Arthroplasty in Salem | Valli Hospital",
  description: "Specialized Revision Surgery & Failed Orthopedic Correction Center in Salem at Valli Super Specialty Hospital. Expert solutions for failed knee/hip replacements, implant loosening, non-union fractures, and failed spine surgery syndrome.",
  keywords: [
    "failed surgery correction Salem",
    "revision arthroplasty Salem",
    "failed knee replacement revision Salem",
    "failed hip replacement Salem",
    "implant failure correction Salem",
    "revision surgery ortho Salem",
    "ortho second opinion Salem",
    "failed back surgery syndrome Salem",
    "non union fracture surgery Salem",
    "post surgical complication Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/failed-surgery-corrections",
  },
  openGraph: {
    title: "Failed Orthopedic Surgery & Revision Arthroplasty Center Salem | Valli Hospital",
    description: "Expert second opinions and complex revision surgeries for failed implants, unhealed fractures, and persistent surgical pain in Salem.",
    url: "https://www.vallihospital.in/failed-surgery-corrections",
    type: "website",
  }
};

export default function FailedSurgeryCorrectionsPage() {
  const faqList = [
    {
      question: "What causes a knee or hip replacement to fail?",
      answer: "Joint replacement failure can result from aseptic loosening (wear of the bone-implant interface), component misalignment, joint instability, peri-prosthetic infection, or fracture around the implant."
    },
    {
      question: "What is Revision Arthroplasty?",
      answer: "Revision arthroplasty is a complex specialized procedure where compromised or loosened prosthetic components are carefully removed, bone loss is reconstructed using specialized augments or bone grafts, and revision implants are rigidly fixed to restore joint stability and pain-free function."
    },
    {
      question: "What is Failed Back Surgery Syndrome (FBSS)?",
      answer: "FBSS describes persistent or recurrent back and leg pain after spinal surgery, often due to recurrent disc herniation, adjacent segment degeneration, epidural fibrosis, or incomplete neural decompression. We provide ultrasound-guided targeted blocks and revision micro-decompression."
    },
    {
      question: "How do you treat unhealed fractures (non-union or malunion)?",
      answer: "We treat non-unions and malunions by removing old failing hardware, correcting angular bone deformities, applying biological bone grafting, and securing rigid stabilization with advanced locking plates or intramedullary rods."
    },
    {
      question: "Who performs complex revision surgeries at Valli Hospital?",
      answer: "Revision procedures are led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon with 15+ years experience and FIJR fellowship in Germany) and our senior surgical trauma team."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Revision & Failed Surgery Correction', url: 'https://www.vallihospital.in/failed-surgery-corrections' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Failed Orthopedic Surgery & Revision Clinic"
        description="Center of excellence for complex revision joint replacement, deformity correction, and second opinion consultations in Salem."
        url="https://www.vallihospital.in/failed-surgery-corrections"
      />
      <MedicalProcedureSchema
        name="Revision Total Joint Arthroplasty & Non-Union Fixation"
        description="Complex reconstruction of loosened prostheses, peri-prosthetic fractures, and malaligned bones."
        bodyLocation="Joints & Skeletal System"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Revision Surgery Center</li>
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
            Center for Revision Arthroplasty & Second Opinions
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Failed Surgery Correction & <br /> <span className="text-[#f98825]">Revision Care in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Specialized solutions for painful joint replacements, unhealed fractures, and failed spine procedures. Get the trusted second opinion and precision correction you deserve.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Get Expert Second Opinion
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Revision Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Second Opinions & Complex Revision Orthopedics</h2>
              <p>
                When a previous orthopedic or joint replacement surgery fails to deliver expected relief, patients face physical and emotional distress. At <strong>Valli Super Specialty Hospital</strong>, our surgical team specializes in forensic diagnostic assessment of past procedures, identifying the root biomechanical or biological failure, and executing definitive revision reconstructions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🔄</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Revision Joint Replacements</h3>
                <p className="text-base text-gray-600">Specialized modular revision knee and hip prostheses, trabecular metal cones, and biological bone grafting to overcome severe bone loss and restore joint stability.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Malunion & Non-Union Re-Fixation</h3>
                <p className="text-base text-gray-600">Correction of crooked bone healing, removal of broken implants, and rigid biomechanical stabilization with biological osteoinductive enhancements.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Revision Specialists</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience, FIJR (Germany), recognized for handling high-complexity revision cases across Tamil Nadu.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Trauma & Arthroplasty Specialist</div>
                  <div className="text-xl font-bold text-white">Dr. K. N. Jotheesvar</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Joint Replacement and complex trauma realignment.</p>
                  <Link href="/doctors/dr-jothiswar" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Need a Trusted Second Opinion in Salem?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Bring your prior scans and surgical reports for a comprehensive clinical review at Valli Super Specialty Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Second Opinion Consultation
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/knee-replacement" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Knee Replacement Center</Link></li>
            <li><Link href="/back-pain-and-spinal-disorders" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Spine & Back Care</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
