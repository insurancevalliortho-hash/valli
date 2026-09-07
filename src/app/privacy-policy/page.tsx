import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Privacy Policy | Valli Super Specialty Hospital Salem',
  description: 'Learn how Valli Super Specialty Hospital collects, uses, and safeguards patient information, health records, and website data in compliance with medical confidentiality standards.',
  alternates: {
    canonical: 'https://www.vallihospital.in/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Privacy Policy', url: 'https://www.vallihospital.in/privacy-policy' }
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Privacy Policy</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#001f25] pt-12 pb-20 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Patient Data & Legal Standards
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl">
            Last Updated: August 2026. Your privacy and the confidentiality of your personal and medical information are paramount to Valli Super Specialty Hospital.
          </p>
        </div>
      </section>

      {/* Main Policy Content */}
      <main className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-10 text-[#40484a] text-base md:text-lg leading-relaxed font-medium">
            
            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                When you visit our website, schedule an appointment, or contact our medical departments, Valli Super Specialty Hospital (formerly Valli Orthopedic and Sports Hospital) may collect personal and medical details, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Contact details such as your full name, phone number, email address, and residential city.</li>
                <li>Appointment request details (preferred specialty, consultation date, doctor preference, and symptoms described).</li>
                <li>Diagnostic and medical history shared during telemedicine or registration processes.</li>
                <li>Technical browsing data (IP address, device type, browser information, and referral pages via cookies).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use collected information solely for genuine healthcare operations, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Scheduling, confirming, and managing doctor consultations and surgery appointments.</li>
                <li>Communicating clinical follow-ups, diagnostic lab results, and health guidance.</li>
                <li>Improving website functionality, performance, and user accessibility.</li>
                <li>Complying with statutory medical reporting regulations and healthcare standards in Tamil Nadu, India.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">3. Medical Confidentiality & Security</h2>
              <p>
                Patient confidentiality is strictly maintained under applicable medical ethics guidelines. We implement enterprise-grade technical and physical safeguards to prevent unauthorized access, alteration, or disclosure of your electronic medical records. We never sell, rent, or lease patient data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">4. Cookies and Analytical Tools</h2>
              <p>
                We use privacy-conscious analytics tools (such as Google Analytics with IP anonymization) to measure aggregated traffic patterns and Core Web Vitals performance. You can disable cookies at any time via your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#00333c] mb-4">5. Contact Our Privacy Officer</h2>
              <p className="mb-4">
                If you have questions regarding this Privacy Policy or wish to request corrections to your recorded personal information, please contact us:
              </p>
              <div className="bg-[#001f25] text-white p-6 rounded-2xl space-y-2">
                <p><strong>Hospital:</strong> Valli Super Specialty Hospital</p>
                <p><strong>Address:</strong> Meyyanoor Road (Opp. Sri Vidya Mandir School), Salem - 636 004, Tamil Nadu</p>
                <p><strong>Phone:</strong> +91 90034 17111</p>
                <p><strong>Email:</strong> info@vallihospital.in</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
