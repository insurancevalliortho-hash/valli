import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Sports Medicine Clinic Salem | Athlete Rehab & Biomechanics | Valli Hospital",
  description: "Specialized Sports Medicine Clinic in Salem at Valli Super Specialty Hospital. Advanced sports injury prevention, PRP regenerative therapy, return-to-sport protocols, and athletic conditioning led by FIFA-diploma sports doctors.",
  keywords: [
    "sports medicine Salem",
    "sports medicine clinic Salem",
    "sports doctor near me",
    "sports injury doctor near me",
    "PRP therapy Salem",
    "sports physiotherapy near me",
    "athlete injury treatment Salem",
    "sports rehabilitation Salem",
    "sports doctor in Salem",
    "return to play protocol"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/sports-medicine-clinic",
  },
  openGraph: {
    title: "Sports Medicine & Athletic Performance Clinic Salem | Valli Hospital",
    description: "Holistic athlete injury management, regenerative orthobiologics, and high-performance rehabilitation in Salem.",
    url: "https://www.vallihospital.in/sports-medicine-clinic",
    type: "website",
  }
};

export default function SportsMedicineClinicPage() {
  const faqList = [
    {
      question: "What is the difference between sports medicine and general orthopedics?",
      answer: "Sports medicine focuses specifically on the acute diagnosis, non-surgical orthobiologics, biomechanical optimization, and rapid functional return-to-play for athletes and active individuals, emphasizing tissue preservation and performance recovery."
    },
    {
      question: "What orthobiologic treatments are available for athletic injuries?",
      answer: "We offer ultrasound-guided Autologous Platelet-Rich Plasma (PRP) injections, Growth Factor Concentrate (GFC), and viscosupplementation to accelerate healing of partial muscle tears, patellar tendinopathy, and joint cartilage wear."
    },
    {
      question: "What is the return-to-sport testing protocol at Valli Hospital?",
      answer: "We utilize our dedicated Iyakkam AI sports laboratory to conduct objective force plate symmetry testing, motion-capture 3D biomechanics analysis, and neuromuscular endurance assessments before clearing an athlete to compete."
    },
    {
      question: "Who are the sports physicians at Valli Hospital?",
      answer: "The clinic is directed by Dr. E. Aakash (FIFA Diploma in Football Medicine & FIJR) and Dr. T. Natanasabapathy (Fellowship in Arthroscopy & Sports Medicine, South Korea)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Sports Medicine Clinic', url: 'https://www.vallihospital.in/sports-medicine-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Sports Medicine & Athletic Performance Clinic"
        description="Center for athletic injury rehabilitation, non-surgical sports orthobiologics, and return-to-play conditioning in Salem."
        url="https://www.vallihospital.in/sports-medicine-clinic"
      />
      <MedicalProcedureSchema
        name="Orthobiologic PRP Infiltration & Biomechanical Conditioning"
        description="Ultrasound-guided biological growth factor injections and objective kinetic movement training."
        bodyLocation="Musculoskeletal System & Ligaments"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Sports Medicine Clinic</li>
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
            Center for Athletic Medicine & Recovery
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Sports Medicine & <br /> <span className="text-[#f98825]">Athletic Care in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Specialized sports medicine care for competitive athletes and fitness enthusiasts. Rapid injury recovery, PRP orthobiologics, and data-backed return-to-sport testing.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Sports Consultation
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
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Comprehensive Athlete Care & Injury Prevention</h2>
              <p>
                From sudden hamstring tears to chronic jumper&apos;s knee and shoulder impingement, sports injuries demand a specialized clinical protocol. At <strong>Valli Super Specialty Hospital</strong>, our sports medicine team bridges clinical orthopedics with exercise science to get athletes back to peak competitive performance without reinjury.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🏃</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Regenerative Orthobiologics</h3>
                <p className="text-base text-gray-600">Autologous PRP and growth factors to accelerate natural healing of tennis elbow, plantar fasciitis, and partial ligament tears without surgery.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Iyakkam AI Biomechanics</h3>
                <p className="text-base text-gray-600">Objective 3D movement analysis, limb symmetry indexes, and force measurement to ensure safe, confident return to play.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Sports Medicine Physicians</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Sports Medicine Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">FIFA Diploma in Football Medicine (FDFM), FIJR, specialized in athletic trauma and joint preservation.</p>
                  <Link href="/doctors/dr-aakash" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Arthroscopy & Sports Medicine (South Korea), 10,000+ surgeries.</p>
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
          <h2 className="text-3xl font-bold mb-4">Optimize Your Athletic Performance</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Schedule an assessment with our sports medicine specialists at Valli Super Specialty Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Sports Medicine Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
            <li><Link href="/sports-training" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Performance Training</Link></li>
            <li><Link href="/iyakkam/ai-sports-rehab" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam AI Sports Rehab</Link></li>
            <li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Keyhole Arthroscopy</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
