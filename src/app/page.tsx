import { Metadata } from "next";
import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import TrustBar from "./../components/TrustBar";
import AboutSection from "./../components/AboutSection";
import SurgeonProfile from "./../components/SurgeonProfile";
import SpecialtyGrid from "./../components/SpecialtyGrid";
import TechShowcase from "./../components/TechShowcase";
import Testimonials from "./../components/Testimonials";
import Footer from "./../components/Footer";
import FAQSection from "./../components/FAQSection";

// Force static pre-rendering: page is generated at build time and served from CDN edge.
// This eliminates TTFB variance caused by cold-start SSR. Revalidation is on-demand only.
export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
    title: "Best Ortho Doctor & Orthopedic Hospital in Salem | Dr. T. Natanasabapathy | Valli Hospital",
    description: "Consult Salem's top orthopedic doctor Dr. T. Natanasabapathy at Valli Super Specialty Hospital. Specializing in robotic knee replacement, spine surgery, sports injury & 24/7 emergency fracture care. Cashless insurance available.",
    keywords: [
        "best ortho doctor in salem",
        "orthopedic doctor in salem",
        "best orthopedic hospital in Salem",
        "salem orthopedic doctors",
        "best orthopedician in salem",
        "bone doctor salem",
        "salem bone specialist hospital",
        "orthopedic hospital near me",
        "elumbu doctor near me",
        "knee replacement in salem",
        "robotic knee replacement salem",
        "knee replacement cost in salem",
        "spine surgeon in salem",
        "back pain treatment in salem",
        "24 hour emergency hospital salem",
        "fracture treatment salem",
        "sports injury clinic salem",
        "cashless insurance hospital in salem",
        "dr natanasabapathy orthopedic surgeon",
        "valli orthopedic and sports hospital",
        "valli Super Specialty hospital salem"
    ],
    alternates: {
        canonical: "https://www.vallihospital.in/",
        languages: {
            "en": "https://www.vallihospital.in/",
            "en-IN": "https://www.vallihospital.in/",
            "x-default": "https://www.vallihospital.in/"
        }
    },
    openGraph: {
        title: "Best Ortho Doctor & Orthopedic Hospital in Salem | Valli Hospital",
        description: "Salem's most trusted orthopedic hospital — robotic knee replacement, spine surgery, trauma care, sports injury, and 24/7 emergency. Led by Dr. T. Natanasabapathy.",
        url: "https://www.vallihospital.in/",
        siteName: "Valli Super Specialty Hospital",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valli Super Specialty Hospital — Best Orthopedic Hospital in Salem"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Best Ortho Doctor & Orthopedic Hospital in Salem | Valli Hospital",
        description: "Salem's most trusted orthopedic hospital — robotic knee replacement, spine surgery, trauma care, sports injury treatment, and 24/7 emergency.",
        images: ["/og-image.jpg"]
    },
    other: {
        "geo.region": "IN-TN",
        "geo.placename": "Salem, Tamil Nadu",
        "geo.position": "11.6643;78.1460",
        "ICBM": "11.6643, 78.1460"
    }
};

export default function Home() {
    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Valli Super Specialty Hospital",
            "alternateName": [
                "Valli Orthopedic and Sports Hospital",
                "Valli Orthopaedic and Sports Hospital",
                "Valli Hospital Salem",
                "வள்ளி மருத்துவமனை சேலம்"
            ],
            "url": "https://www.vallihospital.in",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.vallihospital.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": ["Hospital", "MedicalOrganization", "EmergencyService"],
            "name": "Valli Super Specialty Hospital",
            "alternateName": [
                "Valli Orthopedic and Sports Hospital",
                "Valli Orthopaedic and Sports Hospital",
                "Valli Hospital Salem",
                "வள்ளி மருத்துவமனை சேலம்",
                "Salem Bone Specialist Hospital"
            ],
            "image": "https://www.vallihospital.in/favicon.png",
            "@id": "https://www.vallihospital.in",
            "url": "https://www.vallihospital.in",
            "telephone": "+919003417111",
            "priceRange": "$$",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Cashless Health Insurance (Star Health, Medi Assist, Vidal Health, Paramount, ICICI Lombard, HDFC ERGO)",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Meyyanur Bypass Road, Near 5 Roads",
                "addressLocality": "Salem",
                "addressRegion": "Tamil Nadu",
                "postalCode": "636004",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.6643,
                "longitude": 78.1460
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            },
            "medicalSpecialty": [
                "Orthopedic Surgery",
                "Robotic Knee Replacement",
                "Spine Surgery",
                "Joint Replacement",
                "Trauma Care",
                "Sports Medicine",
                "Arthroscopy",
                "Rheumatology"
            ],
            "isAcceptingNewPatients": true
        },
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "headline": "Best Orthopedic Hospital in Salem | Valli Super Specialty Hospital",
            "about": [
                {
                    "@type": "Thing",
                    "name": "Hospital",
                    "sameAs": "https://en.wikipedia.org/wiki/Hospital"
                }
            ],
            "mentions": [
                {
                    "@type": "Thing",
                    "name": "joint replacement",
                    "sameAs": "https://en.wikipedia.org/wiki/Arthroplasty"
                },
                {
                    "@type": "Thing",
                    "name": "sports injury",
                    "sameAs": "https://en.wikipedia.org/wiki/Sport"
                },
                {
                    "@type": "Thing",
                    "name": "treatment",
                    "sameAs": "https://en.wikipedia.org/wiki/Therapy"
                },
                {
                    "@type": "Thing",
                    "name": "trauma care",
                    "sameAs": "https://en.wikipedia.org/wiki/Major_trauma"
                },
                {
                    "@type": "Thing",
                    "name": "spine",
                    "sameAs": "https://en.wikipedia.org/wiki/Spinal_cord"
                },
                {
                    "@type": "Thing",
                    "name": "emergency services",
                    "sameAs": "https://en.wikipedia.org/wiki/Emergency_service"
                },
                {
                    "@type": "City",
                    "name": "Tamil Nadu",
                    "sameAs": "https://en.wikipedia.org/wiki/Tamil_Nadu"
                }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="min-h-screen bg-white w-full block overflow-x-hidden">
                <Hero />
                <TrustBar />
                <AboutSection />
                <SurgeonProfile />
                <SpecialtyGrid />
                <TechShowcase />
                <Testimonials />
                <FAQSection />
            </main>

            <Footer />
        </>
    );
}
