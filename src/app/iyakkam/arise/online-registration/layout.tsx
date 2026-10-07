import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARISE 2026 – Online Registration (Google Meet)",
  description:
    "Register online for ARISE 2026 CME and attend via Google Meet. Get your digital pass and join the live session from anywhere in India.",
};

export default function OnlineRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
