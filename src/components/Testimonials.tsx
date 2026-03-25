"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Bhuvaneshwari S.",
        text: "Dr. Natanasabapathy sir, you are the best ortho surgeon I have ever seen. Thank you so much for your care. I was injured by my own bullock in the neck area... I was unconscious but now I'm completely alright. He did a great job.",
    },
    {
        name: "Karthikeyan",
        text: "My sincere thanks to Valli Super Speciality Hospital. I met with a severe accident 5 months ago. Today I am living my life only because of the doctors here. Excellent treatment and accurate diagnosis.",
    },
    {
        name: "Yuvarajan",
        text: "Care shown by the doctors and staff members is outstanding. The procedure went better than we hoped. Clean and hygienic environment. I am fully satisfied.",
    },
    {
        name: "Sababathy",
        text: "My wife is daily consulting for physiotherapy. The care is good and she is recovering soon. Friendly staff and quick service at an affordable price.",
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#004b57]/10 to-transparent" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#f98825] border border-[#f98825]/20 text-xs font-bold tracking-[0.2em] uppercase mb-4 shadow-sm">
                        Patient Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#00333c] tracking-tight mb-6">
                        What Our Patients Say
                    </h2>
                    <p className="text-lg text-[#40484a] font-medium leading-relaxed">
                        Don't just take our word for it. Discover how we've helped patients reclaim their health, mobility, and confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,51,60,0.03)] border border-[#bfc8ca]/30 relative group hover:-translate-y-2 transition-transform duration-500"
                        >
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-[#ebfdfc] shrink-0 transform -rotate-6 group-hover:rotate-0 group-hover:text-[#f98825] transition-all duration-300" />

                            <div className="flex flex-col h-full justify-between relative z-10">
                                <p className="text-[#0e1e1e] font-medium text-lg leading-relaxed mb-8 italic">
                                    "{item.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#004b57] to-[#f98825] flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#00333c] tracking-tight">{item.name}</h4>
                                        <div className="flex text-[#ffb400] text-sm mt-0.5">
                                            ★★★★★
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
