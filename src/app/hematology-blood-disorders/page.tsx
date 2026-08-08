import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hematology & Blood Disorders Treatment Salem | Valli Super Specialty Hospital",
  description: "Expert hematology care at Valli Super Specialty Hospital, Salem. Treatment for Anemia, Thalassemia, Hemophilia, Leukemia, DVT, DIC, and all blood disorders. 24/7 ICU, ACLS/ATLS certified team.",
  keywords: ["hematology Salem", "blood disorders Salem", "anemia treatment Salem", "leukemia Salem", "thalassemia Salem", "DVT treatment Salem", "blood cancer Salem", "Valli Hospital hematology"],
  alternates: { canonical: "https://www.vallihospital.in/hematology-blood-disorders" },
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
        { name: 'Hematology & Blood Disorders', url: 'https://www.vallihospital.in/hematology-blood-disorders' }
      ]} />
      <FAQSchema questions={[
        { question: 'What blood disorders are treated at Valli Hospital?', answer: 'We treat Iron Deficiency Anemia, Thalassemia, Sickle Cell Disease, Hemophilia, DVT, Leukemia, Lymphoma, DIC, Thrombocytopenia, and more within our 50-bedded multispecialty setup.' },
        { question: 'Is 24/7 emergency hematology care available?', answer: 'Yes. Our ICU-backed, ACLS and ATLS certified team provides round-the-clock care for acute hematological emergencies including Septicemia and DIC.' },
      ]} />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Hematology &amp; Blood Disorders</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-red-900/20 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            Hematology &amp;<br /><span className="text-red-400">Blood Disorders</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Lead Specialist:</span>
            <span className="text-white bg-red-500 px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider">
              Dr. Karthika
            </span>
          </div>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Expert, high-velocity blood disorder care within a 50-bedded multispecialty framework — 24/7 ICU-backed, ACLS &amp; ATLS certified, Salem.
          </p>
        </div>
      </section>

      <section className="bg-red-900/80 py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['24/7','Emergency Care'],['50-Bed','Multispecialty Unit'],['ACLS','ATLS Certified'],['Advanced','ICU Support']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-red-300">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Hematology provides expert, high-velocity care within a sophisticated 50-bedded multispecialty framework. We specialize in the precise diagnosis and management of a vast spectrum of blood-related conditions, including Iron Deficiency Anemia, Megaloblastic Anemia, Thalassemia, and Sickle Cell Disease. Our clinical expertise extends to complex Coagulopathies, such as Hemophilia and Von Willebrand Disease, as well as life-threatening Deep Vein Thrombosis (DVT) and Pulmonary Embolism. Backed by a high-tech ICU and a medical team rigorously trained in ACLS and ATLS, we are uniquely equipped to handle acute Hematological Emergencies, including Septicemia, Thrombocytopenia (Low Platelet Count), and Disseminated Intravascular Coagulation (DIC).</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Diagnostics, Oncology & Surgical Synergy</h2>
            <p>Our diagnostic powerhouse utilizes high-resolution CT scans and Ultrasound to investigate Lymphadenopathy (Swollen Lymph Nodes) and Splenomegaly, while our advanced Endoscopy and Colonoscopy suite allows for the rapid identification of occult gastrointestinal bleeding. For oncological concerns, we provide comprehensive workups for Leukemia (Blood Cancer), Lymphoma, and Multiple Myeloma. When surgical intervention is required—such as a Laparoscopic Splenectomy for ITP (Immune Thrombocytopenic Purpura)—our hematologists work in seamless synergy with our minimally invasive surgical team. From managing Polycythemia to treating chronic Bone Marrow Disorders, Valli Superspecialty combines cutting-edge laboratory science with rapid-response clinical excellence to safeguard your vital life force 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Iron Deficiency, Megaloblastic & Hemolytic Anemia','Thalassemia & Sickle Cell Disease management','Hemophilia, Von Willebrand Disease & Coagulopathies','Deep Vein Thrombosis (DVT) & Pulmonary Embolism','Septicemia, Thrombocytopenia & DIC emergencies','Leukemia, Lymphoma & Multiple Myeloma workups','Laparoscopic Splenectomy for ITP','Lymphadenopathy & Splenomegaly diagnostics','Occult GI bleeding via Endoscopy & Colonoscopy','Polycythemia & Bone Marrow Disorder management'].map(cap => (
                  <div key={cap} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
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
            <li><Link href="/surgical-gastroenterology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Surgical Gastroenterology</Link></li>
            <li><Link href="/critical-care-anaesthesia" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Critical Care &amp; Anaesthesia</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
