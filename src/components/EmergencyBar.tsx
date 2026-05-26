"use client";

import { Phone, Navigation2 } from "lucide-react";

export default function EmergencyBar() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 flex">
            <a 
                href="https://maps.app.goo.gl/c4oHsAMwjLq9UqYi8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-[var(--color-primary)] hover:bg-gray-50 transition-colors text-center"
            >
                <Navigation2 size={20} />
                <span className="text-xs font-semibold">Directions</span>
            </a>
            <a 
                href="tel:+919003417111" 
                className="flex-1 py-4 flex flex-col items-center justify-center gap-1 bg-[var(--color-secondary)] text-white hover:bg-[#e67e00] transition-colors text-center"
            >
                <Phone size={20} />
                <span className="text-xs font-semibold block sm:hidden">Emergency</span>
                <span className="text-xs font-semibold hidden sm:block">Call: +91 90034 17111</span>
            </a>
        </div>
    );
}
