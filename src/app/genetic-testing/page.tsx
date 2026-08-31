import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Genetic Testing & Molecular Diagnostics in Salem | Valli Hospital",
  description: "Advanced Genetic Testing and Molecular Diagnostics at Valli Super Specialty Hospital, Salem. Comprehensive hereditary screening, HLA-B27 arthritis testing, carrier screening, cancer genetics, and precision diagnostics.",
  keywords: [
    "genetic testing Salem",
    "molecular diagnostics Salem",
    "HLA B27 test Salem",
    "hereditary disease testing Tamil Nadu",
    "cancer genetic testing Salem",
    "chromosomal analysis Salem",
    "precision medicine Salem",
    "diagnostic lab near me",
    "labs in Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/genetic-testing",
  },
  openGraph: {
    title: "Genetic Testing & Molecular Diagnostics Lab Salem | Valli Hospital",
    description: "State-of-the-art DNA analysis, hereditary risk profiling, and precision diagnostics in Salem.",
    url: "https://www.vallihospital.in/genetic-testing",
    type: "website",
  }
};

export default function GeneticTestingPage() {
  const faqList = [
    {
      question: "What types of genetic and molecular tests are offered at Valli Hospital?",
      answer: "We perform molecular diagnostics including HLA-B27 typing for Ankylosing Spondylitis and inflammatory arthritis, hereditary cancer gene panels (BRCA1/2), prenatal carrier screening, and chromosomal karyotyping."
    },
    {
      question: "What is HLA-B27 testing and why is it important for joint pain?",
      answer: "HLA-B27 is a genetic marker strongly associated with spondyloarthritis, ankylosing spondylitis, and reactive arthritis. Testing helps rheumatologists confirm autoimmune causes of chronic back and joint pain early to start targeted biologic therapies."
    },
    {
      question: "How long does it take to receive genetic test results?",
      answer: "Standard molecular assays (such as PCR HLA-B27) are typically available within 24 to 48 hours, while comprehensive multi-gene sequencing panels take approximately 10 to 14 working days."
    },
    {
      question: "Who oversees the laboratory diagnostics at Valli Hospital?",
      answer: "Our diagnostic pathology and biochemistry suites are supervised by Dr. Kiruba (Consultant in Clinical Biochemistry) and senior molecular laboratory specialists."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Genetic Testing', url: 'https://www.vallihospital.in/genetic-testing' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Molecular Diagnostics & Genetic Testing Center"
        description="Comprehensive molecular assays, HLA-B27 testing, and personalized diagnostic genetics in Salem."
        url="https://www.vallihospital.in/genetic-testing"
      />
      <MedicalProcedureSchema
        name="Molecular Genetic Assays & Chromosomal Analysis"
        description="High-precision DNA extraction, real-time PCR, and targeted gene sequencing."
        bodyLocation="Blood & Tissue Samples"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Genetic Testing</li>
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
            Precision Medicine & Molecular Diagnostics
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Genetic Testing & <br /> <span className="text-[#f98825]">Molecular Diagnostics in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Actionable genomic insights guiding precision medical care. From autoimmune HLA-B27 typing to hereditary screening and targeted therapy profiling.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Diagnostic Consultation
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Lab Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Precision Diagnostics for Targeted Healing</h2>
              <p>
                Modern healthcare is shifting from reactive treatment to precision medicine. At <strong>Valli Super Specialty Hospital</strong>, our molecular diagnostics lab provides advanced chromosomal analysis and disease-specific genetic assays that enable clinicians to diagnose autoimmune arthritis, hereditary bone conditions, and metabolic disorders with unprecedented accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🧬</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Autoimmune Molecular Panels</h3>
                <p className="text-base text-gray-600">High-sensitivity PCR testing for HLA-B27 and inflammatory genetic markers to detect spondyloarthropathies before irreversible joint damage occurs.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🧪</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Diagnostic Biochemistry</h3>
                <p className="text-base text-gray-600">Comprehensive metabolic profiles, inflammatory markers (hs-CRP, ESR), and metabolic bone disease biomarkers.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Diagnostic Laboratory Leadership</h3>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-lg">
                <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Consultant in Biochemistry</div>
                <div className="text-xl font-bold text-white">Dr. Kiruba</div>
                <p className="text-sm text-gray-300 mt-2">MBBS, specialist in clinical biochemistry, diagnostic quality assurance, and metabolic biomarker analysis.</p>
                <Link href="/doctors/dr-kiruba" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                  View Doctor Profile &rarr;
                </Link>
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
          <h2 className="text-3xl font-bold mb-4">Book Your Diagnostic Test in Salem</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Fast, accurate molecular and biochemical testing at Valli Super Specialty Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Schedule Test / Consultation
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/rheumatology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Rheumatology Center</Link></li>
            <li><Link href="/hematology-blood-disorders" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Hematology Center</Link></li>
            <li><Link href="/facilities" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Hospital Diagnostic Facilities</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
