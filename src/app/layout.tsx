import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { HospitalSchema, PhysicianSchema } from "../components/seo/StructuredData";
import Script from "next/script";
import SmoothScroll from "../components/SmoothScroll";
import MagneticCursor from "../components/MagneticCursor";
// ClientOnlyLoader wraps PageTransitionLoader with next/dynamic ssr:false inside a Client Component.
// This is required per Next.js 16 docs: ssr:false cannot be used in Server Components.
import ClientOnlyLoader from "../components/ClientOnlyLoader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Primary Brand Heading Font (Self-hosted by next/font with preload enabled)
const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["300", "400", "600", "700", "800", "900"],
    display: "swap",
    preload: true,
});

// Primary Body & UI Display Font (Replaces Poppins & Inter across the entire site)
const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
    preload: true,
});



export const metadata: Metadata = {
    metadataBase: new URL("https://www.vallihospital.in"),
    applicationName: "Valli Super Specialty Hospital",
    generator: "Next.js",
    category: "Medical",
    title: {
        default: "Best Orthopedic Surgeon & Hospital in Salem | Dr. T. Natanasabapathy | Valli Super Specialty Hospital",
        template: "%s | Valli Super Specialty Hospital Salem",
    },
    description: "Valli Super Specialty Hospital (formerly Valli Orthopedic and Sports Hospital) — Salem's #1 orthopedic surgeon Dr. T. Natanasabapathy. Specializing in knee replacement, hip replacement, spine surgery, trauma recovery, sports injury treatment, and sports medicine. 24/7 emergency.",
    keywords: [
        "valli orthopedic and sports hospital",
        "valli orthopaedic and sports hospital",
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
        "multiSpecialty hospital Salem",
        "best hospital Salem",
        "Dr Natanasabapathy",
        "Valli hospital Salem",
        "24 hour emergency hospital Salem",
        "valli Super Specialty hospital salem"
    ],
    authors: [{ name: "Valli Super Specialty Hospital", url: "https://www.vallihospital.in" }],
    creator: "Valli Super Specialty Hospital",
    publisher: "Valli Super Specialty Hospital",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Best Orthopedic Hospital in Salem | Valli Super Specialty Hospital",
        description: "Salem's most trusted orthopedic hospital — joint replacement, trauma care, sports injury treatment, and 24/7 emergency. 19,000+ patients treated. Led by Dr. T. Natanasabapathy.",
        url: "https://www.vallihospital.in",
        siteName: "Valli Super Specialty Hospital",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valli Super Specialty Hospital — Best Orthopedic Hospital in Salem, Tamil Nadu",
            }
        ],
        phoneNumbers: ["+919003417111"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Best Orthopedic Hospital in Salem | Valli Super Specialty Hospital",
        description: "Salem's #1 orthopedic hospital — joint replacement, trauma care, sports injury, and 24/7 emergency. 19,000+ patients treated.",
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
            <body className={`${montserrat.variable} ${plusJakartaSans.variable} antialiased selection:bg-secondary selection:text-white`}>
                {/*
                 * GA4 Loading Strategy — lazyOnload
                 *
                 * WHY lazyOnload (not afterInteractive):
                 *   afterInteractive fires the moment React hydration completes, injecting
                 *   an 80 KB cross-origin script that competes directly with Framer Motion,
                 *   Lenis, and component hydration chunks for main-thread bandwidth.
                 *   lazyOnload defers until after the page is fully settled and the browser
                 *   enters idle time — removing ~80–180ms of TBT on mid-range mobile devices.
                 *
                 * WHY transport_type: 'beacon':
                 *   Switches GA4 hit transport from XHR to navigator.sendBeacon.
                 *   Beacon requests run entirely off the main thread and never block
                 *   foreground work or page unload.
                 *
                 * WHY send_page_view: false + explicit gtag('event', 'page_view'):
                 *   gtag('config') with send_page_view:false prevents an eager page_view
                 *   hit firing synchronously as part of configuration before the script
                 *   has fully settled. The explicit event dispatch below fires cleanly
                 *   after config completes — identical data, safer sequencing.
                 */}
                {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID.startsWith('G-') && process.env.NEXT_PUBLIC_GA_ID.length > 5 && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                            strategy="lazyOnload"
                        />
                        <Script
                            id="google-analytics"
                            strategy="lazyOnload"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                                        transport_type: 'beacon',
                                        send_page_view: false
                                    });
                                    gtag('event', 'page_view');
                                `
                            }}
                        />
                    </>
                )}
                <ClientOnlyLoader />
                <HospitalSchema />
                <PhysicianSchema />
                <Analytics />
                <SpeedInsights />
                <SmoothScroll>
                    <MagneticCursor />
                    <div id="page-content-wrapper" className="relative min-h-screen">
                        {children}
                    </div>
                </SmoothScroll>
            </body>
        </html>
    );
}
