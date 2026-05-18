import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Facilities in Salem | Valli Super Speciality Hospital',
  description: 'Advanced Facilities in Salem. Valli Super Speciality Hospital offers precision treatments, expert care by Dr. Natanasabapathy, and world-class orthopedic facilities.',
  keywords: 'Salem, Facilities, Tamil Nadu, Dr. Natanasabapathy, best facilities hospital in Salem, top orthopedic surgeon Salem, facilities treatment',
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
