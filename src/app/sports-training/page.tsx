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
                  Sports Training <br/> <span className="text-[#f98825]">and Rehabilitation</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Overview</h2>
      <p>To seamlessly complement the insights derived from genetic testing and the surgical interventions of the medical teams, the Sports Training division focuses intensely on injury prophylaxis and structured physiological reintegration.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Biomechanical Mapping & Reintegration</h2>
      <p>The core of this service is Biomechanical Mapping. Utilizing advanced kinematic analysis, experts evaluate the athlete's bodily movements to precisely identify "danger areas"—subtle biomechanical misalignments, asymmetric loading patterns, or muscular imbalances that disproportionately increase joint shear stress during high-velocity performance.</p>
      <p>Armed with this data, a performance training team comprising experts with decades of experience coaching elite athletes designs highly individualized injury prevention plans. When an injury has occurred, this team manages a programmatic reintegration process. By gradually reintroducing the athlete to competitive stresses, they ensure that reconstructed ligaments and healing bone adapt to mechanical loading according to the physiological principles of Wolff's Law (bone adaptation) and Davis's Law (soft tissue adaptation), thereby strictly mitigating the risk of catastrophic re-injury.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
