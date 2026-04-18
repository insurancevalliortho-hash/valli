import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-[#001f25] pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
                Speciality Clinic
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
                  The Foot and Ankle <br/> <span className="text-[#f98825]">Clinic</span>
              </h1>
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

      <Footer />
    </>
  );
}
