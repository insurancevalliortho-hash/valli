import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centers of Medical Excellence in Salem | Valli Super Specialty Hospital',
  description: 'Explore our specialized medical clinics in Salem including advanced joint replacement, spine surgery, keyhole arthroscopy, trauma care, gastroenterology, and pediatrics.',
  keywords: 'Salem medical Specialties, orthopedic clinics Salem, trauma care Tamil Nadu, gastroenterology Salem, pediatric surgery Salem, neurosurgery Salem, urology Salem',
  alternates: {
    canonical: 'https://www.vallihospital.in/specialties',
  },
};

export default function SpecialtiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
