export interface Doctor {
  slug: string;
  name: string;
  qualifications: string;
  department: string;
  description: string;
  image: string;
  shortDescription: string;
  biography?: string;
  education?: string[];
  fellowships?: string[];
  publications?: string[];
  presentations?: string[];
  awards?: string[];
  expertise?: string[];
  media?: string[];
  faqs?: { question: string; answer: string }[];
}

export const doctorsData: Doctor[] = [
  {
    "slug": "dr-jothiswar",
    "name": "Dr. K. N. Jotheesvar",
    "qualifications": "MBBS, MS ORTHO, FIAS, FIJR",
    "department": "DEPT OF ORTHOPAEDICS",
    "shortDescription": "Registrar Orthopedic Surgeon with fellowships in Joint Replacement and Spine Care",
    "description": "Dr. Jotheesvar is a highly skilled Orthopaedic Surgeon with fellowship training in Spine Surgery and Joint Replacements. Focused on managing complex trauma, especially periarticular fractures. Skilled in spine care and advanced hip and knee arthroplasty procedures. Committed to personalized, outcome-driven, and evidence-based treatment.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-aakash",
    "name": "Dr. E. Aakash",
    "qualifications": "MBBS, MS ORTHOPAEDICS, FIJR, FIOT, FDFM",
    "department": "DEPT OF ORTHOPAEDICS",
    "shortDescription": "Orthopedic Registrar specializing in trauma care and joint replacement surgeries",
    "description": "Dr. E. Aakash is a skilled Orthopaedic Surgeon with qualifications including MBBS, MS Orthopaedics, FIJR (Fellowship in Joint Replacement), FIOT (Fellowship in Orthopedic Trauma), and FDFM (FIFA Diploma in Football Medicine). He specializes in trauma care and joint replacement surgeries, delivering precise, patient-centered treatment with a focus on excellent functional outcomes. By combining evidence-based practice with advanced surgical techniques, he ensures high-quality orthopaedic care.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-balamurugan-g",
    "name": "Dr. G. Balamurugan",
    "qualifications": "MBBS, MD ANAESTHESIA",
    "department": "DEPT OF ANAESTHESIA & CRITICAL CARE",
    "shortDescription": "Specialist in Anaesthesia and Critical Care",
    "description": "Dr. G. Balamurugan is an expert in Anaesthesia and Critical care, ensuring patient safety and comfort during surgical procedures and providing comprehensive care in the intensive care unit.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-tamilkumaran",
    "name": "Dr. Tamilkumaran",
    "qualifications": "MBBS, DNB ORTHOPEDICS",
    "department": "DEPT OF HAND & MICRO SURGERY",
    "shortDescription": "Specialist in Hand Surgery and Orthopedics",
    "description": "Dr. Tamilkumaran is a specialist in Hand Surgery and Orthopedics, dedicated to the diagnosis, treatment, and rehabilitation of conditions affecting the hand, wrist, and upper extremities.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-rprabu",
    "name": "Dr. R. Prabu",
    "qualifications": "MBBS",
    "department": "DEPT OF ORTHOPAEDICS",
    "shortDescription": "Specialist in Orthopaedics and surgical treatments",
    "description": "Dr. R. Prabu is a distinguished Consultant in the Orthopaedics at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. 5 years' clinical experience in Orthopedic Department Clinical risk management experience. Verifying complex diagnoses and facilitating treatment plans.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-ambiga",
    "name": "Dr. Ambiga",
    "qualifications": "MBBS",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. Ambiga is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Explaining procedures and discussing test results or prescribed treatments with patients. Monitoring patients' conditions and progress, and re-evaluating treatments, as necessary. Knowledge and experience in diagnosing and treating a wide variety of illnesses.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-obuli-vijay-shankar",
    "name": "Dr. Obuli Vijay Shankar",
    "qualifications": "MBBS, MS, FNB",
    "department": "DEPT OF HAND & MICRO SURGERY",
    "shortDescription": "Specialist in Hand & Micro Surgery and surgical treatments",
    "description": "Dr. Obuli Vijay Shankar is a distinguished Consultant in the Hand & Micro Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MS, FNB, they possess deep clinical expertise and are committed to offering state-of-the-art care. FNB in Hand & Microvascular surgery in Ganga Hospital ( 2021 - 2023) Examines, diagnoses, and treats diseases and injuries to the musculoskeletal system. Prescribes course of treatment for patients with injuries, disorders, or malformations and performs required surgery.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-ssenthilnathan",
    "name": "Dr. S. Senthilnathan",
    "qualifications": "MBBS, MD",
    "department": "DEPT OF RADIO DIAGNOSIS",
    "shortDescription": "Specialist in Radio Diagnosis and patient-centered care",
    "description": "Dr. S. Senthilnathan is a distinguished Consultant in the Radio Diagnosis at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, they possess deep clinical expertise and are committed to offering state-of-the-art care. Job Title: Consultant Radio Diagnosis Performing or directing radiology staff to carry out image-guided, diagnostic procedures. Interpreting the results from diagnostic imaging procedures to determine diagnoses.",
    "image": "/dr-senthilnathan.jpg"
  },
  {
    "slug": "dr-spradeep",
    "name": "Dr. S. Pradeep",
    "qualifications": "MBBS",
    "department": "DEPT OF ANAESTHESIA & CRITICAL CARE",
    "shortDescription": "Specialist in Anaesthesia & Critical Care and patient-centered care",
    "description": "Dr. S. Pradeep is a distinguished Consultant in the Anaesthesia & Critical Care at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to ensuring the highest standards of safety, comfort, and clinical precision during surgical procedures and post-operative intensive care, specializing in advanced nerve blocks and painless labor.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-tnatanasabapathy",
    "name": "Dr. T. Natanasabapathy",
    "qualifications": "MBBS, MS Orthopaedics",
    "department": "DEPT OF ORTHOPAEDICS",
    "shortDescription": "Chief Orthopedic & Joint Replacement Surgeon in Salem",
    "description": "Dr. T. Natanasabapathy is the Chief Orthopedic Surgeon and Managing Director at Valli Super Speciality Hospital, Salem. With over 15 years of surgical excellence, he is recognized as one of the best orthopedic and joint replacement surgeons in Tamil Nadu. He has successfully performed over 10,000+ surgeries, including complex primary and revision knee and hip replacements, advanced arthroscopic keyhole procedures, spinal surgeries, and polytrauma reconstructions. His patient-first philosophy combined with cutting-edge medical technology makes him a pioneering figure in Salem's healthcare landscape.",
    "image": "/placeholder-doctor.png",
    "biography": "Dr. T. Natanasabapathy has dedicated his career to restoring mobility and enhancing the quality of life for patients suffering from debilitating bone, joint, and spinal disorders. After completing his advanced training at prestigious institutions, he brought world-class orthopedic treatment modalities to the Salem region. Under his leadership, Valli Super Speciality Hospital has grown into a premier hub for joint replacement, sports medicine, and emergency trauma care in Western Tamil Nadu.",
    "education": [
      "M.S. in Orthopaedic Surgery — Stanley Medical College, Chennai",
      "M.B.B.S. — Madras Medical College, Chennai"
    ],
    "fellowships": [
      "Fellowship in Joint Replacement Surgery (FIJR) — Germany",
      "Fellowship in Advanced Arthroscopy & Sports Medicine — South Korea",
      "Advanced Trauma Life Support (ATLS) Certified"
    ],
    "expertise": [
      "Robotic & Minimally Invasive Knee Replacement Surgery",
      "Total Hip Replacement & Revision Joint Arthroplasty",
      "Arthroscopic Anterior Cruciate Ligament (ACL) & Meniscus Reconstruction",
      "Complex Pelvic-Acetabular Fracture & Polytrauma Care",
      "Micro-Endoscopic Spine Surgery & Sciatica Treatment"
    ],
    "publications": [
      "Natanasabapathy T., et al. 'Functional Outcomes of Cruciate-Retaining Total Knee Arthroplasty in Asian Patients.' Journal of Orthopaedic Surgery, 2021.",
      "Natanasabapathy T. 'Mini-invasive approaches for complex tibial plateau fractures.' Indian Journal of Orthopaedics, 2019."
    ],
    "presentations": [
      "Guest Speaker on 'Robotic Knee Replacement Advancements' at OASISCON 2024.",
      "Presented paper on 'Double-bundle ACL Reconstruction using Hamstring Autograft' at TNOACON 2022."
    ],
    "awards": [
      "Best Doctor Award for Surgical Excellence — Government of Tamil Nadu, 2023",
      "Lifetime Achievement Award in Orthopedics — Salem Medical Association, 2025"
    ],
    "media": [
      "Featured in The Hindu for performing a rare bilateral knee replacement on a 75-year-old patient.",
      "President of Salem Orthopedic Society (2022-2024)."
    ],
    "faqs": [
      {
        "question": "Who is the best orthopedic surgeon in Salem?",
        "answer": "Dr. T. Natanasabapathy is widely regarded as the leading orthopedic surgeon in Salem, with over 15 years of experience, 10,000+ successful surgeries, and fellowship training in Germany."
      },
      {
        "question": "What is Dr. Natanasabapathy's specialization?",
        "answer": "He specializes in Total Knee/Hip Replacement, Robotic Knee Surgery, ACL Reconstruction, Arthroscopy, Complex Fracture Management, and Spine Care."
      },
      {
        "question": "Which hospital does Dr. Natanasabapathy consult at?",
        "answer": "He is the Chief Surgeon at Valli Super Speciality Hospital, Salem, Tamil Nadu."
      },
      {
        "question": "Is robotic knee replacement available under him?",
        "answer": "Yes, Dr. Natanasabapathy performs state-of-the-art Robotic and Minimally Invasive Knee Replacements for faster recovery and high precision."
      }
    ]
  },
  {
    "slug": "dr-sivasubrmaniyam",
    "name": "Dr. Sivasubrmaniyam",
    "qualifications": "MBBS, MS",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. Sivasubrmaniyam is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Diagnosing and managing a wide range of acute and chronic medical conditions. Performing detailed patient evaluations, prescribing appropriate treatments, and following up with patient care. Educating patients and families about disease prevention, health maintenance, and treatment plans.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-kiruba",
    "name": "Dr. Kiruba",
    "qualifications": "MBBS",
    "department": "DEPT OF BIOCHEMISTRY",
    "shortDescription": "Specialist in Biochemistry and patient-centered care",
    "description": "Dr. Kiruba is a distinguished Consultant in the Biochemistry at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Focused on advanced laboratory diagnostics, clinical pathology audits, and biological metabolic assessments to ensure maximum diagnostic precision across all diagnostic suites.",
    "image": "/dr-kiruba.jpg"
  },
  {
    "slug": "dr-ivijayalakshmi",
    "name": "Dr. I. Vijayalakshmi",
    "qualifications": "MBBS, MD General Medicine",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. I. Vijayalakshmi is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD General Medicine, they possess deep clinical expertise and are committed to offering state-of-the-art care. 10+ years' clinical experience. At least four years' experience in health administration. Clinical risk management experience.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-jvasuki",
    "name": "Dr. J Vasuki",
    "qualifications": "MBBS",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. J Vasuki is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Requesting the appropriate medical tests and based on them, following a treatment plan. Coordinating with different ER departments to ensure patients receive the necessary treatment. 10+ years' clinical experience.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-nivethika",
    "name": "Dr. Nivethika",
    "qualifications": "MBBS, MD",
    "department": "DEPT OF PSYCHIATRY",
    "shortDescription": "Specialist in Psychiatry and patient-centered care",
    "description": "Dr. Nivethika is a distinguished Consultant in the Psychiatry at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, they possess deep clinical expertise and are committed to offering state-of-the-art care. Diagnosing patients accurately. Developing comprehensive treatment plans and prescribing medication as needed. Regularly following up with the patient to check progress and adjust the treatment plan as needed.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-karthikeyan-selvaraj",
    "name": "Dr. Karthikeyan Selvaraj",
    "qualifications": "MBBS",
    "department": "DEPT OF GASTROENTEROLOGY",
    "shortDescription": "Specialist in Gastroenterology and patient-centered care",
    "description": "Dr. Karthikeyan Selvaraj is a distinguished Consultant in the Gastroenterology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to resolving complex gastrointestinal, liver, and biliary system disorders, utilizing high-definition endoscopic and colonoscopic assessments to deliver precise therapies.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-parthiban",
    "name": "Dr. Parthiban",
    "qualifications": "MBBS",
    "department": "DEPT OF PAEDIATRICS",
    "shortDescription": "Specialist in Paediatrics and patient-centered care",
    "description": "Dr. Parthiban is a distinguished Consultant in the Paediatrics at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Strong decision-making, diagnostic, and problem-solving skills. Diagnosing and treating illnesses, medical conditions, and injuries. Ordering, performing, and interpreting diagnostic tests.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-ganeshbalan",
    "name": "Dr. Ganeshbalan",
    "qualifications": "MBBS",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. Ganeshbalan is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Diagnosing patients accurately. Developing comprehensive treatment plans and prescribing medication as needed. Regularly following up with the patient to check progress and adjust the treatment plan as needed.",
    "image": "/dr-ganeshbalan.jpeg"
  },
  {
    "slug": "dr-saravana-babu",
    "name": "Dr. Saravana Babu",
    "qualifications": "MBBS, MD, DM",
    "department": "DEPT OF CARDIOLOGY",
    "shortDescription": "Specialist in Cardiology and patient-centered care",
    "description": "Dr. Saravana Babu is a distinguished Consultant in the Cardiology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, DM, they possess deep clinical expertise and are committed to offering state-of-the-art care. Prescribing tests, treatments, and/or surgery, when necessary. Performing tests, when needed, to check the health of patients' hearts and/or cardiovascular systems. Prescribing medication to treat heart and/or cardiovascular disease.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-mohankumar",
    "name": "Dr. Mohankumar",
    "qualifications": "MBBS, D.ORTHO",
    "department": "DEPT OF ORTHOPAEDICS",
    "shortDescription": "Specialist in Orthopaedics and surgical treatments",
    "description": "Dr. Mohankumar is a distinguished Consultant in the Orthopaedics at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, D.ORTHO, they possess deep clinical expertise and are committed to offering state-of-the-art care. With a strong focus on advanced fracture management, joint reconstructions, and sports medicine, they combine cutting-edge techniques with customized recovery pathways to restore dynamic movement and long-term joint health.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-gowthamanan",
    "name": "Dr. Gowthamanan",
    "qualifications": "MBBS",
    "department": "DEPT OF UROLOGY",
    "shortDescription": "Specialist in Urology and patient-centered care",
    "description": "Dr. Gowthamanan is a distinguished Consultant in the Urology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to treating kidney stones, urinary tract infections, and male reproductive health, utilizing minimally invasive urological and lithotripsy technologies.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-balu",
    "name": "Dr. Balu",
    "qualifications": "MBBS",
    "department": "DEPT OF DENTAL & ORAL MAXILLOFACIAL SURGERY",
    "shortDescription": "Specialist in Dental & Oral Maxillofacial Surgery and surgical treatments",
    "description": "Dr. Balu is a distinguished Consultant in the Dental & Oral Maxillofacial Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Focused on advanced oral rehabilitation, dental implants, complex maxillofacial trauma reconstruction, and full-mouth rehabilitation therapies.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-bssaravanan",
    "name": "Dr. B. S. Saravanan",
    "qualifications": "MD, BDS, MDS",
    "department": "DEPT OF DENTAL & ORAL MAXILLOFACIAL SURGERY",
    "shortDescription": "Specialist in Dental & Oral Maxillofacial Surgery and surgical treatments",
    "description": "Dr. B. S. Saravanan is a distinguished Consultant in the Dental & Oral Maxillofacial Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MD, BDS, MDS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Doctor of dental surgery (BDS) or Doctor of medicine in dentistry (MDS). Proven experience working as an oral and maxillofacial surgeon. B.D.S.,M.D.S(Oral and Facio-Maxilla Surgery)",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-priyadharshini",
    "name": "Dr. Priyadharshini",
    "qualifications": "MBBS",
    "department": "DEPT OF DERMATOLOGY",
    "shortDescription": "Specialist in Dermatology and patient-centered care",
    "description": "Dr. Priyadharshini is a distinguished Consultant in the Dermatology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. On floor Observation during any Clinical rounds, investigation. Diagnosis, treatment etc. WHO safe surgery checklist is implemented. Prescribing medication for the treatment of skin conditions.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-jenifer",
    "name": "Dr. Jenifer",
    "qualifications": "MBBS, MD",
    "department": "DEPT OF NEUROLOGY",
    "shortDescription": "Specialist in Neurology and patient-centered care",
    "description": "Dr. Jenifer is a distinguished Consultant in the Neurology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to diagnosing and treating complex neurological disorders, including stroke, epilepsy, migraines, neuropathy, and neurodegenerative disorders with evidence-based therapeutics.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-dhivya",
    "name": "Dr. Dhivya",
    "qualifications": "MBBS, MD",
    "department": "DEPT OF NEUROLOGY",
    "shortDescription": "Specialist in Neurology and patient-centered care",
    "description": "Dr. Dhivya is a distinguished Consultant in the Neurology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MD, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to diagnosing and treating complex neurological disorders, including stroke, epilepsy, migraines, neuropathy, and neurodegenerative disorders with evidence-based therapeutics.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-subhashini",
    "name": "Dr. Subhashini",
    "qualifications": "MBBS",
    "department": "DEPT OF ENT",
    "shortDescription": "Specialist in Ent and patient-centered care",
    "description": "Dr. Subhashini is a distinguished Consultant in the Ent at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Treating conditions of the ears, upper pharynx, and oral cavity, larynx, nose, face, and neck. Treating nosebleeds, tonsillectomies, adenoidectomies, infected mastoids, and sinusitis. Treating patients with tumors in the head or neck or patients with a defect in the ear, nose, or throat.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-santhosh",
    "name": "Dr. Santhosh",
    "qualifications": "MBBS",
    "department": "DEPT OF ANAESTHESIA & CRITICAL CARE",
    "shortDescription": "Specialist in Anaesthesia & Critical Care and patient-centered care",
    "description": "Dr. Santhosh is a distinguished Consultant in the Anaesthesia & Critical Care at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to ensuring the highest standards of safety, comfort, and clinical precision during surgical procedures and post-operative intensive care, specializing in advanced nerve blocks and painless labor.",
    "image": "/dr-santhosh.jpeg"
  },
  {
    "slug": "dr-jaya-sri",
    "name": "Dr. Jaya Sri",
    "qualifications": "MBBS",
    "department": "DEPT OF OPHTHALMOLOGY",
    "shortDescription": "Specialist in Ophthalmology and patient-centered care",
    "description": "Dr. Jaya Sri is a distinguished Consultant in the Ophthalmology at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Performing corrective surgeries, such as repairing injuries and corneas, and removing cataracts. Performing advanced surgical procedures, such as keyhole or laser surgery. Diagnosing and treating eye diseases and injuries.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-bramkumar",
    "name": "Dr. B. Ramkumar",
    "qualifications": "MBBS",
    "department": "DEPT OF GENERAL MEDICINE",
    "shortDescription": "Specialist in General Medicine and patient-centered care",
    "description": "Dr. B. Ramkumar is a distinguished Consultant in the General Medicine at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. 5 years of residency training in General Surgery (essential). 3 years of experience practicing as a General Surgeon. Examining patients and making diagnoses to determine the need for surgery.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-choundappan",
    "name": "Dr. Choundappan",
    "qualifications": "MBBS, MCH",
    "department": "DEPT OF PLASTIC & RECONSTRUCTIVE SURGERY",
    "shortDescription": "Specialist in Plastic & Reconstructive Surgery and surgical treatments",
    "description": "Dr. Choundappan is a distinguished Consultant in the Plastic & Reconstructive Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, MCH, they possess deep clinical expertise and are committed to offering state-of-the-art care. Additional courses and training in cosmetic and reconstructive surgery. Years of practical experience in surgery. Outlining all the risks and benefits associated with the surgery prior to the procedure.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-arun-sekar",
    "name": "Dr. Arun Sekar",
    "qualifications": "MBBS",
    "department": "DEPT OF ANAESTHESIA & CRITICAL CARE",
    "shortDescription": "Specialist in Anaesthesia & Critical Care and patient-centered care",
    "description": "Dr. Arun Sekar is a distinguished Consultant in the Anaesthesia & Critical Care at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Dedicated to ensuring the highest standards of safety, comfort, and clinical precision during surgical procedures and post-operative intensive care, specializing in advanced nerve blocks and painless labor.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-sengottuvel",
    "name": "Dr. Sengottuvel",
    "qualifications": "MBBS",
    "department": "DEPT OF NEUROSURGERY",
    "shortDescription": "Specialist in Neurosurgery and patient-centered care",
    "description": "Dr. Sengottuvel is a distinguished Consultant in the Neurosurgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. Operating microscopes for surgeries to perform microsurgeries. Ordering, performing, and interpreting results of diagnostic tests, such as MRIs, PET scans, and CT scans. Assessing and diagnosing patients, prescribing treatments, and monitoring the patients' progress.",
    "image": "/placeholder-doctor.png"
  },
  {
    "slug": "dr-sultana-dhilras",
    "name": "Dr. Sultana Dhilras",
    "qualifications": "MBBS",
    "department": "DEPT OF PAEDIATRIC SURGERY",
    "shortDescription": "Specialist in Paediatric Surgery and surgical treatments",
    "description": "Dr. Sultana Dhilras is a distinguished Consultant in the Paediatric Surgery at Valli Super Speciality Hospital, Salem. Holding qualifications in MBBS, they possess deep clinical expertise and are committed to offering state-of-the-art care. A Medical degree and the successful completion of a residency and fellowship in pediatric surgery. A state license and certification to practice pediatric surgery. A keen interest in the treatment for and needs of children.",
    "image": "/placeholder-doctor.png"
  }
];
