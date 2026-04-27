import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import TrustBar from "./../components/TrustBar";
import AboutSection from "./../components/AboutSection";
import SurgeonProfile from "./../components/SurgeonProfile";
import SpecialityGrid from "./../components/SpecialityGrid";
import TechShowcase from "./../components/TechShowcase";
import Testimonials from "./../components/Testimonials";
import SmoothScroll from "./../components/SmoothScroll";
import MagneticCursor from "./../components/MagneticCursor";
import Footer from "./../components/Footer";

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
        <SmoothScroll>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <MagneticCursor />
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
        </SmoothScroll>
    );
}
