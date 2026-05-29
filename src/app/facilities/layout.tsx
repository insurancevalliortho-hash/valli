import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Medical Facilities in Salem | Valli Super Speciality Hospital',
  description: 'Explore our state-of-the-art medical infrastructure in Salem including modular laminar-flow OTs, 10-bed critical care ICU, Dual Slice GE CT scanners, interventional ultrasound (USG), and 24/7 diagnostics.',
  keywords: 'hospital facilities Salem, medical infrastructure Tamil Nadu, 24/7 CT scan Salem, modular operation theatre, advanced ICU Salem',
  alternates: {
    canonical: 'https://www.vallihospital.in/facilities',
  },
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
