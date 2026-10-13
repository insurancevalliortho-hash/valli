import AriseRegistrationForm from "../../../../../components/iyakkam/AriseRegistrationForm";

export const metadata = {
  title: "Student Registration | ARISE 2026",
  description: "Official Student Delegate Registration for ARISE 2026 CME Conference",
};

export default function StudentRegisterPage() {
  return <AriseRegistrationForm role="student" basePath="/iyakkam/arise/register" />;
}
