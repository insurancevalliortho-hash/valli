export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white py-20 px-6 md:px-12 w-full pt-32">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/logo.png" alt="Valli Hospital" className="h-12 w-auto brightness-0 invert" />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        A high-end wellness retreat blending precision medical tech with compassionate, world-class care.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Specialities</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Cardiology</a></li>
                        <li><a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Neurology</a></li>
                        <li><a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Orthopaedics</a></li>
                        <li><a href="#" className="hover:text-[var(--color-secondary)] transition-colors">Pediatrics</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-gray-400 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Our Doctors</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Emergency</h4>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <p className="text-sm text-gray-400 mb-2">24/7 Hotline</p>
                        <p className="text-2xl font-bold text-[var(--color-secondary)]">1800-VALLI</p>
                        <button className="mt-4 w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">
                            Book Appointment
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2026 Valli Super Speciality Hospital. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
