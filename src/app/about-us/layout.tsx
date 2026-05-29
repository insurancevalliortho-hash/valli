import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Valli Super Speciality Hospital Salem | Orthopedic Excellence Since 2021',
  description: 'Valli Super Speciality Hospital is a 50-bed multispecialty hospital in Salem, Tamil Nadu, led by Dr. T. Natanasabapathy — one of India\'s most skilled orthopedic surgeons. Learn our story, mission, and commitment to world-class bone, joint, and trauma care.',
  keywords: [
    'about Valli hospital Salem',
    'Valli hospital history',
    'Dr Natanasabapathy orthopedic surgeon Salem',
    'best orthopedic hospital Salem',
    'Salem multispeciality hospital',
    '50 bed hospital Salem',
    'orthopedic hospital Tamil Nadu history',
    'Valli Super Speciality Hospital about'
  ],
  alternates: {
    canonical: 'https://vallihospital.in/about-us',
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
