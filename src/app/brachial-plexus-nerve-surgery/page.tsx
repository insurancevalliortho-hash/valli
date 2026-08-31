import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Brachial Plexus & Peripheral Nerve Surgery Salem | Micro Nerve Repair | Valli Hospital",
  description: "Elite Brachial Plexus & Peripheral Nerve Surgery at Valli Super Specialty Hospital, Salem. Nerve grafting, neurotization, Carpal Tunnel release, Erb's Palsy, TOS, and microsurgical reconstruction by expert hand & micro surgeons.",
  keywords: [
    "brachial plexus surgery Salem",
    "nerve surgery Salem",
    "peripheral nerve injury Salem",
    "Erb's palsy surgery Salem",
    "carpal tunnel release Salem",
    "ulnar nerve decompression Salem",
    "nerve grafting Salem",
    "microsurgery hospital Tamil Nadu",
    "hand and micro surgeon Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/brachial-plexus-nerve-surgery",
  },
  openGraph: {
    title: "Brachial Plexus & Microvascular Nerve Surgery Salem | Valli Hospital",
    description: "High-precision microscopic nerve repair and muscle neurotization to restore limb movement after traumatic nerve injuries.",
    url: "https://www.vallihospital.in/brachial-plexus-nerve-surgery",
    type: "website",
  }
};

export default function BrachialPlexusPage() {
  const faqList = [
    {
      question: "What is a Brachial Plexus injury and what causes it?",
      answer: "The brachial plexus is the complex network of nerves originating from the cervical spine that controls movement and sensation in the shoulder, arm, and hand. Injuries commonly occur during high-velocity motorcycle accidents, sports collisions, or birth trauma (Erb's palsy)."
    },
    {
      question: "What microsurgical procedures are used to repair severed nerves?",
      answer: "Under operating microscopes, our surgeons perform precision End-to-End Neurorrhaphy (suturing nerve fascicles with micro-sutures), Sural Nerve Autografting to bridge nerve gaps, and Nerve Transfer (Neurotization) where working donor nerves are redirected to re-innervate paralyzed muscles."
    },
    {
      question: "What is the optimal timing for nerve surgery after trauma?",
      answer: "Timing is critical. Traumatic brachial plexus and nerve injuries should ideally be evaluated and surgically reconstructed within 3 to 6 months to prevent irreversible motor endplate muscle atrophy."
    },
    {
      question: "How is Carpal Tunnel Syndrome treated at Valli Hospital?",
      answer: "Mild to moderate median nerve compression is treated with ultrasound-guided hydrodissection and wrist splinting. Severe chronic compression is relieved via minimally invasive keyhole Carpal Tunnel Release (CTR), ending hand numbness and night pain."
    },
    {
      question: "Who are the nerve and microvascular surgeons at Valli Hospital?",
      answer: "Our hand and microsurgery division features Dr. Obuli Vijay Shankar (MS, FNB in Hand & Microvascular Surgery from Ganga Hospital) and Dr. Tamilkumaran (DNB Ortho, Hand Surgery Specialist)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Brachial Plexus & Nerve Surgery', url: 'https://www.vallihospital.in/brachial-plexus-nerve-surgery' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Brachial Plexus & Peripheral Nerve Surgery Center"
        description="Comprehensive microsurgical nerve repair, neurotization, and hand reconstruction in Salem."
        url="https://www.vallihospital.in/brachial-plexus-nerve-surgery"
      />
      <MedicalProcedureSchema
        name="Microsurgical Nerve Repair & Neurotization"
        description="High-magnification microscopic nerve autografting, neurotization, and decompression for upper limb paralysis."
        bodyLocation="Brachial Plexus & Upper Extremity Nerves"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Nerve & Microsurgery</li>
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
            Microsurgical Nerve Reconstruction
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Brachial Plexus & <br /> <span className="text-[#f98825]">Nerve Surgery in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Restoring limb sensation, movement, and motor function with high-precision microsurgery, nerve transfers, and neurotization.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Nerve Consultation
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
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Pioneering Microsurgical Nerve Care in Salem</h2>
              <p>
                Severe nerve trauma from vehicular accidents or birth injuries can lead to debilitating paralysis of the shoulder, elbow, and hand. At <strong>Valli Super Specialty Hospital</strong>, our dedicated microsurgeons utilize advanced Zeiss operating microscopes and delicate micro-vascular instruments to reconstruct damaged neural pathways and restore active muscle function.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Nerve Transfers (Neurotization)</h3>
                <p className="text-base text-gray-600">Re-routing redundant nerve branches (such as spinal accessory or intercostal nerves) directly to target muscles to revive shoulder abduction and elbow flexion.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">✋</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Carpal & Cubital Tunnel Release</h3>
                <p className="text-base text-gray-600">Precision decompression of compressed median and ulnar nerves to permanently eliminate numbness, tingling, and grip weakness.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Hand & Microsurgeons</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Hand & Microvascular Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. Obuli Vijay Shankar</div>
                  <p className="text-sm text-gray-300 mt-2">MBBS, MS, FNB in Hand & Microvascular Surgery (Ganga Hospital), specialized in complex nerve reconstructions.</p>
                  <Link href="/doctors/dr-obuli-vijay-shankar" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Hand & Ortho Specialist</div>
                  <div className="text-xl font-bold text-white">Dr. Tamilkumaran</div>
                  <p className="text-sm text-gray-300 mt-2">MBBS, DNB Orthopedics, dedicated to upper extremity reconstructive surgery and tendon transfers.</p>
                  <Link href="/doctors/dr-tamilkumaran" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Restore Hand and Arm Movement</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Consult Salem&apos;s leading microvascular nerve surgeons at Valli Super Specialty Hospital.</p>
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
            <li><Link href="/plastic-reconstructive-surgery" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Plastic & Reconstructive Surgery</Link></li>
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery Center</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture & Trauma Clinic</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
