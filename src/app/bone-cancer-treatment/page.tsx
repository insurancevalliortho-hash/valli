import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema, FAQSchema, MedicalProcedureSchema, MedicalSpecialtySchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: "Bone Cancer & Bone Tumour Surgery in Salem | Limb Salvage | Valli Hospital",
  description: "Specialized Orthopedic Oncology & Bone Tumor Treatment in Salem at Valli Super Specialty Hospital. Expert care for osteosarcoma, chondrosarcoma, giant cell tumor (GCT), bone metastases, and limb-salvage surgery.",
  keywords: [
    "bone cancer treatment Salem",
    "bone tumour surgery Salem",
    "osteosarcoma treatment Tamil Nadu",
    "oncologic orthopaedics Salem",
    "limb salvage surgery Salem",
    "bone metastasis treatment Salem",
    "giant cell tumour bone Salem",
    "bone cancer hospital Tamil Nadu",
    "bone biopsy Salem",
    "orthopedic oncologist Salem"
  ],
  alternates: {
    canonical: "https://www.vallihospital.in/bone-cancer-treatment",
  },
  openGraph: {
    title: "Bone Tumor & Orthopedic Oncology Center Salem | Valli Hospital",
    description: "Advanced limb preservation, precise needle biopsies, and tumor resection surgery in Salem.",
    url: "https://www.vallihospital.in/bone-cancer-treatment",
    type: "website",
  }
};

export default function BoneCancerTreatmentPage() {
  const faqList = [
    {
      question: "What are the early warning signs of a bone tumor?",
      answer: "Common symptoms include localized bone pain that worsens at night or during rest, unexplained swelling or palpable lump near a joint, unexplained bone fracture from minimal trauma (pathological fracture), and fatigue or localized joint stiffness."
    },
    {
      question: "What is Limb Salvage Surgery for bone cancer?",
      answer: "Limb salvage (limb-sparing) surgery is an advanced oncologic technique where the tumorous bone segment is completely excised with clear surgical margins, and the limb is reconstructed using custom modular mega-prostheses or biological bone grafts, avoiding amputation in over 90% of cases."
    },
    {
      question: "How are benign bone tumors like Giant Cell Tumor (GCT) treated?",
      answer: "Benign aggressive tumors such as Giant Cell Tumor (GCT) and aneurysmal bone cysts are treated with extended intralesional curettage, high-speed burring, adjuvant chemical cauterization, and cavity filling with bone cement or bone graft to minimize recurrence."
    },
    {
      question: "How is a bone tumor accurately diagnosed at Valli Hospital?",
      answer: "We perform digital high-resolution CT/MRI scans, whole-body bone scans, and image-guided core needle biopsies analyzed by experienced histopathologists to identify exact tumor histology before commencing treatment."
    },
    {
      question: "Who leads the orthopedic oncology service?",
      answer: "Our surgical team is led by Dr. T. Natanasabapathy (Chief Orthopedic Surgeon) in coordination with multidisciplinary oncology specialists and diagnostic radiologists."
    }
  ];

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' },
        { name: 'Bone Tumor & Oncology', url: 'https://www.vallihospital.in/bone-cancer-treatment' }
      ]} />
      <FAQSchema questions={faqList} />
      <MedicalSpecialtySchema
        name="Orthopedic Oncology & Bone Tumor Center"
        description="Comprehensive diagnostic biopsy, limb-salvage reconstruction, and metastatic bone disease management in Salem."
        url="https://www.vallihospital.in/bone-cancer-treatment"
      />
      <MedicalProcedureSchema
        name="Limb Salvage Surgery & Mega-Prosthetic Reconstruction"
        description="Excision of bone tumors with oncologic margins and structural prosthetic reconstruction."
        bodyLocation="Skeletal System / Limbs / Pelvis"
      />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Bone Tumor Care</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[45vh] flex items-center bg-[#001f25] pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#004b57]/30 rounded-[6rem] rotate-12" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[35vw] h-[35vw] bg-[#f98825]/10 rounded-[5rem] rotate-45" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Specialized Orthopedic Oncology
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
            Bone Tumor & Cancer <br /> <span className="text-[#f98825]">Treatment in Salem</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-2xl font-normal">
            Specialized diagnosis and limb-salvage reconstruction for primary and metastatic bone tumors. Compassionate, precision surgical care in Salem.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/book-appointment"
              className="px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all transform hover:-translate-y-0.5"
            >
              Book Oncology Consultation
            </Link>
            <a
              href="tel:+919003417111"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              📞 Hospital Helpline: +91 90034 17111
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-10 text-[#40484a] text-lg leading-relaxed font-medium">

            <div>
              <h2 className="text-3xl font-bold text-[#00333c] mb-4">Comprehensive Bone Oncology in Salem</h2>
              <p>
                Bone tumors—whether benign lesions like osteoid osteoma or malignant conditions like osteosarcoma and metastatic lesions—demand meticulous radiographic evaluation, safe biopsy planning, and limb-sparing surgical expertise. At <strong>Valli Super Specialty Hospital</strong>, our surgical oncology protocols prioritize tumor eradication while maximizing long-term limb function and quality of life.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#f98825]/10 flex items-center justify-center text-[#f98825] font-black text-xl mb-4">🎗️</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Limb Salvage Surgery</h3>
                <p className="text-base text-gray-600">Wide tumor excision combined with customized mega-prosthetic endoprostheses, allowing patients to walk and retain their natural limbs.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#004d66]/10 flex items-center justify-center text-[#004d66] font-black text-xl mb-4">🔬</div>
                <h3 className="text-xl font-bold text-[#00333c] mb-2">Image-Guided Biopsy</h3>
                <p className="text-base text-gray-600">Ultrasound and fluoroscopy-guided closed core needle biopsies planned along correct surgical tracts to avoid tumor seeding.</p>
              </div>
            </div>

            {/* Lead Specialists Module */}
            <div className="bg-[#001f25] text-white p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Lead Surgical Specialist</h3>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl max-w-lg">
                <div className="text-[#f98825] text-xs font-bold uppercase tracking-widest mb-1">Chief Orthopedic Surgeon</div>
                <div className="text-xl font-bold text-white">Dr. T. Natanasabapathy</div>
                <p className="text-sm text-gray-300 mt-2">15+ years experience, expert in complex bone tumor resection and prosthetic reconstruction.</p>
                <Link href="/doctors/dr-tnatanasabapathy" className="mt-4 inline-block text-xs font-bold text-[#f98825] hover:underline">
                  View Doctor Profile &rarr;
                </Link>
              </div>
            </div>

            {/* FAQs */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-[#00333c] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqList.map((faq, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                    <h3 className="text-xl font-bold text-[#00333c] mb-2">{faq.question}</h3>
                    <p className="text-gray-600 text-base">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#00333c] text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4">Consult Our Bone Specialists in Salem</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Early diagnosis is key to successful bone tumor management and limb preservation.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book Consultation
          </Link>
        </div>
      </section>

      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Clinics</h3>
          <ul className="flex flex-wrap gap-6 md:gap-12">
            <li><Link href="/joint-care-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Joint Care Clinic</Link></li>
            <li><Link href="/fracture-clinic" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Fracture Clinic</Link></li>
            <li><Link href="/genetic-testing" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">Genetic Testing Lab</Link></li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
