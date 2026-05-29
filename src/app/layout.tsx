import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { HospitalSchema, PhysicianSchema } from "../components/seo/StructuredData";
import Script from "next/script";
import { Suspense } from "react";
import PageTransitionLoader from "../components/PageTransitionLoader";
import SmoothScroll from "../components/SmoothScroll";
import MagneticCursor from "../components/MagneticCursor";

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
        default: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
        template: "%s | Valli Super Speciality Hospital Salem",
    },
    description: "Valli Super Speciality Hospital — Salem's #1 orthopedic hospital for joint replacement, knee replacement, hip replacement, spine surgery, trauma care, sports injury treatment, and arthroscopy. Led by Dr. T. Natanasabapathy.",
    keywords: [
        "best orthopedic hospital in Salem",
        "orthopedic surgeon Salem",
        "joint replacement Salem",
        "knee replacement Salem",
        "hip replacement Salem",
        "spine surgery Salem",
        "trauma care Salem",
        "sports injury treatment Salem",
        "arthroscopy Salem",
        "fracture clinic Salem",
        "orthopedic hospital Tamil Nadu",
        "multispeciality hospital Salem",
        "best hospital Salem",
        "Dr Natanasabapathy",
        "Valli hospital Salem",
        "24 hour emergency hospital Salem"
    ],
    authors: [{ name: "Valli Super Speciality Hospital", url: "https://vallihospital.in" }],
    creator: "Valli Super Speciality Hospital",
    publisher: "Valli Super Speciality Hospital",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
        description: "Salem's most trusted orthopedic hospital — joint replacement, trauma care, sports injury treatment, and 24/7 emergency. 16,000+ patients treated. Led by Dr. T. Natanasabapathy.",
        url: "https://vallihospital.in",
        siteName: "Valli Super Speciality Hospital",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valli Super Speciality Hospital — Best Orthopedic Hospital in Salem, Tamil Nadu",
            }
        ],
        phoneNumbers: ["+919003417111"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
        description: "Salem's #1 orthopedic hospital — joint replacement, trauma care, sports injury, and 24/7 emergency. 16,000+ patients treated.",
        creator: "@ValliHospital",
        images: ["/og-image.jpg"],
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
        canonical: "https://vallihospital.in/",
        languages: {
            "en": "https://vallihospital.in/",
            "en-IN": "https://vallihospital.in/",
            "x-default": "https://vallihospital.in/",
        },
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
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-VALLIHOSP"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-VALLIHOSP');
                    `}
                </Script>
                 <Suspense fallback={null}>
                     <PageTransitionLoader />
                 </Suspense>
                 <HospitalSchema />
                 <PhysicianSchema />
                 <SmoothScroll>
                     <MagneticCursor />
                     <div id="page-content-wrapper" className="min-h-screen">
                         {children}
                     </div>
                 </SmoothScroll>
             </body>
         </html>
     );
}
