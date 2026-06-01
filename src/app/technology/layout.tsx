import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Medical Technology & Equipment | Valli Super Speciality Hospital',
  description: 'Explore the cutting-edge medical technologies used at Valli Super Speciality Hospital in Salem, including modular laminar-flow OTs, 4K arthroscopy, sub-second CT scanners, automated laboratory analyzers, and 24/7 critical care ICU instrumentation.',
  keywords: 'medical technology Salem, 4K arthroscopy, modular operation theatre Salem, high speed CT scanner Salem, automated laboratory Salem, critical care technology Salem',
  alternates: {
    canonical: 'https://www.vallihospital.in/technology',
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
