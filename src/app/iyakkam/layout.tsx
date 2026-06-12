import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iyakkam Sports Rehab & Biomechanics | Valli Super Speciality Hospital",
  description: "Iyakkam is Valli Super Speciality Hospital's flagship Sports Rehabilitation & Biomechanics center. We combine clinical orthopedic expertise with advanced motion-capture telemetry to analyze gait, prevent injury, and restore athletic performance.",
  keywords: [
    "Iyakkam Sports Rehab",
    "sports rehabilitation Salem",
    "biomechanical gait analysis Salem",
    "sports injury prevention Salem",
    "Valli Hospital sports medicine",
    "athletic recovery Salem",
    "orthopedic rehabilitation India",
    "motion capture gait analysis"
  ],
  authors: [{ name: "Valli Super Speciality Hospital" }],
  openGraph: {
    title: "Iyakkam Sports Rehab & Biomechanics | Valli Super Speciality Hospital",
    description: "Discover Iyakkam, the flagship sports rehabilitation and biomechanics center of Valli Hospital. Benefit from dynamic gait analysis, injury screening, and specialized return-to-play assessment.",
    url: "https://www.vallihospital.in/iyakkam",
    siteName: "Valli Super Speciality Hospital",
    images: [
      {
        url: "/assets/runner-overlay.png",
        width: 1200,
        height: 900,
        alt: "Iyakkam Sports Rehab and Biomechanics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iyakkam Sports Rehab & Biomechanics | Valli Super Speciality Hospital",
    description: "Get dynamic biomechanical analysis, clinical sports rehabilitation, and peak performance training at Valli Hospital's Iyakkam center.",
    images: ["/assets/runner-overlay.png"],
  },
};

export default function IyakkamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
