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
                  Genetic Testing <br/> <span className="text-[#f98825]">for Athletic Performance</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Overview</h2>
      <p>Representing a massive paradigm shift from reactive injury treatment to proactive, deeply personalized physiological optimization, the hospital utilizes advanced genetic sequencing to decode an athlete's innate potential. Modern sports science acknowledges that gene variants (polymorphisms) heavily dictate skeletal muscle properties, cardiovascular response, and baseline metabolic efficiency.</p>
      <p>By mapping the athlete's genome, the hospital transitions fitness programming from generalized protocols to highly precise, scientifically validated regimens tailored to the specific requirements of both elite professionals and leisure exercisers. Favorable genetic components dictate the body's ultimate capacity for endurance, the rate at which hypertrophy occurs, and the pace at which physiological fitness gains are realized.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Evaluated Genetic Traits</h2>
      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-[#00333c] text-white">
            <tr>
              <th className="px-6 py-4 font-semibold text-sm">Evaluated Genetic Trait</th>
              <th className="px-6 py-4 font-semibold text-sm">Physiological Mechanism and Clinical Significance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 font-medium text-[#004b57]">Aerobic Capacity</td>
              <td className="px-6 py-4 text-sm text-gray-700">Analyzes genes regulating cellular oxygen supply pathways. Dictates the body's maximum capacity (VO2 max) to transport and metabolize oxygen to break down fuel stores during sustained exercise.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#004b57]">Anaerobic Capacity</td>
              <td className="px-6 py-4 text-sm text-gray-700">Evaluates the efficiency of anaerobic enzymes and the speed of lactate absorption, determining the total energy volume rapidly available without oxygen utilization.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#004b57]">Endurance</td>
              <td className="px-6 py-4 text-sm text-gray-700">Assesses genetic markers that allow the body to maintain steady-state oxygen use for energy production, enabling prolonged, moderate-intensity activity with minimal systemic exhaustion.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#004b57]">Power</td>
              <td className="px-6 py-4 text-sm text-gray-700">Examines the genetic distribution of fast-twitch (Type II) muscle fibers and vascular oxygen efficiency, predicting the body's capability to generate sudden, explosive bursts of high-intensity kinetic energy.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#004b57]">Flexibility & Tissue Integrity</td>
              <td className="px-6 py-4 text-sm text-gray-700">Maps genes affecting the molecular structure of collagen in ligaments and tendons. Crucial for assessing baseline flexibility and the inherent structural risk of catastrophic tendinopathies, particularly Achilles tendon ruptures.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-medium text-[#004b57]">Muscle Fatigue & Lactate Threshold</td>
              <td className="px-6 py-4 text-sm text-gray-700">Determines the exact point at which lactate accumulation outpaces clearance, and assesses the genetic predisposition to exercise-induced inflammation, directly predicting the onset of crippling muscular weariness.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-[#004b57]">Injury Repair & Fat Loss</td>
              <td className="px-6 py-4 text-sm text-gray-700">Evaluates the genetic rate of inflammatory resolution to dictate precise recovery windows. Also analyzes genes impacting lipid metabolism, allowing nutritionists to create highly accurate fat-oxidation dietary plans.</td>
            </tr>
          </tbody>
        </table>
      </div>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
