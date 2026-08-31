import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'About Valli Super Specialty Hospital Salem | Advanced Orthopedic Care',
  description: 'Valli Super Specialty Hospital is a 50-bed premier hospital in Salem, Tamil Nadu, led by Dr. T. Natanasabapathy. Discover our history, mission, and commitment to world-class bone, joint, and trauma care.',
  keywords: [
    'about Valli hospital Salem',
    'Valli hospital history',
    'Dr Natanasabapathy orthopedic surgeon Salem',
    'best orthopedic hospital Salem',
    'Salem multiSpecialty hospital',
    '50 bed hospital Salem',
    'orthopedic hospital Tamil Nadu history',
    'Valli Super Specialty Hospital about'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/about-us',
  },
  openGraph: {
    title: 'About Valli Super Specialty Hospital Salem | Leadership & Vision',
    description: 'Learn about our clinical legacy, 10,000+ successful joint surgeries, and patient-first medical care.',
    url: 'https://www.vallihospital.in/about-us',
    type: 'website',
  }
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'About Us', url: 'https://www.vallihospital.in/about-us' }
      ]} />
      {children}
    </>
  );
}

