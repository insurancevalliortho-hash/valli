import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Sports Injury Clinic & ACL Surgery in Salem | Keyhole Arthroscopy | Valli Hospital",
  description: "Specialized Sports Injury Clinic & Arthroscopy Center in Salem at Valli Hospital. Advanced ACL/PCL ligament reconstruction, meniscus repair, rotator cuff treatment & cashless insurance.",
  keywords: [
    "acl surgery in salem",
    "acl tear treatment salem",
    "sports injury clinic salem",
    "sports medicine doctor in salem",
    "arthroscopy surgery in salem",
    "keyhole joint surgery salem",
    "sports injury doctor near me",
    "meniscus surgery salem",
    "shoulder arthroscopy salem",
    "ligament repair hospital tamil nadu",
    "sports physiotherapy salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/sports-injury-clinic",
  },
  openGraph: {
    title: "Sports Injury Clinic & ACL Surgery Center Salem | Valli Hospital",
    description: "Minimally invasive keyhole arthroscopy, ACL reconstruction, and rapid return-to-sport programs by leading orthopedic sports specialists in Salem. Cashless insurance support.",
    url: "https://www.vallihospital.in/sports-injury-clinic",
    type: "website",
  }
};

export default function SportsInjuryClinicPage() {
  const faqList = [
    {
      question: "What are the most common sports injuries treated at Valli Hospital?",
      answer: "We frequently treat anterior cruciate ligament (ACL) and posterior cruciate ligament (PCL) tears, meniscus tears, shoulder labral (Bankart) tears, rotator cuff tears, ankle ligament sprains, and hamstring muscle avulsions."
    },
    {
      question: "What is Keyhole Arthroscopic ACL Reconstruction?",
      answer: "Arthroscopic ACL reconstruction is a minimally invasive keyhole procedure where a high-definition 4K camera is inserted through tiny 4mm incisions to reconstruct the torn ligament using a strong autograft (hamstring or bone-patellar tendon). It ensures minimal scarring, faster healing, and lower post-op pain."
    },
    {
      question: "Does health insurance cover ACL reconstruction and arthroscopic ligament surgery?",
      answer: "Yes. ACL reconstruction and arthroscopic meniscus/ligament repairs are fully eligible for cashless health insurance claims. Valli Hospital provides direct cashless processing with Star Health, Medi Assist, Vidal Health, ICICI Lombard, HDFC ERGO, and other leading insurers."
    },
    {
      question: "How long does recovery take after ACL surgery?",
      answer: "Patients walk with crutches within 24 hours. Light jogging and straight-line running typically resume at 3 to 4 months, while full return to high-demand cutting sports (football, cricket, badminton) occurs around 6 to 9 months following our structured sports rehab protocol."
    },
    {
      question: "Can meniscus tears heal without surgery?",
      answer: "Minor tears in the outer 'red zone' of the meniscus with good blood supply may heal with rest, physiotherapy, and ultrasound-guided PRP injections. Complex tears or mechanical locking of the knee require arthroscopic meniscus repair or partial meniscectomy."
    },
    {
      question: "Who leads the Sports Injury & Arthroscopy team?",
      answer: "Our sports surgery department is led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon with fellowships in arthroscopy from South Korea) and Dr. E. Aakash (FIFA Diploma in Football Medicine)."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Sports Injury Clinic', url: 'https://www.vallihospital.in/sports-injury-clinic' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Sports Medicine & Keyhole Arthroscopy Center"
        description="Comprehensive athletic injury management, ligament reconstruction, and return-to-sport rehabilitation in Salem."
        url="https://www.vallihospital.in/sports-injury-clinic"
      />
      <MedicalProcedureSchema
        name="Arthroscopic ACL Reconstruction & Meniscus Repair"
        description="Minimally invasive 4K arthroscopic anatomic ligament reconstruction and meniscus preservation."
        bodyLocation="Knee Joint / Shoulder Joint / Musculoskeletal System"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Sports Injury Clinic</li>
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
                Sports Injury <br /> <span className="text-[#f98825]">Clinic</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Dedicated acute and chronic athletic trauma rehabilitation, arthroscopic keyhole repairs, and ligament reconstructions in Salem.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/book-appointment"
                  className="bg-[#f98825] hover:bg-[#e0751e] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
                >
                  Book Sports Injury Consultation
                </Link>
                <a
                  href="tel:+919003417111"
                  className="px-7 py-3.5 bg-white/10 text-white font-bold text-sm rounded-full border border-white/20 hover:bg-white/20 transition-all"
                >
                  📞 Athlete Helpline: +91 90034 17111
                </a>
              </div>
            </div>

            {/* Right Doctor Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-xs sm:max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
                <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-[#00333c] border border-white/10">
                  <Image
                    src="/SpeakersIMG/natanasabapathy.jpeg"
                    alt="Dr. T. Natanasabapathy"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 text-left space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#f98825] uppercase block">
                    Chief Orthopedic Surgeon
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dr. T. Natanasabapathy</h3>
                  <p className="text-xs text-gray-300 font-medium">
                    MBBS, MS(ORTHO), FIAS, FDFM
                  </p>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#f98825] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg border border-white/20">
                  Chief Surgeon
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
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Elite Athletic Care & Minimally Invasive Arthroscopy</h2>
              <p>
                Sports injuries require rapid diagnosis, anatomical ligament repair, and structured return-to-play protocols. At <strong>Valli Super Specialty Hospital</strong>, our sports medicine division integrates fellowship-trained arthroscopic surgeons with cutting-edge rehabilitation technology at <strong>Iyakkam</strong> to ensure athletes regain full speed, agility, and joint stability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Arthroscopic ACL Reconstruction</h3>
                <p className="text-base text-gray-600">High-definition 4K keyhole surgery reconstructing the anterior cruciate ligament with exact anatomical tunnel placement and rigid fixation.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Meniscus & Cartilage Repair</h3>
                <p className="text-base text-gray-600">Advanced inside-out and all-inside meniscus suturing techniques that preserve shock-absorbing cartilage and prevent early osteoarthritis.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Sports Orthopedic Specialists</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Arthroscopy Surgeon</div>
                  <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                  <p className="text-sm text-gray-300 mt-2">Fellowship in Advanced Arthroscopy & Sports Medicine (South Korea), 10,000+ procedures.</p>
                  <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                    View Doctor Profile &rarr;
                  </Link>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Sports Medicine Registrar</div>
                  <div className="text-xl font-bold text-white">Dr. E. Aakash</div>
                  <p className="text-sm text-gray-300 mt-2">FIFA Diploma in Football Medicine (FDFM) & Fellowship in Joint Replacement (FIJR).</p>
                  <Link href="/doctors/dr-aakash" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
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
          <h2 className="text-3xl font-bold mb-4">Fast-Track Your Return to Sport</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Consult Salem&apos;s leading sports injury surgeons for accurate diagnosis, MRI review, and treatment.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Sports Injury Appointment
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/arthroscopy" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Arthroscopy Center</Link></li>
            <li><Link href="/sports-medicine-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Medicine Clinic</Link></li>
            <li><Link href="/iyakkam/ai-sports-rehab" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Iyakkam AI Sports Rehab</Link></li>
            <li><Link href="/sports-training" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Performance Training</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
