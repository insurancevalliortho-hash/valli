import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Technovations 2026 | National AI Sports Rehabilitation Innovation Challenge",
    template: "%s | Technovations 2026",
  },
  description: "Join the premier national project expo & SportAIthon organized by Valli Super Speciality Hospital. Innovate in AI injury detection, wearable rehab tech, and sports biomechanics. Win ₹60,000+ in cash prizes and get incubated.",
  keywords: [
    "Technovations 2026",
    "SportAIthon",
    "AI sports rehabilitation",
    "injury detection AI",
    "wearable rehab tech",
    "sports biomechanics",
    "Valli Hospital Salem",
    "college student project expo",
    "medical innovation challenge",
    "sports injury prevention",
    "athletic assessment tool"
  ],
  authors: [{ name: "Valli Super Speciality Hospital" }],
  openGraph: {
    title: "Technovations 2026 | National AI Sports Rehabilitation Innovation Challenge",
    description: "Register for the premier national project expo & SportAIthon. Win ₹60,000+ in cash prizes, receive clinical mentoring from orthopaedic surgeons, and get fast-track incubation at Valli Super Speciality Hospital.",
    url: "https://valli-hospital.com/iyakkam/technnovations",
    siteName: "Valli Super Speciality Hospital",
    images: [
      {
        url: "/assets/runner-overlay.png",
        width: 1200,
        height: 900,
        alt: "Technovations 2026 AI Sports Rehabilitation Innovation Challenge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technovations 2026 | National AI Sports Rehabilitation Innovation Challenge",
    description: "Register for the premier national project expo & SportAIthon. Win ₹60,000+ in cash prizes and get incubated at Valli Super Speciality Hospital.",
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

export default function TechnnovationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
