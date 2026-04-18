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
                  Orthopedic Oncology <br/> <span className="text-[#f98825]">(Bone Cancer Treatment)</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Overview</h2>
      <p>The management of musculoskeletal malignancies is arguably the most complex discipline within orthopedics, requiring a delicate, highly calculated balance between total oncological eradication and the preservation of a functional limb. The hospital is equipped to treat aggressive, life-threatening pathologies such as Osteosarcoma, Chondrosarcoma, and Ewing's Sarcoma.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Surgical Oncology and Limb-Sparing Mechanisms</h2>
      <p>The fundamental surgical principle driving bone cancer treatment at the institution is "wide excision." This highly precise procedure involves resecting the primary tumor along with a contiguous, meticulously measured margin of completely healthy bone and soft tissue, ensuring that no microscopic cancer cells remain to seed a local recurrence.</p>
      <p>The institution places a paramount, life-altering emphasis on Limb-Sparing Surgeries. Through extraordinarily delicate surgical dissection, orthopedic oncologists isolate and protect adjacent, vital neurovascular bundles, allowing them to safely remove the malignancy without sacrificing the entire extremity. Following the resection of massive segments of the skeletal structure, the resulting void is reconstructed using state-of-the-art, custom-engineered metal prostheses, modular endoprosthetic implants, or massive biological bone grafts. To ensure these implants are protected and incorporated, complex muscle flaps and skin grafting techniques are utilized, promoting rapid vascularization, tissue healing, and the prevention of catastrophic deep infections. Amputation, while psychologically devastating, is judiciously reserved only for complex cases where tumor size, severe neurovascular encasement, or aggressive recurrent nature makes limb salvage mechanically impossible or oncologically unsafe.</p>

      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Adjuvant Medical Oncology</h2>
      <p>Comprehensive cancer treatment plans frequently require systemic intervention. Medical oncologists administer targeted neoadjuvant chemotherapy to downstage (shrink) rapidly growing tumors prior to surgery, facilitating an easier, safer excision. Following physiological recovery from the major surgical resection, adjuvant chemotherapy is administered to hunt down and eradicate any circulating micrometastases. Radiation therapy, utilizing high-energy ionizing radiation to induce DNA damage and apoptosis in cancer cells, is incorporated when tumors are anatomically inoperable (though patients are generally referred to specialized radiation centers for this specific modality).</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
