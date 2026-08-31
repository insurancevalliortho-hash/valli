import React from 'react';
import Image from 'next/image';

import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Foot & Ankle Clinic Salem | Flatfoot, Plantar Fasciitis Treatment | Valli Hospital",
  description: "Specialised foot and ankle care in Salem at Valli Super Specialty Hospital. Expert treatment for plantar fasciitis, Achilles tendon injuries, flatfoot, ankle fractures, hallux valgus, and complex foot deformities. Surgical and conservative options.",
  keywords: [
      "foot and ankle clinic Salem",
      "plantar fasciitis treatment Salem",
      "Achilles tendon repair Salem",
      "flatfoot treatment Salem",
      "ankle fracture Salem",
      "hallux valgus surgery Salem",
      "foot pain specialist Salem",
      "ankle arthroscopy Salem"
  ],
  alternates: {
    canonical: `https://www.vallihospital.in/foot-and-ankle-clinic`,
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
        { name: 'Foot and Ankle Clinic', url: 'https://www.vallihospital.in/foot-and-ankle-clinic' }
      ]} />
      <FAQSchema questions={[
        { question: 'What is the Foot and Ankle Clinic?', answer: 'The Foot and Ankle Clinic at Valli Super Specialty Hospital provides advanced, specialized care for related conditions.' },
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
            <li className="text-[#f98825] truncate" aria-current="page">Foot and Ankle Clinic</li>
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
                The Foot and Ankle <br /> <span className="text-[#f98825]">Clinic</span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                Expert diagnosis and surgical-to-conservative management of distal lower extremity diseases, flatfoot, and diabetic limb salvage.
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
                    src="/SpeakersIMG/aakash.jpeg"
                    alt="Dr. E. Aakash"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-4 text-left space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#f98825] uppercase block">
                    Foot &amp; Ankle Specialist
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">Dr. E. Aakash</h3>
                  <p className="text-xs text-gray-300 font-medium">
                    MBBS, MS ORTHO, FIJR, FIOT, FDFM
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

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">

            <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
            <p>The Foot and Ankle Clinic is dedicated to the highly specialized diagnosis and conservative-to-surgical management of all distal lower extremity diseases. The clinical hero objective maps directly to restoring ambulation, managing complex congenital or acquired deformities, and salvaging compromised limbs to facilitate a rapid return to daily, pain-free activities.</p>

            <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
            <p>The human foot is a marvel of biomechanical engineering, comprising 26 bones, 33 joints, and over a hundred stabilizing muscles, tendons, and ligaments. Pathologies in this highly loaded region disrupt the entire kinetic chain, altering gait mechanics and inevitably inducing secondary, compensatory pain in the knees, hips, and lumbar spine.</p>
            <p>A cornerstone of this department is Diabetic Foot Salvage. Chronic hyperglycemia induces peripheral neuropathy and microvascular arterial disease, frequently leading to silent trauma, severe ulceration, and catastrophic deep-tissue infections. The clinic employs meticulous foot hygiene protocols, specialized orthotic offloading, and aggressive surgical debridement to arrest necrotic spread, thereby preventing fatal complications and avoiding devastating limb amputations.</p>
            <p>Another highly specialized service is the management of Hansen’s Disease (Leprosy). Characterized by profound sensory loss, muscle weakness, and distinct dermatological manifestations, the disease induces severe neuropathic deformities. The clinic manages this chronic infectious disease with rigorous 6 to 12-month multi-drug therapy regimens, alongside targeted antibiotics and corticosteroids to arrest bacterial proliferation and mitigate devastating immunological nerve damage.</p>
            <p className="mt-4">The clinic expertly manages complex inflammatory and arthritic conditions:</p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li><strong>Gouty Arthritis:</strong> Managed through precise pharmacological intervention designed to lower serum uric acid levels, thereby preventing the painful crystallization of monosodium urate within the articular spaces, most commonly affecting the first metatarsophalangeal joint.</li>
              <li><strong>Rheumatoid Foot:</strong> The chronic, systemic inflammation of small foot joints is managed aggressively to halt progressive articular destruction and gross anatomical deformity.</li>
              <li><strong>Subtalar Arthritis:</strong> When potent anti-inflammatory medications fail to alleviate the severe, functionally limiting pain associated with weight-bearing in the hindfoot, the clinic performs highly technical subtalar arthrodesis (fusion) surgeries to mechanically stabilize the joint.</li>
              <li><strong>Enthesiopathies:</strong> Painful inflammation at the exact insertion sites of tendons and ligaments into bone is addressed through specific physical therapy regimens, lifestyle modifications, and targeted non-steroidal anti-inflammatory administration.</li>
            </ul>

          </div>
        </div>
      </section>


      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialties</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            <li><a href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</a></li><li><a href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</a></li><li><a href="/sports-injury-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Sports Injury Clinic</a></li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
