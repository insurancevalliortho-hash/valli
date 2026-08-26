import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARISE 2026 Admin Portal",
  description: "Administrative console to manage registrations, verify bank reference IDs, and export delegate spreadsheets.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
