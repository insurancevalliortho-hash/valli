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
                  Paediatric Orthopaedics <br/> <span className="text-[#f98825]">& Deformity Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Recognizing the fundamental physiological truth that the anatomical, physiological, and psychological development of a child is not merely a scaled-down version of an adult, this clinic is entirely dedicated to the specialized care of the growing skeleton. The ultimate goal is to maximize the functionality and independence of children suffering from congenital or developmental musculoskeletal and neuromuscular anomalies.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>The presence of a musculoskeletal deformity subjects a developing child to significant physiological limitations and profound, often lifelong, psychosocial stigmatization. The clinic rejects a purely mechanical approach, instead adopting a highly inclusive, multidisciplinary diagnostic framework that explicitly factors in the medical, socioeconomic, and cultural variables influencing a child's overall health and development.</p>
      <p>The clinical team treats a vast and complex array of conditions. These encompass congenital anomalies (present at birth) and developmental disorders (appearing during skeletal maturation). The scope includes clubfoot (talipes equinovarus), club hand, severe limb length discrepancies, intoeing gait, arthrogryposis multiplex congenita, and complex post-fracture deformities affecting the physis (growth plate). Furthermore, the clinic expertly manages systemic genetic conditions such as Duchenne muscular dystrophy, Osteogenesis Imperfecta (brittle bone disease), profound growth dysplasias like dwarfism, and inflammatory conditions such as juvenile arthritis and axial spondyloarthritis. The clinic is also equipped to manage highly aggressive pediatric bone tumors, including Osteosarcoma, Osteochondroma, and Ewing’s sarcoma.</p>
      <p>Early and precise intervention is paramount to leverage the remodeling potential of the immature skeleton. The clinic utilizes sequential cast correction, most notably the Ponseti method for clubfoot, alongside the application of custom-fabricated orthotic braces and callipers. Pharmacological interventions are advanced, utilizing Botox injections to manage severe muscular spasticity in neuromuscular disorders, hormonal therapies for growth regulation, and coordinated chemotherapy for oncological presentations.</p>
      <p>When anatomical correction is strictly required, surgeons perform highly nuanced growth regulation surgeries (epiphysiodesis), complex spinal surgeries for early-onset scoliosis, and precise angular deformity corrections. Reconstructive plastic surgery is seamlessly integrated to correct congenital digit anomalies such as syndactyly (conjoined or webbed fingers) and polydactyly (supernumerary digits).</p>
      <p>A unique and highly compassionate feature of this department is its dedication to long-term psychosocial support. The clinic maintains a meticulous disease registry for epidemiological documentation and actively encourages families to enroll in targeted support groups for rare conditions like Osteogenesis Imperfecta. Continuous follow-up, educational support for parents, and uninterrupted rehabilitation sessions are provided until the child reaches a state of functional independence.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
