import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Best Rheumatologist & Arthritis Treatment in Salem | Valli Hospital",
  description: "Expert Rheumatology care in Salem at Valli Super Speciality Hospital. Advanced treatment for Rheumatoid Arthritis, Ankylosing Spondylitis, Gout, Lupus (SLE), and Osteoarthritis by senior rheumatology specialists.",
  keywords: [
    "best rheumatologist in salem",
    "rheumatologist in salem",
    "rheumatology salem",
    "rheumatoid arthritis treatment Salem",
    "rheumatology doctor near me",
    "arthritis clinic Salem",
    "joint pain specialist Salem",
    "gout treatment Salem",
    "best rheumatologist in tamil nadu",
    "Dr Natanasabapathy arthritis"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/rheumatology`,
  },
};

export default function RheumatologyPage() {
  const faqList = [
    {
      question: "When should I consult a Rheumatologist in Salem?",
      answer: "You should see a rheumatologist if you experience persistent joint stiffness in the morning lasting over 30 minutes, swelling in multiple joints, chronic autoimmune fatigue, unexplained muscle pain, or warm, reddened joints."
    },
    {
      question: "What conditions are treated at Valli Hospital's Rheumatology Center?",
      answer: "We diagnose and manage over 100 rheumatic diseases, including Rheumatoid Arthritis, Osteoarthritis, Ankylosing Spondylitis, Psoriatic Arthritis, Gout, Systemic Lupus Erythematosus (SLE), and Vasculitis."
    },
    {
      question: "What modern treatments are available for Rheumatoid Arthritis?",
      answer: "Our clinic provides disease-modifying antirheumatic drugs (DMARDs), targeted biologic therapies, Janus kinase (JAK) inhibitors, and joint intra-articular injections tailored to halt disease progression."
    },
    {
      question: "Can arthritis be managed without surgery?",
      answer: "Yes! The vast majority of inflammatory autoimmune arthritis cases are managed non-surgically using advanced pharmacological treatments, physical therapy, targeted exercises, and lifestyle modifications."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialities', url: 'https://www.vallihospital.in/specialities' },
        { name: 'Rheumatology', url: 'https://www.vallihospital.in/rheumatology' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Rheumatology & Autoimmune Joint Center"
        description="Comprehensive diagnostic and clinical care center for rheumatoid arthritis, joint inflammation, and systemic autoimmune disorders in Salem."
        url="https://www.vallihospital.in/rheumatology"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Rheumatology</li>
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
            Specialized Medical Care
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Center for Rheumatology & <br /> <span className="text-[#f98825]">Arthritis Treatment in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Advanced, compassionate management for autoimmune joint diseases, chronic pain, and inflammatory conditions under Salem&apos;s trusted medical experts.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Consult a Rheumatologist
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Call Reception: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Leading Rheumatology Clinic in Salem</h2>
              <p>
                Rheumatic and autoimmune diseases affect millions, causing persistent joint swelling, morning stiffness, and systemic tissue inflammation. At <strong>Valli Super Speciality Hospital</strong>, our specialized Rheumatology division focuses on early detection, precision immune-targeted therapies, and long-term disease remission to protect joint mobility and quality of life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🩸</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Rheumatoid Arthritis (RA)</h3>
                <p className="text-base text-gray-600">Specialized biologic therapies and DMARD regimens designed to arrest autoimmune joint erosion and eliminate chronic morning pain.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🦴</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Ankylosing Spondylitis</h3>
                <p className="text-base text-gray-600">Targeted spine inflammation therapies, posture preservation protocols, and anti-TNF biologics for severe lower back and hip stiffness.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Conditions Managed at Our Rheumatology Division</h2>
              <ul className="grid md:grid-cols-2 gap-4 mt-4 text-base">
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Osteoarthritis & Degenerative Joint Disease
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Gout & Uric Acid Crystal Arthritis
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Systemic Lupus Erythematosus (SLE)
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Psoriatic Arthritis & Soft Tissue Rheumatism
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Integrated Autoimmune Diagnostic Lab</h2>
              <p>
                Accurate diagnosis is the cornerstone of effective rheumatology treatment. Our on-site pathology laboratory provides rapid serological testing, including Rheumatoid Factor (RF), Anti-CCP antibodies, ANA immunofluorescence, ESR, C-Reactive Protein (CRP), and HLA-B27 genetic screening.
              </p>
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
          <h2 className="text-3xl font-bold mb-4">Schedule Your Rheumatology Consultation</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Get expert evaluation and long-term joint pain relief at Valli Super Speciality Hospital, Salem.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics & Departments</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/knee-replacement" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Knee Replacement Center</Link></li>
            <li><Link href="/back-pain-and-spinal-disorders" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Spine & Back Pain Center</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
