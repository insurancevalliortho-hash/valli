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
                url: "/favicon.png",
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
        creator: "@ValliHospital", // Replace with actual Twitter handle
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
        google: "google-site-verification-code", // Replace with your code
        yandex: "yandex-verification-code", // Replace with your code
        yahoo: "yahoo-verification-code", // Replace with your code
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
        image: ["https://vallihospital.in/favicon.png"],
        description: "Valli Super Speciality Hospital in Salem offers advanced orthopedic care, joint replacements, and spine surgery.",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Meyyanur Bypass Road", // Update to exact address
            addressLocality: "Salem",
            addressRegion: "Tamil Nadu",
            postalCode: "636004", // Update to exact PIN code
            addressCountry: "IN"
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "11.6643", // Salem approximate
            longitude: "78.1460"
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9003417111",
            contactType: "customer service",
            availableLanguage: ["English", "Tamil"]
        },
        sameAs: [
            "https://www.facebook.com/vallihospital", // Update with actual link
            "https://www.instagram.com/vallihospital", // Update with actual link
            "https://www.linkedin.com/company/vallihospital" // Update with actual link
        ],
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                opens: "00:00",
                closes: "23:59"
            }
        ]
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
