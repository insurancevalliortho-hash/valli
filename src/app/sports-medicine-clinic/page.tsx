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
                  The Sports Medicine <br/> <span className="text-[#f98825]">Clinic</span>
              </h1>
          </div>
      </section>

      {/* Content Section */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
          <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto space-y-6 text-[#40484a] text-lg leading-relaxed font-medium">
                  
      <h2 className="text-2xl font-bold text-[#00333c]">Clinical Focus and Overview</h2>
      <p>Functioning as the region's premier tertiary referral institute for sports science and medicine, this clinic provides holistic, scientifically grounded support to elite professional athletes, collegiate competitors, and recreational enthusiasts. The clinic's purview encompasses sports physical assessments, performance enhancement strategies, sophisticated biomechanical analysis, sports psychology, and clinical nutrition, all integrated to ensure a rapid, sustainable return to play.</p>
      
      <h2 className="text-2xl font-bold text-[#00333c] mt-8">Pathophysiology, Procedures, and Treatments</h2>
      <p>Athletic performance and recovery exist at the precise intersection of musculoskeletal integrity, cardiovascular endurance, and psychological resilience. The multidisciplinary team—comprising fellowship-trained orthopedic experts, sports physiologists, sports physiotherapists, and clinical nutritionists—addresses these physiological facets simultaneously.</p>
      <p>Every individual athlete undergoes an exhaustive, systematic medical examination. This protocol involves the meticulous documentation of family history and a rigorous assessment of the cardiac, respiratory, musculoskeletal, and nervous systems. This systematic documentation is vital for uncovering hidden pathophysiologies, such as underlying connective tissue disorders or subclinical cardiac anomalies, that could pose an existential threat to an athlete's life or career under extreme physical exertion.</p>
      <ul className="list-disc pl-5 mt-4 space-y-2">
        <li><strong>Cruciate Ligament (ACL/PCL) Pathologies:</strong> Injuries to the anterior and posterior cruciate ligaments drastically destabilize the knee joint. These are managed through dynamic functional bracing, intense physical therapy, or advanced arthroscopic ligament reconstruction, strictly dependent on the mechanical stability of the joint and the athletic demands of the patient.</li>
        <li><strong>Acromioclavicular (AC) Joint and Shoulder Kinematics:</strong> Traumatic impacts or repetitive overhead motions lead to AC joint separations and rotator cuff pathology. These are addressed via tailored strengthening regimens to restore the scapulohumeral rhythm, targeted anti-inflammatory protocols, and precise splinting.</li>
        <li><strong>Epicondylitis (Tennis Elbow):</strong> This painful tendinopathy is managed with a strong emphasis on conservative therapy for 6 to 12 months, utilizing eccentric loading exercises before considering arthroscopic or open tendon debridement.</li>
        <li><strong>Achilles Tendon Rupture and Clavicle Fractures:</strong> Managed through a coordinated pathway of acute immobilization, surgical repair when biomechanically necessary, and aggressive physical therapy.</li>
      </ul>
      <p className="mt-4">Beyond acute injury management, biomechanical experts at the clinic map the athlete's specific movement patterns, suggesting subtle but highly impactful alterations in technique. These biomechanical optimizations reduce shear forces on vulnerable joints and optimize kinetic energy transfer, thereby improving overall play standards. Recognizing the profound psychological burden of repeated failure or severe injury, the clinic provides scheduled psychological evaluations and therapy sessions aimed at maintaining the athlete's "optimal zone of functionality". Simultaneously, individualized nutritional and performance-enhancing supplement plans are crafted by experts to support rapid tissue repair and meet immense metabolic demands. The clinic also extends its reach directly to the sporting arena, providing on-field injury management and an ambulance facility equipped with advanced life support for immediate trauma response.</p>
    
              </div>
          </div>
      </section>

      <Footer />
    </>
  );
}
