import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Respiratory Care & Interventional Pulmonology Salem | Valli Super Specialty Hospital",
  description: "Elite respiratory care at Valli Super Specialty Hospital, Salem. Expert management of Asthma, COPD, TB, ARDS, Pneumothorax, Lung Cancer, and advanced bronchoscopy. 24/7 ICU, ACLS/ATLS certified.",
  keywords: ["pulmonology Salem", "respiratory care Salem", "asthma treatment Salem", "COPD Salem", "bronchoscopy Salem", "lung disease Salem", "TB treatment Salem", "ARDS treatment Salem", "sleep apnea Salem"],
  alternates: { canonical: "https://www.vallihospital.in/respiratory-care-pulmonology" },
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
        { name: 'Respiratory Care & Pulmonology', url: 'https://www.vallihospital.in/respiratory-care-pulmonology' }
      ]} />
      <FAQSchema questions={[
        { question: 'What respiratory conditions are treated at Valli Hospital?', answer: 'We treat Asthma, COPD, Bronchiectasis, ILD, Pneumonia, TB, Pleural Effusion, Obstructive Sleep Apnea, ARDS, Pneumothorax, Lung Cancer, and Pulmonary Embolism.' },
        { question: 'Does Valli Hospital offer bronchoscopy?', answer: 'Yes. Our Interventional Pulmonology team performs Flexible Bronchoscopy for precise diagnosis of Lung Cancer and therapeutic removal of foreign bodies.' },
      ]} />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#3cb3a6] truncate" aria-current="page">Respiratory Care &amp; Pulmonology</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#3cb3a6]/20 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#3cb3a6]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#3cb3a6] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3cb3a6]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            Respiratory Care &amp;<br /><span className="text-[#3cb3a6]">Interventional Pulmonology - <span className="whitespace-nowrap">Dr. Samuthiran</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Elite respiratory care for Asthma, COPD, TB, and life-threatening emergencies like ARDS — backed by advanced bronchoscopy, ICU, and 24/7 critical care in Salem.
          </p>
        </div>
      </section>

      <section className="bg-[#00333c] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['24/7','Respiratory ICU'],['50-Bed','Multispecialty Unit'],['ACLS','ATLS Certified'],['Advanced','Bronchoscopy Suite']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#3cb3a6]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Pulmonology provides elite respiratory care within a high-performance 50-bedded multispecialty infrastructure. We specialize in the definitive management of a wide spectrum of lung diseases, including Asthma, COPD (Chronic Obstructive Pulmonary Disease), Bronchiectasis, and Interstitial Lung Disease (ILD). Our clinical expertise extends to complex Respiratory Infections such as Pneumonia, Tuberculosis (TB), and Pleural Effusion, as well as sleep-related disorders like Obstructive Sleep Apnea (OSA). Backed by a high-tech ICU and a medical team rigorously trained in ACLS and ATLS, we are uniquely equipped to handle life-threatening Respiratory Emergencies, including Acute Respiratory Distress Syndrome (ARDS), Pneumothorax (Collapsed Lung), and Massive Hemoptysis (Coughing Blood).</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Diagnostics, Interventional Pulmonology &amp; Rehabilitation</h2>
            <p>Our diagnostic powerhouse utilizes high-resolution CT scans and Ultrasound (USG Thorax) to investigate Lung Nodules, Mediastinal Lymphadenopathy, and Pulmonary Edema. We are pioneers in Interventional Pulmonology, offering advanced Flexible Bronchoscopy for the precise diagnosis of Lung Cancer (Bronchogenic Carcinoma) and the therapeutic removal of Foreign Bodies. For patients with complex multi-system conditions, our pulmonologists work in seamless synergy with our Endoscopy, Colonoscopy, and Laparoscopy teams to manage everything from Pulmonary Embolism to chronic Sarcoidosis. From performing Thoracocentesis to providing long-term BiPAP/CPAP Therapy and Pulmonary Rehabilitation, Valli Superspecialty combines cutting-edge interventional science with rapid-response clinical excellence to ensure you breathe easy 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Asthma, COPD & Bronchiectasis management','Interstitial Lung Disease (ILD) diagnosis & treatment','Pneumonia, TB & Pleural Effusion treatment','Obstructive Sleep Apnea (OSA) management','ARDS, Pneumothorax & Massive Hemoptysis emergency care','Flexible Bronchoscopy for Lung Cancer diagnosis','Lung Nodule & Mediastinal mapping via CT & USG Thorax','Pulmonary Embolism & Sarcoidosis management','Thoracocentesis for pleural fluid drainage','BiPAP/CPAP Therapy & Pulmonary Rehabilitation','Synergy with Endoscopy & Laparoscopy for complex cases','24/7 ICU with ACLS & ATLS emergency response'].map(cap => (
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
            <li><Link href="/critical-care-anaesthesia" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Critical Care &amp; Anaesthesia</Link></li>
            <li><Link href="/surgical-gastroenterology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Surgical Gastroenterology</Link></li>
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
