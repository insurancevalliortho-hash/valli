import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Arthroscopy Surgery & Keyhole Joint Specialists in Salem | Valli Hospital",
  description: "Advanced Keyhole Arthroscopic Surgery in Salem at Valli Super Speciality Hospital. Expert ACL reconstruction, meniscus tear repair, shoulder dislocation surgery, and Bankart repair by Dr. T. Natanasabapathy. Day-care surgery with rapid recovery.",
  keywords: [
    "arthroscopy Salem",
    "arthroscopic surgery Salem",
    "ACL tear treatment Salem",
    "meniscus surgery Salem",
    "keyhole surgery knee Salem",
    "minimally invasive ortho surgery Tamil Nadu",
    "Dr Natanasabapathy arthroscopy",
    "shoulder arthroscopy Salem",
    "arthroscopy bankart repair",
    "knee ligament reconstruction surgery"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/arthroscopy`,
  },
};

export default function ArthroscopyPage() {
  const faqList = [
    {
      question: "What is Keyhole Arthroscopic Surgery?",
      answer: "Arthroscopy is a minimally invasive surgical procedure where a tiny fiber-optic camera (arthroscope) and specialized micro-instruments are inserted through small incisions (keyholes) to diagnose and repair joint damage with minimal tissue disruption."
    },
    {
      question: "How long is the hospital stay for an ACL or Meniscus arthroscopy?",
      answer: "Most arthroscopic surgeries at Valli Super Speciality Hospital are performed as day-care or 24-hour stay procedures. Patients are often able to walk with supportive braces on the same day or day after surgery."
    },
    {
      question: "What joints can be treated with arthroscopy at Valli Hospital Salem?",
      answer: "We routinely perform keyhole arthroscopic procedures on the Knee (ACL/PCL reconstruction, Meniscus repair), Shoulder (Rotator cuff repair, Bankart lesion repair), Elbow, Wrist, and Ankle joints."
    },
    {
      question: "Is arthroscopic surgery better than open surgery?",
      answer: "Yes, for intra-articular ligament and cartilage injuries, keyhole surgery offers vastly reduced postoperative pain, minimal scar tissue, near-zero infection risk, and significantly faster return to sports and daily work."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialities', url: 'https://www.vallihospital.in/specialities' },
        { name: 'Arthroscopy', url: 'https://www.vallihospital.in/arthroscopy' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Arthroscopy & Sports Medicine Center"
        description="Center of excellence for keyhole joint reconstruction, ACL tear repair, meniscus surgery, and shoulder dislocation procedures in Salem."
        url="https://www.vallihospital.in/arthroscopy"
      />
      <MedicalProcedureSchema
        name="Arthroscopic Knee & Shoulder Reconstruction"
        description="Minimally invasive keyhole surgical repair of torn ligaments, menisci, and glenoid labrum under high-definition optical magnification."
        bodyLocation="Knee & Shoulder Joints"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Arthroscopy</li>
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
            Advanced Minimally Invasive Surgery
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Keyhole Arthroscopy & <br /> <span className="text-[#f98825]">Joint Reconstruction in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Precision keyhole surgery for sports injuries, ACL tears, meniscus damage, and shoulder instability by Salem&apos;s foremost orthopedic surgeons.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Consult Arthroscopy Specialist
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 24/7 Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">State-of-the-Art Keyhole Surgery at Valli Hospital</h2>
              <p>
                Arthroscopy represents the forefront of modern orthopedic sports medicine. Utilizing a high-definition optical arthroscope inserted through tiny keyhole incisions, <strong>Dr. T. Natanasabapathy</strong> and our senior surgical team repair complex joint structures without cutting major muscles or healthy tissues.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🦵</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Knee Arthroscopy & ACL Repair</h3>
                <p className="text-base text-gray-600">Anterior Cruciate Ligament (ACL/PCL) reconstruction, meniscus root stitching, cartilage grafting, and diagnostic joint debridement.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">💪</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Shoulder Arthroscopy & Bankart Repair</h3>
                <p className="text-base text-gray-600">Stabilization for recurrent shoulder dislocation (Bankart repair), rotator cuff tear stitching, and subacromial decompression.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Key Benefits of Keyhole Arthroscopy</h2>
              <ul className="grid md:grid-cols-2 gap-4 mt-4 text-base">
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Micro-incisions (Less than 1 cm)
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Minimal intraoperative blood loss
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Same-day or 24-hour discharge
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-3">
                  <span className="text-[#f98825] font-bold">✓</span> Rapid return to sports & work
                </li>
              </ul>
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
          <h2 className="text-3xl font-bold mb-4">Book Your Arthroscopy Consultation Today</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Consult with Dr. T. Natanasabapathy for advanced keyhole joint reconstruction at Valli Hospital Salem.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Schedule Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics & Specialities</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
            <li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
            <li><Link href="/knee-replacement" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Knee Replacement Center</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
