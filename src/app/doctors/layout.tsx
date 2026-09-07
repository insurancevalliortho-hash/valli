import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';
import { doctorsData } from '../../data/doctors';

export const metadata: Metadata = {
  title: 'Best Ortho Doctor in Salem | Top Orthopedic Surgeons | Valli Hospital',
  description: 'Consult Salem\'s best orthopedic doctors (elumbu doctors) at Valli Super Specialty Hospital. Led by Dr. T. Natanasabapathy (10,000+ surgeries) specializing in robotic knee surgery, spine care, arthroscopy & trauma. Cashless insurance available.',
  keywords: [
    'best ortho doctor in salem',
    'orthopedic doctor in salem',
    'elumbu doctor near me',
    'elumbu doctor in salem',
    'salem orthopedic doctors',
    'best orthopedic surgeon salem',
    'bone doctor salem',
    'salem bone specialist hospital',
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
    description: 'Book consultation with leading orthopedic doctors and surgeons in Salem. Over 19,000 patients treated. Cashless insurance desk available.',
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

