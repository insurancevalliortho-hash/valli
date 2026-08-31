import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Joint Replacement & Preservation Hospital in Salem | Hip & Knee Care | Valli Hospital",
  description: "Premier center for Joint Replacement and Preservation in Salem at Valli Super Specialty Hospital. Total Knee, Hip, and Shoulder Arthroplasty led by Dr. T. Natanasabapathy with 10,000+ surgeries. Rapid recovery protocols.",
  keywords: [
    "joint replacement Salem",
    "knee replacement Salem",
    "hip replacement surgery Salem",
    "best hospital for joint replacement",
    "total hip replacement Salem",
    "best doctor for knee replacement",
    "arthroplasty surgeon Salem",
    "shoulder replacement hospital Salem",
    "joint preservation treatment",
    "salem bone specialist hospital"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/joint-care-clinic",
  },
  openGraph: {
    title: "Joint Care & Arthroplasty Center Salem | Valli Hospital",
    description: "Restore painless movement with precision joint replacements and cartilage preservation therapies in Salem.",
    url: "https://www.vallihospital.in/joint-care-clinic",
    type: "website",
  }
};

export default function JointCareClinicPage() {
  const faqList = [
    {
      question: "What joint replacement surgeries are performed at Valli Hospital Salem?",
      answer: "We perform primary and revision Total Knee Replacement (TKR), Total Hip Replacement (THR), Partial Unicompartmental Knee Resurfacing, Reverse Shoulder Arthroplasty, and Elbow Joint Reconstruction using premium biocompatible implants."
    },
    {
      question: "What is Joint Preservation therapy?",
      answer: "Joint Preservation refers to non-surgical and minimally invasive interventions aimed at protecting natural articular cartilage before advanced arthritis develops. This includes PRP growth factor therapy, viscosupplementation injections, high tibial osteotomy, and arthroscopic debridement."
    },
    {
      question: "How long do modern joint implants last?",
      answer: "With advanced precision surgical alignment and high-wear-resistant cross-linked polyethylene and ceramic components, modern joint implants typically last 20 to 25+ years."
    },
    {
      question: "What is the post-operative rehabilitation process?",
      answer: "Under our rapid-recovery protocol, patients begin assisted walking within 24 hours of surgery. Our on-site Iyakkam physiotherapy center provides personalized range-of-motion and muscle strengthening regimens to achieve full daily function in 4 to 6 weeks."
    },
    {
      question: "Who is the lead joint replacement surgeon?",
      answer: "Dr. T. Natanasabapathy, Chief Orthopedic Surgeon and FIJR Fellow (Germany), personally oversees complex primary and revision joint arthroplasty procedures."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Joint Care Clinic', url: 'https://www.vallihospital.in/joint-care-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Joint Care & Replacement Clinic"
        description="Center of excellence for primary, complex, and revision hip, knee, and shoulder arthroplasty in Salem."
        url="https://www.vallihospital.in/joint-care-clinic"
      />
      <MedicalProcedureSchema
        name="Total Joint Arthroplasty & Cartilage Preservation"
        description="Precision surgical resurfacing and restorative therapy for severe osteoarthritis, rheumatoid joint damage, and avascular necrosis."
        bodyLocation="Hip, Knee, and Shoulder Joints"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Joint Care Clinic</li>
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
            Joint Preservation & Replacement
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Advanced Joint Replacement & <br /> <span className="text-[#f98825]">Preservation in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Reclaim your active lifestyle with Salem&apos;s most experienced joint replacement team. Expert hip, knee, and shoulder arthroplasty with rapid-recovery rehabilitation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Joint Consultation
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Direct Line: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Complete Joint Health & Reconstruction</h2>
              <p>
                Chronic joint pain from osteoarthritis, avascular necrosis (AVN), rheumatoid arthritis, or past trauma can severely limit basic mobility. At <strong>Valli Super Specialty Hospital</strong>, our joint team led by <strong>Dr. T. Natanasabapathy</strong> provides comprehensive evaluations, individualized joint preservation plans, and precision computer-aligned joint replacement surgeries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🦿</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Total Hip Replacement (THR)</h3>
                <p className="text-base text-gray-600">Minimally invasive approaches for avascular necrosis, severe osteoarthritis, and hip dysplasia utilizing ceramic-on-poly implants for lifetime stability.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🦵</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Total Knee Replacement (TKR)</h3>
                <p className="text-base text-gray-600">High-flexion knee designs aligned to your unique anatomical axis for effortless stair climbing, bending, and walking without pain.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Joint Arthroplasty Surgeons</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience, FIJR (Germany), recognized pioneer of minimally invasive joint arthroplasty in Salem.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Joint Replacement Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Joint Replacement (FIJR) & FIFA Diploma in Sports Medicine.</p>
                  <Link href="/doctors/dr-aakash" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Walk Pain-Free Again</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Consult Salem&apos;s leading joint replacement specialists to discover the best treatment for your knee or hip.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Appointment Now
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/knee-replacement" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Knee Replacement Center</Link></li>
            <li><Link href="/rheumatology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Rheumatology Center</Link></li>
            <li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Keyhole Arthroscopy</Link></li>
            <li><Link href="/iyakkam" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam Post-Op Rehab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
