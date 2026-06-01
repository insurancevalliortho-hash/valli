import React from 'react';

export const HospitalSchema = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Valli Super Speciality Hospital",
    "alternateName": [
      "Valli Orthopedic and Sports Hospital",
      "Valli Orthopaedic and Sports Hospital",
      "Valli Hospital Salem"
    ],
    "url": "https://www.vallihospital.in",
    "logo": "https://www.vallihospital.in/favicon.png",
    "telephone": "+91-9003417111",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Meyyanoor Road",
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
    "openingHours": "00:00-23:59",
    "hasMap": "https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8",
    "medicalSpecialty": [
      "Orthopedic Surgery",
      "Sports Medicine",
      "Spine Surgery",
      "Trauma Surgery",
      "Pediatric Orthopedics",
      "Gastroenterology",
      "Neurosurgery"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "920"
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
    "jobTitle": "Chief Orthopedic Surgeon",
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "Valli Super Speciality Hospital"
    },
    "medicalSpecialty": "Orthopedic Surgery",
    "alumniOf": {
      "@type": "Organization",
      "name": "Medical College" // Add real college if known
    },
    "yearsOfExperience": "16+"
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
