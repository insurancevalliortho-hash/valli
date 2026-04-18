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
                  Failed Surgery <br/> <span className="text-[#f98825]">Corrections Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Musculoskeletal surgeries, despite rigorous planning, do not universally yield positive outcomes. The Failed Surgery Corrections Clinic acts as a highly specialized safety net, addressing complex scenarios where primary operative interventions fail to resolve symptoms, induce chronic pain, or inadvertently introduce new biomechanical pathologies. Board-certified experts at this clinic conduct forensic-level clinical evaluations to identify the exact etiology of the failure and implement secondary, definitive treatment pathways.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>Surgical failure is a devastating outcome, typically categorized into pre-operative planning errors, intraoperative technical execution errors, and post-operative complications. Through rigorous patient interviews, historical surgical review, and advanced cross-sectional imaging (MRI, CT scans), the multidisciplinary team actively searches for the root cause. This may include surgical misalignment, aseptic hardware loosening, occult deep-space infections, or severe immunological rejection reactions (allergies to metal implants or biological tissue grafts).</p>
      <p>The clinic identifies post-operative activity errors as a leading cause of surgical failure. This complex phenomenon occurs when patients apply excessive biomechanical force prematurely, physically disrupting surgically repaired tissues, or conversely, apply insufficient functional force, leading to the development of dense, restrictive scar tissue (arthrofibrosis) that permanently limits motion. Furthermore, wound-care negligence leading to insidious contamination and subsequent periprosthetic joint infection is heavily scrutinized and aggressively managed.</p>
      <p>Revision surgery is inherently magnitudes more complex than primary surgery due to drastically altered anatomical landmarks, the presence of dense scar tissue, and compromised subchondral bone stock. The clinic utilizes a sophisticated, multidisciplinary salvage protocol that typically combines advanced revision arthroplasty or hardware replacement alongside rigorous, highly monitored physical therapy.</p>
      <p>Crucially, the clinic integrates Behavioral Health into its core protocol. Recognizing the profound psychological devastation, loss of trust, and chronic pain associated with failed orthopedic surgeries, patients are routinely referred to behavioral health specialists. This ensures that emotional resilience and mental health are supported throughout the protracted and often arduous recovery process.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
