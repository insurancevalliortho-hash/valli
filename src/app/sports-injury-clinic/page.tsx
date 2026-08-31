import React from 'react';
import Image from 'next/image';

import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sports Injury Clinic Salem | ACL MCL Ligament Repair | Valli Hospital",
  description: "Advanced sports injury treatment in Salem at Valli Super Specialty Hospital. Expert care for ACL tears, MCL injuries, meniscus tears, rotator cuff injuries, tennis elbow, and sports fractures. Biomechanical assessment and rehabilitation by specialist sports orthopaedic team.",
  keywords: [
      "sports injury clinic Salem",
      "ACL injury treatment Salem",
      "sports orthopaedic Salem",
      "ligament repair Salem",
      "MCL injury Salem",
      "sports fracture treatment Salem",
      "tennis elbow Salem",
      "rotator cuff injury Salem"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/sports-injury-clinic`,
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
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Sports Injury Clinic', url: 'https://www.vallihospital.in/sports-injury-clinic' }
  ]} />
      <FAQSchema questions={[
        { question: 'What is the Sports Injury Clinic?', answer: 'The Sports Injury Clinic at Valli Super Specialty Hospital provides advanced, specialized care for related conditions.' },
        { question: 'Who is the lead doctor?', answer: 'Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, leads our specialized care teams.' }
      ]} />
  

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Sports Injury Clinic</li>
          </ol>
        </nav>
      </div>
  
      
      {/* Hero Section - Concept 1 */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-16 overflow-hidden text-left">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45 blur-2xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                Specialty Clinic
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Sports Injury <br /> <span className="text-[#f98825]">Clinic</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Dedicated acute and chronic athletic trauma rehabilitation, arthroscopic keyhole repairs, and ligament reconstructions.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/book-appointment"
                  className="bg-[#f98825] hover:bg-[#e0751e] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-xs sm:max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#00333c] border border-white/10">
                  <Image
                    src="/SpeakersIMG/natanasabapathy.jpeg"
                    alt="Dr. T. Natanasabapathy"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 text-left space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#f98825] uppercase block">
                    Chief Orthopedic Surgeon
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dr. T. Natanasabapathy</h3>
                  <p className="text-xs text-gray-300 font-medium">
                    MBBS, MS(ORTHO), FIAS, FDFM
                  </p>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#f98825] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-white/20">
                  Chief Surgeon
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Distinct from the performance-enhancement focus of the Sports Medicine Clinic, the Sports Injury Clinic is dedicated to the acute and chronic rehabilitation of athletic trauma. The clinic employs a holistic, patient-centric strategy that evaluates posture, biomechanics, lifestyle, age, and whole-body alignment to treat the actual root cause of sports-related musculoskeletal injuries, thereby strictly minimizing the likelihood of recurrence.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>The clinical specialists offer advanced, evidence-based treatments for a variety of debilitating conditions:</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Acute Soft Tissue Pathologies:</strong> Sprains (ligamentous injury) and strains (musculotendinous injury) trigger an acute inflammatory cascade. Treatment immediately focuses on mitigating edematous swelling and relieving intra-compartmental pressure. This is followed by a carefully phased rehabilitation process involving manual therapy, electrical stimulation modalities, and tailored proprioceptive exercises to safely restore the joint&apos;s full physiological range of motion.</li>
        <li><strong>Specific Overuse Syndromes:</strong> Conditions resulting from repetitive microtrauma, such as Epicondylitis (Tennis Elbow) and Groin Pulls, involve micro-tearing of muscle fibers and subsequent fibrotic scarring. These are managed primarily with targeted physical therapy, dynamic stretching, adequate rest, and anti-inflammatories. Surgical excision of damaged, fibrotic tissue is judiciously reserved only for refractory cases that fail prolonged conservative management.</li>
        <li><strong>Shoulder Kinematics and Injuries:</strong> The shoulder joint trades absolute stability for maximum mobility, making it highly susceptible to injury from repetitive overhead motions in sports. The majority of shoulder issues involve the dynamic stabilizers—the rotator cuff muscles, tendons, and ligaments—rather than the static bony structures. Early clinical identification and targeted kinetic chain strengthening are the absolute cornerstones of treatment to prevent chronic, career-ending glenohumeral instability.</li>
        <li><strong>Fracture Management:</strong> When mechanical force exceeds the sheer strength of the bone, fractures occur. The clinic focuses on providing optimal biological and mechanical conditions for natural osteogenesis (bone healing) while meticulously maintaining the function of the adjacent joints.</li>
      </ul>
    
              </div>
          </div>
      </section>

      
      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
<li><Link href="/sports-training" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Training</Link></li>
<li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Arthroscopy</Link></li>
          </ul>
        </div>
      </section>
  
<Footer />
    </>
  );
}
