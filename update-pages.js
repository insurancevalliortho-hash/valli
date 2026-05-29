const fs = require('fs');
const path = require('path');

const specialties = [
  { slug: 'joint-care-clinic', name: 'Joint Care Clinic', related: ['sports-medicine-clinic', 'fracture-clinic', 'arthroscopy'] },
  { slug: 'sports-medicine-clinic', name: 'Sports Medicine Clinic', related: ['joint-care-clinic', 'sports-injury-clinic', 'sports-training'] },
  { slug: 'foot-and-ankle-clinic', name: 'Foot and Ankle Clinic', related: ['fracture-clinic', 'joint-care-clinic', 'sports-injury-clinic'] },
  { slug: 'back-pain-and-spinal-disorders', name: 'Back Pain and Spinal Disorders', related: ['joint-care-clinic', 'sports-medicine-clinic', 'fracture-clinic'] },
  { slug: 'paediatric-orthopaedics-deformity-clinic', name: 'Paediatric Orthopaedics Deformity Clinic', related: ['genetic-testing', 'joint-care-clinic', 'foot-and-ankle-clinic'] },
  { slug: 'failed-surgery-corrections', name: 'Failed Surgery Corrections', related: ['joint-care-clinic', 'back-pain-and-spinal-disorders', 'arthroscopy'] },
  { slug: 'sports-injury-clinic', name: 'Sports Injury Clinic', related: ['sports-medicine-clinic', 'sports-training', 'arthroscopy'] },
  { slug: 'fracture-clinic', name: 'Fracture Clinic', related: ['joint-care-clinic', 'sports-injury-clinic', 'paediatric-orthopaedics-deformity-clinic'] },
  { slug: 'arthroscopy', name: 'Arthroscopy', related: ['joint-care-clinic', 'sports-medicine-clinic', 'sports-injury-clinic'] },
  { slug: 'bone-cancer-treatment', name: 'Bone Cancer Treatment', related: ['genetic-testing', 'back-pain-and-spinal-disorders', 'joint-care-clinic'] },
  { slug: 'genetic-testing', name: 'Genetic Testing', related: ['bone-cancer-treatment', 'paediatric-orthopaedics-deformity-clinic', 'joint-care-clinic'] },
  { slug: 'sports-training', name: 'Sports Training', related: ['sports-medicine-clinic', 'sports-injury-clinic', 'arthroscopy'] }
];

const otherPages = [
  { slug: 'doctors', name: 'Doctors' },
  { slug: 'facilities', name: 'Facilities' },
  { slug: 'about-us', name: 'About Us' }
];

const formatDesc = (name) => `Advanced ${name} in Salem. Valli Super Speciality Hospital offers precision treatments, expert care by Dr. Natanasabapathy, and world-class orthopedic facilities.`;
const formatKeywords = (name) => `Salem, ${name}, Tamil Nadu, Dr. Natanasabapathy, best ${name.toLowerCase()} hospital in Salem, top orthopedic surgeon Salem, ${name.toLowerCase()} treatment`;

function processSpecialty(specialty) {
  const dir = path.join(__dirname, 'src', 'app', specialty.slug);
  const file = path.join(dir, 'page.tsx');
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Add metadata
  const metaCode = `
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${specialty.name} in Salem | Valli Super Speciality Hospital',
  description: '${formatDesc(specialty.name)}',
  keywords: '${formatKeywords(specialty.name)}',
  alternates: {
    canonical: 'https://www.vallihospital.in/${specialty.slug}',
  },
};
`;

  // Insert Breadcrumb UI component and related treatments
  const breadcrumbData = `
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialities', url: 'https://www.vallihospital.in/specialities' },
        { name: '${specialty.name}', url: 'https://www.vallihospital.in/${specialty.slug}' }
  `;
  
  const relatedLinks = specialty.related.map(rel => {
    const relSpec = specialties.find(s => s.slug === rel);
    return `<li><a href="/${rel}" className="text-[#004d66] hover:text-[#f98825] font-semibold underline decoration-2 underline-offset-4 transition-colors">${relSpec ? relSpec.name : rel}</a></li>`;
  }).join('\\n');

  const relatedHtml = `
      {/* Related Treatments */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="text-2xl font-bold text-[#00333c] mb-6">Related Treatments & Specialities</h3>
          <ul className="flex flex-col md:flex-row gap-6 md:gap-12">
            ${relatedLinks}
          </ul>
        </div>
      </section>
  `;

  const importsToAdd = `
import { BreadcrumbSchema, FAQSchema } from '../../components/seo/StructuredData';
import Link from 'next/link';
`;

  const breadcrumbUI = `
      {/* Breadcrumb UI */}
      <div className="container mx-auto px-6 md:px-12 py-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/specialities" className="hover:text-white transition-colors">Specialities</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">${specialty.name}</li>
          </ol>
        </nav>
      </div>
  `;
  
  const schemas = `
      <BreadcrumbSchema items={[${breadcrumbData}]} />
      <FAQSchema questions={[
        { question: 'What is the ${specialty.name}?', answer: 'The ${specialty.name} at Valli Super Speciality Hospital provides advanced, specialized care for related conditions.' },
        { question: 'Who is the lead doctor?', answer: 'Dr. T. Natanasabapathy, Chief Orthopedic Surgeon, leads our specialized care teams.' }
      ]} />
  `;

  // Replace import React from 'react';
  if (!content.includes('import { Metadata }')) {
    content = content.replace(/import React(.*?);\n/, 'import React$1;\n' + importsToAdd + '\n' + metaCode + '\n');
  }

  if (!content.includes('<BreadcrumbSchema')) {
    content = content.replace('<Navbar />', '<Navbar />\\n' + schemas + '\\n' + breadcrumbUI);
  }

  if (!content.includes('Related Treatments')) {
    content = content.replace('<Footer />', relatedHtml + '\\n<Footer />');
  }

  fs.writeFileSync(file, content);
  console.log('Processed', specialty.slug);
}

function processOther(page) {
  const dir = path.join(__dirname, 'src', 'app', page.slug);
  let file = path.join(dir, 'page.tsx');
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Add metadata
  const metaCode = `
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${page.name} in Salem | Valli Super Speciality Hospital',
  description: '${formatDesc(page.name)}',
  keywords: '${formatKeywords(page.name)}',
  alternates: {
    canonical: 'https://www.vallihospital.in/${page.slug}',
  },
};
`;

  if (!content.includes('import { Metadata }')) {
    if (content.includes('import React')) {
      content = content.replace(/import React(.*?);\n/, 'import React$1;\n' + metaCode + '\n');
    } else {
      content = metaCode + '\n' + content;
    }
    fs.writeFileSync(file, content);
    console.log('Processed other page', page.slug);
  }
}

specialties.forEach(processSpecialty);
otherPages.forEach(processOther);
