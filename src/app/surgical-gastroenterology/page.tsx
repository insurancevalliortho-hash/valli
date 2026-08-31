import React from 'react';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Surgical Gastroenterology & Digestive Care Salem | Valli Super Specialty Hospital",
  description: "Advanced Surgical Gastroenterology at Valli Super Specialty Hospital, Salem. Laparoscopic surgery for gallstones, hernias, GI cancers, pancreatitis, and emergency laparotomies. 24/7 ICU, ACLS/ATLS certified.",
  keywords: ["surgical gastroenterology Salem", "gallstone surgery Salem", "laparoscopic surgery Salem", "GI cancer Salem", "pancreatitis treatment Salem", "hernia surgery Salem", "endoscopy Salem", "colonoscopy Salem"],
  alternates: { canonical: "https://www.vallihospital.in/surgical-gastroenterology" },
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
        { name: 'Surgical Gastroenterology', url: 'https://www.vallihospital.in/surgical-gastroenterology' }
      ]} />
      <FAQSchema questions={[
        { question: 'What surgeries are performed at the Gastroenterology department in Salem?', answer: 'We perform advanced laparoscopic gallstone cholecystectomy, hernia mesh repair, laparoscopic appendectomy, colorectal surgery, hemorrhoidectomy, splenectomy, and emergency laparotomies for GI perforations.' },
        { question: 'Is emergency gastroenterology surgery available 24/7 in Salem?', answer: 'Yes. Our emergency surgical team with advanced ICU backup is on standby around the clock for acute abdomen, appendicitis, GI bleeding, and peritonitis.' },
        { question: 'What diagnostic endoscopy services are available at Valli Hospital?', answer: 'We provide upper GI endoscopy, colonoscopy, and image-guided diagnostic evaluations with sedation for complete patient comfort.' }
      ]} />
      <MedicalSpecialtySchema
        name="Surgical Gastroenterology & GI Endoscopy Center"
        description="Minimally invasive laparoscopic GI surgery, gallstone removal, hernia repair, and emergency acute abdomen care in Salem."
        url="https://www.vallihospital.in/surgical-gastroenterology"
      />
      <MedicalProcedureSchema
        name="Laparoscopic Cholecystectomy & Hernia Repair"
        description="Keyhole surgical removal of gallstones and advanced tension-free mesh hernia repairs."
        bodyLocation="Gastrointestinal Tract & Abdomen"
      />

      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Surgical Gastroenterology</li>
          </ol>
        </nav>
      </div>

      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-5xl">
            Surgical Gastroenterology<br /><span className="text-[#f98825]">&amp; Digestive Care - <span className="whitespace-nowrap">Dr. Arunraj</span></span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            High-performance surgical management of complex abdominal conditions — powered by laparoscopy, advanced endoscopy, and 24/7 ICU-backed emergency readiness in Salem.
          </p>
        </div>
      </section>

      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['24/7','Surgical Readiness'],['50-Bed','Multispecialty Unit'],['ACLS','ATLS Certified'],['HD','Laparoscopy Suite']].map(([v,l]) => (
              <div key={l}><div className="text-3xl font-black text-[#f98825]">{v}</div><div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">
            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>At Valli Superspecialty Hospital, Salem, our Department of Surgical Gastroenterology provides a high-performance surgical environment within a 50-bedded multispecialty framework. We specialize in the precision management of complex abdominal conditions, ranging from Cholelithiasis (Gallstones) and Choledocholithiasis to advanced Gastrointestinal Cancers of the esophagus, stomach, and colon. Our expertise in Minimally Invasive Surgery is powered by high-definition Laparoscopy, offering superior outcomes for Inguinal and Incisional Hernias, Appendicitis, and Hiatal Hernia (GERD). For critical hepatobiliary and pancreatic issues, including Chronic Pancreatitis, Pancreatic Pseudocysts, and Liver Abscesses, our surgeons provide definitive operative solutions.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Diagnostics, Emergency Care &amp; Surgical Range</h2>
            <p>Leveraging a diagnostic powerhouse of high-resolution CT scans and Ultrasound, we ensure rapid clinical mapping of Abdominal Trauma and acute conditions like Peritonitis or Bowel Obstruction. Our integrated Endoscopy and Colonoscopy suite allows for the immediate identification and therapeutic management of GI Bleeding, Peptic Ulcers, and Colonic Polyps. Backed by an advanced ICU and a medical team rigorously trained in ACLS and ATLS, we are uniquely prepared for Emergency Laparotomies and life-saving interventions for Gastrointestinal Perforations. From Splenectomies to complex Colorectal Surgeries and Hemorrhoidectomies, Valli Superspecialty combines surgical mastery with a rapid-response critical care network to ensure your digestive health is in the safest hands 24/7.</p>

            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Laparoscopic Cholecystectomy for Gallstones','Hernia repair (Inguinal, Incisional, Hiatal/GERD)','Appendectomy & acute abdomen management','GI Cancer surgery (esophagus, stomach, colon)','Chronic Pancreatitis & Pancreatic Pseudocyst surgery','Liver Abscess drainage & hepatobiliary procedures','Emergency Laparotomy for GI Perforations','GI Bleeding & Peptic Ulcer management via Endoscopy','Colonic Polyp removal & Colorectal surgery','Hemorrhoidectomy & proctological procedures','Splenectomy & complex abdominal reconstructions','24/7 ICU with ACLS & ATLS emergency response'].map(cap => (
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
            <li><Link href="/hematology-blood-disorders" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Hematology &amp; Blood Disorders</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
