import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI in Sports Rehabilitation | Valli Hospital Symposium",
  description: "Join Valli Super Speciality Hospital's symposium on AI in Sports Rehabilitation in Salem. Exploring early sports injury detection, wearable sensors, biomechanics, and clinical AI collaboration.",
  keywords: [
    "AI in sports rehabilitation",
    "sports medicine symposium Salem",
    "sports biomechanics Valli Hospital",
    "early injury detection AI",
    "wearable IoT athlete recovery",
    "smart sports hospital India",
    "clinical physiotherapy AI"
  ],
  openGraph: {
    title: "AI in Sports Rehabilitation | Valli Hospital Symposium",
    description: "Explore the future of AI in sports medicine, predictive analytics, and clinical research at the Valli Hospital Symposium in Salem.",
    url: "https://valli-hospital.com/iyakkam/ai-sports-rehab",
    siteName: "Valli Super Speciality Hospital",
    images: [
      {
        url: "/assets/runner-overlay.png",
        width: 1200,
        height: 900,
        alt: "AI in Sports Rehabilitation: Bridging Technology, Academic and Clinical Excellence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in Sports Rehabilitation | Valli Hospital Symposium",
    description: "Discover predictive analytics, wearable sensors, and biomechanics research at the Valli Hospital Symposium in Salem.",
    images: ["/assets/runner-overlay.png"],
  },
};

export default function AISportsRehabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
