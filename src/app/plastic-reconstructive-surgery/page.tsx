import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Advanced Plastic & Reconstructive Surgery Salem | Cosmetic & Wound Care | Valli Hospital",
  description: "Expert Plastic, Reconstructive & Cosmetic Surgery at Valli Super Specialty Hospital, Salem. Diabetic foot wounds, hand trauma, facial reconstruction, varicose vein laser surgery, gynaecomastia, hair transplant, PRP, and non-surgical cosmetic treatments.",
  keywords: [
    "plastic surgery Salem",
    "reconstructive surgery Salem",
    "cosmetic surgery Salem",
    "diabetic foot wound Salem",
    "hand surgery Salem",
    "facial reconstruction Salem",
    "varicose vein laser Salem",
    "hair transplant Salem",
    "gynaecomastia Salem",
    "PRP treatment Salem",
    "abdominoplasty Salem",
    "Valli Hospital plastic surgery",
  ],
  alternates: { canonical: "https://www.vallihospital.in/plastic-reconstructive-surgery" },
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
        { name: 'Advanced Plastic Surgery', url: 'https://www.vallihospital.in/plastic-reconstructive-surgery' }
      ]} />
      <FAQSchema questions={[
        {
          question: 'What reconstructive procedures are available at Valli Hospital?',
          answer: 'We treat Diabetic Foot Wounds, Traumatic Wounds, Pressure Sores, Post-Surgical Wound Complications, Hand Trauma (Tendon, Nerve, Crush Injuries), and Facial Trauma reconstruction including Jaw Injuries and Maxillo-Facial Surgery.'
        },
        {
          question: 'Does Valli Hospital offer cosmetic surgery?',
          answer: 'Yes. We provide Gynaecomastia Correction, Abdominoplasty, Hair Transplantation, Breast Augmentation, Breast Reduction, Varicose Vein Laser Surgery, and non-surgical treatments including PRP, PRF, GFC, Exosomes, Microneedling, and Chemical Peels.'
        },
        {
          question: 'Is varicose vein treatment available at Valli Hospital?',
          answer: 'Yes. We offer Minimally Invasive Laser Surgery for Varicose Veins, addressing visible enlarged veins, leg pain, heaviness, and swelling with faster recovery and superior cosmetic outcomes.'
        },
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Advanced Plastic Surgery</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-rose-900/20 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-rose-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            Advanced Plastic &amp;<br />
            <span className="text-rose-400">Reconstructive Surgery</span>
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Lead Specialist:</span>
            <span className="text-white bg-rose-500 px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider">
              Dr. Gokul
            </span>
          </div>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            Microsurgical precision meets aesthetic artistry — restoring function, form, and confidence through reconstructive mastery and modern cosmetic medicine in Salem.
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <section className="bg-rose-950/80 py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              ['Recon', 'Microsurgical Precision'],
              ['Cosmetic', 'Surgical & Non-Surgical'],
              ['Laser', 'Varicose Vein Surgery'],
              ['24/7', 'Wound Care Protocols'],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-black text-rose-300">{v}</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Reconstructive Surgery &amp; Wound Care</h2>
            <p>
              At Valli Superspecialty Hospital, Salem, our Department of Plastic, Reconstructive &amp; Cosmetic Surgery combines microsurgical precision with aesthetic artistry within a high-performance, multispecialty infrastructure dedicated to restoring both function and form. We specialize in the definitive management of complex wounds and tissue loss, including Diabetic Foot Wounds, Traumatic Wounds, Pressure Sores, and Post-Surgical Wound Complications, alongside intricate Hand Trauma reconstruction covering Tendon Injuries, Nerve Injuries, Crush Injuries, and Soft Tissue Repair. Our clinical expertise extends to Maxillo-Facial Surgery for Facial Trauma, Jaw Injuries, and Facial Reconstruction, ensuring patients regain not just appearance but essential everyday function. Backed by a dedicated surgical team and advanced wound-care protocols, we are equipped to deliver superior healing outcomes, improved hand function, restored facial form, and effective pain and swelling control across even the most demanding reconstructive cases.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Cosmetic, Vascular &amp; Non-Surgical Aesthetic Care</h2>
            <p>
              Our surgical capabilities extend into advanced Cosmetic and Vascular Care, offering Minimally Invasive Laser Surgery for Varicose Veins that addresses visible enlarged veins, leg pain, heaviness, and swelling with faster recovery and superior cosmetic outcomes. Our Cosmetic Surgery division delivers Gynaecomastia Correction, Abdominoplasty, Hair Transplantation, Breast Augmentation, and Breast Reduction, each guided by personalized surgical planning tailored to individual anatomy and goals. For patients seeking rejuvenation without surgery, our Non-Surgical Cosmetic wing provides Regenerative Treatments (PRP, PRF, GFC, Exosomes) for hair fall management and skin rejuvenation, Microneedling for acne scars and uneven texture, and Chemical Peels for pigmentation and sun damage correction. By working in seamless synergy across surgical, dermatological, and rehabilitative disciplines, Valli Superspecialty Hospital combines reconstructive mastery with modern aesthetic medicine to help every patient look better, feel better, and move freely — 24/7.
            </p>

            {/* Key Capabilities */}
            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-8">Key Capabilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                {/* Reconstructive */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-rose-500 mb-4">Reconstructive &amp; Wound Care</h3>
                  <div className="space-y-3">
                    {[
                      'Diabetic Foot Wound management & reconstruction',
                      'Traumatic Wound care & Pressure Sore treatment',
                      'Post-Surgical Wound Complication repair',
                      'Hand Trauma — Tendon, Nerve & Crush Injury repair',
                      'Soft Tissue Reconstruction & Flap surgery',
                      'Maxillo-Facial Surgery for Facial Trauma & Jaw Injuries',
                      'Facial Reconstruction & functional restoration',
                    ].map(cap => (
                      <div key={cap} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#40484a] text-sm font-semibold">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Cosmetic */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#f98825] mb-4">Cosmetic, Vascular &amp; Non-Surgical</h3>
                  <div className="space-y-3">
                    {[
                      'Minimally Invasive Laser Surgery for Varicose Veins',
                      'Gynaecomastia Correction (Male Breast Reduction)',
                      'Abdominoplasty (Tummy Tuck)',
                      'Hair Transplantation (FUE / FUT)',
                      'Breast Augmentation & Breast Reduction',
                      'PRP, PRF, GFC & Exosome regenerative treatments',
                      'Microneedling for acne scars & Chemical Peels',
                    ].map(cap => (
                      <div key={cap} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#f98825]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-[#f98825]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#40484a] text-sm font-semibold">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments &amp; Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/oral-maxillofacial-surgery" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Oral &amp; Maxillofacial Surgery</Link></li>
            <li><Link href="/interventional-ultrasound-pain-management" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Interventional Ultrasound &amp; Pain Management</Link></li>
            <li><Link href="/brachial-plexus-nerve-surgery" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Brachial Plexus &amp; Nerve Surgery</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
