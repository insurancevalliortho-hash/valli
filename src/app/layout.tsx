import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { HospitalSchema, PhysicianSchema } from "../components/seo/StructuredData";
import { Suspense } from "react";
import PageTransitionLoader from "../components/PageTransitionLoader";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://vallihospital.in"),
    applicationName: "Valli Super Speciality Hospital",
    generator: "Next.js",
    category: "Medical",
    title: {
        default: "Valli Super Speciality Hospital | Best Orthopedic Care in Salem",
        template: "%s | Valli Super Speciality Hospital",
    },
    description: "Valli Super Speciality Hospital in Salem offers advanced orthopedic care, joint replacements, spine surgery, and comprehensive medical excellence. Where expertise restores lives.",
    keywords: ["Orthopedic Hospital", "Salem", "Joint Replacement", "Spine Surgery", "Valli Hospital", "Best Orthopedician", "Trauma Care", "Sports Medicine", "Super Speciality Hospital", "Orthopedic Surgeon"],
    authors: [{ name: "Valli Super Speciality Hospital", url: "https://vallihospital.in" }],
    creator: "Valli Super Speciality Hospital",
    publisher: "Valli Super Speciality Hospital",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Valli Super Speciality Hospital | Advanced Orthopedic Care",
        description: "Where expertise restores lives. Advanced care, precision healing, and excellence in every specialty.",
        url: "https://vallihospital.in",
        siteName: "Valli Super Speciality Hospital",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valli Super Speciality Hospital",
            }
        ],
        emails: ["info@vallihospital.in"],
        phoneNumbers: ["+919003417111"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Valli Super Speciality Hospital",
        description: "Advanced orthopedic care, precision healing, and excellence in every specialty.",
        creator: "@ValliHospital",
        images: ["/favicon.png"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "google-site-verification-code",
        yandex: "yandex-verification-code",
        yahoo: "yahoo-verification-code",
    },
    icons: {
        icon: "/favicon.png",
        apple: "/favicon.png",
        shortcut: "/favicon.png",
    },
    alternates: {
        canonical: "https://vallihospital.in",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${poppins.variable} antialiased selection:bg-secondary selection:text-white`}>
                <Suspense fallback={null}>
                    <PageTransitionLoader />
                </Suspense>
                <HospitalSchema />
                <PhysicianSchema />
                <div id="page-content-wrapper" className="min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}
