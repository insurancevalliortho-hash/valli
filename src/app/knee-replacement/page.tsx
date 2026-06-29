import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Best Knee Replacement Hospital in Salem | Robotic & Cooled RFA | Valli Hospital",
  description: "Advanced Total & Partial Knee Replacement in Salem at Valli Super Speciality Hospital. Led by Dr. T. Natanasabapathy. Specializing in Robotic Knee Surgery, Cooled RFA, and PRP injections for rapid knee pain relief.",
  keywords: [
    "knee replacement surgery Salem",
    "best hospital for knee replacement Salem",
    "robotic knee replacement Salem",
    "cooled rfa treatment for knee pain",
    "knee pain hospital near me",
    "platelet injection for knee pain",
    "total knee replacement surgery",
    "knee replacement surgery cost Salem",
    "Dr Natanasabapathy knee replacement",
    "knee pain doctor near me"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/knee-replacement`,
  },
};

export default function KneeReplacementPage() {
  const faqList = [
    {
      question: "What is the recovery time after knee replacement surgery at Valli Hospital?",
      answer: "Most patients walk with assistance within 24 hours of surgery thanks to our rapid-recovery protocols and advanced pain management. Full daily activity recovery typically ranges from 4 to 6 weeks."
    },
    {
      question: "What is Cooled RFA treatment for knee pain?",
      answer: "Cooled Radiofrequency Ablation (Cooled RFA) is a non-surgical, minimally invasive outpatient procedure that targets sensory nerves causing chronic knee pain. It provides sustained relief (1 to 2 years) for patients not candidate for surgery or wishing to delay joint replacement."
    },
    {
      question: "Do you offer non-surgical treatments like PRP platelet injections?",
      answer: "Yes, Valli Super Speciality Hospital offers Regenerative Platelet-Rich Plasma (PRP) therapy and Viscosupplementation injections to reduce joint inflammation and promote cartilage healing in mild to moderate osteoarthritis."
    },
    {
      question: "Who is the lead knee specialist at Valli Hospital Salem?",
      answer: "Dr. T. Natanasabapathy, Chief Orthopedic Surgeon with 16+ years of clinical excellence, personally oversees advanced joint replacement and robotic knee procedures."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialities', url: 'https://www.vallihospital.in/specialities' },
        { name: 'Knee Replacement', url: 'https://www.vallihospital.in/knee-replacement' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Knee Replacement & Joint Care Center"
        description="Center of excellence for robotic knee replacement, partial knee resurfacing, Cooled RFA, and joint pain management in Salem."
        url="https://www.vallihospital.in/knee-replacement"
      />
      <MedicalProcedureSchema
        name="Total Knee Arthroplasty & Cooled RFA"
        description="State-of-the-art joint replacement and non-surgical nerve ablation for severe osteoarthritis and chronic knee pain."
        bodyLocation="Knee Joint"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Knee Replacement</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Center of Excellence in Joint Care
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Advanced Knee Replacement & <br /> <span className="text-[#f98825]">Cooled RFA Pain Treatment in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Regain pain-free mobility with Salem&apos;s leading orthopedic team. From computer-assisted robotic joint replacement to advanced non-surgical Cooled RFA therapy.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Consultation Now
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Emergency Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Comprehensive Knee Care at Valli Hospital Salem</h2>
              <p>
                Knee pain from severe osteoarthritis, rheumatoid arthritis, or traumatic cartilage erosion can drastically restrict everyday life. At <strong>Valli Super Speciality Hospital (formerly Valli Orthopedic and Sports Hospital)</strong>, we combine world-class surgical expertise led by <strong>Dr. T. Natanasabapathy</strong> with cutting-edge medical technologies to deliver permanent pain relief and restoration of natural joint movement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Total Knee Arthroplasty (TKA)</h3>
                <p className="text-base text-gray-600">Precision alignment surgical resurfacing using high-grade biocompatible implants designed for maximum longevity (20-25+ years) and natural range of motion.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Cooled RFA Treatment</h3>
                <p className="text-base text-gray-600">Revolutionary non-surgical radiofrequency ablation that deactivates pain-sensing genicular nerves for 12-24 months without incisions or downtime.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Non-Surgical Interventions: Cooled RFA & PRP Therapy</h2>
              <p>
                Not every patient requiring knee care requires surgery. We offer specialized therapies targeting the precise physiological pathways of knee pain:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li><strong>Cooled Radiofrequency Ablation (Cooled RFA):</strong> An FDA-cleared, minimally invasive outpatient procedure ideal for elderly patients or individuals seeking non-surgical knee pain relief.</li>
                <li><strong>Platelet-Rich Plasma (PRP) Injections:</strong> Concentrated growth factors isolated from your own blood injected into the intra-articular space to stimulate tissue healing and calm joint swelling.</li>
                <li><strong>Hyaluronic Acid Viscosupplementation:</strong> Direct joint lubrication to reduce bone-on-bone friction in stage 2 and stage 3 knee osteoarthritis.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Why Choose Valli Super Speciality Hospital?</h2>
              <div className="bg-[#001f25] text-white p-8 rounded-2xl space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-[#f98825] text-2xl">✓</span>
                  <div>
                    <strong className="text-lg block text-white">16,000+ Successful Procedures</strong>
                    <span className="text-gray-300 text-sm">Recognized across Tamil Nadu for exceptional surgical success rates and minimal post-op infection records.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#f98825] text-2xl">✓</span>
                  <div>
                    <strong className="text-lg block text-white">Sub-Specialized Lead Surgeons</strong>
                    <span className="text-gray-300 text-sm">Led by Dr. T. Natanasabapathy, Chief Orthopedic Surgeon with extensive clinical training in complex joint reconstructions.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-[#f98825] text-2xl">✓</span>
                  <div>
                    <strong className="text-lg block text-white">Comprehensive 24/7 Support & Rehab</strong>
                    <span className="text-gray-300 text-sm">On-site dedicated physiotherapy center, 24/7 emergency trauma units, and advanced radiology diagnostic suites.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-[#00333c] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-[#00333c] mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-base">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#00333c] text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4">Consult Salem&apos;s Top Knee Specialists Today</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Take the first step toward living free from knee pain. Schedule your consultation at Valli Super Speciality Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Schedule Your Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics & Departments</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Keyhole Arthroscopy</Link></li>
            <li><Link href="/rheumatology" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Rheumatology Center</Link></li>
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
