import Image from "next/image";

const logos = [
    { 
        name: "NABH", 
        src: "/partners/nabh.png",
        width: 56,
        height: 56
    },
    { 
        name: "HDFC ERGO", 
        src: "/partners/hdfc-ergo.png",
        width: 150,
        height: 50
    },
    { 
        name: "Star Health", 
        src: "/partners/star-health.png",
        width: 56,
        height: 56
    },
    { 
        name: "SBI General", 
        src: "/partners/sbi-general.png",
        width: 150,
        height: 50
    },
    { 
        name: "ICICI Lombard", 
        src: "/partners/icici-lombard.png",
        width: 150,
        height: 50
    },
    { 
        name: "Care Health", 
        src: "/partners/care-health.png",
        width: 56,
        height: 56
    },
];

export default function TrustBar() {
    return (
        <section className="bg-white py-12 border-b border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 relative z-10">

                {/* Fixed Label on Left */}
                <div className="shrink-0 flex items-center md:items-start flex-col">
                    <h2 className="text-xl font-black text-[#00333c] tracking-tight uppercase">
                        Recognized <br className="hidden md:block" /> Partners
                    </h2>
                    <div className="w-12 h-1 bg-[#f98825] mt-2 rounded-full hidden md:block" />
                </div>

                <div className="w-full h-12 md:h-[80px] w-px bg-gray-200 hidden md:block opacity-50 mx-4" />

                {/* Infinite Marquee — CSS-driven, zero JS hydration */}
                <div className="flex-1 overflow-hidden relative w-full">
                    {/* Gradient masks for smooth fade on edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div
                        className="flex items-center gap-16 md:gap-24 w-max"
                        style={{ animation: "marquee 40s linear infinite" }}
                    >
                        {/* Triple the array for seamless infinite scroll */}
                        {[...logos, ...logos, ...logos].map((logo, index) => (
                            <div key={index} className="flex items-center justify-center shrink-0 group">
                                <Image
                                    src={logo.src}
                                    alt={`${logo.name} partner logo`}
                                    width={logo.width}
                                    height={logo.height}
                                    loading="lazy"
                                    className="h-10 md:h-14 w-auto object-contain transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md"
                                    style={{ width: "auto" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
