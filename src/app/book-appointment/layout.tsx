import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment Online | Valli Super Speciality Hospital',
  description: 'Book a consultation with our elite orthopedic surgeons, physicians, and specialists online. Easy, secure, and instant booking for patients in Salem.',
  keywords: 'book doctor appointment Salem, orthopedic consultation Salem, hospital appointment booking, online doctor consultation Salem',
  alternates: {
    canonical: 'https://vallihospital.in/book-appointment',
  },
};

export default function BookAppointmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
