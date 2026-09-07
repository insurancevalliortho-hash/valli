import React from 'react';

export const HospitalSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Hospital", "MedicalOrganization", "EmergencyService"],
    "name": "Valli Super Specialty Hospital",
    "alternateName": [
      "Valli Orthopedic and Sports Hospital",
      "Valli Orthopaedic and Sports Hospital",
      "Valli Hospital Salem",
      "வள்ளி மருத்துவமனை சேலம்",
      "Salem Bone Hospital",
      "Valli Ortho Hospital Salem"
    ],
    "url": "https://www.vallihospital.in",
    "logo": "https://www.vallihospital.in/favicon.png",
    "image": "https://www.vallihospital.in/og-image.jpg",
    "telephone": "+91-9003417111",
    "priceRange": "$$",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Cashless Health Insurance (Star Health, Medi Assist, Vidal Health, Paramount, ICICI Lombard, HDFC ERGO, Care Health)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meyyanoor Road, Near 5 Roads",
      "addressLocality": "Salem",
      "addressRegion": "Tamil Nadu",
      "postalCode": "636004",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 11.6643,
      "longitude": 78.1460
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "hasMap": "https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8",
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Joint Replacement Surgery",
      "Robotic Knee Replacement",
      "Spine Surgery",
      "Sports Medicine",
      "Trauma Surgery",
      "Arthroscopic Surgery",
      "Rheumatology",
      "Pediatric Orthopedics",
      "Physiotherapy & Sports Rehabilitation",
      "Critical Care & Emergency Medicine",
      "Gastroenterology",
      "Neurosurgery"
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Robotic Knee Replacement Surgery & Cooled RFA",
        "description": "High-precision computer-assisted total knee replacement and non-surgical Cooled Radiofrequency Ablation for knee arthritis in Salem."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Minimally Invasive Spine Surgery & Sciatica Relief",
        "description": "Keyhole spine decompression, microdiscectomy, and ultrasound-guided epidural nerve blocks for disc prolapse."
      },
      {
        "@type": "MedicalProcedure",
        "name": "24/7 Emergency Fracture Stabilization & ORIF",
        "description": "Immediate round-the-clock polytrauma care, fracture reduction, and titanium fixation."
      },
      {
        "@type": "MedicalProcedure",
        "name": "Arthroscopy & Sports Ligament Reconstruction",
        "description": "Keyhole ACL/PCL ligament reconstruction, meniscus repair, and rotator cuff shoulder surgery."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "920",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const PhysicianSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. T. Natanasabapathy",
    "alternateName": [
      "Dr. Natanasabapathy",
      "Dr Natanasabapathy Salem",
      "Dr. T. Natanasabapathy Orthopedic Surgeon"
    ],
    "jobTitle": "Chief Orthopedic Surgeon & Managing Director",
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "Valli Super Specialty Hospital",
      "url": "https://www.vallihospital.in"
    },
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Joint Replacement Surgery",
      "Robotic Knee Surgery",
      "Arthroscopic Surgery",
      "Spine Surgery",
      "Sports Medicine",
      "Complex Trauma Surgery"
    ],
    "knowsAbout": [
      "Total Knee Replacement",
      "Robotic Joint Replacement",
      "Cooled Radiofrequency Ablation (Cooled RFA)",
      "Total Hip Arthroplasty",
      "ACL Reconstruction",
      "Micro-endoscopic Spine Surgery",
      "Complex Fracture Management"
    ],
    "yearsOfExperience": "21+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Salem",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "url": "https://www.vallihospital.in/doctors"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const FAQSchema = ({ questions }: { questions: { question: string; answer: string }[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const BreadcrumbSchema = ({ items }: { items: { name: string; url: string }[] }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const MedicalProcedureSchema = ({
  name,
  description,
  bodyLocation,
  procedureType = "SurgicalProcedure"
}: {
  name: string;
  description: string;
  bodyLocation: string;
  procedureType?: string;
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": procedureType,
    "name": name,
    "description": description,
    "bodyLocation": bodyLocation,
    "procedureDevice": "Advanced Arthroscopy & Robotic Surgical Systems",
    "howPerformed": "Performed by senior orthopedic specialists under sterile operative conditions.",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Valli Super Specialty Hospital",
      "url": "https://www.vallihospital.in"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const MedicalSpecialtySchema = ({
  name,
  description,
  url
}: {
  name: string;
  description: string;
  url: string;
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": name,
    "description": description,
    "url": url,
    "aspect": "Overview, Treatments, Specialists, FAQs",
    "specialty": {
      "@type": "MedicalSpecialty",
      "name": name
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Valli Super Specialty Hospital",
      "url": "https://www.vallihospital.in"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export const ArticleSchema = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = "Dr. T. Natanasabapathy",
  image = "https://www.vallihospital.in/og-image.jpg"
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  image?: string;
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": "Chief Orthopedic Surgeon",
      "worksFor": {
        "@type": "MedicalOrganization",
        "name": "Valli Super Specialty Hospital"
      }
    },
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Valli Super Specialty Hospital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.vallihospital.in/favicon.png"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};


