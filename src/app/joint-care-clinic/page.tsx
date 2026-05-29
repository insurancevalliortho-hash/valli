import React from 'react';

import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Joint Care & Joint Replacement Clinic Salem | Knee Hip Replacement | Valli Hospital",
  description: "Salem's leading joint care clinic at Valli Super Speciality Hospital. Expert total knee replacement, total hip replacement, shoulder replacement, and minimally invasive joint surgeries. Led by Dr. T. Natanasabapathy with 3,000+ successful joint replacements.",
  keywords: [
      "joint replacement Salem",
      "knee replacement Salem",
      "hip replacement Salem",
      "joint care clinic Salem",
      "total knee replacement Tamil Nadu",
      "total hip replacement Salem",
      "minimally invasive joint replacement Salem",
      "Dr Natanasabapathy joint replacement"
  ],
  alternates: {
    canonical: `https://vallihospital.in/joint-care-clinic`,
  },
};

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://vallihospital.in/' },
        { name: 'Specialities', url: 'https://vallihospital.in/specialities' },
        { name: 'Joint Care Clinic', url: 'https://vallihospital.in/joint-care-clinic' }
  ]} />
      <FAQSchema questions={[
        { question: 'What is the Joint Care Clinic?', answer: 'The Joint Care Clinic at Valli Super Speciality Hospital provides advanced, specialized care for related conditions.' },
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
            <li className="text-[#f98825] truncate" aria-current="page">Joint Care Clinic</li>
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
                Speciality Clinic
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
                  The Joint Care <br/> <span className="text-[#f98825]">Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>The Joint Care Clinic operates as a dedicated center for the comprehensive, evidence-based management of both acute and chronic joint pain. The hero objective of this department maps directly to alleviating debilitating discomfort, rebuilding musculoskeletal strength, and promoting optimal joint kinematics for patients suffering from degenerative or inflammatory arthropathies. The clinic operates on a core philosophy of joint preservation whenever possible, addressing pathologies across all major human articulations, including the knees, hips, shoulders, ankles, elbows, and wrists.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>The degradation of articular cartilage, whether induced by primary osteoarthritis, inflammatory conditions such as rheumatoid arthritis, or post-traumatic arthritis following severe injury, initiates a cascading biomechanical failure. This failure alters load distribution, induces subchondral bone sclerosis, and severely limits patient mobility and quality of life. The Joint Care Clinic utilizes a rigorously tiered intervention strategy to combat these biomechanical failures.</p>
      <p>Precision in joint care relies intrinsically on accurate spatial and anatomical mapping. To this end, the clinic utilizes advanced Magnetic Resonance Imaging (MRI), High-Resolution Ultrasound (USG), Computed Tomography (CT), and comprehensive X-ray imaging. A critical component of their diagnostic protocol is the acquisition of full-length lower limb radiographs, capturing the entire skeletal structure from the hip to the ankle in multiple anatomical planes. This full-length imaging is absolutely critical for assessing mechanical axis deviation and planning precise corrective osteotomies or arthroplasties.</p>
      <p>Conservative management forms the first line of defense. The department employs non-invasive, standardized periodic function assessments to guide customized &ldquo;return to function&rdquo; protocols. These protocols encompass intensive physical therapy, pharmacological management, and detailed musculoskeletal strength and gait analysis to correct compensatory movement patterns. When conservative measures are exhausted and articular degradation is severe, the clinic provides joint salvage procedures and complex reconstructive surgeries, including primary and revision total joint replacements (arthroplasty). Furthermore, the department specifically caters to patients arriving with complex complications from previous treatments performed at other institutions, offering targeted, highly specialized surgical solutions for failed arthroplasties.</p>
    
              </div>
          </div>
      </section>

      
      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialities</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
<li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
<li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Arthroscopy</Link></li>
          </ul>
        </div>
      </section>
  
<Footer />
    </>
  );
}
