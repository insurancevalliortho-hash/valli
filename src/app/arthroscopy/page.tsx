import React from 'react';

import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Arthroscopy Surgery in Salem | Keyhole Joint Surgery | Valli Hospital",
  description: "Expert arthroscopic (keyhole) surgery in Salem at Valli Super Speciality Hospital. Minimally invasive treatment for ACL tears, meniscus injuries, rotator cuff, and shoulder disorders by Dr. T. Natanasabapathy. Fast recovery, same-day discharge.",
  keywords: [
      "arthroscopy Salem",
      "arthroscopic surgery Salem",
      "ACL tear treatment Salem",
      "meniscus surgery Salem",
      "keyhole surgery knee Salem",
      "minimally invasive ortho surgery Tamil Nadu",
      "Dr Natanasabapathy arthroscopy",
      "shoulder arthroscopy Salem"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/arthroscopy`,
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
        { name: 'Specialities', url: 'https://www.vallihospital.in/specialities' },
        { name: 'Arthroscopy', url: 'https://www.vallihospital.in/arthroscopy' }
      ]} />
      <FAQSchema questions={[
        { question: 'What is the Arthroscopy?', answer: 'The Arthroscopy at Valli Super Speciality Hospital provides advanced, specialized care for related conditions.' },
        { question: 'Who is the lead doctor?', answer: 'Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, leads our specialized care teams.' }
      ]} />


      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Arthroscopy</li>
          </ol>
        </nav>
      </div>


      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Clinical Service
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            Arthroscopy <br /> <span className="text-[#f98825]">Services</span>
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Overview</h2>
            <p>Arthroscopy represents the absolute forefront of minimally invasive orthopedic surgery, offering profound physiological benefits over traditional open surgical techniques. Utilizing a highly specialized, slender, flexible arthroscope equipped with high-definition optical fibers and magnifying lenses, surgeons can illuminate and directly visualize the intricate internal architecture of a joint on a high-resolution digital monitor.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Clinical Applications and Mechanisms</h2>
            <p>This advanced modality is predominantly employed for diagnosing and repairing complex ligamentous and meniscal damage in the knee, shoulder, wrist, elbow, and ankle. However, its utility at Valli Hospital extends significantly beyond common sports injuries. Arthroscopy is highly effective for surgically stabilizing recurrent shoulder dislocations, addressing painful focal cartilage defects, and managing vascular growths or tumors arising from the joint synovium. Furthermore, it allows for the precise, minimally invasive biopsy of intra-articular tumors and the rapid, life-saving debridement of septic joint infections, which is particularly critical for minimizing systemic stress in elderly or immunocompromised patients.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Physiological and Procedural Benefits</h2>
            <p>The clinical transition from extensive open arthrotomy to keyhole arthroscopy fundamentally alters the patient&apos;s recovery trajectory. By avoiding massive incisions through healthy muscle and capsular tissue, arthroscopy significantly reduces intraoperative blood loss and drastically minimizes iatrogenic soft tissue trauma. Consequently, the risk of postoperative nosocomial infection plummets. Patients experience substantially less postoperative pain, leading to a drastically reduced reliance on potentially addictive opioid analgesics. This minimal tissue disruption facilitates vastly accelerated rehabilitation timelines, often allowing patients to safely resume normal daily activities and load-bearing within mere days, provided they strictly adhere to post-operative protocols including smoking cessation and stringent incision hygiene.</p>

          </div>
        </div>
      </section>


      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialities</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
