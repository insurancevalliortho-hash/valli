import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { FAQSchema } from '../../../components/seo/StructuredData';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  const file = path.join(dir, `${params.slug}.mdx`);
  if (!fs.existsSync(file)) return {};
  
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/title:\s*"(.*?)"/);
  const descMatch = content.match(/description:\s*"(.*?)"/);
  
  return {
    title: titleMatch ? `${titleMatch[1]} | Valli Hospital` : 'Blog Post',
    description: descMatch ? descMatch[1] : '',
    alternates: {
      canonical: `https://www.vallihospital.in/blog/${params.slug}`,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  const file = path.join(dir, `${params.slug}.mdx`);
  
  if (!fs.existsSync(file)) {
    notFound();
  }

  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/title:\s*"(.*?)"/);
  const body = content.replace(/---[\s\S]*?---/, ''); // Remove frontmatter

  const faqMatches = Array.from(body.matchAll(/### (.*?)\n([\s\S]*?)(?=###|##|$)/g));
  const faqs = faqMatches.map(m => ({ question: m[1].trim(), answer: m[2].trim() }));

  return (
    <>
      <Navbar />
      {faqs.length > 0 && <FAQSchema questions={faqs} />}
      <article className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-black text-[#00333c] mb-8">
            {titleMatch ? titleMatch[1] : params.slug}
          </h1>
          <div className="prose prose-lg prose-blue max-w-none text-gray-700">
            <pre className="whitespace-pre-wrap font-sans text-base">{body.trim()}</pre>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
