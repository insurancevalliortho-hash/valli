"use client";

import { motion } from "framer-motion";

const logos = [
    { name: "NABH", src: "https://images.seeklogo.com/logo-png/39/1/nabh-logo-png_seeklogo-398755.png" },
    { name: "HDFC ERGO", src: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/HDFC_ERGO_Logo_2025.png/330px-HDFC_ERGO_Logo_2025.png" },
    { name: "Star Health", src: "https://play-lh.googleusercontent.com/JEcrbamGiWvHjDBubpjIfDAZ5-aqy-z1oDXag4XSDptHSYtGftWcH_sfENba-lSlBQ" },
    { name: "SBI General", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6sXAMSiLW6oopymkkFE-wP0yltVNNBVqeA&s" },
    { name: "ICICI Lombard", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtAPFlH1QOyJWzuOfQcrkTIorAkeeGWhtdA&s" },
    { name: "Care Health", src: "https://play-lh.googleusercontent.com/ZBdHZIdRgt-8pMRTHrSiJqLLQ_03SDr9LVfj_wZOUOgEb5CXA2_Dy-0pJdNKVicex-BS" },
];

export default function TrustBar() {
    return (
        <section className="bg-white py-12 border-b border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 relative z-10">

                {/* Fixed Label on Left */}
                <div className="shrink-0 flex items-center md:items-start flex-col">
                    <h3 className="text-xl font-black text-[#00333c] tracking-tight uppercase">
                        Recognized <br className="hidden md:block" /> Partners
                    </h3>
                    <div className="w-12 h-1 bg-[#f98825] mt-2 rounded-full hidden md:block" />
                </div>

                <div className="w-full h-12 md:h-[80px] w-px bg-gray-200 hidden md:block opacity-50 mx-4" />

                {/* Infinite Marquee */}
                <div className="flex-1 overflow-hidden relative w-full mask-image-linear">
                    {/* Gradient masks for smooth fade on edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-16 md:gap-24 w-max"
                    >
                        {/* Double the array for seamless infinite scroll */}
                        {[...logos, ...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex items-center justify-center shrink-0 group">
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    referrerPolicy="no-referrer"
                                    className="h-10 md:h-14 w-auto  transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
