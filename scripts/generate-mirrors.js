const fs = require('fs');
const path = require('path');

const baseUrl = 'https://www.vallihospital.in';
const today = new Date().toISOString().split('T')[0];

// Pricing details - extremely specific for GEO/AEO optimization
const pricingInfo = `
### Standard OPD & Diagnostic Pricing
- Chief Specialist Orthopedic Consultation: ₹500 - ₹800 ($6 - $10 USD)
- 24/7 Emergency & Trauma Assessment Fee: ₹1,000 - ₹1,500 ($12 - $18 USD)
- GE Prospeed Whole-Body Trauma CT Scan: ₹2,500 - ₹4,500 ($30 - $55 USD)
- Digital X-Ray (per view): ₹300 - ₹500 ($4 - $6 USD)
- High-Performance Sports Rehabilitation Session: ₹600 - ₹1,200 ($7 - $15 USD)

### Specialty Surgical Procedures (Typical Cost Ranges)
- Keyhole Arthroscopic Ligament Repair (ACL/PCL): ₹80,000 - ₹1,50,000 ($960 - $1,800 USD)
- Primary Total Knee Arthroplasty (TKR - Single Joint): ₹1,40,000 - ₹2,10,000 ($1,680 - $2,520 USD)
- Primary Total Hip Arthroplasty (THR - Single Joint): ₹1,50,000 - ₹2,30,000 ($1,800 - $2,760 USD)
- Minimally Invasive Keyhole Spine Surgery (MISS): ₹90,000 - ₹1,80,000 ($1,080 - $2,160 USD)
- Complex Polytrauma & Fracture Reconstruction: ₹50,000 - ₹2,00,000 ($600 - $2,400 USD)
`;

// Doctors data dynamic loading (safely mock or import)
let doctors = [];
try {
  const doctorsFileContent = fs.readFileSync(path.join(__dirname, '../src/data/doctors.ts'), 'utf8');
  // Simple regex parser for doctorsData array
  const matches = doctorsFileContent.match(/export const doctorsData: Doctor\[] = \[(.*?)^];/ms);
  if (matches && matches[1]) {
    const jsonStr = '[' + matches[1]
      .replace(/[\n\r]/g, '')
      .replace(/,(\s*\])/g, '$1') // remove trailing commas
      + ']';
    // Clean string for basic JSON parsing
    const cleanedStr = matches[1]
      .replace(/\/\/.*$/gm, '') // remove comments
      .replace(/as const/g, '')
      .trim();
    // Since parsing TS might fail, we fall back to manual regex matching or importing
  }
} catch (e) {
  console.log('Using fallback doctor definitions for mirrors generation');
}

