import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Specialised Hospital Services & Surgeries in Salem | Valli Hospital',
  description: 'Comprehensive clinical & surgical services at Valli Super Specialty Hospital Salem: Joint Replacement, Robotic Knee Care, Micro-Spine Surgery, 24/7 Trauma, and Emergency ICU.',
  keywords: [
    'orthopedic services Salem',
    'hospital services in Salem',
    'joint replacement surgery Salem',
    'arthroscopy services Salem',
    'trauma and fracture care Salem',
    'emergency medical services Salem',
    'Valli hospital services'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/services',
  },
  openGraph: {
    title: 'Hospital Services & Clinical Centers | Valli Super Specialty Hospital Salem',
    description: 'Comprehensive surgical, diagnostic, and emergency medical services in Salem, Tamil Nadu.',
    url: 'https://www.vallihospital.in/services',
    type: 'website',
  }
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Services', url: 'https://www.vallihospital.in/services' }
      ]} />
      {children}
    </>
  );
}

