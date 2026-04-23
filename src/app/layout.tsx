import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";

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
    title: {
        default: "Valli Super Speciality Hospital | Best Orthopedic Care in Salem",
        template: "%s | Valli Super Speciality Hospital",
    },
    description: "Valli Super Speciality Hospital in Salem offers advanced orthopedic care, joint replacements, spine surgery, and comprehensive medical excellence. Where expertise restores lives.",
    keywords: ["Orthopedic Hospital", "Salem", "Joint Replacement", "Spine Surgery", "Valli Hospital", "Best Orthopedician", "Trauma Care", "Sports Medicine"],
    authors: [{ name: "Valli Super Speciality Hospital" }],
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
    },
    twitter: {
        card: "summary_large_image",
        title: "Valli Super Speciality Hospital",
        description: "Advanced orthopedic care, precision healing, and excellence in every specialty.",
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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        name: "Valli Super Speciality Hospital",
        url: "https://vallihospital.in",
        logo: "https://vallihospital.in/favicon.png",
        description: "Valli Super Speciality Hospital in Salem offers advanced orthopedic care, joint replacements, and spine surgery.",
        address: {
            "@type": "PostalAddress",
            addressLocality: "Salem",
            addressRegion: "Tamil Nadu",
            addressCountry: "IN"
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9003417111",
            contactType: "customer service"
        }
    };

    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${poppins.variable} antialiased selection:bg-secondary selection:text-white`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
            </body>
        </html>
    );
}