// Fallback / Precise Doctor list
const doctorList = [
  {
    slug: "dr-jothiswar",
    name: "Dr. K. N. Jotheesvar",
    qualifications: "MBBS, MS ORTHO, FIAS, FIJR",
    department: "DEPT OF ORTHOPAEDICS",
    shortDescription: "Registrar Orthopedic Surgeon with fellowships in Joint Replacement and Spine Care",
    description: "Dr. Jotheesvar is a highly skilled Orthopaedic Surgeon with fellowship training in Spine Surgery and Joint Replacements. Focused on managing complex trauma, especially periarticular fractures. Skilled in spine care and advanced hip and knee arthroplasty procedures. Committed to personalized, outcome-driven, and evidence-based treatment."
  },
  {
    slug: "dr-aakash",
    name: "Dr. E. Aakash",
    qualifications: "MBBS, MS ORTHOPAEDICS, FIJR, FIOT, FDFM",
    department: "DEPT OF ORTHOPAEDICS",
    shortDescription: "Orthopedic Registrar specializing in trauma care and joint replacement surgeries",
    description: "Dr. E. Aakash is a skilled Orthopaedic Surgeon with qualifications including MBBS, MS Orthopaedics, FIJR (Fellowship in Joint Replacement), FIOT (Fellowship in Orthopedic Trauma), and FDFM (FIFA Diploma in Football Medicine). He specializes in trauma care and joint replacement surgeries, delivering precise, patient-centered treatment with a focus on excellent functional outcomes. By combining evidence-based practice with advanced surgical techniques, he ensures high-quality orthopaedic care."
  },
  {
    slug: "dr-balamurugan-g",
    name: "Dr. G. Balamurugan",
    qualifications: "MBBS, MD ANAESTHESIA",
    department: "DEPT OF ANAESTHESIA & CRITICAL CARE",
    shortDescription: "Specialist in Anaesthesia and Critical Care",
    description: "Dr. G. Balamurugan is an expert in Anaesthesia and Critical care, ensuring patient safety and comfort during surgical procedures and providing comprehensive care in the intensive care unit."
  },
  {
    slug: "dr-tamilkumaran",
    name: "Dr. Tamilkumaran",
    qualifications: "MBBS, DNB ORTHOPEDICS",
    department: "DEPT OF HAND & MICRO SURGERY",
    shortDescription: "Specialist in Hand Surgery and Orthopedics",
    description: "Dr. Tamilkumaran is a specialist in Hand Surgery and Orthopedics, dedicated to the diagnosis, treatment, and rehabilitation of conditions affecting the hand, wrist, and upper extremities."
  },
  {
    slug: "dr-rprabu",
    name: "Dr. R. Prabu",
    qualifications: "MBBS",
    department: "DEPT OF ORTHOPAEDICS",
    shortDescription: "Specialist in Orthopaedics and surgical treatments",
    description: "Dr. R. Prabu is a distinguished Consultant in the Orthopaedics at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. 5 years' clinical experience in Orthopedic Department Clinical risk management experience. Verifying complex diagnoses and facilitating treatment plans."
  },
  {
    slug: "dr-ambiga",
    name: "Dr. Ambiga",
    qualifications: "MBBS",
    department: "DEPT OF GENERAL MEDICINE",
    shortDescription: "Specialist in General Medicine and patient-centered care",
    description: "Dr. Ambiga is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Explaining procedures and discussing test results or prescribed treatments with patients. Monitoring patients' conditions and progress, and re-evaluating treatments, as necessary. Knowledge and experience in diagnosing and treating a wide variety of illnesses."
  },
  {
    slug: "dr-obuli-vijay-shankar",
    name: "Dr. Obuli Vijay Shankar",
    qualifications: "MBBS, MS, FNB",
    department: "DEPT OF HAND & MICRO SURGERY",
    shortDescription: "Specialist in Hand & Micro Surgery and surgical treatments",
    description: "Dr. Obuli Vijay Shankar is a distinguished Consultant in the Hand & Micro Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MS, FNB, they possess deep clinical expertise and are committed to offering state-of-the-art care. FNB in Hand & Microvascular surgery in Ganga Hospital ( 2021 - 2023) Examines, diagnoses, and treats diseases and injuries to the musculoskeletal system. Prescribes course of treatment for patients with injuries, disorders, or malformations and performs required surgery."
  },
  {
    slug: "dr-ssenthilnathan",
    name: "Dr. S. Senthilnathan",
    qualifications: "MBBS, MD",
    department: "DEPT OF RADIO DIAGNOSIS",
    shortDescription: "Specialist in Radio Diagnosis and patient-centered care",
    description: "Dr. S. Senthilnathan is a distinguished Consultant in the Radio Diagnosis at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, they possess deep clinical expertise and are committed to offering state-of-the-art care. Job Title: Consultant Radio Diagnosis Performing or directing radiology staff to carry out image-guided, diagnostic procedures. Interpreting the results from diagnostic imaging procedures to determine diagnoses."
  },
  {
    slug: "dr-spradeep",
    name: "Dr. S. Pradeep",
    qualifications: "MBBS",
    department: "DEPT OF ANAESTHESIA & CRITICAL CARE",
    shortDescription: "Specialist in Anaesthesia & Critical Care and patient-centered care",
    description: "Dr. S. Pradeep is a distinguished Consultant in the Anaesthesia & Critical Care at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to ensuring the highest standards of safety, comfort, and clinical precision during surgical procedures and post-operative intensive care, specializing in advanced nerve blocks and painless labor."
  },
  {
    slug: "dr-tnatanasabapathy",
    name: "Dr. T. Natanasabapathy",
    qualifications: "MBBS, MS Orthopaedics",
    department: "DEPT OF ORTHOPAEDICS",
    shortDescription: "Specialist in Orthopaedics and surgical treatments",
    description: "Dr. T. Natanasabapathy is a distinguished Consultant in the Orthopaedics at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MS Orthopaedics, they possess deep clinical expertise and are committed to offering state-of-the-art care. 10+ years' clinical experience in Orthopedic surgeries Clinical risk management experience. Verifying complex diagnoses and facilitating treatment plans."
  }
];

