import React from 'react';
import Image from 'next/image';

import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sports Medicine Clinic Salem | Athletic Performance & Injury Prevention | Valli Hospital",
  description: "Comprehensive sports medicine services in Salem at Valli Super Specialty Hospital. Expert diagnosis, treatment, and prevention of sports-related injuries for professional and amateur athletes. PRP therapy, physiotherapy, and return-to-sport protocols.",
  keywords: [
      "sports medicine Salem",
      "sports medicine clinic Salem",
      "PRP therapy Salem",
      "athlete injury treatment Salem",
      "sports rehabilitation Salem",
      "sports physiotherapy Salem",
      "injury prevention sports Tamil Nadu",
      "sports doctor Salem"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/sports-medicine-clinic`,
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
        { name: 'Sports Medicine Clinic', url: 'https://www.vallihospital.in/sports-medicine-clinic' }
  ]} />
      <FAQSchema questions={[
        { question: 'What is the Sports Medicine Clinic?', answer: 'The Sports Medicine Clinic at Valli Super Specialty Hospital provides advanced, specialized care for related conditions.' },
        { question: 'Who is the lead doctor?', answer: 'Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, leads our specialized care teams.' }
      ]} />
  

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Sports Medicine Clinic</li>
          </ol>
        </nav>
      </div>
  
      
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
                The Sports Medicine <br /> <span className="text-[#f98825]">Clinic</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Premier referral institute for sports science, athletic physical assessments, and non-surgical orthobiologic therapies.
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

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Functioning as the region&apos;s premier tertiary referral institute for sports science and medicine, this clinic provides holistic, scientifically grounded support to elite professional athletes, collegiate competitors, and recreational enthusiasts. The clinic&apos;s purview encompasses sports physical assessments, performance enhancement strategies, sophisticated biomechanical analysis, sports psychology, and clinical nutrition, all integrated to ensure a rapid, sustainable return to play.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>Athletic performance and recovery exist at the precise intersection of musculoskeletal integrity, cardiovascular endurance, and psychological resilience. The multidisciplinary team—comprising fellowship-trained orthopedic experts, sports physiologists, sports physiotherapists, and clinical nutritionists—addresses these physiological facets simultaneously.</p>
      <p>Every individual athlete undergoes an exhaustive, systematic medical examination. This protocol involves the meticulous documentation of family history and a rigorous assessment of the cardiac, respiratory, musculoskeletal, and nervous systems. This systematic documentation is vital for uncovering hidden pathophysiologies, such as underlying connective tissue disorders or subclinical cardiac anomalies, that could pose an existential threat to an athlete&apos;s life or career under extreme physical exertion.</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Cruciate Ligament (ACL/PCL) Pathologies:</strong> Injuries to the anterior and posterior cruciate ligaments drastically destabilize the knee joint. These are managed through dynamic functional bracing, intense physical therapy, or advanced arthroscopic ligament reconstruction, strictly dependent on the mechanical stability of the joint and the athletic demands of the patient.</li>
        <li><strong>Acromioclavicular (AC) Joint and Shoulder Kinematics:</strong> Traumatic impacts or repetitive overhead motions lead to AC joint separations and rotator cuff pathology. These are addressed via tailored strengthening regimens to restore the scapulohumeral rhythm, targeted anti-inflammatory protocols, and precise splinting.</li>
        <li><strong>Epicondylitis (Tennis Elbow):</strong> This painful tendinopathy is managed with a strong emphasis on conservative therapy for 6 to 12 months, utilizing eccentric loading exercises before considering arthroscopic or open tendon debridement.</li>
        <li><strong>Achilles Tendon Rupture and Clavicle Fractures:</strong> Managed through a coordinated pathway of acute immobilization, surgical repair when biomechanically necessary, and aggressive physical therapy.</li>
      </ul>
      <p className="mt-4">Beyond acute injury management, biomechanical experts at the clinic map the athlete&apos;s specific movement patterns, suggesting subtle but highly impactful alterations in technique. These biomechanical optimizations reduce shear forces on vulnerable joints and optimize kinetic energy transfer, thereby improving overall play standards. Recognizing the profound psychological burden of repeated failure or severe injury, the clinic provides scheduled psychological evaluations and therapy sessions aimed at maintaining the athlete&apos;s &ldquo;optimal zone of functionality&rdquo;. Simultaneously, individualized nutritional and performance-enhancing supplement plans are crafted by experts to support rapid tissue repair and meet immense metabolic demands. The clinic also extends its reach directly to the sporting arena, providing on-field injury management and an ambulance facility equipped with advanced life support for immediate trauma response.</p>
    
              </div>
          </div>
      </section>

      
      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
<li><Link href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</Link></li>
<li><Link href="/sports-training" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Training</Link></li>
          </ul>
        </div>
      </section>
  
<Footer />
    </>
  );
}
