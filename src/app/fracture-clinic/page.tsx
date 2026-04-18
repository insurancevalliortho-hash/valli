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
                  The Fracture <br/> <span className="text-[#f98825]">Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Operating under the profound physiological core philosophy that "Movement is Life" and "Life is Movement," the Fracture Clinic provides rapid, comprehensive emergency fracture management. By integrating multiple surgical and medical sub-specialties, the clinic's hero objective is to achieve the earliest possible functional, anatomical, and cosmetic recovery of high-energy trauma victims.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>High-energy trauma, such as motor vehicle collisions or severe falls, requires a highly choreographed, interdisciplinary physiological response.</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Advanced Diagnostics and Collaborative Care:</strong> Time is tissue in the trauma setting. Utilizing rapid X-ray, USG, and CT imaging, orthopedic surgeons evaluate the extent of osseous fragmentation. Concurrently, vascular and plastic surgeons critically assess and manage limb-threatening injuries to surrounding peripheral nerves, major blood vessels, and the vital soft tissue envelope.</li>
        <li><strong>Emergency ER Interventions:</strong> Immediate, life-and-limb-saving care includes thorough wound debridement under anesthesia to prevent catastrophic osteomyelitis in open fractures, closed anatomical reductions of joint dislocations, precise splinting, and digit closure.</li>
        <li><strong>Major Trauma Reconstructive Surgery:</strong> The facility possesses the advanced surgical infrastructure required to handle the most complex, life-threatening presentations. Procedures include external pelvic fixation (often intricately coordinated with urological or abdominal surgeons to manage massive internal hemorrhage), joint-spanning external fixation for major dislocations threatening vascular occlusion, replant surgery for traumatic limb and digit amputations, and emergency fasciotomies to relieve limb-threatening acute compartment syndrome.</li>
        <li><strong>Holistic Recovery Dynamics:</strong> The clinical protocol dictates that treatment is not considered complete merely upon bone union. True recovery requires that the bone, skin, arteries, veins, and nerves have all successfully and synergistically healed. This is driven by the very early integration of the rehabilitation team into the acute treatment plan to preemptively navigate physiological obstacles in the recovery process, ensuring continuity of care through home health protocols and subsequent clinical reviews.</li>
      </ul>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
