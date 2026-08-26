import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "ARISE 2026 | Advancements in Recovery, Intelligence & Sports Engineering",
    template: "%s | ARISE 2026",
  },
  description: "Join the premier national CME and Workshop on Advancements in Recovery, Intelligence & Sports Engineering (ARISE 2026) organized by Valli Super Specialty Hospital, Salem. Explore where artificial intelligence meets human performance in sports injury prevention, treatment, and rehabilitation.",
  keywords: [
    "ARISE 2026",
    "AI in sports medicine",
    "sports rehabilitation challenge",
    "wearable telemetry",
    "sports biomechanics",
    "Valli Hospital Salem",
    "medical AI conference",
    "CME orthopaedics Salem",
    "injury prevention AI",
    "VR telerehabilitation"
  ],
  authors: [{ name: "Valli Super Specialty Hospital" }],
  openGraph: {
    title: "ARISE 2026 | Advancements in Recovery, Intelligence & Sports Engineering",
    description: "Register for the premier national CME and hands-on workshop. Explore AI-powered wearable technology, biomechanics, and telerehabilitation at Valli Super Specialty Hospital, Salem.",
    url: "https://www.vallihospital.in/iyakkam/arise",
    siteName: "Valli Super Specialty Hospital",
    images: [
      {
        url: "/assets/runner-overlay.png",
        width: 1200,
        height: 900,
        alt: "ARISE 2026 Advancements in Recovery, Intelligence & Sports Engineering",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARISE 2026 | Advancements in Recovery, Intelligence & Sports Engineering",
    description: "Register for the premier national CME & Workshop. Discover AI in sports medicine at Valli Super Specialty Hospital.",
    images: ["/assets/runner-overlay.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
