import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us in Salem | Valli Super Speciality Hospital',
  description: 'Advanced About Us in Salem. Valli Super Speciality Hospital offers precision treatments, expert care by Dr. Natanasabapathy, and world-class orthopedic facilities.',
  keywords: 'Salem, About Us, Tamil Nadu, Dr. Natanasabapathy, best about us hospital in Salem, top orthopedic surgeon Salem, about us treatment',
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
