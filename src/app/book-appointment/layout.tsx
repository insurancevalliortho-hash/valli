import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Book Doctor Appointment Online in Salem | Valli Hospital',
  description: 'Book your consultation online with Dr. T. Natanasabapathy and senior orthopedic specialists at Valli Super Specialty Hospital Salem. Fast, secure, and confirmed appointments.',
  keywords: [
    'book appointment valli hospital',
    'book doctor appointment Salem',
    'orthopedic consultation Salem',
    'ortho doctor near me open now',
    'knee pain doctor appointment salem',
    'spine consultation booking salem',
    'online doctor consultation Salem'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/book-appointment',
  },
  openGraph: {
    title: 'Book Doctor Consultation Online | Valli Super Specialty Hospital Salem',
    description: 'Instant appointment scheduling with leading joint replacement, spine, sports injury, and trauma surgeons in Salem.',
    url: 'https://www.vallihospital.in/book-appointment',
    type: 'website',
  }
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Book Appointment', url: 'https://www.vallihospital.in/book-appointment' }
      ]} />
      {children}
    </>
  );
}

