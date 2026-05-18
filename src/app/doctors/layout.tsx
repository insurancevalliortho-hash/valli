import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctors in Salem | Valli Super Speciality Hospital',
  description: 'Advanced Doctors in Salem. Valli Super Speciality Hospital offers precision treatments, expert care by Dr. Natanasabapathy, and world-class orthopedic facilities.',
  keywords: 'Salem, Doctors, Tamil Nadu, Dr. Natanasabapathy, best doctors hospital in Salem, top orthopedic surgeon Salem, doctors treatment',
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
