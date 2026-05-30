import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { HospitalSchema, PhysicianSchema } from "../components/seo/StructuredData";
import Script from "next/script";
import SmoothScroll from "../components/SmoothScroll";
import MagneticCursor from "../components/MagneticCursor";
// ClientOnlyLoader wraps PageTransitionLoader with next/dynamic ssr:false inside a Client Component.
// This is required per Next.js 16 docs: ssr:false cannot be used in Server Components.
import ClientOnlyLoader from "../components/ClientOnlyLoader";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    preload: false,
});

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    preload: false,
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.vallihospital.in"),
    applicationName: "Valli Super Speciality Hospital",
    generator: "Next.js",
    category: "Medical",
    title: {
        default: "Best Orthopedic Surgeon & Hospital in Salem | Dr. T. Natanasabapathy | Valli Super Speciality Hospital",
        template: "%s | Valli Super Speciality Hospital Salem",
    },
    description: "Valli Super Speciality Hospital — Salem's #1 orthopedic surgeon Dr. T. Natanasabapathy. Specializing in knee replacement, hip replacement, spine surgery, trauma recovery, sports injury treatment, and sports medicine. 24/7 emergency.",
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
    authors: [{ name: "Valli Super Speciality Hospital", url: "https://www.vallihospital.in" }],
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
        url: "https://www.vallihospital.in",
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
        canonical: "https://www.vallihospital.in/",
        languages: {
            "en": "https://www.vallihospital.in/",
            "en-IN": "https://www.vallihospital.in/",
            "x-default": "https://www.vallihospital.in/",
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
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-VALLIHOSP"
                />
                <script
                    id="google-analytics"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-VALLIHOSP');
                        `
                    }}
                />
                <ClientOnlyLoader />
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
