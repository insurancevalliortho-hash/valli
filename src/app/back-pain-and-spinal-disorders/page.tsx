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
                  Back Pain and Spinal <br/> <span className="text-[#f98825]">Disorders Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>The Back Pain and Spinal Disorders Clinic provides comprehensive clinical evaluation, precise neurological diagnosis, and multidisciplinary treatment for an extensive array of axial skeletal conditions. The clinical approach is firmly rooted in relieving neurological compression, stabilizing compromised spinal segments, and restoring healthy axial biomechanics.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>Spinal pathologies represent some of the most debilitating conditions in orthopedic medicine. Conditions ranging from intervertebral disc herniation and spondylolisthesis to advanced degenerative disc disease profoundly limit functionality due to severe mechanical back pain and radicular nerve symptoms. The clinic evaluates the biomechanical loading of the cervical, thoracic, and lumbar spine, employing a carefully tiered therapeutic approach.</p>
      <p>The initial line of defense relies heavily on structured non-operative management. This includes targeted physical therapy, postural correction, dynamic core stabilization exercises designed to unweight the intervertebral discs, and guided lifestyle modifications.</p>
      <p>When conservative measures plateau, the clinic transitions to highly advanced Interventional Pain Management. Utilizing state-of-the-art ultrasound guidance, specialists administer precise nerve blocks and epidural injections. This regional neural blockade intentionally and selectively interrupts nociceptive signal transmission, providing significant, localized pain relief. This intervention is critical as it facilitates patient participation in aggressive physical rehabilitation without exposing them to the systemic side effects, cognitive impairment, or dependency risks associated with high-dose oral opioid analgesics.</p>
      <p>For patients presenting with severe neurological compromise, intractable pain, or gross structural instability, the clinic provides advanced surgical options. These highly technical procedures focus on neural decompression and sophisticated spinal fusion techniques to restore structural integrity, relieve spinal cord or nerve root impingement, and halt progressive neurological deficits.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
