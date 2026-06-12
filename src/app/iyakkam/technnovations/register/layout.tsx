import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for SportAIthon",
  description: "Complete your online registration for the Technovations 2026 SportAIthon. Secure your slot, register your team, and download payment instructions.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