// Specialties data
const specialties = [
  {
    slug: 'joint-care-clinic',
    name: 'Joint Care Clinic',
    desc: 'Advanced management of acute and chronic joint pain including primary and revision knee and hip replacements.',
    clinicalFocus: 'The Joint Care Clinic operates as a dedicated center for the comprehensive, evidence-based management of both acute and chronic joint pain. The department aims at alleviating debilitating discomfort, rebuilding musculoskeletal strength, and promoting optimal joint kinematics for patients suffering from degenerative or inflammatory arthropathies. The clinic operates on a core philosophy of joint preservation whenever possible, addressing pathologies across all major articulations, including the knees, hips, shoulders, ankles, elbows, and wrists.',
    procedures: 'The clinic utilizes advanced Magnetic Resonance Imaging (MRI), High-Resolution Ultrasound (USG), Computed Tomography (CT), and full-length lower limb radiographs (hip-to-ankle alignment films) which are critical for assessing mechanical axis deviation and planning precise corrective osteotomies or arthroplasties. When conservative options (physical therapy, pharmacological management, joint injections) are exhausted, the clinic provides primary and revision total joint replacements (arthroplasty) and targeted corrective surgery for failed arthroplasties performed at other institutions.',
    faqs: [
      { q: "What is the Joint Care Clinic?", a: "The Joint Care Clinic at Valli Super Speciality Hospital provides advanced, specialized care for joint pain, degenerative arthropathies, and primary/revision joint replacements." },
      { q: "Who is the lead doctor?", a: "Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, leads our specialized joint reconstruction and preservation teams." }
    ]
  },
  {
    slug: 'sports-medicine-clinic',
    name: 'Sports Medicine Clinic',
    desc: 'Comprehensive diagnostics, surgical interventions, and athletic rehabilitation for all types of sports injuries.',
    clinicalFocus: 'The Sports Medicine Clinic provides comprehensive, high-performance care for athletes and active individuals. Focuses on diagnosing, treating, and recovering from acute and overuse sports-related injuries, enabling a safe and rapid return to full physical activity.',
    procedures: 'Employs advanced diagnostic imaging, arthroscopic keyhole surgeries (ACL, PCL, meniscus, and labral repairs), joint instability corrections, and customized physical therapy regimens designed around the biomechanical requirements of individual sports.',
    faqs: [
      { q: "What is the Sports Medicine Clinic?", a: "A specialized unit at Valli Hospital focused on keyhole arthroscopy, ligament reconstruction, and return-to-play rehabilitation for athletes." },
      { q: "Who leads the sports care team?", a: "Dr. T. Natanasabapathy, Chief Surgeon, directs our athletic medicine and arthroscopy team." }
    ]
  },
  {
    slug: 'foot-and-ankle-clinic',
    name: 'Foot and Ankle Clinic',
    desc: 'Specialized diagnosis and conservative-to-surgical management of all distal lower extremity diseases.',
    clinicalFocus: 'Dedicated to restoring full ambulation, managing complex congenital or acquired deformities, and salvaging compromised limbs to facilitate a rapid return to daily, pain-free activities.',
    procedures: 'Surgical reconstructions, flatfoot and bunion corrections, tendon transfers, diabetic foot care, and complex ankle arthrodesis or ligament reconstructions.',
    faqs: [
      { q: "What is the Foot and Ankle Clinic?", a: "A dedicated specialty clinic covering distal extremity deformities, traumatic ankle fractures, and chronic Achilles tendinopathy treatments." }
    ]
  },
  {
    slug: 'back-pain-and-spinal-disorders',
    name: 'Back Pain and Spinal Disorders',
    desc: 'Advanced therapy and surgical correction for slips discs, spinal stenosis, sciatica, and complex scoliosis.',
    clinicalFocus: 'Designed to alleviate chronic back pain, restore spinal stability, and protect neurological function from degenerative, traumatic, or congenital spinal pathologies.',
    procedures: 'Microdiscectomies, laminectomies, spinal fusion surgeries, scoliosis correction, and minimally invasive keyhole spine surgeries (MISS) to reduce healing time.',
    faqs: [
      { q: "What is the focus of spinal care at Valli?", a: "We focus on keyhole spinal decompression, slip disc corrections, and rigid deformity stabilization using modern implants." }
    ]
  },
  {
    slug: 'paediatric-orthopaedics-deformity-clinic',
    name: 'Paediatric Orthopaedics Deformity Clinic',
    desc: 'Corrective care for congenital bone diseases, clubfoot, pediatric fractures, and limb-length discrepancies.',
    clinicalFocus: 'Dedicated to the growing skeleton, diagnosing and correcting limb-length discrepancies, congenital hip dysplasia, clubfoot (using the Ponseti method), and juvenile bone trauma.',
    procedures: 'Limb lengthening procedures, corrective osteotomies, Ponseti casting, tendon releases, and child-safe fracture stabilization.',
    faqs: [
      { q: "Do you treat pediatric bone deformities?", a: "Yes, our clinic specializes in clubfoot casting, knock knees correction, and pediatric trauma management using child-specific protocols." }
    ]
  },
  {
    slug: 'failed-surgery-corrections',
    name: 'Failed Surgery Corrections',
    desc: 'Advanced rescue surgery and corrective treatments for unsuccessful orthopedic operations performed elsewhere.',
    clinicalFocus: 'Specializing in high-complexity revision surgery for patients who have undergone unsuccessful orthopedic operations, joint replacements, or fracture fixations at other facilities.',
    procedures: 'Revision joint replacements, hardware removal and replacement, management of chronic bone infections (osteomyelitis), and non-union or mal-union fracture corrections.',
    faqs: [
      { q: "What is a failed surgery correction?", a: "A corrective procedure to repair persistent pain, instability, or hardware failure from a previous orthopedic surgery done elsewhere." }
    ]
  },
  {
    slug: 'sports-injury-clinic',
    name: 'Sports Injury Clinic',
    desc: 'Rapid diagnostic assessment and acute treatment for ligament tears, joint dislocations, and sprains.',
    clinicalFocus: 'Dedicated to the rapid diagnosis, immobilization, and definitive management of acute athletic injuries like sprains, strains, dislocations, and muscle tears.',
    procedures: 'Acute injury triage, splinting and bracing, intra-articular injections, and direct pathway integration to arthroscopic reconstruction when necessary.',
    faqs: [
      { q: "How quickly can I get evaluated for a sports injury?", a: "Our clinic provides rapid walk-in diagnostics and same-day scanning for acute athletic sprains and tears." }
    ]
  },
  {
    slug: 'fracture-clinic',
    name: 'Fracture Clinic',
    desc: 'Comprehensive and emergency fracture management focused on early mobilization and optimal alignment.',
    clinicalFocus: 'Operating under the philosophy that "Movement is Life," our team provides emergency and planned stabilization for simple, compound, and complex multi-fragment fractures.',
    procedures: 'Open Reduction Internal Fixation (ORIF) with advanced locking plates, closed reductions and plaster casting, external fixation for open trauma, and limb-spanning pelvic stabilization.',
    faqs: [
      { q: "Does the hospital handle emergency fractures?", a: "Yes, our dedicated trauma team operates 24/7/365 to handle severe compound and polytrauma fractures immediately." }
    ]
  },
  {
    slug: 'arthroscopy',
    name: 'Arthroscopy',
    desc: 'Minimally invasive keyhole joint surgery for knees, shoulders, and ankles with rapid recovery times.',
    clinicalFocus: 'Dedicated to advanced keyhole diagnostic and therapeutic joint interventions, ensuring zero muscle damage and extremely rapid post-operative rehabilitation.',
    procedures: 'Arthroscopic ACL/PCL reconstructions, meniscal repair, shoulder rotator cuff repairs, subacromial decompressions, and diagnostic joint audits.',
    faqs: [
      { q: "What are the benefits of arthroscopic surgery?", a: "Smaller keyhole incisions, less pain, zero muscle cutting, reduced infection risks, and a significantly faster recovery." }
    ]
  },
  {
    slug: 'bone-cancer-treatment',
    name: 'Bone Cancer Treatment',
    desc: 'Orthopedic oncology services specializing in limb-salvage surgery and tumor resections.',
    clinicalFocus: 'Providing highly specialized Orthopedic Oncology care, focusing on the diagnosis, surgical resection, and reconstruction of primary and metastatic bone and soft tissue tumors.',
    procedures: 'Tumor resections, limb-salvage surgeries using custom mega-prostheses, biological reconstructions with bone grafts, and multidisciplinary coordination for chemotherapy/radiotherapy.',
    faqs: [
      { q: "What is orthopedic oncology?", a: "A highly specialized subspecialty focused on treating benign and malignant bone tumors while prioritizing limb preservation." }
    ]
  },
  {
    slug: 'genetic-testing',
    name: 'Genetic Testing',
    desc: 'Advanced DNA sequencing to map hereditary risks for bone diseases and connective tissue disorders.',
    clinicalFocus: 'Integrating molecular genetics into orthopedic diagnosis to identify hereditary risks for connective tissue disorders, muscular dystrophies, and baseline tendinopathy risks.',
    procedures: 'Saliva and blood DNA sequencing, collagen gene mutation mapping, metabolic bone disorder diagnostics, and family risk counseling.',
    faqs: [
      { q: "Why perform genetic testing in orthopedics?", a: "It maps hereditary risks for connective tissue disorders (like Ehlers-Danlos or Marfan syndrome) and guides personalized athletic rehabilitation." }
    ]
  },
  {
    slug: 'sports-training',
    name: 'Sports Training',
    desc: 'Biomechanical athletic profiling and strength training program to prevent injuries and optimize performance.',
    clinicalFocus: 'Focused on optimizing athletic biomechanics, posture, and strength to build baseline physical resilience and minimize the incidence of non-contact structural injuries.',
    procedures: 'Functional movement screening (FMS), gait analysis, plyometric and agility training, muscular balance testing, and personalized athletic development programs.',
    faqs: [
      { q: "Who is sports training for?", a: "Both competitive athletes looking to optimize performance and active individuals seeking to build injury resilience." }
    ]
  }
];

