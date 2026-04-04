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
    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />
            <main className="min-h-screen bg-white w-full block">
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
