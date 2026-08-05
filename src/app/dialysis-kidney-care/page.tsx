import React from 'react';
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "24/7 Dialysis & Kidney Care Salem | Hemodialysis Fresenius | Valli Hospital",
  description: "24-hour Dialysis & Kidney Care unit at Valli Super Specialty Hospital, Salem. Fresenius Kabi 4008S hemodialysis machine, emergency renal failure treatment, qualified nephrologists, and round-the-clock care for kidney disease and renal transplant bridge therapy.",
  keywords: [
    "dialysis Salem",
    "kidney care Salem",
    "hemodialysis Salem",
    "Fresenius Kabi dialysis Salem",
    "kidney failure treatment Salem",
    "nephrology Salem",
    "renal care Salem",
    "24 hour dialysis Salem",
    "emergency dialysis Tamil Nadu",
    "Valli Hospital dialysis unit",
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/dialysis-kidney-care",
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
        { name: '24/7 Dialysis & Kidney Care', url: 'https://www.vallihospital.in/dialysis-kidney-care' }
      ]} />
      <FAQSchema questions={[
        { question: 'Does Valli Hospital offer 24/7 dialysis?', answer: 'Yes. Our 24-hour Dialysis and Kidney Care unit operates around the clock, featuring the Fresenius Kabi 4008S machine for high-precision hemodialysis, staffed by qualified nephrologists, renal technicians, and intensivists.' },
        { question: 'What kidney conditions are treated at Valli Hospital?', answer: 'We treat acute kidney failure, chronic renal disease, severe poisoning, trauma-induced renal shock, alcoholic liver disease, acute pancreatitis with renal complications, and provide bridging therapy for renal transplant candidates.' },
        { question: 'What dialysis machine does Valli Hospital use?', answer: 'We use the world-renowned Fresenius Kabi 4008S machine, offering standalone high-precision hemodialysis with the latest German technology for patient safety and clinical accuracy.' },
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">24/7 Dialysis &amp; Kidney Care</li>
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
            Specialty Clinic
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            24/7 Dialysis &amp;<br />
            <span className="text-[#f98825]">Kidney Care</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-2xl leading-relaxed font-medium">
            A specialized center of excellence for acute and chronic renal conditions — powered by the Fresenius Kabi 4008S and staffed by qualified nephrologists around the clock in Salem.
          </p>
        </div>
      </section>

      {/* Key Stats Strip */}
      <section className="bg-[#004b57] py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-[#f98825]">24/7</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Round-the-Clock Care</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">Fresenius</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Kabi 4008S Machine</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">100%</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Sterile Environment</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#f98825]">Expert</div>
              <div className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Nephrologists On-Site</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-8 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Department Overview</h2>
            <p>
              The 24-hour Dialysis and Kidney Care unit at Valli Super Specialty Hospital, Salem, is a specialized center of excellence dedicated to treating acute and chronic renal conditions. Featuring the world-renowned Fresenius Kabi 4008S machine, we provide standalone, high-precision hemodialysis that serves as a critical lifeline for patients in distress.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Emergency Renal Therapy</h2>
            <p>
              Our unit offers emergency life-saving therapy for kidney failure, severe poisoning, major accidents, and trauma-induced renal shock. Manned by qualified nephrologists, renal technicians, and intensivists, we ensure constant clinical vigilance for every patient. We are experts in managing medically compromised patients, including those with complex co-morbidities like alcoholic liver disease and acute pancreatitis.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Bridge to Renal Transplant</h2>
            <p>
              This advanced support system is designed to stabilize and sustain patients, serving as a vital bridge until a credible renal transplant can be arranged. Every procedure is conducted in a sterile, safe environment that prioritizes patient comfort and infection control. Whether it is an emergency fluid imbalance or long-term renal support, our team is available around the clock to provide expert intervention.
            </p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">German Technology, Compassionate Care</h2>
            <p>
              At Valli Hospital, we combine cutting-edge German technology with compassionate care to protect your kidney health. Trust Salem&apos;s dedicated specialists to provide the high-level renal care you deserve, any time of the day or night.
            </p>

            {/* Key Capabilities */}
            <div className="bg-white rounded-3xl border border-[#e5eaeb] p-8 mt-10">
              <h2 className="text-xl font-bold text-[#00333c] mb-6">Key Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "High-precision hemodialysis — Fresenius Kabi 4008S",
                  "Emergency dialysis for acute kidney failure",
                  "Severe poisoning & toxin clearance dialysis",
                  "Trauma-induced renal shock management",
                  "Alcoholic liver disease renal support",
                  "Acute pancreatitis with renal complications",
                  "Long-term chronic renal disease management",
                  "Bridge therapy for renal transplant candidates",
                  "Fluid and electrolyte balance correction",
                  "Sterile infection-controlled dialysis environment",
                  "24/7 intensivist and nephrologist oversight",
                  "Continuous renal replacement therapy (CRRT)",
                ].map((cap) => (
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
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments &amp; Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/interventional-ultrasound-pain-management" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Interventional Ultrasound &amp; Pain Management</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
