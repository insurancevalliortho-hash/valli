import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Specialists & Surgeons in Salem | Valli Super Speciality Hospital',
  description: 'Meet our elite team of orthopedic surgeons, neurologists, general physicians, and specialists led by Dr. T. Natanasabapathy. 24/7 world-class healthcare in Salem, Tamil Nadu.',
  keywords: 'Salem doctors, top orthopedic surgeon Salem, general physician Salem, neurosurgeon Salem, anesthetist Salem, cardiologist Salem, medical specialists Tamil Nadu',
  alternates: {
    canonical: 'https://vallihospital.in/doctors',
  },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