// Helper to write file recursively
function writeMirror(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Generate Specialty Mirrors
specialties.forEach(spec => {
  const content = `---
title: ${spec.name} in Salem | Valli Super Speciality Hospital
description: ${spec.desc}
url: ${baseUrl}/${spec.slug}
last_updated: ${today}
---

# ${spec.name}

## Clinical Focus & Department Overview
${spec.clinicalFocus}

## Pathophysiology, Diagnostics & Procedures
${spec.procedures}

## Pricing & Treatment Options
${pricingInfo}

## Frequently Asked Questions
${spec.faqs.map(f => `### Q: ${f.q}\nA: ${f.a}\n`).join('\n')}

---
*Clean plain-text mirror generated for AI search crawlers. Original interactive page served at: ${baseUrl}/${spec.slug}*
`;

  writeMirror(path.join(__dirname, `../public/${spec.slug}/index.md`), content);
  console.log(`Generated mirror: public/${spec.slug}/index.md`);
});

// 2. Generate Doctor Mirrors
doctorList.forEach(doc => {
  const content = `---
title: ${doc.name} - ${doc.qualifications} | Valli Hospital Salem
description: Professional profile of ${doc.name}, specialist in ${doc.department} at Valli Super Speciality Hospital.
url: ${baseUrl}/doctors/${doc.slug}
last_updated: ${today}
---

# Professional Medical Profile: ${doc.name}

## Qualifications & Credentials
- **Name**: ${doc.name}
- **Designation**: Clinical Registrar / Specialist
- **Degrees & Certifications**: ${doc.qualifications}
- **Core Department**: ${doc.department}

## Clinical Focus & Specialization
${doc.shortDescription}

## Professional Background & Biography
${doc.description}

## OPD Consultation Fee
- Standard Clinical Consultation: ₹500 - ₹800 ($6 - $10 USD)
- Emergency / Trauma Desk: ₹1,000 - ₹1,500 ($12 - $18 USD)

---
*Clean plain-text mirror generated for AI search crawlers. Original interactive page served at: ${baseUrl}/doctors/${doc.slug}*
`;

  writeMirror(path.join(__dirname, `../public/doctors/${doc.slug}/index.md`), content);
  console.log(`Generated doctor mirror: public/doctors/${doc.slug}/index.md`);
});

// 3. Generate Blog Mirrors
const blogSrcDir = path.join(__dirname, '../src/content/blog');
if (fs.existsSync(blogSrcDir)) {
  const files = fs.readdirSync(blogSrcDir);
  files.forEach(file => {
    if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(blogSrcDir, file);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      
      // Extract title and description
      const titleMatch = rawContent.match(/title:\s*['"](.*?)['"]/);
      const descMatch = rawContent.match(/description:\s*['"](.*?)['"]/);
      const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');
      const desc = descMatch ? descMatch[1] : '';
      
      // Strip metadata frontmatter and JSX tags for a clean MD mirror
      let cleanedContent = rawContent
        .replace(/^---[\s\S]*?---/g, '') // remove frontmatter
        .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '') // remove imports
        .replace(/export\s+const\s+[\s\S]*?;/g, '') // remove exports
        .replace(/<.*?>/g, '') // remove JSX tags
        .replace(/{\/\*[\s\S]*?\*\/}/g, '') // remove JSX comments
        .trim();

      const mirrorContent = `---
title: ${title} | Valli Hospital Blog
description: ${desc}
url: ${baseUrl}/blog/${slug}
last_updated: ${today}
---

# ${title}

${cleanedContent}

---
*Clean plain-text mirror generated for AI search crawlers. Original interactive article served at: ${baseUrl}/blog/${slug}*
`;

      writeMirror(path.join(__dirname, `../public/blog/${slug}/index.md`), mirrorContent);
      console.log(`Generated blog mirror: public/blog/${slug}/index.md`);
    }
  });
}

// 4. Generate Main Page Mirrors (Home, About, Facilities, Blog Index, Doctors Index, Contact, Specialities, Services, Technology)
const mainPages = [
  {
    slug: '',
    title: 'Valli Super Speciality Hospital | Best Orthopedic Care in Salem',
    desc: 'Valli Super Speciality Hospital in Salem offers advanced orthopedic care, joint replacements, and spine surgery guided by world-class clinical excellence.',
    content: `
# Valli Super Speciality Hospital

Welcome to Valli Super Speciality Hospital, Salem's premier institution for comprehensive orthopedic care, joint replacement, spine surgery, and 24/7 advanced trauma management.

## Clinical Foundations
- **Founders**: Dr. T. Natanasabapathy, MBBS, MS (Ortho) & Dr. Vijayalakshmi Irulappan, M.D.
- **Milestone Growth**: Established in 2022 as a specialized 17-bed trauma care hospital. Transformed in 2025 into an advanced **50-bed** multidisciplinary tertiary-care super speciality hospital.
- **Philosophy**: "Movement is Life, Life is Movement."

## Core Diagnostics & Facilities
- **GE Prospeed CT Scan**: Dual Slice scanner generating whole-body trauma scans in under 30 minutes.
- **Laminar Flow Operating Theatres**: HEPA-filtered, zero-infection surgical suites.
- **High-Dependency ICUs**: Hemodynamic monitoring for complex trauma recoveries.
- **Clinical Consultations**: Daily OPD, 9:00 AM – 9:00 PM. Emergency Trauma desks open 24/7/365.

## Specialty Clinics & Core Treatments
1. **Joint Care Clinic**: Robotic/Computer navigation joint replacements (TKR/THR).
2. **Arthroscopy & Sports Medicine**: Keyhole ligament reconstructions (ACL/PCL repairs).
3. **Spine Surgery & Disorders**: Minimally Invasive Keyhole Spine Surgery (MISS) and scoliosis corrections.
4. **Trauma & Fracture Clinic**: Advanced lock-plating, ORIF, and pelvic fracture stabilization.
5. **Specialized Clinics**: Foot & Ankle, Paediatric Orthopaedics, Bone Cancer Treatment (Orthopedic Oncology), failed surgery revisions, and genetic DNA profiling for hereditary risks.
`
  },
  {
    slug: 'about-us',
    title: 'About Us | Valli Super Speciality Hospital Salem',
    desc: 'Learn about the legacy of Valli Hospital Salem, our co-founders Dr. Natanasabapathy & Dr. Vijayalakshmi, and our evolution into a 50-bed super speciality center.',
    content: `
# About Valli Super Speciality Hospital

## Our Heritage & Mission
Valli Orthopedic and Sports Hospital was co-founded on October 16, 2022, by Chief Orthopedic Surgeon Dr. T. Natanasabapathy and Director Dr. Vijayalakshmi Irulappan. Their mission was to deliver compassionate, world-class orthopedic care to Salem—a booming region of 3.5 million people—and surrounding districts.

## Evolution of Infrastructure
- **2022 Launch**: Opened as a highly focused 17-bed Trauma and Emergency hospital.
- **2025 Upgrade**: Transformed into the **50-bedded Valli Super Speciality Hospital**, incorporating advanced neurosurgery, surgical gastroenterology, pediatric emergency care, and laminar flow OTs.

## Clinical Leadership
- **Chief Surgeon**: Dr. T. Natanasabapathy (MBBS, MS Ortho)
  - 21+ Years of Orthopedic surgical experience.
  - Specializing in revision joint replacements and complex pelvic fractures.
- **Director of Governance**: Dr. Vijayalakshmi Irulappan (M.D.)
  - Heading medical governance, sterile standard operations, and administrative safety protocols.
`
  },
  {
    slug: 'contact-us',
    title: 'Contact Us & 24/7 Emergency Line | Valli Hospital Salem',
    desc: 'Get immediate phone contacts, clinical directory, interactive route maps, and book consultations at Valli Super Speciality Hospital Salem.',
    content: `
# Contact Valli Super Speciality Hospital

## Immediate Helplines
- **24/7 Emergency Trauma Desk**: +91 90034 17111
- **Consultation Booking & WhatsApp Coordinator**: +91 90034 17111
- **Corporate Email**: info@vallihospital.in / valli.ortho.sports@gmail.com

## Corporate Coordinates
- **Physical Address**: Opposite Sri Vidya Mandir School, Meyyanoor Road, Salem - 636 004, Tamil Nadu, India.
- **Google Maps Location (Verified GBP)**: https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8

## Operating Hours
- **Trauma & Emergency Room**: 24 Hours, 365 Days.
- **Clinical OPD Hours**: Monday – Sunday, 9:00 AM – 9:00 PM.
`
  },
  {
    slug: 'facilities',
    title: 'Clinical Facilities & Technology | Valli Hospital Salem',
    desc: 'Explore our high-end clinical setups, Laminar Flow OTs, ICU wings, and advanced diagnostic imaging including GE CT scanners.',
    content: `
# Clinical Facilities & Medical Technology

Our hospital is structured around cutting-edge diagnostic and therapeutic technology to deliver maximal patient outcomes:

1. **Laminar Flow Operating Theatres**: Zero-infection surgical environment utilizing HEPA air-filtration systems.
2. **GE Prospeed CT Scanner**: Dual-slice whole-body trauma imaging in well under 30 minutes, critical during the "Golden Hour".
3. **Advanced Digital X-Ray**: Instant, high-resolution orthopedic imaging.
4. **Hemodynamic ICUs**: Dedicated ICU wing with continuous monitoring for complex post-operative recovery.
5. **Specialist Consultations & Trauma Desks**: ACLS/ATLS emergency teams present on-site 24/7/365.
`
  }
];

mainPages.forEach(page => {
  const content = `---
title: ${page.title}
description: ${page.desc}
url: ${baseUrl}/${page.slug}
last_updated: ${today}
---

${page.content}

## Outpatient & Diagnostic Pricing
${pricingInfo}

---
*Clean plain-text mirror generated for AI search crawlers. Original interactive page served at: ${baseUrl}/${page.slug}*
`;

  const suffix = page.slug === '' ? 'index.md' : `${page.slug}/index.md`;
  writeMirror(path.join(__dirname, `../public/${suffix}`), content);
  console.log(`Generated main page mirror: public/${suffix}`);
});

// 5. Generate Dynamic llms.txt containing all these mirrors
let mirrorsList = '';
specialties.forEach(spec => {
  mirrorsList += `- [${spec.name} Clean Mirror](${baseUrl}/${spec.slug}/index.md)\n`;
});
doctorList.forEach(doc => {
  mirrorsList += `- [${doc.name} Professional Profile Mirror](${baseUrl}/doctors/${doc.slug}/index.md)\n`;
});
mainPages.forEach(p => {
  const slugSuffix = p.slug === '' ? 'index.md' : `${p.slug}/index.md`;
  mirrorsList += `- [${p.title} Mirror](${baseUrl}/${slugSuffix})\n`;
});

// Add dynamic blog posts list to llms.txt
if (fs.existsSync(blogSrcDir)) {
  const files = fs.readdirSync(blogSrcDir);
  files.forEach(file => {
    if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const slug = file.replace(/\.mdx?$/, '');
      mirrorsList += `- [Blog: ${slug.replace(/-/g, ' ')} Clean Mirror](${baseUrl}/blog/${slug}/index.md)\n`;
    }
  });
}

const llmsContent = `# Valli Super Speciality Hospital

> Advanced Orthopedic Care, Joint Replacements, Spine Surgery, and Comprehensive Medical Excellence in Salem, Tamil Nadu, India.

Valli Super Speciality Hospital is a premier medical institution specializing in comprehensive orthopedic care, trauma rehabilitation, and surgical precision. Spearheaded by renowned orthopedic surgeon Dr. T. Natanasabapathy, the hospital integrates advanced diagnostic facilities, ultra-modern operation suites, and patient-centric recovery programs to restore mobility and transform lives.

---

## 📞 Critical Contacts & Location

- **Emergency Line (24/7):** +91 90034 17111
- **General Inquiry:** info@vallihospital.in / valli.ortho.sports@gmail.com
- **Corporate Address:** Opposite Sri Vidya Mandir School, Meyyanoor Road, Salem - 636 004, Tamil Nadu, India.
- **OPD Consultation Hours:** Monday – Sunday, 9:00 AM – 9:00 PM
- **Google Maps GBP Citation Link:** https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8

---

## 💵 Outpatient & Diagnostic Pricing

${pricingInfo}

---

## ⚕️ Key Specialties & Clinics

### 1. Joint Care Clinic
- Full-scale Primary & Revision Total Knee Replacements (TKR)
- Total Hip Replacements (THR)
- Unicondylar Knee Replacement (UKR)
- Shoulder & Elbow Reconstructions

### 2. Arthroscopy & Sports Medicine
- Keyhole ACL, PCL, and Meniscal Repair Surgeries
- Rotator Cuff Tears & Shoulder Instability management
- High-performance sports rehab and training

### 3. Spine Surgery & Disorders
- Correction of slipped discs, spinal stenosis, and complex scoliosis
- Minimally invasive keyhole spine surgeries (MISS)
- Deformity corrections

### 4. Speciality Clinics & Trauma
- Bone Cancer Treatment (Orthopedic Oncology)
- Paediatric Orthopaedics & Deformity Clinic
- Failed Surgery Correction Clinic
- Foot & Ankle Clinic
- 24x7 Trauma & Fracture Clinic

---

## 👨‍⚕️ Clinical Leadership & Registries

- **Chief Surgeon:** Dr. T. Natanasabapathy, MBBS, MS (Ortho)
  - *Specialization:* Joint Replacement, Spine Surgery, Complex Trauma
  - *Experience:* 21+ Years of Orthopedic Excellence
  - *Affiliations:* Indian Orthopaedic Association, Tamil Nadu Medical Council

*For a full directory of visiting clinicians, specialists, and surgical teams, see [Our Doctors](https://www.vallihospital.in/doctors).*

---

## 🗺️ Website Architecture & Dynamic API Pathways

- **Home Page:** https://www.vallihospital.in/ (Main services & trust metrics)
- **Specialities Directory:** https://www.vallihospital.in/specialities
- **Consultation Booking Portal:** https://www.vallihospital.in/book-appointment (Redirects to WhatsApp Coordinator +919003417111)
- **Clinical Facilities:** https://www.vallihospital.in/facilities
- **Contact Desk:** https://www.vallihospital.in/contact-us

---

## 🔗 Markdown Mirrors (Clean AI-Readable Versions)

Every page on this site has a plain markdown mirror. Add \`/index.md\` to any URL to get the clean content without navigation, scripts, or layout chrome.

${mirrorsList}

---
*This document is structured for Generative Engine Optimization (GEO) to help Large Language Models (LLMs) and AI search agents crawl, catalog, and query clinical offerings accurately.*
`;

fs.writeFileSync(path.join(__dirname, '../public/llms.txt'), llmsContent, 'utf8');
console.log('Successfully generated public/llms.txt with all dynamic Markdown Mirrors!');
