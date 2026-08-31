import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '../../../components/seo/StructuredData';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(file => ({
      slug: file.replace(/\.mdx?$/, ''),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return {};
  
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/title:\s*"(.*?)"/);
  const descMatch = content.match(/description:\s*"(.*?)"/);
  const title = titleMatch ? `${titleMatch[1]} | Valli Hospital Salem` : 'Orthopedic Health Guide | Valli Hospital';
  const description = descMatch ? descMatch[1] : 'Expert medical insights from Valli Super Specialty Hospital Salem.';
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.vallihospital.in/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.vallihospital.in/blog/${slug}`,
      type: 'article',
      siteName: 'Valli Super Specialty Hospital',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  const file = path.join(dir, `${slug}.mdx`);
  
  if (!fs.existsSync(file)) {
    notFound();
  }

  const rawContent = fs.readFileSync(file, 'utf8');
  const titleMatch = rawContent.match(/title:\s*"(.*?)"/);
  const descMatch = rawContent.match(/description:\s*"(.*?)"/);
  const dateMatch = rawContent.match(/date:\s*"(.*?)"/);

  const title = titleMatch ? titleMatch[1] : slug;
  const description = descMatch ? descMatch[1] : '';
  const datePublished = dateMatch ? dateMatch[1] : '2026-05-01';

  // Strip frontmatter
  const body = rawContent.replace(/---[\s\S]*?---/, '').trim();

  // Extract FAQ items
  const faqSectionMatch = body.match(/## Frequently Asked Questions[\s\S]*/);
  const faqSectionText = faqSectionMatch ? faqSectionMatch[0] : '';
  const faqMatches = Array.from(faqSectionText.matchAll(/### (.*?)\n([\s\S]*?)(?=###|##|$)/g));
  const faqs = faqMatches.map(m => ({ question: m[1].trim(), answer: m[2].trim() }));

  // Main body text without the FAQ section for custom rendering
  const mainBodyText = body.replace(/## Frequently Asked Questions[\s\S]*/, '').trim();

  // Helper to render inline formatting (bold, links)
  const renderInline = (text: string) => {
    // Replace **bold**
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-[#00333c]">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkText = part.slice(1, part.indexOf(']('));
        const linkUrl = part.slice(part.indexOf('](') + 2, -1);
        return (
          <Link key={i} href={linkUrl} className="text-[#f98825] font-semibold underline hover:text-[#e07516] transition-colors">
            {linkText}
          </Link>
        );
      }
      return part;
    });
  };

  // Convert markdown blocks to semantic JSX
  const renderMarkdownBlocks = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`ul-${elements.length}`} className="list-disc pl-6 my-4 space-y-2 text-gray-700">
              {currentList.map((item, idx) => (
                <li key={idx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        } else if (listType === 'ol') {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal pl-6 my-4 space-y-2 text-gray-700">
              {currentList.map((item, idx) => (
                <li key={idx}>{renderInline(item)}</li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        flushList();
        continue;
      }

      if (line.startsWith('# ')) {
        flushList();
        // Skip root H1 since we render a styled hero title
        continue;
      }

      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl md:text-3xl font-bold text-[#00333c] mt-10 mb-4 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
        continue;
      }

      if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl md:text-2xl font-bold text-[#004b57] mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
        continue;
      }

      if (line.startsWith('- ') || line.startsWith('* ')) {
        listType = 'ul';
        currentList.push(line.slice(2));
        continue;
      }

      const orderedMatch = line.match(/^\d+\.\s+(.*)/);
      if (orderedMatch) {
        listType = 'ol';
        currentList.push(orderedMatch[1]);
        continue;
      }

      if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-[#f98825] bg-[#f98825]/5 p-4 rounded-r-xl my-6 text-gray-800 italic">
            {renderInline(line.replace('> ', ''))}
          </blockquote>
        );
        continue;
      }

      flushList();
      elements.push(
        <p key={`p-${i}`} className="my-4 text-gray-700 leading-relaxed text-base md:text-lg">
          {renderInline(line)}
        </p>
      );
    }

    flushList();
    return elements;
  };

  return (
    <>
      <Navbar />

      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://www.vallihospital.in/' },
        { name: 'Health Blog', url: 'https://www.vallihospital.in/blog' },
        { name: title, url: `https://www.vallihospital.in/blog/${slug}` }
      ]} />

      <ArticleSchema
        title={title}
        description={description}
        url={`https://www.vallihospital.in/blog/${slug}`}
        datePublished={datePublished}
        authorName="Dr. T. Natanasabapathy"
      />

      {faqs.length > 0 && <FAQSchema questions={faqs} />}

      {/* Breadcrumb UI */}
      <div className="mx-auto px-6 md:px-12 pt-28 pb-4 bg-[#001f25]">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><span className="mx-2">›</span></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><span className="mx-2">›</span></li>
            <li className="text-[#f98825] truncate max-w-xs md:max-w-md" aria-current="page">{title}</li>
          </ol>
        </nav>
      </div>

      {/* Article Hero */}
      <header className="bg-[#001f25] text-white pt-10 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#f98825] text-xs font-bold uppercase tracking-wider mb-6">
            Orthopedic Health & Clinical Guidance
          </span>
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight mb-6">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3cb3a6]" />
              Published: {datePublished}
            </span>
            <span>•</span>
            <span>5 Min Read</span>
            <span>•</span>
            <span className="text-[#f98825] font-semibold">Clinically Reviewed</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="py-16 md:py-24 bg-[#f9fafb]">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <article className="bg-white rounded-3xl p-8 md:p-14 border border-gray-200 shadow-sm">
            
            {/* Clinician Review Badge */}
            <div className="mb-10 p-5 rounded-2xl bg-[#001f25]/5 border border-[#001f25]/10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#001f25] text-white flex items-center justify-center font-black text-xl shrink-0">
                TN
              </div>
              <div>
                <div className="text-xs font-bold text-[#f98825] uppercase tracking-wider">Clinically Reviewed By</div>
                <div className="text-base font-bold text-[#00333c]">Dr. T. Natanasabapathy, MBBS, MS Ortho, FIJR</div>
                <div className="text-xs text-gray-500">Chief Orthopedic Surgeon & Managing Director, Valli Hospital Salem</div>
              </div>
            </div>

            {/* Semantic Parsed Body */}
            <div className="article-body">
              {renderMarkdownBlocks(mainBodyText)}
            </div>

            {/* FAQs Accordion/Card Section */}
            {faqs.length > 0 && (
              <div className="mt-14 pt-10 border-t border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-[#00333c] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                      <h3 className="text-lg font-bold text-[#00333c] mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Card Inside Article */}
            <div className="mt-14 p-8 rounded-3xl bg-gradient-to-br from-[#001f25] to-[#00333c] text-white text-center">
              <h3 className="text-2xl font-bold mb-3">Consult Our Orthopedic Specialists</h3>
              <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto mb-6">
                Get an accurate diagnosis and customized recovery plan from Salem&apos;s leading orthopedic surgeons.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/book-appointment"
                  className="px-6 py-3 bg-[#f98825] text-white font-bold rounded-xl shadow hover:bg-[#e07516] transition-colors text-sm"
                >
                  Book Doctor Consultation
                </Link>
                <a
                  href="tel:+919003417111"
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-colors text-sm"
                >
                  📞 Call: +91 90034 17111
                </a>
              </div>
            </div>

          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
