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
                  The Joint Care <br/> <span className="text-[#f98825]">Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>The Joint Care Clinic operates as a dedicated center for the comprehensive, evidence-based management of both acute and chronic joint pain. The hero objective of this department maps directly to alleviating debilitating discomfort, rebuilding musculoskeletal strength, and promoting optimal joint kinematics for patients suffering from degenerative or inflammatory arthropathies. The clinic operates on a core philosophy of joint preservation whenever possible, addressing pathologies across all major human articulations, including the knees, hips, shoulders, ankles, elbows, and wrists.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>The degradation of articular cartilage, whether induced by primary osteoarthritis, inflammatory conditions such as rheumatoid arthritis, or post-traumatic arthritis following severe injury, initiates a cascading biomechanical failure. This failure alters load distribution, induces subchondral bone sclerosis, and severely limits patient mobility and quality of life. The Joint Care Clinic utilizes a rigorously tiered intervention strategy to combat these biomechanical failures.</p>
      <p>Precision in joint care relies intrinsically on accurate spatial and anatomical mapping. To this end, the clinic utilizes advanced Magnetic Resonance Imaging (MRI), High-Resolution Ultrasound (USG), Computed Tomography (CT), and comprehensive X-ray imaging. A critical component of their diagnostic protocol is the acquisition of full-length lower limb radiographs, capturing the entire skeletal structure from the hip to the ankle in multiple anatomical planes. This full-length imaging is absolutely critical for assessing mechanical axis deviation and planning precise corrective osteotomies or arthroplasties.</p>
      <p>Conservative management forms the first line of defense. The department employs non-invasive, standardized periodic function assessments to guide customized "return to function" protocols. These protocols encompass intensive physical therapy, pharmacological management, and detailed musculoskeletal strength and gait analysis to correct compensatory movement patterns. When conservative measures are exhausted and articular degradation is severe, the clinic provides joint salvage procedures and complex reconstructive surgeries, including primary and revision total joint replacements (arthroplasty). Furthermore, the department specifically caters to patients arriving with complex complications from previous treatments performed at other institutions, offering targeted, highly specialized surgical solutions for failed arthroplasties.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
