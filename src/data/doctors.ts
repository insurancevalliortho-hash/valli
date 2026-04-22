export interface Doctor {
  slug: string;
  name: string;
  qualifications: string;
  department: string;
  description: string;
  image: string;
  shortDescription: string;
}

export const doctorsData: Doctor[] = [
  {
    slug: "dr-jothiswar",
    name: "Dr. Jothiswar",
    qualifications: "M.B.B.S, M.S. FELLOW JOINT REPLACEMENT SURGERY, FELLOW SPINE SURGERY",
    department: "DEPT OF SPINE SURGERY",
    shortDescription: "Specialist in Spine Surgery and Joint Replacements",
    description: "Orthopaedic Surgeon with fellowship training in Spine Surgery and Joint Replacements. Focused on managing complex trauma, especially periarticular fractures. Skilled in spine care and advanced hip and knee arthroplasty procedures. Committed to personalized, outcome-driven, and evidence-based treatment.",
    image: "/placeholder-doctor.png"
  },
  {
    slug: "dr-aakash",
    name: "Dr. Aakash",
    qualifications: "M.B.B.S, M.S. ORTHOPEDICS, FIJR, FIOT, FDFM",
    department: "DEPT OF JOINT REPLACEMENT SURGERY",
    shortDescription: "Specialist in trauma care and joint replacement surgeries",
    description: "Dr. Aakash is a skilled Orthopaedic Surgeon with qualifications including MBBS, MS Orthopaedics, FIJR (Fellowship in joint replacement), FIOT (Fellowship in Orthopedic Trauma), and FDFM (FIFA Diploma in Football Medicine). He specializes in trauma care and joint replacement surgeries, delivering precise, patient-centered treatment with a focus on excellent functional outcomes. By combining evidence-based practice with advanced surgical techniques, he ensures high-quality orthopaedic care at Valli Orthopedic Hospital, Salem.",
    image: "/placeholder-doctor.png"
  },
  {
    slug: "dr-balamurugan-g",
    name: "Dr. Balamurugan G.",
    qualifications: "MBBS MD",
    department: "Department of Anaesthesia and Critical care",
    shortDescription: "Specialist in Anaesthesia and Critical care",
    description: "Expert in Anaesthesia and Critical care, ensuring patient safety and comfort during surgical procedures and providing comprehensive care in the intensive care unit.",
    image: "/placeholder-doctor.png"
  },
  {
    slug: "dr-tamilkumaran",
    name: "Dr. Tamilkumaran",
    qualifications: "DNB Orthopedics",
    department: "Department of Hand Surgery",
    shortDescription: "Specialist in Hand Surgery and Orthopedics",
    description: "Specialist in Hand Surgery and Orthopedics, dedicated to the diagnosis, treatment, and rehabilitation of conditions affecting the hand, wrist, and upper extremities.",
    image: "/placeholder-doctor.png"
  }
];
