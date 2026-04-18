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
                Clinical Service
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
                  Arthroscopy <br/> <span className="text-[#f98825]">Services</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Overview</h2>
      <p>Arthroscopy represents the absolute forefront of minimally invasive orthopedic surgery, offering profound physiological benefits over traditional open surgical techniques. Utilizing a highly specialized, slender, flexible arthroscope equipped with high-definition optical fibers and magnifying lenses, surgeons can illuminate and directly visualize the intricate internal architecture of a joint on a high-resolution digital monitor.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Clinical Applications and Mechanisms</h2>
      <p>This advanced modality is predominantly employed for diagnosing and repairing complex ligamentous and meniscal damage in the knee, shoulder, wrist, elbow, and ankle. However, its utility at Valli Hospital extends significantly beyond common sports injuries. Arthroscopy is highly effective for surgically stabilizing recurrent shoulder dislocations, addressing painful focal cartilage defects, and managing vascular growths or tumors arising from the joint synovium. Furthermore, it allows for the precise, minimally invasive biopsy of intra-articular tumors and the rapid, life-saving debridement of septic joint infections, which is particularly critical for minimizing systemic stress in elderly or immunocompromised patients.</p>

      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Physiological and Procedural Benefits</h2>
      <p>The clinical transition from extensive open arthrotomy to keyhole arthroscopy fundamentally alters the patient's recovery trajectory. By avoiding massive incisions through healthy muscle and capsular tissue, arthroscopy significantly reduces intraoperative blood loss and drastically minimizes iatrogenic soft tissue trauma. Consequently, the risk of postoperative nosocomial infection plummets. Patients experience substantially less postoperative pain, leading to a drastically reduced reliance on potentially addictive opioid analgesics. This minimal tissue disruption facilitates vastly accelerated rehabilitation timelines, often allowing patients to safely resume normal daily activities and load-bearing within mere days, provided they strictly adhere to post-operative protocols including smoking cessation and stringent incision hygiene.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
