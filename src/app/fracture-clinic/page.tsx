import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "24/7 Fracture & Trauma Hospital in Salem | Emergency Bone Care | Valli Hospital",
  description: "24/7 emergency bone fracture treatment & trauma care in Salem at Valli Super Specialty Hospital. Open Reduction Internal Fixation (ORIF), complex pelvic fractures, pediatric casts, and polytrauma surgery.",
  keywords: [
    "fracture treatment Salem",
    "bone fracture surgery Salem",
    "best hospital for bone fracture",
    "emergency fracture care Salem",
    "complex fracture surgery Tamil Nadu",
    "ORIF surgery Salem",
    "24 hour fracture care Salem",
    "bone hospital near me open now",
    "bone specialist hospital near me",
    "elumbu doctor near me"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/fracture-clinic",
  },
  openGraph: {
    title: "24/7 Fracture & Emergency Trauma Clinic Salem | Valli Hospital",
    description: "Rapid trauma management, zero delay fracture stabilization, and anatomical reconstruction by senior orthopedic trauma surgeons.",
    url: "https://www.vallihospital.in/fracture-clinic",
    type: "website",
  }
};

export default function FractureClinicPage() {
  const faqList = [
    {
      question: "Is emergency fracture care available 24/7 at Valli Hospital Salem?",
      answer: "Yes. Our trauma casualty, digital X-ray, emergency operating theatres, and orthopedic surgical team operate 24 hours a day, 7 days a week for immediate fracture stabilization and acute injury management."
    },
    {
      question: "What is ORIF (Open Reduction Internal Fixation) surgery?",
      answer: "ORIF is an advanced surgical technique where broken bone fragments are precisely realigned anatomically and stabilized using biocompatible titanium plates, screws, or intramedullary rods to ensure optimal bone healing and early limb mobility."
    },
    {
      question: "How long does a bone fracture take to heal?",
      answer: "Most simple fractures heal within 6 to 8 weeks with appropriate casting or internal fixation. Complex intra-articular or open polytrauma fractures may take 12 to 16 weeks, supported by guided physiotherapy in our Iyakkam rehabilitation center."
    },
    {
      question: "Do you treat pediatric fractures and greenstick injuries?",
      answer: "Yes. We provide specialized pediatric fracture management ensuring growth plates (epiphyses) are safeguarded to prevent long-term limb length discrepancy or angular deformity."
    },
    {
      question: "Who are the lead orthopedic trauma surgeons?",
      answer: "Trauma surgery is led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon), Dr. E. Aakash (Fellowship in Orthopedic Trauma - FIOT), and Dr. K. N. Jotheesvar (Fellowship in Periarticular Trauma)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Fracture & Trauma Clinic', url: 'https://www.vallihospital.in/fracture-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Fracture & Orthopedic Trauma Clinic"
        description="24/7 comprehensive emergency trauma, complex fracture fixation, and bone reconstruction center in Salem."
        url="https://www.vallihospital.in/fracture-clinic"
      />
      <MedicalProcedureSchema
        name="Open Reduction Internal Fixation (ORIF)"
        description="Precision anatomical realignment and titanium fixation for simple, compound, and complex periarticular bone fractures."
        bodyLocation="Skeletal System / Limbs / Pelvis"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Fracture & Trauma Clinic</li>
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
            24/7 Emergency Orthopedic Casualty
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            24/7 Fracture & Trauma <br /> <span className="text-[#f98825]">Surgery Center in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Immediate, high-precision surgical and non-surgical fracture stabilization. From simple fractures and casts to complex polytrauma and pelvic reconstructions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              🚨 24/7 Emergency Hotline: +91 90034 17111
            </a>
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Book OPD Fracture Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Advanced Trauma Management at Valli Hospital</h2>
              <p>
                Every minute counts during an acute orthopedic trauma or bone injury. At <strong>Valli Super Specialty Hospital</strong>, our emergency trauma protocols ensure rapid triage, high-definition digital radiology, painless ultrasound-guided nerve blocks, and immediate operative care by qualified fellowship-trained orthopedic trauma surgeons.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Rapid Surgical Fixation (ORIF)</h3>
                <p className="text-base text-gray-600">Titanium locking plates, intramedullary interlocking nails, and percutaneous screw fixation under sterile laminar airflow operating suites.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🩺</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Non-Operative Plaster & Splints</h3>
                <p className="text-base text-gray-600">Fiberglass waterproof casts, functional braces, and dynamic splinting for stable fractures and pediatric bone injuries.</p>
              </div>
            </div>

            {/* Trauma Specialists */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Trauma & Fracture Surgeons</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience, expert in complex polytrauma, malunion, and non-union reconstructions.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Trauma Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Orthopedic Trauma (FIOT), specialized in rapid fracture realignment and sports trauma.</p>
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
          <h2 className="text-3xl font-bold mb-4">Emergency Fracture or Bone Injury?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Our 24/7 trauma team is on standby to provide immediate stabilization and surgical care.</p>
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
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
            <li><Link href="/foot-and-ankle-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Foot & Ankle Center</Link></li>
            <li><Link href="/paediatric-orthopaedics-deformity-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Pediatric Orthopedics</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
