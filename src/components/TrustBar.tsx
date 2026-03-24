"use client";

import { motion } from "framer-motion";

const partners = [
    "NABH Accredited",
    "NABL Certified",
    "Apollo Munich",
    "HDFC ERGO",
    "Star Health",
    "Max Bupa",
    "ICICI Lombard",
    "Religare Health",
];

export default function TrustBar() {
    return (
        <section className="py-12 border-y border-gray-200/50 bg-white overflow-hidden flex flex-col items-center">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-6 text-center">
                Trusted by Leading Insurers & Accredited by
            </p>
            <div className="w-full overflow-hidden relative flex">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <motion.div
                    className="flex gap-16 whitespace-nowrap px-8"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {/* Double the list for seamless looping */}
                    {[...partners, ...partners].map((partner, idx) => (
                        <div
                            key={idx}
                            className="text-gray-500 font-medium text-lg md:text-xl tracking-tight grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        >
                            {partner}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
