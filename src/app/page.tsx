import Navbar from "./../components/Navbar";
import Hero from "./../components/Hero";
import TrustBar from "./../components/TrustBar";
import SpecialityGrid from "./../components/SpecialityGrid";
import TechShowcase from "./../components/TechShowcase";
import EmergencyBar from "./../components/EmergencyBar";
import SmoothScroll from "./../components/SmoothScroll";
import MagneticCursor from "./../components/MagneticCursor";
import Footer from "./../components/Footer";

export default function Home() {
    return (
        <SmoothScroll>
            <MagneticCursor />
            <Navbar />
            <main className="min-h-screen bg-[var(--color-mint)] w-full block">
                <Hero />
                <TrustBar />
                <SpecialityGrid />
                <TechShowcase />
            </main>
            <EmergencyBar />
            <Footer />
        </SmoothScroll>
    );
}
