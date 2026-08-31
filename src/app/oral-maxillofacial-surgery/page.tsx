import React from 'react';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Oral & Maxillofacial Surgery Salem | Facial Trauma & Jaw Surgery | Valli Hospital",
  description: "Advanced Oral & Maxillofacial Surgery at Valli Super Specialty Hospital, Salem. Facial trauma, mandibular fractures, oral cancer, TMJ disorders, cleft palate, and airway emergency management. Expert OMFS team.",
  keywords: ["oral maxillofacial surgery Salem", "jaw surgery Salem", "facial trauma Salem", "oral cancer Salem", "TMJ treatment Salem", "cleft palate Salem", "mandibular fracture Salem", "OMFS Salem", "wisdom tooth Salem"],
  alternates: { canonical: "https://www.vallihospital.in/oral-maxillofacial-surgery" },
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
        { name: 'Oral & Maxillofacial Surgery', url: 'https://www.vallihospital.in/oral-maxillofacial-surgery' }
      ]} />
      <FAQSchema questions={[
        { question: 'What does the Oral & Maxillofacial Surgery department treat in Salem?', answer: 'We treat complex facial trauma (mandibular, ZMC, orbital fractures), oral cancers, TMJ disorders, odontogenic cysts, cleft lip and palate, impacted wisdom teeth, and deep neck space infections.' },
        { question: 'Is emergency maxillofacial trauma care available 24/7?', answer: "Yes. Our surgical trauma team handles acute maxillofacial emergencies including facial bone fractures, Ludwig's Angina, airway compromise, and soft tissue lacerations 24/7." },
        { question: 'Who is the lead Maxillofacial Surgeon at Valli Hospital?', answer: 'Dr. B. S. Saravanan (MD, BDS, MDS - Oral and Facio-Maxilla Surgery) leads our specialized oral and maxillofacial reconstructive surgical team.' }
      ]} />
      <MedicalSpecialtySchema
        name="Oral and Maxillofacial Surgery Center"
        description="24/7 facial bone trauma reconstruction, orthognathic jaw surgery, TMJ therapy, and oral surgical procedures in Salem."
        url="https://www.vallihospital.in/oral-maxillofacial-surgery"
      />
      <MedicalProcedureSchema
        name="Open Reduction of Facial Fractures & Orthognathic Surgery"
        description="Titanium micro-plating for jaw fractures and corrective functional jaw realignment."
        bodyLocation="Maxillofacial & Craniofacial Skeleton"
      />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#004b57] truncate" aria-current="page">Oral &amp; Maxillofacial Surgery</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            Advanced Oral &amp;<br /><span className="text-[#3cb3a6]">Maxillofacial Surgery - <span className="whitespace-nowrap">Dr. B. S. Saravanan</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Elite surgical precision for the face, jaws, and mouth — managing complex facial trauma, oral cancers, TMJ disorders, and orthognathic reconstruction in Salem.
          </p>
        </div>
      </section>

      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['24/7','Facial Emergency Care'],['50-Bed','Multispecialty Unit'],['3D CT','Facial Reconstruction'],['ACLS','ATLS Certified']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#3cb3a6]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Oral and Maxillofacial Surgery (OMFS) provides elite surgical precision for the face, jaws, and mouth within a high-performance 50-bedded multispecialty infrastructure. We specialize in the definitive management of complex Facial Trauma, including Mandibular Fractures, Zygomaticomaxillary Complex (ZMC) Fractures, Orbital Floor Blow-out Fractures, and Nasal Bone Injuries. Our clinical expertise extends to the surgical correction of Dentoalveolar Pathologies, such as Impacted Wisdom Teeth, and the management of Oral Cancers (Squamous Cell Carcinoma), Odontogenic Cysts, and Ameloblastomas. Backed by a high-tech ICU and a surgical team rigorously trained in ACLS and ATLS, we are uniquely equipped to handle acute Maxillofacial Emergencies, including Ludwig&apos;s Angina (Deep Neck Space Infections), Facial Lacerations, and Airway Compromise.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Diagnostics, Reconstruction &amp; Multidisciplinary Synergy</h2>
            <p>Our surgical powerhouse features a fully equipped Operation Theater (OT) integrated with high-precision Microscopes for delicate Nerve Repairs and Microvascular Reconstructions. Leveraging our full-fledged Radiology Department, including high-speed CT scans (3D Facial Reconstruction) and Ultrasound, we ensure precise clinical mapping of Temporomandibular Joint (TMJ) Disorders (Ankylosis), Salivary Gland Tumors, and Orthognathic Deformities (Cleft Lip and Palate). We work in seamless, high-velocity synergy with our Pain Intervention Medicine wing for Trigeminal Neuralgia management and our Laparoscopy and Endoscopy teams for holistic peri-operative care. By collaborating across all trauma-related departments — including Neurosurgery and Plastic Surgery — to ensure functional and aesthetic restoration, Valli Superspecialty combines reconstructive mastery with rapid-response clinical excellence to restore your smile and facial harmony 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Mandibular, ZMC & Orbital Fracture repair','Nasal Bone Injury & facial laceration management',"Ludwig's Angina & Deep Neck Space Infection care",'Airway Compromise emergency management','Oral Cancer (SCC), Odontogenic Cysts & Ameloblastoma surgery','Impacted Wisdom Tooth extraction & dentoalveolar surgery','TMJ Ankylosis & Salivary Gland Tumor management','Cleft Lip & Palate orthognathic correction','3D CT Facial Reconstruction & Nerve USG diagnostics','Microvascular Reconstruction & Nerve Repair microsurgery','Trigeminal Neuralgia management with Pain Medicine','Synergy with Neurosurgery & Plastic Surgery for holistic restoration'].map(cap => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3cb3a6]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#3cb3a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[#40484a] text-sm font-semibold">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments &amp; Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery</Link></li>
            <li><Link href="/interventional-ultrasound-pain-management" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Pain Management</Link></li>
            <li><Link href="/critical-care-anaesthesia" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Critical Care &amp; Anaesthesia</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
