import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Hospital Facilities, 24/7 Pharmacy & Diagnostics Salem | Valli Hospital',
  description: 'Explore state-of-the-art medical infrastructure at Valli Super Specialty Hospital Salem: 24/7 Pharmacy & Medical Store, 24/7 Laboratory & CT Scan, Modular Laminar Flow OTs, and 10-bed ICU.',
  keywords: [
    '24/7 pharmacy near me',
    'pharmacy in salem',
    '24x7 medical shop near me',
    'medical shop near me open now',
    '24 hours pharmacy salem',
    'labs in salem',
    '24 hours hospital in salem',
    'CT scan in salem',
    'hospital facilities Salem',
    'modular operation theatre salem'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/facilities',
  },
  openGraph: {
    title: 'Advanced Medical Facilities & 24/7 Emergency Diagnostics | Valli Hospital Salem',
    description: 'Ultra-clean laminar airflow OTs, digital radiology, 24/7 emergency pharmacy, and intensive care units.',
    url: 'https://www.vallihospital.in/facilities',
    type: 'website',
  }
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Facilities', url: 'https://www.vallihospital.in/facilities' }
      ]} />
      {children}
    </>
  );
}

