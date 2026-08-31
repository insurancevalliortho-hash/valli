import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Back Pain Treatment & Spine Surgery in Salem | Disc, Sciatica Specialist | Valli Hospital",
  description: "Advanced back pain relief and spine surgery in Salem at Valli Super Specialty Hospital. Specializing in sciatica, herniated disc, lumbar spondylosis, and micro-endoscopic spine surgery. Non-surgical and robotic spine care.",
  keywords: [
    "back pain treatment in Salem",
    "spine surgeon in Salem",
    "best hospital for back pain treatment",
    "sciatica treatment Salem",
    "disc herniation surgery Salem",
    "lumbar spondylosis doctor Salem",
    "lower back pain specialist near me",
    "back pain best hospital in Salem",
    "spine specialist doctor Salem",
    "ultrasound guided spine injection"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/back-pain-and-spinal-disorders",
  },
  openGraph: {
    title: "Back Pain & Spine Surgery Center in Salem | Valli Hospital",
    description: "Permanent relief from chronic back pain, slipped disc, and sciatica. Consult leading spine specialists Dr. T. Natanasabapathy & Dr. K. N. Jotheesvar.",
    url: "https://www.vallihospital.in/back-pain-and-spinal-disorders",
    type: "website",
  }
};

export default function BackPainSpinalDisordersPage() {
  const faqList = [
    {
      question: "What causes persistent lower back pain and sciatica?",
      answer: "Persistent lower back pain is frequently caused by herniated or bulging lumbar discs, spinal stenosis (narrowing of the spinal canal), facet joint arthritis, or spondylolisthesis. Sciatica occurs when the nerve roots exiting the lower spine become compressed or inflamed, radiating pain down the leg."
    },
    {
      question: "Can back pain be treated without open spine surgery at Valli Hospital?",
      answer: "Yes. Over 85% of back pain patients recover successfully without open surgery. Our tiered approach includes targeted physiotherapy, core stabilization, and advanced ultrasound-guided epidural nerve blocks that eliminate pain signals at the exact root."
    },
    {
      question: "When is spine surgery necessary for disc herniation?",
      answer: "Surgery is indicated when conservative therapies do not relieve progressive neurological deficits such as leg numbness, severe weakness (foot drop), intractable sciatica pain, or loss of bowel/bladder control. We utilize micro-endoscopic minimally invasive techniques with tiny incisions and fast recovery."
    },
    {
      question: "Who are the spine specialists at Valli Hospital Salem?",
      answer: "Our spine division is led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon) and Dr. K. N. Jotheesvar (Fellowship in Spine Surgery & Joint Replacement), offering cutting-edge surgical and non-surgical spinal interventions."
    },
    {
      question: "How soon can I return to normal daily activities after spine treatment?",
      answer: "Patients undergoing non-surgical interventional nerve blocks experience relief within 24 to 48 hours. Patients undergoing minimally invasive micro-endoscopic spine surgery are typically mobilized within 24 hours and resume light routine work in 2 to 4 weeks."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Back Pain & Spine Care', url: 'https://www.vallihospital.in/back-pain-and-spinal-disorders' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Spine Surgery & Back Pain Clinic"
        description="Comprehensive diagnostic, non-surgical, and minimally invasive surgical spine care center in Salem."
        url="https://www.vallihospital.in/back-pain-and-spinal-disorders"
      />
      <MedicalProcedureSchema
        name="Micro-Endoscopic Discectomy & Spinal Decompression"
        description="Minimally invasive spinal decompression and disc repair for sciatica, disc herniation, and spinal canal stenosis."
        bodyLocation="Spine / Lumbar Region"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Back Pain & Spine Center</li>
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
            Center for Spine & Neurological Care
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Comprehensive Back Pain & <br /> <span className="text-[#f98825]">Spine Surgery in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Relieve sciatica, herniated discs, and spinal stenosis with Salem&apos;s leading spine surgeons. Advanced minimally invasive decompression and non-surgical nerve interventions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Spine Consultation
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Spine Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Precision Spinal Diagnostics & Care in Salem</h2>
              <p>
                Severe back pain and nerve radiculopathy affect mobility, sleep, and work productivity. At <strong>Valli Super Specialty Hospital</strong>, our specialized spine division is led by <strong>Dr. T. Natanasabapathy</strong> and <strong>Dr. K. N. Jotheesvar</strong>. We offer an integrated pathway from high-resolution digital imaging and diagnostic nerve blocks to micro-endoscopic discectomy and spinal fusion.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Non-Surgical Interventions</h3>
                <p className="text-base text-gray-600">Ultrasound-guided transforaminal epidural injections, facet joint nerve blocks, and targeted core decompression physical therapy.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Minimally Invasive Spine Surgery</h3>
                <p className="text-base text-gray-600">Micro-endoscopic discectomy and keyhole spinal decompression resulting in minimal muscle trauma, reduced blood loss, and rapid discharge.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">Spinal Conditions We Treat</h2>
              <ul className="grid sm:grid-cols-2 gap-4 mt-4">
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Lumbar & Cervical Disc Herniation
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Sciatica & Radicular Nerve Compression
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Spinal Canal Stenosis
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Spondylolisthesis (Slipped Vertebra)
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Degenerative Disc Disease & Spondylosis
                </li>
                <li className="bg-white p-4 rounded-xl border border-gray-100 font-semibold text-[#00333c] flex items-center gap-3">
                  <span className="text-[#f98825] font-black">✓</span> Vertebral Fractures & Trauma Care
                </li>
              </ul>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Spine Specialists</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience, 10,000+ successful musculoskeletal procedures, FIJR (Germany).</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Spine & Joint Specialist</div>
                  <div className="text-xl font-bold text-white">Dr. K. N. Jotheesvar</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Spine Surgery & Arthroplasty (FIAS, FIJR), specialized in spinal segment stabilization.</p>
                  <Link href="/doctors/dr-jothiswar" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
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
          <h2 className="text-3xl font-bold mb-4">Consult Salem&apos;s Spine Specialists Today</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Do not let back pain or sciatica control your life. Schedule your consultation at Valli Super Specialty Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Schedule Spine Consultation
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics & Specialties</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/interventional-ultrasound-pain-management" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Ultrasound Pain Clinic</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture & Trauma Clinic</Link></li>
            <li><Link href="/neurosurgery-neurological-care" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Neurosurgery & Nerve Care</Link></li>
            <li><Link href="/iyakkam" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam Spine Rehab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
