import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Blog | Valli Super Speciality Hospital',
  description: 'Read the latest insights and news from Valli Super Speciality Hospital.',
};

function getPosts() {
  const dir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  return files.filter(f => f.endsWith('.mdx')).map(file => {
    const slug = file.replace('.mdx', '');
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const titleMatch = content.match(/title:\s*"(.*?)"/);
    const descMatch = content.match(/description:\s*"(.*?)"/);
    return {
      slug,
      title: titleMatch ? titleMatch[1] : slug,
      description: descMatch ? descMatch[1] : ''
    };
  });
}

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 bg-[#001f25]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white">Our Health Blog</h1>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.slug} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-bold text-[#00333c] mb-3">{post.title}</h2>
                <p className="text-gray-600 mb-6">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="text-[#f98825] font-semibold hover:underline">
                  Read More &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
