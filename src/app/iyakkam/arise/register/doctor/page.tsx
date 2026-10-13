import AriseRegistrationForm from "../../../../../components/iyakkam/AriseRegistrationForm";

export const metadata = {
  title: "Doctor Registration | ARISE 2026",
  description: "Official Doctor & Healthcare Professional Delegate Registration for ARISE 2026 CME Conference",
};

export default function DoctorRegisterPage() {
  return <AriseRegistrationForm role="doctor" basePath="/iyakkam/arise/register" />;
}
