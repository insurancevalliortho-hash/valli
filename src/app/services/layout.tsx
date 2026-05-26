import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Specialised Services | Valli Super Speciality Hospital Salem',
  description: 'Explore the highly advanced clinical services and surgical specialities at Valli Super Speciality Hospital. Discover our Joint Care, Arthroscopy, Pediatric Orthopedics, Bone Cancer Treatment, and Trauma services led by expert surgeons.',
  keywords: 'orthopedics Salem, bone cancer treatment, joint replacement, arthroscopy, pediatric orthopedics, sports medicine, trauma clinic, Valli Hospital services',
  alternates: {
    canonical: 'https://vallihospital.in/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
