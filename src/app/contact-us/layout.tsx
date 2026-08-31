import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Contact Us, 24/7 Helpline & Location in Salem | Valli Hospital',
  description: 'Contact Valli Super Specialty Hospital in Salem: 24/7 Emergency Helpline +91 90034 17111. Located on Meyyanoor Road (opp. Sri Vidya Mandir School), Salem - 636004.',
  keywords: [
    'salem hospital phone number',
    'valli hospital contact number',
    'hospital in salem address',
    'hospital near new bus stand salem',
    'salem 5 roads hospital',
    'emergency trauma hospital salem',
    'valli hospital location salem'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/contact-us',
  },
  openGraph: {
    title: 'Contact & Location | Valli Super Specialty Hospital Salem',
    description: 'Direct phone lines, emergency trauma helpline, and directions to Valli Hospital on Meyyanoor Road, Salem.',
    url: 'https://www.vallihospital.in/contact-us',
    type: 'website',
  }
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Contact Us', url: 'https://www.vallihospital.in/contact-us' }
      ]} />
      {children}
    </>
  );
}

