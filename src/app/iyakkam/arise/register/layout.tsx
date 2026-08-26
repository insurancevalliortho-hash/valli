import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for ARISE 2026 CME & Workshop",
  description: "Complete your online registration for the ARISE 2026 CME & Workshop. Secure your slot, select your ticket, and upload your transaction receipt.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
