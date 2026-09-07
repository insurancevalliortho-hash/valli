import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { BreadcrumbSchema } from '../../components/seo/StructuredData';

export const metadata: Metadata = {
  title: 'Orthopedic & Healthcare Insights Blog | Valli Hospital Salem',
  description: 'Expert orthopedic health guides, knee replacement recovery tips, spine care insights, and sports injury prevention articles from Valli Super Specialty Hospital Salem clinicians.',
  keywords: [
    'orthopedic blog Salem',
    'knee replacement guide Salem',
    'spine surgery recovery tips',
    'sports injury advice',
    'bone health blog Tamil Nadu',
    'Valli hospital articles'
  ],
  alternates: {
    canonical: 'https://www.vallihospital.in/blog',
  },
  openGraph: {
    title: 'Orthopedic Health & Clinical Insights Blog | Valli Hospital',
    description: 'Explore evidence-based orthopedic advice, surgical recovery timelines, and joint care insights from leading surgeons in Salem.',
    url: 'https://www.vallihospital.in/blog',
    type: 'website',
  }
};

function getPosts() {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.mdx?$/, '');
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const titleMatch = content.match(/title:\s*"(.*?)"/);
      const descMatch = content.match(/description:\s*"(.*?)"/);
      const dateMatch = content.match(/date:\s*"(.*?)"/);
      return {
        slug,
        title: titleMatch ? titleMatch[1] : slug,
        description: descMatch ? descMatch[1] : '',
        date: dateMatch ? dateMatch[1] : '2026-05-01'
      };
    });
}

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Health Blog', url: 'https://www.vallihospital.in/blog' }
      ]} />

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate" aria-current="page">Health Blog &amp; Insights</li>
          </ol>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-20 bg-[#001f25] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12 text-[#f98825] text-xs font-bold tracking-[0.2em] uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f98825]" />
            Evidence-Based Patient Education
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Orthopedic Health <br /><span className="text-[#f98825]">&amp; Medical Insights</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Clinically reviewed articles on joint replacements, spine wellness, trauma rehabilitation, and athletic conditioning from the specialists at Valli Super Specialty Hospital.
          </p>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <main className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.slug} className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4 font-semibold">
                    <span>{post.date}</span>
                    <span className="text-[#004d66] bg-[#004d66]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">Orthopedics</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#00333c] mb-3 group-hover:text-[#f98825] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">Dr. T. Natanasabapathy</span>
                  <Link href={`/blog/${post.slug}`} className="text-[#f98825] font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-[#001f25] text-white text-center">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold mb-4">Have Questions About an Orthopedic Condition?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">Schedule a consultation with our experienced clinical specialists in Salem.</p>
          <Link
            href="/book-appointment"
            className="inline-block px-8 py-4 bg-[#f98825] text-white font-bold rounded-xl shadow-lg hover:bg-[#e07516] transition-all"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
