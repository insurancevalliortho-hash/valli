import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Sports Training & Athletic Conditioning in Salem | Valli Hospital",
  description: "Science-backed Sports Performance Training & Athletic Conditioning at Valli Super Specialty Hospital, Salem. Expert sports physiotherapy, return-to-play protocols, and injury prevention in collaboration with Iyakkam AI Sports Rehab.",
  keywords: [
    "sports training Salem",
    "athletic rehabilitation Salem",
    "sports physiotherapy near me",
    "return to sport Salem",
    "sports conditioning Salem",
    "physiotherapy rehabilitation Salem",
    "sports performance Salem",
    "post surgery sports rehab Salem",
    "sports physiotherapist near me",
    "athlete training hospital Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/sports-training",
  },
  openGraph: {
    title: "Sports Performance Training & Athletic Conditioning Salem | Valli Hospital",
    description: "Biomechanically guided athlete conditioning and post-surgical sports rehabilitation in Salem.",
    url: "https://www.vallihospital.in/sports-training",
    type: "website",
  }
};

export default function SportsTrainingPage() {
  const faqList = [
    {
      question: "What does sports performance conditioning involve at Valli Hospital?",
      answer: "Our conditioning programs integrate functional strength training, neuromuscular agility drills, sport-specific movement mechanics, and injury-prevention prehabilitation tailored to track, field, cricket, football, and racquet sports athletes."
    },
    {
      question: "How does post-injury sports training differ from standard physiotherapy?",
      answer: "While standard physiotherapy restores basic range of motion and daily activities, our sports training program focuses on high-velocity deceleration, cutting, plyometric power output, and sport-specific endurance under dynamic fatigue conditions."
    },
    {
      question: "How is readiness to return to competition measured?",
      answer: "We use objective data from our Iyakkam AI sports lab including force-plate limb symmetry index (>90% requirement), 3D motion-capture joint tracking, and psychological readiness assessments before full match clearance."
    },
    {
      question: "Who designs the sports training programs?",
      answer: "Programs are designed by Dr. E. Aakash (FIFA Diploma in Football Medicine) alongside our sports physiotherapists and strength & conditioning coaches."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Sports Training', url: 'https://www.vallihospital.in/sports-training' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Sports Performance Training & Athletic Conditioning Center"
        description="Data-driven athletic performance conditioning, injury prevention prehabilitation, and return-to-sport protocols in Salem."
        url="https://www.vallihospital.in/sports-training"
      />
      <MedicalProcedureSchema
        name="Biomechanical Athletic Conditioning & Neuromuscular Training"
        description="Sport-specific agility drills, plyometric reconditioning, and force-plate symmetry assessments."
        bodyLocation="Musculoskeletal & Neuromuscular System"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Sports Training</li>
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
            Athletic Conditioning & Performance
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Sports Training & <br /> <span className="text-[#f98825]">Athletic Rehab in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Science-backed conditioning, functional sports physiotherapy, and objective return-to-competition protocols for amateur and professional athletes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Athletic Assessment
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Sports Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Elite Athletic Performance & Reconditioning</h2>
              <p>
                Whether you are recovering from an ACL reconstruction, shoulder dislocation, or seeking to elevate your speed and jump mechanics, structured conditioning is paramount. At <strong>Valli Super Specialty Hospital</strong>, our sports training program bridges orthopedic rehabilitation with high-performance physical conditioning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Prehabilitation & Injury Prevention</h3>
                <p className="text-base text-gray-600">Identifying muscle imbalances, joint laxity, and kinetic chain deficiencies to prevent non-contact ACL tears and ankle sprains.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Phase-Based Return to Sport</h3>
                <p className="text-base text-gray-600">Progressive loading from straight-line jogging to high-intensity multi-directional agility drills with real-time biometric tracking.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Sports Science & Medical Leadership</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Sports Medicine Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">FIFA Diploma in Football Medicine (FDFM), FIJR. Expert in athletic reconditioning and biomechanical testing.</p>
                  <Link href="/doctors/dr-aakash" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Arthroscopy & Sports Medicine (South Korea), 10,000+ musculoskeletal surgeries.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Elevate Your Athletic Potential</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Schedule a comprehensive movement screening and sports conditioning session today.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Sports Assessment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
            <li><Link href="/iyakkam/ai-sports-rehab" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam AI Sports Rehab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
