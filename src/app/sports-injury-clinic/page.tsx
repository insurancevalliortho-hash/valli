import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Sports Injury & Ligament Surgery Hospital in Salem | ACL, Meniscus | Valli Hospital",
  description: "Advanced Sports Injury Clinic in Salem at Valli Super Specialty Hospital. Specializing in arthroscopic ACL reconstruction, PCL & meniscus repair, rotator cuff surgery, and athlete return-to-play rehabilitation.",
  keywords: [
    "sports injury clinic Salem",
    "ACL surgery Salem",
    "ACL doctor near me",
    "knee ligament reconstruction surgery",
    "treatment for ligament tear",
    "meniscus tear surgery Salem",
    "sports injury doctor near me",
    "sports medicine Salem",
    "rotator cuff surgery Salem",
    "tennis elbow doctor Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/sports-injury-clinic",
  },
  openGraph: {
    title: "Sports Injury & Arthroscopic Ligament Clinic Salem | Valli Hospital",
    description: "Keyhole arthroscopic surgery and accelerated sports rehabilitation for athletes and active individuals in Salem.",
    url: "https://www.vallihospital.in/sports-injury-clinic",
    type: "website",
  }
};

export default function SportsInjuryClinicPage() {
  const faqList = [
    {
      question: "What are the common symptoms of an ACL or ligament tear?",
      answer: "A sudden popping sensation in the knee followed by immediate swelling, inability to bear weight, and a feeling of instability or the knee 'giving way' are classic signs of an ACL ligament rupture."
    },
    {
      question: "Is arthroscopic keyhole surgery required for an ACL tear?",
      answer: "Complete ACL tears causing recurrent knee instability in active individuals typically require Arthroscopic ACL Reconstruction. Minor partial tears may be managed conservatively with PRP regenerative injections, bracing, and specialized sports physiotherapy."
    },
    {
      question: "How long is the recovery timeline for return to sports after ACL surgery?",
      answer: "Jogging and straight-line running typically begin around 3 to 4 months post-surgery. Full clearance for competitive pivoting sports (football, cricket, athletics) occurs around 6 to 9 months, validated by objective biomechanical testing in our Iyakkam AI Sports Rehab lab."
    },
    {
      question: "Do you treat shoulder rotator cuff tears and dislocations?",
      answer: "Yes. We perform minimally invasive arthroscopic rotator cuff repairs, Bankart labral repairs for recurrent shoulder dislocations, and subacromial decompressions."
    },
    {
      question: "Who is the lead sports orthopedic surgeon?",
      answer: "Dr. T. Natanasabapathy (Fellowship in Arthroscopy & Sports Medicine, South Korea) and Dr. E. Aakash (FIFA Diploma in Football Medicine) lead our dedicated sports injury surgical team."
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
        name="Sports Injury & Arthroscopic Surgery Clinic"
        description="Center of excellence for athletic ligament repair, arthroscopy, and functional sports performance restoration in Salem."
        url="https://www.vallihospital.in/sports-injury-clinic"
      />
      <MedicalProcedureSchema
        name="Arthroscopic ACL & Ligament Reconstruction"
        description="Minimally invasive keyhole anatomical reconstruction using hamstring/patellar tendon autografts."
        bodyLocation="Knee & Shoulder Ligaments"
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
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Center for Athletic Medicine & Arthroscopy
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Advanced Sports Injury & <br /> <span className="text-[#f98825]">ACL Surgery in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Precision arthroscopic repair for ACL, PCL, meniscus, and rotator cuff tears. Get back in the game with Salem&apos;s premier sports medicine team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Sports Injury Consultation
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Athlete Helpline: +91 90034 17111
            </a>
  
      
      {/* Hero Section - Concept 1 */}
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
                Dedicated acute and chronic athletic trauma rehabilitation, arthroscopic keyhole repairs, and ligament reconstructions.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/book-appointment"
                  className="bg-[#f98825] hover:bg-[#e0751e] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
                >
                  Book Consultation
                </Link>
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
