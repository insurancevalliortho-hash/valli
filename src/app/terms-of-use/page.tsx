import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Terms of Use & Medical Disclaimer | Valli Super Specialty Hospital Salem',
  description: 'Review the Terms of Use, patient rights, appointment policies, and medical disclaimer for Valli Super Specialty Hospital Salem website and digital services.',
  alternates: {
    canonical: 'https://www.vallihospital.in/terms-of-use',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Terms of Use', url: 'https://www.vallihospital.in/terms-of-use' }
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Terms of Use</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#001f25] pt-12 pb-20 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Website Terms & Clinical Disclaimer
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl">
            Please read these terms carefully before utilizing the digital services or reading medical educational resources provided by Valli Super Specialty Hospital.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-10 text-[#40484a] text-base md:text-lg leading-relaxed font-medium">
            
            <section className="p-6 rounded-2xl bg-amber-50 border border-amber-200">
              <h2 className="text-xl font-bold text-amber-900 mb-2">⚠️ Medical Emergency Disclaimer</h2>
              <p className="text-amber-900/90 text-base">
                The content on this website is for informational and educational purposes only and is not a substitute for direct clinical examination, professional medical advice, diagnosis, or treatment. <strong>If you are experiencing a life-threatening trauma, chest pain, or orthopedic emergency, call our 24/7 helpline immediately at <a href="tel:+919003417111" className="font-bold underline">+91 90034 17111</a> or visit our emergency casualty department in Salem.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website `https://www.vallihospital.in/`, you agree to comply with and be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">2. Online Appointment Booking</h2>
              <p className="mb-4">
                Submitting an appointment request through our digital portal does not constitute an automatically confirmed clinical slot until confirmed by our hospital reception via SMS, WhatsApp, or phone call. We reserve the right to reschedule consultation times based on doctor emergency surgical duties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">3. Intellectual Property Rights</h2>
              <p>
                All materials, text, graphics, logos, images, audio clips, video clips, and medical articles published on this website are the intellectual property of Valli Super Specialty Hospital and are protected under Indian and international copyright laws. Unauthorized reproduction or scraping is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">4. Governing Law and Jurisdiction</h2>
              <p>
                These Terms of Use are governed by and construed in accordance with the laws of the State of Tamil Nadu, India. Any legal disputes arising out of or related to website usage shall be subject to the exclusive jurisdiction of the competent courts in Salem, Tamil Nadu.
              </p>
            </section>

            <section className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <Link
                href="/contact-us"
                className="px-6 py-3 bg-[#f98825] text-white font-bold rounded-xl hover:bg-[#e07516] transition-colors text-sm"
              >
                Contact Hospital Administration
              </Link>
              <Link
                href="/privacy-policy"
                className="text-[#004b57] font-bold text-sm hover:underline"
              >
                View Privacy Policy &rarr;
              </Link>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
