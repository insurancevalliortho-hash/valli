import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Paediatric Orthopaedics & Child Bone Specialist in Salem | Valli Hospital",
  description: "Specialized Pediatric Orthopedic & Deformity Clinic in Salem at Valli Super Specialty Hospital. Expert treatment for clubfoot (Ponseti method), pediatric fractures, scoliosis, knock knees, bow legs, and congenital limb deformities.",
  keywords: [
    "paediatric orthopaedics Salem",
    "pediatric orthopedic near me",
    "children bone specialist Salem",
    "kids bone doctor near me",
    "clubfoot treatment Salem",
    "knock knee treatment Salem",
    "bow legs doctor Salem",
    "pediatric ortho doctor near me",
    "child orthopaedic hospital Tamil Nadu",
    "limb deformity correction Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/paediatric-orthopaedics-deformity-clinic",
  },
  openGraph: {
    title: "Child Orthopedics & Deformity Clinic Salem | Valli Hospital",
    description: "Gentle, expert bone and joint care for infants, children, and adolescents by senior pediatric orthopedic specialists in Salem.",
    url: "https://www.vallihospital.in/paediatric-orthopaedics-deformity-clinic",
    type: "website",
  }
};

export default function PaediatricOrthopaedicsPage() {
  const faqList = [
    {
      question: "What conditions are treated at the Pediatric Orthopedic Clinic in Salem?",
      answer: "We treat congenital clubfoot (CTEV), developmental dysplasia of the hip (DDH), bow legs (genu varum), knock knees (genu valgum), pediatric fractures, bone infections (osteomyelitis), and juvenile scoliosis."
    },
    {
      question: "What is the Ponseti method for clubfoot correction?",
      answer: "The Ponseti method is a gentle, non-surgical technique using a series of specialized weekly plaster casts to gradually correct clubfoot in newborns, followed by a minor Achilles tenotomy if needed and bracing."
    },
    {
      question: "When should parents consult a pediatric bone specialist for bow legs or knock knees?",
      answer: "While mild bowing or knock knees can be part of normal developmental stages, consultation is essential if the deformity is asymmetrical, worsens after age 2 for bow legs or age 7 for knock knees, causes pain, or leads to an abnormal limp."
    },
    {
      question: "How are childhood fractures managed differently from adults?",
      answer: "Children's bones contain delicate growth plates (physeal plates) that dictate future bone growth. Our specialists utilize specialized pediatric reduction and minimally invasive flexible k-wires to safeguard growth plates and prevent limb length discrepancy."
    },
    {
      question: "Who leads the Pediatric Orthopedics service at Valli Hospital?",
      answer: "Our pediatric orthopedic team is led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon) in coordination with Dr. Parthiban (Consultant Pediatrician) and Dr. Sultana Dhilras (Pediatric Surgeon)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Pediatric Orthopedics', url: 'https://www.vallihospital.in/paediatric-orthopaedics-deformity-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Pediatric Orthopedics & Deformity Correction Center"
        description="Comprehensive child bone care, clubfoot casting, growth modulation, and deformity correction in Salem."
        url="https://www.vallihospital.in/paediatric-orthopaedics-deformity-clinic"
      />
      <MedicalProcedureSchema
        name="Ponseti Clubfoot Casting & Guided Growth Deformity Correction"
        description="Non-surgical casting for congenital clubfoot and 8-plate guided growth for pediatric angular limb deformities."
        bodyLocation="Lower Limbs / Pediatric Skeletal System"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Pediatric Orthopedics</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-16 overflow-hidden text-left">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45 blur-2xl" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                Specialty Clinic
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                Paediatric Orthopaedics <br /> <span className="text-[#f98825]">&amp; Deformity Clinic</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Gentle, specialized care for growing children. From Ponseti clubfoot treatment to guided growth for knock knees, bow legs, and pediatric fractures.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/book-appointment"
                  className="bg-[#f98825] hover:bg-[#e0751e] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
                >
                  Book Child Consultation
                </Link>
                <a
                  href="tel:+919003417111"
                  className="px-7 py-3.5 bg-white/10 text-white font-bold text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                >
                  📞 Child Helpline: +91 90034 17111
                </a>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-xs sm:max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#00333c] border border-white/10">
                  <Image
                    src="/SpeakersIMG/Dr.tamilkumaran.jpeg"
                    alt="Dr. Tamilkumaran"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 text-left space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#f98825] uppercase block">
                    Paediatric Orthopedic Specialist
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dr. Tamilkumaran</h3>
                  <p className="text-xs text-gray-300 font-medium">
                    MBBS, DNB ORTHOPEDICS
                  </p>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#f98825] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-white/20">
                  Lead Specialist
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Dedicated Orthopedic Care for Growing Bones</h2>
              <p>
                A child&apos;s musculoskeletal system is constantly growing and remodelling. At <strong>Valli Super Specialty Hospital</strong>, our pediatric orthopedic team combines clinical gentleness with specialized surgical and non-surgical deformity correction techniques to ensure children develop healthy, straight, and fully functional limbs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">👶</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Ponseti Clubfoot Program</h3>
                <p className="text-base text-gray-600">Gold-standard non-surgical weekly corrective casting for congenital talipes equinovarus (CTEV), achieving full normal foot posture without major invasive surgery.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Guided Growth (Hemi-epiphysiodesis)</h3>
                <p className="text-base text-gray-600">Minimally invasive tension-band plate application that harnesses the child&apos;s natural growth to gently straighten severe knock knees and bow legs.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Multidisciplinary Pediatric Team</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">15+ years experience in congenital deformity correction, pediatric trauma, and growth plate preservation.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Consultant Paediatrician</div>
                  <div className="text-xl font-bold text-white">Dr. Parthiban</div>
                  <p className="text-sm text-gray-300 mt-2">Expert in neonatal assessment, childhood development, and comprehensive pediatric clinical care.</p>
                  <Link href="/doctors/dr-parthiban" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Give Your Child the Best Start in Mobility</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Schedule a pediatric orthopedic consultation with our compassionate specialists at Valli Super Specialty Hospital.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Child Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
            <li><Link href="/foot-and-ankle-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Foot & Ankle Center</Link></li>
            <li><Link href="/genetic-testing" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Genetic Testing Lab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
