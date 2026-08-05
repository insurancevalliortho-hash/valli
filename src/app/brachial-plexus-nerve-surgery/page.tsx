import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brachial Plexus & Peripheral Nerve Surgery Salem | Nerve Repair | Valli Hospital",
  description: "Elite Brachial Plexus & Peripheral Nerve Surgery at Valli Super Specialty Hospital, Salem. Nerve grafting, neurotization, Carpal Tunnel, Erb's Palsy, TOS, and microsurgical nerve reconstruction. Expert microsurgeons.",
  keywords: ["brachial plexus surgery Salem", "nerve surgery Salem", "peripheral nerve injury Salem", "Erb's palsy surgery Salem", "carpal tunnel Salem", "ulnar nerve Salem", "nerve grafting Salem", "TOS surgery Salem", "microsurgery Salem"],
  alternates: { canonical: "https://www.vallihospital.in/brachial-plexus-nerve-surgery" },
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
        { name: 'Brachial Plexus & Peripheral Nerve Surgery', url: 'https://www.vallihospital.in/brachial-plexus-nerve-surgery' }
      ]} />
      <FAQSchema questions={[
        { question: 'What brachial plexus conditions are treated at Valli Hospital?', answer: "We treat Traumatic Brachial Plexus Injuries (avulsions, ruptures), Erb's Palsy, Klumpke's Palsy, Carpal Tunnel Syndrome, Ulnar Nerve Entrapment, Thoracic Outlet Syndrome, and peripheral nerve injuries from trauma." },
        { question: 'What microsurgical procedures are available for nerve injuries?', answer: 'We perform Nerve Grafting, Nerve Transfers (Neurotization), Microneurolysis, and repair of Schwannomas and Neurofibromas using high-precision microscopes and micro-instrumentation.' },
      ]} />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#3cb3a6] truncate" aria-current="page">Brachial Plexus &amp; Peripheral Nerve Surgery</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#3cb3a6]/20 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#004b57]/30 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            Brachial Plexus &amp;<br /><span className="text-[#3cb3a6]">Peripheral Nerve Surgery</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Elite microscopic precision for restoring upper limb function — nerve grafting, neurotization, and microsurgical reconstruction for complex nerve injuries in Salem.
          </p>
        </div>
      </section>

      <section className="bg-[#00333c] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['Micro','Precision Surgery'],['50-Bed','Multispecialty Unit'],['CT Myelo','3D Nerve Mapping'],['ACLS','ATLS Certified']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#3cb3a6]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Brachial Plexus Surgery provides elite microscopic precision for the restoration of upper limb function within a high-performance 50-bedded multispecialty infrastructure. We specialize in the definitive management of complex nerve network disorders, ranging from Traumatic Brachial Plexus Injuries (Avulsions, Ruptures, and Neuromas) to Obstetric Brachial Plexus Palsy (Erb&apos;s Palsy and Klumpke&apos;s Palsy). Our clinical expertise excels in treating Peripheral Nerve Injuries, Nerve Compression Syndromes (Carpal Tunnel Syndrome, Ulnar Nerve Entrapment), and Thoracic Outlet Syndrome (TOS). Backed by a high-tech ICU and a surgical team rigorously trained in ACLS and ATLS, we are uniquely equipped to handle acute High-Velocity Trauma, including Gunshot Wounds, Sharp Lacerations, and Traction Injuries that threaten limb vitality.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Microsurgical Capabilities &amp; Rehabilitation</h2>
            <p>Our surgical powerhouse features a fully equipped Operation Theater (OT) integrated with high-precision Micro-Instrumentation and Microscopes for delicate Nerve Grafting, Nerve Transfers (Neurotization), and Microneurolysis. Leveraging our full-fledged Radiology Department, including high-speed CT scans (3D Myelography) and high-resolution Ultrasound (Nerve USG), we ensure precise clinical mapping of Neurofibromas, Schwannomas, and Post-Traumatic Fibrosis. We work in seamless, high-velocity synergy with our Pain Intervention Medicine wing for the management of Neuropathic Pain and Deafferentation Pain, and with our Physiotherapy department for specialized Muscle Re-education. By collaborating across all trauma-related departments — including Neurosurgery, Plastic Surgery, and Orthopedics — to provide holistic functional restoration, Valli Superspecialty combines microsurgical mastery with rapid-response clinical excellence to restore your movement and sensation 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Traumatic Brachial Plexus Injury repair (Avulsions, Ruptures, Neuromas)","Erb's Palsy & Klumpke's Palsy surgical correction",'Nerve Grafting & Nerve Transfers (Neurotization)','Microneurolysis with high-precision microscopes','Carpal Tunnel Syndrome & Ulnar Nerve Entrapment release','Thoracic Outlet Syndrome (TOS) surgery','Schwannoma & Neurofibroma excision','Post-Traumatic Fibrosis nerve reconstruction','3D CT Myelography & high-resolution Nerve USG mapping','Gunshot wound & traction injury limb salvage','Neuropathic & Deafferentation Pain management','Specialized Muscle Re-education physiotherapy'].map(cap => (
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
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
