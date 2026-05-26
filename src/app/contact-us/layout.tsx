import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Emergency | Valli Super Speciality Hospital Salem',
  description: 'Reach out to Valli Super Speciality Hospital in Salem. Get instant access to our 24/7 emergency hotline, clinical phone directory, official address coordinates, and schedule diagnostic scans or clinical consults.',
  keywords: 'contact Valli Hospital, Salem hospital phone, orthopedic hospital Salem address, emergency trauma Salem, book diagnostic scan Salem',
  alternates: {
    canonical: 'https://vallihospital.in/contact-us',
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
