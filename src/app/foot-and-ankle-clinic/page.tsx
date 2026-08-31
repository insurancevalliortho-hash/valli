import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Foot & Ankle Surgery Hospital in Salem | Heel Pain, Ankle Fracture | Valli Hospital",
  description: "Specialized Foot & Ankle Clinic in Salem at Valli Super Specialty Hospital. Expert treatment for Achilles tendon rupture, plantar fasciitis, ankle sprains, bunions (hallux valgus), flatfoot correction, and complex ankle fractures.",
  keywords: [
    "foot and ankle clinic Salem",
    "plantar fasciitis treatment Salem",
    "Achilles tendon repair Salem",
    "flatfoot treatment Salem",
    "ankle fracture surgery Salem",
    "foot doctor Salem",
    "heel pain hospital near me",
    "ankle doctor near me",
    "podiatrist in Salem",
    "orthopedic ankle support"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/foot-and-ankle-clinic",
  },
  openGraph: {
    title: "Foot & Ankle Surgery & Podiatric Care Salem | Valli Hospital",
    description: "Advanced surgical reconstruction and non-surgical therapy for complex foot and ankle conditions in Salem.",
    url: "https://www.vallihospital.in/foot-and-ankle-clinic",
    type: "website",
  }
};

export default function FootAndAnkleClinicPage() {
  const faqList = [
    {
      question: "What are the common causes of severe heel and foot pain?",
      answer: "The most frequent cause is Plantar Fasciitis (inflammation of the thick tissue band under the foot), followed by Achilles Tendinitis, calcaneal heel spurs, stress fractures, and flatfoot biomechanical strain."
    },
    {
      question: "What non-surgical treatments are offered for plantar fasciitis in Salem?",
      answer: "We offer ultrasound-guided PRP injections, customized orthotic arch supports, extracorporeal shockwave therapy, and structured calf/fascia stretching protocols with over 90% success without surgery."
    },
    {
      question: "How are acute Achilles tendon ruptures treated?",
      answer: "Acute Achilles ruptures are evaluated immediately with high-resolution ultrasound. We perform minimally invasive percutaneous Achilles tendon repairs to restore full push-off strength with lower re-rupture rates."
    },
    {
      question: "Do you treat severe ankle fractures and syndesmosis ligament injuries?",
      answer: "Yes. Our trauma team performs anatomical open reduction and rigid internal fixation (ORIF) for bimalleolar, trimalleolar, and pilon fractures to restore normal joint congruency and prevent post-traumatic arthritis."
    },
    {
      question: "Who leads the Foot and Ankle specialty at Valli Hospital?",
      answer: "Our foot and ankle service is directed by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon) and Dr. E. Aakash, supported by dedicated gait analysis specialists at Iyakkam."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Foot & Ankle Clinic', url: 'https://www.vallihospital.in/foot-and-ankle-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Foot and Ankle Surgery Center"
        description="Comprehensive diagnostic and surgical clinic for ankle fractures, tendon tears, and foot deformities in Salem."
        url="https://www.vallihospital.in/foot-and-ankle-clinic"
      />
      <MedicalProcedureSchema
        name="Ankle Arthroscopy & Tendon Reconstruction"
        description="Minimally invasive ankle joint debridement, ligament stabilization, and Achilles tendon repair."
        bodyLocation="Foot and Ankle"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Foot & Ankle Clinic</li>
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
            Specialized Foot & Ankle Center
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Foot & Ankle Surgery <br /> <span className="text-[#f98825]">in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Specialized solutions for heel pain, Achilles injuries, flatfoot correction, and ankle fractures. Restore your stable stride with Salem&apos;s leading orthopedists.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Foot & Ankle Consultation
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
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Precision Foot & Ankle Care in Salem</h2>
              <p>
                The human foot and ankle contain 26 bones, 33 joints, and over 100 muscles and ligaments. At <strong>Valli Super Specialty Hospital</strong>, our specialists evaluate complex gait kinetics, biomechanical stress patterns, and trauma injuries to provide tailored therapies that restore natural mobility and eliminate chronic foot pain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🦶</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Tendon & Ligament Repair</h3>
                <p className="text-base text-gray-600">Minimally invasive repair for acute Achilles tendon ruptures, chronic peroneal subluxation, and lateral ankle ligament instability (ATFL/CFL).</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">👟</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Deformity Correction & Podiatry</h3>
                <p className="text-base text-gray-600">Surgical realignment for bunions (hallux valgus), hammer toes, adult flatfoot collapse, and diabetic foot ulcer prevention.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Specialists</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience, expert in complex lower limb reconstruction and trauma surgery.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Orthopedic Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">FIFA Diploma in Sports Medicine, expert in athlete ankle rehabilitation.</p>
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
          <h2 className="text-3xl font-bold mb-4">Relieve Foot and Ankle Pain Today</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Schedule an evaluation with our foot and ankle specialists at Valli Super Specialty Hospital.</p>
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
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture & Trauma Clinic</Link></li>
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
            <li><Link href="/iyakkam" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam Gait Analysis Lab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
