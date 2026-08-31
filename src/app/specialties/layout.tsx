import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Centers of Medical Excellence & Specialties in Salem | Valli Hospital',
  description: 'Explore world-class clinical specialties at Valli Super Specialty Hospital Salem: Joint Replacement, Spine Surgery, 24/7 Trauma Casualty, Keyhole Arthroscopy, Rheumatology, Pulmonology, and Critical Care.',
  keywords: [
    'hospitals in salem',
    'best hospital in salem',
    'multispeciality hospital in salem',
    'super speciality hospital in salem',
    'orthopedic hospital in salem',
    'ortho hospital salem',
    'salem multi speciality hospital',
    'trauma hospital salem',
    'speciality hospital near me'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/specialties',
  },
  openGraph: {
    title: 'Centers of Medical Excellence | Valli Super Specialty Hospital Salem',
    description: '15+ specialized medical & surgical departments equipped with cutting-edge diagnostics, operating suites, and 24/7 emergency casualty.',
    url: 'https://www.vallihospital.in/specialties',
    type: 'website',
  }
};

export default function SpecialtiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Specialties', url: 'https://www.vallihospital.in/specialties' }
      ]} />
      {children}
    </>
  );
}

