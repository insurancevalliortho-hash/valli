import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leader Submission Portal",
  description: "Access the Technovations 2026 Team Leader Portal to upload project presentations (.ppt, .pptx, .pdf) and monitor payment verification status.",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
