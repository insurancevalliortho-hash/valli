import { Metadata } from "next";
import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import TrustBar from "./../components/TrustBar";
import AboutSection from "./../components/AboutSection";
import SurgeonProfile from "./../components/SurgeonProfile";
import SpecialityGrid from "./../components/SpecialityGrid";
import TechShowcase from "./../components/TechShowcase";
import Testimonials from "./../components/Testimonials";
import Footer from "./../components/Footer";

export const metadata: Metadata = {
    title: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
    description: "Valli Super Speciality Hospital is Salem's leading orthopedic hospital offering joint replacement, sports injury treatment, trauma care, spine surgery, and 24/7 emergency services. Trusted by 16,000+ patients across Tamil Nadu.",
    keywords: [
        "best orthopedic hospital in Salem",
        "orthopedic surgeon Salem Tamil Nadu",
        "joint replacement Salem",
        "knee replacement Salem",
        "hip replacement Salem",
        "sports injury clinic Salem",
        "trauma hospital Salem",
        "spine surgery Salem",
        "Valli hospital Salem",
        "orthopedic hospital Tamil Nadu",
        "fracture treatment Salem",
        "arthroscopy Salem",
        "Dr Natanasabapathy orthopedic surgeon",
        "24 hour emergency hospital Salem"
    ],
    alternates: {
        canonical: "https://vallihospital.in/",
        languages: {
            "en": "https://vallihospital.in/",
            "en-IN": "https://vallihospital.in/",
            "x-default": "https://vallihospital.in/"
        }
    },
    openGraph: {
        title: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
        description: "Salem's most trusted orthopedic hospital — joint replacement, trauma care, sports injury treatment, and 24/7 emergency. Led by Dr. T. Natanasabapathy.",
        url: "https://vallihospital.in/",
        siteName: "Valli Super Speciality Hospital",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Valli Super Speciality Hospital — Best Orthopedic Hospital in Salem"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Best Orthopedic Hospital in Salem | Valli Super Speciality Hospital",
        description: "Salem's most trusted orthopedic hospital — joint replacement, trauma care, sports injury treatment, and 24/7 emergency.",
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
            "name": "Valli Super Speciality Hospital",
            "url": "https://vallihospital.in",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vallihospital.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Hospital",
            "name": "Valli Super Speciality Hospital",
            "image": "https://vallihospital.in/favicon.png",
            "@id": "https://vallihospital.in",
            "url": "https://vallihospital.in",
            "telephone": "+919003417111",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Meyyanur Bypass Road",
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
                "Orthopedic",
                "Spine Surgery",
                "Joint Replacement",
                "Trauma Care",
                "Sports Medicine"
            ],
            "isAcceptingNewPatients": true
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
                <SpecialityGrid />
                <TechShowcase />
                <Testimonials />
            </main>

            <Footer />
        </>
    );
}
