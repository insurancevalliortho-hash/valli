import React from 'react';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Advanced Neurosurgery & Neurological Care Salem | Brain & Spine Surgery | Valli Hospital",
  description: "Elite neurosurgery at Valli Super Specialty Hospital, Salem. Brain tumors, cerebrovascular emergencies, TBI, spine surgery, VP shunting, and Trigeminal Neuralgia management. Neuro-microscope precision, 24/7 ICU.",
  keywords: ["neurosurgery Salem", "brain surgery Salem", "spine surgery Salem", "brain tumor Salem", "TBI treatment Salem", "stroke surgery Salem", "VP shunting Salem", "Trigeminal Neuralgia Salem", "spinal stenosis Salem"],
  alternates: { canonical: "https://www.vallihospital.in/neurosurgery-neurological-care" },
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
        { name: 'Neurosurgery & Neurological Care', url: 'https://www.vallihospital.in/neurosurgery-neurological-care' }
      ]} />
      <FAQSchema questions={[
        { question: 'What neurosurgical procedures are available at Valli Hospital Salem?', answer: 'We perform brain tumor surgery, craniotomies, VP shunting, spinal decompression, disc surgery, cerebrovascular surgery for aneurysms, emergency TBI management, and Trigeminal Neuralgia treatment.' },
        { question: 'Is emergency neurosurgery and head injury care available 24/7 in Salem?', answer: 'Yes. Our ICU-backed, ACLS and ATLS certified neurosurgical team handles Traumatic Brain Injury (TBI), Epidural and Subdural Hematomas, and stroke emergencies around the clock.' },
        { question: 'Who are the specialists for brain and nerve care?', answer: 'Our neurological care division features Dr. Dhivya (MBBS, MD - Consultant Neurologist) and senior consultant neurosurgeons.' }
      ]} />
      <MedicalSpecialtySchema
        name="Neurosurgery & Neurological Care Center"
        description="24/7 advanced neurosurgical emergency center, brain tumor resection, and neurological ICU in Salem."
        url="https://www.vallihospital.in/neurosurgery-neurological-care"
      />
      <MedicalProcedureSchema
        name="Microsurgical Craniotomy & Neural Decompression"
        description="High-precision neuro-microscopic surgery for intracranial tumors, hematomas, and spinal nerve compression."
        bodyLocation="Brain, Spine & Central Nervous System"
      />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Neurosurgery &amp; Neurological Care</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-red-900/20 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            Advanced Neurosurgery &amp;<br /><span className="text-[#f98825]">Neurological Critical Care - <span className="whitespace-nowrap">Dr. Hariharasudh</span> &amp; <span className="whitespace-nowrap">Dr. Dhivya</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Elite surgical precision for brain tumors, cerebrovascular emergencies, and spine disorders — powered by neuro-microscope technology and 24/7 ICU support in Salem.
          </p>
        </div>
      </section>

      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['24/7','Neurosurgical ICU'],['50-Bed','Multispecialty Unit'],['Neuro','Microscope Precision'],['ACLS','ATLS Certified']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#f98825]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Neurosurgery provides elite surgical precision within a high-performance 50-bedded multispecialty infrastructure. We specialize in the definitive management of a wide spectrum of brain and spine disorders, including Brain Tumors (Gliomas, Meningiomas), Pituitary Adenomas, and Acoustic Neuromas. Our clinical expertise extends to complex Cerebrovascular Conditions such as Aneurysms, Arteriovenous Malformations (AVM), and Ischemic or Hemorrhagic Stroke. Backed by a high-tech ICU and a medical team rigorously trained in ACLS and ATLS, we are uniquely equipped to handle life-threatening Neurosurgical Emergencies, including Traumatic Brain Injury (TBI), Epidural and Subdural Hematomas, and Raised Intracranial Pressure (ICP).</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Surgical Capabilities &amp; Spine Surgery</h2>
            <p>Our surgical powerhouse features a fully equipped Operation Theater (OT) integrated with high-precision Neuro-Microscopes for delicate Microsurgery, ensuring maximal safety during Craniotomies and Spinal Decompressions. We offer advanced solutions for Spine Surgery, including Herniated Discs (Slipped Disc), Spondylolisthesis, Spinal Stenosis, and Spinal Cord Tumors. Leveraging a diagnostic suite of high-resolution CT scans and Ultrasound, we ensure rapid clinical mapping of Hydrocephalus and Congenital Anomalies. For patients with multi-system trauma, our neurosurgeons work in seamless synergy with our Endoscopy, Colonoscopy, and Laparoscopy teams to provide holistic care. From performing Ventriculoperitoneal (VP) Shunting to managing Trigeminal Neuralgia and Chronic Back Pain, Valli Superspecialty combines cutting-edge microscopic innovation with rapid-response clinical excellence to safeguard your neurological health 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Brain Tumor surgery (Gliomas, Meningiomas, Pituitary)','Acoustic Neuroma & Cranial Base surgery','Aneurysm & AVM cerebrovascular surgery','Ischemic & Hemorrhagic Stroke management','Traumatic Brain Injury (TBI) emergency surgery','Epidural & Subdural Hematoma evacuation','VP Shunting for Hydrocephalus','Herniated Disc & Spinal Stenosis decompression','Spondylolisthesis & Spinal Cord Tumor surgery','Trigeminal Neuralgia & Chronic Back Pain management','High-precision Neuro-Microscope Craniotomies','Rapid CT & USG diagnostics for ICP & Congenital Anomalies'].map(cap => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#f98825]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#f98825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
            <li><Link href="/critical-care-anaesthesia" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Critical Care &amp; Anaesthesia</Link></li>
            <li><Link href="/brachial-plexus-nerve-surgery" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Brachial Plexus &amp; Nerve Surgery</Link></li>
            <li><Link href="/back-pain-and-spinal-disorders" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Back Pain &amp; Spinal Disorders</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
