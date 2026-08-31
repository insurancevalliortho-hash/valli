import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';
import { doctorsData } from '../../data/doctors';

export const metadata: Metadata = {
  title: 'Best Ortho Doctor in Salem | Top Orthopedic Surgeons | Valli Hospital',
  description: 'Consult Salem\'s best orthopedic doctors and surgeons at Valli Super Specialty Hospital. Led by Dr. T. Natanasabapathy (10,000+ surgeries) specializing in robotic knee replacement, spine care, arthroscopy, and trauma surgery.',
  keywords: [
    'best ortho doctor in salem',
    'orthopedic doctor in salem',
    'salem orthopedic doctors',
    'best orthopedic surgeon salem',
    'bone doctor salem',
    'spine surgeon in salem',
    'best orthopedician in salem',
    'dr natanasabapathy salem',
    'lady ortho doctor in salem',
    'salem doctors list'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/doctors',
  },
  openGraph: {
    title: 'Best Orthopedic Doctors & Surgeons in Salem | Valli Hospital',
    description: 'Book consultation with leading orthopedic and multi-specialty doctors in Salem. Over 19,000 patients treated with high success rates.',
    url: 'https://www.vallihospital.in/doctors',
    siteName: 'Valli Super Specialty Hospital',
    type: 'website',
  }
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const doctorsListSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Valli Super Specialty Hospital",
    "url": "https://www.vallihospital.in",
    "medicalSpecialty": "Orthopedic Surgery",
    "employee": doctorsData.map(doc => ({
      "@type": "Physician",
      "name": doc.name,
      "jobTitle": doc.shortDescription,
      "medicalSpecialty": doc.department,
      "url": `https://www.vallihospital.in/doctors/${doc.slug}`
    }))
  };

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Doctors & Specialists', url: 'https://www.vallihospital.in/doctors' }
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorsListSchema) }}
      />
      {children}
    </>
  );
}

